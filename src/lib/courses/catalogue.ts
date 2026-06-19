import { courses as snapshotCourses, type Course } from "@/data/courses";
import {
  projectFacet as snapshotProjectFacet,
  orgFacet as snapshotOrgFacet,
  topicFacet as snapshotTopicFacet,
  type Facet,
  type OrgFacet,
} from "@/data/courseFacets";
import { LMS_BASE } from "@/data/site";

/**
 * Live course catalogue.
 *
 * Source of truth = the public Open edX LMS course API
 * ({LMS}/api/courses/v1/courses/). That API gives the authoritative live list
 * (id, name, number, org code, image) but NOT the project / topic / org display
 * name / facets — those came from the discovery aggregations (CSRF-locked for
 * server-to-server use). So we ENRICH each live course from the curated
 * snapshot (src/data/courses.ts) where we have it, derive the project from the
 * course number, compute the facets from the live data, and preserve the
 * approved display order. If the live API is unreachable, we fall back to the
 * static snapshot so the page never breaks.
 */

interface LmsCourse {
  id?: string;
  name?: string;
  number?: string;
  org?: string;
  media?: {
    image?: { raw?: string; small?: string; large?: string };
    course_image?: { uri?: string };
  };
}

export interface Catalogue {
  courses: Course[];
  projectFacet: Facet[];
  orgFacet: OrgFacet[];
  topicFacet: Facet[];
  /** True when served from the live API, false when falling back to snapshot. */
  live: boolean;
}

const PROJECTS = ["RES4CITY", "SHERLOCK", "RESSKILL", "COSS"];
const snapshotById = new Map(snapshotCourses.map((c) => [c.id, c]));
const snapshotOrder = new Map(snapshotCourses.map((c, i) => [c.id, i]));
const orgLabelByCode = new Map(snapshotOrgFacet.map((o) => [o.value, o.label]));

function deriveProject(haystack: string): string {
  const upper = haystack.toUpperCase();
  return PROJECTS.find((p) => upper.includes(p)) ?? "Other";
}

async function fetchAllLmsCourses(): Promise<LmsCourse[]> {
  const out: LmsCourse[] = [];
  let url: string | undefined = `${LMS_BASE}/api/courses/v1/courses/?page_size=100`;
  // Hard page cap as a safety net (current catalogue is ~1 page of 100).
  for (let i = 0; i < 10 && url; i++) {
    const res: Response = await fetch(url, {
      headers: { Accept: "application/json" },
      // Cache the upstream response for an hour (ISR-style for fetch).
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`LMS course API ${res.status}`);
    const json: { results?: LmsCourse[]; pagination?: { next?: string | null } } =
      await res.json();
    out.push(...(json.results ?? []));
    url = json.pagination?.next ?? undefined;
  }
  return out;
}

function normalize(lms: LmsCourse): Course | null {
  const id = lms.id ?? "";
  if (!id) return null;
  const snap = snapshotById.get(id);
  const orgCode = lms.org ?? snap?.orgCode ?? "";
  const liveImage =
    lms.media?.image?.small ||
    lms.media?.image?.large ||
    lms.media?.image?.raw ||
    (lms.media?.course_image?.uri ? `${LMS_BASE}${lms.media.course_image.uri}` : "");
  return {
    id,
    name: lms.name ?? snap?.name ?? id,
    // Prefer the curated local image (fast, already downloaded); else the live one.
    image: snap?.image || liveImage,
    number: lms.number ?? snap?.number ?? "",
    orgCode,
    org: snap?.org || orgLabelByCode.get(orgCode) || orgCode,
    project: snap?.project || deriveProject(`${lms.number ?? ""} ${id}`),
    topic: snap?.topic || "Other",
    aboutUrl: `${LMS_BASE}/courses/${id}/about`,
  };
}

function buildFacets(list: Course[]): {
  projectFacet: Facet[];
  orgFacet: OrgFacet[];
  topicFacet: Facet[];
} {
  const tally = (key: (c: Course) => string) => {
    const m = new Map<string, number>();
    for (const c of list) {
      const k = key(c);
      if (!k) continue;
      m.set(k, (m.get(k) ?? 0) + 1);
    }
    return m;
  };
  const toFacet = (m: Map<string, number>): Facet[] =>
    [...m].map(([value, count]) => ({ value, count })).sort((a, b) => b.count - a.count);

  const orgCounts = tally((c) => c.orgCode);
  const orgLabel = new Map(list.map((c) => [c.orgCode, c.org]));
  const orgFacet: OrgFacet[] = [...orgCounts]
    .map(([value, count]) => ({ value, label: orgLabel.get(value) ?? value, count }))
    .sort((a, b) => b.count - a.count);

  return {
    projectFacet: toFacet(tally((c) => c.project)),
    orgFacet,
    topicFacet: toFacet(tally((c) => c.topic)),
  };
}

export async function getCatalogue(): Promise<Catalogue> {
  try {
    const lms = await fetchAllLmsCourses();
    const courses = lms
      .map(normalize)
      .filter((c): c is Course => Boolean(c))
      // Drop platform test courses from the public catalogue.
      .filter((c) => c.orgCode.toLowerCase() !== "tesst")
      // Preserve the approved display order; append new live-only courses after.
      .sort(
        (a, b) =>
          (snapshotOrder.get(a.id) ?? Number.MAX_SAFE_INTEGER) -
          (snapshotOrder.get(b.id) ?? Number.MAX_SAFE_INTEGER),
      );
    if (!courses.length) throw new Error("no live courses");
    return { courses, ...buildFacets(courses), live: true };
  } catch {
    // Resilient fallback: the curated snapshot (always works, never breaks).
    return {
      courses: snapshotCourses,
      projectFacet: snapshotProjectFacet,
      orgFacet: snapshotOrgFacet,
      topicFacet: snapshotTopicFacet,
      live: false,
    };
  }
}

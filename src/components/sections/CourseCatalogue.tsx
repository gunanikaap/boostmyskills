"use client";

import { useMemo, useState } from "react";
import CourseCard from "@/components/cards/CourseCard";
import { courses } from "@/data/courses";
import { programs } from "@/data/programs";
import {
  projectFacet,
  orgFacet,
  topicFacet,
  programmeFacet,
} from "@/data/courseFacets";

/**
 * Client-side catalogue with a "Search for a course" box and a "Refine Your
 * Search" panel, mirroring the live /courses UI (dropdown facets with floating
 * labels). Data comes from the live Open edX Course API (see src/data/courses.ts).
 */

// Live Micro-Programme facet uses full programme names (see courseFacets.ts).
// Map each programmes.ts programme to its live facet name by fuzzy compare,
// then map a course (credential) to the live programme names it belongs to.
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const programmeName = (title: string) => {
  const n = norm(title);
  const hit = programmeFacet.find((f) => {
    const nf = norm(f.value);
    return nf === n || nf.includes(n.slice(0, 24)) || n.includes(nf.slice(0, 24));
  });
  return hit?.value;
};
const credentialToProgrammes = new Map<string, Set<string>>();
for (const p of programs) {
  const name = programmeName(p.title);
  if (!name) continue;
  for (const credential of p.microCredentials) {
    const key = credential.toLowerCase();
    if (!credentialToProgrammes.has(key)) credentialToProgrammes.set(key, new Set());
    credentialToProgrammes.get(key)!.add(name);
  }
}
const courseProgrammes = (name: string) =>
  credentialToProgrammes.get(name.toLowerCase()) ?? new Set<string>();

// Authoritative facet options (names/labels, counts, order) from the live
// discovery aggregations. Org is keyed by code with a clean display label.
const projectOptions = projectFacet;
const orgOptions = orgFacet;
const topicOptions = topicFacet;
const programmeOptions = programmeFacet;

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M6 9l6 6 6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Live .sidebar-dropdown / .dropbtn: a white box with a floating green label,
 * an "All Default" selection text and a chevron, expanding to an options list.
 */
function FacetDropdown({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: { value: string; count: number; label?: string }[];
  selected: Set<string>;
  onToggle: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selectionText =
    selected.size === 0 ? "All Default" : `${selected.size} selected`;

  return (
    <div className="mb-[30px]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="relative w-full rounded-lg border border-[#b5b5b5] bg-white px-3.5 py-3.5 text-center text-[#252525] transition-colors hover:border-black"
      >
        {/* Live .dropbtn-label: floating, panel-cut (#F9F9F9), green text. */}
        <span className="absolute -top-2.5 left-[5px] bg-surface-muted px-[5px] text-sm text-[#4caf50]">
          {label}
        </span>
        <span className="text-xl">{selectionText}</span>
        <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#252525]">
          <ChevronIcon open={open} />
        </span>
      </button>
      {open ? (
        <ul className="mt-1 max-h-72 overflow-y-auto rounded-lg border border-[#b5b5b5] bg-white p-2.5 text-base">
          {options.map((opt) => {
            const isSelected = selected.has(opt.value);
            return (
              <li key={opt.value}>
                <button
                  type="button"
                  onClick={() => onToggle(opt.value)}
                  className={`group flex w-full items-center justify-between gap-3 rounded px-2 py-2 text-left transition-colors ${
                    isSelected
                      ? "bg-[#07984517] font-semibold text-primary"
                      : "text-ink hover:bg-primary hover:text-white"
                  }`}
                >
                  <span>{opt.label ?? opt.value}</span>
                  {/* Live .facet-option .count: course count per term. */}
                  <span
                    className={
                      isSelected
                        ? "text-primary"
                        : "text-[#9b9b9b] group-hover:text-white"
                    }
                  >
                    {opt.count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

export default function CourseCatalogue() {
  const [query, setQuery] = useState("");
  const [activeProjects, setActiveProjects] = useState<Set<string>>(new Set());
  const [activeOrgs, setActiveOrgs] = useState<Set<string>>(new Set());
  const [activeTopics, setActiveTopics] = useState<Set<string>>(new Set());
  const [activeProgrammes, setActiveProgrammes] = useState<Set<string>>(new Set());

  const toggleIn = (
    setter: React.Dispatch<React.SetStateAction<Set<string>>>,
    value: string,
  ) =>
    setter((prev) => {
      const next = new Set(prev);
      next.has(value) ? next.delete(value) : next.add(value);
      return next;
    });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((course) => {
      const matchesQuery = q === "" || course.name.toLowerCase().includes(q);
      const matchesProject =
        activeProjects.size === 0 || activeProjects.has(course.project);
      const matchesOrg = activeOrgs.size === 0 || activeOrgs.has(course.orgCode);
      const matchesTopic =
        activeTopics.size === 0 || activeTopics.has(course.topic);
      const matchesProgramme =
        activeProgrammes.size === 0 ||
        [...courseProgrammes(course.name)].some((name) =>
          activeProgrammes.has(name),
        );
      return (
        matchesQuery &&
        matchesProject &&
        matchesOrg &&
        matchesTopic &&
        matchesProgramme
      );
    });
  }, [query, activeProjects, activeOrgs, activeTopics, activeProgrammes]);

  const clearAll = () => {
    setQuery("");
    setActiveProjects(new Set());
    setActiveOrgs(new Set());
    setActiveTopics(new Set());
    setActiveProgrammes(new Set());
  };

  const hasFilters =
    activeProjects.size > 0 ||
    activeOrgs.size > 0 ||
    activeTopics.size > 0 ||
    activeProgrammes.size > 0 ||
    query !== "";

  return (
    <div className="mx-auto w-[95%]">
      {/* Live #discovery-message: "Viewing N courses" heading above the grid. */}
      <h1 className="mb-10 text-[2.5rem] font-normal leading-tight text-ink lg:text-[3rem]">
        Viewing {filtered.length} course{filtered.length === 1 ? "" : "s"}
      </h1>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        {/* Results (live .courses); search/facets in a narrow right column. */}
        <div>
          {filtered.length > 0 ? (
            // Live .r4c-courses-list: grid auto-fit, minmax(362px, 1fr), 2rem gap.
            <div className="grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(362px,1fr))]">
              {filtered.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="rounded-card border border-line bg-white p-10 text-center text-muted">
              No courses match your search. Try clearing some filters.
            </div>
          )}
        </div>

        {/* Live aside.r4c-search-facets: #F9F9F9 panel, #BDBDBD border, 10px. */}
        <aside className="order-first h-fit rounded-[10px] border border-line-mid bg-surface-muted p-6 lg:order-none">
          {/* Live .r4c-discovery-input: white, #BDBDBD border, 10px, icon left. */}
          <form
            role="search"
            aria-label="Search for a course"
            onSubmit={(e) => e.preventDefault()}
            className="relative"
          >
            <label htmlFor="course-search" className="sr-only">
              Search for a course
            </label>
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M21 21l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <input
              id="course-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a course"
              className="h-[42px] w-full rounded-[10px] border border-line-mid bg-white pl-11 pr-3 text-xl font-medium leading-[20.72px] text-ink placeholder:text-[#9b9b9b] focus:border-black focus:outline-none"
            />
          </form>

          {/* Live .header-search-facets: centred heading. */}
          <h2 className="mt-10 text-center text-[28px] font-medium leading-tight text-[#252525]">
            Refine Your Search
          </h2>
          {hasFilters ? (
            <div className="mt-2 text-center">
              <button
                type="button"
                onClick={clearAll}
                className="text-xs font-semibold text-primary hover:text-primary-dark"
              >
                Clear All
              </button>
            </div>
          ) : null}

          <div className="mt-8">
            <FacetDropdown
              label="Project"
              options={projectOptions}
              selected={activeProjects}
              onToggle={(v) => toggleIn(setActiveProjects, v)}
            />
            <FacetDropdown
              label="Organisation"
              options={orgOptions}
              selected={activeOrgs}
              onToggle={(v) => toggleIn(setActiveOrgs, v)}
            />
            <FacetDropdown
              label="Topic"
              options={topicOptions}
              selected={activeTopics}
              onToggle={(v) => toggleIn(setActiveTopics, v)}
            />
            <FacetDropdown
              label="Micro-Programme"
              options={programmeOptions}
              selected={activeProgrammes}
              onToggle={(v) => toggleIn(setActiveProgrammes, v)}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}

import { programs } from "@/data/programs";
import type { ProjectName } from "@/lib/types";

export interface Course {
  title: string;
  /** Programmes this micro-credential appears in. */
  programmes: string[];
  projects: ProjectName[];
}

/**
 * Micro-credentials are derived from the programmes that contain them, so the
 * catalogue stays in sync with a single source of truth. Each unique credential
 * records which programmes and projects it belongs to.
 *
 * MVP LIMITATION: this derived list is the marketing site's best approximation
 * of the catalogue. The live /courses page is backed by a course-discovery
 * service (Open edX). If/when that official API or dataset is provided, replace
 * this derivation with the real data and keep the same `Course` shape so the
 * search/refine UI in CourseCatalogue.tsx keeps working unchanged.
 */
export const courses: Course[] = (() => {
  const map = new Map<string, Course>();
  for (const program of programs) {
    for (const title of program.microCredentials) {
      const existing = map.get(title);
      if (existing) {
        existing.programmes.push(program.code);
        if (!existing.projects.includes(program.project)) {
          existing.projects.push(program.project);
        }
      } else {
        map.set(title, {
          title,
          programmes: [program.code],
          projects: [program.project],
        });
      }
    }
  }
  return Array.from(map.values()).sort((a, b) => a.title.localeCompare(b.title));
})();

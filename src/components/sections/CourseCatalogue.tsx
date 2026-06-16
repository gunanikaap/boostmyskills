"use client";

import { useMemo, useState } from "react";
import CourseCard from "@/components/cards/CourseCard";
import { courses } from "@/data/courses";
import { programs } from "@/data/programs";
import type { ProjectName } from "@/lib/types";

/**
 * Client-side catalogue with a "Search for a course" box and a "Refine Your
 * Search" panel, mirroring the live /courses UI. Filtering runs over the
 * MVP-derived micro-credential list (see note in src/data/courses.ts) — the
 * search/refine behaviour is real, just scoped to the data we have.
 */

const projectFilters: ProjectName[] = ["RES4CITY", "SHERLOCK"];

// Map programme codes to their titles for the "Refine by programme" options.
const programmeOptions = programs.map((p) => ({ code: p.code, title: p.title }));

export default function CourseCatalogue() {
  const [query, setQuery] = useState("");
  const [activeProjects, setActiveProjects] = useState<Set<string>>(new Set());
  const [activeProgrammes, setActiveProgrammes] = useState<Set<string>>(new Set());

  const toggle = (set: Set<string>, value: string) => {
    const next = new Set(set);
    next.has(value) ? next.delete(value) : next.add(value);
    return next;
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((course) => {
      const matchesQuery = q === "" || course.title.toLowerCase().includes(q);
      const matchesProject =
        activeProjects.size === 0 ||
        course.projects.some((project) => activeProjects.has(project));
      const matchesProgramme =
        activeProgrammes.size === 0 ||
        course.programmes.some((code) => activeProgrammes.has(code));
      return matchesQuery && matchesProject && matchesProgramme;
    });
  }, [query, activeProjects, activeProgrammes]);

  const clearAll = () => {
    setQuery("");
    setActiveProjects(new Set());
    setActiveProgrammes(new Set());
  };

  const hasFilters = activeProjects.size > 0 || activeProgrammes.size > 0 || query !== "";

  return (
    <div className="space-y-8">
      {/* Search — mirrors the live course-discovery search box + submit button. */}
      <form
        role="search"
        aria-label="Search for a course"
        onSubmit={(e) => e.preventDefault()}
        className="flex max-w-2xl items-stretch gap-0 overflow-hidden rounded-full border border-line-strong bg-white"
      >
        <label htmlFor="course-search" className="sr-only">
          Search for a course
        </label>
        <input
          id="course-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a course"
          className="w-full bg-transparent px-5 py-3.5 text-base text-ink placeholder:text-muted focus:outline-none"
        />
        <button
          type="submit"
          title="Search"
          aria-label="Search"
          className="flex items-center justify-center bg-primary px-6 text-white transition-colors hover:bg-primary-dark"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M21 21l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </form>

      {/* MVP transparency: the live catalogue is served by the Open edX course-
          discovery API; this rebuild filters a list derived from programme data. */}
      <p className="max-w-2xl rounded-xl border border-line bg-surface px-4 py-3 text-sm text-muted">
        <span className="font-semibold text-ink">MVP note:</span> these micro-credentials are
        derived from the published micro-programmes. The official course-discovery catalogue lives
        in the Open edX backend and would replace this list once its API/data is available.
      </p>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Refine Your Search */}
        <aside className="h-fit rounded-card border border-line bg-surface p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-ink">Refine Your Search</h2>
            {hasFilters ? (
              <button
                type="button"
                onClick={clearAll}
                className="text-xs font-semibold text-primary hover:text-primary-dark"
              >
                Clear
              </button>
            ) : null}
          </div>

          <fieldset className="mt-5">
            <legend className="text-xs font-semibold uppercase tracking-wider text-muted">
              Project
            </legend>
            <div className="mt-3 space-y-2">
              {projectFilters.map((project) => (
                <label key={project} className="flex items-center gap-2 text-sm text-ink">
                  <input
                    type="checkbox"
                    checked={activeProjects.has(project)}
                    onChange={() => setActiveProjects((s) => toggle(s, project))}
                    className="h-4 w-4 rounded border-line text-primary focus:ring-primary"
                  />
                  {project}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="text-xs font-semibold uppercase tracking-wider text-muted">
              Micro-programme
            </legend>
            <div className="mt-3 max-h-64 space-y-2 overflow-y-auto pr-1">
              {programmeOptions.map((programme) => (
                <label
                  key={programme.code}
                  className="flex items-start gap-2 text-sm text-ink"
                  title={programme.title}
                >
                  <input
                    type="checkbox"
                    checked={activeProgrammes.has(programme.code)}
                    onChange={() => setActiveProgrammes((s) => toggle(s, programme.code))}
                    className="mt-0.5 h-4 w-4 rounded border-line text-primary focus:ring-primary"
                  />
                  <span className="font-semibold">{programme.code}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </aside>

        {/* Results */}
        <div>
          <p className="mb-4 text-sm text-muted">
            Showing {filtered.length} of {courses.length} micro-credentials
          </p>
          {filtered.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((course) => (
                <CourseCard key={course.title} course={course} />
              ))}
            </div>
          ) : (
            <div className="rounded-card border border-line bg-white p-10 text-center text-muted">
              No micro-credentials match your search. Try clearing some filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

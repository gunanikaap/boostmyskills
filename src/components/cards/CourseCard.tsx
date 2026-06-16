import { externalLinks } from "@/data/site";
import type { Course } from "@/data/courses";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <article className="flex h-full flex-col justify-between rounded-card border border-line bg-white p-6">
      <div>
        <div className="flex flex-wrap gap-2">
          {course.projects.map((project) => (
            <span
              key={project}
              className="rounded-full bg-surface-alt px-2.5 py-1 text-xs font-semibold text-primary"
            >
              {project}
            </span>
          ))}
        </div>
        <h3 className="mt-3 text-base font-bold leading-snug text-ink">{course.title}</h3>
        <p className="mt-2 text-sm text-muted">
          Featured in {course.programmes.length} micro-programme
          {course.programmes.length > 1 ? "s" : ""}.
        </p>
      </div>
      <a
        href={externalLinks.register}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark"
      >
        Enrol for free
        <span aria-hidden="true">&rarr;</span>
      </a>
    </article>
  );
}

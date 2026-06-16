import { externalLinks } from "@/data/site";
import type { Course } from "@/data/courses";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <article className="flex h-full min-h-[390px] flex-col justify-between rounded-[2rem] bg-white p-10 shadow-[0_4px_4px_4px_rgba(217,217,217,0.10)]">
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
        <h3 className="mt-8 min-h-12 text-[1.4rem] font-semibold leading-tight text-black">{course.title}</h3>
        <p className="mt-5 text-[1.1rem] leading-[1.4rem] text-black">
          Featured in {course.programmes.length} micro-programme
          {course.programmes.length > 1 ? "s" : ""}.
        </p>
      </div>
      <a
        href={externalLinks.register}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-flex w-fit items-center rounded-full bg-primary px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-dark"
      >
        Enrol
        <span aria-hidden="true" className="ml-2">&rarr;</span>
      </a>
    </article>
  );
}

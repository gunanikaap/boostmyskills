import Link from "next/link";
import { enrolLinkCourse } from "@/data/site";
import type { Course } from "@/data/courses";

// Live course card arrow (.r4c-arrow / .course-arrow path).
function ArrowIcon({ className = "ml-2" }: { className?: string }) {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M5 12h14M12 5l7 7-7 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CourseCard({ course }: { course: Course }) {
  // "Enrol" routes through the auth-gated /enrol hand-off in local mode (recorded
  // + shown on /dashboard); opens the Open edX course page in external mode.
  const enrol = enrolLinkCourse(course);
  return (
    // Live .card: max-width 500px, radius 2rem, shadow, no border; centred in
    // track. Hover: background -> #f5f5f5 (live .find-courses .course:hover).
    <article className="flex h-full w-full max-w-[500px] flex-col justify-self-center overflow-hidden rounded-[2rem] bg-white shadow-[0_4px_4px_4px_rgba(217,217,217,0.10)] transition-colors hover:bg-[#f5f5f5]">
      {/* Live .image_wrapper + .r4c-img: #EAF3E7 panel, object-cover, 20rem. */}
      <div className="h-64 overflow-hidden bg-surface-alt sm:h-80">
        {course.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={course.image}
            alt={course.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col justify-between">
        {/* Live .rc4-course-info: padding 0 2.5rem; org/code 1.1rem; title 1.4rem/600. */}
        <div className="px-10 pt-8">
          <p className="text-[1.1rem] leading-[1.4rem] text-black">{course.org}</p>
          <p className="mt-[0.7rem] text-[1.1rem] leading-[1.4rem] text-black">
            {course.number}
          </p>
          <h3 className="mt-8 text-[1.4rem] font-semibold leading-[1.8rem] text-black">
            {course.name}
          </h3>
        </div>

        {/* Live .more-info: padding 0 1.5rem, pb 2rem, flex justify-between. */}
        <div className="flex items-center justify-between px-6 pb-8 pt-8">
          {/* Live .rc4-btn: radius 2.7rem, padding 7.5px 30px, height 3.2rem, weight 500, 0.95rem. */}
          {enrol.external ? (
            <a
              href={enrol.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[3.2rem] items-center rounded-full bg-primary px-[30px] text-[0.95rem] font-medium text-white transition-opacity hover:opacity-90"
            >
              Enrol
              <ArrowIcon className="ml-2" />
            </a>
          ) : (
            <Link
              href={enrol.href}
              className="inline-flex h-[3.2rem] items-center rounded-full bg-primary px-[30px] text-[0.95rem] font-medium text-white transition-opacity hover:opacity-90"
            >
              Enrol
              <ArrowIcon className="ml-2" />
            </Link>
          )}
          {/* Live .r4c-moreinfo: 1rem, weight 700, #000, arrow ml 0.3rem. */}
          <a
            href={course.aboutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-base font-bold text-black transition-opacity hover:opacity-70"
          >
            More info
            <ArrowIcon className="ml-[0.3rem]" />
          </a>
        </div>
      </div>
    </article>
  );
}

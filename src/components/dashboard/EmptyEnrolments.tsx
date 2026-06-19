import Button from "@/components/ui/Button";

function Arrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Empty learner state — matches the live LMS dashboard. Shown when the user has
 * no enrolments yet.
 */
export default function EmptyEnrolments() {
  return (
    <div className="mt-10 rounded-card bg-surface-alt p-8 lg:p-14">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/dashboard-empty.svg"
          alt=""
          className="mx-auto w-full max-w-[380px]"
        />
        <div>
          <h2 className="text-3xl font-bold leading-tight text-ink sm:text-[2.75rem] sm:leading-[1.15]">
            You are not enrolled in any micro-programme or micro-credential yet
          </h2>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/programs" variant="primary" className="!px-7 !py-3">
              Enrol in micro-programmes
              <Arrow />
            </Button>
            <Button href="/courses" variant="primary" className="!px-7 !py-3">
              Enrol in micro-credentials
              <Arrow />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

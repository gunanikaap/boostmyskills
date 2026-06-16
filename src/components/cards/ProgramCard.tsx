import Button from "@/components/ui/Button";
import type { Program } from "@/lib/types";

// Forward arrow shown beside the live "Enrol" button.
function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="ml-1">
      <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ProgramCard({
  program,
  showCredentials = true,
}: {
  program: Program;
  showCredentials?: boolean;
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-white">
      {/* Live: .image_wrapper — light-green panel, ~17.5rem tall on desktop. */}
      <div className="bg-surface-alt">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={program.image}
          alt={program.title}
          loading="lazy"
          className="h-56 w-full object-cover sm:h-72"
        />
      </div>
      <div className="flex flex-1 flex-col px-7 py-7">
        {/* Live: .card_header — 1.2rem, up to ~1.56rem on desktop, weight 600. */}
        <h3 className="text-lg font-semibold leading-snug text-ink sm:text-2xl">{program.title}</h3>

        {showCredentials ? (
          <div className="mt-5 flex-1">
            <p className="font-semibold text-muted">
              {program.code} | {program.project}
            </p>
            <p className="mt-3 font-semibold text-muted">
              Includes the following micro-credentials:
            </p>
            {/* Live: .card_detail_list_item — • bullets, 1rem, weight 600, #767676. */}
            <ul className="mt-2 list-disc space-y-1 pl-5 text-base marker:text-muted">
              {program.microCredentials.map((credential) => (
                <li key={credential} className="font-semibold text-muted">
                  {credential}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="mt-3 font-semibold text-muted">
            {program.code} | {program.project}
          </p>
        )}

        <div className="mt-7">
          <Button href={program.enrolUrl} variant="primary" external>
            Enrol
            <ArrowIcon />
          </Button>
        </div>
      </div>
    </article>
  );
}

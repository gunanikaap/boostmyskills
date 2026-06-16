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
      <div className="bg-surface-alt">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={program.image}
          alt={program.title}
          loading="lazy"
          className="h-48 w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col px-7 py-7">
        <h3 className="text-xl font-semibold leading-snug text-ink">{program.title}</h3>

        {showCredentials ? (
          <div className="mt-5 flex-1">
            <p className="text-ink">
              {program.code} | {program.project}
            </p>
            <p className="mt-3 text-ink">Includes the following micro-credentials:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 marker:text-muted">
              {program.microCredentials.map((credential) => (
                <li key={credential} className="font-semibold text-muted">
                  {credential}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="mt-3 text-ink">
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

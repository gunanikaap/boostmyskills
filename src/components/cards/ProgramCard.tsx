import Button from "@/components/ui/Button";
import type { Program } from "@/lib/types";

export default function ProgramCard({
  program,
  showCredentials = true,
}: {
  program: Program;
  showCredentials?: boolean;
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-card">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={program.image}
        alt={program.title}
        loading="lazy"
        className="h-44 w-full object-cover"
      />
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          {program.code} | {program.project}
        </p>
        <h3 className="mt-2 text-lg font-bold leading-snug text-ink">{program.title}</h3>

        {showCredentials ? (
          <>
            <p className="mt-4 text-sm font-medium text-muted">
              Includes the following micro-credentials:
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-muted">
              {program.microCredentials.map((credential) => (
                <li key={credential} className="flex gap-2">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{credential}</span>
                </li>
              ))}
            </ul>
          </>
        ) : null}

        <div className="mt-6 pt-2">
          <Button href={program.enrolUrl} variant="primary" external className="w-full">
            Enrol
          </Button>
        </div>
      </div>
    </article>
  );
}

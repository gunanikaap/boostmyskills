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
  variant = "program",
}: {
  program: Program;
  showCredentials?: boolean;
  variant?: "home" | "program";
}) {
  const isHome = variant === "home";
  const titleClass = isHome
    ? "px-4 text-[1.2rem] font-semibold leading-[1.6rem] text-[#313131]"
    : "px-4 text-[1.2rem] font-semibold leading-[1.6rem] text-[#313131] sm:text-[1.56rem] sm:leading-[1.8rem]";
  const detailClass = "text-base font-semibold leading-[1.4rem] text-muted";

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-white pb-24">
      {/* Live: .image_wrapper - light-green panel, ~17.5rem tall on desktop. */}
      <div className="h-56 overflow-hidden rounded-t-[1.5rem] bg-surface-alt sm:h-[17.5rem]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={program.image}
          alt={program.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col px-6 py-7 sm:px-10">
        {/* Live: home carousel uses 1.2rem; /programs raises cards to 1.56rem. */}
        <h3 className={titleClass}>
          {program.title}
        </h3>

        {showCredentials ? (
          <div className="mt-7 flex-1">
            <p className={detailClass}>
              {program.code} | {program.project}
            </p>
            <p className={`mt-5 ${detailClass}`}>
              Includes the following micro-credentials:
            </p>
            {/* Live: .card_detail_list_item - bullets, 1rem, weight 600, #767676. */}
            <ul className="mt-4 list-disc space-y-0 pl-5 text-base marker:text-muted">
              {program.microCredentials.map((credential) => (
                <li key={credential} className="font-semibold leading-6 text-muted">
                  {credential}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className={`mt-5 ${detailClass}`}>
            {program.code} | {program.project}
          </p>
        )}

        <div className="absolute bottom-6 left-0 right-0 flex px-6 pt-4 sm:px-10">
          <Button
            href={program.enrolUrl}
            variant="primary"
            className="!px-10 !py-4 !text-xl !font-semibold !leading-none"
            external
          >
            Enrol
            <ArrowIcon />
          </Button>
        </div>
      </div>
    </article>
  );
}

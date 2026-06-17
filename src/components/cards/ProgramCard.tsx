import Button from "@/components/ui/Button";
import type { Program } from "@/lib/types";

// Forward arrow shown beside the live "Enrol" button.
function ArrowIcon({
  className = "ml-1",
  width = 16,
  height = 16,
}: {
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" aria-hidden="true" className={className}>
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
  const articleClass = isHome
    ? "relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-white"
    : "relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-white pb-24";
  const bodyClass = isHome
    ? "mb-20 flex flex-1 flex-col px-[0.6rem] pb-8 pt-[1.8rem]"
    : "flex flex-1 flex-col px-6 py-7 sm:px-10";
  const listClass = isHome
    ? "mt-4 inline-block list-none space-y-0 text-base"
    : "mt-4 list-disc space-y-0 pl-5 text-base marker:text-muted";
  const listItemClass = isHome
    ? "relative pl-5 font-semibold leading-6 text-muted before:absolute before:left-0 before:top-[0.75em] before:h-[5px] before:w-[5px] before:-translate-y-1/2 before:rounded-full before:bg-muted before:content-['']"
    : "font-semibold leading-6 text-muted";

  return (
    <article className={articleClass}>
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
      <div className={bodyClass}>
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
            {/* Live: .card_detail_list_item - custom bullets, 1rem, weight 600, #767676. */}
            <ul className={listClass}>
              {program.microCredentials.map((credential) => (
                <li
                  key={credential}
                  className={listItemClass}
                >
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

        {isHome ? (
          <div className="absolute bottom-0 left-0 right-0 flex px-6 pb-6 pt-4">
            <a
              href={program.enrolUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <span className="inline-flex rounded-full bg-primary px-10 py-4 text-[1.1rem] font-semibold leading-[1.3rem] text-white">
                Enrol
              </span>
              <ArrowIcon className="ml-2 text-primary" width={21} height={18} />
            </a>
          </div>
        ) : (
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
        )}
      </div>
    </article>
  );
}

import Link from "next/link";
import Button from "@/components/ui/Button";
import { enrolLink } from "@/data/site";
import type { Program } from "@/lib/types";

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
  // Live card text (home + /programs) is weight 600 / #767676.
  const bodyWeight = "font-semibold";
  const titleClass = isHome
    ? "px-4 text-[1.2rem] font-semibold leading-[1.6rem] text-[#313131]"
    : "px-4 text-[1.2rem] font-semibold leading-[1.6rem] text-[#313131] sm:text-[1.56rem] sm:leading-[1.8rem]";
  const detailClass = `text-base ${bodyWeight} leading-[1.4rem] text-muted`;
  const articleClass = isHome
    ? "relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-white"
    : "relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-white pb-24";
  const bodyClass = isHome
    ? "mb-20 flex flex-1 flex-col px-[0.6rem] pb-8 pt-[1.8rem]"
    : "flex flex-1 flex-col px-6 py-7 sm:px-10";
  // Live .card_detail_list: list-none, inline-block, custom bullet dot at
  // padding-left 20px (pl-5), 1rem text, line-height 1.5rem, #767676.
  const listClass = "mt-4 inline-block list-none space-y-0 text-base";
  const listItemClass = `relative pl-5 ${bodyWeight} leading-6 text-muted before:absolute before:left-0 before:top-0 before:text-muted before:content-['•']`;

  // Enrol destination: Open edX directly in "external" mode, or the local
  // Supabase-gated /enrol hand-off in "local"/"demo" mode (see enrolLink).
  const { href: enrolHref, external: enrolExternal } = enrolLink(program);

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
          // Live .card_detail shares the .card_header inset (px-4) so the
          // programme code / bullet list line up under the title.
          <div className="mt-5 flex-1 px-4">
            <p className={detailClass}>
              {program.code} | {program.project}
            </p>
            <p className={`mt-5 ${detailClass}`}>
              Includes the following micro-credentials:
            </p>
            {/* Live: .card_detail_list_item - bullet dot, 1rem, #767676. */}
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
          <p className={`mt-5 px-4 ${detailClass}`}>
            {program.code} | {program.project}
          </p>
        )}

        {isHome ? (
          <div className="absolute bottom-0 left-0 right-0 flex px-6 pb-6 pt-4">
            {enrolExternal ? (
              <a
                href={enrolHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                <span className="inline-flex rounded-full bg-primary px-10 py-4 text-[1.1rem] font-semibold leading-[1.3rem] text-white">
                  Enrol
                </span>
              </a>
            ) : (
              <Link href={enrolHref} className="inline-flex items-center">
                <span className="inline-flex rounded-full bg-primary px-10 py-4 text-[1.1rem] font-semibold leading-[1.3rem] text-white">
                  Enrol
                </span>
              </Link>
            )}
          </div>
        ) : (
          // Live /programs: plain "Enrol", no arrow, smaller pill, lower-left.
          <div className="absolute bottom-6 left-0 right-0 flex px-6 pt-4">
            <Button
              href={enrolHref}
              variant="primary"
              className="!px-10 !py-4 !text-[1.1rem] !font-semibold !leading-none"
              external={enrolExternal}
            >
              Enrol
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}

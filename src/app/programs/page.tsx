import type { Metadata } from "next";
import ProgramCard from "@/components/cards/ProgramCard";
import { programs } from "@/data/programs";

export const metadata: Metadata = {
  title: "Micro-programmes | BoostMySkills",
  description:
    "Explore every BoostMySkills micro-programme. Each programme bundles ten micro-credentials into a structured learning path.",
};

export default function ProgramsPage() {
  return (
    <section className="pb-28">
      {/* Live programs page: a centred, max-width container (not screen-edge
          padding). 1080px holds two 500px cards + 2rem gap on one row. The
          sticky header already reserves its own height, so only a small top
          gap is needed before "Catalogue". */}
      <div className="mx-auto w-[90%] max-w-[1080px] pt-8">
        {/* Live .landing-subtitle: #079845, 1.5rem, weight 600, padding-top 0.9rem. */}
        <span className="inline-block pt-[0.9rem] text-2xl font-semibold text-primary">
          Catalogue
        </span>
        {/* Live .section_header: #1A1A1A, weight 600, -1.16px, 2.5rem -> 4rem. */}
        <h1 className="mt-6 text-[2.5rem] font-semibold leading-[2.5rem] tracking-[-1.16px] text-ink sm:text-[3.5rem] sm:leading-[3.5rem] lg:text-[4rem] lg:leading-[2.5rem]">
          Micro-programmes
        </h1>

        {/* Two large cards per row on desktop, single column on mobile,
            consistent 2rem gap. */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {programs.map((program) => (
            <ProgramCard key={program.slug} program={program} />
          ))}
        </div>
      </div>
    </section>
  );
}

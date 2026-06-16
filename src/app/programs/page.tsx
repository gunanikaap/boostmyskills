import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/ui/PageHeader";
import ProgramCard from "@/components/cards/ProgramCard";
import { programs } from "@/data/programs";

export const metadata: Metadata = {
  title: "Micro-programmes | BoostMySkills",
  description:
    "Explore every BoostMySkills micro-programme. Each programme bundles ten micro-credentials into a structured learning path.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Catalogue"
        title="Micro-programmes"
      />
      <section className="mx-auto mt-12 w-[95%] max-w-container pb-28">
        <Container className="!px-0">
          {/* Live .r4c-micro-programs: grid auto-fit, minmax(250px, 500px), centred, 2rem gap. */}
          <div
            className="grid justify-center gap-8"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 500px))" }}
          >
            {programs.map((program) => (
              <ProgramCard key={program.slug} program={program} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

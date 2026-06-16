import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProgramCard from "@/components/cards/ProgramCard";
import Button from "@/components/ui/Button";
import { programs } from "@/data/programs";

export default function TrendingPrograms() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <SectionHeading eyebrow="Discover" title="Our Trending Micro-programmes" align="left" />

        <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-8 overflow-x-auto pb-4">
          {programs.map((program) => (
            <div key={program.slug} className="w-[88%] shrink-0 snap-start sm:w-[460px]">
              <ProgramCard program={program} />
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Button href="/programs" variant="light">
            View all Micro-programmes
          </Button>
        </div>
      </Container>
    </section>
  );
}

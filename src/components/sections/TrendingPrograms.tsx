import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProgramCard from "@/components/cards/ProgramCard";
import Button from "@/components/ui/Button";
import { programs } from "@/data/programs";

export default function TrendingPrograms() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <SectionHeading eyebrow="Discover" title="Our Trending Micro-programmes" align="center" />

        <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
          {programs.map((program) => (
            <div key={program.slug} className="w-80 shrink-0 snap-start">
              <ProgramCard program={program} />
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button href="/programs" variant="outline">
            View all Micro-programmes
          </Button>
        </div>
      </Container>
    </section>
  );
}

import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProgramCarousel from "@/components/sections/ProgramCarousel";
import Button from "@/components/ui/Button";
import { programs } from "@/data/programs";

export default function TrendingPrograms() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <SectionHeading eyebrow="Discover" title="Our Trending Micro-programmes" align="left" />

        <div className="mt-10">
          <ProgramCarousel programs={programs} />
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

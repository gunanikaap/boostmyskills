import Container from "@/components/layout/Container";
import ProgramCarousel from "@/components/sections/ProgramCarousel";
import { programs } from "@/data/programs";

export default function TrendingPrograms() {
  return (
    <section className="mx-auto mt-24 w-[95%] max-w-container">
      <Container className="!px-0">
        <span className="inline-block pt-3.5 text-2xl font-semibold text-primary">
          Discover
        </span>
        <h2 className="mt-8 text-[2.2rem] font-semibold leading-[2.5rem] tracking-[-1.16px] text-ink lg:text-[4rem] lg:leading-[2.5rem]">
          Our Trending Micro-programmes
        </h2>

        <div className="mt-16">
          <ProgramCarousel programs={programs} />
        </div>
      </Container>
    </section>
  );
}

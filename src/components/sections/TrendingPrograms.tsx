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

        {/* Live: .link_btn - black, 1.2rem, weight 700, links to /programs. */}
        <a
          href="/programs"
          className="mt-2 inline-flex items-center text-[1.2rem] font-medium text-ink"
        >
          View all Micro-programmes
          <svg
            width="21"
            height="18"
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="ml-2"
          >
            <path
              d="M5 12h13M13 6l6 6-6 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </Container>
    </section>
  );
}

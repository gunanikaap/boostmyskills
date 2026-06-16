import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import { images } from "@/data/site";

// Forward-arrow used on the live "Explore" / "Enrol" buttons.
function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="ml-1">
      <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="bg-white">
      <Container className="grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-20">
        <div>
          <Eyebrow>FREE fully funded courses</Eyebrow>
          <h1 className="mt-4 max-w-xl text-4xl font-bold leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
            Become a leader in sustainability
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted lg:text-xl">
            Accelerate and future proof your career in sustainability or gain the skills to advance
            your organisations sustainability initiatives, through courses developed by pan-European
            and international universities - co-funded by the EU, Swiss Confederation and a consortia
            of South Korean universities (COSS) - and supported by the United Nations Institute for
            Training &amp; Research (UNITAR)
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href="/programs" variant="primary">
              Explore Micro-programmes
              <ArrowIcon />
            </Button>
            <Button href="/courses" variant="primary">
              Explore Micro-credentials
              <ArrowIcon />
            </Button>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images.landing}
            alt="Learners building sustainability skills"
            className="w-full max-w-lg"
          />
        </div>
      </Container>
    </section>
  );
}

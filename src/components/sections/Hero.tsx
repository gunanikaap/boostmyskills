import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
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
      <Container className="grid items-center gap-10 pb-12 pt-16 lg:grid-cols-2 lg:items-end lg:gap-0 lg:pb-3 lg:pt-[93px]">
        <div className="max-w-[600px]">
          <span className="block text-lg font-semibold leading-none text-primary sm:text-xl lg:text-2xl">
            FREE fully funded courses
          </span>
          <h1 className="mt-8 max-w-[34rem] text-4xl font-bold leading-[1.05] text-ink sm:text-5xl lg:mt-11 lg:text-[4rem] lg:leading-[4rem]">
            Become a leader in sustainability
          </h1>
          <p className="mt-8 max-w-[37rem] text-lg leading-relaxed text-muted lg:mt-10 lg:text-2xl lg:leading-[1.27]">
            Accelerate and future proof your career in sustainability or gain the skills to advance
            your organisations sustainability initiatives, through courses developed by pan-European
            and international universities - co-funded by the EU, Swiss Confederation and a consortia
            of South Korean universities (COSS) - and supported by the United Nations Institute for
            Training &amp; Research (UNITAR)
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row lg:mt-10 lg:pt-5">
            <Button
              href="/programs"
              variant="primary"
              className="!px-6 !py-4 !text-base !font-semibold !leading-7"
            >
              Explore Micro-programmes
              <ArrowIcon />
            </Button>
            <Button
              href="/courses"
              variant="primary"
              className="!px-6 !py-4 !text-base !font-semibold !leading-7"
            >
              Explore Micro-credentials
              <ArrowIcon />
            </Button>
          </div>
        </div>
        <div className="flex justify-center lg:justify-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images.landing}
            alt="Learners building sustainability skills"
            className="w-full max-w-lg lg:max-w-[532px]"
          />
        </div>
      </Container>
    </section>
  );
}

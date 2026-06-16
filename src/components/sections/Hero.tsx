import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import { images } from "@/data/site";

export default function Hero() {
  return (
    <section className="bg-surface">
      <Container className="grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <span className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-primary shadow-sm">
            FREE fully funded courses
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-tight text-ink sm:text-5xl">
            Become a leader in sustainability
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
            Accelerate and future-proof your career in sustainability, or gain the skills to
            advance your organisation&apos;s sustainability initiatives, through courses developed
            by pan-European and international universities &mdash; co-funded by the EU, Swiss
            Confederation and a consortia of South Korean universities (COSS) &mdash; and supported
            by the United Nations Institute for Training &amp; Research (UNITAR).
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/programs" variant="primary">
              Explore Micro-programmes
            </Button>
            <Button href="/courses" variant="light">
              Explore Micro-credentials
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
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

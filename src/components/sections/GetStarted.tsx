import Container from "@/components/layout/Container";
import { images } from "@/data/site";
import { steps } from "@/data/home";

export default function GetStarted() {
  return (
    <section className="bg-surface py-16 lg:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Get started in 3 simple steps
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Achieve your learning goals quickly by following these straightforward steps.
          </p>
          <ol className="mt-8 space-y-6">
            {steps.map((step) => (
              <li key={step.number} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-base font-bold text-white">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images.ipad} alt="The BoostMySkills learning platform" className="w-full max-w-md" />
        </div>
      </Container>
    </section>
  );
}

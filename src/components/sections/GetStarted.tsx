import Container from "@/components/layout/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import { steps } from "@/data/home";

export default function GetStarted() {
  return (
    <section className="py-16 lg:py-24">
      <Container className="grid gap-12 lg:grid-cols-2">
        <div>
          <Eyebrow>How to get started?</Eyebrow>
          <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-heading text-ink sm:text-4xl">
            Get started in 3 simple steps
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Achieve your learning goals quickly by following these straight-forward steps
          </p>
        </div>
        <ol className="space-y-8">
          {steps.map((step) => (
            <li key={step.number} className="flex gap-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-green/50 text-lg font-semibold text-primary">
                {step.number}
              </span>
              <div>
                <h3 className="text-xl font-medium text-ink">{step.title}</h3>
                <p className="mt-2 text-lg leading-relaxed text-muted">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

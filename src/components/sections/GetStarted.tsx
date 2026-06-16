import Container from "@/components/layout/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import { steps } from "@/data/home";

export default function GetStarted() {
  return (
    <section className="mx-auto mt-16 w-[90%] max-w-container lg:mt-24">
      <Container className="grid gap-12 !px-0 lg:grid-cols-2 lg:justify-between">
        <div>
          <Eyebrow>How to get started?</Eyebrow>
          <h2 className="mt-3 max-w-md text-[2.2rem] font-semibold leading-tight text-ink">
            Get started in 3 simple steps
          </h2>
          <p className="mt-7 text-[1.2rem] leading-[1.8rem] text-muted">
            Achieve your learning goals quickly by following these straight-forward steps
          </p>
        </div>
        <ol className="space-y-8 p-0">
          {steps.map((step) => (
            <li key={step.number} className="flex gap-6">
              <span className="grid h-16 w-16 shrink-0 place-content-center rounded-full bg-surface-green/50 text-[1.2rem] font-semibold leading-none text-primary">
                {step.number}
              </span>
              <div>
                <h3 className="text-[1.3rem] font-medium leading-[2.4rem] text-ink">{step.title}</h3>
                <p className="mt-3 text-[1.2rem] leading-[1.8rem] text-muted">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

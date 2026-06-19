import Container from "@/components/layout/Container";
import { steps } from "@/data/home";

export default function GetStarted() {
  return (
    <section className="mx-auto mt-16 w-[90%] max-w-container min-[1200px]:my-24">
      <Container className="grid gap-12 !px-5 min-[1200px]:flex min-[1200px]:justify-between min-[1200px]:gap-0">
        <div className="min-[1200px]:w-[38.9%]">
          <span className="mb-8 inline-block pt-[0.9rem] text-2xl font-semibold leading-none text-primary">
            How to get started?
          </span>
          <h2 className="mb-12 max-w-full text-[2.2rem] font-semibold leading-[1.2] text-black">
            Get started in 3 simple steps
          </h2>
          <p className="text-[1.2rem] font-medium leading-[1.8rem] text-muted">
            Achieve your learning goals quickly by following these straight-forward steps
          </p>
        </div>
        <div className="min-[1200px]:ml-16 min-[1200px]:w-[55.6%]">
          <ol className="my-4 p-0">
            {steps.map((step) => (
              <li key={step.number} className="mb-8 flex">
                <span className="mr-[2.4rem] grid h-10 w-10 shrink-0 place-content-center rounded-full bg-surface-green/50 text-[1.2rem] font-normal leading-[4.2rem] text-primary">
                  {step.number}
                </span>
                <div>
                  <h3 className="mb-4 text-[1.3rem] font-medium leading-[2.4rem] text-[#313131]">
                    {step.title}
                  </h3>
                  <p className="text-[1.2rem] font-normal leading-[1.8rem] text-muted">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

import Container from "@/components/layout/Container";
import { testimonials } from "@/data/home";

export default function Testimonials() {
  return (
    <section className="mx-auto mt-16 w-[calc(100%_-_2.5rem)] max-w-container px-8 lg:mt-40">
      <Container className="!px-0">
        <h2 className="text-[2.2rem] font-semibold leading-[4rem] tracking-[-0.1rem] text-[#313131]">
          What People Are Saying
        </h2>
        <div className="no-scrollbar mt-14 flex snap-x snap-mandatory overflow-x-auto">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="mb-8 mr-4 flex w-[80vw] shrink-0 snap-start flex-col rounded-[0.8rem] border-[1.6px] border-line-strong p-8 last:mr-0 sm:basis-[45%] sm:mr-6 lg:basis-[30%]"
            >
              <blockquote className="flex-1 text-[1.2rem] font-medium leading-8 text-muted">
                &lsquo;&lsquo;{testimonial.quote}&rsquo;&rsquo;
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-6">
                <span className="grid h-12 w-12 shrink-0 place-content-center rounded-full bg-surface-green/50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={testimonial.avatar} alt="" className="h-[15px] w-[14px]" />
                </span>
                <div>
                  <p className="text-[1.2rem] font-medium leading-4 text-ink">{testimonial.name}</p>
                  <p className="mt-5 text-base leading-none text-muted">{testimonial.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

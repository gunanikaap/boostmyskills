import Container from "@/components/layout/Container";
import { testimonials } from "@/data/home";

export default function Testimonials() {
  return (
    <section className="mx-auto mt-16 max-w-container lg:mt-40">
      <Container className="!px-8">
        <h2 className="text-[2.2rem] font-semibold leading-[4rem] tracking-heading text-ink">
          What People Are Saying
        </h2>
        <div className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex w-[80vw] shrink-0 snap-start flex-col rounded-[0.8rem] border-[1.6px] border-line-strong p-8 sm:basis-[45%] lg:basis-[30%]"
            >
              <blockquote className="flex-1 text-lg leading-relaxed text-ink">
                &lsquo;&lsquo;{testimonial.quote}&rsquo;&rsquo;
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-content-center rounded-full bg-surface-green/50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={testimonial.avatar} alt="" className="h-7 w-7" />
                </span>
                <div>
                  <p className="text-lg font-medium text-ink">{testimonial.name}</p>
                  <p className="text-xs text-muted">{testimonial.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

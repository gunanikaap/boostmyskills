import Container from "@/components/layout/Container";
import { testimonials } from "@/data/home";

export default function Testimonials() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <h2 className="text-3xl font-semibold leading-tight tracking-heading text-ink sm:text-4xl">
          What People Are Saying
        </h2>
        <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex w-[85%] shrink-0 snap-start flex-col rounded-[0.8rem] border-2 border-line-strong p-8 sm:w-[420px]"
            >
              <blockquote className="flex-1 text-lg leading-relaxed text-ink">
                &lsquo;&lsquo;{testimonial.quote}&rsquo;&rsquo;
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-green/50">
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

import Container from "@/components/layout/Container";
import { testimonials } from "@/data/home";

export default function Testimonials() {
  return (
    <section className="bg-surface py-16 lg:py-24">
      <Container>
        <h2 className="text-center text-3xl font-bold leading-tight text-ink sm:text-4xl">
          What people are saying
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex h-full flex-col rounded-card border border-line bg-white p-7 shadow-card"
            >
              <blockquote className="flex-1 text-sm leading-relaxed text-ink">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={testimonial.avatar} alt="" className="h-11 w-11 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold text-ink">{testimonial.name}</p>
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

import Container from "@/components/layout/Container";
import { benefits } from "@/data/home";

export default function Benefits() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Benefits of BoostMySkills
          </h2>
          <p className="mt-4 text-base text-muted">
            Certifications to boost your skills and career prospects.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-card border border-line bg-white p-6 shadow-card"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={benefit.icon} alt="" className="h-6 w-6" />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink">{benefit.title}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

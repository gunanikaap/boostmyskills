import Link from "next/link";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { images } from "@/data/site";

const options = [
  {
    icon: images.optionMicroProgrammes,
    title: "Micro-programmes",
    description:
      "Deepen your expertise with our comprehensive micro-programmes, each made up of ten micro-credentials covering a wide range of topics in renewable energy.",
    href: "/programs",
  },
  {
    icon: images.optionMicroCredentials,
    title: "Micro-credentials",
    description:
      "Boost your skill set with our targeted micro-credentials. These concise courses are ideal for enhancing specific competencies.",
    href: "/courses",
  },
];

export default function ChooseOption() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Expand your knowledge with specialised learning paths"
          title="Choose your option"
          description="Choose a micro-programme, where each consists of ten micro-credentials, or pick one or more individual micro-credentials."
          align="center"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {options.map((option) => (
            <div
              key={option.title}
              className="rounded-card border border-line bg-white p-8 shadow-card"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={option.icon} alt="" className="h-12 w-12" />
              <h3 className="mt-5 text-xl font-bold text-ink">{option.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{option.description}</p>
              <Link
                href={option.href}
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark"
              >
                View all
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

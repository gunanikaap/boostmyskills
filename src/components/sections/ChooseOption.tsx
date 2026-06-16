import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { images } from "@/data/site";

const options = [
  {
    icon: images.optionMicroProgrammes,
    title: "Micro-programmes",
    description:
      "Deepen your expertise with our comprehensive micro-programmes designed to cover a wide range of topics in renewable energy",
    href: "/programs",
    highlight: true,
  },
  {
    icon: images.optionMicroCredentials,
    title: "Micro-credentials",
    description:
      "Boost your skill set with our targeted micro-credentials. These concise courses are ideal for those looking to enhance specific competencies",
    href: "/courses",
    highlight: false,
  },
];

export default function ChooseOption() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Expand your Knowledge with Specialised Learning Paths"
          title="Choose your option"
          description="Choose a micro-programme, where each micro-programme consists of 10 micro-credentials. Or choose one or more individual micro-credentials."
          align="center"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {options.map((option) => (
            <div
              key={option.title}
              className={`flex flex-col items-center rounded-[1.3rem] border-2 p-8 text-center ${
                option.highlight ? "border-primary" : "border-line-strong"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={option.icon} alt="" className="h-14 w-14" />
              <h3 className="mt-6 text-2xl font-semibold text-ink">{option.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-muted">{option.description}</p>
              <Button href={option.href} variant="primary" className="mt-6">
                View all
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

import Container from "@/components/layout/Container";
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
    <section className="mx-auto mt-24 w-[90%] max-w-container">
      <Container className="!px-5">
        <div className="text-center">
          <span className="mb-8 inline-block pt-[0.9rem] text-2xl font-semibold leading-4 text-primary">
            Expand your Knowledge with Specialised Learning Paths
          </span>
          <h2 className="mb-[2.2rem] text-[2.2rem] font-extrabold leading-[1.2] text-black">
            Choose your option
          </h2>
          <p className="mx-auto text-[1.2rem] font-medium leading-8 text-muted md:max-w-[70%]">
            Choose a micro-programme, where each micro-programme consists of 10 micro-credentials. Or choose one or more individual micro-credentials.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {options.map((option) => (
            <div
              key={option.title}
              className={`mb-8 rounded-[1.3rem] border-[0.2rem] p-8 text-center ${
                option.highlight ? "border-primary" : "border-line-strong"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={option.icon} alt="" className="mx-auto mb-[2.2rem] h-[52px] w-[52px]" />
              <h3 className="mb-6 text-center text-[2rem] font-semibold leading-[3.5rem] text-[#313131]">
                {option.title}
              </h3>
              <p className="mb-[1.7rem] text-center text-[1.1rem] font-medium leading-8 text-muted">
                {option.description}
              </p>
              <Button href={option.href} variant="primary" className="mx-auto !px-10 !py-4 !text-[1.1rem] !font-bold !leading-[2.2rem]">
                View all
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

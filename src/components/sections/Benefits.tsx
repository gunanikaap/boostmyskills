import Container from "@/components/layout/Container";
import { images } from "@/data/site";
import { benefits } from "@/data/home";

export default function Benefits() {
  return (
    <section className="mx-auto mt-14 w-[90%] max-w-container lg:mt-24">
      <Container className="!px-0 lg:flex">
        <div className="hidden lg:block lg:basis-1/2 lg:pl-[18px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images.ipad} alt="The BoostMySkills learning platform" className="h-auto max-w-[80%]" />
        </div>
        <div className="lg:min-w-0 lg:basis-1/2 lg:pr-[18px]">
          <span className="mb-8 inline-block whitespace-nowrap pt-[14.4px] text-2xl font-semibold leading-8 text-primary">
            Certifications to boost your skills and career prospects
          </span>
          <h2 className="mb-12 text-[2.2rem] font-semibold leading-[1.2] tracking-[-1.16px] text-ink">
            Benefits of BoostMySkills
          </h2>
          <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:flex lg:flex-wrap lg:justify-between lg:gap-0">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="lg:mb-8 lg:basis-[45%]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={benefit.icon} alt="" className="mb-4 h-8 w-8" />
                <p className="text-base font-medium leading-8 text-muted">{benefit.title}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

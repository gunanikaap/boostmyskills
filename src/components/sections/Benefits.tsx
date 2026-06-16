import Container from "@/components/layout/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import { images } from "@/data/site";
import { benefits } from "@/data/home";

export default function Benefits() {
  return (
    <section className="mx-auto mt-14 w-[90%] max-w-container lg:mt-24">
      <Container className="grid items-center gap-12 !px-0 lg:grid-cols-2">
        <div className="hidden lg:flex lg:justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images.ipad} alt="The BoostMySkills learning platform" className="h-full w-full max-w-lg object-contain" />
        </div>
        <div>
          <Eyebrow>Certifications to boost your skills and career prospects</Eyebrow>
          <h2 className="mt-3 text-[2.2rem] font-semibold leading-tight tracking-heading text-ink">
            Benefits of BoostMySkills
          </h2>
          <div className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div key={benefit.title}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={benefit.icon} alt="" className="h-8 w-8" />
                <p className="mt-4 text-base leading-relaxed text-ink">{benefit.title}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

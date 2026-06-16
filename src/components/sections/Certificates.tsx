import Container from "@/components/layout/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import { images, FUNDING_BLURB } from "@/data/site";

export default function Certificates() {
  return (
    <section className="py-16 lg:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Eyebrow>Earn BoostMySkills</Eyebrow>
          <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-heading text-ink sm:text-4xl">
            Micro-credential and Micro-programme Certificates
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-muted2">
            Develop and advance your expertise with our comprehensive micro-credential and
            micro-programme courses. Gain practical knowledge and skills to drive energy
            innovations and decarbonisation strategies.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images.certified} alt="" className="h-12 w-12 shrink-0" />
            <p className="text-lg font-medium leading-relaxed text-ink">{FUNDING_BLURB}</p>
          </div>
        </div>
        <div className="flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images.diploma} alt="Example certificate" className="w-full max-w-lg" />
        </div>
      </Container>
    </section>
  );
}

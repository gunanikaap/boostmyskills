import Container from "@/components/layout/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import { images, FUNDING_BLURB } from "@/data/site";

export default function Certificates() {
  return (
    <section className="mx-auto mt-24 w-[90%] max-w-container">
      <Container className="grid items-center gap-12 !px-0 lg:grid-cols-[1fr_0.8fr] lg:justify-between">
        <div className="flex h-full flex-col justify-between">
          <Eyebrow>Earn BoostMySkills</Eyebrow>
          <h2 className="mt-3 max-w-xl text-[2.2rem] font-semibold leading-tight text-ink">
            Micro-credential and Micro-programme Certificates
          </h2>
          <p className="mt-6 max-w-[29rem] text-[1.2rem] leading-8 text-muted2">
            Develop and advance your expertise with our comprehensive micro-credential and
            micro-programme courses. Gain practical knowledge and skills to drive energy
            innovations and decarbonisation strategies.
          </p>
          <div className="mt-6 flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images.certified} alt="" className="h-12 w-12 shrink-0" />
            <p className="ml-3 text-2xl font-medium leading-relaxed text-ink">{FUNDING_BLURB}</p>
          </div>
        </div>
        <div className="grid place-content-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images.diploma} alt="Example certificate" className="mt-8 w-full max-w-xl" />
        </div>
      </Container>
    </section>
  );
}

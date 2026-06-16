import Container from "@/components/layout/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import { images, FUNDING_BLURB } from "@/data/site";

export default function Certificates() {
  return (
    <section className="bg-surface py-16 lg:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <Eyebrow>Earn BoostMySkills</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Micro-credential and Micro-programme Certificates
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Develop and advance your expertise with our comprehensive micro-credential and
            micro-programme courses. Gain practical knowledge and skills to drive energy
            innovations and decarbonisation strategies.
          </p>
          <div className="mt-6 flex items-start gap-4 rounded-2xl border border-line bg-white p-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images.certified} alt="" className="h-12 w-12 shrink-0" />
            <p className="text-sm leading-relaxed text-muted">{FUNDING_BLURB}</p>
          </div>
        </div>
        <div className="flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images.diploma} alt="Example certificate" className="w-full max-w-md" />
        </div>
      </Container>
    </section>
  );
}

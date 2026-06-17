import Container from "@/components/layout/Container";
import { images, FUNDING_BLURB } from "@/data/site";

export default function Certificates() {
  return (
    <section className="mx-auto mt-24 w-[90%] max-w-container">
      <Container className="!px-5 min-[800px]:flex min-[800px]:justify-between">
        <div className="flex flex-col justify-between min-[800px]:basis-1/2">
          <span className="mb-8 block pt-[0.9rem] text-2xl font-semibold leading-4 text-primary">
            Earn BoostMySkills
          </span>
          <h2 className="mb-[15px] text-[2.2rem] font-semibold leading-[1.2] text-black">
            Micro-credential and Micro-programme Certificates
          </h2>
          <p className="mb-6 max-w-[29rem] text-[1.2rem] leading-8 text-muted2">
            Develop and advance your expertise with our comprehensive micro-credential and
            micro-programme courses. Gain practical knowledge and skills to drive energy
            innovations and decarbonisation strategies.
          </p>
          <div className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images.certified} alt="" className="h-[30px] w-[30px] shrink-0 self-baseline" />
            <p className="ml-[0.8rem] text-2xl font-medium leading-[1.9rem] text-black">{FUNDING_BLURB}</p>
          </div>
        </div>
        <div className="grid place-content-center min-[800px]:basis-[40%] min-[800px]:max-w-[40rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images.diploma} alt="Example certificate" className="mt-8 w-full" />
        </div>
      </Container>
    </section>
  );
}

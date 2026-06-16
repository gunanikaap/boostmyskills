import Container from "@/components/layout/Container";
import { images } from "@/data/site";

export default function Partners() {
  return (
    <section className="mx-auto my-14 max-w-container lg:mb-40">
      <Container className="!px-8">
        <h2 className="text-[2.2rem] font-semibold leading-[6.2rem] text-ink">
          Our Partners
        </h2>
        <div className="mt-14 flex flex-col gap-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images.partners} alt="Partner universities and organisations" className="w-full max-w-[100rem]" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images.extraPartners} alt="Supporting partners" className="w-full max-w-3xl" />
        </div>
      </Container>
    </section>
  );
}

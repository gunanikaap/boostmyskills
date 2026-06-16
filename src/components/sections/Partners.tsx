import Container from "@/components/layout/Container";
import { images } from "@/data/site";

export default function Partners() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <h2 className="text-3xl font-semibold leading-tight tracking-heading text-ink sm:text-4xl">
          Our Partners
        </h2>
        <div className="mt-10 flex flex-col gap-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images.partners} alt="Partner universities and organisations" className="w-full" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images.extraPartners} alt="Supporting partners" className="w-full max-w-3xl" />
        </div>
      </Container>
    </section>
  );
}

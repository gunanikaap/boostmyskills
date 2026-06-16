import Container from "@/components/layout/Container";
import { images } from "@/data/site";

export default function Partners() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <h2 className="text-center text-2xl font-bold text-ink sm:text-3xl">Our Partners</h2>
        <div className="mt-10 flex flex-col items-center gap-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images.partners} alt="Partner universities and organisations" className="w-full max-w-4xl" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images.extraPartners} alt="Supporting partners" className="w-full max-w-2xl" />
        </div>
      </Container>
    </section>
  );
}

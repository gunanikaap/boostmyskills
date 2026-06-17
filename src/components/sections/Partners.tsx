import Container from "@/components/layout/Container";
import { images } from "@/data/site";

export default function Partners() {
  return (
    <section className="mx-auto mb-14 mt-14 w-[calc(100%_-_2.5rem)] max-w-container px-8 lg:mb-40 lg:mt-24">
      <Container className="!px-0">
        <h2 className="text-[2.2rem] font-semibold leading-[6.2rem] text-ink">
          Our Partners
        </h2>
        <div className="mt-14">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images.partners}
            alt="Partner universities and organisations"
            className="block h-auto w-full max-w-[100rem]"
          />
          <div className="flex w-full items-center justify-center bg-[rgba(213,231,208,0.5)] p-[15px] max-md:p-2.5 max-sm:p-[5px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images.extraPartners}
              alt="Supporting project funding partners"
              className="block h-auto w-full max-w-[1500px]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

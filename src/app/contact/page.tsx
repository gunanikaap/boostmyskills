import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import ContactForm from "@/components/ContactForm";
import { externalLinks } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact | BoostMySkills",
  description: "Contact us if you have questions about BoostMySkills.",
};

export default function ContactPage() {
  return (
    <section className="py-9 lg:py-10">
      <Container className="grid !max-w-[1120px] gap-12 lg:!px-0 lg:grid-cols-2 lg:gap-0">
        <div>
          <h1 className="max-w-[18.75rem] text-4xl font-bold leading-tight text-black sm:text-5xl lg:text-[4.3rem] lg:leading-[1.2]">
            Let’s get in touch!
          </h1>
          <p className="mt-12 max-w-[27.5rem] text-[1.5rem] leading-[1.3] text-black lg:mt-24">
            Contact us if you have questions about BoostMySkills.
          </p>
          <div className="mt-20">
            <p className="text-xl text-black">Follow us</p>
            <div className="mt-6 flex">
              <a
                href={externalLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="BoostMySkills on LinkedIn"
                className="inline-flex"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/linkedin.png" alt="" className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="lg:self-end">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}

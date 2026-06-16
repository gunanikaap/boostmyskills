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
    <section className="py-12 lg:py-20">
      <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1 className="text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">
            Let&apos;s get in touch!
          </h1>
          <p className="mt-6 max-w-md text-xl leading-relaxed text-ink">
            Contact us if you have questions about BoostMySkills.
          </p>
          <div className="mt-12">
            <p className="text-xl text-ink">Follow us</p>
            <div className="mt-4 flex">
              <a
                href={externalLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="BoostMySkills on LinkedIn"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line transition-colors hover:border-primary"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/linkedin.png" alt="" className="h-5 w-5" />
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

import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/ui/PageHeader";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | BoostMySkills",
  description: "Get in touch with the BoostMySkills team.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Let's get in touch!"
        description="Contact us if you have questions about BoostMySkills."
      />
      <section className="py-14 lg:py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6 text-base leading-relaxed text-muted">
            <p>
              We&apos;d love to hear from you. Fill in the form and a member of the team will be in
              touch.
            </p>
            <div className="rounded-card border border-line bg-surface p-6">
              <p className="text-sm font-semibold text-ink">Email</p>
              <p className="mt-1 text-sm text-muted">info@boostmyskills.eu</p>
            </div>
          </div>
          <ContactForm />
        </Container>
      </section>
    </>
  );
}

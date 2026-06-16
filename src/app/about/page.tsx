import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/ui/PageHeader";
import { aboutParagraphs } from "@/data/about";

export const metadata: Metadata = {
  title: "About | BoostMySkills",
  description:
    "BoostMySkills offers free, fully funded sustainability education built by pan-European and international universities, supported by UNITAR.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About us" />
      <section className="py-12 lg:py-16">
        <Container className="max-w-4xl space-y-6 text-lg leading-relaxed text-muted">
          {aboutParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Container>
      </section>
    </>
  );
}

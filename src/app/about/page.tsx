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
      <section className="pb-28 pt-0">
        <Container className="!max-w-[1120px] lg:!px-0 space-y-6 text-[1.25rem] leading-[1.8rem] text-muted">
          {aboutParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Container>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/ui/PageHeader";
import { externalLinks } from "@/data/site";
import { aboutStat, aboutParagraphs } from "@/data/about";

export const metadata: Metadata = {
  title: "About | BoostMySkills",
  description:
    "BoostMySkills offers free, fully funded sustainability education built by the RES4CITY, SHERLOCK and COSS projects.",
};

const projects = [
  {
    name: "RES4CITY",
    href: externalLinks.res4city,
    blurb: "Renewable Energies for Cities — driving sustainable urban energy education across Europe.",
  },
  {
    name: "SHERLOCK",
    href: externalLinks.sherlock,
    blurb: "Skills and training for energy efficiency and renovation in the building sector.",
  },
  {
    name: "COSS",
    href: externalLinks.coss,
    blurb: "A consortium of South Korean universities co-funding global sustainability learning.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Free sustainability education, built by universities"
        description="BoostMySkills brings together micro-programmes and micro-credentials from pan-European and international universities to help learners drive the green transition."
      />

      <section className="py-14 lg:py-20">
        <Container className="max-w-3xl space-y-6">
          <div className="rounded-card border border-line bg-surface p-8">
            <p className="text-4xl font-bold text-primary sm:text-5xl">{aboutStat.value}</p>
            <p className="mt-2 text-base leading-relaxed text-muted">{aboutStat.label}</p>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-muted">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface py-14 lg:py-20">
        <Container>
          <h2 className="text-2xl font-bold text-ink sm:text-3xl">The projects behind BoostMySkills</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {projects.map((project) => (
              <div key={project.name} className="rounded-card border border-line bg-white p-6 shadow-card">
                <h3 className="text-lg font-bold text-ink">{project.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{project.blurb}</p>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark"
                >
                  Visit project
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

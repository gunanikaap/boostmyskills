import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/ui/PageHeader";
import CourseCatalogue from "@/components/sections/CourseCatalogue";
import { courses } from "@/data/courses";

export const metadata: Metadata = {
  title: "Micro-credentials | BoostMySkills",
  description:
    "Browse individual micro-credentials. These concise, targeted courses are ideal for building specific sustainability competencies.",
};

export default function CoursesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Catalogue"
        title="Micro-credentials"
        description={`Browse ${courses.length} targeted micro-credentials. Take them individually or as part of a micro-programme.`}
      />
      <section className="py-14 lg:py-20">
        <Container>
          {/*
            NOTE (MVP): the micro-credential list is derived from the programme
            data in src/data/programs.ts, not from an official course-discovery
            API. The search box and "Refine Your Search" panel are functional but
            scoped to that derived data. Wire this page to the real catalogue
            API/data when it is available. See src/data/courses.ts.
          */}
          <CourseCatalogue />
        </Container>
      </section>
    </>
  );
}

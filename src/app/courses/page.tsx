import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import CourseCatalogue from "@/components/sections/CourseCatalogue";

export const metadata: Metadata = {
  title: "Micro-credentials | BoostMySkills",
  description:
    "Browse individual micro-credentials. These concise, targeted courses are ideal for building specific sustainability competencies.",
};

export default function CoursesPage() {
  return (
    <section className="bg-white pb-24 pt-10 lg:pt-[10.5rem]">
      <Container className="max-w-container">
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
  );
}

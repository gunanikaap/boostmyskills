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
    <section className="bg-white pb-24 pt-8">
      <Container className="max-w-container">
        {/* Course data is the real catalogue from the live Open edX Course API
            (snapshotted in src/data/courses.ts, images in public/images/courses). */}
        <CourseCatalogue />
      </Container>
    </section>
  );
}

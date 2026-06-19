import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import CourseCatalogue from "@/components/sections/CourseCatalogue";
import { getCatalogue } from "@/lib/courses/catalogue";

export const metadata: Metadata = {
  title: "Micro-credentials | BoostMySkills",
  description:
    "Browse individual micro-credentials. These concise, targeted courses are ideal for building specific sustainability competencies.",
};

// Served live from the Open edX course API, revalidated hourly (with a snapshot
// fallback if the API is unavailable — see src/lib/courses/catalogue.ts). In a
// normal deployment the build/runtime can reach the API, so the catalogue is
// live and refreshes every hour.
export const revalidate = 3600;

export default async function CoursesPage() {
  const { courses, projectFacet, orgFacet, topicFacet } = await getCatalogue();
  return (
    <section className="bg-white pb-24 pt-8">
      <Container className="max-w-container">
        <CourseCatalogue
          courses={courses}
          projectFacet={projectFacet}
          orgFacet={orgFacet}
          topicFacet={topicFacet}
        />
      </Container>
    </section>
  );
}

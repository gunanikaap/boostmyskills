import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import ConfirmEmailBanner from "@/components/dashboard/ConfirmEmailBanner";
import EmptyEnrolments from "@/components/dashboard/EmptyEnrolments";
import { getLearner, relatedProgrammes } from "@/lib/dashboard/learner";

export const metadata: Metadata = {
  title: "My Micro-credentials | BoostMySkills",
  description: "Your enrolled BoostMySkills micro-credentials.",
};

// Reads the auth session cookie, so it must render per-request.
export const dynamic = "force-dynamic";

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M12 11v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="7.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

/**
 * "My Micro-credentials" — the learner's enrolled courses, mirroring the live
 * LMS layout (image, Developed by, Course number, pass grade, View button, and
 * Related Micro-programme(s)). Real enrolments come from the `enrolments` table.
 */
export default async function MyCredentialsPage() {
  const { emailConfirmed, enrolledCourses } = await getLearner("/dashboard");

  return (
    <>
      <ConfirmEmailBanner show={!emailConfirmed} />
      <section className="py-9 lg:py-12">
        <Container className="!max-w-[1100px]">
          <h1 className="text-[2.5rem] font-semibold leading-tight tracking-[-1.16px] text-ink sm:text-[3rem]">
            My Micro-credentials
          </h1>

          {enrolledCourses.length > 0 ? (
            <div className="mt-10 space-y-16">
              {enrolledCourses.map((course) => {
                const related = relatedProgrammes(course.name);
                return (
                  <div key={course.id}>
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                      <div className="h-44 w-full max-w-[260px] shrink-0 overflow-hidden rounded-2xl bg-surface-alt">
                        {course.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={course.image}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        ) : null}
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold leading-tight text-ink sm:text-[1.75rem]">
                          {course.name}
                        </h2>
                        <p className="mt-4 text-sm font-semibold text-muted">
                          Developed by:{" "}
                          <span className="text-primary">{course.org}</span>
                        </p>
                        <p className="mt-1.5 text-sm font-semibold text-muted">
                          Course number:{" "}
                          <span className="text-ink">{course.number}</span>
                        </p>
                        <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary">
                          <InfoIcon />
                          Grade required to pass the course: 50%
                        </p>
                        <div className="mt-5">
                          <a
                            href={course.aboutUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                          >
                            View Micro-credential
                            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>

                    {related.length > 0 ? (
                      <div className="mt-6">
                        <p className="text-sm font-semibold text-primary">
                          Related Micro-programme(s):
                        </p>
                        <div className="mt-3 space-y-3">
                          {related.map((p) => (
                            <div key={p.slug} className="flex items-center gap-4">
                              <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-surface-alt">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={p.image}
                                  alt=""
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium text-ink">{p.title}</p>
                                <a
                                  href={p.enrolUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm font-medium text-ink underline transition-colors hover:text-primary"
                                >
                                  View micro-programme
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyEnrolments />
          )}
        </Container>
      </section>
    </>
  );
}

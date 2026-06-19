import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import ConfirmEmailBanner from "@/components/dashboard/ConfirmEmailBanner";
import EmptyEnrolments from "@/components/dashboard/EmptyEnrolments";
import { getLearner } from "@/lib/dashboard/learner";

export const metadata: Metadata = {
  title: "My Micro-programmes | BoostMySkills",
  description: "Your enrolled BoostMySkills micro-programmes.",
};

// Reads the auth session cookie, so it must render per-request.
export const dynamic = "force-dynamic";

/**
 * "My micro-programmes" — the learner's enrolled programmes, mirroring the live
 * LMS layout (image, title, progress counts, View button). Real enrolments come
 * from the `enrolments` table. NOTE: this build does not track per-credential
 * completion (that lives in Open edX), so progress is shown as not-started
 * (everything Remaining) rather than fabricated.
 */
export default async function MyProgrammesPage() {
  const { emailConfirmed, enrolledPrograms } = await getLearner(
    "/dashboard/programmes",
  );

  return (
    <>
      <ConfirmEmailBanner show={!emailConfirmed} />
      <section className="py-9 lg:py-12">
        <Container className="!max-w-[1100px]">
          <h1 className="text-[2.5rem] font-semibold leading-tight tracking-[-1.16px] text-ink sm:text-[3rem]">
            My micro-programmes
          </h1>

          {enrolledPrograms.length > 0 ? (
            <div className="mt-12 space-y-14">
              {enrolledPrograms.map((p) => {
                const total = p.microCredentials.length;
                return (
                  <div
                    key={p.slug}
                    className="flex flex-col gap-8 sm:flex-row sm:items-center"
                  >
                    <div className="h-56 w-full max-w-[360px] shrink-0 overflow-hidden rounded-2xl bg-surface-alt">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold leading-tight text-ink sm:text-[1.875rem]">
                        {p.title}
                      </h2>
                      <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-sm">
                        <span>
                          <strong className="text-primary">0</strong>{" "}
                          <span className="text-muted">Completed</span>
                        </span>
                        <span>
                          <strong className="text-accent">0</strong>{" "}
                          <span className="text-muted">In Progress</span>
                        </span>
                        <span>
                          <strong className="text-ink">{total}</strong>{" "}
                          <span className="text-muted">Remaining</span>
                        </span>
                      </div>
                      <div className="mt-8">
                        <a
                          href={p.enrolUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                        >
                          View micro-programmes
                          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>
                      </div>
                    </div>
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

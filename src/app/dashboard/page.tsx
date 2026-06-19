import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import ProgramCard from "@/components/cards/ProgramCard";
import CourseCard from "@/components/cards/CourseCard";
import { programs } from "@/data/programs";
import { courses } from "@/data/courses";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { listEnrolments } from "@/lib/db/enrolments";

export const metadata: Metadata = {
  title: "My Micro-credentials | BoostMySkills",
  description: "Your BoostMySkills learner dashboard.",
};

// Reads the auth session cookie, so it must render per-request.
export const dynamic = "force-dynamic";

/**
 * Local learner dashboard, mirroring the live Open edX learner dashboard's
 * empty state. Protected by the local Supabase session: signed-out users are
 * sent to /login?next=/dashboard. Since this build does not track real
 * enrolments (those live in Open edX), it always shows the "not enrolled yet"
 * state and hands enrolment off to the public catalogue (/programs, /courses).
 */
export default async function DashboardPage() {
  if (!isSupabaseConfigured) {
    redirect(`/login?next=${encodeURIComponent("/dashboard")}`);
  }

  const supabase = createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    redirect(`/login?next=${encodeURIComponent("/dashboard")}`);
  }

  const user = data.user;
  // Only shown if a session exists but the email is unconfirmed (e.g. if email
  // confirmation is later turned off in Supabase). With confirmation on, a
  // signed-in user is already confirmed, so this banner stays hidden.
  const emailConfirmed = Boolean(user.email_confirmed_at ?? user.confirmed_at);

  // This user's real enrolments (from the DB), resolved to catalogue items.
  const enrolments = await listEnrolments(supabase, user.id);
  const enrolledPrograms = enrolments
    .filter((e) => e.kind === "program")
    .map((e) => programs.find((p) => p.slug === e.ref))
    .filter((p): p is (typeof programs)[number] => Boolean(p));
  const enrolledCourses = enrolments
    .filter((e) => e.kind === "course")
    .map((e) => courses.find((c) => c.id === e.ref))
    .filter((c): c is (typeof courses)[number] => Boolean(c));
  const hasEnrolments = enrolledPrograms.length + enrolledCourses.length > 0;

  return (
    <>
      {!emailConfirmed ? (
        <div className="bg-[#00B0F0]">
          <Container className="py-3 text-center text-sm font-medium text-ink">
            Remember to confirm your email so that you can keep learning — open
            the confirmation link we sent (check your spam folder).
          </Container>
        </div>
      ) : null}

      <section className="py-9 lg:py-12">
        <Container className="!max-w-[1200px]">
          <h1 className="text-[2.5rem] font-semibold leading-tight tracking-[-1.16px] text-ink sm:text-[3rem]">
            My Micro-credentials
          </h1>

          {hasEnrolments ? (
            // Real enrolments — rendered with the same cards used across the site.
            <div className="mt-10 space-y-14">
              {enrolledPrograms.length > 0 ? (
                <div>
                  <h2 className="mb-6 text-2xl font-semibold text-ink">
                    Micro-programmes
                  </h2>
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {enrolledPrograms.map((program) => (
                      <ProgramCard key={program.slug} program={program} />
                    ))}
                  </div>
                </div>
              ) : null}
              {enrolledCourses.length > 0 ? (
                <div>
                  <h2 className="mb-6 text-2xl font-semibold text-ink">
                    Micro-credentials
                  </h2>
                  <div className="grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
                    {enrolledCourses.map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            // Empty state — matches the live LMS learner dashboard.
            <div className="mt-10 rounded-card bg-surface-alt p-8 lg:p-14">
              <div className="grid items-center gap-10 lg:grid-cols-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/dashboard-empty.svg"
                  alt=""
                  className="mx-auto w-full max-w-[380px]"
                />
                <div>
                  <h2 className="text-3xl font-bold leading-tight text-ink sm:text-[2.75rem] sm:leading-[1.15]">
                    You are not enrolled in any micro-programme or micro-credential
                    yet
                  </h2>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Button href="/programs" variant="primary" className="!px-7 !py-3">
                      Enrol in micro-programmes
                      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Button>
                    <Button href="/courses" variant="primary" className="!px-7 !py-3">
                      Enrol in micro-credentials
                      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import { programs } from "@/data/programs";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { addEnrolment } from "@/lib/db/enrolments";

export const metadata: Metadata = {
  title: "Enrol | BoostMySkills",
  description:
    "Local enrolment hand-off. Sign-in is verified with the local Supabase demo auth; final enrolment is handled by the existing Open edX backend.",
};

// Reads the auth session cookie, so it must render per-request.
export const dynamic = "force-dynamic";

/**
 * Local, auth-gated enrolment hand-off page (used in "local"/"demo" auth mode).
 *
 * Flow:
 *  - The Enrol buttons (see ProgramCard / enrolLink) point here in local mode.
 *  - If Supabase is configured and there is NO session, we bounce to
 *    /login?next=<this page> so the user signs in with the local Supabase auth
 *    and returns here afterwards.
 *  - Once signed in, we show an honest hand-off: this build captured the
 *    enrolment intent locally only. Real LMS enrolment still lives in Open edX
 *    and is offered via a "Continue to Open edX enrolment" link.
 *
 * This page never claims that Supabase enrols anyone into Open edX, and it does
 * not store anything (no enrolment table exists in this build).
 */
export default async function EnrolPage({
  searchParams,
}: {
  searchParams: { program?: string };
}) {
  const slug =
    typeof searchParams.program === "string" ? searchParams.program : undefined;
  const program = slug ? programs.find((p) => p.slug === slug) : undefined;
  const selfUrl = `/enrol${slug ? `?program=${encodeURIComponent(slug)}` : ""}`;

  // Verify the local Supabase session (the only auth this build performs).
  let userEmail: string | undefined;
  if (isSupabaseConfigured) {
    const supabase = createSupabaseServerClient();
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      // Not signed in -> send to local login, preserving where to return.
      redirect(`/login?next=${encodeURIComponent(selfUrl)}`);
    }
    userEmail = data.user.email ?? undefined;

    // Record this enrolment request for the user (idempotent). The real LMS
    // enrolment still happens at Open edX via the hand-off link below; this is
    // this app's own record, shown on /dashboard.
    if (program) {
      await addEnrolment(supabase, data.user.id, {
        kind: "program",
        ref: program.slug,
        title: program.title,
        sourceUrl: program.enrolUrl,
      });
    }
  }

  // When Supabase isn't configured (clone-and-run demo, no backend) there is no
  // session to verify and /login can't create one, so we don't claim a session
  // or loop the user back to login — we render the hand-off honestly instead.
  const sessionVerified = isSupabaseConfigured;

  return (
    <>
      <PageHeader
        title="Enrolment request received"
        description={
          program
            ? `${program.title} (${program.code} | ${program.project})`
            : "Micro-programme enrolment"
        }
      />
      <section className="bg-white pb-24">
        <Container className="!max-w-[1120px] lg:!px-0">
          <div className="max-w-2xl rounded-card border border-line bg-surface p-8">
            {sessionVerified ? (
              <p className="leading-relaxed text-muted">
                You are signed in
                {userEmail ? ` as ${userEmail}` : ""} with the local Supabase
                demo auth. This demo has captured your enrolment intent locally.
                Final LMS enrolment is handled by the existing Open edX backend
                and requires production integration — it is{" "}
                <strong className="font-semibold">not</strong> completed here.
              </p>
            ) : (
              <p className="leading-relaxed text-muted">
                Real sign-in (Supabase) is not configured in this build, so no
                account session could be verified. This is a local hand-off
                placeholder: final LMS enrolment is handled by the existing Open
                edX backend and requires production integration — nothing is
                enrolled or stored here.
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              {program ? (
                <Button href={program.enrolUrl} variant="primary" external>
                  Continue to Open edX enrolment
                </Button>
              ) : null}
              <Button href="/programs" variant="outline">
                Back to programmes
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

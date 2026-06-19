import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import { programs } from "@/data/programs";
import { courses } from "@/data/courses";
import { LMS_BASE } from "@/data/site";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { addEnrolment } from "@/lib/db/enrolments";
import type { EnrolmentKind } from "@/lib/db/types";

export const metadata: Metadata = {
  title: "Enrol | BoostMySkills",
  description:
    "Local enrolment hand-off. Sign-in is verified with the local Supabase demo auth; final enrolment is handled by the existing Open edX backend.",
};

// Reads the auth session cookie, so it must render per-request.
export const dynamic = "force-dynamic";

interface EnrolItem {
  kind: EnrolmentKind;
  ref: string;
  title?: string;
  sourceUrl?: string;
  label: string;
  selfQuery: string;
  backHref: string;
  backLabel: string;
}

/** Resolve the programme or course being enrolled in from the query params. */
function resolveItem(params: {
  program?: string;
  course?: string;
}): EnrolItem | null {
  if (typeof params.program === "string") {
    const slug = params.program;
    const p = programs.find((x) => x.slug === slug);
    return {
      kind: "program",
      ref: slug,
      title: p?.title,
      sourceUrl: p?.enrolUrl,
      label: p ? `${p.title} (${p.code} | ${p.project})` : "Micro-programme enrolment",
      selfQuery: `?program=${encodeURIComponent(slug)}`,
      backHref: "/programs",
      backLabel: "Back to programmes",
    };
  }
  if (typeof params.course === "string") {
    const id = params.course;
    const c = courses.find((x) => x.id === id);
    return {
      kind: "course",
      ref: id,
      title: c?.name,
      sourceUrl: c?.aboutUrl ?? `${LMS_BASE}/courses/${id}/about`,
      label: c ? `${c.name} (${c.org})` : "Micro-credential enrolment",
      selfQuery: `?course=${encodeURIComponent(id)}`,
      backHref: "/courses",
      backLabel: "Back to micro-credentials",
    };
  }
  return null;
}

/**
 * Local, auth-gated enrolment hand-off page (used in "local"/"demo" auth mode).
 *
 * Flow:
 *  - The Enrol buttons (ProgramCard / CourseCard) point here in local mode.
 *  - If Supabase is configured and there is NO session, we bounce to
 *    /login?next=<this page> so the user signs in and returns here afterwards.
 *  - Once signed in we RECORD the enrolment (idempotent, shown on /dashboard)
 *    and show an honest hand-off: the real LMS enrolment still lives in Open edX
 *    and is offered via a "Continue to Open edX enrolment" link.
 *
 * This page never claims that Supabase enrols anyone into Open edX.
 */
export default async function EnrolPage({
  searchParams,
}: {
  searchParams: { program?: string; course?: string };
}) {
  const item = resolveItem(searchParams);
  const selfUrl = `/enrol${item?.selfQuery ?? ""}`;

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
    if (item) {
      await addEnrolment(supabase, data.user.id, {
        kind: item.kind,
        ref: item.ref,
        title: item.title,
        sourceUrl: item.sourceUrl,
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
        description={item?.label ?? "Enrolment"}
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
              {item?.sourceUrl ? (
                <Button href={item.sourceUrl} variant="primary" external>
                  Continue to Open edX enrolment
                </Button>
              ) : null}
              <Button href={item?.backHref ?? "/programs"} variant="outline">
                {item?.backLabel ?? "Back to programmes"}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

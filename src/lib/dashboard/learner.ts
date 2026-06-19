import { redirect } from "next/navigation";
import { programs } from "@/data/programs";
import { courses } from "@/data/courses";
import type { Program } from "@/lib/types";
import type { Course } from "@/data/courses";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { listEnrolments } from "@/lib/db/enrolments";

type ServerClient = ReturnType<typeof createSupabaseServerClient>;

export interface Learner {
  supabase: ServerClient;
  userId: string;
  email?: string;
  fullName?: string;
  emailConfirmed: boolean;
  enrolledPrograms: Program[];
  enrolledCourses: Course[];
}

/**
 * Shared loader for the signed-in learner area. Verifies the Supabase session
 * (redirecting to /login?next=<nextPath> when absent) and resolves the user's
 * enrolments to catalogue items. Used by /dashboard, /dashboard/programmes and
 * /account.
 */
export async function getLearner(nextPath: string): Promise<Learner> {
  if (!isSupabaseConfigured) {
    redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  }
  const supabase = createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  }
  const user = data.user;

  const enrolments = await listEnrolments(supabase, user.id);
  const enrolledPrograms = enrolments
    .filter((e) => e.kind === "program")
    .map((e) => programs.find((p) => p.slug === e.ref))
    .filter((p): p is Program => Boolean(p));
  const enrolledCourses = enrolments
    .filter((e) => e.kind === "course")
    .map((e) => courses.find((c) => c.id === e.ref))
    .filter((c): c is Course => Boolean(c));

  return {
    supabase,
    userId: user.id,
    email: user.email ?? undefined,
    fullName: (user.user_metadata?.full_name as string | undefined)?.trim(),
    emailConfirmed: Boolean(user.email_confirmed_at ?? user.confirmed_at),
    enrolledPrograms,
    enrolledCourses,
  };
}

/** Programmes whose micro-credentials include this course (direct name match). */
export function relatedProgrammes(courseName: string): Program[] {
  return programs.filter((p) =>
    p.microCredentials.some((mc) => mc === courseName),
  );
}

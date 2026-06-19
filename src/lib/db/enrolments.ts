import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { DbResult } from "./contact";
import type { Enrolment, EnrolmentInput } from "./types";

type ServerClient = ReturnType<typeof createSupabaseServerClient>;

/**
 * Record an enrolment request for a signed-in user. Idempotent: a repeat of the
 * same (user, kind, ref) is ignored rather than duplicated. RLS guarantees a
 * user can only insert rows for themselves (see supabase/schema.sql).
 */
export async function addEnrolment(
  supabase: ServerClient,
  userId: string,
  input: EnrolmentInput,
): Promise<DbResult> {
  const { error } = await supabase.from("enrolments").upsert(
    {
      user_id: userId,
      kind: input.kind,
      ref: input.ref,
      title: input.title ?? null,
      source_url: input.sourceUrl ?? null,
    },
    { onConflict: "user_id,kind,ref", ignoreDuplicates: true },
  );
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

/** List a user's enrolments, newest first. Returns [] on any error. */
export async function listEnrolments(
  supabase: ServerClient,
  userId: string,
): Promise<Enrolment[]> {
  const { data, error } = await supabase
    .from("enrolments")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) return [];
  return (data ?? []) as Enrolment[];
}

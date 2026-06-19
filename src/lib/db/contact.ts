import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ContactMessageInput } from "./types";

type ServerClient = ReturnType<typeof createSupabaseServerClient>;

export interface DbResult {
  ok: boolean;
  error?: string;
}

/**
 * Store a contact submission. Anonymous inserts are allowed by RLS
 * (see supabase/schema.sql → contact_messages); reads are not.
 */
export async function insertContactMessage(
  supabase: ServerClient,
  input: ContactMessageInput,
): Promise<DbResult> {
  const { error } = await supabase.from("contact_messages").insert({
    name: input.name,
    email: input.email,
    message: input.message,
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

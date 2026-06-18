import { isSupabaseConfigured } from "@/lib/supabase/client";
import { demoProvider } from "./demo";
import { supabaseProvider } from "./supabase";
import type { AuthProvider } from "./types";

// openEdxProvider is intentionally available but not auto-selected yet — see
// ./openedx.ts. When the university provides Open edX API access, select it
// here (e.g. behind an AUTH_PROVIDER env flag) without touching the UI.
export { openEdxProvider } from "./openedx";
export * from "./types";

/**
 * The active auth backend:
 *   - Supabase when its keys are configured (real auth + stored users),
 *   - otherwise the demo provider (no backend; the forms show a notice).
 */
export function getAuthProvider(): AuthProvider {
  if (isSupabaseConfigured) return supabaseProvider;
  return demoProvider;
}

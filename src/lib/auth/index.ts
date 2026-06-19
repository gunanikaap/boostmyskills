import { isSupabaseConfigured } from "@/lib/supabase/client";
import { demoProvider } from "./demo";
import { supabaseProvider } from "./supabase";
import { openEdxProvider } from "./openedx";
import type { AuthProvider } from "./types";

export { openEdxProvider } from "./openedx";
export * from "./types";

/**
 * The active auth backend — the UI is identical whichever is chosen:
 *
 *   1. Open edX (PRODUCTION) when NEXT_PUBLIC_AUTH_PROVIDER=openedx — the clean
 *      in-site UI runs on the university's existing Open edX backend (real
 *      accounts, activation email, enrolment). See ./openedx.ts + the server
 *      route src/app/api/auth/openedx/route.ts. This is the production target.
 *   2. Supabase (DEMO) when its keys are configured — a free, standalone backend
 *      to demonstrate the clean pages working end-to-end without Open edX keys.
 *   3. Demo provider otherwise — no backend; the forms show a clear notice so
 *      the repo clones-and-runs.
 */
export function getAuthProvider(): AuthProvider {
  if (process.env.NEXT_PUBLIC_AUTH_PROVIDER === "openedx") return openEdxProvider;
  if (isSupabaseConfigured) return supabaseProvider;
  return demoProvider;
}

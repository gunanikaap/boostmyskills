import { createBrowserClient } from "@supabase/ssr";

/**
 * Whether real auth is wired up. True only when both public Supabase env vars
 * are present. When false the app falls back to demo auth (no backend), so the
 * repo clones-and-runs with no setup and the build never breaks.
 *
 * NOTE: NEXT_PUBLIC_* vars are inlined at build time, so set them before
 * building/restarting to switch from demo -> real auth.
 */
export const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** Browser Supabase client (uses the public anon key — safe to expose). */
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

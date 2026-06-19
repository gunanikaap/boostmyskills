import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { AuthProvider } from "./types";

/**
 * Real auth backed by Supabase Auth (free tier). Supabase handles password
 * hashing, sessions and email verification — we never store raw passwords.
 * The `full_name` is saved to user metadata and copied into public.profiles by
 * a DB trigger (see supabase/schema.sql).
 */
export const supabaseProvider: AuthProvider = {
  id: "supabase",

  async signIn({ email, password }) {
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      // The account exists but hasn't clicked its confirmation link yet.
      if (/not confirmed/i.test(error.message)) {
        return {
          status: "error",
          message:
            "Please confirm your email first — open the confirmation link we sent (check spam), then sign in.",
        };
      }
      return { status: "error", message: error.message };
    }
    return { status: "success", message: "Signed in successfully." };
  },

  async signUp({ email, password, fullName }) {
    const supabase = createSupabaseBrowserClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName ?? "" } },
    });
    if (error) return { status: "error", message: error.message };
    // Email confirmation is enabled: the account is created and stored now, but
    // no session is returned until the user confirms via the emailed link.
    if (data.user && !data.session) {
      return {
        status: "pending",
        message:
          "Account created and saved. Check your inbox (and spam) for a confirmation link — once confirmed, sign in on the Sign in tab.",
      };
    }
    return { status: "success", message: "Account created and signed in." };
  },
};

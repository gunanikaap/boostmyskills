import type { AuthProvider } from "./types";

const DEMO_MESSAGE =
  "Demo only — no authentication backend is configured. Add Supabase keys (see README) to enable real sign-in and registration.";

/** Fallback used when no real backend is configured. Stores nothing. */
export const demoProvider: AuthProvider = {
  id: "demo",
  async signIn() {
    return { status: "demo", message: DEMO_MESSAGE };
  },
  async signUp() {
    return { status: "demo", message: DEMO_MESSAGE };
  },
};

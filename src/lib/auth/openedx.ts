import type { AuthProvider, AuthResult } from "./types";

/**
 * Open edX auth adapter — the PRODUCTION backend.
 *
 * The existing BoostMySkills platform runs on Open edX, which already stores
 * accounts, sends the "Activate your account" email, and handles enrolment. This
 * adapter lets the clean in-site /login and /register UI run on that backend, so
 * the front-end is the only thing that changes — the engine stays Open edX.
 *
 * The browser must never hold the Open edX OAuth client secret, so this provider
 * just calls our own server route (/api/auth/openedx), which performs the real
 * Open edX calls using server-only env vars. See:
 *   - src/app/api/auth/openedx/route.ts  (the server-side integration)
 *   - .env.example                       (the credentials to provide)
 *
 * Selected when NEXT_PUBLIC_AUTH_PROVIDER=openedx (see ./index.ts). Until the
 * university provides Open edX API credentials, the server route returns a clear
 * "not configured yet" notice instead of failing silently.
 */
async function callServer(
  action: "login" | "register",
  payload: Record<string, unknown>,
): Promise<AuthResult> {
  try {
    const res = await fetch("/api/auth/openedx", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, ...payload }),
    });
    return (await res.json()) as AuthResult;
  } catch {
    return {
      status: "error",
      message: "Could not reach the sign-in service. Please try again.",
    };
  }
}

export const openEdxProvider: AuthProvider = {
  id: "openedx",
  signIn: ({ email, password }) => callServer("login", { email, password }),
  signUp: ({ email, password, fullName }) =>
    callServer("register", { email, password, fullName }),
};

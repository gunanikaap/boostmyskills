import type { AuthProvider } from "./types";

/**
 * DESIGNED FOR LATER — placeholder Open edX adapter.
 *
 * The existing BoostMySkills platform runs on Open edX. To eventually unify
 * accounts, implement these against the Open edX OAuth2 / user API once the
 * university provides OAuth client credentials, API permissions and redirect
 * URLs. Then select it in ./index.ts (e.g. via an AUTH_PROVIDER env var).
 *
 * Until then it returns a clear "not implemented" message rather than failing
 * silently.
 */
export const openEdxProvider: AuthProvider = {
  id: "openedx",
  async signIn() {
    return {
      status: "error",
      message:
        "Open edX sign-in is not wired up yet (needs OAuth credentials + API access).",
    };
  },
  async signUp() {
    return {
      status: "error",
      message:
        "Open edX registration is not wired up yet (needs OAuth credentials + API access).",
    };
  },
};

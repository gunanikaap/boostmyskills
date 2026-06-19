import { NextResponse } from "next/server";

/**
 * Server-side Open edX integration for the in-site auth UI.
 *
 * This runs on the server so the OAuth client secret is never exposed to the
 * browser. It is the ONE place to finish wiring real Open edX auth: the calls
 * below are the standard Open edX endpoints, but exact field names / CSRF /
 * version specifics MUST be verified by the university devs against their own
 * Open edX instance before going live.
 *
 * Required env (server-only — NOT NEXT_PUBLIC), see .env.example:
 *   OPENEDX_LMS_URL        e.g. https://apps.boostmyskills.eu
 *   OPENEDX_CLIENT_ID      OAuth2 application client id
 *   OPENEDX_CLIENT_SECRET  OAuth2 application client secret
 *
 * Until these are set, the route returns a clear "not configured yet" notice so
 * the demo (Supabase / demo provider) keeps working and nothing fails silently.
 */

const LMS_URL = process.env.OPENEDX_LMS_URL;
const CLIENT_ID = process.env.OPENEDX_CLIENT_ID;
const CLIENT_SECRET = process.env.OPENEDX_CLIENT_SECRET;
const isConfigured = Boolean(LMS_URL && CLIENT_ID && CLIENT_SECRET);

interface Payload {
  action?: "login" | "register";
  email?: string;
  password?: string;
  fullName?: string;
}

const json = (status: number, body: Record<string, unknown>) =>
  NextResponse.json(body, { status });

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return json(400, { status: "error", message: "Invalid request." });
  }

  if (!isConfigured) {
    // Production not wired yet — honest notice, no fake success.
    return json(200, {
      status: "pending",
      message:
        "Open edX sign-in isn't connected yet. Add the Open edX API credentials (OPENEDX_LMS_URL / OPENEDX_CLIENT_ID / OPENEDX_CLIENT_SECRET) to enable it — see .env.example and HANDOFF.md.",
    });
  }

  const { action, email, password, fullName } = body;
  if (!email || !password) {
    return json(422, { status: "error", message: "Email and password are required." });
  }

  try {
    if (action === "login") {
      // Open edX OAuth2 "password" grant proves the credentials.
      // POST {LMS}/oauth2/access_token  (grant_type=password)
      const res = await fetch(`${LMS_URL}/oauth2/access_token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "password",
          client_id: CLIENT_ID!,
          client_secret: CLIENT_SECRET!,
          username: email,
          password,
          token_type: "jwt",
        }),
      });
      if (!res.ok) {
        return json(200, { status: "error", message: "Invalid email or password." });
      }
      // TODO (university devs): persist the returned token in an httpOnly cookie
      // / session so the rest of the site recognises the Open edX session.
      return json(200, { status: "success", message: "Signed in successfully." });
    }

    if (action === "register") {
      // Open edX registration endpoint.
      // POST {LMS}/api/user/v1/account/registration/
      // NOTE: some Open edX versions require a CSRF token first
      // (GET {LMS}/csrf/api/v1/token) and the X-CSRFToken header.
      const username = (email.split("@")[0] || "user").replace(/[^a-zA-Z0-9_-]/g, "");
      const res = await fetch(`${LMS_URL}/api/user/v1/account/registration/`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          email,
          name: fullName || username,
          username,
          password,
          honor_code: "true",
          terms_of_service: "true",
        }),
      });
      if (!res.ok) {
        const detail = await res.text().catch(() => "");
        return json(200, {
          status: "error",
          message:
            detail?.slice(0, 200) ||
            "Registration could not be completed on Open edX.",
        });
      }
      // Open edX emails its own activation link; the user confirms there.
      return json(200, {
        status: "pending",
        message:
          "Account created. Check your email for the activation link, then sign in.",
      });
    }

    return json(400, { status: "error", message: "Unknown action." });
  } catch {
    return json(200, {
      status: "error",
      message: "Could not reach Open edX. Please try again later.",
    });
  }
}

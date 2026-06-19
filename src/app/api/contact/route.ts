import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { insertContactMessage } from "@/lib/db/contact";
import { notifyContactByEmail } from "@/lib/email/notifyContact";

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
}

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Contact endpoint. Validates the input, then STORES the message in the
 * `contact_messages` table (see supabase/schema.sql) and, if configured, sends
 * an email notification. Falls back to validation-only when no database is
 * configured, so the repo still clones-and-runs.
 */
export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, message } = body;

  if (!isNonEmptyString(name) || !isNonEmptyString(email) || !isNonEmptyString(message)) {
    return NextResponse.json({ error: "All fields are required." }, { status: 422 });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 422 });
  }

  const clean = { name: name.trim(), email: email.trim(), message: message.trim() };

  // No database configured → validate only (honest), don't claim it was stored.
  if (!isSupabaseConfigured) {
    return NextResponse.json(
      {
        ok: true,
        stored: false,
        message:
          "Message validated. A database isn't configured in this build, so it was checked but not stored.",
      },
      { status: 200 },
    );
  }

  const supabase = createSupabaseServerClient();
  const result = await insertContactMessage(supabase, clean);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, stored: false, error: "Sorry, we couldn't save your message. Please try again." },
      { status: 502 },
    );
  }

  // Best-effort notification — never fail the request if email isn't set up.
  await notifyContactByEmail(clean).catch(() => {});

  return NextResponse.json(
    { ok: true, stored: true, message: "Thanks — your message has been received." },
    { status: 200 },
  );
}

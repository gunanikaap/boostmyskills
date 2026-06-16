import { NextResponse } from "next/server";

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
}

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Clean, typed contact endpoint. Validates input and returns a JSON result.
 * Plug in a transactional email provider (e.g. Resend, SendGrid, SMTP) where
 * indicated to actually deliver the message.
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

  // TODO: deliver the message — e.g. send an email or forward to a CRM/helpdesk.
  // await sendEmail({ name, email, message });

  return NextResponse.json({ ok: true }, { status: 200 });
}

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

/**
 * Optional contact-notification email. A NO-OP unless RESEND_API_KEY and
 * CONTACT_NOTIFY_TO are set, so the contact form stores messages with zero email
 * setup or cost. Set those env vars to also receive an inbox notification.
 * Dependency-free (uses the Resend REST API directly). Best-effort: callers
 * should not fail the request if this throws.
 */
export async function notifyContactByEmail(payload: ContactPayload): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_NOTIFY_TO;
  if (!key || !to) return;
  const from = process.env.CONTACT_NOTIFY_FROM ?? "onboarding@resend.dev";

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: payload.email,
      subject: `New contact message from ${payload.name}`,
      text: `From: ${payload.name} <${payload.email}>\n\n${payload.message}`,
    }),
  });
}

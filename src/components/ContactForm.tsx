"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const form = event.currentTarget;
    const firstName = (form.elements.namedItem("first_name") as HTMLInputElement).value;
    const lastName = (form.elements.namedItem("last_name") as HTMLInputElement).value;
    const payload = {
      // The live form splits the name into First/Last; the /api/contact contract
      // expects a single `name`, so we combine them here.
      name: `${firstName} ${lastName}`.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-card border border-line bg-surface p-8 text-center">
        <h3 className="text-xl font-semibold text-ink">Message sent</h3>
        <p className="mt-2 text-muted">
          Thanks for getting in touch &mdash; we&apos;ll get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 font-semibold text-primary hover:text-primary-dark"
        >
          Send another message
        </button>
      </div>
    );
  }

  const labelClass = "mb-4 block text-xl font-bold text-muted";
  const fieldClass =
    "w-full rounded-[3px] border border-[#c8c8c8] bg-white px-3 py-[5px] text-base font-light leading-[1.6] text-[#222] outline-none transition-colors focus:border-primary";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 lg:pt-[62px]" noValidate>
      <div>
        <span className={labelClass}>Name</span>
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-[1.6rem]">
          <input
            id="first_name"
            name="first_name"
            type="text"
            required
            autoComplete="given-name"
            placeholder="First Name"
            aria-label="First name"
            className={fieldClass}
          />
          <input
            id="last_name"
            name="last_name"
            type="text"
            required
            autoComplete="family-name"
            placeholder="Last Name"
            aria-label="Last name"
            className={fieldClass}
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Your Email"
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Your Message"
          className={`${fieldClass} h-[7.2rem] resize-none`}
        />
      </div>

      {status === "error" ? <p className="text-sm text-red-600">{error}</p> : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="!mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-lg font-normal tracking-[1px] text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Submit"}
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </form>
  );
}

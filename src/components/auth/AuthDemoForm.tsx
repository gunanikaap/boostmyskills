"use client";

import { type ReactNode, useState } from "react";

export interface AuthField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  autoComplete?: string;
}

/**
 * Demo-only auth form. On submit it prevents default and shows a notice — it
 * does NOT authenticate, store credentials, or create a session. Real auth is
 * delegated to the existing Open edX backend (see src/data/site.ts -> authMode).
 */
export default function AuthDemoForm({
  fields,
  submitLabel,
  footer,
}: {
  fields: AuthField[];
  submitLabel: string;
  footer?: ReactNode;
}) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="space-y-4"
      noValidate
    >
      {fields.map((field) => (
        <div key={field.name}>
          <label
            htmlFor={field.name}
            className="mb-1.5 block text-sm font-semibold text-ink"
          >
            {field.label}
          </label>
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            autoComplete={field.autoComplete}
            className="h-11 w-full rounded-lg border border-line-mid bg-white px-3.5 text-base text-ink outline-none transition-colors placeholder:text-[#9b9b9b] focus:border-primary"
          />
        </div>
      ))}

      {submitted ? (
        <p
          role="status"
          className="rounded-lg border border-line bg-surface-alt px-4 py-3 text-sm leading-relaxed text-ink"
        >
          Demo only — production authentication is handled by the existing Open
          edX backend.
        </p>
      ) : null}

      <button
        type="submit"
        className="h-12 w-full rounded-full bg-primary text-base font-bold text-white transition-colors hover:bg-primary-dark"
      >
        {submitLabel}
      </button>

      {footer}
    </form>
  );
}

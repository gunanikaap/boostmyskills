"use client";

import { type ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthProvider, type AuthAction, type AuthStatus } from "@/lib/auth";

export interface AuthField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  autoComplete?: string;
}

const messageStyles: Record<AuthStatus, string> = {
  success: "border-primary/40 bg-surface-alt text-ink",
  pending: "border-primary/40 bg-surface-alt text-ink",
  demo: "border-line bg-surface-alt text-ink",
  error: "border-red-300 bg-red-50 text-red-700",
};

/**
 * Auth form wired to the active backend (see src/lib/auth). With Supabase
 * configured it really signs in / registers; without it, it shows the demo
 * notice. The UI is identical either way.
 */
export default function AuthForm({
  action,
  fields,
  submitLabel,
  footer,
}: {
  action: AuthAction;
  fields: AuthField[];
  submitLabel: string;
  footer?: ReactNode;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ status: AuthStatus; message: string } | null>(
    null,
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const value = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | null)?.value ?? "";

    // Login accepts an email (or username) in "identifier"; register uses "email".
    const email = (value("email") || value("identifier")).trim();
    const password = value("password");
    const fullName = value("full_name").trim() || undefined;

    if (action === "register" && password !== value("confirm_password")) {
      setResult({ status: "error", message: "Passwords do not match." });
      return;
    }

    setSubmitting(true);
    setResult(null);
    const provider = getAuthProvider();
    const res =
      action === "login"
        ? await provider.signIn({ email, password })
        : await provider.signUp({ email, password, fullName });
    setResult(res);
    setSubmitting(false);

    if (res.status === "success") {
      form.reset();
      router.refresh();
      router.push("/");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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

      {result ? (
        <p
          role="status"
          className={`rounded-lg border px-4 py-3 text-sm leading-relaxed ${messageStyles[result.status]}`}
        >
          {result.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="h-12 w-full rounded-full bg-primary text-base font-bold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Please wait…" : submitLabel}
      </button>

      {footer}
    </form>
  );
}

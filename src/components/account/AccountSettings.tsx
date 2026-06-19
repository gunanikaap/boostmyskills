"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export type ProfileValues = Record<string, string>;

const NAV = [
  { id: "account-information", label: "Account Information" },
  { id: "profile-information", label: "Profile Information" },
  { id: "social-media", label: "Social Media Links" },
  { id: "site-preferences", label: "Site Preferences" },
  { id: "linked-accounts", label: "Linked Accounts" },
  { id: "delete-account", label: "Delete My Account" },
];

function Field({
  label,
  value,
  help,
  type = "text",
  onSave,
}: {
  label: string;
  value: string;
  help?: string;
  type?: string;
  onSave: (value: string) => Promise<string | null>;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  async function save() {
    setSaving(true);
    setErr("");
    const error = await onSave(draft.trim());
    setSaving(false);
    if (error) {
      setErr(error);
      return;
    }
    setEditing(false);
  }

  return (
    <div className="border-b border-line py-4">
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold uppercase tracking-wide text-muted">
          {label}
        </span>
        {value && !editing ? (
          <button
            type="button"
            onClick={() => {
              setDraft(value);
              setEditing(true);
            }}
            className="text-sm font-medium text-primary hover:underline"
          >
            Edit
          </button>
        ) : null}
      </div>

      {editing ? (
        <div className="mt-2">
          <div className="flex flex-wrap items-center gap-2">
            <input
              type={type}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="h-10 w-full max-w-sm rounded-lg border border-line-mid bg-white px-3 text-base text-ink outline-none focus:border-primary"
            />
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="rounded-full border border-line px-5 py-2 text-sm font-semibold text-ink hover:border-primary"
            >
              Cancel
            </button>
          </div>
          {err ? <p className="mt-2 text-sm text-red-600">{err}</p> : null}
        </div>
      ) : value ? (
        <p className="mt-1 text-ink">{value}</p>
      ) : (
        <button
          type="button"
          onClick={() => {
            setDraft("");
            setEditing(true);
          }}
          className="mt-1 text-sm font-medium text-primary hover:underline"
        >
          Add {label.toLowerCase()}
        </button>
      )}
      {help && !editing ? <p className="mt-1 text-sm text-muted">{help}</p> : null}
    </div>
  );
}

export default function AccountSettings({
  userId,
  username,
  email,
  initial,
}: {
  userId: string;
  username: string;
  email: string;
  initial: ProfileValues;
}) {
  const router = useRouter();
  const [values, setValues] = useState<ProfileValues>(initial);
  const [notice, setNotice] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Save one profile column (full_name also updates the auth metadata).
  const saveField =
    (column: string) =>
    async (value: string): Promise<string | null> => {
      const supabase = createSupabaseBrowserClient();
      if (column === "full_name") {
        const { error } = await supabase.auth.updateUser({
          data: { full_name: value },
        });
        if (error) return error.message;
      }
      const payload: Record<string, string | number | null> = {
        [column]:
          column === "year_of_birth"
            ? value
              ? Number(value)
              : null
            : value || null,
      };
      const { error } = await supabase
        .from("profiles")
        .update(payload)
        .eq("id", userId);
      if (error) return error.message;
      setValues((prev) => ({ ...prev, [column]: value }));
      if (column === "full_name") router.refresh();
      return null;
    };

  async function resetPassword() {
    setNotice("");
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    setNotice(
      error
        ? `Could not send reset email: ${error.message}`
        : "Password reset email sent — check your inbox (and spam).",
    );
  }

  async function deleteAccount() {
    setDeleting(true);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.rpc("delete_user");
    if (error) {
      setDeleting(false);
      setNotice(`Could not delete account: ${error.message}`);
      return;
    }
    await supabase.auth.signOut();
    router.refresh();
    router.push("/");
  }

  const sectionTitle = "text-lg font-bold text-ink";

  return (
    <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
      {/* Left nav */}
      <nav aria-label="Account settings sections" className="h-fit">
        <ul className="space-y-3">
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className="text-sm font-medium text-primary hover:underline"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="max-w-2xl">
        {notice ? (
          <p className="mb-6 rounded-lg border border-primary/40 bg-surface-alt px-4 py-3 text-sm text-ink">
            {notice}
          </p>
        ) : null}

        {/* Account Information */}
        <section id="account-information" className="scroll-mt-28">
          <h2 className={sectionTitle}>Account Information</h2>
          <p className="mt-1 text-sm text-muted">
            These settings include basic information about your account.
          </p>
          <div className="mt-4">
            <div className="border-b border-line py-4">
              <span className="text-xs font-bold uppercase tracking-wide text-muted">
                Username
              </span>
              <p className="mt-1 text-ink">{username}</p>
              <p className="mt-1 text-sm text-muted">
                The name that identifies you on BoostMySkills. You cannot change
                your username.
              </p>
            </div>
            <Field
              label="Full name"
              value={values.full_name ?? ""}
              help="The name that is used for ID verification and that appears on your certificates."
              onSave={saveField("full_name")}
            />
            <div className="border-b border-line py-4">
              <span className="text-xs font-bold uppercase tracking-wide text-muted">
                Email address (Sign in)
              </span>
              <p className="mt-1 text-ink">{email}</p>
              <p className="mt-1 text-sm text-muted">
                You receive messages from BoostMySkills and course teams at this
                address.
              </p>
            </div>
            <div className="border-b border-line py-4">
              <span className="text-xs font-bold uppercase tracking-wide text-muted">
                Password
              </span>
              <div className="mt-1">
                <button
                  type="button"
                  onClick={resetPassword}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Reset Password
                </button>
              </div>
            </div>
            <Field
              label="Year of birth"
              value={values.year_of_birth ?? ""}
              type="number"
              onSave={saveField("year_of_birth")}
            />
            <Field
              label="Country"
              value={values.country ?? ""}
              onSave={saveField("country")}
            />
          </div>
        </section>

        {/* Profile Information */}
        <section id="profile-information" className="mt-12 scroll-mt-28">
          <h2 className={sectionTitle}>Profile Information</h2>
          <div className="mt-4">
            <Field
              label="Education"
              value={values.education ?? ""}
              onSave={saveField("education")}
            />
            <Field
              label="Gender"
              value={values.gender ?? ""}
              onSave={saveField("gender")}
            />
            <Field
              label="Spoken language"
              value={values.spoken_language ?? ""}
              onSave={saveField("spoken_language")}
            />
          </div>
        </section>

        {/* Social Media Links */}
        <section id="social-media" className="mt-12 scroll-mt-28">
          <h2 className={sectionTitle}>Social Media Links</h2>
          <p className="mt-1 text-sm text-muted">
            Optionally, link your personal accounts to the social media icons on
            your BoostMySkills profile.
          </p>
          <div className="mt-4">
            <Field
              label="LinkedIn"
              value={values.linkedin ?? ""}
              onSave={saveField("linkedin")}
            />
            <Field
              label="Facebook"
              value={values.facebook ?? ""}
              onSave={saveField("facebook")}
            />
            <Field
              label="Twitter"
              value={values.twitter ?? ""}
              onSave={saveField("twitter")}
            />
          </div>
        </section>

        {/* Site Preferences */}
        <section id="site-preferences" className="mt-12 scroll-mt-28">
          <h2 className={sectionTitle}>Site Preferences</h2>
          <div className="mt-4">
            <Field
              label="Site language"
              value={values.site_language ?? ""}
              help="The language used throughout this site."
              onSave={saveField("site_language")}
            />
            <Field
              label="Time zone"
              value={values.time_zone ?? ""}
              onSave={saveField("time_zone")}
            />
          </div>
        </section>

        {/* Linked Accounts */}
        <section id="linked-accounts" className="mt-12 scroll-mt-28">
          <h2 className={sectionTitle}>Linked Accounts</h2>
          <p className="mt-2 text-sm text-muted">
            You can link your identity accounts to simplify signing in to
            BoostMySkills.
          </p>
          <p className="mt-2 text-sm text-muted">
            No accounts can be linked at this time.
          </p>
        </section>

        {/* Delete My Account */}
        <section id="delete-account" className="mt-12 scroll-mt-28">
          <h2 className={sectionTitle}>Delete My Account</h2>
          <p className="mt-2 text-sm text-muted">We&apos;re sorry to see you go!</p>
          <p className="mt-2 text-sm text-muted">
            Deletion of your account and personal data is permanent and cannot be
            undone. You will not be able to recover your account or the data that
            is deleted.
          </p>
          <p className="mt-3 text-sm font-bold text-red-600">
            Warning: Account deletion is permanent. Please read carefully before
            proceeding. This is an irreversible action.
          </p>
          {confirmDelete ? (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={deleteAccount}
                disabled={deleting}
                className="rounded-md border border-red-500 bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 disabled:opacity-60"
              >
                {deleting ? "Deleting…" : "Yes, permanently delete my account"}
              </button>
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="rounded-md border border-line px-4 py-2 text-sm font-semibold text-ink hover:border-primary"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              className="mt-4 rounded-md border border-red-500 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
            >
              Delete My Account
            </button>
          )}
        </section>
      </div>
    </div>
  );
}

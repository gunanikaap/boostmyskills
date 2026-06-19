import type { Metadata } from "next";
import AuthShell from "@/components/auth/AuthShell";
import AuthForm from "@/components/auth/AuthForm";
import { safeNextPath } from "@/data/site";

export const metadata: Metadata = {
  title: "Sign in | BoostMySkills",
  description:
    "Sign in to BoostMySkills. Uses Supabase auth when configured, otherwise a demo screen.",
};

export default function LoginPage({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  // Validate the redirect target so we never bounce to an external URL.
  const safeNext = safeNextPath(searchParams.next);
  const nextPath = safeNext === "/" ? undefined : safeNext;

  return (
    <AuthShell active="login" nextPath={nextPath}>
      <AuthForm
        action="login"
        submitLabel="Sign in"
        nextPath={nextPath}
        fields={[
          {
            name: "identifier",
            label: "Username or Email",
            type: "text",
            placeholder: "you@example.com",
            autoComplete: "username",
          },
          {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "Your password",
            autoComplete: "current-password",
          },
        ]}
        footer={
          // Password reset is not implemented in this handoff build (the local
          // Supabase/demo auth has no reset flow wired up), so this is honest,
          // non-interactive text rather than a link that pretends to work.
          <p className="block text-center text-sm font-medium text-muted">
            Password reset is not available in this build.
          </p>
        }
      />
    </AuthShell>
  );
}

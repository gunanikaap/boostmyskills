import type { Metadata } from "next";
import AuthShell from "@/components/auth/AuthShell";
import AuthForm from "@/components/auth/AuthForm";
import { safeNextPath } from "@/data/site";

export const metadata: Metadata = {
  title: "Register | BoostMySkills",
  description:
    "Create a BoostMySkills account. Uses Supabase auth when configured, otherwise a demo screen.",
};

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  // Validate the redirect target so we never bounce to an external URL.
  const safeNext = safeNextPath(searchParams.next);
  const nextPath = safeNext === "/" ? undefined : safeNext;

  return (
    <AuthShell active="register" nextPath={nextPath}>
      <AuthForm
        action="register"
        submitLabel="Register"
        nextPath={nextPath}
        fields={[
          {
            name: "full_name",
            label: "Full name",
            type: "text",
            placeholder: "Jane Doe",
            autoComplete: "name",
          },
          {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "you@example.com",
            autoComplete: "email",
          },
          {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "Create a password",
            autoComplete: "new-password",
          },
          {
            name: "confirm_password",
            label: "Confirm password",
            type: "password",
            placeholder: "Re-enter your password",
            autoComplete: "new-password",
          },
        ]}
      />
    </AuthShell>
  );
}

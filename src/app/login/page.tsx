import type { Metadata } from "next";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import AuthForm from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Sign in | BoostMySkills",
  description:
    "Sign in to BoostMySkills. Uses Supabase auth when configured, otherwise a demo screen.",
};

export default function LoginPage() {
  return (
    <AuthShell active="login">
      <AuthForm
        action="login"
        submitLabel="Sign in"
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
          <Link
            href="/login"
            className="block text-center text-sm font-semibold text-primary hover:text-primary-dark"
          >
            Forgot password?
          </Link>
        }
      />
    </AuthShell>
  );
}

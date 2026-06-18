import type { Metadata } from "next";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import AuthDemoForm from "@/components/auth/AuthDemoForm";

export const metadata: Metadata = {
  title: "Sign in | BoostMySkills",
  description:
    "Demo sign-in screen for the BoostMySkills rebuild. Real authentication is handled by the existing Open edX backend.",
};

export default function LoginPage() {
  return (
    <AuthShell active="login">
      <AuthDemoForm
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

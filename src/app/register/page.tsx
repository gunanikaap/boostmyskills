import type { Metadata } from "next";
import AuthShell from "@/components/auth/AuthShell";
import AuthDemoForm from "@/components/auth/AuthDemoForm";

export const metadata: Metadata = {
  title: "Register | BoostMySkills",
  description:
    "Demo registration screen for the BoostMySkills rebuild. Real account creation is handled by the existing Open edX backend.",
};

export default function RegisterPage() {
  return (
    <AuthShell active="register">
      <AuthDemoForm
        submitLabel="Register"
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

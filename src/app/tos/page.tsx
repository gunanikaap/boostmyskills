import type { Metadata } from "next";
import LegalShell from "@/components/ui/LegalShell";
import { termsAndConditions } from "@/data/legal";

export const metadata: Metadata = { title: "Terms and Conditions | BoostMySkills" };

export default function TermsPage() {
  return <LegalShell document={termsAndConditions} />;
}

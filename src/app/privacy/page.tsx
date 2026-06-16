import type { Metadata } from "next";
import LegalShell from "@/components/ui/LegalShell";
import { privacyPolicy } from "@/data/legal";

export const metadata: Metadata = { title: "Privacy Policy | BoostMySkills" };

export default function PrivacyPage() {
  return <LegalShell document={privacyPolicy} />;
}

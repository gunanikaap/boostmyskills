import type { Metadata } from "next";
import LegalShell from "@/components/ui/LegalShell";
import { cookiePolicy } from "@/data/legal";

export const metadata: Metadata = { title: "Cookie Policy | BoostMySkills" };

export default function CookiePolicyPage() {
  return <LegalShell document={cookiePolicy} />;
}

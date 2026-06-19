import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import AccountSettings, {
  type ProfileValues,
} from "@/components/account/AccountSettings";
import { getLearner } from "@/lib/dashboard/learner";

export const metadata: Metadata = {
  title: "Account Settings | BoostMySkills",
  description: "Manage your BoostMySkills account and profile.",
};

// Reads the auth session cookie, so it must render per-request.
export const dynamic = "force-dynamic";

const str = (v: unknown) => (v === null || v === undefined ? "" : String(v));

export default async function AccountPage() {
  const { supabase, userId, email, fullName } = await getLearner("/account");

  // Profile row (extra fields). If the columns don't exist yet (schema not
  // re-run) the select errors and we fall back to empty values — page still
  // renders, fields just show "Add …".
  const { data } = await supabase
    .from("profiles")
    .select(
      "country,year_of_birth,gender,education,spoken_language,linkedin,facebook,twitter,site_language,time_zone",
    )
    .eq("id", userId)
    .maybeSingle();
  const row = (data ?? {}) as Record<string, unknown>;

  const initial: ProfileValues = {
    full_name: fullName ?? "",
    country: str(row.country),
    year_of_birth: str(row.year_of_birth),
    gender: str(row.gender),
    education: str(row.education),
    spoken_language: str(row.spoken_language),
    linkedin: str(row.linkedin),
    facebook: str(row.facebook),
    twitter: str(row.twitter),
    site_language: str(row.site_language),
    time_zone: str(row.time_zone),
  };

  const username = (email ?? "").split("@")[0] || "account";

  return (
    <section className="bg-white py-9 lg:py-12">
      <Container className="!max-w-[1120px]">
        <h1 className="text-4xl font-bold leading-tight text-ink sm:text-5xl">
          Account Settings
        </h1>
        <div className="mt-10">
          <AccountSettings
            userId={userId}
            username={username}
            email={email ?? ""}
            initial={initial}
          />
        </div>
      </Container>
    </section>
  );
}

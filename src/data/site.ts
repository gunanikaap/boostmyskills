/**
 * Central configuration: external endpoints, image assets, and navigation.
 *
 * LMS_BASE is the existing Open edX deployment. All authentication and
 * enrolment links point here so the rebuilt marketing site hands off to the
 * real backend instead of reimplementing it.
 */
export const LMS_BASE = "https://boostmyskills.eu";

/**
 * Images are hosted locally in /public/images (downloaded from the original
 * RES4CITY theme). `asset()` resolves a filename to its local public path.
 * Programme covers live under /images/programs (see programs.ts).
 *
 * NOTE: confirm you have the rights to redistribute the logo and partner
 * imagery before publishing.
 */
const ASSET_BASE = "/images";
export const asset = (file: string) => `${ASSET_BASE}/${file}`;

export const images = {
  logo: asset("logo.png"),
  landing: asset("landing.png"),
  ipad: asset("ipad.png"),
  certified: asset("certified.png"),
  diploma: asset("diploma.png"),
  optionMicroProgrammes: asset("option-micro-programmes.png"),
  optionMicroCredentials: asset("option-micro-credentials.png"),
  avatar: asset("avatar.png"),
  partners: asset("partners.jpeg"),
  extraPartners: asset("extra-partners.png"),
  benefitStar: asset("star.png"),
  benefitLabel: asset("label.png"),
  benefitLightning: asset("lightning.png"),
  benefitHeart: asset("heart-black.png"),
  linkedin: asset("linkedin.png"),
};

export const externalLinks = {
  register: `${LMS_BASE}/register?next=%2F`,
  login: `${LMS_BASE}/login?next=%2F`,
  selfAssessment: "https://www.res4city.eu/self-assessment/",
  res4city: "https://www.res4city.eu/",
  sherlock: "https://www.sherlockproject.eu/",
  coss: "https://www.coss.ac.kr/",
  linkedin: "https://www.linkedin.com/company/res4city/posts/?feedView=all",
};

/**
 * Where the Header "Sign in" / "Register for free" CTAs point:
 *  - "local"    -> the in-site /login and /register pages. These do REAL auth
 *                  when Supabase is configured (see src/lib/auth + .env.example),
 *                  and fall back to a demo notice otherwise.
 *  - "external" -> the existing Open edX login/register URLs (externalLinks).
 *
 * The auth *backend* is chosen separately and provider-agnostically in
 * src/lib/auth/ (Supabase today; Open edX adapter stubbed for later).
 */
export type AuthMode = "local" | "external";

/**
 * Header CTA auth mode — env-driven so production teams can switch it without
 * editing code (and so we never accidentally ship local/demo links).
 *
 * Set NEXT_PUBLIC_AUTH_MODE to:
 *   - "external"       -> "Sign in" / "Register" CTAs go to the Open edX URLs.
 *   - "local" | "demo" -> CTAs go to the in-site /login and /register pages.
 *
 * Anything else (including unset) falls back to "local" — the safe default for
 * local development / presentation. NEXT_PUBLIC_* vars are inlined at build
 * time, so set this before `npm run build`.
 */
export const authMode: AuthMode =
  process.env.NEXT_PUBLIC_AUTH_MODE === "external" ? "external" : "local";

export const authLinks = {
  login: authMode === "external" ? externalLinks.login : "/login",
  register: authMode === "external" ? externalLinks.register : "/register",
  /** True in "external" mode, so the CTAs leave the site (open the LMS). */
  isExternal: authMode === "external",
};

/**
 * Resolve the Enrol button destination for a micro-programme.
 *
 *  - "external" mode -> the original Open edX enrolUrl, opened directly (the
 *    production LMS handles auth + enrolment).
 *  - "local"/"demo"  -> the in-site /enrol hand-off route, which gates on the
 *    local Supabase session first (see src/app/enrol/page.tsx). The original
 *    enrolUrl is never lost: it stays in the programme data and /enrol
 *    re-derives it from the slug to offer the Open edX hand-off.
 *
 * Returns `external: true` only when the link leaves the site (so the caller
 * renders a new-tab anchor); local links are in-site SPA navigations.
 */
export function enrolLink(program: { slug: string; enrolUrl: string }): {
  href: string;
  external: boolean;
} {
  if (authMode === "external") {
    return { href: program.enrolUrl, external: true };
  }
  return {
    href: `/enrol?program=${encodeURIComponent(program.slug)}`,
    external: false,
  };
}

/**
 * Guard a `next` redirect target so we only ever redirect within this site.
 * Accepts site-relative absolute paths ("/enrol?program=mp1"); rejects external
 * or protocol-relative URLs ("//evil.com", "/\\evil.com", "https://…") to avoid
 * an open redirect. Returns `fallback` ("/") when missing or unsafe.
 */
export function safeNextPath(
  next: string | undefined | null,
  fallback = "/",
): string {
  if (!next || !next.startsWith("/")) return fallback;
  if (next.startsWith("//") || next.startsWith("/\\")) return fallback;
  return next;
}

export const primaryNav: { label: string; children: { label: string; href: string }[] } = {
  label: "Catalogue",
  children: [
    { label: "Micro-programmes", href: "/programs" },
    { label: "Micro-credentials", href: "/courses" },
  ],
};

export const footerColumns = [
  {
    heading: "",
    links: [
      { label: "Self-Assessment", href: externalLinks.selfAssessment, external: true },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookie Policy", href: "/cookie_policy" },
      { label: "Terms and Conditions", href: "/tos" },
    ],
  },
  {
    heading: "Our projects",
    links: [
      { label: "RES4CITY", href: externalLinks.res4city, external: true },
      { label: "SHERLOCK", href: externalLinks.sherlock, external: true },
      { label: "COSS", href: externalLinks.coss, external: true },
    ],
  },
  {
    heading: "Get in touch",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "About us", href: "/about" },
    ],
  },
] as const;

export const FUNDING_BLURB =
  "Developed by pan-European and international universities, co-funded by the EU, Swiss Confederation and a consortia of South Korean universities (COSS) — and supported by the United Nations Institute for Training & Research (UNITAR).";

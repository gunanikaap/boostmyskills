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

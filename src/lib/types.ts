export type ProjectName = "RES4CITY" | "SHERLOCK" | "COSS";

export interface Program {
  /** Short code shown on the card, e.g. "MP1". */
  code: string;
  /** URL-friendly identifier. */
  slug: string;
  title: string;
  project: ProjectName;
  /** Cover image URL. */
  image: string;
  /** External Open edX enrolment URL (handed off to the existing backend). */
  enrolUrl: string;
  /** Micro-credentials that make up this programme. */
  microCredentials: string[];
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

export interface Benefit {
  title: string;
  icon: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

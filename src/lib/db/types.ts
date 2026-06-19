/** Database row + input shapes for this app's Supabase tables. */

export interface ContactMessageInput {
  name: string;
  email: string;
  message: string;
}

export type EnrolmentKind = "program" | "course";

export interface EnrolmentInput {
  kind: EnrolmentKind;
  /** Programme slug or course id. */
  ref: string;
  title?: string;
  /** Open edX enrol / about URL. */
  sourceUrl?: string;
}

export interface Enrolment {
  id: string;
  user_id: string;
  kind: EnrolmentKind;
  ref: string;
  title: string | null;
  source_url: string | null;
  created_at: string;
}

/** Shared auth provider contract. New backends (Open edX, etc.) implement this. */

export type AuthAction = "login" | "register";

export interface AuthInput {
  email: string;
  password: string;
  /** Registration only. */
  fullName?: string;
}

export type AuthStatus = "success" | "pending" | "error" | "demo";

export interface AuthResult {
  status: AuthStatus;
  message: string;
}

export interface AuthProvider {
  readonly id: "supabase" | "demo" | "openedx";
  signIn(input: AuthInput): Promise<AuthResult>;
  signUp(input: AuthInput): Promise<AuthResult>;
}

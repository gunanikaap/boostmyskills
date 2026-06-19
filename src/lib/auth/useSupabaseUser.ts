"use client";

import { useEffect, useState } from "react";
import {
  isSupabaseConfigured,
  createSupabaseBrowserClient,
} from "@/lib/supabase/client";

export interface SessionUser {
  email: string;
  /** Best display name: full_name from metadata, else the email's local part. */
  name: string;
}

type MinimalUser = {
  email?: string | null;
  user_metadata?: { full_name?: string | null } | null;
} | null;

function toSessionUser(user: MinimalUser): SessionUser | null {
  if (!user) return null;
  const email = user.email ?? "";
  const full = (user.user_metadata?.full_name ?? "").trim();
  const name = full || email.split("@")[0] || "Account";
  return { email, name };
}

/**
 * Current Supabase user on the client (or null when signed out / not
 * configured). Lets the header reflect auth state without forcing every page to
 * render dynamically — the header hydrates and then updates. Returns null in
 * demo mode (no Supabase keys), so the existing CTAs render unchanged.
 */
export function useSupabaseUser(): SessionUser | null {
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    const supabase = createSupabaseBrowserClient();
    let active = true;

    supabase.auth.getUser().then(({ data }) => {
      if (active) setUser(toSessionUser(data.user));
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(toSessionUser(session?.user ?? null));
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return user;
}

-- BoostMySkills — Supabase schema
-- Run once in your Supabase project: Dashboard -> SQL Editor -> paste -> Run.
--
-- Supabase Auth already stores the account (email + securely hashed password)
-- in the managed `auth.users` table. This adds a `profiles` table for the extra
-- data we collect (full name) and auto-fills it on signup.

create table if not exists public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  full_name  text,
  email      text,
  created_at timestamptz not null default now()
);

-- Row Level Security: a user can only see / edit their own profile.
alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

-- Create a profile row automatically whenever a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data ->> 'full_name', new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Contact form submissions.
-- Anyone (anonymous) may submit; nobody can read them through the public API
-- (no SELECT policy) — staff read them in the Supabase dashboard / via the
-- service role. This makes POST /api/contact a real, stored backend.
-- ---------------------------------------------------------------------------
create table if not exists public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  message    text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

drop policy if exists "contact_insert_anon" on public.contact_messages;
create policy "contact_insert_anon"
  on public.contact_messages for insert
  to anon, authenticated
  with check (true);

-- ---------------------------------------------------------------------------
-- Enrolment requests captured for a signed-in learner. The real LMS enrolment
-- still lives in Open edX; this is this app's own record of what the user chose
-- to enrol in, shown on /dashboard. Each user only sees / manages their own.
-- ---------------------------------------------------------------------------
create table if not exists public.enrolments (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  kind       text not null check (kind in ('program', 'course')),
  ref        text not null,            -- programme slug or course id
  title      text,
  source_url text,                     -- Open edX enrol / about URL
  created_at timestamptz not null default now(),
  unique (user_id, kind, ref)
);

alter table public.enrolments enable row level security;

drop policy if exists "enrolments_select_own" on public.enrolments;
create policy "enrolments_select_own"
  on public.enrolments for select
  using (auth.uid() = user_id);

drop policy if exists "enrolments_insert_own" on public.enrolments;
create policy "enrolments_insert_own"
  on public.enrolments for insert
  with check (auth.uid() = user_id);

drop policy if exists "enrolments_delete_own" on public.enrolments;
create policy "enrolments_delete_own"
  on public.enrolments for delete
  using (auth.uid() = user_id);

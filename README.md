# BoostMySkills — Public Site (Clean Rebuild)

A clean, component-based rebuild of the public-facing
[BoostMySkills](https://boostmyskills.eu/) website, built with
**Next.js (App Router) + TypeScript + Tailwind CSS**.

---

## 1. Project overview

This is a **handoff-ready rebuild of the BoostMySkills public website** — the
marketing / catalogue layer that sits in front of the learning platform.

- **Stack:** Next.js 14 (App Router), TypeScript (strict), Tailwind CSS, ESLint.
- **Content** lives in `src/data/` so pages stay declarative and easy to edit.
- **Colours and font** come from the live RES4CITY theme CSS (captured under
  [`reference/`](reference/)) and are defined once in
  [`tailwind.config.ts`](tailwind.config.ts).

The original BoostMySkills platform runs on **Open edX** for authentication,
enrolment, course delivery, progress, and certificates. This project rebuilds
the **public website only** and hands off to that backend for everything else.

---

## 2. What is included

| Area | Route(s) | Notes |
| ---- | -------- | ----- |
| Home | `/` | Hero, trending micro-programmes carousel, sections |
| Micro-programmes | `/programs` | The 10 programmes, programme cards |
| Micro-credentials / course catalogue | `/courses` | Real public catalogue data + search / refine facets (see §4) |
| About | `/about` | Live copy |
| Contact | `/contact` | Contact form → typed `/api/contact` route |
| Legal | `/privacy`, `/cookie_policy`, `/tos` | Copy transcribed verbatim from live |
| Legal aliases | `/cookie-policy`, `/terms` | Permanent redirects to the canonical routes |
| **Auth** | `/login`, `/register` | Real Supabase auth when configured; demo notice otherwise (see §3) |
| Contact API | `/api/contact` | The one dynamic route |

---

## 3. Authentication and enrolment

This site has its **own free auth** (login + registration + stored users) via
**Supabase**, with a **clean demo fallback** when no backend is configured. It is
**provider-agnostic**: the active backend is chosen behind a small interface
([`src/lib/auth/`](src/lib/auth/)), so Open edX (or any other backend) can be
added later without touching the UI.

### How it behaves

- **Real auth — Supabase configured** (see setup below): `/login` and `/register`
  really sign users in / create accounts. Supabase handles password hashing,
  sessions and email verification (free tier; **we never store raw passwords**).
  Extra profile data (full name) lands in a `public.profiles` table.
  - **Registration is stored in Supabase** (`auth.users` + the `profiles` row via
    the signup trigger in [`supabase/schema.sql`](supabase/schema.sql)), and
    **only a registered account can sign in** — unknown credentials are rejected.
  - This project's Supabase keeps **email confirmation on** (`mailer_autoconfirm`
    is off), so registering shows *"check your inbox for a confirmation link"*;
    the new user must **click that link before they can sign in**. (To allow
    instant login instead, turn off *Confirm email* under Supabase →
    Authentication → Providers → Email.)
- **Demo — nothing configured** (default): the same `/login` / `/register` UI
  shows a notice on submit and stores nothing. This keeps the repo
  **clone-and-run with zero setup** and the build green.

The **Header CTA destinations** are a separate switch, driven by the
`NEXT_PUBLIC_AUTH_MODE` environment variable (resolved in
[`src/data/site.ts`](src/data/site.ts)):

```bash
# .env.local  — read at build time
NEXT_PUBLIC_AUTH_MODE=local      # or "demo" / "external"
```

- `local` / `demo` (**default** when unset) → **Sign in** / **Register for free**
  → the in-site `/login` / `/register` pages (which do real auth when Supabase
  is set). This is the safe default for **local development / presentation**.
- `external` → the CTAs hand off to the existing **Open edX** login/register URLs.
  **Production deployments that want Open edX auth should set
  `NEXT_PUBLIC_AUTH_MODE=external`** (before building, since `NEXT_PUBLIC_*` is
  inlined at build time) so demo links are never shipped by accident.

### Enrol buttons

The programme **Enrol** buttons follow the same `NEXT_PUBLIC_AUTH_MODE` switch
(resolved by `enrolLink()` in [`src/data/site.ts`](src/data/site.ts)):

- `local` / `demo` (default) → Enrol routes through the **local Supabase auth
  first**: it points to an in-site [`/enrol`](src/app/enrol/page.tsx) hand-off
  page that verifies the Supabase session. Signed-out users are sent to
  `/login?next=/enrol?program=…` and returned after sign-in. Once signed in,
  `/enrol` shows an **honest hand-off**: the demo has captured the enrolment
  intent locally only, and offers a "Continue to Open edX enrolment" link to the
  real LMS. **Nothing is stored, and Supabase does not enrol anyone into Open
  edX** — that remains the production LMS's job.
- `external` → Enrol links go **directly to the original Open edX enrol URL**
  (the production LMS handles auth + enrolment), exactly as before.

The original Open edX `enrolUrl` is always preserved in
[`src/data/programs.ts`](src/data/programs.ts); local mode just gates it behind
the local sign-in. (Without Supabase keys, `/enrol` can't verify a session, so
it shows the hand-off notice directly instead of looping back to a no-op login.)

### Learner dashboard (signed-in experience)

After a successful sign-in (local mode) users land on
[`/dashboard`](src/app/dashboard/page.tsx) — a **"My Micro-credentials"** learner
page that mirrors the live Open edX learner dashboard's empty state. It is
**protected** (signed-out visitors are redirected to `/login?next=/dashboard`)
and shows the learner's **real enrolments** (stored in the `enrolments` table —
see below): each programme/course they enrol in appears here as a card. When
they have none, it shows the *"You are not enrolled… yet"* empty state with
**Enrol in micro-programmes** / **Enrol in micro-credentials** buttons. A
confirm-email reminder banner is shown only when a session's email is
unconfirmed (hidden in the default confirmation-required flow, since signed-in
users are already confirmed).

When signed in (local mode), the **header** swaps the Sign in / Register CTAs for
the user's name + a menu (My Micro-credentials, Sign out). The dashboard
illustration is a placeholder at
[`public/images/dashboard-empty.svg`](public/images/dashboard-empty.svg) — drop
the exact LMS asset in at that path to replace it 1:1.

### Enable real auth (free — no credit card)

1. Create a project at <https://supabase.com>.
2. Open the SQL editor and run [`supabase/schema.sql`](supabase/schema.sql)
   (creates the `profiles`, `contact_messages` and `enrolments` tables + Row
   Level Security + the signup trigger). Safe to re-run.
3. Project Settings → API: copy the **Project URL** and the public **anon key**.
4. Copy [`.env.example`](.env.example) → `.env.local` and paste both values.
5. Rebuild / restart (`NEXT_PUBLIC_*` vars are read at build time).
6. (Optional) In Supabase → Authentication, toggle "Confirm email" to taste.
7. **Branded activation email:** apply the "Activate your BoostMySkills account"
   template and set the Site/Redirect URLs (and, for production, a custom SMTP
   sender like `info@boostmyskills.eu`) — see
   [`supabase/email-templates/README.md`](supabase/email-templates/README.md).

`.env.local` is git-ignored, so secrets never get committed.

### Open edX later (designed-for)

When the university provides Open edX **OAuth credentials + API access**, complete
the stub adapter in [`src/lib/auth/openedx.ts`](src/lib/auth/openedx.ts) and select
it in [`src/lib/auth/index.ts`](src/lib/auth/index.ts) — or simply set
`NEXT_PUBLIC_AUTH_MODE=external` to hand off to the existing Open edX screens.
Either way the `/login` / `/register` UI stays unchanged.

---

## 4. Known limitations

- **`/courses` is served live.** The catalogue is fetched at request time from
  the **public Open edX course API** (`{LMS}/api/courses/v1/courses/`) and
  cached for an hour, with the facets (Project / Organisation / Topic) computed
  from the live data — see [`src/lib/courses/catalogue.ts`](src/lib/courses/catalogue.ts).
  Each live course is enriched from the curated snapshot
  ([`src/data/courses.ts`](src/data/courses.ts), local images under
  [`public/images/courses/`](public/images/courses/)) where available; the
  snapshot is also the **fallback** if the API is unreachable, so the page never
  breaks. Platform "test" courses are filtered out. The **Micro-Programme facet**
  remains curated (the course API doesn't expose programme membership per course).
- **Contact form stores submissions.** `POST /api/contact` validates and **saves
  every message** to the `contact_messages` table (read them in the Supabase
  dashboard). An optional email notification is sent when `RESEND_API_KEY` +
  `CONTACT_NOTIFY_TO` are set (see [`.env.example`](.env.example)); without them
  it simply stores. If no database is configured it falls back to validation-only
  and says so honestly. See [`src/app/api/contact/route.ts`](src/app/api/contact/route.ts).
- **Enrolment is recorded locally; LMS enrolment stays in Open edX.** `/enrol`
  saves the user's enrolment request to the `enrolments` table (shown on
  `/dashboard`); the real course enrolment still happens at Open edX via the
  hand-off link. This app does not fake Open edX enrolment.
- **Auth is independent of Open edX.** With Supabase configured, accounts created
  here live in *your* Supabase project, separate from Open edX accounts, until an
  Open edX adapter is implemented (designed-for; see §3). Without Supabase keys
  the auth pages are demo-only and store nothing. **Password reset is not wired
  up** in this build, so the login screen states that honestly rather than
  offering a non-working link.
- **Not pixel-perfect.** Layout, type, and spacing were matched against the live
  theme CSS, but a few exact `rem` values are approximated by Tailwind's scale and
  some per-course artwork differs from live.
- **Open dependency advisories.** `npm audit --omit=dev` reports Next.js / bundled
  PostCSS vulnerabilities whose only fix is a breaking major upgrade
  (Next 14 → 16). This was **not** applied in the handoff build (it needs an
  async-API migration and re-test); see [`SECURITY_NOTES.md`](SECURITY_NOTES.md)
  for the finding, the decision, and the recommended upgrade path for deployment.

---

## 5. Local setup

```bash
npm install      # install dependencies
npm run dev      # dev server at http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint
```

> **Windows / low-disk note:** if your system drive (`C:`) is low on space,
> Next.js/npm may fail with `ENOSPC` while writing caches/temp. Point them at a
> drive with space first (PowerShell):
> ```powershell
> $env:TEMP="D:\boostmyskills.tmp"; $env:TMP=$env:TEMP
> $env:npm_config_cache="D:\boostmyskills.npm-cache"
> $env:NEXT_TELEMETRY_DISABLED="1"
> npm run build
> ```

---

## 6. Handoff notes for university developers

**Where content lives** — `src/data/`:

| File | Content |
| ---- | ------- |
| `site.ts` | external links, image assets, nav, **`authMode` / `authLinks`**, `LMS_BASE` |
| `programs.ts` | the 10 micro-programmes (+ Enrol URLs) |
| `courses.ts` | course catalogue snapshot (from the public Open edX API) |
| `courseFacets.ts` | course facet options + counts (Project / Organisation / Topic / Micro-Programme) |
| `about.ts` | About-page copy |
| `legal.ts` | Privacy / Cookie / Terms copy (verbatim from live) |
| `home.ts` | steps, benefits, testimonials |

**Where links / config live**

- `LMS_BASE` and all external/auth URLs: `src/data/site.ts`.
- **Auth mode** (`local`/`demo` ↔ `external`, Header CTA destination): set the
  `NEXT_PUBLIC_AUTH_MODE` env var; resolved by `authMode` in `src/data/site.ts`.
- **Auth backend** (provider-agnostic): [`src/lib/auth/`](src/lib/auth/) —
  `index.ts` picks the active provider; `supabase.ts`, `demo.ts`, `openedx.ts`.
- **Auth secrets:** `.env.local` (template in [`.env.example`](.env.example)).
- **DB schema:** [`supabase/schema.sql`](supabase/schema.sql).
- Legal route aliases / redirects: [`next.config.mjs`](next.config.mjs).

**How to turn on real auth** — follow §3 "Enable real auth" (create a free
Supabase project, run the schema, set two env vars, rebuild).

**How to add Open edX auth later** — implement
[`src/lib/auth/openedx.ts`](src/lib/auth/openedx.ts) and select it in
`src/lib/auth/index.ts`, or set `NEXT_PUBLIC_AUTH_MODE=external` (see §3).

**How to refresh the course catalogue**

Re-fetch from the public Open edX course-discovery API and regenerate
`src/data/courses.ts`, `src/data/courseFacets.ts`, and `public/images/courses/`
(keep the same `Course` / facet shapes so the UI works unchanged).

**How to deploy**

Builds to mostly static output; deploys cleanly to Vercel / Netlify / any Node
host. The only dynamic route is `/api/contact` — wire it to a real email provider
and confirm the public contact address. Confirm `LMS_BASE` points at the correct
production Open edX deployment before publishing, and confirm **rights to
redistribute the logo and partner imagery** now hosted under `public/`.

---

## Project structure

```
src/
├─ app/
│  ├─ layout.tsx              # shared shell: header + footer + skip link
│  ├─ page.tsx                # home page
│  ├─ programs/ courses/      # catalogues
│  ├─ about/ contact/         # content pages
│  ├─ privacy/ cookie_policy/ tos/   # legal pages
│  ├─ login/ register/        # auth UI (real via Supabase, else demo)
│  ├─ api/contact/route.ts    # typed contact endpoint
│  └─ globals.css
├─ middleware.ts              # Supabase session refresh (inert if unconfigured)
├─ lib/
│  ├─ auth/                   # provider-agnostic auth (supabase/demo/openedx)
│  └─ supabase/               # browser + server Supabase clients
├─ components/
│  ├─ layout/                 # Header, Footer, Container
│  ├─ ui/                     # Button, PageHeader, LegalShell, ...
│  ├─ sections/               # home sections + CourseCatalogue (search/refine)
│  ├─ cards/                  # ProgramCard, CourseCard
│  ├─ auth/                   # AuthShell, AuthForm (calls lib/auth provider)
│  └─ ContactForm.tsx
├─ data/                      # single source of truth for content (see §6)
└─ lib/types.ts
```

See [`UI_DIFF_REPORT.md`](UI_DIFF_REPORT.md) for the section-by-section visual
comparison and known visual limitations.

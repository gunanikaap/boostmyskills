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
- **Demo — nothing configured** (default): the same `/login` / `/register` UI
  shows a notice on submit and stores nothing. This keeps the repo
  **clone-and-run with zero setup** and the build green.

The **Header CTA destinations** are a separate switch in
[`src/data/site.ts`](src/data/site.ts):

```ts
export const authMode = "local" as AuthMode;   // "local" | "external"
```

- `"local"` (default) → **Sign in** / **Register for free** → the in-site
  `/login` / `/register` pages (which do real auth when Supabase is set).
- `"external"` → the CTAs hand off to the existing Open edX login/register URLs.

**Enrol** buttons remain **external links to Open edX** (they are not faked).

### Enable real auth (free — no credit card)

1. Create a project at <https://supabase.com>.
2. Open the SQL editor and run [`supabase/schema.sql`](supabase/schema.sql)
   (creates the `profiles` table + Row Level Security + signup trigger).
3. Project Settings → API: copy the **Project URL** and the public **anon key**.
4. Copy [`.env.example`](.env.example) → `.env.local` and paste both values.
5. Rebuild / restart (`NEXT_PUBLIC_*` vars are read at build time).
6. (Optional) In Supabase → Authentication, toggle "Confirm email" to taste.

`.env.local` is git-ignored, so secrets never get committed.

### Open edX later (designed-for)

When the university provides Open edX **OAuth credentials + API access**, complete
the stub adapter in [`src/lib/auth/openedx.ts`](src/lib/auth/openedx.ts) and select
it in [`src/lib/auth/index.ts`](src/lib/auth/index.ts) — or simply set
`authMode = "external"` to hand off to the existing Open edX screens. Either way
the `/login` / `/register` UI stays unchanged.

---

## 4. Known limitations

- **`/courses` data is a snapshot.** It is generated from the **live public Open
  edX course-discovery API** (`/api/courses/v1/courses/` and the discovery search)
  — 76 real courses with their real images, organisations, projects, topics, and
  micro-programme facet, snapshotted into [`src/data/courses.ts`](src/data/courses.ts),
  [`src/data/courseFacets.ts`](src/data/courseFacets.ts) and
  [`public/images/courses/`](public/images/courses/). It is **not live** — re-run
  the fetch (or wire a live API call) to refresh. One platform "test" course is
  excluded, so the count is 76. The **Micro-Programme facet filtering** is
  best-effort (the discovery API doesn't expose programme membership per course).
- **Contact form validates but does not deliver.** `POST /api/contact`
  type-checks the input and returns clear status codes (`422` invalid, `200` ok),
  but does **not** send or store the message (the `200` response is explicit:
  `delivered: false`) and the success UI says so. Plug in a provider at the marked
  integration point in [`src/app/api/contact/route.ts`](src/app/api/contact/route.ts).
- **Enrolment remains external** (Open edX).
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
- **Auth mode** (`local` ↔ `external`, Header CTA destination): `authMode` in
  `src/data/site.ts`.
- **Auth backend** (provider-agnostic): [`src/lib/auth/`](src/lib/auth/) —
  `index.ts` picks the active provider; `supabase.ts`, `demo.ts`, `openedx.ts`.
- **Auth secrets:** `.env.local` (template in [`.env.example`](.env.example)).
- **DB schema:** [`supabase/schema.sql`](supabase/schema.sql).
- Legal route aliases / redirects: [`next.config.mjs`](next.config.mjs).

**How to turn on real auth** — follow §3 "Enable real auth" (create a free
Supabase project, run the schema, set two env vars, rebuild).

**How to add Open edX auth later** — implement
[`src/lib/auth/openedx.ts`](src/lib/auth/openedx.ts) and select it in
`src/lib/auth/index.ts`, or set `authMode = "external"` (see §3).

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

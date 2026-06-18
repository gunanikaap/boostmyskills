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
| **Demo auth UI** | `/login`, `/register` | **UI only** — does not authenticate (see §3) |
| Contact API | `/api/contact` | The one dynamic route |

---

## 3. Authentication and enrolment

**Production login / registration / enrolment belong to the existing Open edX
backend.** This rebuild does **not** reimplement them — doing so would fork the
real source of truth (accounts, enrolment records, certificates).

What this rebuild provides instead:

- **Demo auth UI** at `/login` and `/register` — a faithful re-creation of the
  live auth screen (pale-green page, logo, intro heading, white card with
  Register / Sign in tabs). On submit they show:
  _"Demo only — production authentication is handled by the existing Open edX
  backend."_ They **do not** store credentials, create sessions, or call any
  auth backend.
- A single config switch in [`src/data/site.ts`](src/data/site.ts):

  ```ts
  export const authMode = "demo" as AuthMode;   // "demo" | "external"
  ```

  - `"demo"` → Header **Sign in** / **Register for free** link to `/login` and
    `/register` (the demo UI).
  - `"external"` → the same CTAs hand off to the existing Open edX
    login/register URLs (`externalLinks` in the same file). Nothing else needs to
    change; the Header reads `authLinks`.

- **Enrol** buttons remain **external links to Open edX** (they are not faked).

### To connect real authentication

The university must provide:

1. **Open edX OAuth client credentials** (client id / secret) and **API
   permissions** for the relevant endpoints.
2. **Environment variables** for those secrets and the LMS base URL.
3. **Allowed redirect URLs** registered in Open edX for this site's origin.
4. **Backend access** to validate the integration end-to-end.

Then either flip `authMode` to `"external"` (simplest — hand off to the existing
Open edX screens) or replace the demo forms with a real OAuth flow.

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
- **Enrolment remains external** (Open edX).
- **Demo auth pages do not authenticate** anyone (see §3).
- **Not pixel-perfect.** Layout, type, and spacing were matched against the live
  theme CSS, but a few exact `rem` values are approximated by Tailwind's scale and
  some per-course artwork differs from live.

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
- **Auth mode** (`demo` ↔ `external`): `authMode` in `src/data/site.ts`.
- Legal route aliases / redirects: [`next.config.mjs`](next.config.mjs).

**How to replace demo auth with real Open edX integration**

1. Obtain OAuth credentials + API permissions + redirect URLs (see §3).
2. Easiest path: set `authMode = "external"` so the CTAs hand off to Open edX.
3. Full native path: replace the forms in
   [`src/components/auth/AuthDemoForm.tsx`](src/components/auth/AuthDemoForm.tsx)
   with a real OAuth/login flow and add the secrets as environment variables.

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
│  ├─ login/ register/        # DEMO auth UI (no real auth)
│  ├─ api/contact/route.ts    # typed contact endpoint
│  └─ globals.css
├─ components/
│  ├─ layout/                 # Header, Footer, Container
│  ├─ ui/                     # Button, PageHeader, LegalShell, ...
│  ├─ sections/               # home sections + CourseCatalogue (search/refine)
│  ├─ cards/                  # ProgramCard, CourseCard
│  ├─ auth/                   # AuthShell, AuthDemoForm (demo only)
│  └─ ContactForm.tsx
├─ data/                      # single source of truth for content (see §6)
└─ lib/types.ts
```

See [`UI_DIFF_REPORT.md`](UI_DIFF_REPORT.md) for the section-by-section visual
comparison and known visual limitations.

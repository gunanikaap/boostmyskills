# BoostMySkills — Public Site (Clean Rebuild)

A clean, component-based rebuild of the public-facing [BoostMySkills](https://boostmyskills.eu/)
marketing site, built with **Next.js (App Router) + TypeScript + Tailwind CSS**.

## What this rebuild does

- Rebuilds the **public marketing / catalogue layer** of BoostMySkills:
  Home, Micro-programmes, Micro-credentials, About, Contact, and the legal pages
  (Privacy, Cookie Policy, Terms).
- Mirrors the live site's content and public URLs (`/privacy`, `/cookie_policy`, `/tos`).
- Keeps all content in `src/data` so pages stay declarative and easy to update.
- Drives all colours from design tokens in `tailwind.config.ts`.

## What this rebuild intentionally does **not** do

The original BoostMySkills platform runs on **Open edX** (the open-source LMS) for
authentication, enrolment, course delivery, progress tracking, and certificates.
This project does **not** reimplement any of that. Specifically, it does not include:

- User registration / authentication
- Course enrolment, progress, assessments, or certificates
- A learner dashboard

### Why LMS / auth / enrolment links are external

Those flows belong to the existing Open edX backend and must stay there — the
account system, enrolment records, and certificates already live in that system.
Re-creating them here would fork the source of truth and break real users. So
**Register**, **Sign in**, and **Enrol** are plain external links that hand off to
the live backend (configured via `LMS_BASE` in [`src/data/site.ts`](src/data/site.ts)).

## Tech stack

- **Next.js 14** (App Router, static rendering for marketing pages)
- **TypeScript** (strict mode)
- **Tailwind CSS** with a centralised design-token system
- **ESLint** (`eslint-config-next`)
- One typed **API route** (`/api/contact`) for the contact form

## Running locally

```bash
npm install      # install dependencies
npm run dev      # start the dev server at http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # run ESLint
```

> **Windows / low-disk note:** if your system drive (`C:`) is low on space, Next.js
> and npm may fail with `ENOSPC` while writing caches/temp files. Point them at a
> drive with free space before building, e.g. (PowerShell):
> ```powershell
> $env:TEMP="D:\boostmyskills\.tmp"; $env:TMP=$env:TEMP
> $env:npm_config_cache="D:\boostmyskills\.npm-cache"
> $env:NEXT_TELEMETRY_DISABLED="1"
> npm run build
> ```

## Project structure

```
src/
├─ app/                       # routes (App Router)
│  ├─ layout.tsx              # shared shell: header + footer + skip link
│  ├─ page.tsx               # home page (composes the sections below)
│  ├─ programs/              # micro-programmes catalogue
│  ├─ courses/               # micro-credentials catalogue (search + refine)
│  ├─ about/  contact/       # content pages
│  ├─ privacy/ cookie_policy/ tos/   # legal pages (live copy)
│  ├─ api/contact/route.ts   # typed contact endpoint
│  └─ globals.css
├─ components/
│  ├─ layout/                # Header, Footer, Container
│  ├─ ui/                    # Button, SectionHeading, Eyebrow, PageHeader, LegalShell, ...
│  ├─ sections/              # home sections + CourseCatalogue (client search/refine)
│  ├─ cards/                 # ProgramCard, CourseCard
│  └─ ContactForm.tsx
├─ data/                     # single source of truth for content
│  ├─ site.ts                # links, local image assets, navigation
│  ├─ programs.ts            # the 10 micro-programmes
│  ├─ courses.ts             # micro-credentials (derived from programmes — see MVP note)
│  ├─ about.ts               # About-page copy (from live site)
│  ├─ legal.ts               # Privacy / Cookie / Terms copy (from live site)
│  └─ home.ts                # steps, benefits, testimonials
└─ lib/types.ts              # shared TypeScript types
```

## Routes

Canonical legal routes match the live site exactly:

| Route            | Page                  |
| ---------------- | --------------------- |
| `/privacy`       | Privacy Policy        |
| `/cookie_policy` | Cookie Policy         |
| `/tos`           | Terms and Conditions  |

The cleaner aliases `/cookie-policy` and `/terms` are kept as permanent redirects
(see [`next.config.mjs`](next.config.mjs)) so no inbound link 404s.

## Design tokens

Colours and the font are taken from the **live RES4CITY theme CSS** and defined
once in [`tailwind.config.ts`](tailwind.config.ts):
brand green `#079845`, ink `#1A1A1A`, muted `#767676`/`#716D6B`, borders
`#EEEEEE`/`#D2D2D2`, tints `#EAF3E7`/`#F6F7F9`. The site uses **Urbanist**
(loaded via `next/font` in [`app/layout.tsx`](src/app/layout.tsx)), the same font
as the live site. See [`VISUAL_AUDIT.md`](VISUAL_AUDIT.md) for the visual-parity
notes and the few intentional differences.

## Images

All images are **hosted locally** in [`public/images`](public/images) (downloaded
from the original RES4CITY theme) and referenced via `asset()` in `src/data/site.ts`.
Programme covers live under `public/images/programs`.

> Confirm you have the rights to redistribute the **logo** and **partner imagery**
> before publishing.

## Known MVP limitation — `/courses`

The live `/courses` page is a searchable course catalogue backed by Open edX's
course-discovery service. This rebuild does **not** have that API, so the
micro-credential list is **derived from the programme data** in
[`src/data/programs.ts`](src/data/programs.ts) (each programme's micro-credentials,
de-duplicated). The **"Search for a course"** box and **"Refine Your Search"**
panel are fully functional, but they filter only this derived dataset.

When the official course-discovery API/data is provided, replace the derivation in
`src/data/courses.ts` with the real data while keeping the same `Course` shape, and
the search/refine UI in `src/components/sections/CourseCatalogue.tsx` will keep
working unchanged.

## Deployment

The site builds to mostly static output and deploys cleanly to Vercel, Netlify, or
any Node host. On Vercel, import the repo and accept the defaults — the one dynamic
route is the `/api/contact` endpoint. Ensure `LMS_BASE` in `src/data/site.ts` points
at the correct production Open edX deployment.

## Remaining TODOs

- [ ] Confirm **rights** to redistribute the logo and partner imagery now hosted in `/public`.
- [ ] Wire `/api/contact` to a real email provider and confirm the public contact email.
- [ ] Confirm the **Open edX enrolment/auth URLs** (`LMS_BASE`, register/login, programme IDs) are current.
- [ ] Replace the derived `/courses` data with the **official course-discovery API/data** when available.

> The legal pages (Privacy, Cookie Policy, Terms) are transcribed **verbatim** from
> the live public pages and have been verified — no placeholder/legal TODO remains.
> The colour palette and font now come from the live theme, not approximations.
```

# BoostMySkills — Handoff guide

A plain-language explanation of what this project is, how it works, and exactly
what the university needs to do to put it into production. Read this first.

---

## 1. What this is (in one paragraph)

This is a **clean, modern rebuild of the public BoostMySkills website** — the
pages people see *before* they start learning (home, micro-programmes,
micro-credentials/courses, about, contact, sign in, register, learner
dashboard). It is **not** a new learning platform. The real platform —
**Open edX** at `apps.boostmyskills.eu` — stays exactly as it is. This project
replaces only the **front-end** that sits in front of it.

> **Same engine, better cockpit.** Open edX is the engine (accounts, the
> "Activate your account" email, enrolment, courses, certificates). This project
> is a cleaner, faster cockpit on top of that same engine.

### What's real in this app's own backend (not demo-grade)

The server-side of this app is real, not a mock-up:

- **Courses are live.** `/courses` fetches the catalogue from the public Open edX
  course API at request time (cached hourly), computes the filters from the live
  data, and falls back to a bundled snapshot if the API is down — so it's never
  broken and never stale by more than an hour.
- **Contact form stores.** Every submission is saved to a `contact_messages`
  table (and can email a notification); it no longer just validates.
- **Enrolments are recorded.** A signed-in user's enrolments are stored and shown
  on `/dashboard`. (The actual LMS enrolment still happens in Open edX — this is
  the app's own record, not a fake.)
- **Auth + users are real** (Supabase for the demo; Open edX for production).

The data lives in **Supabase** (Postgres + row-level security) for the demo, at
no cost; production reads accounts from Open edX. Apply
[`supabase/schema.sql`](supabase/schema.sql) once to create the tables.

---

## 2. Why this approach (the important bit)

The university said the existing Open edX pages are clumsy and asked for
something **clean, modern and better**. So:

- **The visible improvement is the front-end** — these pages. That is the value
  the university is buying. (Compare this site's `/login`, `/register`,
  `/dashboard`, `/programs` with the current Open edX screens side by side — that
  is the difference to show them.)
- **The backend does not change.** Accounts, the activation email, and enrolment
  stay in Open edX. That means **no data migration, no second system to maintain,
  no new running cost, and low risk.**

This is deliberately *not* a separate copy of the platform. It is a better skin
on the platform they already run.

---

## 3. How the backend plugs in (it's switchable)

The clean pages are built to run on **either** backend with **zero UI change**.
This is controlled by one environment variable, `NEXT_PUBLIC_AUTH_PROVIDER`:

| Mode | Backend | Cost | What it's for |
| ---- | ------- | ---- | ------------- |
| **Demo** (default) | **Supabase** (free tier) | $0 at demo volume | Prove the clean pages work end-to-end (register → activate → sign in → dashboard) **without needing Open edX keys yet** — perfect for showing the university a working product. |
| **Production** | **Open edX** (their existing system) | **$0 extra** (their infra) | The real thing: real accounts, the real activation email, real enrolment — at any scale. |

Because Supabase is only the **demo** backend, the cost concern goes away: in
production the site runs on Open edX, which the university already operates for
free. Supabase is never the thing serving real users at scale.

```
            ┌───────────────────────────────────────┐
            │   This project — clean front-end        │
            │   /  /programs  /courses  /login        │
            │   /register  /dashboard  /contact …     │
            └───────────────────┬─────────────────────┘
                                │  same UI, switchable backend
                ┌───────────────┴───────────────┐
                ▼                                 ▼
     [ DEMO ]  Supabase                 [ PRODUCTION ]  Open edX
     free, standalone,                  apps.boostmyskills.eu
     just to show it works              real accounts + activation
                                         email + enrolment, $0 extra
```

---

## 4. Run the demo now (no Open edX keys needed)

1. `npm install`
2. Add the Supabase keys to `.env.local` (already done in this checkout — see
   [`.env.example`](.env.example) for the shape).
3. `npm run dev` → open <http://localhost:3000>.
4. Register → you receive an activation email → confirm → sign in → you land on
   **/dashboard** ("My Micro-credentials").

**Smoother demo (optional, $0):** to skip the email step while presenting, turn
**off** "Confirm email" in Supabase → Authentication → Providers → Email. Then
register signs the user in **instantly** and goes straight to the dashboard. No
email provider / SMTP is needed at all. (The code already supports both modes.)

---

## 5. Go to production (when ready)

There are two production-correct options. Both cost the university **nothing**
extra and both use Open edX, so the activation email and accounts are the real
ones.

### Option A — Keep the clean pages, run them on Open edX  ✅ recommended
Set in the production environment:
```
NEXT_PUBLIC_AUTH_PROVIDER=openedx
OPENEDX_LMS_URL=https://apps.boostmyskills.eu
OPENEDX_CLIENT_ID=<from the university>
OPENEDX_CLIENT_SECRET=<from the university>
```
Now this site's own `/login` and `/register` talk to Open edX behind the scenes
(see [`src/app/api/auth/openedx/route.ts`](src/app/api/auth/openedx/route.ts)).
The user sees **your clean screens**; Open edX does the real work and sends its
own activation email. **This is the differentiator in production.**

> The Open edX adapter is **scaffolded and ready**. The standard Open edX
> endpoints are already wired; the university's developers only need to plug in
> the credentials above and verify the calls against their specific Open edX
> version (CSRF/field details can vary by version — noted in the route file).

### Option B — Hand off to Open edX's own pages (works today, no keys)
Set:
```
NEXT_PUBLIC_AUTH_MODE=external
```
Sign in / Register / Enrol then open the existing Open edX pages directly. This
needs **no credentials and works immediately**, but the login/register screens
shown are Open edX's clumsy ones — so it does not showcase the new UI. Useful as
a fallback while waiting for API access.

**What to request from the university:** *Open edX OAuth/API access* — a client
id + secret (and confirmation of the registration API for their version). That
single hand-over is what turns the clean demo into clean production (Option A).

---

## 6. The activation email

- **In production (Open edX):** Open edX sends its branded "Activate your
  BoostMySkills account" email automatically (the one you already received). No
  setup needed on this project's side.
- **In the Supabase demo:** Supabase sends the confirmation email. A branded
  template matching the Open edX one is provided in
  [`supabase/email-templates/`](supabase/email-templates/) if you want the demo
  email to look the same, but for a quick demo you can just use instant login
  (see §4) and skip email entirely.

---

## 7. Cost summary

| Item | Demo | Production |
| ---- | ---- | ---------- |
| Hosting (static site) | free tiers (Vercel/Netlify) | low / free tier |
| Auth + accounts | Supabase free tier | **$0** — Open edX (existing) |
| Activation email | Supabase / optional / none | **$0** — Open edX sends it |
| User database | Supabase (demo only) | **none added** — Open edX is the store |

**Production adds no recurring cost** beyond hosting the static front-end,
because it reuses the Open edX the university already runs.

---

## 8. Quick reference — environment variables

| Variable | Where | Purpose |
| -------- | ----- | ------- |
| `NEXT_PUBLIC_AUTH_PROVIDER` | build-time | `openedx` for production; unset = Supabase/demo |
| `OPENEDX_LMS_URL` | server | Open edX base URL |
| `OPENEDX_CLIENT_ID` / `OPENEDX_CLIENT_SECRET` | server (secret) | Open edX OAuth credentials |
| `NEXT_PUBLIC_AUTH_MODE` | build-time | `external` = header/enrol hand off to Open edX pages |
| `NEXT_PUBLIC_SUPABASE_URL` / `..._ANON_KEY` | build-time | Supabase demo backend |

See [`README.md`](README.md) for full developer docs and
[`SECURITY_NOTES.md`](SECURITY_NOTES.md) for the dependency-audit note.

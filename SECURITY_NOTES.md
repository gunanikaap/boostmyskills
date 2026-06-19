# Security notes (handoff build)

This file documents the dependency-security decision made before handoff. It is
intended for the university developers who will deploy and maintain the site.

## Finding — `npm audit --omit=dev`

As of this handoff, the production dependency audit reports **2 vulnerabilities
(1 high, 1 moderate)**, both originating from **Next.js `14.2.35`** and its
**bundled PostCSS**:

| Package | Severity | Class of issue |
| ------- | -------- | -------------- |
| `next` `14.2.35` | High | DoS (Image Optimizer / Server Components / image cache), HTTP request smuggling in rewrites, middleware/proxy cache-poisoning & bypass, SSRF via WebSocket upgrades, XSS in CSP-nonce / `beforeInteractive` paths |
| `postcss` (bundled under `next`) | Moderate | XSS via unescaped `</style>` in CSS stringify output |

See the advisory links printed by `npm audit --omit=dev`.

## What was tried

1. **Safe, non-destructive fix** — `npm audit fix --omit=dev`.
   Result: **no change.** It did not modify `package.json` or `package-lock.json`
   because there is no patched `14.2.x` release that satisfies the constraint.
2. The **only** fix npm offers is `npm audit fix --force`, which installs
   **`next@16.2.9`** — explicitly flagged by npm as a **breaking change**
   (a jump of two major versions, 14 → 16).

## Decision — not upgraded in this handoff build

The major upgrade was **deliberately not applied** here, because:

- **It is a two-major-version jump (14 → 16).** Next.js 15 and 16 introduce
  breaking changes — notably the async request APIs (`cookies()`, `headers()`,
  `params`/`searchParams`) and changed caching defaults — that require code
  migration. This project's Supabase middleware and server client
  (`src/middleware.ts`, `src/lib/supabase/`) use those APIs and would need to be
  reworked and re-tested.
- It is **out of scope for this handoff**, whose mandate was small, surgical
  fixes that keep the existing build and approved UI intact. A framework major
  upgrade is a separate, testable workstream.
- **Exposure is limited in this build.** The site compiles to mostly static
  output with a single dynamic route (`/api/contact`, validation-only). Several
  of the advisories specifically affect self-hosted Next servers using features
  this site does not rely on at runtime (untrusted RSC payloads, i18n routing,
  Image Optimizer `remotePatterns` against untrusted hosts).

## Recommendation for deployment

Before/Soon after going to production, the maintaining team should:

1. **Upgrade Next.js** to a patched release on a dedicated branch
   (`npm i next@latest`, currently the `16.x` line), then **migrate the async
   request APIs** and re-run `npm run build`, `npm run lint`, and
   `npm audit --omit=dev` until clean. Test auth (Supabase middleware/session),
   the `/api/contact` route, `next/image` rendering, and the legal redirects.
2. If staying on 14.x temporarily, **mitigate at the edge** instead:
   restrict / disable the Image Optimizer (`images.remotePatterns`, or
   `unoptimized`), front the app with a CDN/WAF that normalizes requests
   (smuggling / cache-poisoning), and avoid passing untrusted input through
   middleware rewrites.
3. Re-run `npm audit --omit=dev` as part of CI so regressions are caught.

_Last reviewed: 2026-06-19. Audit output may change as new advisories are
published — re-run `npm audit --omit=dev` to refresh._

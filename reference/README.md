# Reference assets (live-site forensics)

Captured from the **public** live site `https://boostmyskills.eu/` for exact-UI
matching. These are reference material only — used to read layout, class names,
measurements, colours, and fonts. No authentication was bypassed and no private
or internal source was accessed.

## Open-source status

There is **no official, licensed open-source repository** referenced by the live
site. The site runs a **custom Open edX theme** (`res4city-theme`) served as
public static assets with **no license** granting reuse of its source. Per the
project guidance, publicly served HTML/CSS/images are used here only as
*reference* for re-creation; no unlicensed source code was copied wholesale.

## Contents

- `live-html/` — raw HTML of `/`, `/programs/`, `/courses`, `/about`, `/contact`.
- `live-css/` — the theme CSS the pages link, including:
  `res4city.css`, `-header`, `-footer`, `-landing`, `-programs-section`,
  `-programs-items`, `-diploma`, `-choose`, `-steps`, `-benefits`,
  `-testimonials`, `-partners`, `-courses`, `-sm`.
- `live-screenshots/` / `local-screenshots/` — **empty**: this environment has no
  headless browser available (and the system drive is full), so automated
  screenshot capture at 1440/768/390 was not possible. Visual comparison was done
  by reading the live CSS measurements directly (the authoritative source for
  exact spacing/sizes) and is intended to be finished by manual eyeballing with
  the dev server running. See `../UI_DIFF_REPORT.md`.

Exact values used in the implementation are cited inline in the relevant
components and centralised in `tailwind.config.ts`.

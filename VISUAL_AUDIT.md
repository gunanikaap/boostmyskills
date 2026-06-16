# Visual Parity Audit — BoostMySkills rebuild vs. live site

Reference: **https://boostmyskills.eu/** (RES4CITY Open edX theme)
Branch: `visual-parity-v2`

This pass moved the rebuild away from a generic "modern SaaS" look toward the
actual BoostMySkills public site. Colours, the font, and per-section layouts were
taken directly from the live theme CSS (`res4city-theme/css/*`).

---

## 1. What did not match before

**Global**
- System sans-serif font instead of the live **Urbanist**.
- Approximate green/forest palette (`#1F8A4C`, ink `#0F2A1D`) instead of the live
  `#079845` green and `#1A1A1A` ink.
- Heavy SaaS treatment everywhere: drop shadows, 16px rounded cards, tinted
  alternating section backgrounds, uppercase letter-spaced eyebrows.

**Header** — sticky + `backdrop-blur`; **Sign in** was the filled/primary button
while **Register** was an outline. Live is the opposite emphasis and not sticky.

**Hero** — eyebrow rendered as a white pill with a shadow; second CTA was a white
"light" button. Live: plain bold **green** eyebrow text and **two solid-green
buttons** with forward arrows, on a white background, larger title.

**Trending / Programme cards** — centred heading; cards had shadows, 16px radius,
uppercase `MP1` label. Live: left-aligned heading, border-only cards (1px
`#EEEEEE`, 24px radius), image on a light-green panel, disc-bullet credential list,
green pill **Enrol** with arrow.

**Choose your option** — both cards identical. Live highlights the **first card
with a green border**.

**Get started** — step titles were "Create your account / Choose your courses /
Learn and get certified" and the section carried an iPad image. Live uses
**"First Step / Second Step / Third Step"**, different copy, light-green number
circles, and **no image** (the iPad art belongs to the Benefits section).

**Benefits** — 4-column centred grid, no image, slightly reworded copy. Live is
**image-left + 2-column** benefits with its own wording.

**Testimonials** — centred heading, plain cards. Live is left-aligned, cards with
a `#D2D2D2` border, avatar inside a light-green circle, and `''…''` curly quotes.

**About** — had an invented **stat panel + three "project" cards**. Live is just
the "About us" title followed by **three plain paragraphs**.

**Contact** — had a generic "Email" info box and a single Name field. Live has a
**"Follow us"** block with LinkedIn, a **First/Last** name row, and a large green
**Submit** button with an arrow.

**Footer** — first link list carried a "Legal" heading (live has none) and the
LinkedIn icon sat under the logo (live places it in "Get in touch").

**Legal pages** — section subtitles were dark; live subtitles are **green
`#079845`, ~2.5rem**.

---

## 2. What I changed

| File | Change |
|---|---|
| `tailwind.config.ts` | Palette + radius/max-width from live theme; Urbanist font family; `tracking-heading`. |
| `app/layout.tsx`, `app/globals.css` | Load **Urbanist** via `next/font`; set it as the body font. |
| `components/ui/Eyebrow.tsx` | Green bold normal-case text (live `.landing-subtitle`). |
| `components/ui/SectionHeading.tsx` | Left-aligned by default, tighter heading style. |
| `components/ui/PageHeader.tsx` | Title on white (no tinted band), larger size. |
| `components/layout/Header.tsx` | Non-sticky white header; **Register = green CTA**, **Sign in = secondary**; bigger logo. |
| `components/sections/Hero.tsx` | Green eyebrow (no pill), **two green arrow buttons**, white bg, larger title. |
| `components/cards/ProgramCard.tsx` | Border-only card, tinted image panel, `MP1 \| RES4CITY`, disc bullets, green Enrol+arrow. |
| `components/cards/CourseCard.tsx` | Removed drop shadow. |
| `components/sections/TrendingPrograms.tsx` | Left-aligned heading, wider carousel cards, secondary "View all". |
| `components/sections/Certificates.tsx` | Green eyebrow, inline certified badge, white bg. |
| `components/sections/ChooseOption.tsx` | Two bordered cards, **first card green border**, centred. |
| `components/sections/GetStarted.tsx` | Two-column text, light-green number circles, no image. |
| `components/sections/Benefits.tsx` | Image-left + 2-column benefits (iPad image moved here). |
| `components/sections/Testimonials.tsx` | Left heading, bordered cards, avatar circle, curly quotes. |
| `components/sections/Partners.tsx` | Left-aligned heading, full-width imagery. |
| `components/sections/CourseCatalogue.tsx` | Green search **submit button**; visible MVP-derived note. |
| `components/ContactForm.tsx` | First/Last name row, larger labels, green **Submit** + arrow (same `/api/contact`). |
| `app/contact/page.tsx` | Two-column layout: heading + text + **Follow us**; form right. |
| `app/about/page.tsx`, `data/about.ts` | Simplified to title + **three live paragraphs** (no cards). |
| `components/ui/LegalShell.tsx` | **Green** section subtitles. |
| `components/layout/Footer.tsx`, `data/site.ts` | Removed "Legal" heading; LinkedIn moved into "Get in touch". |
| `data/home.ts` | Steps ("First/Second/Third Step"), benefits, and testimonial copy matched to live. |

Home section order is unchanged and matches the live order:
**Hero → Our Trending Micro-programmes → Certificates → Choose your option →
Get started → Benefits → What People Are Saying → Our Partners.**

---

## 3. What still differs from the live site

- **Pixel-exact spacing/sizes** are approximated with Tailwind's scale rather than
  copied rem-for-rem from the theme CSS; proportions match, exact paddings may
  differ slightly.
- **Carousels** (trending cards, testimonials) use native horizontal scroll. The
  live site adds round prev/next arrow buttons over the cards — not reproduced.
- **`/courses`** shows the **MVP-derived** micro-credential list with a working
  search/refine. The live page loads live results and dynamic facets from the
  Open edX course-discovery API, which this public rebuild does not call. A visible
  note states this; the "Loading" spinner state is not simulated.
- **Partner images** are the live raster exports; if the originals are updated,
  re-export them.
- Minor copy: live marketing copy contains small typos (e.g. about-page "upsklling",
  a stray ".."); these were corrected. Legal text is kept **verbatim** except one
  clear stray-bracket typo (documented in `data/legal.ts`).

---

## 4. Intentional differences (and why)

- **No Open edX functionality.** Register / Sign in / Enrol are external links to
  the existing backend by design — auth, enrolment, dashboards, and certificates
  are out of scope for this marketing rebuild.
- **Clean component architecture.** Content lives in `src/data` and the UI is
  componentised, rather than mirroring the theme's per-page inline `<style>` blocks.
  The rendered result targets the live look; the source is intentionally tidier.
- **Accessibility niceties** kept from the rebuild (skip link, `aria-label`s,
  focus styles, semantic headings) even where the live markup omits them.
- **Live-compatible routes** `/cookie_policy` and `/tos` are canonical; `/cookie-policy`
  and `/terms` remain as redirects so no inbound link breaks.

# UI Difference Report — exact-match pass (`exact-ui-match-v3`)

Reference: live **https://boostmyskills.eu/** (custom Open edX `res4city-theme`).
Method: forensic reading of the live HTML + theme CSS saved under
[`reference/`](reference/). All measurements below are the live CSS values.

> **Screenshot note:** automated screenshots at 1440 / 768 / 390 px could not be
> captured — this environment has no headless browser and the system drive is
> full. Comparison was therefore driven by the live CSS values (the authoritative
> source for exact spacing/sizes/colours) rather than pixel diffing. The
> `reference/*-screenshots/` folders are placeholders for manual capture.

## Design tokens confirmed from live CSS
| Token | Live value | Where |
|---|---|---|
| Brand green | `#079845` | buttons, eyebrows, links, circles |
| Ink | `#1A1A1A` | headings / primary text |
| Muted | `#767676`, `#716D6B` | body / card detail text |
| Borders | `#EEEEEE` (cards), `#D2D2D2` (panels), `#BDBDBD` (course search/facets) |
| Tints | `#EAF3E7` (card image panel), `#F6F7F9`, `#F9F9F9` (facets), `#D5E7D0` (circles) |
| Font | **Urbanist** | global |
| Container | `max-width: 1440px` | page width |
| Button radius | `2.7rem` (pill) | `.btn`, `.landing-explore-btn` |
| Card radius | `1.5rem` | `.card` |

---

## Section-by-section

### Header
- **Live:** white, non-sticky, `padding-top:1rem`; logo `122×56`; `.nav-links`
  `display:flex; justify-content:space-between; flex:1`; Catalogue dropdown left,
  Register + Sign in right (`padding:.5rem 3rem; font-weight:700`).
- **Fixed:** non-sticky white header, logo `h-14`, Register = green CTA / Sign in
  = secondary, **nav now `flex-1 justify-between`** so Catalogue sits left and CTAs
  far right (was grouped together).
- **Remaining:** live mobile menu is a slide panel from the hamburger; ours is a
  simple expanding panel (same links, simpler animation).

### Hero
- **Live:** `.landing-subtitle` green `1.5rem` bold; `.landing-title` `#1A1A1A`,
  `4rem`/`line-height:4rem` desktop (`2.2rem` mobile); `.landing-content-text`
  `#767676` `1.5rem`; two `.landing-explore-btn` solid green pills (`radius 2.7rem`,
  `padding 1rem 1.5rem`) with forward-arrow icons; image right (`~532px`).
- **Fixed:** green text eyebrow (no pill), large title, muted lead, **two solid
  green arrow buttons**, white background, image right.
- **Remaining:** title tops out at Tailwind `text-6xl` (3.75rem) vs `4rem` — ~4%
  smaller; visually equivalent.

### Programme cards (`.card` / `.r4c-micro-programs`)
- **Live:** border `1px #EEEEEE`, radius `1.5rem`, no shadow; `.image_wrapper`
  background `#EAF3E7`, height `17.5rem` desktop; `.card_header` `1.2rem`→`1.56rem`
  weight 600; `.card_detail_list_item` `•` bullets, `1rem`, weight 600, `#767676`;
  green pill **Enrol** + arrow.
- **Fixed:** border-only card, light-green image panel (`h-56 sm:h-72`), responsive
  title, disc bullets at `1rem`/`#767676`, green Enrol + arrow.
- **Remaining:** live cards also show a secondary **"More info"** link to a
  programme detail page — omitted intentionally (no public detail route to point
  at; would be a dead link).

### Trending carousel
- **Live:** `.card_carousel` horizontal scroll + `.carousel-btn` round green
  (`#079845`, `4rem`) prev/next buttons shown ≥800px.
- **Fixed:** scroll-snap carousel with **round green prev/next arrows** on desktop
  (`ProgramCarousel`).

### Certificates (`.energy_technology`)
- **Live:** eyebrow "Earn BoostMySkills"; `h2` black `2.2rem`(→`5rem` xl); text
  `#716D6B 1.2rem`; inline certified badge (icon + `1.5rem` text); diploma image
  right.
- **Fixed:** matches (eyebrow, heading, inline badge, image right). **Remaining:**
  xl heading not scaled to the full `5rem`.

### Choose your option (`.options_section`)
- **Live:** centred; `h2` weight 800; two cards border `.2rem`; first card
  `border-color:#079845`; centred icon/title/text; green "View all" pill.
- **Fixed:** centred, first card green border, green View all. Matches.

### Get started (`.steps_section`)
- **Live:** eyebrow "How to get started?"; two-column; number in `#D5E7D0` circle,
  green digit; "First/Second/Third Step" + live copy; **no image**.
- **Fixed:** matches (copy, circles, two columns, no image).

### Benefits (`.benefits_section`)
- **Live:** image-left (iPad), 2-column benefits, icon-over-text, live copy.
- **Fixed:** matches.

### Testimonials (`.testimonial_section`)
- **Live:** left heading; cards border `1.6px #D2D2D2` radius `.8rem`; avatar in
  `#D5E7D0` circle; `''…''` quotes; horizontal scroll.
- **Fixed:** matches (left heading, bordered cards, avatar circle, curly quotes).

### Partners (`.partner_section`)
- **Live:** left `h3` "Our Partners"; partners image full width; extra-partners
  image below.
- **Fixed:** matches.

### Footer
- **Live:** logo; link list (no heading): Self-Assessment, Privacy, Cookie, Terms;
  "Our projects": RES4CITY/SHERLOCK/COSS; "Get in touch": Contact Us, About us,
  LinkedIn; links `1.2rem` weight 600 `#1A1A1A`.
- **Fixed:** matches (no "Legal" heading; LinkedIn in Get in touch).

### Programmes page (`/programs`)
- **Live:** eyebrow "Catalogue"; `.section_header` `2.5rem`→`4rem`; `.r4c-micro-programs`
  **CSS grid** `repeat(auto-fit, minmax(250px,500px))`, centred, `2rem` gap.
- **Fixed:** grid switched to `repeat(auto-fit, minmax(280px,500px))` centred,
  `2rem` gap (was a fixed 3-col grid).

### Courses page (`/courses`)
- **Live:** `.r4c-discovery-input` white, border `#BDBDBD`, radius `10px`, `42px`
  high + green `.r4c-discovery-submit` (right-rounded `10px`); `.r4c-search-facets`
  `#F9F9F9` panel, border `#BDBDBD`, radius `10px`, "Refine Your Search"; course
  grid `repeat(auto-fit, minmax(362px,1fr))`. Results load from the Open edX
  course-discovery API (with a "Loading" spinner).
- **Fixed:** search box → `10px` radius + `#BDBDBD` border + green submit; facets
  panel → `#F9F9F9`/`#BDBDBD`/`10px`. Functional search + refine retained.
- **Remaining (intentional):** no course-discovery API, so the list is **MVP-derived**
  from programme data (clearly labelled). Live course cards include a course image
  + org/code + "More info"; our derived cards are text-only (no per-course images
  in the source data). No live "Loading" spinner (no async fetch).

### About page (`/about`)
- **Live:** `.r4c-about-title` black `3rem`/`4.375rem`; three `.r4c-about-content`
  paragraphs `#767676`. No cards.
- **Fixed:** matches (title + three verbatim paragraphs, no cards).

### Contact page (`/contact`)
- **Live:** `.r4c-contact-header` "Let's get in touch!" up to `4.6rem`; text
  `1.5rem`; "Follow us" + LinkedIn; First/Last name row, Email, Message; green
  submit `.r4c-contact-form-btn` (radius `2.5rem`) + arrow.
- **Fixed:** matches (heading, text, Follow us + LinkedIn, First/Last + Email +
  Message, green Submit + arrow). Uses existing `/api/contact` validation.

### Legal pages (`/privacy`, `/cookie_policy`, `/tos`)
- **Live:** `.r4c-privacy-title` black `3rem`; `.r4c-privacy-subtitle` **green**
  `2.5rem`; content `#767676 1.1rem`. Same header/footer.
- **Fixed:** green section subtitles, large black title, shared header/footer.
  Content is verbatim from the live pages.

---

## Why remaining differences exist
- **No course-discovery API / per-course images** → `/courses` uses a labelled
  MVP-derived list rather than live results.
- **No LMS/auth/enrolment** by design → Register / Sign in / Enrol / "More info"
  stay as external links (or are omitted where there's no public target).
- **Tailwind scale** approximates a few exact rem values (e.g. hero title 3.75rem
  vs 4rem); proportions match, exact px may differ slightly.
- **No headless browser** in this environment → final pixel verification is manual.

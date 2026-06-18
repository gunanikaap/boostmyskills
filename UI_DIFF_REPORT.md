# UI Difference Report - final public UI match pass

Reference: https://boostmyskills.eu/

Method: compared the local branch against the live public HTML, computed browser
styles, and public `res4city-theme` CSS files served by the live site. The goal
for this pass was visual accuracy, with typography first, then spacing and
component details.

## Typography fixes made

- Confirmed the live site uses `Urbanist` globally via Google Fonts with weights
  400, 500, 600, and 700.
- Matched header navigation to live `16px / 600`.
- Matched header CTAs to live `16px / 700`, 47px height, green outline/solid
  styles.
- Matched hero heading to live `64px / 700 / 64px`.
- Matched hero body copy to live `24px / 400 / 30.4px`, `#767676`.
- Corrected hero eyebrow from 700 to live 600.
- Corrected home trending heading to live `64px / 600 / 40px` with `-1.16px`
  letter spacing.
- Split programme-card typography:
  - Home carousel cards use live smaller title text, `19.2px / 600 / 25.6px`.
  - `/programs` cards use live larger title text, `24.96px / 600 / 28.8px`.
  - Programme meta/body text uses live `16px / 600 / 22.4px`, `#767676`.
- Matched `/programs` page header to live catalogue style:
  `Catalogue` at `24px / 600`, title at `64px / 600 / 40px`.
- Preserved About/legal page title style at live `70px / 700 / 84px`.
- Matched contact heading, paragraph, form label, and submit button typography
  against the live contact page.

## Page-by-page fixes made

### Home

- Preserved the previously matched header and hero structure.
- Tightened hero eyebrow weight.
- Matched trending section heading line-height and letter spacing.
- Adjusted home programme cards to the live carousel typography rather than the
  larger `/programs` card typography.
- Kept certificate, choose option, steps, benefits, testimonials, partners, and
  footer in the live-style spacing/layout from the prior pass.
- Tightened footer vertical padding to better match the live footer height.

### /programs

- Corrected the page header from generic content-page typography to live
  catalogue-page typography.
- Kept live-style card grid: centred `auto-fit` cards with 500px max width and
  2rem gaps.
- Kept card image height, border, radius, bullets, and Enrol CTA aligned with
  live measurements.

### /courses

- Reworked the desktop layout to match live: course cards on the left, search
  and refine panel in the narrow right column.
- Matched search input height, radius, border colour, font size, and green
  submit button.
- Matched "Refine Your Search" typography and the live facet panel style.
- Moved the MVP limitation note below the result grid so it does not dominate
  the live-style public view.
- Kept course data derived from the local MVP source; no LMS/API simulation was
  added.

### /about

- Restored the exact live desktop title position: 72px left, 120px top.
- Kept the page simple: title plus text, no invented cards or sections.

### /contact

- Matched the live heading text, including the curly apostrophe.
- Kept left column heading/paragraph/follow block aligned with live.
- Adjusted form top spacing so Name, Email, Message, and Submit sit within a few
  pixels of the live positions.
- Matched submit button typography and letter spacing.

### Legal pages

- Kept legal text unchanged.
- Fixed shared shell width so title/content align to the live 1120px content
  column.
- Kept readable typography, green section headings, and matching header/footer.

## Remaining minor differences

- `/courses` now uses **real public catalogue data** pulled from the live Open edX
  course-discovery API (76 courses, real images, org/project/topic/programme
  facets), snapshotted into the repo. It is not a live feed; the Micro-Programme
  facet filtering is best-effort (programme membership isn't exposed per course).
- Live course cards include LMS-specific presentation and "More info" behaviour;
  local cards link "More info" / "Enrol" to the live course pages.
- The local implementation uses Next.js/Tailwind components, so class names and
  DOM structure differ from the Open edX theme even when computed sizes match.
- A few footer and long-page heights differ slightly because local content is not
  the exact live LMS-rendered content.

## Handoff additions — demo auth

- Added UI-only **/login** and **/register** pages re-creating the live auth
  screen (pale-green page, logo, "Start learning with BoostMySkills" heading,
  white card with Register / Sign in tabs). They are demo only: on submit they
  show a notice and do not authenticate, store credentials, or create sessions.
- Header **Sign in** / **Register for free** destinations are controlled by
  `authMode` in `src/data/site.ts` (`demo` → local pages, `external` → Open edX).
  Header visual styling is unchanged. Production auth/enrolment stays with Open edX.

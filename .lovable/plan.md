## 1. New résumé wiring

- Replace `public/Lewis_Eydman_Resume.pdf` with the newly uploaded PDF (overwrite same filename so existing links keep working).
- `ExperienceTimeline.tsx`: tighten copy to match the refreshed résumé (100Green Communications Manager, ITS Frontend Dev, ITS Designer, Freelance, Phipps Group career-break note in the trailing card, Google UX Design + NUA Graphic Communication in a compact "Education" footer beneath the timeline).

## 2. Résumé PDF viewer (footer button)

In `ResumeDialog.tsx`, change the embed URL fragment from `#view=FitH` to `#pagemode=thumbs&zoom=100` on both `<object data>` and the `<iframe src>` so the document opens with the thumbnail sidebar visible and at 100% zoom by default (matching what the user means by "sidebar"). Keep "Open in new tab" and "Download" actions untouched.

## 3. Shared "pill summary strip" for every popover

Reference screenshots show a row of summary pills with a small label + one-line dek directly beneath the popover header (e.g. *Practice / Systems / Currently*, *Jonathan / Collaboration / Delivery*, featured blog thumbnails, featured Works thumbnails). Implement once, reuse everywhere.

- New component: `src/components/portfolio/PopoverSummaryStrip.tsx`. Accepts an array of items: `{ kicker, title, dek, thumb? }`. Renders a horizontal row (2–4 cards) inside the dialog body — pill-shaped, hairline border, optional 40×24 thumbnail at the left, small uppercase kicker, bold title, muted one-line dek. Hover lift + sepia underline. Wraps to a single column on mobile.
- Update `SectionDialog.tsx` to accept an optional `summary` slot rendered above the section body but inside the unified padded container (no padding drift).
- Wire each section to pass a `summary`:
  - **About**: `Practice` (Product, design, and engineering in one practice), `Systems` (React, design systems, full-stack tooling), `Currently` (Communications Manager at 100Green).
  - **Opera (Work)**: one pill per project with its existing thumb + Latin `Opus · I/II/III/IV`, title, blurb (mirrors the screenshot's Works strip).
  - **Codex (Blog)**: three featured/most-recent posts with thumbnails (mirrors screenshot's Blog strip).
  - **Disputatio (Tests)**: each disputatio's number + title + domain.
  - **Laudes (Testimonials)**: first 3 testimonials, name + relation + truncated quote.
  - **Cursus (Experience)**: three timeline highlights (Now / Most-recent shipped / Earliest).

## 4. Differentiate Blog popover from Work / Tests

Today, Blogs/Works/Tests all use the same "grid of image cards → back-link detail" layout, which is why they read the same. Rework `Blogs.tsx` into an editorial magazine layout:

- **Hero feature**: the most recent post takes a full-width card — large 16:7 image on the left, large display title + dek on the right, byline (Lewis Eydman · date · read time), tag chips, "Read essay →" CTA. Distinctive from Works' grid.
- **Beneath**: an "Archive" list (no thumbnails) of remaining posts as numbered table rows — `№`, date, title (display serif), dek (muted), read time, right-aligned tag — hairline dividers between rows. Reads like the contents page of a journal, nothing like the image-grid pattern Works uses.
- **Detail view**: keep the existing typeset article but add a left-aligned editorial sidebar (sticky on desktop) with date, author, read time, tags, and a tiny "↑ Top / ← Back to Codex" rail. Body widens to ~64ch with a real drop cap and pull-quote treatment (italic display, hairline left border) every few paragraphs.
- Reuse PopoverSummaryStrip for the three featured posts above the hero.

## 5. About section restructure

Rework `About.tsx` to follow the reference hierarchy while keeping our renaissance tone:

- Open with a single editorial headline + two-column dek (mirrors "Product, engineering, and design in one opinionated practice" with the existing tone of voice). Author kicker line above (`LEWIS EYDMAN`).
- **At a glance** band: 3 stat-cards (`Current` = role at 100Green, `Experience` = 7+ years across design, engineering, product, `Background` = service design, UI/UX, full-stack). Same hairline-card treatment as the screenshot.
- **What I do** + **How I work** as a two-column numbered list (4 items each, `01 02 03 04` in mono):
  - *What I do*: Product strategy & roadmaps · UX & service design · Frontend & full-stack engineering · Stakeholder & delivery leadership.
  - *How I work*: Outcomes over rigid roadmaps · Evidence-led, A/B-tested · Sketch first, ship the prototype · Accessible & regulation-aware by default.
- Move existing **Disciplines** (Design / Engineering / Product manuscript block), **Quantities** (stats), and **Marginalia** (interests, refreshed with résumé-accurate items: coding, gaming, making music, Muay Thai, landscaping, etc.) below the new structure so nothing valuable is lost.
- Numerals + Latin kickers stay; the layout is the only thing being restructured.

## 6. Files touched

- `public/Lewis_Eydman_Resume.pdf` (replace)
- `src/components/portfolio/ResumeDialog.tsx`
- `src/components/portfolio/SectionDialog.tsx`
- `src/components/portfolio/PopoverSummaryStrip.tsx` (new)
- `src/components/portfolio/About.tsx`
- `src/components/portfolio/Blogs.tsx`
- `src/components/portfolio/SelectedWork.tsx` (pass summary)
- `src/components/portfolio/Tests.tsx` (pass summary)
- `src/components/portfolio/Appraisals.tsx` (pass summary)
- `src/components/portfolio/ExperienceTimeline.tsx` (pass summary + résumé copy refresh)
- `src/components/portfolio/VitruvianStage.tsx` (pipe `summary` prop into each `SectionDialog` invocation)

No backend, routing, or design-token changes — all work stays in presentation components.

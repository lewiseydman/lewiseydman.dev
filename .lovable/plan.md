## Overview

Restructure the orbit navigation into six sections, deepen the content inside each popover, add brand-friendly icons (including Medium), nest the Vitruvian figure inside the 3D sphere, and tighten layout polish (label spacing, unified popover padding).

## 1. Split Codex into two sections (now 6 orbit labels)

Replace the combined "Codex · Writings & Appraisals" with two separate orbit items, redistributing angles around the circle so spacing stays even:

- **Vita** (About)
- **Opera** (Work)
- **Cursus** (Experience)
- **Codex** (Writings / Blogs)
- **Laudes** (Appraisals — Latin for "praises/testimonials")
- **Disputatio** (Tests)

`WritingsAppraisals.tsx` will be retired and split into two new components: `Blogs.tsx` and `Appraisals.tsx`.

## 2. Blogs (Codex) — readable in popover

- Add a `blogs` data file with ~4 placeholder posts: title, dek, date, reading time, thumbnail (AI-generated, sepia/ink themed line illustrations), tags, and full markdown/JSX body.
- Default popover view: a grid of blog cards with thumbnail, title, date, dek.
- Clicking a card swaps the popover body to a beautifully typeset article view (drop cap, generous line-height, Cormorant headings, narrow measure, marginalia date) — no navigation away, internal back arrow returns to the index.
- Reuses the existing `SectionDialog`; state for "which post is open" lives inside `Blogs.tsx`.

## 3. Disputatio (Tests) — image + summary per item

- Each test entry gets a hero image (AI-generated UI/design/motion stills) plus a short summary.
- Index view: grid of test cards with thumbnail + title.
- Clicking opens an in-popover detail view showing the full image (max width within unified padding) and a paragraph summary. Same back-arrow pattern as Blogs.

## 4. Opera (Work) — case studies

- Convert `SelectedWork.tsx` into an index of company/project cards (logo or thumbnail, role, dates, one-line outcome).
- Clicking opens an in-popover case study with sections: Context, Role, Challenge, Approach, Outcome, plus 1–2 supporting images.
- Same in-popover detail/back-arrow pattern as Blogs and Tests for consistency.
- Seeded with placeholder companies the user can edit later.

## 5. Cursus (Experience) — add resume download

- Keep timeline as-is.
- Add a prominent "Download Résumé" button at the top of the section using the existing button styling (sepia outline, mono-mar microcopy).
- Wire it to `src/assets/resume.pdf`. Until the user uploads their PDF, the button references a placeholder file path and shows a small note: "PDF coming soon."
- Once the user uploads the file, swap in the real path — no other code changes needed.

## 6. Footer icons — add Medium

- Add `react-icons` (tree-shakable, supports Medium and many brand marks) and import `SiMedium` from `react-icons/si` for the Medium entry. Keep all existing lucide icons for non-brand glyphs (Mail, LinkedIn, etc.).
- Style all icons with identical size/stroke so the row stays visually consistent with the sepia aesthetic.

## 7. Vitruvian inside the 3D sphere

- In `VitruvianStage.tsx`, move the Vitruvian `<img>` so it visually sits inside the wireframe sphere (currently the sphere is behind it). Restack z-index: sphere on top of/around the figure, figure centered, both within the same circular frame.
- In `VitruvianScene.tsx`:
  - Match wireframe color to the Vitruvian outline ink (read current outline as roughly `#3a2e22` / dark sepia-ink — will sample from the asset; will set both meshes to that color).
  - Lower opacity (~0.10–0.14) so the figure remains clearly visible through the wireframe.
  - Slightly increase sphere radius so the figure fits comfortably inside.

## 8. Orbit label spacing

- In `OrbitLabel.tsx` / `OrbitLines.tsx`, increase the radial distance between the inner dot (on the circle) and the outer label by raising the `OUTER_R` constant (and lengthening the leader line accordingly) so labels breathe further away from the orbit.

## 9. Unified popover padding

- Define one padding scale and apply to every section component rendered inside `SectionDialog`. Currently `SectionDialog` body uses `px-6 py-10 md:px-10 md:py-14` but child components add their own paddings inconsistently.
- Standardize: dialog body container owns padding; child sections add only vertical rhythm (`gap-*`) — no extra horizontal padding inside section components.
- Update `About`, `Blogs`, `Appraisals`, `SelectedWork`, `ExperienceTimeline`, `Tests` to follow this rule.

## Technical notes

- New files: `src/components/portfolio/Blogs.tsx`, `Appraisals.tsx`, plus `data/blogs.ts`, `data/work.ts`, `data/tests.ts` for content.
- Delete `WritingsAppraisals.tsx` after split.
- AI-generated thumbnails (~12 images total): blog covers, test stills, work case-study heroes — all rendered in the existing parchment/sepia/ink palette as line illustrations to stay on-aesthetic.
- Add `react-icons` via `bun add react-icons`.
- No backend / Lovable Cloud needed — all content is static.
- Resume: please upload your PDF (drag into chat) once approved; I'll place it at `src/assets/resume.pdf` and wire the download.

## Out of scope

- No new routes — everything remains a single-fold experience with popovers, per your earlier direction.
- No color palette changes beyond matching the sphere to the figure's outline ink.

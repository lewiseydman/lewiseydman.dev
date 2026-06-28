## 1. Responsiveness fix (orbit labels clipped)

**Cause:** `VitruvianStage.tsx` sizes the stage square at `w-[min(78vh,88vw)] max-w-[820px]`. The labels and their tails extend ~17% of that width *outside* the square on each side. On tall portrait viewports (iPad Pro, Zenbook Fold) the square is dictated by `78vh`, which leaves no horizontal room for the label tails — they get pushed off-screen.

**Change:** In `VitruvianStage.tsx`, reduce the stage size so it never exceeds the viewport width minus the room required by labels.
- Replace stage class with `w-[min(70vh,70vw)] max-w-[760px]`
- The wrapping `div` already has `overflow-visible`; keep it.
- Verify on iPad Pro and Zenbook Fold viewports that all six labels are fully visible.

No content or structural changes — purely sizing.

## 2. Make each section visually distinct

Right now most sections share the same vertical-card layout. I'll give each a unique visual signature while keeping the parchment/sepia palette and the unified dialog padding. Every section's data stays in a typed array at the top of its file so new entries are always one append away.

- **Vita (About)** — Keep the manuscript-plate hero. Add a small two-column "Principia" panel below Marginalia (left: short manifesto paragraph; right: signature/monogram block). No grid changes elsewhere.
- **Opera (Work)** — Convert from stacked notebooks to a **left-rail index → right-pane case study** layout inside the dialog. Click a project on the rail; the Context/Role/Challenge/Outcome notebook renders on the right. Scales cleanly to 20+ projects without scroll fatigue.
- **Cursus (Experience)** — Restyle as a true **vertical timeline with a sepia rule down the middle**, role nodes alternating left/right, dates in marginalia type. Currently it's a stacked list — the timeline makes it instantly distinct from Opera. Resume button stays.
- **Codex (Blogs)** — Switch to an **editorial magazine grid**: featured lead article (large thumbnail + dek), then a 2-column secondary grid. Reading view (current full-template popover within the popover) stays the same.
- **Laudes (Appraisals/Testimonials)** — Restyle as **pull-quote folios**: large serif opening quote mark, italic quote body, sepia rule, attribution block (name, role, company, relationship). Arrange in an asymmetric masonry (2–3 columns) so it doesn't look like Opera or Codex.
- **Disputatio (Tests)** — Restyle as a **specimen sheet**: square thumbnail + tag chip (UI / Motion / Visual / Found) + 2-line summary. Arrange as a uniform 3-up gallery — clearly distinct from Codex's editorial grid.

**Adding new entries (clarification):** Every section is backed by a plain TypeScript array (e.g. `const projects: Project[] = [...]`) at the top of its component file. To add a new role, blog, project, testimonial or test, you append one object to that array — no other code changes.

## 3. Résumé refresh + PDF viewer polish

- Replace `public/Lewis_Eydman_Resume.pdf` with the newly attached PDF.
- In `ResumeDialog.tsx`, change the `<object data>` and `<iframe src>` URLs to:
  `/Lewis_Eydman_Resume.pdf#view=FitH&zoom=100&pagemode=none&toolbar=1&navpanes=0`
  - `navpanes=0` → hides the sidebar (Adobe & most Chromium PDF viewers)
  - `pagemode=none` → ensures no thumbnails/outline panel
  - `zoom=100` → opens at 100%
  - `view=FitH` retained as fallback for viewers that ignore `zoom`

Note: these are Adobe Open Parameters; honored by Chrome/Edge/Adobe Reader. Safari's built-in viewer ignores them, which is acceptable.

## Technical notes

- Files touched: `VitruvianStage.tsx`, `About.tsx`, `SelectedWork.tsx`, `ExperienceTimeline.tsx`, `Blogs.tsx`, `Appraisals.tsx`, `Tests.tsx`, `ResumeDialog.tsx`, `public/Lewis_Eydman_Resume.pdf`.
- No new dependencies. No route changes. No content rewriting — existing copy is preserved, just re-laid-out.
- Section data arrays remain the single source of truth so future content edits are append-only.

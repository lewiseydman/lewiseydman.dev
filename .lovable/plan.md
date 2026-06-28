# Plan

## 1. Résumé file rename + in-popup PDF viewer
- Rename `public/resume.pdf` → `public/Lewis_Eydman_Resume.pdf` (recruiter-friendly filename for downloads/saves).
- Update `ExperienceTimeline.tsx` download link to the new path; keep the explicit `download` attribute so the file saves with that name.
- In `FooterIcons.tsx`, change the Résumé icon from an `<a href>` to a button that opens a new `ResumeDialog` instead of navigating.
- New `src/components/portfolio/ResumeDialog.tsx`:
  - Reuses `SectionDialog` shell (numeral `※`, latin `Curriculum`, english `Résumé`) for consistent padding + aesthetic.
  - Renders the PDF via a native `<object data="/Lewis_Eydman_Resume.pdf#view=FitH" type="application/pdf">` with an `<iframe>` fallback inside, plus a visible "Download PDF" link and "Open in new tab" link as accessible fallbacks (covers browsers that block embedded PDFs, screen readers, and mobile Safari).
  - Dialog is keyboard-dismissible (Radix default), `aria-label="Résumé of Lewis Eydman"`, focus trapped, scroll-locked. Wrapper has `role="document"`.
- Wire dialog state in `VitruvianStage` (or local state in `FooterIcons`) — local state in `FooterIcons` is simpler and keeps the stage clean.

## 2. About — stats + hobbies
- Move the 4-stat grid out of the right column and place it as a **full-width band directly beneath the portrait+disciplines section**.
- Replace stats with more universally recognised, still-honest metrics:
  - `7+` Years shipping
  - `20+` Products launched
  - `4` Industries served (energy, retail, education, freelance)
  - `100%` On-time delivery
  (Exact labels can be tuned, but all are recruiter/client-legible and not vague like "Disciplines woven".)
- Add a new **Hobbies & Interests** block below the stats:
  - Manuscript-style heading ("Marginalia · Beyond the desk") with a short intro line.
  - Tag chips reusing the existing `Instruments` chip style: e.g. Cycling, Film photography, Bouldering, Generative art, Specialty coffee, Open-source, Sci-fi literature, Sketching. (Final list TBD — placeholders honouring the tone.)

## 3. Sphere line colour + opacity (red-arrow lines)
- The arrow points to the **three.js wireframe lines**. Currently they're already `#1f1812` (ink) but the inner detailed icosahedron at `opacity 0.07` is what dominates and reads as cool/grey against the parchment.
- In `VitruvianScene.tsx`: switch all wireframe materials to the exact Vitruvian outline ink token (use `var(--ink)` value resolved at runtime via `getComputedStyle`, or hard-code the matching sepia-ink `#3a2a1f` we use for the figure) and lower opacities further: outer `0.04`, inner `0.05`, rings `0.08 / 0.06`. This warms them into the same family as the figure but keeps them clearly more transparent.

## 4. Responsive scaling of orbit labels (laptop sizes)
- Problem: at ~1280–1500px the labels sit too far from the centerpiece (large dead gap) because `tailLen` and `OUTER_R` are fixed fractions of the stage square, but the stage square is capped at `820px` while the viewport is wider.
- Changes in `VitruvianStage.tsx`:
  - Make the stage square fluid: replace `w-[min(78vh,88vw)] max-w-[820px]` with a fluid clamp that grows with viewport: `w-[min(82vh,72vw)] max-w-[960px] xl:max-w-[1100px]` so the figure scales with available width.
  - Increase `OUTER_R` slightly on wider breakpoints by passing breakpoint-aware values (track via a `useMemo` reading `window.innerWidth` on resize, or simpler: CSS-variable-driven radii). Simplest implementation: introduce two presets, `{ inner: 0.32, outer: 0.48 }` for ≤lg and `{ inner: 0.34, outer: 0.5 }` for xl+, switched via a `matchMedia` hook.
- In `OrbitLabel.tsx` / `OrbitLines.tsx`: make `tailLen` responsive too — shrink it on narrower laptop widths (e.g. `0.12` at <1400px, `0.17` at ≥1400px). Pass it as a prop from the stage so both files stay in sync.
- Net effect: on a 13–15" laptop the labels move inward, hug the orbit, and scale proportionally with the centerpiece instead of floating against the page edges. Mobile fallback (the chip row) is untouched.

## 5. Project overview (chat reply, not implemented)
After applying the plan I'll include a short written review covering: what's working (aesthetic cohesion, single-fold concept, content depth), suggested improvements (perf budget for three.js on low-end devices, real case-study imagery, SEO/meta per-section, motion-reduction polish, analytics, possible CMS path), and risks (PDF embedding on mobile Safari, asset weight).

## Technical notes
- No new dependencies. Native `<object>`/`<iframe>` PDF embed works on all modern desktops; mobile devices get the explicit download/open-in-tab fallback inside the same dialog.
- All colour values stay tokenised via existing CSS variables; no hardcoded utility colours.
- Files touched: `public/resume.pdf` (rename), `FooterIcons.tsx`, `ExperienceTimeline.tsx`, `About.tsx`, `VitruvianScene.tsx`, `VitruvianStage.tsx`, `OrbitLabel.tsx`, plus new `ResumeDialog.tsx`.

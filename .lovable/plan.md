## Goal

Tighten three cross-cutting concerns without changing product scope: (1) animation feel and consistency, (2) image loading performance and stability, (3) state management for dialogs, hashes, and expand/collapse.

## 1. Animations

- Centralize motion tokens in a new `src/lib/motion.ts`: shared `spring` (stiffness 220, damping 30, mass 0.85), `springSnappy`, `easeOut` cubic bezier, and durations (`fast: 0.2`, `base: 0.3`, `slow: 0.5`). Replace ad-hoc transition objects in `Tests.tsx`, `SectionDialog.tsx`, `Blogs.tsx`, `SelectedWork.tsx`, `Appraisals.tsx`, `About.tsx`, `ExperienceTimeline.tsx`, `VitruvianStage.tsx`.
- Respect `useReducedMotion()` everywhere motion runs (currently only in `VitruvianStage`). Skip layout/spring animations and fall back to opacity fades when reduced.
- Standardize entry animations: replace per-component `initial/animate` combos with a shared `<FadeIn>` / `<StaggerList>` wrapper in `src/components/portfolio/primitives/Motion.tsx`.
- Lightbox in `Tests.tsx`: keep the recent `layoutId`-on-image fix but move the spring into the shared token and add `layout="position"` on the container to prevent size interpolation jitter.
- Add `will-change: transform` only during active animations (via `whileHover` variants) instead of always-on, to reduce compositor cost on the grid.

## 2. Image loading

- Add `vite-imagetools` and generate AVIF/WebP variants for large bundled JPEGs under `src/assets/tests/` and `src/assets/portrait.png`. Use `<picture>` with format fallbacks in `Tests.tsx`, `About.tsx`, `SelectedWork.tsx`, `Blogs.tsx`.
- Add explicit `width`/`height` (or `aspect-ratio` style) on every `<img>` to eliminate CLS. For Tests, precompute intrinsic ratios at build time via imagetools query (`?w=800&as=metadata`) and store alongside each entry.
- Preload the LCP image: portrait in `About` when the About dialog opens is not LCP; the true LCP is the Vitruvian figure — add `rel="preload"` for `vitruvian.png` in `src/routes/__root.tsx` `head().links`.
- `loading="lazy"` + `decoding="async"` on all grid/thumb images; `fetchpriority="high"` on hero/vitruvian.
- Add a lightweight blurred placeholder (LQIP) via imagetools `?w=20&blur=10&as=metadata` for Tests thumbnails; render as `background-image` behind the `<img>` until `onLoad`.
- Confirm all `.asset.json` pointers are used via their CDN URL (already are); no code change needed, just audit.

## 3. State management

- Consolidate dialog + section state: extract the currently-open section, closingId, and scroll-reset into a single `useSectionState()` hook in `src/hooks/use-section-state.ts`. Replaces overlapping logic in `VitruvianStage.tsx`, `Tests.tsx` (`openId`/`closingId`), and the `scroll-dialog-top` call sites.
- Replace hash-driven `useSectionHash` reads scattered across children with a small React context (`SectionContext`) provided in `VitruvianStage`, so `PopoverSummaryStrip` cards navigate without re-reading `window.location`.
- Deduplicate the "expand with loading" pattern: `useExpandWithLoading` is fine; audit Blogs/Opera to ensure both call it identically (delay, cleanup on unmount) and share a `<ExpandButton>` primitive.
- Route the Tests lightbox open state through the same hash system (`#disputatio/<id>`) so back-button closes the lightbox instead of the dialog — better UX, one source of truth.
- Add a `useHydrated()` guard already referenced in TanStack rules for anything reading `window` during render (audit `use-intersection-pause`, `scroll-dialog-top`).

## Technical notes

- No new packages besides `vite-imagetools`.
- All motion tokens typed as `Transition` / `Variants` from framer-motion for type-safe reuse.
- No changes to routing, data, or content — pure frontend/presentation refactor.
- Verification: Playwright screenshots of Tests grid + lightbox, About portrait, and each dialog open/close to confirm no visual regressions; Lighthouse pass on `/` to confirm image weight drop.

## Out of scope

Content edits, copy changes, new sections, backend/data work.

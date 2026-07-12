## Goal

Sitewide UI/UX pass: unify typography, formalise a button system, add cohesive micro-animations, prune redundant files, and clean up a11y / responsive bugs — without altering content, section structure, or the manuscript aesthetic.

Stages are ordered so each layer builds on the previous. Stages 1–2 land tokens and primitives; stage 3 adopts them; stage 4 audits + prunes.

---

## Stage 1 — Typography system

Codify one scale in `src/styles.css` via `@utility` classes so components stop reaching for arbitrary `text-[0.6rem]` / `tracking-[…]` values.

- Keep the existing font stack (Cormorant Garamond display, Inter Tight sans, JetBrains Mono).
- Add semantic type utilities:
  - `type-display`, `type-h2`, `type-h3`, `type-h4`
  - `type-body`, `type-body-sm`, `type-caption`
  - `type-mono-label` (replaces inline `font-mono-mar` copies with fixed size/tracking/colour)
  - `type-numeral` (Roman numerals in orbit + timeline)
- Each utility bakes in `font-family`, `font-size`, `line-height`, `letter-spacing`, `font-weight`.
- Update `@layer base` so `h1–h4` default to the matching utility.

## Stage 2 — Button system

Extend the existing pill primitives — the manuscript aesthetic depends on the pill shape; do not swap in stock shadcn `Button`.

- `PillVariant` in `pillButton.ts` → `primary` | `secondary` | `outline` | `ghost` | `danger`.
  - `secondary` = filled sepia-on-parchment (new).
  - `outline` = current `primary`.
  - `danger` = destructive token pair.
- Sizes: add `lg`; codify padding + min-height + radius per size.
- Standardise interactive states in `base`:
  - `transition-colors transition-transform duration-200 ease-out`
  - `hover:-translate-y-px active:translate-y-0 active:scale-[0.98]`
  - `focus-visible:ring-2 focus-visible:ring-sepia/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background`
  - `disabled:opacity-60 disabled:pointer-events-none`
- Mirror variants + sizes + states in `IconPillButton.tsx`.
- Route ad-hoc `<button className="…">` in `Blogs.tsx`, `SelectedWork.tsx`, `Appraisals.tsx`, `VitruvianStage.tsx`, `Tests.tsx` through `pillButtonClasses` / `IconPillButton`.

## Stage 3 — Motion + interaction polish

- Global `@utility interactive`: `transition-[color,background-color,border-color,transform,opacity] duration-200 ease-out`. Apply to nav rows, orbit labels, dialog links.
- Dialog mount: wrap `SectionDialog` content in `motion.div` (fade + 8px slide-up, 240ms), respecting `useReducedMotion`.
- Lists: standardise `AnimatePresence` + staggered fade for Opera / Codex / Tests / Appraisals grids (Appraisals already partial).
- Loading: new `src/components/portfolio/primitives/Skeleton.tsx` (parchment shimmer) used by `useExpandWithLoading` in Blogs / Opera.
- One `useMotionPreset()` hook so `prefers-reduced-motion` is honoured in a single place.

## Stage 4 — Audit, cleanup + dead-file prune

- **Redundant files**: grep for zero-import modules and delete. Candidates to verify then remove:
  - Any unused hook in `src/hooks/` (`use-throttled-scroll.ts` if unreferenced after refactor).
  - Unused primitives (`ReadingProgressBar.tsx` if not mounted anywhere).
  - Any shadcn `src/components/ui/*` component not imported after the button consolidation.
  - `.lovable/plan.md` stale sections — leave file, prune content only.
  - Unused assets in `src/assets/`.
  - Empty barrel files / duplicate util helpers.
- Responsive sweep with Playwright at 375 / 768 / 1280 / 1836 for each section dialog; fix overflow/stacking regressions inline.
- Remove CSS displaced by the new type/interactive utilities (`font-mono-mar` call sites, one-off `text-[…]` overrides).
- a11y: every `IconPillButton` has `aria-label`; every dialog trigger has `aria-haspopup`; visible `focus-visible` on all focusable elements; contrast check on `text-muted-foreground` in both themes.
- Read preview console + network; fix warnings (React keys, Framer layout warnings).
- Final `tsgo` + `bun run build`.

---

## Files touched (expected)

- `src/styles.css` — type + interactive utilities, base heading defaults.
- `src/components/portfolio/primitives/pillButton.ts` — variants, sizes, states.
- `src/components/portfolio/primitives/IconPillButton.tsx` — mirrored variants.
- New: `src/components/portfolio/primitives/Skeleton.tsx`, `src/hooks/use-motion-preset.ts`.
- All portfolio components — swap arbitrary text/button classes for tokens; wrap lists/dialogs in standardised motion.
- Deletions: unused hooks, primitives, shadcn UI components, assets (list confirmed before removal).

## Out of scope

- Content changes (copy, section order, data).
- New sections / routes.
- Replacing the pill aesthetic with stock shadcn buttons.
- Backend / Cloud work.

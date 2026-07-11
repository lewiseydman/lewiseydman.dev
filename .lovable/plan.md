
# Spacing Standardisation + Button/Primitive Refactor

Two coordinated passes on the popover architecture. No colour, typography, motion, or functional changes — the editorial design language (hairlines, manuscript rails, sepia/brass, blueprint grain) is preserved exactly.

---

## Pass 1 — Spacing standardisation

### Scale (single source of truth)

- **Dialog body wrapper** (`SectionDialog`): `mx-auto w-full max-w-5xl px-5 py-8 md:px-8 lg:px-12 md:py-12 lg:py-16` (down from `md:px-14 md:py-16`).
- **Dialog header**: `px-5 py-4 md:px-8 md:py-5 lg:px-12`.
- **Sticky sub-headers** (Opera case study, Codex essay, Disputatio detail): `-mx-5 md:-mx-8 lg:-mx-12 px-5 md:px-8 lg:px-12 py-2`.
- **Inter-block gaps inside a popover**: outer wrapper `flex flex-col gap-12 md:gap-16`. Replaces the current `border-t pt-8/pt-10 mt-…` mix (border hairlines stay; `pt-*` companions fold into parent gap).
- **Inside a block**: `gap-4` small / `gap-6 md:gap-8` medium.
- **Micro** (icon → text, pill internals, meta rows): `gap-2`.
- **Card / list-item internal padding**: `p-4 sm:p-6 lg:p-8`.
- **Grid gaps between cards**: `gap-6 md:gap-8`.

### Files touched (spacing only)

`SectionDialog.tsx`, `About.tsx`, `ExperienceTimeline.tsx`, `SelectedWork.tsx`, `Blogs.tsx`, `Appraisals.tsx`, `Tests.tsx`, `primitives/FolioCard.tsx`, `PopoverSummaryStrip.tsx`, `VitruvianStage.tsx` (bottom cluster only), `ResumeDialog.tsx` (audit).

### Guardrails

- Hairline dividers, manuscript-rail geometry (`left-[0.45rem]`, `top-[2.1rem]`, dot sizing), sticky blur, z-indexing all untouched.
- Hero / stage / orbits / name-card in `VitruvianStage` untouched.
- No `container mx-auto max-w-7xl` at root; no `py-16/24/32` section rhythm (site has no stacked sections).

---

## Pass 2 — Button standardisation & primitive refactor

### Non-standard buttons found

| Location | Issue | Resolution |
|---|---|---|
| `Blogs.tsx` "Back to top" (fixed circular) | Hand-rolled classes | Move to new `IconPillButton` primitive |
| `SectionDialog.tsx` close (X) | Hand-rolled, has bespoke brass tactile animation | Keep bespoke (intentional signature interaction), but extract the base ring shape from `IconPillButton` so hover/focus rings match |
| `FooterIcons.tsx` icon links | Local `itemClass` const | Use `IconPillButton` for the visual base, keep the wrapping row |
| `BackToIndexButton.tsx` | Bespoke `px-2 -ml-2` shape | Adopt `pillButtonClasses("ghost", …)` with a compact modifier |
| `Blogs.tsx` hero image + title (two separate `<button>` around the same target) | Duplicated triggers, extra tab stops | Collapse to one image trigger; make title a plain heading (still keyboard-reachable via the image button + "Read essay" pill) |
| `Tests.tsx` list item (full-card `<button>`) | Duplicates `FolioCard`'s structure by hand | Refactor to use `FolioCard` (matches Opera + Codex Archivum) |
| `VitruvianStage.tsx` mobile nav rows | Purpose-built for the manuscript TOC | Keep; not a pill |
| Appraisals filter, SelectedWork "Read more", Blogs "Reveal earlier folios", ExperienceTimeline "Download résumé" | Already on `pillButtonClasses` | No change |

### New primitives

1. **`primitives/IconPillButton.tsx`** — round 44×44 button, shares `pillButton` variants (`primary`, `ghost`). Renders as `<button>` or `<a>` via a `render` prop / discriminated union. Absorbs the Blogs "Back to top" and FooterIcons item styling.
2. **`primitives/SectionLabel.tsx`** — the repeated `<span className="font-mono-mar">Label ·</span><span className="hairline h-px flex-1" />` pattern (appears 8+ times across About, ExperienceTimeline, Blogs, Appraisals). Optional `align` prop for left / full-hairline layouts.
3. **`primitives/DialogSubHeader.tsx`** — sticky back-header used in Codex essay, Opera case study, Disputatio detail. Consumes `BackToIndexButton` on the left and a `right` slot for meta. Owns the standardised sticky padding (`-mx-5 md:-mx-8 lg:-mx-12 …`) so every detail view lines up automatically.
4. **Extend `pillButton.ts`** — add an optional `size` argument (`"sm" | "md"`) so the current one-off `min-h-9 px-3 py-1.5 text-xs` overrides in Appraisals filter and ExperienceTimeline résumé button become `pillButtonClasses("primary", { size: "sm" })`.

### Refactor call sites

- `Blogs.tsx`: swap fixed back-to-top button for `IconPillButton`; replace two hero `<button>`s with a single image trigger + plain `<h3>`; replace bespoke sticky essay header with `DialogSubHeader`.
- `SelectedWork.tsx`: replace bespoke sticky case-study header with `DialogSubHeader`.
- `Tests.tsx`: replace the list item `<button>` with `FolioCard`; replace bespoke sticky detail header with `DialogSubHeader`.
- `Appraisals.tsx`: filter buttons use `size: "sm"`.
- `ExperienceTimeline.tsx`: résumé download uses `size: "sm"`; header row uses `SectionLabel`.
- `About.tsx`, `Blogs.tsx`, `Appraisals.tsx`, `Tests.tsx`, `ExperienceTimeline.tsx`: swap manual `font-mono-mar + hairline` divider rows for `SectionLabel`.
- `FooterIcons.tsx`: internal `itemClass` deleted in favour of `IconPillButton` (keeps tooltip span as-is).
- `BackToIndexButton.tsx`: rewritten as a thin wrapper around `pillButtonClasses("ghost", { size: "sm" })` with the arrow icon.
- `SectionDialog.tsx`: close button keeps its bespoke tactile brass ring (that's an intentional interaction), but its base ring/size aligns to `IconPillButton` so focus states match.

### Files added / modified

Added: `src/components/portfolio/primitives/IconPillButton.tsx`, `SectionLabel.tsx`, `DialogSubHeader.tsx`.
Modified: `pillButton.ts` (size arg), `BackToIndexButton.tsx`, `SectionDialog.tsx`, `FooterIcons.tsx`, `About.tsx`, `ExperienceTimeline.tsx`, `SelectedWork.tsx`, `Blogs.tsx`, `Appraisals.tsx`, `Tests.tsx`, `FolioCard.tsx`, `PopoverSummaryStrip.tsx`, `VitruvianStage.tsx`, `ResumeDialog.tsx`.

### Guardrails

- No visual change beyond the standardised padding/gap scale — hover states, focus rings, borders, colours stay pixel-identical or closer to spec than before.
- The bespoke `SectionDialog` close animation, `VitruvianStage` mobile nav rows, and orbit labels are explicitly out of scope.
- FolioCard's public API stays backward-compatible (Tests reuses existing props; no new required props).

---

## Verification — every view, every breakpoint

Mobile / tablet / desktop for:

- Hero stage (desktop orbits + mobile TOC + footer icons)
- Vita (About): intro, At a glance, What/How, Disciplines, Stats, Interests
- Opera (Selected Work): list + short-notebook case + long-notebook case (Read more expanded)
- Cursus (Experience): rail + education footer + résumé download
- Codex (Blogs): featured, Archivum before + after "Reveal earlier folios", one essay (back-to-top visible + hidden)
- Laudes (Appraisals): unfiltered + each relation filter (animation, no dark-flash regression)
- Disputatio (Tests): list + detail
- Resume dialog
- PopoverSummaryStrip drag on desktop, scroll on mobile

Checking: no double-padding at sticky headers, no leftover `mt-*`/`mb-*` where a parent `gap-*` replaces them, cards not cramped on mobile, grids not sparse on desktop, hairlines land where they did before, manuscript rail alignment unchanged, focus rings consistent across every pill/icon button, no lost keyboard reachability from the hero-title button collapse.

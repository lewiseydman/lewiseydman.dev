## Changes

### 1. Filter row layout on mobile (`src/components/portfolio/Appraisals.tsx`)
The current row (`flex flex-wrap items-center gap-2`) puts the "Filter ·" label inline with the pills, which wraps awkwardly on narrow screens and the pills feel cramped.

- Restructure to stack on mobile, inline from `sm:` up:
  - Wrap in `flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2`.
  - "Filter ·" label becomes a full-width caption on mobile (no `mr-1`), sits inline on `sm+`.
  - Pill group wrapped in its own `flex flex-wrap gap-2` so pills wrap cleanly under the label on mobile without the label eating a row slot.
- Give pills a touch-friendly min-height on mobile (keep `min-h-9` — already fine) and ensure they don't stretch (already handled by flex-wrap).
- No copy or variant changes.

### 2. Fix the "dark empty background" flash during filter animation (`src/components/portfolio/Appraisals.tsx`)
Root cause: the `<ul>` uses `gap-px` + `bg-border` to draw hairlines between cards. When the filter changes, `motion.li` items animate from `opacity: 0, y: 8`, so for ~300ms the grid cells are transparent and the `bg-border` shows through as a dark block behind the incoming cards. It's most visible when going from 3–4 cards down to 1–2.

Fix:
- Swap the border-as-background technique for a per-card border so the container has no dark fill:
  - `<ul>`: drop `gap-px overflow-hidden rounded-sm border border-border bg-border`, use `grid gap-4 lg:grid-cols-2` instead.
  - `<motion.li>`: add `rounded-sm border border-border` so each card carries its own outline. Keep existing hover shadow / bg transitions.
- Wrap the mapped items in `<AnimatePresence mode="popLayout" initial={false}>` and give each `motion.li` an `exit={{ opacity: 0, y: -8 }}` so removed cards fade out instead of snapping, and remaining cards `layout`-animate into their new positions without a visible empty slot.
- Keep the stagger (`delay: i * 0.05`) but cap it (e.g. `Math.min(i, 3) * 0.05`) so filtering down to 1 item doesn't feel oddly delayed.

Net effect: no dark background can show through (there's no shared background), and the crossfade between filter states is smooth.

## Out of scope
- No changes to testimonial copy, relations, or card internals (quote, author block, hover accent line).
- No changes to other popovers, `SectionDialog`, or the pill button primitive.
- No visual redesign of the pills themselves — only their container layout on mobile.

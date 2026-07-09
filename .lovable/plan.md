## Changes

### 1. Testimonials filter by relation (`src/components/portfolio/Appraisals.tsx`)
- Derive the unique set of `relation` values present in `testimonials` (currently: Colleague, Client) plus an "All" option.
- Add a filter row above the grid, rendered as a set of pill toggles using `pillButtonClasses` (`ghost` for inactive, `primary` for active) so the control matches every other filter/CTA on the site.
- Store the active filter in local `useState<string>("All")`; filter the list before mapping. Items missing a `relation` (e.g. Dave Craven) are only shown under "All".
- Re-numbering (`Laus · 01`, `02` …) recomputes against the filtered list so the labels stay contiguous.
- Keep the AnimatePresence-friendly `motion.li` mount animation on filter change (add `layout` + a stable `key={t.name}`).

### 2. Smaller testimonial quote text on tablet + desktop
- In `Appraisals.tsx`, drop the quote from `text-xl md:text-2xl` to `text-lg md:text-xl`.
- Reduce card padding one notch on desktop (`md:p-7` → `md:p-6`) so density matches the new type size.
- Author name stays as-is; only the quote and quote marks scale down.

### 3. Stack testimonials 1-per-row from tablet down
- Change the grid in `Appraisals.tsx` from `md:grid-cols-2` to `lg:grid-cols-2` so tablets get a single column with full width per testimonial (better legibility for the longer quotes now that text is smaller).

### 4. Apply the same tablet-single-column rule to other 2-column popover grids
Audit + change any `md:grid-cols-2` inside popover sections to `lg:grid-cols-2`:
- `src/components/portfolio/Tests.tsx` — Disputationes grid.
- `src/components/portfolio/Blogs.tsx` — Archivum grid, plus swap the odd-last `md:col-span-2` to `lg:col-span-2` so the rule still fills the last row on desktop only.

Leave `PopoverSummaryStrip` (horizontal scroll) and `SelectedWork` (already single-column stacked) untouched.

### 5. Experience timeline — centered spine that breaks around each item (`src/components/portfolio/ExperienceTimeline.tsx`)
Goal: from tablet down, the vertical spine runs down the center of the column and visually "stops" above and "resumes" below each experience card, so each card sits centered with full width.

Approach:
- Remove the single continuous `absolute` spine div.
- On mobile/tablet (`<lg`): each `<li>` renders its own top spine segment (a short vertical hairline, `h-8 w-px mx-auto`), then the centered gear node, then the card (`text-center`, full width, no left/right offset), then a bottom spine segment. First item omits the top segment; last item omits the bottom segment. This produces a centered, broken spine automatically without absolute positioning.
- On desktop (`lg:`): restore the current continuous absolute spine (`lg:absolute lg:left-1/2 …`) and the alternating left/right card layout — desktop behavior unchanged.
- Gear node stays centered at all breakpoints; the current `absolute left-[1.25rem] md:left-1/2` becomes `relative mx-auto lg:absolute lg:left-1/2 lg:-translate-x-1/2`.
- Hairline leader (`hidden md:block`) becomes `hidden lg:block` so it only appears once the alternating desktop layout is in play.

## Out of scope
- No copy changes, no new testimonials, no icon or color changes.
- No changes to `SectionDialog`, `PopoverSummaryStrip`, or `SelectedWork` layouts.

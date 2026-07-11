## Goal

Align Cursus (Experience) with Laudes (Appraisals) styling, restructure the timeline to match the About "manuscript rail" pattern (consistent left-rail spine at every breakpoint), standardise a compact sticky "back" control at the top of every detail view, and make popover scroll-to-top reliable.

## 1. Cursus header styled like Laudes

Rework the top of `src/components/portfolio/ExperienceTimeline.tsx` to mirror `Appraisals.tsx`:

- Replace the `flex … border-b pb-5` intro bar with the Laudes two-block pattern:
  - `font-display text-2xl md:text-3xl` intro line — plain foreground clause + italic sepia rider.
  - A quieter action row underneath (`font-mono-mar Actions ·` label + the existing "Download Résumé" pill), same wrap/gap rhythm as the Laudes filter row.
- Remove the header divider (Laudes has none); keep section `gap-10`.

## 2. Timeline restructured to match About's manuscript rail

Adopt the exact "left rail + dot node + item" pattern used in About's Portrait/Disciplines section (`src/components/portfolio/About.tsx` §180–223), so both sections read as one design language. This also fixes mobile: today the timeline centers on mobile with gears above/below, burning vertical space.

Rework the body of `ExperienceTimeline.tsx`:

- One layout at every breakpoint (mobile → desktop): a single vertical column with a left rail.
  - Wrapper: `relative flex flex-col`.
  - Rail: `pointer-events-none absolute top-2 bottom-2 left-[0.45rem] w-px bg-sepia/30` (identical to About).
  - Each item: `relative flex gap-5 border-b border-border py-6 last:border-b-0`, with an absolutely-positioned dot node (`h-2 w-2 rounded-full border border-sepia bg-background`) sitting on the rail.
- Replace the animated Gear SVG with the dot node on mobile/tablet (keeps rhythm and cuts ~40px per item). Preserve one small rotating Gear as the section's marker at the top of the rail only, so the mechanical motif survives without dominating each row.
- Item content grid: `md:grid-cols-[9rem_1fr] gap-x-6`, meta column (year + org) on the left from `md:` up, role/notes on the right. On mobile, stacks — year and org sit above role/notes, all left-aligned against the rail.
- Remove the desktop-only alternating two-column layout, the mobile top/bottom spine `<div>` fillers, and the `Gear` node wrapper.
- Tighten rhythm: `space-y-0` (borders provide separation), remove `lg:space-y-24`.
- Education footer: switch to `sm:grid-cols-2 lg:grid-cols-3` so tablets get two-up.

Result: timeline visually mirrors About, wider copy column at every size, ~40% less vertical space on phones, important content (first role) stays above the fold on mobile.

## 3. Mobile-stacking audit across all sections

Sweep the popover sections to confirm important content stays above the fold on mobile and stacks consistently:

- `About.tsx`: intro headline + first paragraph already above the fold. Confirm no changes needed — the manuscript rail is the reference.
- `SelectedWork.tsx` / `Blogs.tsx`: hero card + title already stack correctly; verify `PopoverSummaryStrip` is not pushing hero content below the fold on mobile. If the strip is > ~40% of viewport height on mobile, cap its `min-h`/thumb aspect so hero content stays visible.
- `Tests.tsx`: intro line + first card should sit above the fold — currently fine.
- `Appraisals.tsx`: intro line + filter row already stack (from the earlier fix); no changes.
- `ExperienceTimeline.tsx`: covered by §2.

Deliverable: no structural changes to sections that already stack well; only the strip cap if measured overflow warrants it.

## 4. Compact sticky "back" at the top of every detail view

- `Blogs.tsx` `Essay` and `SelectedWork.tsx` `CaseStudy`: already have a sticky back bar — tighten to `py-1.5`, ensure it's the very first child.
- `Tests.tsx` detail view: wrap in the same sticky pattern (`sticky top-0 z-10 -mx-5 md:-mx-14 border-b bg-background/85 backdrop-blur-md px-5 md:px-14 py-1.5`) using `BackToIndexButton` with "Back to Disputationes" and a right-side `Disputatio · {num}` chip.

## 5. Reliable "scroll to top" on every card click

- Update `src/lib/scroll-dialog-top.ts` to run two nested RAFs with `behavior: "auto"`, so the reset happens after AnimatePresence paints the new view.
- In each detail component (`Essay`, `CaseStudy`, new `Tests` detail), add a mount `useEffect` calling `scrollDialogToTop()` so the detail owns its own reset instead of trusting the caller.
- Keep the existing open-site calls as a first-paint belt-and-braces.

## Technical notes

- No changes to `SectionDialog`, `PopoverSummaryStrip` API, routing, or timeline data.
- Styling stays within existing tokens (`sepia`, `brass`, `border`, `bg-background/85`, `font-mono-mar`, `pillButtonClasses`, `hairline`, `paper-grain`).
- Timeline rail values (`left-[0.45rem]`, dot size, `top-[2.1rem]` alignment) copied verbatim from About so the two sections line up pixel-for-pixel.

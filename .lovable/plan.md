Four small, contained changes across the popover sections.

## 1. Tests — add thumbnails to the featured strip
`src/components/portfolio/Tests.tsx`

- Import `thumb from "@/assets/thumb-disputatio.jpg"` is already there.
- In the `PopoverSummaryStrip` items mapping, pass `thumb` on each item so the featured pills show the same imagery as the grid cards below.

## 2. Blogs — archive as Work/Tests-style grid, keep "reveal more"
`src/components/portfolio/Blogs.tsx`

- Replace the current `<motion.ul>` list-row layout in the "Archivum · earlier folios" section with a 2-column grid matching Tests/SelectedWork:
  - Outer wrapper: `grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2`
  - Each entry is a `<button>` card with an aspect-16/10 thumbnail (`thumb-codex`), blueprint-grid overlay, meta row (`No.` + date), title (`font-display text-2xl md:text-3xl`), dek, tags row, and the hover sepia underline.
- Keep the `visibleRest` / `archiveCount` / `triggerReveal` state and the "Reveal N earlier folios" button underneath the grid unchanged.
- Also add `thumb` to each item in the featured `PopoverSummaryStrip` (already the case) — no change needed there.

## 3. Consistent scroll-to-top on card click across sections
The dialog body scrolls inside `SectionDialog`'s `overflow-y-auto` container, not the window, so the existing Blogs scroll logic (which used `window.scrollY` / `scrollIntoView`) sometimes lands slightly off. Fix by scrolling the dialog's scroll container to `0` right after opening.

- `src/components/portfolio/SectionDialog.tsx`: add a `ref` to the inner `overflow-y-auto` div and expose a scroll-reset via context, OR simpler: give that scroll container a stable attribute `data-dialog-scroll` so children can find it.
- Add a small helper `src/lib/scroll-dialog-top.ts` exporting `scrollDialogToTop()` that finds the nearest `[data-dialog-scroll]` ancestor of `document.activeElement` (or queries `document.querySelector('[data-dialog-scroll]')`) and sets `scrollTop = 0`.
- Call `scrollDialogToTop()` inside the `setOpenId(...)` handlers (wrapped in `requestAnimationFrame` so it runs after the detail view mounts) in:
  - `Blogs.tsx` (hero button, archive grid buttons, featured strip items — replace the current `useEffect`-based scroll)
  - `SelectedWork.tsx` (grid cards + featured strip items)
  - `Tests.tsx` (grid cards + featured strip items)

Behavior after fix: clicking any featured pill or grid card opens the detail view with the dialog body pinned to the top, regardless of prior scroll position.

## 4. Out of scope
- No content, copy, palette, or dialog chrome changes.
- No changes to the "Back to …" flow or to Blogs' scroll-to-top floating button (it keeps working against the dialog scroll container once selectors point at it — trivial follow-up if needed).

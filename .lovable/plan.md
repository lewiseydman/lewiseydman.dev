## 1. Fix PopoverSummaryStrip pill clicks

**Problem:** The pointer-capture drag logic on the scroller intercepts clicks on the inner `<button>` pills, so `onClick` never fires — that's why the pills don't navigate to the item.

**Fix:** In `src/components/portfolio/PopoverSummaryStrip.tsx`:
- Don't call `setPointerCapture` up-front. Only start "drag mode" (and capture) once movement exceeds a small threshold (~4px).
- Keep `suppressClickIfDragged` so a real drag still cancels the click.
- Result: a plain click passes through to the pill button and calls its `onClick`, while dragging still scrolls.

## 2. Opera (Selected Work) — restructure case study view

In `src/components/portfolio/SelectedWork.tsx`, inside the open-project view:

- **Move the whole Outcome + bottom row directly under the main thumbnail.** Take the existing footer block (Outcome label/value on the left, Visit live product button + tags on the right) and render it as a single row immediately after the hero `<img>` container, before any notebook content. Keep the same layout (`flex flex-wrap items-end justify-between`) and the `border-t border-border pt-6` separator so it reads as a caption strip under the image.
- **Collapse the two notebook sections into one free-form Notebook.**
  - Change the internal `Project` type: replace `study: CaseStudySection[]` and `deepDive: CaseStudySection[]` with a single `notebook: string` (paragraphs separated by `\n\n`) so each project can be as short or long as needed.
  - Migrate existing content by concatenating the current sections' bodies into one `notebook` string per project.
  - Render the notebook inside a container with `max-height` (~22rem) and a bottom fade mask when collapsed. Add a "Read more / Read less" toggle (local `useState` per open project) that removes the max-height and mask when expanded. Hide the toggle if the content is short enough not to overflow.
- Remove the old Study grid, the Deep-dive section, and the now-duplicated footer row at the bottom.

## 3. Blog post layout + back-to-top

In `src/components/portfolio/Blogs.tsx`, in the open-article view:

- **Drop the sidebar grid.** Change the article layout to a single centered column (`max-w-[68ch]`) so the body gets full width on desktop and mobile.
- **Horizontal meta bar above the body.** Above the title, render one horizontal row (Author · Published · Length · Tags) using small `font-mono-mar` labels + values separated by hairline dividers. On mobile it wraps but stays inline where possible (`flex flex-wrap gap-x-4 gap-y-2`).
- **Back button** ("Back to Codex") stays at the top-left of the article, above the meta bar.
- **Back-to-top:** remove the sidebar link. Add a floating button fixed to the bottom-right (`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40`) that appears only after the user scrolls (`useEffect` scroll listener + local `visible` state, threshold ~600px). Clicking it smooth-scrolls to the top of the article container (ref on the `<motion.article>`), not the whole page — returning to the top of the blog post the user is viewing. Uses the existing sepia-outlined pill styling with `ArrowUp`.
- Reset the visible state and scroll to the article top whenever `openId` changes so opening a new article starts at its top.

## Technical notes

- No new dependencies; all state is local `useState` / `useEffect`.
- Type changes are limited to the internal `Project` type in `SelectedWork.tsx`; no exported API changes.
- Keep the renaissance-monochrome tokens (`sepia`, `border-border`, `font-mono-mar`, `font-display`) — no new colors.

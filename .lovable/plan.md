
## Goal

Three related polish fixes across popovers:

1. Make the sticky "back" bar sit at the **actual top** of every detail view (currently the featured `PopoverSummaryStrip` is rendered above it, so back visually appears mid-page).
2. Rework the Opera (SelectedWork) detail **header block** so the meta row + title + dek stop stacking so aggressively on mobile — the hero title should land above the fold.
3. Slim the Blog (Codex) essay **meta bar** — author is always Lewis Eydman, so drop it from the primary row and consolidate published / length / tags into one compact line above the body.

Also verify #4: every card click across popovers resets scroll to the top of the dialog reliably.

## 1. Sticky back = true top of popover

The featured `PopoverSummaryStrip` is currently rendered above the `AnimatePresence` in `SelectedWork.tsx`, `Blogs.tsx`, and `Tests.tsx`, so when a detail view opens the strip sits above the sticky back header. This means the back control is not at the top of the popover on any of the three sections.

Fix: only render `PopoverSummaryStrip` on the **index** view — hide it whenever a detail is open. That makes the sticky back bar the first child of the scroll container and it truly pins to the top.

Apply in all three files:
- `src/components/portfolio/SelectedWork.tsx` — wrap `<PopoverSummaryStrip … />` in `{!open ? … : null}`.
- `src/components/portfolio/Blogs.tsx` — same treatment for the Codex strip.
- `src/components/portfolio/Tests.tsx` — same treatment for the Disputationes strip.

No changes needed to the sticky bar markup itself; it already uses the standardised pattern (`sticky top-0 z-10 -mx-5 md:-mx-14 border-b bg-background/85 backdrop-blur-md py-1.5`).

## 2. Opera detail header — mobile compaction

In `src/components/portfolio/SelectedWork.tsx` `CaseStudy`, the meta row currently stacks vertically on mobile (`flex flex-col … sm:flex-row`), then the H3 (`text-3xl`) and dek (`text-lg italic`) each take a line. On a 390px viewport this pushes the hero image well below the fold.

Rework `<header>` (around line 246):

- Meta row: collapse to a single horizontal line at every breakpoint using middle-dot separators instead of hairlines and stacking. Shape: `Opus · I · 2025 · Lead Product · Design Systems` on one line, `truncate` friendly, `font-mono-mar text-xs`.
- Title: keep `font-display` but tighten mobile sizing to `text-[1.75rem] leading-[1.05]` (was `text-3xl` = 1.875rem with default leading), and drop the top margin.
- Dek: mobile `text-base`, `sm:text-lg`, `md:text-xl` (was `text-lg → text-2xl`). Trim `pb-6 → pb-4`, section `gap-8 → gap-6` on mobile.

Net effect: the meta+title+dek fit within ~140–160px on mobile so the hero image + Outcome pill land above the fold on a 390×844 viewport.

## 3. Blog (Codex) essay meta bar — slim & horizontal

In `src/components/portfolio/Blogs.tsx` `Essay` (around line 302), the meta bar is a 2-col grid on mobile that shows Author / Published / Length / Tags in four separate labelled blocks. Since Author is always "Lewis Eydman" it doesn't earn its own block.

Replace the block-grid meta bar with a single-line meta strip above the body:

- One horizontal row: `Lewis Eydman · {post.date} · {post.read} · [tag] [tag]` using `font-mono-mar text-xs text-muted-foreground` with middle-dot separators. Tags render inline as small `TagPill`s at the end of the row.
- Wraps naturally on narrow widths (`flex flex-wrap items-center gap-x-3 gap-y-2`).
- Drop the `border-y … py-4` block; use a single `border-b border-border pb-3` under the strip.
- The `Essay · {post.date}` kicker inside the body `<header>` becomes redundant — remove it since the meta strip carries the same info.

Result: ~80–100px reclaimed above the article body on both mobile and desktop, with the title landing much closer to the fold.

## 4. Scroll-to-top on every card click — verification pass

Current state (already implemented across turns): `scrollDialogToTop()` uses double-RAF + `behavior:"auto"`; each detail component (`Essay`, `CaseStudy`, `TestDetail`) also calls it in a mount `useEffect`; each opener (`openBlog`, `openProject`, `openTest`) calls it on click; the `PopoverSummaryStrip` cards go through those same openers.

Audit-only tasks (no changes expected unless a gap is found while reading):
- Confirm the Appraisals section has no detail view that needs a reset (it's index-only — filter changes don't warrant a scroll reset).
- Confirm the ExperienceTimeline has no clickable detail view (it's a static list).
- Confirm `PopoverSummaryStrip` doesn't wrap card clicks in any handler that swallows the opener's `scrollDialogToTop()` call.

If the audit finds a gap, patch it in the same turn; otherwise no code change for §4.

## Technical notes

- No changes to `SectionDialog`, `PopoverSummaryStrip` API, routing, or data.
- Middle-dot separator: literal `·` character with `text-muted-foreground/60` for tonal separation.
- All sizing values stay inside existing tokens (`font-mono-mar`, `font-display`, `sepia`, `border`, `bg-background/85`).
- Removing the summary strip from detail views is a pure conditional-render change — no state/effect coupling to untangle.

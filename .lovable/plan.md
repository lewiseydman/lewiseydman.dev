## 1. Experience · Cursus — new timeline

Replace the current manuscript rail in `src/components/portfolio/ExperienceTimeline.tsx` with a distinctive but on-brand timeline that reads clearly at every breakpoint.

**Delete first**

- Remove the "Actions ·" text (the fifth selected element — label span).

**New layout — "codex ledger"**

- Keep the existing intro `p` (`"My chronology of eight working years."`).
- Replace the rail with a **two-column ledger** that reuses existing tokens (`border`, `sepia`, `brass`, `font-mono-mar`, `font-display`):

```text
┌──────────────────────────────────────────────────────────┐
│ Cursus · 01                          Apr 2025 — Now      │
│ ────────────────────────────────────────────────────────  │
│ Communications Manager                                    │
│ 100Green · UK                        (italic sepia)      │
│                                                           │
│ Own the energy quote journey end-to-end…                 │
└──────────────────────────────────────────────────────────┘
```

- Desktop / tablet: a single vertical column of full-width "folio rows" separated by hairline borders (no dots, no rail). Each row has a top meta line (`Cursus · NN` left, date range right, connected by a hairline `hairline` divider), a large `font-display` role title, an italic sepia org line, and a prose note.
- Hover: brass underline sweep on the role title (reuse the `h-px w-0 → group-hover:w-full` pattern from `Appraisals.tsx`), meta text tints to brass.
- Mobile (`<sm`): meta line stacks (numeral on top, date on next line, right-aligned), role title drops to `text-2xl`, note stays full width. No horizontal scroll, no cramped 9rem date column.
- Motion: keep the existing `whileInView` fade/slide with a small stagger.
- Keep the existing **Education · Studia** footer grid unchanged (already standardised).

**Why this works**

- Removes the awkward mobile grid (`md:grid-cols-[9rem_1fr]`) that currently truncates on tablet.
- Reuses the Appraisals card language so Cursus and Laudes read as siblings without duplicating them.
- Numbered `Cursus · NN` matches Folio / Laus / Disputatio numbering used sitewide.

## 2. Disputationes (Tests) — bento gallery rebuild

Rebuild `src/components/portfolio/Tests.tsx` using the video as the layout & interaction reference, adapted to the site's parchment/sepia palette (no black canvas).

**Header**

- Kicker `Folder · Disputationes`, then a one-line dek: *"Visual explorations and interface studies."* (mirrors the video's `FOLDER / Shots / Visual explorations…`).
- Remove the current `PopoverSummaryStrip` featured row — the bento is the browse surface.

**Bento grid (index view)**

- Asymmetric CSS grid, no repeated `FolioCard` list. Layout:
  - Mobile: single column, image-forward tiles.
  - `sm`: 2 columns, mixed row spans.
  - `lg`: 3 columns with a `grid-auto-rows` base and per-tile `col-span-*` / `row-span-*` to create the video's asymmetric rhythm (e.g. tall left, tall right, two shorter middle).
- Each tile:
  - Full-bleed thumbnail (reuse `@/assets/thumb-disputatio.jpg` for now; each entry keeps its own `thumb` field so future tiles can differ).
  - Subtle rounded border (`rounded-sm border border-border`), `paper-grain` overlay for texture, hover: gentle scale + brass ring.
  - Corner meta only: numeral (`I`, `II`, …) top-left, domain top-right in `font-mono-mar`. Title appears on hover as a bottom-anchored caption band that slides up — keeps the grid quiet like the reference.
- Layout `motion` for smooth reflow between index and detail.

**Detail view (click a tile)**

- Replace the current stacked detail with a **focused viewer** matching the video: the selected tile expands to a large hero image centred in the dialog body, with the rest of the grid faded and pushed behind (no route change, same dialog).
- Layout inside the detail:
  - Sticky `DialogSubHeader` (already exists) with `Back to Disputationes`.
  - Large hero image (`aspect-[16/10]` on desktop, `aspect-[4/5]` on mobile) with the same paper-grain + blueprint overlay currently used.
  - Below the image: `font-mono-mar` domain line, `font-display` title, italic sepia summary, prose detail — kept tight, no extra chrome.
- Use `layoutId={test.id}` on the tile image + hero image so Framer Motion animates the expansion (the "click a card → it grows into place" moment from the video).
- Keep `scrollDialogToTop()` on open/close so the popover always resets.

**Data**

- Keep the four existing entries. No new copy required.

## Technical notes

- Files touched: `src/components/portfolio/ExperienceTimeline.tsx`, `src/components/portfolio/Tests.tsx`.
- No new deps. Reuses `framer-motion`, existing tokens (`sepia`, `brass`, `parchment`, `hairline`, `paper-grain`, `blueprint-grid-fine`), and existing primitives (`DialogSubHeader`, `SectionLabel`, `scrollDialogToTop`).
- No changes to `SectionDialog`, routing, or other popovers.
- Verify: build passes, `#cursus` and Disputationes deep links still open, keyboard focus reaches every tile, mobile has no horizontal overflow.
## Appraisals + Tests refinements

### 1. `src/components/portfolio/Appraisals.tsx` — 8 more entries
Extend `testimonials` from 4 to 12 items in the same tone. Mix of `Colleague`, `Client`, and `Built for` so the existing filter chips have meaningful populations. Data only — no layout or styling changes.

### 2. `src/components/portfolio/Tests.tsx` — quiet masonry, hover-only
Strip the tile chrome and lightbox to match the reference videos: pure images that gently expand on hover.

- Remove numeral pill, hover caption gradient, and the entire lightbox block (`AnimatePresence`, `X` / `ChevronLeft` / `ChevronRight` imports, `openId` state, `step` / `close` handlers, keyboard listener).
- Drop numerals, domain, on-tile title, and summary rendering. Keep `title` in the data only as image `alt` text.
- Tile becomes a non-interactive `motion.div` wrapping the image with `whileHover={{ scale: 1.03 }}`, soft shadow lift, `duration: 0.4, easeOut`, `overflow-hidden rounded-sm`, and the existing `paper-grain` overlay for texture. Preserve each entry's `aspect` so the masonry still staggers.
- Responsive columns: `columns-1` mobile, `md:columns-2`, `lg:columns-3`, `xl:columns-4`. Gaps stay `gap-3 md:gap-4` with `mb-3 md:mb-4`.
- Keep the section dek unchanged.

### 3. Per-tile art wiring (no images generated)
Give each of the 20 entries its own `thumb` slot so real art can be dropped in later without further code changes.

- Keep the existing `thumb` field on each `Test` and default all 20 to the current shared `@/assets/thumb-disputatio.jpg` import for now, so the section keeps rendering.
- Add a per-entry `import` line at the top of `Tests.tsx` for each test id (commented placeholder pointing at `@/assets/tests/<id>.jpg`), so replacing a placeholder is a one-line change: drop the file into `src/assets/tests/`, uncomment the import, and swap the entry's `thumb`.
- Add a short README-style comment block at the top of the file explaining the drop-in flow (path convention, recommended aspect per entry from the existing `aspect` field, and a note that large binaries should be uploaded via `lovable-assets` and referenced by `.asset.json` pointer rather than committed as raw files).
- No new folder is created yet and no images are generated — the file is only prepared to accept them.

### Out of scope
- No new dependencies, no changes to `SectionDialog`, routing, or other sections.

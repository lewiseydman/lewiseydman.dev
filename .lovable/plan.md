## Disputationes — masonry lightbox rebuild

Rework `src/components/portfolio/Tests.tsx` into a Pinterest-style masonry gallery with a lightbox viewer, matching the reference video's simplicity.

### Layout — masonry grid

- Replace the current fixed-row asymmetric grid with a **CSS columns masonry**:
  - Mobile: `columns-2`
  - `sm`: `columns-3`
  - `lg`: `columns-4`
  - Gap via `gap-3 md:gap-4`, each tile `break-inside-avoid mb-3 md:mb-4`
- Each tile:
  - Full-bleed thumbnail with its own natural aspect ratio (varied per entry: 3/4, 4/5, 1/1, 4/3, 3/2, 2/3, 9/16) so the masonry actually staggers.
  - Rounded `rounded-sm border border-border`, `paper-grain` overlay, hover: subtle scale + brass border + bottom caption band that fades in with the title.
  - Corner numeral (`I`–`XX`) top-left only. Domain removed from the tile face — it lives in the lightbox — to keep the grid quiet like the video.
- Numerals: extend `src/lib/roman.ts` usage or inline a small `1..20 → I..XX` map.

### Interaction — lightbox (no detail page)

- Clicking a tile opens a **lightbox overlay inside the same SectionDialog body**, not a routed detail view. No `DialogSubHeader`, no back button chrome.
- Lightbox structure:
  - Fixed overlay covering the dialog body: `absolute inset-0 z-20 bg-ink/85 backdrop-blur-sm`, animated via `AnimatePresence` (fade + subtle zoom).
  - Centred hero image, `max-h-[85%] max-w-[92%] object-contain`, animated with `layoutId={test.id}` from the tile so it grows into place (the video's core interaction).
  - Small caption strip under the image: numeral · domain · title in `font-mono-mar` / `font-display italic sepia`. One line, no prose.
  - Close affordances: top-right `X` button (reuse the tactile brass close pattern), click on backdrop, and `Escape` key.
  - Prev / Next arrows (left/right edges) + `←` / `→` keys to cycle through all 20. Wraps around.
- Remove `TestDetail`, `DialogSubHeader` import, and per-test `detail` prose field.

### Data — 20 entries

Expand `tests` to 20 items covering plausible design/eng experiments (interface studies, motion, typography, dashboards, iconography, colour, print, data-vis, etc.). Each entry keeps `id`, `num` (roman I–XX), `title`, `domain`, `summary` (used only as the lightbox caption's short line), and a new `aspect` field driving the tile ratio. All 20 reuse `@/assets/thumb-disputatio.jpg` for now — the field stays per-tile so real thumbnails can drop in later.

### Header

- Keep the current one-line dek: *"Visual explorations and design studies."*
- Featured strip (`PopoverSummaryStrip`) is already hidden for Tests per the earlier refactor — no change.

### Technical notes

- File touched: `src/components/portfolio/Tests.tsx` only.
- No new deps. Uses existing `framer-motion`, tokens (`sepia`, `brass`, `parchment`, `ink`, `paper-grain`), and the same thumb asset.
- Masonry via CSS `columns-*` + `break-inside-avoid` — no JS layout library, works down to 320px.
- Keyboard: `Esc` closes, `←`/`→` navigate; focus trapped inside overlay while open; tile buttons remain in tab order when closed.
- Verify: build passes, deep link `#disputationes` still opens the section, no horizontal overflow on mobile, lightbox `layoutId` animation runs at 60fps on mid-range mobile.

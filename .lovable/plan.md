## Tests — restore click-to-enlarge (quiet lightbox)

Bring back the click-to-expand behaviour from the reference video without re-introducing the chrome we stripped (no numerals, no captions, no domain, no prev/next arrows).

### `src/components/portfolio/Tests.tsx`

- Wrap each tile in a `motion.button` again (keyboard-focusable, `aria-label={title}`) instead of the current non-interactive `motion.div`. Hover behaviour (scale, shadow lift, `paper-grain` overlay) stays exactly as it is.
- Re-add `layoutId={\`disputatio-${id}\`}` on the tile and `layoutId={\`disputatio-thumb-${id}\`}` on the `<img>`, so Framer Motion smoothly grows the clicked tile into the enlarged view.
- Add local `openId` state + `close()` handler and an `Escape` key listener. No prev/next navigation — the video shows a single expand/collapse, not a carousel.
- Render an `AnimatePresence` overlay when `openId` is set:
  - Fixed, full-viewport, `z-[60]`, `bg-ink/85 backdrop-blur-sm`, fades in/out.
  - Click on the backdrop closes.
  - Inside: a `motion.div` with the matching `layoutId` containing just the `motion.img` (matching `layoutId`), sized `max-h-[88vh] max-w-[92vw] object-contain`, `rounded-sm border border-parchment/20`. No caption strip, no title bar, no close button chrome — the backdrop click and `Esc` are the only affordances, matching the video's minimalism.
- Keep the responsive `columns-1 md:columns-2 lg:columns-3 xl:columns-4` grid, per-tile `aspect`, and all 20 entries as-is. Per-tile `thumb` slots and the drop-in art comments stay.

### Out of scope
- No new dependencies. No changes to other sections. No re-introduction of numerals, captions, or arrow navigation.

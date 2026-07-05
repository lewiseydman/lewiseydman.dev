## Overview

Round of polish across all six sections, with **Opera** and **Codex** as priorities. Focus: mobile/desktop usability, shared primitives, SEO + a11y architecture, rendering perf, small bug fixes. Additions from review are marked **[+]**.

## Priority — Opera (Selected Work)

**Mobile UI**
- Sticky "Back to Opera" header inside the dialog scroll container with project title + numeral chip on the right. **[+]** Respect `prefers-reduced-motion` for its slide-in.
- `Read more/less` and `Visit live product`: `py-2.5` + `min-h-11`.
- Meta row `Opus · N · Year · Role`: stacked two-line on `<sm`, inline row + hairlines on `sm+`.
- Case-study caption strip: mobile-first grid — Outcome / CTA / tags on three rows; single row on `sm+`.

**Notebook interaction**
- Replace pixel-height JS animation with `grid-template-rows: 0fr → 1fr` + inner `min-h-0 overflow-hidden`. **[+]** Add a `max-h` fallback for Safari <16 (grid-rows animation only works from 16+); gate the animation with `@supports (grid-template-rows: 0fr)` so old Safari collapses instantly with no jank.
- **[+]** Respect `prefers-reduced-motion` — snap open/closed instead of animating.

**Cards + a11y**
- Per-project optional `thumb`; fall back to default.
- Required `alt` string prop on the primitive; decorative uses `alt=""` explicitly.
- Tighten card structure: numeral corner tag + title + role inline, blurb, outcome/tags at the bottom.

**Deep linking + focus** (see sitewide URL section below)
- **[+]** Radix Dialog already provides focus trap, Escape close, and focus restore to the trigger. **Do not rebuild these** — just make sure the trigger element is the card that opened the case study (add a small `useRef` per card and re-focus on close if Radix's restore misses it).

## Priority — Codex (Blogs)

**Mobile**
- Meta bar: 2-col grid on mobile with Tags spanning both columns; keep flex row on `sm+`.
- Hero semantics: outer `<article aria-labelledby={id}>`, `<h2 id={id}>` outside the button, a single clearly-labelled `Read essay` CTA button, plus a click handler on the article for pointer users (with `role="link"` + `tabIndex={-1}` avoided — the button is the accessible affordance).
- Archive pill: hide `· N remaining` on `<sm`.

**Reading**
- **[+]** Sequential heading hierarchy: the dialog `<h2>` is the section title (`Opera · Selected Work`). An open essay should use `<h3>` for its title and `<h4>` for any subheads — not `<h1>`. Same rule applies to Opera case studies. This is a real regression risk since both files currently render `<h2>`/`<h1>` inside the dialog.
- Pull-quote only if `body.length >= 6` and index sits mid-post.

## Sitewide — URL deep linking (unified)

- **[+]** Section-level state already lives in `window.location.hash` (`#vita`, `#opera`, etc.). Nested state (open case study / essay) must not fight this. Two options:
  - **A (chosen):** Extend hash to `#opera/helios`, `#codex/draftsman`. Simple, no TanStack search-param schema needed, keeps existing hashchange listener.
  - B: Move to TanStack `validateSearch` (`?section=opera&case=helios`). More work; only worth it if we want real SEO on nested items.
- Pick A now, ship real per-item routes later if the essays/case studies become their own indexable pages.
- **[+]** SEO caveat: hash fragments are not indexable. If Opera case studies and Codex essays are meant to appear in search results, they need real routes with per-route `head()` metadata. Flag this as a follow-up, not part of this pass.

## Sitewide standardization

New primitives in `src/components/portfolio/primitives/`:
- `FolioCard` — `thumb`, `alt` (required), `kicker`, `right`, `title`, `body`, `footer`, `onClick`.
- `TagPill`.
- `BackToIndexButton`.
- `SectionKicker` — `[label] · hairline · [count]`.
- `ReadingProgressBar` — bound to `[data-dialog-scroll]`, sepia gradient, hidden if `prefers-reduced-motion` (bar itself is fine, but skip the transition on width).

Refactor Opera / Codex / Tests / Appraisals / About to use them.

## Custom hooks

- `useIntersectionPause(ref)` — returns `paused: boolean`.
- `useThrottledScroll(ref, cb)` — rAF-throttled scroll subscription for progress + back-to-top.
- **[+]** `useSectionHash()` — parses `section/item` hash, exposes `{ section, item, open(), close() }`. Used by `VitruvianStage`, Opera, and Codex to keep hash logic in one place.

## Perf

- Pause `<VitruvianScene>` via `useIntersectionPause` on the stage wrapper (already paused when a dialog is open).
- Trim `VitruvianStage`'s decorative SVG: keep the outer dashed ring, drop the inner sepia ring. Slow the outer ring rotation and add `will-change: transform`.
- Card grids: `whileInView` + `viewport={{ once: true }}` so re-opening a section doesn't re-animate the whole grid.
- Bundled thumbs → WebP via `vite-imagetools`; emit `srcset` for 1x/2x; `decoding="async"` + `loading="lazy"` sitewide.
- Blogs scroll listener: rAF-throttled, `{ passive: true }`.
- **[+]** Verify with Playwright at 375×812, 768×1024, and 1440×900 after the refactor; capture a screenshot of Opera and Codex in each view.

## Small bugs

- About: `dedicatiom` → `dedication`.
- Codex: `articleRef` — remove, Radix already handles focus.
- Dialog body padding: `px-5 py-8` on `<sm`, `md:px-14 md:py-16`.
- Heading scale: `text-2xl` on `<sm` where the current `text-4xl`/`text-5xl` breaks the meta row.
- **[+]** Contrast QA on `text-muted-foreground` over `bg-card/40` and `hairline` dividers — check both light and dark themes at WCAG AA (4.5:1 for text, 3:1 for non-text). Fix by nudging `--muted-foreground` toward `--foreground` in `styles.css` if needed rather than patching per-component classes.
- **[+]** Dark-mode QA on new primitives — `mix-blend-multiply` / `mix-blend-screen` pairs are easy to break during refactor.

## Deliverable order

1. Bugs + typo + hook scaffolding (`useIntersectionPause`, `useThrottledScroll`, `useSectionHash`).
2. Primitives + refactor of Opera, Codex, Tests, Appraisals, About.
3. Opera polish — sticky back header, meta grid, grid-rows notebook, hash deep link.
4. Codex polish — meta grid, hero semantics, reading progress, pull-quote heuristic, heading hierarchy, hash deep link.
5. Perf pass — Canvas pause, SVG trim, imagetools + srcset, whileInView.
6. Playwright screenshots at 3 widths; contrast + dark-mode QA.

## What I intentionally left out

- Rebuilding focus trap / Escape / focus restore — Radix already does these.
- TanStack `validateSearch` for nested state — hash extension is simpler and matches current code.
- Real routes for case studies / essays — needed for indexable SEO, but a bigger scope; call out as follow-up.
- Analytics event hooks — not requested.

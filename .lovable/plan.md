
## Goal

Restructure the fold so the Vitruvian man becomes the visual center of the page. The Lewis Eydman intro shrinks to a compact, centered block tucked inside/under the figure, and five renaissance-themed labels extend from the surrounding circle on futuristic leader lines. Clicking any label opens that section's content in a popover/dialog — no separate routes. Add a small icon strip at the bottom. Keep the existing parchment + sepia + blueprint palette unchanged.

## Hero recomposition

- Vitruvian man centered on the viewport, scaled up (~70vmin), with the existing slow-rotating outer rings preserved.
- Optional Three.js layer behind the figure: a subtle wireframe sphere / particle ring rendered with `@react-three/fiber` + `drei`, tinted in the existing `--blueprint` token. Falls back gracefully (and respects `prefers-reduced-motion`).
- The "Lewis Eydman" block shrinks into a small centered card directly beneath the figure: monogram `L·E`, name in display serif (smaller, ~text-2xl), one-line tagline, and the `Folio I · Anno MMXXVI` marginalia. The "View the codex" CTA is removed (navigation now happens via the orbit labels).
- Remove the top nav pill — the orbit labels replace it. Keep the corner crosshairs and scroll hint.

## Orbit labels (the navigation)

Five labels positioned around the figure at fixed angles (e.g. 300°, 340°, 20°, 60°, 100°). Each label is:

- A thin animated SVG leader line that draws outward from the inner circle to a small node, then a short horizontal tail to the text.
- Renaissance-themed names with the original meaning in small monospace marginalia underneath, so users never have to guess:

```text
About     → Vita          (sub: About)
Work      → Opera         (sub: Work)
Experience→ Cursus        (sub: Experience)
Writings  → Codex         (sub: Writings)
Tests     → Disputatio    (sub: Tests)
```

- Hover: the leader line extends slightly, the node fills with `--blueprint`, the label gains an underline-draw, and a faint `→ open` hint fades in. Cursor becomes pointer. Subtle haptic-feeling spring via framer-motion.
- Click: opens a centered popover (shadcn `Dialog`) with that section's content. ESC + backdrop close it. URL hash updates (`#opera`, `#vita` …) so links remain shareable and deep-linkable without a route change.

## Popover content

Each dialog reuses the existing section component (`About`, `SelectedWork`, `ExperienceTimeline`, `WritingsAppraisals`, plus a new `Tests` section) rendered inside a scrollable, parchment-textured dialog with the blueprint grid backdrop and a hairline header showing the Roman numeral + Latin title + English subtitle. `Tests` replaces `Contact` and will hold placeholder entries for assessments / case studies (e.g. "Disputatio I — Product Sense", placeholder copy).

The standalone page sections below the hero are removed from the route; their components are reused only inside dialogs. The `Contact` component is removed from the page flow (correspondence links move to the footer icon row).

## Footer icon strip

A small horizontal row of monoline icons centered at the bottom of the viewport (matching the uploaded screenshot): Email, LinkedIn, Resume/Document, GitHub, "Buy me a coffee". Uses `lucide-react` (`Mail`, `Linkedin`, `FileText`, `Github`, `Coffee`) at ~18px, sepia stroke, hover lifts to ink color with a hairline underline. Each is a real link (`mailto:`, placeholder URLs the user can fill in later).

## Motion & palette guardrails

- No new colors. Everything continues to draw from `--parchment`, `--ink`, `--sepia`, `--blueprint`, `--brass`.
- Motion intensity stays at the user's chosen 3/5: line-draw on mount, gentle label fade-in stagger, spring on hover, smooth dialog scale-in.
- Honor `useReducedMotion` everywhere (skip Three.js animation loop, skip line-draw, fall back to instant fades).

## Technical details

- Add deps: `three`, `@react-three/fiber`, `@react-three/drei` (Three.js scene lazy-loaded with `React.lazy` + `Suspense` so the parchment hero paints first).
- New components in `src/components/portfolio/`:
  - `VitruvianStage.tsx` — wraps the image, the rotating rings, the Three.js canvas, and the orbit labels.
  - `OrbitLabel.tsx` — SVG leader line + node + label, with hover animation, accepts `angle`, `latin`, `english`, `onOpen`.
  - `SectionDialog.tsx` — shadcn `Dialog` styled with parchment + blueprint grid + hairline header.
  - `FooterIcons.tsx` — the icon strip.
  - `Tests.tsx` — placeholder content for the new Disputatio section.
- Update `src/routes/index.tsx`: render `<VitruvianStage />` + compact name card + `<FooterIcons />` only. Remove `Nav`, in-page section stack, and `Contact` from the page. Keep SEO metadata as is.
- A single hero-level state (`activeSection: 'vita' | 'opera' | 'cursus' | 'codex' | 'disputatio' | null`) drives the dialog and is synced with `location.hash` via a small effect so deep links work.
- Mobile: labels collapse from radial to a vertical list of buttons under the figure (same Latin + English styling), preserving popover behavior.

## Out of scope

- No new routes, no payments, no backend.
- No content rewrites inside the existing About / Work / Experience / Writings sections beyond moving them into dialogs.
- Real social URLs — placeholders only; user can swap them in later.

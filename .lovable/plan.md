# Lewis Eydman — Da Vinci Portfolio

A single-page portfolio with anchored sections, built on the existing TanStack Start + shadcn stack. Aesthetic: Leonardo's notebook reinterpreted with Swiss-modern restraint — parchment background, sepia ink, a single blueprint-cyan accent, hairline grids, and ink-draw SVG animations.

## Design system

- **Palette** (tokens in `src/styles.css`):
  - `--background` parchment off-white `oklch(0.97 0.012 85)`
  - `--foreground` deep ink `oklch(0.22 0.02 60)` (warm near-black)
  - `--muted` sepia `oklch(0.55 0.04 65)`
  - `--accent` blueprint cyan `oklch(0.55 0.12 230)`
  - `--secondary` oxidized brass `oklch(0.65 0.08 75)`
  - Dark mode: deep indigo blueprint background with cyan grid + ivory ink.
- **Typography** (via `@fontsource`):
  - Display serif: **Cormorant Garamond** (hero, section titles)
  - Body sans: **Inter Tight** (paragraphs, UI)
  - Mono accent: **JetBrains Mono** for marginalia/dates
- **Texture**: subtle SVG blueprint grid + paper-grain overlay as CSS background utility.

## Sections (single page, anchored nav)

1. **Hero** — Large name "Lewis Eydman" in display serif, tagline "Bridging UX/UI Design & Full-Stack Development", a hand-drawn Vitruvian-style SVG that ink-draws on load, hairline crosshair guides, scroll hint.
2. **About** — Two-column folio layout: portrait-as-sketch image left, bio + skills (Design / Code / Product) right with mirror-script Latin marginalia.
3. **Selected Work** — 4 project cards on a faint blueprint grid; each card has a sketch icon, title, role, outcome metric, hover lift + grid-line extension animation.
4. **Experience Timeline** — Vertical mechanical-schematic timeline with hairline leaders connecting dates (mono) to role descriptions; nodes are small gear/cog SVGs that rotate subtly on view.
5. **Blogs + Appraisals** — Two-column list: "Writings" (essays) and "Appraisals" (short critique notes), each entry with date, title, one-line excerpt.
6. **Contact** — Centered folio card with email, social links (GitHub, LinkedIn, Read.cv, X), signed off with a stylized "L.E." monogram.

Top nav is a slim floating bar with section anchors; footer carries a notebook-folio page number + copyright.

## Animations (motion level 3/5, via Framer Motion)

- SVG `pathLength` ink-draw on the Vitruvian hero and section dividers as they enter the viewport.
- Section titles fade + underline sweep.
- Project cards: hover lift (translateY -4px) + accent grid line extension.
- Timeline nodes: scale-in on scroll, gentle continuous rotation on gear icons.
- Reduced-motion respected via `prefers-reduced-motion`.

## Images (generated)

- Vitruvian-style hero line illustration (sepia ink on parchment, transparent PNG)
- Portrait-as-sketch placeholder
- 4 small sketch icons for project cards (gear, wing, lens, compass)

## Technical plan

- Install: `bun add framer-motion @fontsource/cormorant-garamond @fontsource/inter-tight @fontsource/jetbrains-mono lucide-react` (lucide likely already present).
- Update `src/styles.css`: import fontsource packages at top, redefine color tokens (light + dark), add `--font-display`/`--font-sans`/`--font-mono` in `@theme inline`, add `@utility blueprint-grid` and `@utility paper-grain` background utilities.
- Replace `src/routes/index.tsx` placeholder with full portfolio page; update its `head()` with real title, description, OG tags.
- Create components under `src/components/portfolio/`:
  - `Nav.tsx`, `Hero.tsx`, `About.tsx`, `SelectedWork.tsx`, `ExperienceTimeline.tsx`, `WritingsAppraisals.tsx`, `Contact.tsx`, `Footer.tsx`
  - `VitruvianSketch.tsx` (animated SVG)
  - `BlueprintGrid.tsx` (decorative background)
  - `InkDraw.tsx` (reusable Framer Motion SVG wrapper)
- Generate hero illustration + portrait sketch + 4 card icons via image generation, save under `src/assets/`.

## What I'm NOT doing

- No backend / Lovable Cloud (static portfolio).
- No CMS — content lives in typed arrays inside each section component, easy to edit later.
- No separate routes per section (single-page anchored nav fits the brief); shareable URLs for case studies can be added later if you want.

## Goal

Make the three.js sphere read as design + code by placing ~12 semantic tokens (words, symbols, glyphs) on the outer shell vertices — the "Constellation" concept — while keeping the current wireframe as the backdrop.

## Changes

Only `src/components/portfolio/VitruvianScene.tsx` is touched. No other files, no new deps (`@react-three/drei` is already installed).

### 1. Token set

Curated 12-token list mixing design vocabulary, code vocabulary, and symbols so the metaphor reads both ways:

```
grid   flex   token   hue
type   axiom  scale   ratio
{ }    </>    λ       ∅
```

Kept short (≤6 chars) so labels stay legible at small sizes.

### 2. Placement

Distribute the 12 tokens roughly evenly on a sphere of radius ~1.9 using a Fibonacci lattice (deterministic, visually even, no clumping). Each token is a `<Html>` element from `@react-three/drei` positioned at its 3D point, with:

- `center` prop so the label anchors on the vertex
- `distanceFactor` for gentle perspective scaling
- `occlude` set against the inner sphere so tokens on the back face fade behind the wireframe

### 3. Styling

Tokens rendered as small DOM spans styled to match the manuscript palette:

- `font-mono` (already in the theme), `text-[0.55rem]` / `text-[0.6rem]`
- `text-sepia/70` with `mix-blend-multiply` in light and inverted blend in dark, mirroring the Vitruvian image treatment
- `pointer-events-none` so they don't interfere with the labels/dialog triggers
- `whitespace-nowrap` and `tracking-wide`

### 4. Motion

Tokens live inside the existing `inner` group, so they rotate with the sphere at the current speed. No new animation loops. Reduced-motion path unchanged (scene not mounted at all).

### 5. Preserving the existing look

- Outer icosahedron, inner detailed sphere, and both equatorial rings all stay.
- Only addition is the `<Html>` token cluster inside the `inner` group.
- Opacity of tokens tuned so the wireframe still reads as the primary form.

## Out of scope

- No changes to `VitruvianStage.tsx`, labels, dialogs, or mobile nav.
- No new geometry, shaders, or post-processing.
- No responsive rework beyond what the existing scene already does.

## Verification

After the edit: load `/`, confirm tokens appear orbiting the Vitruvian, are legible in both light and dark, don't block clicks on the orbit labels, and disappear entirely under `prefers-reduced-motion` (scene is already gated).

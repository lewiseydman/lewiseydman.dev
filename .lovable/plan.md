## Goal

Make the wireframe shell a bit bigger around the figure, simplify it further, and make line weight scale down on smaller screens — while confirming it never clips the stage frame at any viewport or orientation.

## Verification — frame fit

The stage is a fixed square (`aspect-square w-[min(78vh,88vw)] max-w-[820px]`) so the Canvas is always 1:1 regardless of viewport. With `fov=45` and `camera.z=5.5`, the visible half-extent at the origin is `5.5 * tan(22.5°) ≈ 2.28`. A shell of radius ~1.55 occupies ~68% of the frame with ~0.7 unit margin on every side, so it fits at every viewport size and both orientations (portrait/landscape). No clipping risk.

## Changes

**File: `src/components/portfolio/VitruvianScene.tsx`**

1. **Grow the shell around the man** — bump the icosahedron radius from `1.35` to `1.55` (and the equatorial ring to match). Still comfortably inside the frame per the math above.
2. **Simplify further** — drop the equatorial torus ring entirely. Keep a single low-poly icosahedron (`detail=1`, 20 faces) as the sole shape. Only one rotating group remains.
3. **Responsive line weight** — replace the wireframe material with `LineSegments` built from `EdgesGeometry` + `LineBasicMaterial`, so stroke width is controlled by GL line width and, more reliably, by opacity + a viewport-aware scale factor. Pass a `thin` prop (or read `window.innerWidth` via a small resize listener inside the component) that lowers material opacity on narrow screens:
   - `>= 1024px`: opacity `0.09`
   - `640–1023px`: opacity `0.06`
   - `< 640px`: opacity `0.04`
   This visually reads as thinner/lighter lines on smaller screens without needing GPU line-width support (which most browsers cap at 1px anyway).
4. **Preserve behavior** — slow rotation, sepia color (`#3a2a1f`), `paused` prop, and reduced-motion handling all stay unchanged.

## Result

One sparse polyhedron, slightly larger around the Vitruvian figure, with lines that visibly lighten as the viewport narrows. Guaranteed to stay inside the square stage at every viewport and orientation.

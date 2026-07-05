## Goal

Simplify the wireframe sphere behind the Vitruvian figure so fewer lines cross the body, and shrink it so the shape stays fully inside the stage frame (no clipping at the edges).

## Changes

**File: `src/components/portfolio/VitruvianScene.tsx`**

1. **Reduce geometry density** — the inner icosahedron uses detail level `3` (320 faces = hundreds of wireframe edges). Drop to level `1` (20 faces) for a clean, sparse polyhedron silhouette. Remove the second high-detail inner sphere entirely so only one wireframe shell remains.
2. **Shrink the sphere** — current radii (`2.0` outer, `1.65` inner) extend past the visible frame at the current camera distance, causing clipping on the sides. Reduce to a single shell around `1.35` and/or pull the camera back from `z=4.5` to `z=5.5` so the whole polyhedron fits comfortably inside the square stage with margin.
3. **Keep it subtle** — retain one faint equatorial ring for the "orbit" feel, drop the second ring to reduce line crossings over the torso.
4. **Preserve behavior** — slow rotation, sepia color, reduced-motion pause, and `paused` prop all stay unchanged.

## Result

A single, sparse, slowly rotating polyhedron that reads as an orbiting shell — visible around the figure's edges but no longer criss-crossing the body, and fully contained within the stage frame at all viewport sizes.

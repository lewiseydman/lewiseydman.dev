## Shared expand-with-loading pattern

Both buttons ("Reveal earlier folios" in Codex, "Read more" in Opera) will use one shared hook and one shared animation approach, so the interaction feels identical sitewide.

### 1. Shared hook: `useExpandWithLoading`
**New file:** `src/hooks/use-expand-with-loading.ts`

- Exports a hook `useExpandWithLoading(delay = 400)` returning `{ isLoading, trigger }`.
- `trigger(action)` sets `isLoading = true`, waits `delay` ms, runs `action()`, then clears `isLoading`.
- Cleans up its timeout on unmount.

This is the single source of truth for the "click → brief spinner → expand" feel across the site.

### 2. Shared button treatment
Both buttons already share the same visual (rounded-full pill, `border-border`, `text-sepia`, `font-mono-mar`). We keep that, and standardise:

- Icon: `Loader2` from `lucide-react` with `animate-spin` while `isLoading`; otherwise the button's normal icon (`Plus` in Codex, `ChevronDown` / `ChevronUp` in Opera).
- Disabled state while loading (`disabled={isLoading}` + `disabled:opacity-70 disabled:cursor-wait`).
- Label stays the same; only the leading icon swaps.

### 3. Shared smooth expansion
Both places grow a container. We use the same Framer Motion primitive in both:

- Wrap the expanding content in `<motion.div layout />` inside an `AnimatePresence` where needed, or animate `height: "auto"` via `animate={{ height: isExpanded ? "auto" : COLLAPSED_PX }}` with `transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}` and `overflow-hidden`.
- Framer Motion is already a dependency in both files, so no new packages.

### 4. Apply in Codex
**File:** `src/components/portfolio/Blogs.tsx`
- Import the hook and `Loader2`.
- Replace the direct `setArchiveCount` call with `trigger(() => setArchiveCount(c => Math.min(c + 3, rest.length)))`.
- Swap the `Plus` icon for `Loader2 animate-spin` when `isLoading`.
- Wrap the `<ul>` archive list in a `motion.div` with `layout` so the section height animates smoothly as rows appear.

### 5. Apply in Opera
**File:** `src/components/portfolio/SelectedWork.tsx`
- Import the hook and `Loader2`.
- Replace the direct `setNotebookExpanded` toggle with `trigger(() => setNotebookExpanded(v => !v))`.
- Swap the `ChevronDown` / `ChevronUp` icon for `Loader2 animate-spin` while `isLoading`.
- Replace the inline `style={{ maxHeight, overflow }}` on the notebook container with a `motion.div` animating `height` between the collapsed cap (measured in px from `notebookRef`) and the full `scrollHeight`, with the same transition config as Codex.

### Technical notes
- No new npm dependencies.
- No exported API changes; all state remains local to each component, plus the new shared hook.
- Renaissance-monochrome tokens (`sepia`, `border-border`, `font-mono-mar`) unchanged.
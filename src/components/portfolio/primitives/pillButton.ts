import { cn } from "@/lib/utils";

/**
 * Standardised pill-button styling used across the portfolio.
 *
 * Variants (parallel to shadcn conventions, restyled for the manuscript
 * palette):
 * - `primary`   — filled sepia CTA. Highest emphasis (single per view).
 * - `secondary` — filled muted card surface. Medium emphasis.
 * - `outline`   — sepia-outlined that fills on hover. Default CTA scale.
 * - `ghost`     — quiet border-only control. Secondary actions.
 * - `danger`    — destructive intent; identical shape.
 *
 * Sizes: `sm` (36px), `md` (44px, default touch target), `lg` (52px).
 * All variants share the same interaction states: `hover` lift, `active`
 * settle, `focus-visible` ring with background offset, `disabled` dim.
 */
export type PillVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type PillSize = "sm" | "md" | "lg";

const base =
  "font-mono-mar group inline-flex items-center justify-center gap-2 rounded-full border transition-[color,background-color,border-color,transform,box-shadow,opacity] duration-200 ease-out will-change-transform hover:-translate-y-px active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sepia/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60";

const sizes: Record<PillSize, string> = {
  lg: "min-h-[3.25rem] px-6 py-3 text-sm leading-none",
  md: "min-h-11 px-5 py-2.5 text-sm leading-none",
  sm: "min-h-9 px-3.5 py-2 text-xs leading-none",
};

const variants: Record<PillVariant, string> = {
  // The site's hero CTA — sepia outline that fills to sepia on hover. Kept as
  // `primary` so every existing call site continues to render correctly.
  primary:
    "border border-sepia/60 bg-background text-sepia hover:border-sepia hover:bg-sepia hover:text-parchment",
  // Filled surface CTA for secondary emphasis (paired with a primary).
  secondary:
    "border-border bg-card text-foreground hover:border-sepia/60 hover:bg-muted hover:text-foreground",
  // Explicit alias of primary for callers reaching for the shadcn vocabulary.
  outline:
    "border border-sepia/60 bg-background text-sepia hover:border-sepia hover:bg-sepia hover:text-parchment",
  ghost:
    "border-border bg-transparent text-sepia hover:border-sepia/60 hover:bg-sepia/[0.04] hover:text-foreground",
  danger:
    "border-destructive/60 bg-background text-destructive hover:border-destructive hover:bg-destructive hover:text-destructive-foreground",
};

export function pillButtonClasses(
  variant: PillVariant = "primary",
  className?: string,
  size: PillSize = "md",
) {
  return cn(base, sizes[size], variants[variant], className);
}

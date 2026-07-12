import { cn } from "@/lib/utils";

/**
 * Standardised pill-button styling used across the portfolio.
 *
 * - `primary` — sepia-outlined CTA that fills on hover (Download, Visit, Read).
 * - `ghost`   — quieter border-only control for secondary actions (Read more,
 *              Reveal earlier folios, Open in new tab).
 *
 * All variants share the same shape and focus ring so buttons line up wherever
 * they appear together. Two sizes:
 * - `md` (default) — 44px touch target, primary CTA scale.
 * - `sm`           — 36px compact scale for filter chips, secondary actions.
 */
export type PillVariant = "primary" | "ghost";
export type PillSize = "sm" | "md";

const base =
  "font-mono-mar group inline-flex items-center justify-center gap-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sepia/40 disabled:cursor-wait disabled:opacity-70";

const sizes: Record<PillSize, string> = {
  md: "min-h-11 px-5 py-2.5 text-sm leading-none",
  sm: "min-h-9 px-3.5 py-2 text-xs leading-none",
};

const variants: Record<PillVariant, string> = {
  primary:
    "border border-sepia/60 bg-background text-sepia hover:border-sepia hover:bg-sepia hover:text-parchment",
  ghost:
    "border border-border bg-transparent text-sepia hover:border-sepia/60 hover:bg-sepia/[0.04] hover:text-foreground",
};

export function pillButtonClasses(
  variant: PillVariant = "primary",
  className?: string,
  size: PillSize = "md",
) {
  return cn(base, sizes[size], variants[variant], className);
}

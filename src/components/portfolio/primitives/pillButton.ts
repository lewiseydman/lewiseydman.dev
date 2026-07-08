import { cn } from "@/lib/utils";

/**
 * Standardised pill-button styling used across the portfolio.
 *
 * - `primary` — sepia-outlined CTA that fills on hover (Download, Visit, Read).
 * - `ghost`   — quieter border-only control for secondary actions (Read more,
 *              Reveal earlier folios, Open in new tab).
 *
 * All variants share the same shape, padding, min-height (11 = 44px touch
 * target) and focus ring so buttons line up wherever they appear together.
 */
export type PillVariant = "primary" | "ghost";

const base =
  "font-mono-mar group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 py-2.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sepia/40 disabled:cursor-wait disabled:opacity-70";

const variants: Record<PillVariant, string> = {
  primary:
    "border border-sepia/60 bg-background text-sepia hover:border-sepia hover:bg-sepia hover:text-parchment",
  ghost:
    "border border-border bg-transparent text-sepia hover:border-sepia/60 hover:bg-sepia/[0.04] hover:text-foreground",
};

export function pillButtonClasses(
  variant: PillVariant = "primary",
  className?: string,
) {
  return cn(base, variants[variant], className);
}

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { PillVariant } from "./pillButton";

type CommonProps = {
  label: string; // aria-label
  variant?: PillVariant;
  size?: "sm" | "md";
  className?: string;
  children: ReactNode;
  showTooltip?: boolean;
};

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children" | "aria-label"> & {
    href?: undefined;
  };

type AnchorProps = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
  download?: string | boolean;
};

type Props = ButtonProps | AnchorProps;

const base =
  "group relative inline-flex items-center justify-center rounded-full border transition-[color,background-color,border-color,transform,box-shadow,opacity] duration-200 ease-out will-change-transform hover:-translate-y-px active:translate-y-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sepia/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60";

const sizes = {
  lg: "h-14 w-14",
  md: "h-11 w-11", // 44px touch target
  sm: "h-8 w-8",
};

const variants: Record<PillVariant, string> = {
  primary:
    "border-sepia/60 bg-background/90 text-sepia shadow-sm backdrop-blur hover:border-sepia hover:bg-sepia hover:text-parchment",
  secondary:
    "border-border bg-card text-foreground hover:border-sepia/60 hover:bg-muted",
  outline:
    "border-sepia/60 bg-background/90 text-sepia shadow-sm backdrop-blur hover:border-sepia hover:bg-sepia hover:text-parchment",
  ghost:
    "border-transparent bg-transparent text-sepia hover:border-border hover:bg-sepia/[0.04] hover:text-foreground",
  danger:
    "border-destructive/60 bg-background text-destructive hover:border-destructive hover:bg-destructive hover:text-destructive-foreground",
};

const tooltipClass =
  "pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm border border-border bg-background px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-sepia opacity-0 transition-opacity group-hover:opacity-100";

/**
 * Standardised round icon button (44×44 md, 32×32 sm) that shares the same
 * sepia/parchment palette as `pillButtonClasses`. Renders as an `<a>` when
 * `href` is provided, otherwise a `<button>`. Optional hover tooltip via
 * `showTooltip`.
 */
export const IconPillButton = forwardRef<HTMLElement, Props>(function IconPillButton(
  { label, variant = "ghost", size = "md", className, children, showTooltip = false, ...rest },
  ref,
) {
  const classes = cn(base, sizes[size], variants[variant], className);
  const tooltip = showTooltip ? <span className={tooltipClass}>{label}</span> : null;

  if ("href" in rest && rest.href !== undefined) {
    const { href, target, rel, download } = rest as AnchorProps;
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        download={download as string | undefined}
        aria-label={label}
        className={classes}
      >
        {children}
        {tooltip}
      </a>
    );
  }
  const { href: _href, ...btnRest } = rest as ButtonProps & { href?: undefined };
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      aria-label={label}
      className={classes}
      {...btnRest}
    >
      {children}
      {tooltip}
    </button>
  );
});
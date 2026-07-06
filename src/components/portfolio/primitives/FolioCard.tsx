import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { forwardRef } from "react";

type Props = {
  onClick: () => void;
  ariaLabel?: string;
  thumb: string;
  alt: string;
  overlayTopLeft?: ReactNode;
  overlayTopRight?: ReactNode;
  kicker?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
  index?: number;
  padded?: boolean;
  className?: string;
};

/**
 * Standard portfolio card: image thumb with optional corner overlays, kicker
 * line, title, body copy, and a footer slot. Sepia underline sweeps on hover.
 * Uses whileInView so re-opening a section doesn't re-animate the whole grid.
 */
export const FolioCard = forwardRef<HTMLButtonElement, Props>(function FolioCard(
  {
    onClick,
    ariaLabel,
    thumb,
    alt,
    overlayTopLeft,
    overlayTopRight,
    kicker,
    title,
    body,
  footer,
  index = 0,
  padded = true,
  className = "",
},
  ref,
) {
  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index, 6) * 0.05 }}
      className={`group relative flex h-full w-full flex-col gap-5 bg-background text-left transition-colors hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sepia/40 ${
        padded ? "p-5 md:p-7" : ""
      } ${className}`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-border bg-card">
        <img
          src={thumb}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-[1.03] dark:mix-blend-screen"
        />
        <div aria-hidden className="absolute inset-0 blueprint-grid-fine opacity-30 mix-blend-overlay" />
        {overlayTopLeft ? (
          <div className="absolute left-2 top-2 font-mono-mar bg-background/80 px-2 py-0.5">{overlayTopLeft}</div>
        ) : null}
        {overlayTopRight ? (
          <div className="absolute right-2 top-2 font-mono-mar bg-background/80 px-2 py-0.5">{overlayTopRight}</div>
        ) : null}
      </div>
      {kicker ? <div className="font-mono-mar">{kicker}</div> : null}
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-2xl leading-tight tracking-[-0.005em] transition-colors group-hover:text-sepia md:text-3xl">
          {title}
        </h3>
      </div>
      {body ? <div className="text-sm leading-relaxed text-muted-foreground">{body}</div> : null}
      {footer ? <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-1">{footer}</div> : null}
      <div className="h-px w-0 bg-sepia transition-all duration-500 group-hover:w-full" />
    </motion.button>
  );
});
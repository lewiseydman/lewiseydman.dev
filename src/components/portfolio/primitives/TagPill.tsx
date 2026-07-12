import type { ReactNode } from "react";

/**
 * Small outlined uppercase pill used across sections (tags, tools, keywords).
 * Centralised so tuning one border/spacing changes every card.
 */
export function TagPill({ children }: { children: ReactNode }) {
  return (
    <span className="type-tag interactive rounded-full border border-border px-2 py-0.5 hover:border-sepia/60 hover:text-foreground">
      {children}
    </span>
  );
}

export function TagPillRow({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <TagPill key={t}>{t}</TagPill>
      ))}
    </div>
  );
}
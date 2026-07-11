import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  right?: ReactNode;
  className?: string;
};

/**
 * The repeated "kicker · hairline · optional right slot" strip used to
 * introduce sub-sections inside popovers (About, Cursus, Codex, Laudes).
 * Owns the standardised label styling so every divider row lines up.
 */
export function SectionLabel({ children, right, className }: Props) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="font-mono-mar">{children}</span>
      <span className="hairline h-px flex-1" />
      {right ? <span className="font-mono-mar">{right}</span> : null}
    </div>
  );
}
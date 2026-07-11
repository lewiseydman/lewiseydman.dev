import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { BackToIndexButton } from "./BackToIndexButton";

type Props = {
  onBack: () => void;
  backLabel: string;
  right?: ReactNode;
  className?: string;
};

/**
 * Sticky detail-view header used inside every dialog leaf (Opera case study,
 * Codex essay, Disputatio detail). Owns the standardised negative-margin
 * padding so the bar spans the dialog body edges without ad-hoc offsets.
 */
export function DialogSubHeader({ onBack, backLabel, right, className }: Props) {
  return (
    <div
      className={cn(
        "sticky top-0 z-10 -mx-5 flex items-center justify-between gap-3 border-b border-border bg-background/85 px-5 py-2 backdrop-blur-md md:-mx-8 md:px-8 lg:-mx-12 lg:px-12",
        className,
      )}
    >
      <BackToIndexButton onClick={onBack} label={backLabel} />
      {right ? <div className="font-mono-mar flex min-w-0 items-center gap-2 truncate text-right">{right}</div> : null}
    </div>
  );
}
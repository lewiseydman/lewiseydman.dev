import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  numeral: string;
  latin: string;
  english: string;
  kicker?: string;
  children: ReactNode;
};

export function SectionDialog({
  open,
  onOpenChange,
  numeral,
  latin,
  english,
  kicker,
  children,
}: Props) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed left-1/2 top-1/2 z-50 flex h-[88vh] w-[min(96vw,72rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-sm border border-border bg-background shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        >
          {/* header */}
          <div className="relative shrink-0 border-b border-border bg-card/60 px-6 py-5 md:px-10 md:py-6">
            <div className="absolute inset-0 blueprint-grid-fine opacity-30" />
            <div className="absolute inset-0 paper-grain opacity-60" />
            <div className="relative flex items-end justify-between gap-6">
              <div className="flex flex-col gap-2">
                <div className="font-mono-mar flex items-center gap-3">
                  <span>Folio · {numeral}</span>
                  <span className="hairline h-px w-10" />
                  {kicker ? <span>{kicker}</span> : null}
                </div>
                <DialogPrimitive.Title asChild>
                  <h2 className="font-display text-3xl tracking-[-0.01em] md:text-5xl">
                    {latin}
                    <span className="italic text-sepia"> · {english}</span>
                  </h2>
                </DialogPrimitive.Title>
              </div>
              <DialogPrimitive.Close
                aria-label="Close"
                className="group relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background/80 text-sepia transition-colors hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </DialogPrimitive.Close>
            </div>
            <DialogPrimitive.Description className="sr-only">
              {english} section
            </DialogPrimitive.Description>
          </div>

          {/* body — unified padding for every section */}
          <div className="relative flex-1 overflow-y-auto">
            <div className="absolute inset-0 paper-grain pointer-events-none opacity-40" />
            <div className="relative mx-auto w-full max-w-5xl px-8 py-12 md:px-14 md:py-16">{children}</div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
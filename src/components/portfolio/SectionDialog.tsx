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
          <div className="relative shrink-0 border-b border-border bg-card/60 px-5 py-4 md:px-8 md:py-5 lg:px-12">
            <div className="absolute inset-0 blueprint-grid-fine opacity-30" />
            <div className="absolute inset-0 paper-grain opacity-60" />
            <div className="relative flex items-end justify-between gap-6">
              <div className="flex flex-col gap-2">
                <div className="font-mono-mar flex items-center gap-2 whitespace-nowrap sm:gap-3">
                  <span className="shrink-0">Folio · {numeral}</span>
                  <span className="hairline h-px w-6 shrink-0 sm:w-10" />
                  {kicker ? <span className="shrink-0 truncate">{kicker}</span> : null}
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
                className="group relative flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border bg-background/80 text-sepia shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brass hover:bg-background hover:text-foreground hover:shadow-[0_4px_12px_color-mix(in_oklab,var(--brass)_15%,transparent)] active:translate-y-0 active:scale-95 active:bg-muted active:shadow-inner focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2"
              >
                {/* Decorative external brass ring on hover */}
                <span className="absolute -inset-1.5 scale-110 rounded-full border border-brass/0 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:border-brass/30 group-hover:opacity-100" />
                {/* Inner brass ring on hover */}
                <span className="absolute inset-[2px] rounded-full border border-transparent transition-all duration-300 group-hover:border-brass/20" />
                <X className="relative h-4 w-4 transition-transform duration-500 ease-out group-hover:rotate-90 group-active:scale-90" />
                {/* Feedback pulse on active */}
                <span className="absolute inset-0 rounded-full bg-brass/5 opacity-0 transition-all duration-200 group-active:scale-125 group-active:opacity-100" />
              </DialogPrimitive.Close>
            </div>
            <DialogPrimitive.Description className="sr-only">
              {english} section
            </DialogPrimitive.Description>
          </div>

          {/* body — unified padding for every section */}
          <div data-dialog-scroll className="dialog-scroll relative flex-1 overflow-y-auto">
            <div className="absolute inset-0 paper-grain pointer-events-none opacity-40" />
            <div className="relative mx-auto w-full max-w-5xl px-5 pt-4 pb-8 md:px-8 md:pt-8 md:pb-12 lg:px-12 lg:pt-12 lg:pb-16">
              {children}
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
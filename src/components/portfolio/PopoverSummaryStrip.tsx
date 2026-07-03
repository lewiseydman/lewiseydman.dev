import { motion } from "framer-motion";
import { useRef, useState } from "react";

export type SummaryItem = {
  kicker: string;
  title: string;
  dek: string;
  thumb?: string;
  onClick?: () => void;
};

type Props = {
  items: SummaryItem[];
  label?: string;
};

/**
 * A horizontal strip of summary "pills" rendered at the top of every
 * popover. Each pill shows a small kicker, bold title, one-line dek and
 * an optional thumbnail — mirrors the reference About / Works / Blog
 * screenshots while keeping the renaissance-monochrome palette.
 */
export function PopoverSummaryStrip({ items, label = "Folio" }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({
    startX: 0,
    scrollLeft: 0,
    moved: false,
    active: false,
    pointerId: 0,
  });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!e.isPrimary || !el) return;
    // Only hijack on devices with a fine pointer (mouse / trackpad)
    if (!window.matchMedia("(pointer: fine)").matches) return;
    dragState.current = {
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
      moved: false,
      active: true,
      pointerId: e.pointerId,
    };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!dragState.current.active || !el) return;
    const dx = e.clientX - dragState.current.startX;
    // Only start actually dragging once the pointer has moved past a small
    // threshold — otherwise a plain click on a pill would be swallowed by
    // pointer capture and never fire its onClick.
    if (!dragState.current.moved && Math.abs(dx) > 4) {
      dragState.current.moved = true;
      setIsDragging(true);
      try {
        el.setPointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
    }
    if (dragState.current.moved) {
      el.scrollLeft = dragState.current.scrollLeft - dx;
    }
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.active) return;
    dragState.current.active = false;
    if (isDragging) {
      setIsDragging(false);
      try {
        scrollerRef.current?.releasePointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
    }
  };

  const suppressClickIfDragged = (e: React.MouseEvent) => {
    if (dragState.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      dragState.current.moved = false;
    }
  };

  return (
    <div className="flex flex-col gap-3 border-b border-border pb-8">
      <div className="font-mono-mar flex items-center gap-3">
        <span>{label}</span>
        <span className="hairline h-px flex-1" />
        <span>
          {items.length} {items.length === 1 ? "entry" : "entries"}
        </span>
      </div>
      <div
        ref={scrollerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={suppressClickIfDragged}
        className={`flex gap-3 overflow-x-auto pb-2 scrollbar-hide lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0 ${
          isDragging ? "cursor-grabbing select-none" : "lg:cursor-auto cursor-grab"
        }`}
      >
        {items.map((item, i) => {
          const Tag = item.onClick ? "button" : "div";
          return (
            <motion.div
              key={`${item.kicker}-${item.title}-${i}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className="min-w-[260px] flex-1 snap-start"
            >
              <Tag
                {...(item.onClick
                  ? { type: "button" as const, onClick: item.onClick }
                  : {})}
                className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-sm border border-border bg-card/40 px-3 py-2.5 text-left transition-colors hover:border-sepia/60 hover:bg-card ${
                  item.onClick ? "cursor-pointer" : "cursor-default"
                }`}
              >
                {item.thumb ? (
                  <div className="relative h-11 w-16 shrink-0 overflow-hidden rounded-[2px] border border-border bg-background">
                    <img
                      src={item.thumb}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover mix-blend-multiply dark:mix-blend-screen"
                    />
                  </div>
                ) : (
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[2px] border border-border bg-background">
                    <span className="font-mono-mar">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                )}
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="font-mono text-[0.6rem] uppercase tracking-widest text-sepia">
                    {item.kicker}
                  </span>
                  <span className="truncate font-display text-base leading-tight text-foreground">
                    {item.title}
                  </span>
                  <span className="truncate text-[0.7rem] leading-snug text-muted-foreground">
                    {item.dek}
                  </span>
                </div>
              </Tag>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
import { motion } from "framer-motion";

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
  return (
    <div className="flex flex-col gap-3 border-b border-border pb-8">
      <div className="font-mono-mar flex items-center gap-3">
        <span>{label}</span>
        <span className="hairline h-px flex-1" />
        <span>
          {items.length} {items.length === 1 ? "entry" : "entries"}
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => {
          const Tag = item.onClick ? "button" : "div";
          return (
            <motion.div
              key={`${item.kicker}-${item.title}-${i}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
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
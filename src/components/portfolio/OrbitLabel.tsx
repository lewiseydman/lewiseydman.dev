import { motion, useReducedMotion } from "framer-motion";

export type OrbitItem = {
  id: string;
  latin: string;
  english: string;
  numeral: string;
  /** Angle in degrees, 0 = right, 90 = bottom (CSS convention). */
  angle: number;
  /** Side the text sits on, controls tail direction. */
  side: "left" | "right";
};

type Props = {
  item: OrbitItem;
  /** Radius of figure circle (where leader line starts), as a 0-1 fraction of the stage size. */
  innerR: number;
  /** Radius where the node sits, as a 0-1 fraction. */
  outerR: number;
  /** Tail length as 0-1 fraction. */
  tailLen?: number;
  index: number;
  onOpen: (id: string) => void;
};

export function OrbitLabel({ item, innerR, outerR, tailLen = 0.17, index, onOpen }: Props) {
  const reduce = useReducedMotion();
  const rad = (item.angle * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  // SVG coordinate space is 0..1
  const cx = 0.5;
  const cy = 0.5;
  const x1 = cx + cos * innerR;
  const y1 = cy + sin * innerR;
  const x2 = cx + cos * outerR;
  const y2 = cy + sin * outerR;

  const tx = item.side === "right" ? x2 + tailLen : x2 - tailLen;

  // label HTML position (use the tail end)
  const labelLeft = `${tx * 100}%`;
  const labelTop = `${y2 * 100}%`;

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(item.id)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 + index * 0.12 }}
      className={`group absolute z-20 flex -translate-y-1/2 cursor-pointer items-center gap-2 outline-none ${
        item.side === "right" ? "pl-6" : "pr-6"
      }`}
      style={{
        left: labelLeft,
        top: labelTop,
        transform:
          item.side === "right"
            ? "translate(0, -50%)"
            : "translate(-100%, -50%)",
      }}
      aria-label={`Open ${item.english}`}
    >
      <div
        className={`flex flex-col ${
          item.side === "right" ? "items-start" : "items-end"
        } max-w-[9rem]`}
      >
        <span className="font-mono-mar whitespace-nowrap text-[0.6rem] opacity-70 transition-opacity group-hover:opacity-100">
          {item.numeral} · {item.english}
        </span>
        <span className="font-display whitespace-nowrap text-lg leading-tight tracking-[-0.01em] lg:text-xl xl:text-2xl">
          <span className="relative inline-block">
            {item.latin}
            <motion.span
              aria-hidden
              className="absolute -bottom-0.5 left-0 h-px w-full origin-left bg-sepia"
              initial={{ scaleX: 0 }}
              animate={reduce ? { scaleX: 0 } : undefined}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </span>
        </span>
        <motion.span
          initial={{ opacity: 0, x: item.side === "right" ? -4 : 4 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="font-mono-mar mt-1 text-[0.55rem] text-sepia opacity-0 transition-opacity group-hover:opacity-100"
        >
          {item.side === "right" ? "↗ open" : "open ↖"}
        </motion.span>
      </div>

      {/* leader line + node, drawn relative to this absolute label using a small overlay svg
          is not feasible (we need the inner-circle point). We render lines in a sibling SVG
          via OrbitLines below. Here we render just the node hover halo. */}
      <span
        className="pointer-events-none absolute h-2.5 w-2.5 rounded-full border border-sepia bg-background transition-all group-hover:scale-150 group-hover:bg-sepia"
        style={{
          left: item.side === "right" ? "-0.35rem" : "auto",
          right: item.side === "left" ? "-0.35rem" : "auto",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      />
      {/* group-hover underline expand via Framer above; tail underline shown by lines svg */}
      {/* expose data for the lines svg through CSS vars on the parent stage */}
      <span data-orbit-line data-x1={x1} data-y1={y1} data-x2={x2} data-y2={y2} data-tx={tx} className="hidden" />
    </motion.button>
  );
}

/**
 * Renders all leader lines + node circles + tail lines as one SVG overlay.
 * Receives the orbit item list and the same inner/outer radii.
 */
export function OrbitLines({
  items,
  innerR,
  outerR,
  tailLen = 0.17,
}: {
  items: OrbitItem[];
  innerR: number;
  outerR: number;
  tailLen?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <svg
      viewBox="0 0 1 1"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
    >
      {items.map((item, i) => {
        const rad = (item.angle * Math.PI) / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        const cx = 0.5;
        const cy = 0.5;
        const x1 = cx + cos * innerR;
        const y1 = cy + sin * innerR;
        const x2 = cx + cos * outerR;
        const y2 = cy + sin * outerR;
        const tx = item.side === "right" ? x2 + tailLen : x2 - tailLen;

        return (
          <g key={item.id}>
            <motion.line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="color-mix(in oklab, var(--sepia) 55%, transparent)"
              strokeWidth={0.0015}
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: reduce ? 0 : 1.1,
                delay: 0.3 + i * 0.12,
                ease: "easeOut",
              }}
              style={{ vectorEffect: "non-scaling-stroke" }}
            />
            <motion.line
              x1={x2}
              y1={y2}
              x2={tx}
              y2={y2}
              stroke="color-mix(in oklab, var(--ink) 35%, transparent)"
              strokeWidth={0.0015}
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: reduce ? 0 : 0.7,
                delay: 0.9 + i * 0.12,
                ease: "easeOut",
              }}
              style={{ vectorEffect: "non-scaling-stroke" }}
            />
          </g>
        );
      })}
    </svg>
  );
}
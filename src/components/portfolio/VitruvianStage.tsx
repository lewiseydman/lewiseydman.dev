import { Suspense, lazy, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import vitruvian from "@/assets/vitruvian.png";
import { OrbitLabel, OrbitLines, type OrbitItem } from "./OrbitLabel";
import { SectionDialog } from "./SectionDialog";
import { About } from "./About";
import { SelectedWork } from "./SelectedWork";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { WritingsAppraisals } from "./WritingsAppraisals";
import { Tests } from "./Tests";
import { FooterIcons } from "./FooterIcons";

const VitruvianScene = lazy(() => import("./VitruvianScene"));

const items: OrbitItem[] = [
  { id: "vita", numeral: "I", latin: "Vita", english: "About", angle: 200, side: "left" },
  { id: "codex", numeral: "II", latin: "Codex", english: "Writings", angle: 160, side: "left" },
  { id: "disputatio", numeral: "III", latin: "Disputatio", english: "Tests", angle: 290, side: "right" },
  { id: "opera", numeral: "IV", latin: "Opera", english: "Work", angle: 340, side: "right" },
  { id: "cursus", numeral: "V", latin: "Cursus", english: "Experience", angle: 20, side: "right" },
];

const sections: Record<
  string,
  { numeral: string; latin: string; english: string; kicker: string; node: React.ReactNode }
> = {
  vita: { numeral: "I", latin: "Vita", english: "About", kicker: "De Ipso", node: <About /> },
  opera: {
    numeral: "IV",
    latin: "Opera",
    english: "Selected Work",
    kicker: "Opera Selecta",
    node: <SelectedWork />,
  },
  cursus: {
    numeral: "V",
    latin: "Cursus",
    english: "Experience",
    kicker: "Cursus Honorum",
    node: <ExperienceTimeline />,
  },
  codex: {
    numeral: "II",
    latin: "Codex",
    english: "Writings & Appraisals",
    kicker: "Codex Notarum",
    node: <WritingsAppraisals />,
  },
  disputatio: {
    numeral: "III",
    latin: "Disputatio",
    english: "Tests",
    kicker: "Disputationes",
    node: <Tests />,
  },
};

const INNER_R = 0.3;
const OUTER_R = 0.46;

export function VitruvianStage() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);

  // sync with hash
  useEffect(() => {
    const apply = () => {
      const h = window.location.hash.replace("#", "");
      setActive(h && sections[h] ? h : null);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const onOpen = (id: string) => {
    if (typeof window !== "undefined") {
      history.replaceState(null, "", `#${id}`);
    }
    setActive(id);
  };

  const onClose = (open: boolean) => {
    if (!open) {
      if (typeof window !== "undefined") {
        history.replaceState(null, "", window.location.pathname);
      }
      setActive(null);
    }
  };

  const activeSection = active ? sections[active] : null;

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-between overflow-hidden px-6 pb-8 pt-10 md:px-12"
    >
      {/* backdrops */}
      <div className="absolute inset-0 -z-10 blueprint-grid opacity-40" />
      <div className="absolute inset-0 -z-10 paper-grain" />
      {/* corner crosshairs */}
      {["top-6 left-6", "top-6 right-6", "bottom-6 left-6", "bottom-6 right-6"].map((p) => (
        <div key={p} className={`pointer-events-none absolute ${p} text-ink/30`}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 0v20M0 10h20" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
      ))}

      {/* top marginalia */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-mono-mar relative z-10 flex items-center gap-3"
      >
        <span className="hairline h-px w-10" />
        <span>L · E · Folio I · Anno MMXXVI</span>
        <span className="hairline h-px w-10" />
      </motion.div>

      {/* stage */}
      <div className="relative my-6 flex w-full flex-1 items-center justify-center">
        <div className="relative aspect-square w-[min(82vh,92vw)] max-w-[860px] overflow-visible">
          {/* three.js scene behind */}
          <div className="pointer-events-none absolute inset-0 -z-0 opacity-90">
            <Suspense fallback={null}>
              <VitruvianScene />
            </Suspense>
          </div>

          {/* outer rotating circle hairlines */}
          <motion.div
            initial={{ rotate: 0 }}
            animate={reduce ? {} : { rotate: 360 }}
            transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute inset-0"
          >
            <svg viewBox="0 0 400 400" className="h-full w-full text-ink/20">
              <circle cx="200" cy="200" r="198" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="2 6" />
              <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="0.4" fill="none" />
              <circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="0.4" fill="none" strokeDasharray="1 3" />
            </svg>
          </motion.div>
          <motion.div
            initial={{ rotate: 0 }}
            animate={reduce ? {} : { rotate: -360 }}
            transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute inset-[6%]"
          >
            <svg viewBox="0 0 400 400" className="h-full w-full text-sepia/30">
              <circle cx="200" cy="200" r="196" stroke="currentColor" strokeWidth="0.4" fill="none" strokeDasharray="0.5 4" />
            </svg>
          </motion.div>

          {/* Vitruvian image, center */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="absolute left-1/2 top-1/2 z-10 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2"
          >
            <img
              src={vitruvian}
              alt="Vitruvian-style line drawing"
              className="h-full w-full select-none object-contain mix-blend-multiply dark:mix-blend-screen dark:invert dark:hue-rotate-180"
              draggable={false}
            />
          </motion.div>

          {/* leader lines */}
          <OrbitLines items={items} innerR={INNER_R} outerR={OUTER_R} />

          {/* labels (desktop only — visible at md+) */}
          <div className="absolute inset-0 hidden md:block">
            {items.map((item, i) => (
              <OrbitLabel
                key={item.id}
                item={item}
                innerR={INNER_R}
                outerR={OUTER_R}
                index={i}
                onOpen={onOpen}
              />
            ))}
          </div>
        </div>
      </div>

      {/* compact name card */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 mt-2 flex flex-col items-center gap-2 text-center"
      >
        <span className="font-mono-mar">Proportio · Hominis · Fig. 01</span>
        <h1 className="font-display text-3xl tracking-[-0.01em] md:text-4xl">
          Lewis <span className="italic text-sepia">Eydman</span>
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          Product Manager bridging{" "}
          <span className="text-foreground underline decoration-sepia/40 underline-offset-4">
            design
          </span>{" "}
          and{" "}
          <span className="text-foreground underline decoration-sepia/40 underline-offset-4">
            development
          </span>
          .
        </p>
      </motion.div>

      {/* mobile orbit fallback */}
      <div className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-2 md:hidden">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onOpen(item.id)}
            className="flex items-baseline gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 backdrop-blur-md"
          >
            <span className="font-mono text-[0.6rem] uppercase tracking-widest text-sepia">
              {item.numeral}
            </span>
            <span className="font-display text-base">{item.latin}</span>
            <span className="font-mono-mar">· {item.english}</span>
          </button>
        ))}
      </div>

      {/* footer icons */}
      <div className="relative z-10 mt-6 flex w-full items-center justify-center">
        <FooterIcons />
      </div>

      {/* dialog */}
      {activeSection ? (
        <SectionDialog
          open={!!active}
          onOpenChange={onClose}
          numeral={activeSection.numeral}
          latin={activeSection.latin}
          english={activeSection.english}
          kicker={activeSection.kicker}
        >
          {activeSection.node}
        </SectionDialog>
      ) : null}
    </section>
  );
}
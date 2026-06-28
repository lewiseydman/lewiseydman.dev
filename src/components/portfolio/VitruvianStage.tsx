import { Suspense, lazy, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import vitruvian from "@/assets/vitruvian.png";
import { OrbitLabel, OrbitLines, type OrbitItem } from "./OrbitLabel";
import { SectionDialog } from "./SectionDialog";
import { About } from "./About";
import { SelectedWork } from "./SelectedWork";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { Blogs } from "./Blogs";
import { Appraisals } from "./Appraisals";
import { Tests } from "./Tests";
import { FooterIcons } from "./FooterIcons";

const VitruvianScene = lazy(() => import("./VitruvianScene"));

const items: OrbitItem[] = [
  { id: "vita", numeral: "I", latin: "Vita", english: "About", angle: 210, side: "left" },
  { id: "codex", numeral: "II", latin: "Codex", english: "Blogs", angle: 180, side: "left" },
  { id: "laudes", numeral: "III", latin: "Laudes", english: "Appraisals", angle: 150, side: "left" },
  { id: "disputatio", numeral: "IV", latin: "Disputatio", english: "Tests", angle: 30, side: "right" },
  { id: "opera", numeral: "V", latin: "Opera", english: "Work", angle: 0, side: "right" },
  { id: "cursus", numeral: "VI", latin: "Cursus", english: "Experience", angle: 330, side: "right" },
];

const sections: Record<
  string,
  { numeral: string; latin: string; english: string; kicker: string; node: React.ReactNode }
> = {
  vita: { numeral: "I", latin: "Vita", english: "About", kicker: "De Ipso", node: <About /> },
  opera: {
    numeral: "V",
    latin: "Opera",
    english: "Selected Work",
    kicker: "Opera Selecta",
    node: <SelectedWork />,
  },
  cursus: {
    numeral: "VI",
    latin: "Cursus",
    english: "Experience",
    kicker: "Cursus Honorum",
    node: <ExperienceTimeline />,
  },
  codex: {
    numeral: "II",
    latin: "Codex",
    english: "Blogs",
    kicker: "Codex Notarum",
    node: <Blogs />,
  },
  laudes: {
    numeral: "III",
    latin: "Laudes",
    english: "Appraisals",
    kicker: "Laudes & Marginalia",
    node: <Appraisals />,
  },
  disputatio: {
    numeral: "IV",
    latin: "Disputatio",
    english: "Tests",
    kicker: "Disputationes",
    node: <Tests />,
  },
};

const INNER_R = 0.32;
const OUTER_R = 0.48;

function useRadii() {
  const [v, setV] = useState({ inner: INNER_R, outer: OUTER_R, tail: 0.13 });
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1536) setV({ inner: 0.34, outer: 0.5, tail: 0.17 });
      else if (w >= 1280) setV({ inner: 0.33, outer: 0.49, tail: 0.14 });
      else setV({ inner: 0.32, outer: 0.47, tail: 0.11 });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return v;
}

export function VitruvianStage() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const radii = useRadii();

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
        <span>Folio · Anno MMXXVI</span>
        <span className="hairline h-px w-10" />
      </motion.div>

      {/* stage */}
      <div className="relative my-6 flex w-full flex-1 items-center justify-center">
        <div className="relative aspect-square w-[min(82vh,72vw)] max-w-[920px] overflow-visible 2xl:max-w-[1060px]">
          {/* Vitruvian image — sits inside the sphere */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="absolute left-1/2 top-1/2 z-10 h-[56%] w-[56%] -translate-x-1/2 -translate-y-1/2"
          >
            <img
              src={vitruvian}
              alt="Vitruvian-style line drawing"
              className="h-full w-full select-none object-contain mix-blend-multiply dark:mix-blend-screen dark:invert dark:hue-rotate-180"
              draggable={false}
            />
          </motion.div>

          {/* three.js sphere — rendered ON TOP of figure with low opacity so the
              wireframe visually wraps the Vitruvian inside it. */}
          <div className="pointer-events-none absolute inset-0 z-20">
            <Suspense fallback={null}>
              <VitruvianScene />
            </Suspense>
          </div>

          {/* outer rotating circle hairlines */}
          <motion.div
            initial={{ rotate: 0 }}
            animate={reduce ? {} : { rotate: 360 }}
            transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute inset-0 z-0"
          >
            <svg viewBox="0 0 400 400" className="h-full w-full text-ink/20">
              <circle
                cx="200"
                cy="200"
                r="198"
                stroke="currentColor"
                strokeWidth="0.5"
                fill="none"
                strokeDasharray="2 6"
              />
              <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="0.4" fill="none" />
              <circle
                cx="200"
                cy="200"
                r="120"
                stroke="currentColor"
                strokeWidth="0.4"
                fill="none"
                strokeDasharray="1 3"
              />
            </svg>
          </motion.div>
          <motion.div
            initial={{ rotate: 0 }}
            animate={reduce ? {} : { rotate: -360 }}
            transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute inset-[6%] z-0"
          >
            <svg viewBox="0 0 400 400" className="h-full w-full text-sepia/30">
              <circle
                cx="200"
                cy="200"
                r="196"
                stroke="currentColor"
                strokeWidth="0.4"
                fill="none"
                strokeDasharray="0.5 4"
              />
            </svg>
          </motion.div>

          {/* leader lines */}
          <div className="absolute inset-0 z-30">
            <OrbitLines items={items} innerR={radii.inner} outerR={radii.outer} tailLen={radii.tail} />
          </div>

          {/* labels (desktop only — visible at md+) */}
          <div className="absolute inset-0 z-40 hidden md:block">
            {items.map((item, i) => (
              <OrbitLabel
                key={item.id}
                item={item}
                innerR={radii.inner}
                outerR={radii.outer}
                tailLen={radii.tail}
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
          <span className="text-foreground underline decoration-sepia/40 underline-offset-4">design</span> and{" "}
          <span className="text-foreground underline decoration-sepia/40 underline-offset-4">development</span>.
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
            <span className="font-mono text-[0.6rem] uppercase tracking-widest text-sepia">{item.numeral}</span>
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

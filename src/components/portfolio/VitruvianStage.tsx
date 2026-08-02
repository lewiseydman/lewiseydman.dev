import { Suspense, lazy, useRef } from "react";
import { ChevronRight } from "lucide-react";
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
import { toRoman } from "@/lib/roman";
import { useSectionHash } from "@/hooks/use-section-hash";
import { useIntersectionPause } from "@/hooks/use-intersection-pause";
import { useHydrated } from "@/hooks/use-hydrated";

const VitruvianScene = lazy(() => import("./VitruvianScene"));

const items: OrbitItem[] = [
  { id: "vita", numeral: "I", latin: "Vita", english: "About", angle: 225, side: "left" },
  { id: "opera", numeral: "II", latin: "Opera", english: "Work", angle: 180, side: "left" },
  { id: "cursus", numeral: "III", latin: "Cursus", english: "Experience", angle: 135, side: "left" },
  { id: "disputatio", numeral: "IV", latin: "Disputatio", english: "Tests", angle: 315, side: "right" },
  { id: "laudes", numeral: "V", latin: "Laudes", english: "Appraisals", angle: 0, side: "right" },
  { id: "codex", numeral: "VI", latin: "Codex", english: "Blogs", angle: 45, side: "right" },
];

const sections: Record<
  string,
  { numeral: string; latin: string; english: string; kicker: string; node: React.ReactNode }
> = {
  vita: { numeral: "I", latin: "Vita", english: "About", kicker: "De Ipso", node: <About /> },
  opera: {
    numeral: "II",
    latin: "Opera",
    english: "Works",
    kicker: "Opera",
    node: <SelectedWork />,
  },
  cursus: {
    numeral: "III",
    latin: "Cursus",
    english: "Experience",
    kicker: "Cursus",
    node: <ExperienceTimeline />,
  },
  codex: {
    numeral: "VI",
    latin: "Codex",
    english: "Blogs",
    kicker: "Codex",
    node: <Blogs />,
  },
  laudes: {
    numeral: "V",
    latin: "Laudes",
    english: "Appraisals",
    kicker: "Laudes",
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
const TAIL_LEN = 0.17;

export function VitruvianStage() {
  const reduce = useReducedMotion();
  const { section, openSection, closeSection } = useSectionHash();
  const active = section && sections[section] ? section : null;
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasPaused = useIntersectionPause(stageRef, { rootMargin: "150px" });
  const hydrated = useHydrated();
  const yearRoman = hydrated ? toRoman(new Date().getFullYear()) : "MMXXVI";

  const onOpen = (id: string) => openSection(id);
  const onClose = (open: boolean) => {
    if (!open) closeSection();
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
        <span>Folio · Anno {CURRENT_YEAR_ROMAN}</span>
        <span className="hairline h-px w-10" />
      </motion.div>

      {/* screen-reader nav landmark mirroring the radial labels */}
      <nav aria-label="Sections" className="sr-only">
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <button type="button" onClick={() => onOpen(item.id)}>
                {item.english} ({item.latin})
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* stage */}
      <div className="relative my-6 flex w-full flex-1 items-center justify-center">
        <div ref={stageRef} className="relative aspect-square w-[min(78vh,88vw)] max-w-[820px] overflow-visible">
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
              decoding="async"
              fetchPriority="high"
            />
          </motion.div>

          {/* three.js sphere — rendered ON TOP of figure with low opacity so the
              wireframe visually wraps the Vitruvian inside it. Skipped entirely
              when the user prefers reduced motion (perf + a11y). */}
          {!reduce ? (
            <div className="pointer-events-none absolute inset-0 z-20" aria-hidden="true">
              <Suspense fallback={null}>
                <VitruvianScene paused={!!active || canvasPaused} />
              </Suspense>
            </div>
          ) : null}

          {/* single outer rotating hairline ring */}
          <motion.div
            initial={{ rotate: 0 }}
            animate={reduce ? {} : { rotate: 360 }}
            transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute inset-0 z-0"
            style={{ willChange: "transform" }}
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
            </svg>
          </motion.div>

          {/* leader lines */}
          <div className="absolute inset-0 z-30">
            <OrbitLines items={items} innerR={INNER_R} outerR={OUTER_R} tailLen={TAIL_LEN} />
          </div>

          {/* labels (desktop only — visible at md+) */}
          <div className="absolute inset-0 z-40 hidden lg:block">
            {items.map((item, i) => (
              <OrbitLabel
                key={item.id}
                item={item}
                innerR={INNER_R}
                outerR={OUTER_R}
                tailLen={TAIL_LEN}
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
        className="relative z-10 flex flex-col items-center gap-4 text-center"
      >
        <span className="font-mono-mar">Proportio · Hominis · Fig. 01</span>
        <h1 className="font-display text-5xl tracking-[-0.01em] md:text-5xl">
          Lewis <span className="italic text-sepia">Eydman</span>
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          Product Engineer bridging{" "}
          <span className="text-foreground underline decoration-sepia/40 underline-offset-4">design</span> &{" "}
          <span className="text-foreground underline decoration-sepia/40 underline-offset-4">development</span>.
        </p>
      </motion.div>

      {/* mobile nav — stacked manuscript index. Easier to scan than the
          orbit chips: each row reads like a table of contents entry. */}
      <nav aria-label="Sections (mobile)" className="relative z-10 mt-8 w-full lg:hidden">
        <ul className="mx-auto flex w-full max-w-md flex-col divide-y divide-border/60 rounded-sm border border-border/60 bg-background/70 backdrop-blur-md">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onOpen(item.id)}
                aria-haspopup="dialog"
                className="group flex w-full items-center gap-4 px-4 py-3 text-left transition-colors hover:bg-sepia/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sepia/40"
              >
                <span className="font-mono w-6 shrink-0 text-[0.65rem] uppercase tracking-widest text-sepia">
                  {item.numeral}
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="font-display text-lg leading-tight">{item.english}</span>
                  <span className="font-mono-mar text-[0.65rem]">{item.latin}</span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-sepia transition-transform group-hover:translate-x-0.5" />
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* footer icons */}
      <div className="relative z-10 mt-8 flex w-full items-center justify-center">
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

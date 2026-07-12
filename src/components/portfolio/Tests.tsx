import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import thumb from "@/assets/thumb-disputatio.jpg";
import { DialogSubHeader } from "./primitives/DialogSubHeader";
import { scrollDialogToTop } from "@/lib/scroll-dialog-top";
import { cn } from "@/lib/utils";

type Test = {
  id: string;
  num: string;
  title: string;
  domain: string;
  summary: string;
  detail: string;
  span?: string;
};

const tests: Test[] = [
  {
    id: "weather-glance",
    num: "I",
    title: "Weather, at a glance",
    domain: "Interface experiment",
    summary:
      "A single-screen weather UI built around one decision: should I take a coat? Everything else is marginalia.",
    detail:
      "A study in selective abstraction. The forecast is real, but the surface answers exactly one question. Built as a vertical slab of typography with a single conditional glyph at the top.",
    span: "sm:row-span-2 lg:row-span-2",
  },
  {
    id: "loop-motion",
    num: "II",
    title: "An honest loading loop",
    domain: "Motion study",
    summary:
      "Most loading spinners lie. This one shows the actual queue position and animates only when work is happening.",
    detail:
      "A motion experiment exploring what a loading indicator could look like if it were forced to tell the truth. The animation pauses when the worker stalls. Users prefer it; product engineers do not.",
  },
  {
    id: "found-typography",
    num: "III",
    title: "Found typography, Lisbon",
    domain: "Field study",
    summary:
      "A week of photographing hand-painted shop signage. Notes on the persistence of warm serifs in cold cities.",
    detail:
      "Collected, sorted, and re-drawn in Figma over an evening. The lesson, repeated: the most distinctive type in any city is the type that was never sold as a typeface.",
    span: "lg:row-span-2",
  },
  {
    id: "calm-dashboard",
    num: "IV",
    title: "The calm dashboard",
    domain: "Design critique",
    summary:
      "A subtractive redesign of an operator console — forty-seven widgets to four, with the math to justify each cut.",
    detail:
      "Annotated screen-by-screen against the original. Half the value of the exercise was naming, out loud, the politics of every panel that survived.",
  },
];

export function Tests() {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = tests.find((t) => t.id === openId) ?? null;

  const openTest = (id: string) => {
    setOpenId(id);
    scrollDialogToTop();
  };

  return (
    <div className="flex flex-col gap-12 md:gap-16">
      <AnimatePresence mode="wait">
        {!open ? (
          <motion.div
            key="index"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-8 md:gap-12"
          >
            <p className="font-display text-2xl leading-snug md:text-3xl">
              Small <span className="italic text-sepia">disputationes</span> &mdash; experiments, studies, and things I
              have found beautiful lately.
            </p>
            <div className="grid auto-rows-[10rem] grid-cols-1 gap-3 sm:grid-cols-2 sm:auto-rows-[11rem] md:gap-4 lg:grid-cols-3 lg:auto-rows-[12rem]">
              {tests.map((t, i) => (
                <motion.button
                  key={t.id}
                  layoutId={`disputatio-${t.id}`}
                  onClick={() => openTest(t.id)}
                  aria-label={`Open disputatio: ${t.title}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(i, 4) * 0.05 }}
                  className={cn(
                    "group relative flex overflow-hidden rounded-sm border border-border bg-card text-left transition-all duration-500 hover:-translate-y-0.5 hover:border-brass hover:shadow-[0_20px_50px_-24px_color-mix(in_oklab,var(--ink)_28%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass",
                    "row-span-2",
                    t.span,
                  )}
                >
                  <motion.img
                    layoutId={`disputatio-thumb-${t.id}`}
                    src={thumb}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-[1.03] dark:mix-blend-screen"
                  />
                  <div className="pointer-events-none absolute inset-0 paper-grain opacity-40" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent opacity-90" />
                  <div className="relative z-10 flex w-full flex-col justify-between p-4 md:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-mono-mar rounded-full border border-parchment/30 bg-ink/40 px-2 py-0.5 text-parchment backdrop-blur-sm">
                        {t.num}
                      </span>
                      <span className="font-mono-mar text-right text-parchment/90">
                        {t.domain}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-display text-xl leading-tight text-parchment md:text-2xl">
                        {t.title}
                      </h3>
                      <div className="h-px w-8 bg-brass transition-all duration-500 group-hover:w-24" />
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <TestDetail key={open.id} open={open} onBack={() => setOpenId(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function TestDetail({ open, onBack }: { open: Test; onBack: () => void }) {
  useEffect(() => {
    scrollDialogToTop();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col gap-8 md:gap-12"
    >
      <DialogSubHeader
        onBack={onBack}
        backLabel="Back to Disputationes"
        right={<>Disputatio · {open.num}</>}
      />
      <motion.div
        layoutId={`disputatio-${open.id}`}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-border bg-card sm:aspect-[16/10]"
      >
        <motion.img
          layoutId={`disputatio-thumb-${open.id}`}
          src={thumb}
          alt={open.title}
          className="h-full w-full object-cover mix-blend-multiply dark:mix-blend-screen"
        />
        <div className="pointer-events-none absolute inset-0 blueprint-grid-fine opacity-30 mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 paper-grain opacity-40" />
      </motion.div>
      <div className="flex flex-col gap-3">
        <div className="font-mono-mar flex items-center gap-3">
          <span>{open.domain}</span>
        </div>
        <h2 className="font-display text-3xl tracking-[-0.01em] md:text-5xl">{open.title}</h2>
        <p className="font-display text-xl italic text-sepia md:text-2xl">{open.summary}</p>
        <p className="text-[1.0625rem] leading-[1.75] text-foreground">{open.detail}</p>
      </div>
    </motion.div>
  );
}

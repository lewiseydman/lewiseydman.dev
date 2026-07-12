import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import thumb from "@/assets/thumb-disputatio.jpg";
import { cn } from "@/lib/utils";

type Test = {
  id: string;
  num: string;
  title: string;
  domain: string;
  summary: string;
  aspect: string;
  thumb: string;
};

const ROMAN = [
  "I","II","III","IV","V","VI","VII","VIII","IX","X",
  "XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX","XX",
];

const RAW: Array<Omit<Test, "num" | "thumb">> = [
  { id: "weather-glance", title: "Weather, at a glance", domain: "Interface experiment", summary: "A single-screen weather UI built around one decision: should I take a coat?", aspect: "3/4" },
  { id: "loop-motion", title: "An honest loading loop", domain: "Motion study", summary: "A spinner that shows real queue position and pauses when the worker stalls.", aspect: "1/1" },
  { id: "found-typography", title: "Found typography, Lisbon", domain: "Field study", summary: "A week of photographing hand-painted shop signage.", aspect: "4/5" },
  { id: "calm-dashboard", title: "The calm dashboard", domain: "Design critique", summary: "A subtractive redesign — forty-seven widgets down to four.", aspect: "3/2" },
  { id: "icon-grid", title: "A twelve-glyph icon grid", domain: "Iconography", summary: "Stroke, weight, and terminals unified across a small utility set.", aspect: "1/1" },
  { id: "colour-drift", title: "Colour drift in dark mode", domain: "Colour study", summary: "Measuring how neutral greys shift under different accent hues.", aspect: "4/3" },
  { id: "hairline-rules", title: "Hairline rules that survive zoom", domain: "Interface detail", summary: "One-pixel dividers that hold their weight at every DPR.", aspect: "9/16" },
  { id: "modal-hierarchy", title: "Modals without the modal", domain: "Interaction pattern", summary: "Replacing overlays with in-place expansion for lightweight edits.", aspect: "3/4" },
  { id: "form-rhythm", title: "Form rhythm", domain: "Interface study", summary: "Baseline, label, and helper text sitting on a single vertical grid.", aspect: "2/3" },
  { id: "chart-annotation", title: "Charts that annotate themselves", domain: "Data-vis", summary: "Auto-placed callouts on the peaks that actually matter.", aspect: "3/2" },
  { id: "cursor-affordance", title: "The cursor as affordance", domain: "Interaction detail", summary: "Small, contextual cursor changes doing the work of an entire tooltip.", aspect: "1/1" },
  { id: "empty-states", title: "Empty states with agency", domain: "Interface writing", summary: "Turning the blank page into a first prompt, not an apology.", aspect: "4/5" },
  { id: "keyboard-map", title: "A keyboard-first map", domain: "Prototype", summary: "Panning and zoom that never needs the mouse.", aspect: "4/3" },
  { id: "print-poster", title: "Print poster, screen version", domain: "Poster study", summary: "Translating a risograph poster into an accessible web hero.", aspect: "3/4" },
  { id: "scroll-cinema", title: "Scroll-driven cinema", domain: "Motion study", summary: "A short film that advances one frame per hundred pixels.", aspect: "9/16" },
  { id: "audit-trail", title: "The audit trail, humanised", domain: "Enterprise UX", summary: "Turning a JSON firehose into a readable diary.", aspect: "3/2" },
  { id: "onboard-three", title: "Three-screen onboarding", domain: "Interface exercise", summary: "How much can you cut before people stop understanding?", aspect: "2/3" },
  { id: "wayfinding-signs", title: "Wayfinding, indoors", domain: "Field study", summary: "Notes from a hospital's signage system that quietly works.", aspect: "1/1" },
  { id: "typography-scale", title: "One type scale, everywhere", domain: "Design system", summary: "A modular scale audited across marketing, product, and docs.", aspect: "4/5" },
  { id: "notification-mute", title: "The polite notification", domain: "Interaction study", summary: "What happens when a badge waits its turn instead of interrupting.", aspect: "3/4" },
];

const tests: Test[] = RAW.map((t, i) => ({ ...t, num: ROMAN[i], thumb }));

export function Tests() {
  const [openId, setOpenId] = useState<string | null>(null);
  const openIndex = openId ? tests.findIndex((t) => t.id === openId) : -1;
  const open = openIndex >= 0 ? tests[openIndex] : null;

  const close = useCallback(() => setOpenId(null), []);
  const step = useCallback(
    (dir: 1 | -1) => {
      if (openIndex < 0) return;
      const next = (openIndex + dir + tests.length) % tests.length;
      setOpenId(tests[next].id);
    },
    [openIndex],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, step]);

  return (
    <div className="flex flex-col gap-8 md:gap-12">
      <p className="font-display text-2xl leading-snug md:text-3xl">
        <span className="italic text-sepia">Visual explorations and design studies.</span>
      </p>
      <div className="columns-2 gap-3 sm:columns-3 md:gap-4 lg:columns-4">
        {tests.map((t, i) => (
          <motion.button
            key={t.id}
            layoutId={`disputatio-${t.id}`}
            onClick={() => setOpenId(t.id)}
            aria-label={`Open ${t.title}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: Math.min(i, 8) * 0.03 }}
            style={{ aspectRatio: t.aspect }}
            className={cn(
              "group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-sm border border-border bg-card text-left transition-all duration-500 hover:-translate-y-0.5 hover:border-brass hover:shadow-[0_20px_50px_-24px_color-mix(in_oklab,var(--ink)_28%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass md:mb-4",
            )}
          >
            <motion.img
              layoutId={`disputatio-thumb-${t.id}`}
              src={t.thumb}
              alt=""
              className="absolute inset-0 h-full w-full object-cover mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-[1.03] dark:mix-blend-screen"
            />
            <div className="pointer-events-none absolute inset-0 paper-grain opacity-40" />
            <span className="font-mono-mar absolute left-2 top-2 rounded-full border border-parchment/30 bg-ink/50 px-2 py-0.5 text-parchment backdrop-blur-sm">
              {t.num}
            </span>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent p-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:p-4">
              <h3 className="font-display text-sm leading-tight text-parchment md:text-base">{t.title}</h3>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/85 backdrop-blur-sm"
            onClick={close}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-parchment/30 bg-ink/40 text-parchment transition hover:border-brass hover:text-brass"
            >
              <X className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Previous"
              onClick={(e) => { e.stopPropagation(); step(-1); }}
              className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-parchment/30 bg-ink/40 text-parchment transition hover:border-brass hover:text-brass md:left-6"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={(e) => { e.stopPropagation(); step(1); }}
              className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-parchment/30 bg-ink/40 text-parchment transition hover:border-brass hover:text-brass md:right-6"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <motion.div
              key={open.id}
              layoutId={`disputatio-${open.id}`}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[88vh] max-w-[92vw] flex-col overflow-hidden rounded-sm border border-parchment/20 bg-card"
            >
              <motion.img
                layoutId={`disputatio-thumb-${open.id}`}
                src={open.thumb}
                alt={open.title}
                className="max-h-[78vh] max-w-[92vw] object-contain"
              />
              <div className="flex items-center justify-between gap-4 border-t border-parchment/15 bg-ink/60 px-4 py-3 text-parchment">
                <div className="font-mono-mar flex items-center gap-3">
                  <span>{open.num}</span>
                  <span className="hairline h-px w-6" />
                  <span>{open.domain}</span>
                </div>
                <h3 className="font-display truncate text-base italic text-parchment/90 md:text-lg">{open.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

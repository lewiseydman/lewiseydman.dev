import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import fallbackThumb from "@/assets/thumb-disputatio.jpg";

// ─── Per-tile artwork ────────────────────────────────────────────────────────
// Drop real art in when it's ready. Convention:
//   1. Save the file to `src/assets/tests/<id>.jpg` (match the entry `id` below).
//   2. Uncomment the matching import line and swap the entry's `thumb` to it.
//   3. Match the entry's `aspect` when exporting so the masonry rhythm stays.
//   4. For anything >~200KB, run it through `lovable-assets` and import the
//      generated `.asset.json` pointer instead of the raw binary.
//
// Example once art exists:
//   import weatherGlance from "@/assets/tests/weather-glance.jpg";
//   ...
//   { id: "weather-glance", ..., thumb: weatherGlance },

// import weatherGlance from "@/assets/tests/weather-glance.jpg";
// import loopMotion from "@/assets/tests/loop-motion.jpg";
// import foundTypography from "@/assets/tests/found-typography.jpg";
// import calmDashboard from "@/assets/tests/calm-dashboard.jpg";
// import iconGrid from "@/assets/tests/icon-grid.jpg";
// import colourDrift from "@/assets/tests/colour-drift.jpg";
// import hairlineRules from "@/assets/tests/hairline-rules.jpg";
// import modalHierarchy from "@/assets/tests/modal-hierarchy.jpg";
// import formRhythm from "@/assets/tests/form-rhythm.jpg";
// import chartAnnotation from "@/assets/tests/chart-annotation.jpg";
// import cursorAffordance from "@/assets/tests/cursor-affordance.jpg";
// import emptyStates from "@/assets/tests/empty-states.jpg";
// import keyboardMap from "@/assets/tests/keyboard-map.jpg";
// import printPoster from "@/assets/tests/print-poster.jpg";
// import scrollCinema from "@/assets/tests/scroll-cinema.jpg";
// import auditTrail from "@/assets/tests/audit-trail.jpg";
// import onboardThree from "@/assets/tests/onboard-three.jpg";
// import wayfindingSigns from "@/assets/tests/wayfinding-signs.jpg";
// import typographyScale from "@/assets/tests/typography-scale.jpg";
// import notificationMute from "@/assets/tests/notification-mute.jpg";

type Test = {
  id: string;
  title: string;
  aspect: string;
  thumb: string;
};

const tests: Test[] = [
  { id: "weather-glance", title: "Weather, at a glance", aspect: "3/4", thumb: fallbackThumb },
  { id: "loop-motion", title: "An honest loading loop", aspect: "1/1", thumb: fallbackThumb },
  { id: "found-typography", title: "Found typography, Lisbon", aspect: "4/5", thumb: fallbackThumb },
  { id: "calm-dashboard", title: "The calm dashboard", aspect: "3/2", thumb: fallbackThumb },
  { id: "icon-grid", title: "A twelve-glyph icon grid", aspect: "1/1", thumb: fallbackThumb },
  { id: "colour-drift", title: "Colour drift in dark mode", aspect: "4/3", thumb: fallbackThumb },
  { id: "hairline-rules", title: "Hairline rules that survive zoom", aspect: "9/16", thumb: fallbackThumb },
  { id: "modal-hierarchy", title: "Modals without the modal", aspect: "3/4", thumb: fallbackThumb },
  { id: "form-rhythm", title: "Form rhythm", aspect: "2/3", thumb: fallbackThumb },
  { id: "chart-annotation", title: "Charts that annotate themselves", aspect: "3/2", thumb: fallbackThumb },
  { id: "cursor-affordance", title: "The cursor as affordance", aspect: "1/1", thumb: fallbackThumb },
  { id: "empty-states", title: "Empty states with agency", aspect: "4/5", thumb: fallbackThumb },
  { id: "keyboard-map", title: "A keyboard-first map", aspect: "4/3", thumb: fallbackThumb },
  { id: "print-poster", title: "Print poster, screen version", aspect: "3/4", thumb: fallbackThumb },
  { id: "scroll-cinema", title: "Scroll-driven cinema", aspect: "9/16", thumb: fallbackThumb },
  { id: "audit-trail", title: "The audit trail, humanised", aspect: "3/2", thumb: fallbackThumb },
  { id: "onboard-three", title: "Three-screen onboarding", aspect: "2/3", thumb: fallbackThumb },
  { id: "wayfinding-signs", title: "Wayfinding, indoors", aspect: "1/1", thumb: fallbackThumb },
  { id: "typography-scale", title: "One type scale, everywhere", aspect: "4/5", thumb: fallbackThumb },
  { id: "notification-mute", title: "The polite notification", aspect: "3/4", thumb: fallbackThumb },
];

export function Tests() {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = openId ? tests.find((t) => t.id === openId) ?? null : null;
  const close = useCallback(() => setOpenId(null), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <div className="flex flex-col gap-8 md:gap-12">
      <p className="font-display text-2xl leading-snug md:text-3xl">
        <span className="italic text-sepia">Visual explorations and design studies.</span>
      </p>
      <div className="columns-1 gap-3 md:columns-2 md:gap-4 lg:columns-3 xl:columns-4">
        {tests.map((t, i) => (
          <motion.button
            key={t.id}
            type="button"
            layoutId={`disputatio-${t.id}`}
            onClick={() => setOpenId(t.id)}
            aria-label={t.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: Math.min(i, 8) * 0.03 }}
            whileHover={{ scale: 1.03, y: -2 }}
            style={{ aspectRatio: t.aspect }}
            className="relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-sm border border-border bg-card shadow-[0_10px_30px_-20px_color-mix(in_oklab,var(--ink)_25%,transparent)] transition-shadow duration-500 ease-out hover:shadow-[0_24px_60px_-24px_color-mix(in_oklab,var(--ink)_35%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass md:mb-4"
          >
            <motion.img
              layoutId={`disputatio-thumb-${t.id}`}
              src={t.thumb}
              alt={t.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover mix-blend-multiply dark:mix-blend-screen"
            />
            <div className="pointer-events-none absolute inset-0 paper-grain opacity-40" />
            <span
              aria-hidden
              className="pointer-events-none absolute right-2 top-2 flex h-8 w-8 translate-y-1 items-center justify-center rounded-full border border-parchment/30 bg-ink/55 text-parchment opacity-0 shadow-sm backdrop-blur-sm transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 md:right-3 md:top-3"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </span>
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
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={close}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/85 p-4 backdrop-blur-sm md:p-8"
          >
            <motion.div
              key={open.id}
              layoutId={`disputatio-${open.id}`}
              onClick={(e) => e.stopPropagation()}
              transition={{ type: "spring", stiffness: 260, damping: 32, mass: 0.9 }}
              className="relative overflow-hidden rounded-sm border border-parchment/20 bg-card shadow-[0_40px_100px_-30px_rgba(0,0,0,0.5)]"
            >
              <motion.img
                layoutId={`disputatio-thumb-${open.id}`}
                src={open.thumb}
                alt={open.title}
                transition={{ type: "spring", stiffness: 260, damping: 32, mass: 0.9 }}
                className="block max-h-[88vh] max-w-[92vw] object-contain"
              />
              <motion.button
                type="button"
                onClick={close}
                aria-label="Close"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.25, delay: 0.15, ease: "easeOut" }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full border border-parchment/30 bg-ink/60 text-parchment shadow-md backdrop-blur-sm transition-colors hover:border-brass hover:text-brass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass md:right-3 md:top-3 md:h-10 md:w-10"
              >
                <Minimize2 className="h-4 w-4" />
              </motion.button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

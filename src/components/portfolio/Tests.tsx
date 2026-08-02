import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import fallbackThumb from "@/assets/thumb-disputatio.jpg";
import portraitTall from "@/assets/tests/portrait-tall.jpg";
import square from "@/assets/tests/square.jpg";
import wide from "@/assets/tests/wide.jpg";
import tallPoster from "@/assets/tests/tall-poster.jpg";
import panorama from "@/assets/tests/panorama.jpg";
import { cn } from "@/lib/utils";
import { spring, springSnappy, durations, easeOut } from "@/lib/motion";
import { useSectionHash } from "@/hooks/use-section-hash";

// ─── Per-tile artwork ────────────────────────────────────────────────────────
// Drop real art in when it's ready. Convention:
//   1. Save the file to `src/assets/tests/<id>.jpg` (match the entry `id` below).
//   2. Uncomment the matching import line and swap the entry's `thumb` to it.
//   3. Match the entry's `aspect` when exporting so the masonry rhythm stays.
//   4. Assets are bundled by Vite so the static GitHub Pages build can serve
//      them; keep exports reasonably compressed.
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
  thumb: string;
};

const tests: Test[] = [
  { id: "weather-glance", title: "Weather, at a glance", thumb: portraitTall },
  { id: "loop-motion", title: "An honest loading loop", thumb: square },
  { id: "found-typography", title: "Found typography, Lisbon", thumb: wide },
  { id: "calm-dashboard", title: "The calm dashboard", thumb: panorama },
  { id: "icon-grid", title: "A twelve-glyph icon grid", thumb: square },
  { id: "colour-drift", title: "Colour drift in dark mode", thumb: tallPoster },
  { id: "hairline-rules", title: "Hairline rules that survive zoom", thumb: portraitTall },
  { id: "modal-hierarchy", title: "Modals without the modal", thumb: wide },
  { id: "form-rhythm", title: "Form rhythm", thumb: tallPoster },
  { id: "chart-annotation", title: "Charts that annotate themselves", thumb: panorama },
  { id: "cursor-affordance", title: "The cursor as affordance", thumb: square },
  { id: "empty-states", title: "Empty states with agency", thumb: portraitTall },
  { id: "keyboard-map", title: "A keyboard-first map", thumb: wide },
  { id: "print-poster", title: "Print poster, screen version", thumb: tallPoster },
  { id: "scroll-cinema", title: "Scroll-driven cinema", thumb: portraitTall },
  { id: "audit-trail", title: "The audit trail, humanised", thumb: panorama },
  { id: "onboard-three", title: "Three-screen onboarding", thumb: fallbackThumb },
  { id: "wayfinding-signs", title: "Wayfinding, indoors", thumb: square },
  { id: "typography-scale", title: "One type scale, everywhere", thumb: tallPoster },
  { id: "notification-mute", title: "The polite notification", thumb: wide },
];

export function Tests() {
  const reduce = useReducedMotion();
  const { item: openId, openItem, closeItem } = useSectionHash();
  const [closingId, setClosingId] = useState<string | null>(null);
  const open = openId ? (tests.find((t) => t.id === openId) ?? null) : null;
  const close = useCallback(() => {
    if (openId) setClosingId(openId);
    closeItem();
  }, [openId, closeItem]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <div className="flex flex-col gap-8 md:gap-10 lg:gap-12">
      <p className="font-display text-2xl leading-snug md:text-3xl">
        <span className="italic text-sepia">Visual studies and inspiration.</span>
      </p>
      <LayoutGroup>
        <div className="relative z-0 columns-1 gap-3 md:columns-2 md:gap-4 lg:columns-3 xl:columns-3">
          {tests.map((t, i) => {
            const isOpen = openId === t.id;
            const isClosing = closingId === t.id;
            return (
              <motion.button
                key={t.id}
                type="button"
                onClick={() => openItem("disputatio", t.id)}
                aria-label={t.title}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0 : durations.base, delay: reduce ? 0 : Math.min(i, 8) * 0.03, ease: easeOut }}
                whileHover={reduce ? undefined : { scale: 1.03, y: -2 }}
                className={cn(
                  "group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-sm border border-border bg-card shadow-[0_10px_30px_-20px_color-mix(in_oklab,var(--ink)_25%,transparent)] transition-shadow duration-500 ease-out hover:shadow-[0_24px_60px_-24px_color-mix(in_oklab,var(--ink)_35%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass md:mb-4",
                  (isOpen || isClosing) && "z-30"
                )}
              >
                <motion.img
                  layoutId={`disputatio-${t.id}`}
                  onLayoutAnimationComplete={() => {
                    if (closingId === t.id) setClosingId(null);
                  }}
                  transition={reduce ? { duration: 0 } : spring}
                  src={t.thumb}
                  alt={t.title}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full mix-blend-multiply dark:mix-blend-screen"
                />
                <div className="pointer-events-none absolute inset-0 paper-grain opacity-40" />
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-2 top-2 flex h-8 w-8 translate-y-1 items-center justify-center rounded-full border border-parchment/30 bg-ink/55 text-parchment opacity-0 shadow-sm backdrop-blur-sm transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 md:right-3 md:top-3"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                </span>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {open ? (
            <motion.div
              key="lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : durations.base, ease: easeOut }}
              onClick={close}
              className="fixed left-1/2 top-1/2 z-[60] flex h-[88vh] w-[min(96vw,72rem)] -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-sm border border-border bg-ink/85 p-6 backdrop-blur-sm md:p-10 lg:p-14"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative z-50 flex h-full w-full items-center justify-center overflow-hidden"
              >
                <motion.img
                  key={open.id}
                  layoutId={`disputatio-${open.id}`}
                  transition={reduce ? { duration: 0 } : springSnappy}
                  src={open.thumb}
                  alt={open.title}
                  decoding="async"
                  style={{ maxHeight: "100%", maxWidth: "100%", width: "auto", height: "auto" }}
                  className="block rounded-sm border border-parchment/20 bg-card object-contain shadow-[0_40px_100px_-30px_rgba(0,0,0,0.5)]"
                />
                <motion.button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.85 }}
                  animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.85 }}
                  transition={{ duration: reduce ? 0 : durations.fast, delay: reduce ? 0 : 0.15, ease: easeOut }}
                  whileHover={reduce ? undefined : { scale: 1.08 }}
                  whileTap={reduce ? undefined : { scale: 0.92 }}
                  className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full border border-parchment/30 bg-ink/60 text-parchment shadow-md backdrop-blur-sm transition-colors hover:border-brass hover:text-brass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass md:right-3 md:top-3 md:h-10 md:w-10"
                >
                  <Minimize2 className="h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
}

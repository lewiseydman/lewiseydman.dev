import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import thumb from "@/assets/thumb-disputatio.jpg";

type Test = {
  id: string;
  num: string;
  title: string;
  domain: string;
  summary: string;
  detail: string;
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
  },
  {
    id: "loop-motion",
    num: "II",
    title: "An honest loading loop",
    domain: "Motion study",
    summary:
      "Most loading spinners lie. This one shows the actual queue position and animates only when work is happening.",
    detail:
      "A motion experiment exploring what a loading indicator could look like if it were forced to tell the truth. The animation pauses when the worker stalls. Users prefer it; product managers do not.",
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

  return (
    <div className="flex flex-col gap-8">
      <AnimatePresence mode="wait">
        {!open ? (
          <motion.div
            key="index"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-8"
          >
            <p className="font-display text-2xl leading-snug md:text-3xl">
              Small <span className="italic text-sepia">disputationes</span> &mdash; experiments,
              studies, and things I have found beautiful lately.
            </p>
            {/* specimen-sheet gallery — uniform square thumbnails */}
            <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {tests.map((t, i) => (
                <motion.li
                  key={t.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(t.id)}
                    className="group flex h-full w-full flex-col gap-3 text-left"
                  >
                    <div className="relative aspect-square w-full overflow-hidden rounded-sm border border-border bg-card">
                      <img
                        src={thumb}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-[1.03] dark:mix-blend-screen"
                      />
                      <div className="absolute inset-0 blueprint-grid-fine opacity-30 mix-blend-overlay" />
                      <span className="absolute left-2 top-2 rounded-full border border-border bg-background/85 px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-widest text-sepia">
                        {t.domain}
                      </span>
                      <span className="absolute right-2 top-2 font-mono-mar bg-background/85 px-2 py-0.5">
                        № {t.num}
                      </span>
                    </div>
                    <h3 className="font-display text-lg leading-tight tracking-[-0.01em] transition-colors group-hover:text-sepia md:text-xl">
                      {t.title}
                    </h3>
                    <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {t.summary}
                    </p>
                    <div className="mt-1 h-px w-0 bg-sepia transition-all duration-500 group-hover:w-full" />
                  </button>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        ) : (
          <motion.div
            key={open.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col gap-6"
          >
            <button
              type="button"
              onClick={() => setOpenId(null)}
              className="font-mono-mar group flex items-center gap-2 self-start hover:text-foreground"
            >
              <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
              Back to Disputationes
            </button>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-border bg-card">
              <img
                src={thumb}
                alt={open.title}
                className="h-full w-full object-cover mix-blend-multiply dark:mix-blend-screen"
              />
              <div className="absolute inset-0 blueprint-grid-fine opacity-30 mix-blend-overlay" />
            </div>
            <div className="flex flex-col gap-3">
              <div className="font-mono-mar flex items-center gap-3">
                <span>Disputatio · {open.num}</span>
                <span className="hairline h-px w-8" />
                <span>{open.domain}</span>
              </div>
              <h2 className="font-display text-3xl tracking-[-0.01em] md:text-5xl">{open.title}</h2>
              <p className="font-display text-xl italic text-sepia md:text-2xl">{open.summary}</p>
              <p className="mt-2 text-[1.0625rem] leading-[1.75] text-foreground">{open.detail}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
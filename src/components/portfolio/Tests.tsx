import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import thumb from "@/assets/thumb-disputatio.jpg";
import { PopoverSummaryStrip } from "./PopoverSummaryStrip";
import { FolioCard } from "./primitives/FolioCard";
import { DialogSubHeader } from "./primitives/DialogSubHeader";
import { scrollDialogToTop } from "@/lib/scroll-dialog-top";

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
      {!open ? (
        <PopoverSummaryStrip
          label="Disputationes · Featured"
          items={tests.slice(0, 3).map((t) => ({
            kicker: `Disputatio · ${t.num}`,
            title: t.title,
            dek: t.domain,
            thumb,
            onClick: () => openTest(t.id),
          }))}
        />
      ) : null}
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
            <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border lg:grid-cols-2">
              {tests.map((t, i) => (
                <FolioCard
                  key={t.id}
                  onClick={() => openTest(t.id)}
                  ariaLabel={`Open disputatio: ${t.title}`}
                  thumb={thumb}
                  alt=""
                  overlayTopLeft={<>Disputatio · {t.num}</>}
                  overlayTopRight={<>{t.domain}</>}
                  kicker={`Disputatio · ${t.num}`}
                  title={t.title}
                  body={t.summary}
                  index={i}
                />
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
          <span>{open.domain}</span>
        </div>
        <h2 className="font-display text-3xl tracking-[-0.01em] md:text-5xl">{open.title}</h2>
        <p className="font-display text-xl italic text-sepia md:text-2xl">{open.summary}</p>
        <p className="text-[1.0625rem] leading-[1.75] text-foreground">{open.detail}</p>
      </div>
    </motion.div>
  );
}

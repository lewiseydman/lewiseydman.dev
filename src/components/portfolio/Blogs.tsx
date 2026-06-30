import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowUp, ArrowUpRight, Plus } from "lucide-react";
import { useState } from "react";
import thumb from "@/assets/thumb-codex.jpg";
import { PopoverSummaryStrip } from "./PopoverSummaryStrip";

type Blog = {
  id: string;
  date: string;
  title: string;
  dek: string;
  read: string;
  tags: string[];
  body: string[];
};

const blogs: Blog[] = [
  {
    id: "draftsman",
    date: "MMXXVI · iii",
    title: "The product manager as draftsman",
    dek: "On sketching as the first technical decision, not the last design polish.",
    read: "7 min",
    tags: ["craft", "process"],
    body: [
      "There is a particular moment in the life of every product where the team looks up from the spreadsheet and asks, almost in unison, what are we actually building. The good answer, in my experience, is never a paragraph. It is a drawing.",
      "The Renaissance workshops understood this. A cathedral did not begin with a budget; it began with a chalk line on a plaster wall. The line forced commitment in a way that words could not. It said: this column will stand here, and not three feet to the left, and the consequences will be load-bearing.",
      "Modern product work has, for the most part, forgotten this. We write briefs and PRDs and one-pagers, and we treat the eventual sketch as the designer's job — an artefact downstream of strategy. I want to argue the opposite. The sketch is the strategy. Everything else is annotation.",
      "When I draw a screen on the first day of a project, I am not designing an interface. I am running a small, cheap, embarrassing simulation of the entire system. The drawing tells me what data the screen will need. The data tells me what services must exist. The services tell me what the team must know. By the time I have a recognisable rectangle on the page, I have already made a dozen architectural commitments that would have taken six weeks of meetings to surface in prose.",
      "This is not an argument for designers as PMs, or PMs as designers. It is an argument for the pencil as the first technical tool of a product team. Treat the act of drawing the thing as the senior decision. Everything else — the framework, the database, the org chart — bends toward the line on the page.",
    ],
  },
  {
    id: "small-surfaces",
    date: "MMXXVI · i",
    title: "Notes on small surfaces",
    dek: "Why most operator tools collapse under the weight of their own dashboards.",
    read: "5 min",
    tags: ["design", "b2b"],
    body: [
      "Show me an internal tool that has been alive for three years and I will show you a dashboard with forty-seven widgets, of which the operator looks at four. The other forty-three are not features. They are sediment.",
      "The instinct, when something goes wrong, is to add a panel. A new metric, a new filter, a new tab. Each addition is locally correct — somebody, somewhere, asked for it — and globally ruinous. The surface gets larger, the signal gets quieter, and the operator learns, slowly, to trust their gut over the tool.",
      "I have come to think of operator interfaces the way a watchmaker thinks of a dial face. Every mark on the dial costs the eye something. The question is not what could go on the dial. The question is what earns the right to remain.",
      "The best small surfaces I have shipped were the result of subtraction, not addition. We did not ask the team what they wanted to see. We asked them what they would be willing to lose. The answers were unanimous, immediate, and almost always the same things we had spent the previous quarter building.",
    ],
  },
  {
    id: "hyphen",
    date: "MMXXV · xi",
    title: "Hiring for the hyphen",
    dek: "Designer-engineers, engineer-PMs, and the case against the pure specialist.",
    read: "6 min",
    tags: ["teams", "hiring"],
    body: [
      "The first time I hired a designer-engineer the rest of the team thought I was being cute. By the end of the quarter the joke had stopped. She had shipped two features that the previous configuration of the team — a separate designer, a separate engineer, a PM in between — had failed to ship in six months.",
      "The trick was not that she was twice as productive. The trick was that the conversation she had with herself was free. The conversation between two specialists is never free. It costs meetings, mockups, redlines, follow-ups, and a slow attrition of intent as the work passes between hands.",
      "I do not believe specialists are obsolete. I believe they are precious, and that the right place to spend them is where the work is genuinely deep — a database engine, a typography system, a clinical-grade interaction. Most product surfaces are not that. Most product surfaces are knitting, and knitting wants one pair of hands.",
      "Hire the hyphen when the work is broad and shallow. Hire the specialist when the work is narrow and deep. Get the diagnosis wrong, in either direction, and the work suffers.",
    ],
  },
  {
    id: "platform-shrug",
    date: "MMXXV · viii",
    title: "Against the platform shrug",
    dek: "A short essay on owning the runtime, even when the cloud is convenient.",
    read: "4 min",
    tags: ["engineering"],
    body: [
      "The platform shrug is the small, defeated gesture a team makes when they are told that some piece of behaviour they care about is, alas, the platform's problem. It is the gesture of a team that has stopped owning the runtime.",
      "Cloud platforms are wonderful. They are also a slow anaesthetic. The more comfortable you become with the abstractions, the less you remember that there is a machine somewhere doing the actual work — and the less likely you are to notice when the machine is doing it badly on your behalf.",
      "I am not arguing for ripping out the cloud. I am arguing for keeping a small, unsentimental map of what the cloud is doing for you, and what it is doing to you. The teams I most admire treat their platform the way a good driver treats a car they did not build. They cannot rebuild the engine. They can, absolutely, hear when something has changed.",
    ],
  },
];

export function Blogs() {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = blogs.find((b) => b.id === openId) ?? null;

  const [hero, ...rest] = blogs;
  const INITIAL_ARCHIVE = 2;
  const [archiveCount, setArchiveCount] = useState(INITIAL_ARCHIVE);
  const visibleRest = rest.slice(0, archiveCount);
  const remaining = rest.length - visibleRest.length;

  return (
    <div className="flex flex-col gap-10">
      <PopoverSummaryStrip
        label="Codex · featured"
        items={blogs.slice(0, 3).map((b) => ({
          kicker: b.date,
          title: b.title,
          dek: `${b.read} · ${b.tags.join(" · ")}`,
          thumb,
          onClick: () => setOpenId(b.id),
        }))}
      />

      <AnimatePresence mode="wait">
        {!open ? (
          <motion.div
            key="index"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-12"
          >
            {/* Editorial header */}
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-4">
              <div className="flex items-baseline gap-4">
                <span className="font-mono-mar">№ Codex · Vol. I</span>
                <span className="hairline h-px w-12" />
                <span className="font-mono-mar">Essays from the workshop</span>
              </div>
              <span className="font-mono-mar">{blogs.length} entries</span>
            </div>

            {/* Hero feature */}
            <motion.button
              type="button"
              onClick={() => setOpenId(hero.id)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group grid w-full gap-8 text-left md:grid-cols-[1.1fr_1fr] md:items-center"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-border bg-card md:aspect-[5/4]">
                <img
                  src={thumb}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-[1.02] dark:mix-blend-screen"
                />
                <div className="absolute inset-0 blueprint-grid-fine opacity-30 mix-blend-overlay" />
                <div className="absolute left-3 top-3 font-mono-mar bg-background/85 px-2 py-0.5">
                  Feature · {hero.date}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <span className="font-mono-mar">Lewis Eydman · {hero.read}</span>
                <h2 className="font-display text-4xl leading-[1.05] tracking-[-0.015em] transition-colors group-hover:text-sepia md:text-5xl">
                  {hero.title}
                </h2>
                <p className="font-display text-xl italic text-sepia md:text-2xl">{hero.dek}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {hero.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="font-mono-mar mt-2 inline-flex items-center gap-2 text-sepia transition-colors group-hover:text-foreground">
                  Read essay
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </motion.button>

            {/* Archive list */}
            <section className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="font-mono-mar">Archivum · earlier folios</span>
                <span className="hairline h-px flex-1" />
              </div>
              <ul className="flex flex-col">
                {visibleRest.map((b, i) => (
                  <motion.li
                    key={b.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="border-t border-border last:border-b"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenId(b.id)}
                      className="group grid w-full grid-cols-[2.5rem_5.5rem_1fr_auto] items-baseline gap-4 py-5 text-left transition-colors hover:bg-sepia/[0.04] md:grid-cols-[3rem_7rem_1fr_5rem_8rem]"
                    >
                      <span className="font-mono-mar text-sepia">
                        № {String(i + 2).padStart(2, "0")}
                      </span>
                      <span className="font-mono-mar">{b.date}</span>
                      <span className="flex min-w-0 flex-col gap-1">
                        <span className="font-display text-2xl leading-tight tracking-[-0.005em] transition-colors group-hover:text-sepia md:text-3xl">
                          {b.title}
                        </span>
                        <span className="truncate text-sm leading-snug text-muted-foreground">
                          {b.dek}
                        </span>
                      </span>
                      <span className="font-mono-mar hidden md:inline">{b.read}</span>
                      <span className="hidden justify-end gap-1.5 md:flex">
                        {b.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-border px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>
              {remaining > 0 && (
                <div className="flex items-center gap-3 pt-2">
                  <span className="hairline h-px flex-1" />
                  <button
                    type="button"
                    onClick={() =>
                      setArchiveCount((c) => Math.min(c + 3, rest.length))
                    }
                    className="font-mono-mar group inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sepia transition-colors hover:border-sepia/60 hover:bg-sepia/[0.04] hover:text-foreground"
                  >
                    <Plus className="h-3 w-3 transition-transform group-hover:rotate-90" />
                    Reveal {Math.min(3, remaining)} earlier folio
                    {Math.min(3, remaining) === 1 ? "" : "s"}
                    <span className="text-muted-foreground">· {remaining} remaining</span>
                  </button>
                  <span className="hairline h-px flex-1" />
                </div>
              )}
            </section>
          </motion.div>
        ) : (
          <motion.article
            key={open.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="grid gap-10 md:grid-cols-[14rem_1fr]"
          >
            {/* Editorial sidebar */}
            <aside className="flex flex-col gap-5 md:sticky md:top-2 md:self-start md:border-r md:border-border md:pr-6">
              <button
                type="button"
                onClick={() => setOpenId(null)}
                className="font-mono-mar group flex items-center gap-2 self-start hover:text-foreground"
              >
                <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
                Back to Codex
              </button>
              <div className="flex flex-col gap-1">
                <span className="font-mono-mar">Author</span>
                <span className="font-display text-base">Lewis Eydman</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono-mar">Published</span>
                <span className="font-display text-base">{open.date}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono-mar">Length</span>
                <span className="font-display text-base">{open.read}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-mono-mar">Tags</span>
                <div className="flex flex-wrap gap-1.5">
                  {open.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href="#top"
                className="font-mono-mar mt-2 inline-flex items-center gap-2 text-sepia hover:text-foreground"
              >
                <ArrowUp className="h-3 w-3" /> Back to top
              </a>
            </aside>

            {/* Body */}
            <div className="flex max-w-[64ch] flex-col gap-7">
              <header className="flex flex-col gap-3 border-b border-border pb-6">
                <span className="font-mono-mar">Essay · {open.date}</span>
                <h1 className="font-display text-4xl leading-[1.05] tracking-[-0.015em] md:text-5xl">
                  {open.title}
                </h1>
                <p className="font-display text-xl italic text-sepia md:text-2xl">{open.dek}</p>
              </header>
              {open.body.map((p, i) => {
                // Pull-quote treatment on every third paragraph (after the first)
                const isPull = i > 0 && i % 3 === 0;
                if (isPull) {
                  return (
                    <blockquote
                      key={i}
                      className="my-2 border-l-2 border-sepia/60 pl-5 font-display text-2xl italic leading-snug text-foreground md:text-3xl"
                    >
                      {p}
                    </blockquote>
                  );
                }
                return (
                  <p
                    key={i}
                    className={
                      "text-[1.0625rem] leading-[1.8] text-foreground " +
                      (i === 0
                        ? "first-letter:font-display first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:leading-[0.9] first-letter:text-sepia"
                        : "")
                    }
                  >
                    {p}
                  </p>
                );
              })}
              <div className="hairline mt-4 h-px w-full" />
              <p className="font-mono-mar self-center">&mdash; Fin &mdash;</p>
            </div>
          </motion.article>
        )}
      </AnimatePresence>
    </div>
  );
}
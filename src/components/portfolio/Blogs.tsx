import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import thumb from "@/assets/thumb-codex.jpg";

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
  const [lead, ...rest] = blogs;

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
            className="flex flex-col gap-10"
          >
            <p className="font-display text-2xl leading-snug md:text-3xl">
              Essays from the workshop &mdash;{" "}
              <span className="italic text-sepia">on craft, teams, and the long view.</span>
            </p>

            {/* lead article — magazine-style featured */}
            <motion.button
              type="button"
              onClick={() => setOpenId(lead.id)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group grid gap-6 rounded-sm border border-border bg-background p-6 text-left transition-colors hover:bg-card md:grid-cols-[1.1fr_1fr] md:gap-10 md:p-8"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-border bg-card">
                <img
                  src={thumb}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-[1.03] dark:mix-blend-screen"
                />
                <div className="absolute inset-0 blueprint-grid-fine opacity-30 mix-blend-overlay" />
                <div className="absolute left-2 top-2 font-mono-mar bg-background/80 px-2 py-0.5">
                  Lead · Folio 01
                </div>
              </div>
              <div className="flex flex-col justify-center gap-4">
                <div className="font-mono-mar flex items-center gap-3">
                  <span>{lead.date}</span>
                  <span className="hairline h-px w-6" />
                  <span>{lead.read}</span>
                </div>
                <h3 className="font-display text-3xl leading-tight tracking-[-0.015em] transition-colors group-hover:text-sepia md:text-5xl">
                  {lead.title}
                </h3>
                <p className="font-display text-lg italic text-sepia md:text-xl">{lead.dek}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {lead.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>

            {/* secondary grid */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <span className="font-mono-mar">Et cetera · More from the codex</span>
                <span className="hairline h-px flex-1" />
              </div>
              <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2">
                {rest.map((b, i) => (
                  <motion.button
                    key={b.id}
                    type="button"
                    onClick={() => setOpenId(b.id)}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="group flex flex-col gap-3 bg-background p-6 text-left transition-colors hover:bg-card"
                  >
                    <div className="font-mono-mar flex items-center justify-between">
                      <span>Folio · {String(i + 2).padStart(2, "0")}</span>
                      <span>{b.read}</span>
                    </div>
                    <h3 className="font-display text-xl leading-tight tracking-[-0.01em] transition-colors group-hover:text-sepia md:text-2xl">
                      {b.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{b.dek}</p>
                    <div className="mt-auto flex flex-wrap gap-2 pt-2">
                      {b.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-border px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="h-px w-0 bg-sepia transition-all duration-500 group-hover:w-full" />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.article
            key={open.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="mx-auto flex w-full max-w-2xl flex-col gap-8"
          >
            <button
              type="button"
              onClick={() => setOpenId(null)}
              className="font-mono-mar group flex items-center gap-2 self-start hover:text-foreground"
            >
              <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
              Back to Codex
            </button>
            <header className="flex flex-col gap-3 border-b border-border pb-6">
              <div className="font-mono-mar flex items-center gap-3">
                <span>{open.date}</span>
                <span className="hairline h-px w-8" />
                <span>{open.read}</span>
              </div>
              <h1 className="font-display text-4xl leading-[1.05] tracking-[-0.015em] md:text-5xl">
                {open.title}
              </h1>
              <p className="font-display text-xl italic text-sepia md:text-2xl">{open.dek}</p>
            </header>
            <div className="flex flex-col gap-6 text-[1.0625rem] leading-[1.8] text-foreground">
              {open.body.map((p, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "first-letter:font-display first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:leading-[0.9] first-letter:text-sepia"
                      : ""
                  }
                >
                  {p}
                </p>
              ))}
            </div>
            <div className="hairline mt-4 h-px w-full" />
            <p className="font-mono-mar self-center">&mdash; Fin &mdash;</p>
          </motion.article>
        )}
      </AnimatePresence>
    </div>
  );
}
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ArrowUpRight, Loader2, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import defaultThumb from "@/assets/thumb-codex.jpg";
import { PopoverSummaryStrip } from "./PopoverSummaryStrip";
import { useExpandWithLoading } from "@/hooks/use-expand-with-loading";
import { scrollDialogToTop } from "@/lib/scroll-dialog-top";
import { FolioCard } from "./primitives/FolioCard";
import { TagPill } from "./primitives/TagPill";
import { ReadingProgressBar } from "./primitives/ReadingProgressBar";
import { pillButtonClasses } from "./primitives/pillButton";
import { IconPillButton } from "./primitives/IconPillButton";
import { DialogSubHeader } from "./primitives/DialogSubHeader";
import { SectionLabel } from "./primitives/SectionLabel";
import { useSectionHash } from "@/hooks/use-section-hash";
import { useThrottledScroll } from "@/hooks/use-throttled-scroll";

type Blog = {
  id: string;
  date: string;
  title: string;
  dek: string;
  read: string;
  tags: string[];
  body: string[];
  thumb?: string;
};

const blogs: Blog[] = [
  {
    id: "draftsman",
    date: "MMXXVI · iii",
    title: "The product engineer as draftsman",
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
  const { item: hashItem, openItem, closeItem } = useSectionHash();
  const openId = hashItem && blogs.some((b) => b.id === hashItem) ? hashItem : null;
  const open = blogs.find((b) => b.id === openId) ?? null;
  const openBlog = (id: string) => {
    openItem("codex", id);
    scrollDialogToTop();
  };
  const back = () => closeItem();

  const [hero, ...rest] = blogs;
  const INITIAL_ARCHIVE = 2;
  const [archiveCount, setArchiveCount] = useState(INITIAL_ARCHIVE);
  const visibleRest = rest.slice(0, archiveCount);
  const remaining = rest.length - visibleRest.length;
  const { isLoading: isRevealing, trigger: triggerReveal } = useExpandWithLoading();

  const heroTriggerRef = useRef<HTMLButtonElement>(null);
  const restTriggers = useRef<Record<string, HTMLButtonElement | null>>({});
  const prevOpenId = useRef<string | null>(null);

  useEffect(() => {
    if (prevOpenId.current && !openId) {
      const prevId = prevOpenId.current;
      const trigger = prevId === hero.id ? heroTriggerRef.current : restTriggers.current[prevId];
      trigger?.focus();
    }
    prevOpenId.current = openId;
  }, [openId, hero.id]);

  return (
    <div className="flex flex-col gap-8 md:gap-12">
      {open ? <ReadingProgressBar /> : null}
      {!open ? (
        <PopoverSummaryStrip
          label="Featured"
          items={blogs.slice(0, 3).map((b) => ({
            kicker: b.date,
            title: b.title,
            dek: `${b.read} · ${b.tags.join(" · ")}`,
            thumb: b.thumb ?? defaultThumb,
            onClick: () => openBlog(b.id),
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
            className="flex flex-col gap-10 md:gap-12"
          >
            {/* Hero feature — article semantics with a proper CTA */}
            <motion.article
              aria-labelledby={`codex-hero-${hero.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group grid w-full gap-5 text-left sm:gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-8"
            >
              <button
                type="button"
                ref={heroTriggerRef}
                onClick={() => openBlog(hero.id)}
                aria-label={`Read essay: ${hero.title}`}
                className="relative aspect-[16/10] overflow-hidden rounded-sm border border-border bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sepia/40 lg:aspect-[5/4]"
              >
                <img
                  src={hero.thumb ?? defaultThumb}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-[1.02] dark:mix-blend-screen"
                />
                <div aria-hidden className="absolute inset-0 blueprint-grid-fine opacity-30 mix-blend-overlay" />
                <div className="absolute left-3 top-3 font-mono-mar bg-background/85 px-2 py-0.5">
                  Feature · {hero.date}
                </div>
              </button>
              <div className="flex flex-col gap-3 sm:gap-4">
                <span className="font-mono-mar">Lewis Eydman · {hero.read}</span>
                <h3
                  id={`codex-hero-${hero.id}`}
                  className="font-display text-2xl leading-[1.05] tracking-[-0.015em] sm:text-3xl md:text-4xl lg:text-5xl"
                >
                  <button
                    type="button"
                    onClick={() => openBlog(hero.id)}
                    className="text-left transition-colors hover:text-sepia focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sepia/40"
                  >
                    {hero.title}
                  </button>
                </h3>
                <p className="font-display text-base italic text-sepia sm:text-lg md:text-xl lg:text-2xl">{hero.dek}</p>
                <div className="flex flex-wrap gap-2">
                  {hero.tags.map((t) => (
                    <TagPill key={t}>{t}</TagPill>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => openBlog(hero.id)}
                  className={pillButtonClasses("primary", "self-start")}
                >
                  Read essay
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
                </button>
              </div>
            </motion.article>

            {/* Archive list */}
            <section className="flex flex-col gap-4">
              <SectionLabel>Earlier folios · Archivum</SectionLabel>
              <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border md:gap-px lg:grid-cols-2">
                {visibleRest.map((b, i) => {
                  const isLast = i === visibleRest.length - 1;
                  const isOddLast = isLast && visibleRest.length % 2 === 1;
                  return (
                    <FolioCard
                      key={b.id}
                      ref={(el) => {
                        restTriggers.current[b.id] = el;
                      }}
                      onClick={() => openBlog(b.id)}
                      ariaLabel={`Read essay: ${b.title}`}
                      thumb={b.thumb ?? defaultThumb}
                      alt=""
                      overlayTopLeft={<>№ {String(i + 2).padStart(2, "0")}</>}
                      overlayTopRight={<>{b.read}</>}
                      kicker={b.date}
                      title={b.title}
                      body={b.dek}
                      footer={
                        <div className="flex flex-wrap gap-1.5">
                          {b.tags.map((t) => (
                            <TagPill key={t}>{t}</TagPill>
                          ))}
                        </div>
                      }
                      index={i}
                      className={isOddLast ? "lg:col-span-2" : ""}
                    />
                  );
                })}
              </div>
              {remaining > 0 && (
                <div className="flex items-center gap-3">
                  <span className="hairline h-px flex-1" />
                  <button
                    type="button"
                    disabled={isRevealing}
                    onClick={() => triggerReveal(() => setArchiveCount((c) => Math.min(c + 3, rest.length)))}
                    className={pillButtonClasses("ghost")}
                  >
                    {isRevealing ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <Plus className="h-3 w-3 transition-transform group-hover:rotate-90" />
                    )}
                    Reveal {Math.min(3, remaining)} earlier folio
                    {Math.min(3, remaining) === 1 ? "" : "s"}
                    <span className="hidden text-muted-foreground sm:inline">· {remaining} remaining</span>
                  </button>
                  <span className="hairline h-px flex-1" />
                </div>
              )}
            </section>
          </motion.div>
        ) : (
          <Essay key={open.id} post={open} onBack={back} />
        )}
      </AnimatePresence>
    </div>
  );
}

function Essay({ post, onBack }: { post: Blog; onBack: () => void }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [scroller, setScroller] = useState<HTMLElement | null>(null);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    // Focus the article title on open for screen-reader flow.
    titleRef.current?.focus();
    // Find the dialog scroll container.
    const el = document.querySelector<HTMLElement>("[data-dialog-scroll]");
    setScroller(el);
    scrollDialogToTop();
  }, []);

  useThrottledScroll(scroller, (top) => setShowTopBtn(top > 600), [scroller]);

  const scrollToTop = () => scroller?.scrollTo({ top: 0, behavior: "smooth" });

  const canPullQuote = post.body.length >= 6;

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col gap-8 md:gap-12"
    >
      <DialogSubHeader onBack={onBack} backLabel="Back to Codex" right={<>{post.date}</>} />

      {/* Meta strip — single horizontal line above the body */}
      <div className="font-mono-mar flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-border pb-3">
        <span>Lewis Eydman</span>
        <span className="text-muted-foreground/60">·</span>
        <span>{post.read}</span>
        {post.tags.length ? (
          <>
            <span className="text-muted-foreground/60">·</span>
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((t) => (
                <TagPill key={t}>{t}</TagPill>
              ))}
            </div>
          </>
        ) : null}
      </div>

      {/* Body */}
      <div className="mx-auto flex w-full max-w-[68ch] flex-col gap-7">
        <header className="flex flex-col gap-3 border-b border-border pb-6">
          <h3
            ref={titleRef}
            tabIndex={-1}
            className="font-display text-3xl leading-[1.05] tracking-[-0.015em] focus:outline-none sm:text-4xl md:text-5xl"
          >
            {post.title}
          </h3>
          <p className="font-display text-lg italic text-sepia sm:text-xl md:text-2xl">{post.dek}</p>
        </header>
        {post.body.map((p, i) => {
          // Only pull-quote longer essays, and never the first or last paragraph.
          const isPull = canPullQuote && i > 0 && i < post.body.length - 1 && i % 3 === 0;
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

      {showTopBtn ? (
        <IconPillButton
          variant="primary"
          label="Back to top of post"
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6"
        >
          <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
        </IconPillButton>
      ) : null}
    </motion.article>
  );
}

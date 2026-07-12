import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, ExternalLink, Loader2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import defaultThumb from "@/assets/thumb-opera.jpg";
import { PopoverSummaryStrip } from "./PopoverSummaryStrip";
import { useExpandWithLoading } from "@/hooks/use-expand-with-loading";
import { scrollDialogToTop } from "@/lib/scroll-dialog-top";
import { FolioCard } from "./primitives/FolioCard";
import { TagPill, TagPillRow } from "./primitives/TagPill";
import { ReadingProgressBar } from "./primitives/ReadingProgressBar";
import { pillButtonClasses } from "./primitives/pillButton";
import { DialogSubHeader } from "./primitives/DialogSubHeader";
import { useSectionHash } from "@/hooks/use-section-hash";

type Project = {
  id: string;
  num: string;
  title: string;
  role: string;
  year: string;
  outcome: string;
  blurb: string;
  tags: string[];
  notebook: string;
  liveUrl?: string;
  thumb?: string;
};

const projects: Project[] = [
  {
    id: "helios",
    num: "I",
    title: "Helios Console",
    role: "Lead Product · Design Systems",
    year: "2025",
    outcome: "Cut onboarding time by 64%",
    blurb:
      "An operator console for solar-fleet engineers. Rebuilt around a typed event stream and a single canvas of asset health.",
    tags: ["B2B", "React", "Real-time"],
    notebook: [
      "Context — Helios runs a fleet of utility-scale solar sites. The legacy console had grown into a Christmas tree of dashboards — forty-seven widgets, no shared ontology, and a six-week onboarding ramp for new operators.",
      "Role — Lead PM with a hand on the design tools. Embedded with two engineers for the first quarter, then handed off as the team scaled.",
      "Challenge — Reduce the time-to-first-meaningful-action for a new operator without removing capability for the veterans who liked the old console.",
      "Approach — Reframed the surface around the operator's actual decision tree, not the underlying microservice graph. Built a single canvas of asset health, with optional drill-downs gated behind a 'workshop' mode for power users.",
      "Discovery — Two weeks of ride-alongs with operators in three regions. Mapped the actual decision tree on paper before any pixel work — what they reached for in the first thirty seconds of an alert, what they ignored.",
      "Architecture — Replaced the polled REST surface with a typed event stream. The frontend became a derived projection of that stream, which made the 'live canvas' affordable to build and reason about.",
      "What I'd do differently — Shipped the 'workshop' mode too late. The veterans spent three weeks unhappy before they discovered the escape hatch was sitting behind a keystroke.",
    ].join("\n\n"),
    liveUrl: "https://example.com/helios",
  },
  {
    id: "atlas",
    num: "II",
    title: "Atlas Maps",
    role: "PM · Prototyping",
    year: "2024",
    outcome: "+1.2M MAU in twelve months",
    blurb:
      "Consumer mapping app rebuilt as a personal atlas. Hand-rolled vector tiles and a writing surface for cartographic notes.",
    tags: ["Consumer", "Maps", "iOS"],
    notebook: [
      "Context — Atlas had been positioned as a 'better Google Maps'. It was not. We pivoted to a personal atlas — a place for the user's own places, routes, and notes, on top of a competent but unambitious map.",
      "Role — PM and prototyper. I built the first version of the note surface in SwiftUI over a weekend; the team then made it production-grade.",
      "Challenge — Find a wedge in a market dominated by two free incumbents with infinite distribution.",
      "Approach — Stopped competing on coverage and started competing on memory. The map remembered where you had been, what you had written about it, and surfaced it at the right moment.",
      "Positioning — The pivot rested on a single research finding: people who already had a 'mapping app' still kept their meaningful places in a notes app. We didn't need to beat Maps — we needed to beat Notes.",
      "Cartography — Hand-rolled vector tile pipeline so the map style could be ours. Two iterations to find a treatment that read as 'a personal notebook' rather than 'a software map'.",
    ].join("\n\n"),
    liveUrl: "https://example.com/atlas",
  },
  {
    id: "aviary",
    num: "III",
    title: "Aviary",
    role: "Founder · Design & Engineering",
    year: "2023",
    outcome: "Acquired, post YC W23",
    blurb:
      "A scheduling primitive for asynchronous teams. The interface was a notebook; the engine was a borrowed flight-machine principle.",
    tags: ["SaaS", "Workflow"],
    notebook: [
      "Context — Async teams keep reinventing scheduling, badly. We built a primitive — a small, opinionated, embeddable scheduler — that other tools could lean on instead of building their own.",
      "Role — Founder. Designed, built, and sold the first hundred customers myself before hiring.",
      "Challenge — Convince teams to adopt a primitive when the market wanted a full product.",
      "Approach — Sold to engineers, not buyers. Shipped a CLI before the dashboard. Wrote the docs as essays. The product was the documentation.",
      "Go-to-market — Founder-led sales, low-volume, high-trust. The CLI was the demo. The docs were the brochure. No marketing site until month nine.",
      "The acquisition — Two acquirers, opposite strategies. We picked the one that wanted to keep the primitive as a primitive, not absorb it into a suite.",
    ].join("\n\n"),
    liveUrl: "https://example.com/aviary",
  },
  {
    id: "specimen",
    num: "IV",
    title: "Specimen",
    role: "PM · Research",
    year: "2022",
    outcome: "Adopted by 7 research labs",
    blurb:
      "A microscopy review tool. Built a custom annotation surface that taught itself the vocabulary of pathologists.",
    tags: ["Health", "ML", "Tooling"],
    notebook: [
      "Context — Pathologists were drowning in unannotated microscopy. The off-the-shelf tools assumed a software user; pathologists are clinicians who tolerate software.",
      "Role — PM, with a strong opinion about the annotation surface.",
      "Challenge — Build a tool that respected an existing decades-old vocabulary, without forcing the pathologists to teach the software from scratch.",
      "Approach — Trained a small model on the labs' own historical labels. The tool learned each lab's local dialect and gradually moved annotation work from labelling to confirming.",
      "Model choice — A small per-lab model beat a large generalist one in every blind trial. The dialect mattered more than the size of the corpus.",
      "Clinical trust — Every suggestion the tool made could be traced back to three historical examples from the lab's own archive. Trust came from provenance, not accuracy alone.",
    ].join("\n\n"),
  },
];

export function SelectedWork() {
  const { item: hashItem, openItem, closeItem } = useSectionHash();
  const openId = hashItem && projects.some((p) => p.id === hashItem) ? hashItem : null;
  const open = projects.find((p) => p.id === openId) ?? null;
  const triggersRef = useRef<Record<string, HTMLButtonElement | null>>({});
  const prevOpenId = useRef<string | null>(null);

  const openProject = (id: string) => {
    openItem("opera", id);
    scrollDialogToTop();
  };
  const back = () => closeItem();

  // Restore focus to the triggering card when a project is closed.
  useEffect(() => {
    if (prevOpenId.current && !openId) {
      const trigger = triggersRef.current[prevOpenId.current];
      trigger?.focus();
    }
    prevOpenId.current = openId;
  }, [openId]);

  return (
    <div className="flex flex-col gap-8 md:gap-12">
      {open ? <ReadingProgressBar /> : null}
      {!open ? (
        <PopoverSummaryStrip
          label="Featured"
          items={projects.slice(0, 3).map((p) => ({
            kicker: `Opus · ${p.num}`,
            title: p.title,
            dek: p.role,
            thumb: p.thumb ?? defaultThumb,
            onClick: () => openProject(p.id),
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
              Case studies &mdash;{" "}
              <span className="italic text-sepia">products built, shipped, and learned from.</span>
            </p>
            <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2">
              {projects.map((p, i) => (
                <FolioCard
                  key={p.id}
                  ref={(el) => {
                    triggersRef.current[p.id] = el;
                  }}
                  onClick={() => openProject(p.id)}
                  ariaLabel={`Open case study: ${p.title}`}
                  thumb={p.thumb ?? defaultThumb}
                  alt=""
                  overlayTopLeft={<>Opus · {p.num}</>}
                  overlayTopRight={<>{p.year}</>}
                  kicker={p.role}
                  title={p.title}
                  body={p.blurb}
                  footer={
                    <>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-mono-mar">Outcome</span>
                        <span className="font-display italic text-sepia">{p.outcome}</span>
                      </div>
                      <TagPillRow tags={p.tags} />
                    </>
                  }
                  index={i}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <CaseStudy key={open.id} project={open} onBack={back} />
        )}
      </AnimatePresence>
    </div>
  );
}

function CaseStudy({ project, onBack }: { project: Project; onBack: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { isLoading: isExpanding, trigger: triggerExpand } = useExpandWithLoading();
  const paragraphs = useMemo(
    () => project.notebook.split(/\n\s*\n/).filter((p) => p.trim().length > 0),
    [project.notebook],
  );

  useEffect(() => {
    scrollDialogToTop();
  }, []);

  // Detect overflow relative to the collapsed cap. Runs on mount + on window
  // resize — no ResizeObserver needed since the collapsed cap is a fixed rem.
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const check = () => {
      // Collapsed cap is 22rem (see .notebook-collapsed below).
      const cap = 22 * 16;
      setOverflows(el.scrollHeight > cap + 8);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [paragraphs]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col gap-8 md:gap-12"
    >
      <DialogSubHeader
        onBack={onBack}
        backLabel="Back to Opera"
        right={
          <>
            <span className="hidden sm:inline">Opus · {project.num}</span>
            <span className="hairline hidden h-px w-6 sm:inline-block" />
            <span className="truncate">{project.title}</span>
          </>
        }
      />

      <header className="flex flex-col gap-3 border-b border-border pb-6">
        {/* Meta row: single horizontal line at every breakpoint */}
        <div className="font-mono-mar flex flex-wrap items-center gap-x-2 gap-y-1">
          <span>Opus · {project.num}</span>
          <span className="text-muted-foreground/60">·</span>
          <span>{project.year}</span>
          <span className="text-muted-foreground/60">·</span>
          <span>{project.role}</span>
        </div>
        <h3 className="font-display text-[1.75rem] leading-[1.05] tracking-[-0.015em] sm:text-4xl md:text-5xl">
          {project.title}
        </h3>
        <p className="font-display text-base italic text-sepia sm:text-lg md:text-xl">{project.blurb}</p>
      </header>
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm border border-border bg-card">
        <img
          src={project.thumb ?? defaultThumb}
          alt={`${project.title} — hero visual`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover mix-blend-multiply dark:mix-blend-screen"
        />
        <div aria-hidden className="absolute inset-0 blueprint-grid-fine opacity-30 mix-blend-overlay" />
      </div>
      {/* Caption strip: mobile-first three-row grid; single row on sm+ */}
      <div className="grid gap-4 border-t border-border pt-6 sm:flex sm:flex-wrap sm:items-end sm:justify-between sm:gap-6">
        <div className="flex flex-col">
          <span className="font-mono-mar">Outcome</span>
          <span className="font-display text-2xl italic text-sepia">{project.outcome}</span>
        </div>
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className={pillButtonClasses("primary", "self-start sm:self-end")}
          >
            Visit live product
            <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        ) : null}
        <div className="flex flex-wrap gap-2 sm:justify-end">
          {project.tags.map((t) => (
            <TagPill key={t}>{t}</TagPill>
          ))}
        </div>
      </div>
      {/* Notebook — grid-rows collapse */}
      <section className="flex flex-col gap-4 border-t border-border pt-8">
        <div className="flex items-baseline justify-between">
          <h4 className="font-display text-2xl tracking-[-0.01em] md:text-3xl">
            Notebook <span className="italic text-sepia">— marginalia</span>
          </h4>
          <span className="font-mono-mar">Opus · {project.num}</span>
        </div>
        <div className="relative">
          <div
            className="relative overflow-hidden transition-[max-height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            style={{ maxHeight: overflows && !expanded ? "22rem" : "9999px" }}
          >
            <div ref={contentRef} className="flex flex-col gap-4">
              {paragraphs.map((p, i) => (
                <p key={i} className="max-w-prose text-[1.05rem] leading-[1.75] text-foreground">
                  {p}
                </p>
              ))}
            </div>
          </div>
          {overflows && !expanded ? (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent"
            />
          ) : null}
        </div>
        {overflows ? (
          <button
            type="button"
            disabled={isExpanding}
            onClick={() => triggerExpand(() => setExpanded((v) => !v))}
            aria-expanded={expanded}
            className={pillButtonClasses("ghost", "self-start")}
          >
            {isExpanding ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin" />
                {expanded ? "Read less" : "Read more"}
              </>
            ) : expanded ? (
              <>
                <ChevronUp className="h-3 w-3" /> Read less
              </>
            ) : (
              <>
                <ChevronDown className="h-3 w-3" /> Read more
              </>
            )}
          </button>
        ) : null}
      </section>
    </motion.article>
  );
}
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useState } from "react";
import thumb from "@/assets/thumb-opera.jpg";
import { PopoverSummaryStrip } from "./PopoverSummaryStrip";

type CaseStudySection = { heading: string; body: string };

type Project = {
  id: string;
  num: string;
  title: string;
  role: string;
  year: string;
  outcome: string;
  blurb: string;
  tags: string[];
  sketch: "gear" | "wing" | "lens" | "compass";
  study: CaseStudySection[];
  deepDive: CaseStudySection[];
  liveUrl?: string;
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
    sketch: "gear",
    study: [
      { heading: "Context", body: "Helios runs a fleet of utility-scale solar sites. The legacy console had grown into a Christmas tree of dashboards — forty-seven widgets, no shared ontology, and a six-week onboarding ramp for new operators." },
      { heading: "Role", body: "Lead PM with a hand on the design tools. Embedded with two engineers for the first quarter, then handed off as the team scaled." },
      { heading: "Challenge", body: "Reduce the time-to-first-meaningful-action for a new operator without removing capability for the veterans who liked the old console." },
      { heading: "Approach", body: "Reframed the surface around the operator's actual decision tree, not the underlying microservice graph. Built a single canvas of asset health, with optional drill-downs gated behind a 'workshop' mode for power users." },
      { heading: "Outcome", body: "Onboarding time fell from six weeks to eleven days. The veterans were quieter than expected, which we took as a compliment." },
    ],
    deepDive: [
      { heading: "Discovery", body: "Two weeks of ride-alongs with operators in three regions. Mapped the actual decision tree on paper before any pixel work — what they reached for in the first thirty seconds of an alert, what they ignored." },
      { heading: "Architecture", body: "Replaced the polled REST surface with a typed event stream. The frontend became a derived projection of that stream, which made the 'live canvas' affordable to build and reason about." },
      { heading: "What I'd do differently", body: "Shipped the 'workshop' mode too late. The veterans spent three weeks unhappy before they discovered the escape hatch was sitting behind a keystroke." },
    ],
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
    sketch: "compass",
    study: [
      { heading: "Context", body: "Atlas had been positioned as a 'better Google Maps'. It was not. We pivoted to a personal atlas — a place for the user's own places, routes, and notes, on top of a competent but unambitious map." },
      { heading: "Role", body: "PM and prototyper. I built the first version of the note surface in SwiftUI over a weekend; the team then made it production-grade." },
      { heading: "Challenge", body: "Find a wedge in a market dominated by two free incumbents with infinite distribution." },
      { heading: "Approach", body: "Stopped competing on coverage and started competing on memory. The map remembered where you had been, what you had written about it, and surfaced it at the right moment." },
      { heading: "Outcome", body: "1.2M MAU in twelve months, with a retention curve that flattened higher than any product I have shipped." },
    ],
    deepDive: [
      { heading: "Positioning", body: "The pivot rested on a single research finding: people who already had a 'mapping app' still kept their meaningful places in a notes app. We didn't need to beat Maps — we needed to beat Notes." },
      { heading: "Cartography", body: "Hand-rolled vector tile pipeline so the map style could be ours. Two iterations to find a treatment that read as 'a personal notebook' rather than 'a software map'." },
    ],
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
    sketch: "wing",
    study: [
      { heading: "Context", body: "Async teams keep reinventing scheduling, badly. We built a primitive — a small, opinionated, embeddable scheduler — that other tools could lean on instead of building their own." },
      { heading: "Role", body: "Founder. Designed, built, and sold the first hundred customers myself before hiring." },
      { heading: "Challenge", body: "Convince teams to adopt a primitive when the market wanted a full product." },
      { heading: "Approach", body: "Sold to engineers, not buyers. Shipped a CLI before the dashboard. Wrote the docs as essays. The product was the documentation." },
      { heading: "Outcome", body: "Acquired three months out of YC W23. The primitive now ships inside two well-known calendars." },
    ],
    deepDive: [
      { heading: "Go-to-market", body: "Founder-led sales, low-volume, high-trust. The CLI was the demo. The docs were the brochure. No marketing site until month nine." },
      { heading: "The acquisition", body: "Two acquirers, opposite strategies. We picked the one that wanted to keep the primitive as a primitive, not absorb it into a suite." },
    ],
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
    sketch: "lens",
    study: [
      { heading: "Context", body: "Pathologists were drowning in unannotated microscopy. The off-the-shelf tools assumed a software user; pathologists are clinicians who tolerate software." },
      { heading: "Role", body: "PM, with a strong opinion about the annotation surface." },
      { heading: "Challenge", body: "Build a tool that respected an existing decades-old vocabulary, without forcing the pathologists to teach the software from scratch." },
      { heading: "Approach", body: "Trained a small model on the labs' own historical labels. The tool learned each lab's local dialect and gradually moved annotation work from labelling to confirming." },
      { heading: "Outcome", body: "Adopted by seven research labs. Two co-authored a paper on the methodology." },
    ],
    deepDive: [
      { heading: "Model choice", body: "A small per-lab model beat a large generalist one in every blind trial. The dialect mattered more than the size of the corpus." },
      { heading: "Clinical trust", body: "Every suggestion the tool made could be traced back to three historical examples from the lab's own archive. Trust came from provenance, not accuracy alone." },
    ],
  },
];

function Sketch({ kind }: { kind: Project["sketch"] }) {
  const common = "stroke-foreground/80 fill-none";
  return (
    <svg viewBox="0 0 80 80" className="h-16 w-16">
      <g strokeWidth="0.8" className={common}>
        {kind === "gear" && (
          <>
            <circle cx="40" cy="40" r="18" />
            <circle cx="40" cy="40" r="6" />
            {Array.from({ length: 10 }).map((_, i) => {
              const a = (i / 10) * Math.PI * 2;
              const x1 = 40 + Math.cos(a) * 18;
              const y1 = 40 + Math.sin(a) * 18;
              const x2 = 40 + Math.cos(a) * 26;
              const y2 = 40 + Math.sin(a) * 26;
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
            })}
          </>
        )}
        {kind === "wing" && (
          <>
            <path d="M10 55 C 25 20, 55 20, 72 50" />
            <path d="M14 55 C 28 30, 50 30, 64 50" />
            <path d="M20 55 C 32 38, 48 38, 58 52" />
            <line x1="10" y1="55" x2="72" y2="55" />
          </>
        )}
        {kind === "lens" && (
          <>
            <circle cx="34" cy="34" r="20" />
            <circle cx="34" cy="34" r="14" />
            <line x1="50" y1="50" x2="68" y2="68" />
            <line x1="46" y1="54" x2="64" y2="72" />
          </>
        )}
        {kind === "compass" && (
          <>
            <circle cx="40" cy="40" r="24" />
            <path d="M40 16 L46 40 L40 64 L34 40 Z" />
            <circle cx="40" cy="40" r="2" />
          </>
        )}
      </g>
    </svg>
  );
}

export function SelectedWork() {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = projects.find((p) => p.id === openId) ?? null;

  return (
    <div className="flex flex-col gap-8">
      <PopoverSummaryStrip
        label="Opera · index"
        items={projects.map((p) => ({
          kicker: `Opus · ${p.num}`,
          title: p.title,
          dek: p.role,
          thumb,
          onClick: () => setOpenId(p.id),
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
            className="flex flex-col gap-8"
          >
            <p className="font-display text-2xl leading-snug md:text-3xl">
              Case studies &mdash;{" "}
              <span className="italic text-sepia">products built, shipped, and learned from.</span>
            </p>
            <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2">
              {projects.map((p, i) => (
                <motion.button
                  key={p.id}
                  type="button"
                  onClick={() => setOpenId(p.id)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="group relative flex flex-col gap-5 bg-background p-6 text-left transition-colors hover:bg-card md:p-7"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-border bg-card">
                    <img
                      src={thumb}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-[1.03] dark:mix-blend-screen"
                    />
                    <div className="absolute inset-0 blueprint-grid-fine opacity-30 mix-blend-overlay" />
                    <div className="absolute left-2 top-2 font-mono-mar bg-background/80 px-2 py-0.5">
                      Opus · {p.num}
                    </div>
                    <div className="absolute right-2 top-2 font-mono-mar bg-background/80 px-2 py-0.5">
                      {p.year}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-display text-2xl tracking-[-0.01em] transition-colors group-hover:text-sepia md:text-3xl">
                      {p.title}
                    </h3>
                    <p className="font-mono-mar">{p.role}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{p.blurb}</p>
                  <div className="mt-auto flex items-end justify-between gap-3 pt-1">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-mono-mar">Outcome</span>
                      <span className="font-display italic text-sepia">{p.outcome}</span>
                    </div>
                    <div className="flex flex-wrap justify-end gap-1.5">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-border px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="h-px w-0 bg-sepia transition-all duration-500 group-hover:w-full" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.article
            key={open.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col gap-8"
          >
            <button
              type="button"
              onClick={() => setOpenId(null)}
              className="font-mono-mar group flex items-center gap-2 self-start hover:text-foreground"
            >
              <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
              Back to Opera
            </button>
            <header className="flex flex-col gap-3 border-b border-border pb-6">
              <div className="font-mono-mar flex items-center gap-3">
                <span>Opus · {open.num}</span>
                <span className="hairline h-px w-8" />
                <span>{open.year}</span>
                <span className="hairline h-px w-8" />
                <span>{open.role}</span>
              </div>
              <h2 className="font-display text-4xl tracking-[-0.015em] md:text-5xl">{open.title}</h2>
              <p className="font-display text-xl italic text-sepia md:text-2xl">{open.blurb}</p>
            </header>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm border border-border bg-card">
              <img
                src={thumb}
                alt={open.title}
                className="h-full w-full object-cover mix-blend-multiply dark:mix-blend-screen"
              />
              <div className="absolute inset-0 blueprint-grid-fine opacity-30 mix-blend-overlay" />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {open.study.map((s) => (
                <div key={s.heading} className="flex flex-col gap-2 border-l border-border pl-4">
                  <span className="font-mono-mar">{s.heading}</span>
                  <p className="text-[1rem] leading-[1.7] text-foreground">{s.body}</p>
                </div>
              ))}
            </div>
            {open.deepDive.length > 0 ? (
              <section className="flex flex-col gap-6 border-t border-border pt-8">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-2xl tracking-[-0.01em] md:text-3xl">
                    Notebook <span className="italic text-sepia">— in greater depth</span>
                  </h3>
                  <span className="font-mono-mar">Marginalia</span>
                </div>
                <div className="flex flex-col">
                  {open.deepDive.map((d, i) => (
                    <div
                      key={d.heading}
                      className={`flex flex-col gap-3 py-6 ${
                        i !== 0 ? "border-t border-sepia/20" : ""
                      }`}
                    >
                      <span className="font-mono-mar">{d.heading}</span>
                      <p className="max-w-prose text-[1.05rem] leading-[1.75] text-foreground">
                        {d.body}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
            <div className="flex flex-wrap items-end justify-between gap-6 border-t border-border pt-6">
              <div className="flex flex-col">
                <span className="font-mono-mar">Outcome</span>
                <span className="font-display text-2xl italic text-sepia">{open.outcome}</span>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-3">
                {open.liveUrl ? (
                  <a
                    href={open.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono-mar group inline-flex items-center gap-2 rounded-full border border-sepia/60 bg-background px-4 py-2 text-sepia transition-all hover:border-sepia hover:bg-sepia hover:text-parchment"
                  >
                    Visit live product
                    <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                ) : null}
                <div className="flex flex-wrap justify-end gap-2">
                  {open.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        )}
      </AnimatePresence>
    </div>
  );
}
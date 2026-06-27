import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

type Project = {
  num: string;
  title: string;
  role: string;
  year: string;
  outcome: string;
  blurb: string;
  tags: string[];
  sketch: "gear" | "wing" | "lens" | "compass";
};

const projects: Project[] = [
  {
    num: "I",
    title: "Helios Console",
    role: "Lead Product · Design Systems",
    year: "2025",
    outcome: "Cut onboarding time by 64%",
    blurb:
      "An operator console for solar-fleet engineers. Rebuilt around a typed event stream and a single canvas of asset health.",
    tags: ["B2B", "React", "Real-time"],
    sketch: "gear",
  },
  {
    num: "II",
    title: "Atlas Maps",
    role: "PM · Prototyping",
    year: "2024",
    outcome: "+1.2M MAU in twelve months",
    blurb:
      "Consumer mapping app rebuilt as a personal atlas. Hand-rolled vector tiles and a writing surface for cartographic notes.",
    tags: ["Consumer", "Maps", "iOS"],
    sketch: "compass",
  },
  {
    num: "III",
    title: "Aviary",
    role: "Founder · Design & Engineering",
    year: "2023",
    outcome: "Acquired, post YC W23",
    blurb:
      "A scheduling primitive for asynchronous teams. The interface was a notebook; the engine was a borrowed flight-machine principle.",
    tags: ["SaaS", "Workflow"],
    sketch: "wing",
  },
  {
    num: "IV",
    title: "Specimen",
    role: "PM · Research",
    year: "2022",
    outcome: "Adopted by 7 research labs",
    blurb:
      "A microscopy review tool. Built a custom annotation surface that taught itself the vocabulary of pathologists.",
    tags: ["Health", "ML", "Tooling"],
    sketch: "lens",
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
  return (
    <section id="work" className="relative px-6 py-28 md:px-12 md:py-40">
      <div className="absolute inset-0 -z-10 blueprint-grid opacity-30" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          numeral="II"
          kicker="Opera Selecta"
          title="Selected"
          italicTail="works."
        />

        <div className="grid gap-px border border-border bg-border md:grid-cols-2">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href="#"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.08 }}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col gap-6 bg-background p-8 transition-colors hover:bg-card md:p-10"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono-mar">{`Opus · ${p.num}`}</span>
                <span className="font-mono-mar">{p.year}</span>
              </div>

              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-blueprint/0 transition-colors group-hover:bg-blueprint/10" />
                  <Sketch kind={p.sketch} />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-3xl tracking-[-0.01em] md:text-4xl">{p.title}</h3>
                  <p className="font-mono-mar mt-2">{p.role}</p>
                </div>
              </div>

              <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                {p.blurb}
              </p>

              <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                <div className="flex flex-col gap-1">
                  <span className="font-mono-mar">Outcome</span>
                  <span className="font-display text-lg italic text-sepia">{p.outcome}</span>
                </div>
                <div className="flex flex-wrap justify-end gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-blueprint transition-all duration-500 group-hover:w-full" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
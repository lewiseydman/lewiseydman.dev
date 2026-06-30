import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import portrait from "@/assets/portrait.png";
import { PopoverSummaryStrip } from "./PopoverSummaryStrip";

const disciplines = [
  {
    numeral: "I",
    label: "Design",
    principle: "From research to motion spec.",
    body: "Service blueprinting, UX strategy and user-centred design — the patient mapping of journeys before pixels. WCAG-aware, prototype-driven, accountable to evidence.",
    tools: ["Figma", "Service Blueprints", "UCD", "Prototyping"],
  },
  {
    numeral: "II",
    label: "Engineering",
    principle: "Shipping the thing I just sketched.",
    body: "React + TypeScript frontends, JSON-LD architecture, automated CI/CD. Comfortable in the system and the component — Playwright/Cypress at the seams.",
    tools: ["React", "TypeScript", "Node", "Playwright"],
  },
  {
    numeral: "III",
    label: "Product",
    principle: "Outcomes over roadmaps.",
    body: "Discovery, prioritisation and stakeholder orchestration. Translate ambiguous business goals into measurable releases — A/B tested, analytics-led, regulation-aware.",
    tools: ["Discovery", "Roadmaps", "Analytics", "A/B Testing"],
  },
];

const stats: Array<[string, string]> = [
  ["7+", "Years of creating"],
  ["10+", "Products launched"],
  ["3", "Industries served"],
  ["100%", "Passion & dedicatiom"],
];

const interests = [
  "Coding",
  "Gaming",
  "Specialty coffee",
  "Making music",
  "Muay Thai",
  "DIY",
  "Homelabing",
  "Sketching",
];

const whatIDo = [
  "Product strategy & roadmaps",
  "UX & service design",
  "Frontend & full-stack engineering",
  "Stakeholder & delivery leadership",
];

const howIWork = [
  "Outcomes over rigid roadmaps.",
  "Evidence-led — analytics, A/B testing, usability.",
  "Sketch first, then ship the prototype.",
  "Accessible & regulation-aware by default.",
];

function PortraitBlock() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const y = useSpring(rawY, { stiffness: 60, damping: 20 });

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9 }}
      className="relative"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-border bg-card paper-grain">
        <motion.img
          src={portrait}
          alt="Sketch portrait of Lewis Eydman"
          loading="lazy"
          style={{ y }}
          whileHover={{ scale: 1.04, rotate: 0.5 }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className="h-full w-full object-contain mix-blend-multiply dark:mix-blend-screen dark:invert"
        />
        <div className="absolute inset-0 blueprint-grid-fine opacity-30 mix-blend-overlay pointer-events-none" />
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <span className="font-mono-mar">Stud. · retrato</span>
          <span className="font-mono-mar">N° 06</span>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="font-mono-mar">Plate I</span>
        <span className="font-mono-mar">London · MMXXVI</span>
      </div>
    </motion.div>
  );
}

export function About() {
  return (
    <div className="flex flex-col gap-12">
      {/* Editorial intro */}
      <section className="flex flex-col gap-5">
        <span className="font-mono-mar">Lewis Eydman · De Ipso</span>
        <h2 className="font-display text-4xl leading-[1.05] tracking-[-0.015em] md:text-5xl">
          Product, engineering, and design in one <span className="italic text-sepia">opinionated practice.</span>
        </h2>
        <div className="grid gap-6 text-[0.95rem] leading-[1.7] text-muted-foreground md:grid-cols-2 md:gap-10">
          <p>
            I&rsquo;m a product manager who can sketch the interface in the morning, ship the React in the afternoon,
            and argue both sides of the technical trade-off. I care about helping ambitious teams present their products
            with clarity, taste and a strong point of view.
          </p>
          <p>
            My background blends service design, UI/UX and full-stack engineering. Currently building at 100Green —
            energy-quote journeys, regulatory compliance, and the unglamorous work that turns a sign-up form into a
            measurable business outcome.
          </p>
        </div>
      </section>

      {/* At a glance band */}
      <section className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <span className="font-mono-mar">At a glance · Summa</span>
          <span className="hairline h-px flex-1" />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              kicker: "Current",
              body: "Communications Manager @ 100Green",
            },
            {
              kicker: "Experience",
              body: "7+ years across design, development and product",
            },
            {
              kicker: "Background",
              body: "Service design, UI/UX, full-stack React.",
            },
          ].map((c) => (
            <div key={c.kicker} className="flex flex-col gap-3 rounded-sm border border-border bg-card/40 p-5">
              <span className="font-mono text-[0.6rem] uppercase tracking-widest text-sepia">{c.kicker}</span>
              <p className="text-[0.95rem] leading-relaxed text-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What I do / How I work — numbered two-column */}
      <section className="grid gap-10 md:grid-cols-2 md:gap-14">
        {[
          { title: "What I do", items: whatIDo },
          { title: "How I work", items: howIWork },
        ].map((col) => (
          <div key={col.title} className="flex flex-col gap-4">
            <h3 className="font-display text-2xl tracking-[-0.01em] md:text-3xl">{col.title}</h3>
            <ul className="flex flex-col">
              {col.items.map((line, i) => (
                <li key={line} className="flex items-baseline gap-4 border-b border-border py-3 last:border-b-0">
                  <span className="font-mono w-8 shrink-0 text-[0.65rem] uppercase tracking-widest text-sepia">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.95rem] leading-snug text-foreground">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Portrait + Disciplines (manuscript block — kept) */}
      <section className="grid gap-10 border-t border-border pt-10 md:grid-cols-[0.85fr_1.15fr] md:gap-14">
        <PortraitBlock />

        <div className="relative flex flex-col">
          <div className="pointer-events-none absolute bottom-2 left-[0.45rem] top-2 w-px bg-sepia/30" />
          {disciplines.map((d, i) => (
            <motion.div
              key={d.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 * i }}
              className="relative flex gap-6 border-b border-border py-7 last:border-b-0"
            >
              <span className="absolute left-0 top-[2.1rem] flex h-[0.9rem] w-[0.9rem] items-center justify-center">
                <span className="h-2 w-2 rounded-full border border-sepia bg-background" />
              </span>
              <div className="w-16 shrink-0 pl-7 pt-1">
                <span className="font-mono-mar block">§ {d.numeral}</span>
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="font-display text-3xl tracking-[-0.01em] md:text-4xl">{d.label}</h3>
                  <p className="font-display text-base italic text-sepia md:text-lg">— {d.principle}</p>
                </div>
                <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">{d.body}</p>
                <div className="mt-1 flex flex-wrap items-center gap-2 pt-1">
                  <span className="font-mono-mar">Skills</span>
                  <span className="hairline h-px w-6" />
                  <div className="flex flex-wrap gap-1.5">
                    {d.tools.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-border pt-8">
        <div className="mb-5 flex items-center gap-3">
          <span className="font-mono-mar">Summa · Experience</span>
          <span className="hairline h-px flex-1" />
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map(([n, l]) => (
            <div key={l} className="flex flex-col">
              <span className="font-display text-4xl text-foreground md:text-5xl">{n}</span>
              <span className="font-mono-mar mt-2">{l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Marginalia / Interests */}
      <section className="border-t border-border pt-8">
        <div className="mb-5 flex items-center gap-3">
          <span className="font-mono-mar">Vita Lateralis · Interests</span>
          <span className="hairline h-px flex-1" />
        </div>
        <div className="grid gap-6 md:grid-cols-[0.85fr_1.15fr] md:gap-14">
          <p className="font-display text-xl italic leading-relaxed text-sepia md:text-2xl">
            Curious at heart — the same instinct that drives the work fills the weekends.
          </p>
          <div className="flex flex-wrap content-start items-start gap-1.5 self-start">
            {interests.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

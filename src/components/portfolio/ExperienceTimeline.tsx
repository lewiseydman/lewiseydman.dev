import { motion, useReducedMotion } from "framer-motion";
import { Download } from "lucide-react";
import { PopoverSummaryStrip } from "./PopoverSummaryStrip";
import { pillButtonClasses } from "./primitives/pillButton";

const experience = [
  {
    year: "Apr 2025 — Now",
    role: "Communications Manager",
    org: "100Green · UK",
    notes:
      "Own the energy quote journey end-to-end — research, roadmap, Figma, React build, A/B testing, Ofgem compliance. +19% sign-ups May–Jun 2026.",
  },
  {
    year: "Jun 2021 — Apr 2024",
    role: "Frontend Developer",
    org: "ITS · UK",
    notes:
      "Product-leaning frontend on an agile team. Scalable React/JSON-LD across PLPs/PDPs, a new email framework, Playwright/Cypress E2E. +37.5% conversion.",
  },
  {
    year: "Jul 2019 — Jun 2021",
    role: "Designer",
    org: "ITS · UK",
    notes:
      "Co-led the BigCommerce migration. Built the data-driven design templates the marketing, design, and dev teams still work from.",
  },
  {
    year: "Jul 2019 — Now",
    role: "Designer & Developer",
    org: "Self-employed · UK",
    notes:
      "Building digital products from research to deployment. Brand design, Figma prototyping, React frontends, and setting up CI/CD pipelines, alongside active open-source contributions. This period also includes a purposeful career break with Phipps Group (landscaping) to recharge and reconnect with people and nature.",
  },
];

const education = [
  { year: "2014 — 2016", title: "Graphic Design Diploma", org: "Harlow College" },
  { year: "2016 — 2019", title: "BA Graphic Communication", org: "Norwich University of the Arts" },
  { year: "2024", title: "Google UX Design", org: "Google" },
];

function Gear({ teeth = 8 }: { teeth?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.svg
      animate={reduce ? {} : { rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      viewBox="0 0 40 40"
      className="h-10 w-10 text-sepia"
    >
      <g stroke="currentColor" strokeWidth="0.8" fill="none">
        <circle cx="20" cy="20" r="9" />
        <circle cx="20" cy="20" r="3" />
        {Array.from({ length: teeth }).map((_, i) => {
          const a = (i / teeth) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={20 + Math.cos(a) * 9}
              y1={20 + Math.sin(a) * 9}
              x2={20 + Math.cos(a) * 14}
              y2={20 + Math.sin(a) * 14}
            />
          );
        })}
      </g>
    </motion.svg>
  );
}

export function ExperienceTimeline() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
        <p className="font-display text-xl italic text-sepia md:text-2xl">
          A mechanical chronology &mdash; in eight working years.
        </p>
        <a
          href="/Lewis_Eydman_Resume.pdf"
          download="Lewis_Eydman_Resume.pdf"
          className={pillButtonClasses("primary")}
        >
          <Download className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
          Download Résumé
        </a>
      </div>

      <div className="relative">
        {/* Desktop-only continuous central spine */}
        <div className="hairline absolute left-1/2 top-0 bottom-0 hidden w-px lg:block" />

        <ol className="space-y-12 lg:space-y-24">
          {experience.map((e, i) => {
            const left = i % 2 === 0;
            const isFirst = i === 0;
            const isLast = i === experience.length - 1;
            return (
              <motion.li
                key={e.year}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="relative flex flex-col items-center gap-4 text-center lg:grid lg:grid-cols-2 lg:gap-12 lg:text-left"
              >
                {/* top spine segment (mobile/tablet) */}
                {!isFirst && <div className="hairline h-8 w-px lg:hidden" aria-hidden />}

                {/* gear node */}
                <div className="relative lg:absolute lg:left-1/2 lg:top-0 lg:-translate-x-1/2">
                  <div className="rounded-full bg-background p-1">
                    <Gear teeth={6 + (i % 3) * 2} />
                  </div>
                </div>

                {/* card */}
                <div
                  className={`w-full lg:row-start-1 ${
                    left ? "lg:col-start-1 lg:pr-16 lg:text-right" : "lg:col-start-2 lg:pl-16"
                  }`}
                >
                  <div className="flex flex-col items-center gap-3 lg:items-stretch">
                    <span className="font-mono-mar">{e.year}</span>
                    <h3 className="font-display text-2xl md:text-3xl">{e.role}</h3>
                    <p className="font-display italic text-sepia md:text-lg">{e.org}</p>
                    <p className={`max-w-md text-sm leading-relaxed text-muted-foreground ${left ? "lg:ml-auto" : ""}`}>
                      {e.notes}
                    </p>
                  </div>
                </div>

                {/* bottom spine segment (mobile/tablet) */}
                {!isLast && <div className="hairline h-8 w-px lg:hidden" aria-hidden />}

                {/* hairline leader */}
                <div
                  className={`absolute top-5 hidden lg:block ${
                    left ? "right-1/2 mr-12" : "left-1/2 ml-12"
                  } h-px w-12 hairline`}
                />
              </motion.li>
            );
          })}
        </ol>
      </div>

      {/* education footer */}
      <section className="border-t border-border pt-8">
        <div className="mb-5 flex items-center gap-3">
          <span className="font-mono-mar">Studia · Education</span>
          <span className="hairline h-px flex-1" />
        </div>
        <ul className="grid gap-4 md:grid-cols-3">
          {education.map((e) => (
            <li key={e.title} className="flex flex-col gap-1 rounded-sm border border-border bg-card/40 p-4">
              <span className="font-mono-mar">{e.year}</span>
              <span className="font-display text-lg leading-tight">{e.title}</span>
              <span className="font-display italic text-sepia">{e.org}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

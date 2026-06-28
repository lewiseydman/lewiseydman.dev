import { motion, useReducedMotion } from "framer-motion";
import { Download } from "lucide-react";
import { PopoverSummaryStrip } from "./PopoverSummaryStrip";

const experience = [
  {
    year: "Apr 2025 — Now",
    role: "Communications Manager",
    org: "100Green · Ware, UK",
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
    role: "Freelance Designer & Developer",
    org: "Independent",
    notes:
      "Custom web apps from research to deployment — Figma prototypes, React frontends, CI/CD, plus open-source contribution on the side. Career-break with Phipps Group (landscaping) sharpened the delivery instincts.",
  },
];

const education = [
  { year: "2024", title: "Google UX Design", org: "Google" },
  { year: "2016 — 2019", title: "BA Graphic Communication", org: "Norwich University of the Arts" },
  { year: "2014 — 2016", title: "BTEC Ext. Diploma, Graphic Design", org: "Harlow College" },
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
      <PopoverSummaryStrip
        label="Cursus · highlights"
        items={[
          {
            kicker: "Now",
            title: experience[0].role,
            dek: experience[0].org,
          },
          {
            kicker: "Most recent",
            title: experience[1].role,
            dek: experience[1].org,
          },
          {
            kicker: "Earliest",
            title: experience[2].role,
            dek: experience[2].org,
          },
        ]}
      />
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
        <p className="font-display text-xl italic text-sepia md:text-2xl">
          A mechanical chronology &mdash; in eight working years.
        </p>
        <a
          href="/Lewis_Eydman_Resume.pdf"
          download="Lewis_Eydman_Resume.pdf"
          className="font-mono-mar group inline-flex items-center gap-2 rounded-full border border-sepia/60 bg-background px-4 py-2 text-sepia transition-all hover:border-sepia hover:bg-sepia hover:text-parchment"
        >
          <Download className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
          Download Résumé
        </a>
      </div>

      <div className="relative">
          {/* central spine */}
          <div className="absolute left-[1.25rem] top-0 bottom-0 w-px hairline md:left-1/2" />

          <ol className="space-y-16 md:space-y-24">
            {experience.map((e, i) => {
              const left = i % 2 === 0;
              return (
                <motion.li
                  key={e.year}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className="relative grid grid-cols-[3rem_1fr] gap-6 md:grid-cols-2 md:gap-12"
                >
                  {/* gear node */}
                  <div className="absolute left-[1.25rem] -translate-x-1/2 md:left-1/2">
                    <div className="rounded-full bg-background p-1">
                      <Gear teeth={6 + (i % 3) * 2} />
                    </div>
                  </div>

                  {/* card */}
                  <div
                    className={`col-start-2 md:row-start-1 ${
                      left ? "md:col-start-1 md:pr-16 md:text-right" : "md:col-start-2 md:pl-16"
                    }`}
                  >
                    <div className="flex flex-col gap-3">
                      <span className="font-mono-mar">{e.year}</span>
                      <h3 className="font-display text-2xl md:text-3xl">{e.role}</h3>
                      <p className="font-display italic text-sepia md:text-lg">{e.org}</p>
                      <p
                        className={`max-w-md text-sm leading-relaxed text-muted-foreground ${
                          left ? "md:ml-auto" : ""
                        }`}
                      >
                        {e.notes}
                      </p>
                    </div>
                  </div>
                  {/* hairline leader */}
                  <div
                    className={`hidden md:block absolute top-5 ${
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
            <li
              key={e.title}
              className="flex flex-col gap-1 rounded-sm border border-border bg-card/40 p-4"
            >
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
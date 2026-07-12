import { motion } from "framer-motion";
import { useMemo } from "react";
import { SectionLabel } from "./primitives/SectionLabel";

const experience = [
  {
    year: "Jul 2019 — Now",
    role: "Designer & Developer",
    org: "Self-employed · UK",
    notes:
      "Building digital products from research to deployment. Brand design, Figma prototyping, React frontends, and setting up CI/CD pipelines, alongside active open-source contributions. This period also includes a purposeful career break with Phipps Group (landscaping) to recharge and reconnect with people and nature.",
  },
  {
    year: "Jul 2019 — Jun 2021",
    role: "Designer",
    org: "ITS · UK",
    notes:
      "Co-led the BigCommerce migration. Built the data-driven design templates the marketing, design, and dev teams still work from.",
  },
  {
    year: "Jun 2021 — Apr 2024",
    role: "Frontend Developer",
    org: "ITS · UK",
    notes:
      "Product-leaning frontend on an agile team. Scalable React/JSON-LD across PLPs/PDPs, a new email framework, Playwright/Cypress E2E. +37.5% conversion.",
  },
  {
    year: "Apr 2025 — Now",
    role: "Communications Manager",
    org: "100Green · UK",
    notes:
      "Own the energy quote journey end-to-end — research, roadmap, Figma, React build, A/B testing, Ofgem compliance. +19% sign-ups May–Jun 2026.",
  },
];

const education = [
  { year: "2014 — 2016", title: "Graphic Design Diploma", org: "Harlow College" },
  { year: "2016 — 2019", title: "BA Graphic Communication", org: "Norwich University of the Arts" },
  { year: "2024", title: "Google UX Design", org: "Google" },
];

export function ExperienceTimeline() {
  const romanRoles = useMemo(
    () => ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"],
    [],
  );

  return (
    <div className="flex flex-col gap-12 md:gap-16">
      <header className="flex flex-col gap-4">
        <p className="font-display text-2xl leading-snug md:text-3xl">
          <span className="italic text-sepia">My chronology of eight working years.</span>
        </p>
      </header>

      <div className="relative">
        {/* Vertical rail — animated draw-in */}
        <motion.span
          aria-hidden
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "top" }}
          className="pointer-events-none absolute bottom-0 top-0 w-px bg-gradient-to-b from-transparent via-sepia/40 to-transparent left-[18px] md:left-[22px] lg:left-1/2 lg:-translate-x-1/2"
        />

        <ol className="flex flex-col">
          {experience.map((e, i) => {
            const isRight = i % 2 === 1; // desktop side
            return (
              <motion.li
                key={e.year}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: 0.08 * i, ease: "easeOut" }}
                className="group relative pb-10 pl-14 last:pb-0 md:pb-14 md:pl-20 lg:grid lg:grid-cols-2 lg:gap-24 lg:pb-20 lg:pl-0"
              >
                {/* Node with numeral inside */}
                <span
                  aria-hidden
                  className="absolute top-0 flex h-9 w-9 -translate-x-1/2 items-center justify-center left-[18px] md:h-11 md:w-11 md:left-[22px] lg:left-1/2"
                >
                  <span className="absolute inset-0 rounded-full border border-sepia/30 bg-background transition-all duration-500 group-hover:scale-110 group-hover:border-brass group-hover:shadow-[0_0_0_4px_color-mix(in_oklab,var(--brass)_12%,transparent)]" />
                  <span className="font-mono-mar relative text-[11px] font-medium leading-none tracking-tight text-muted-foreground transition-colors duration-500 group-hover:text-brass md:text-[13px]">
                    {romanRoles[i]}
                  </span>
                </span>

                <div
                  className={
                    isRight
                      ? "lg:col-start-2 lg:pl-12 lg:text-left"
                      : "lg:col-start-1 lg:pr-12 lg:text-right"
                  }
                >
                  {/* Date pill */}
                  <div className={`mb-3 inline-flex items-center gap-2 ${isRight ? "" : "lg:flex-row-reverse"}`}>
                    <span className="font-mono-mar rounded-full border border-border bg-card/60 px-2.5 py-0.5 text-[11px] text-muted-foreground transition-colors duration-500 group-hover:border-brass/40 group-hover:text-brass md:text-xs">
                      {e.year}
                    </span>
                  </div>

                  {/* Body */}
                  <h3 className="font-display text-2xl leading-tight tracking-[-0.01em] transition-colors duration-500 group-hover:text-foreground md:text-4xl">
                    {e.role}
                  </h3>
                  <p className="font-display mt-1 text-base italic text-sepia md:text-lg">{e.org}</p>
                  <p className={`mt-3 max-w-prose text-sm leading-relaxed text-muted-foreground md:text-base ${isRight ? "" : "lg:ml-auto"}`}>
                    {e.notes}
                  </p>

                  {/* Underline flourish */}
                  <div className={`mt-5 h-px w-8 bg-sepia/40 transition-all duration-500 group-hover:w-24 group-hover:bg-brass ${isRight ? "" : "lg:ml-auto"}`} />
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>

      <section className="flex flex-col gap-4">
        <SectionLabel>Academia</SectionLabel>
        <ul className="grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {education.map((e, i) => (
            <motion.li
              key={e.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.06 * i, ease: "easeOut" }}
              className="group relative flex flex-col gap-1 overflow-hidden rounded-sm border border-border bg-card/40 p-4 transition-all duration-500 hover:-translate-y-0.5 hover:border-brass/50 hover:bg-card/70 sm:p-6 lg:p-8"
            >
              <span className="font-mono-mar text-xs text-muted-foreground transition-colors duration-500 group-hover:text-brass">
                {e.year}
              </span>
              <span className="font-display text-lg leading-tight">{e.title}</span>
              <span className="font-display italic text-sepia">{e.org}</span>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px w-0 bg-brass transition-all duration-500 group-hover:w-full"
              />
            </motion.li>
          ))}
        </ul>
      </section>
    </div>
  );
}

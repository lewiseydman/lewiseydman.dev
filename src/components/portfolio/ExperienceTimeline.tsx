import { motion } from "framer-motion";
import { SectionLabel } from "./primitives/SectionLabel";

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

export function ExperienceTimeline() {
  return (
    <div className="flex flex-col gap-12 md:gap-16">
      <header className="flex flex-col gap-4">
        <p className="font-display text-2xl leading-snug md:text-3xl">
          <span className="italic text-sepia">My chronology of eight working years.</span>
        </p>
      </header>

      <ol className="flex flex-col">
        {experience.map((e, i) => (
          <motion.li
            key={e.year}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.06 * i }}
            className="group flex flex-col gap-4 border-b border-border py-6 first:pt-0 last:border-b-0 md:py-8"
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
              <span className="font-mono-mar shrink-0 transition-colors duration-300 group-hover:text-brass">
                {`Cursus · ${String(i + 1).padStart(2, "0")}`}
              </span>
              <span className="hairline hidden h-px flex-1 sm:block" aria-hidden />
              <span className="font-mono-mar shrink-0 transition-colors duration-300 group-hover:text-brass sm:text-right">
                {e.year}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-display text-2xl tracking-[-0.01em] md:text-4xl">{e.role}</h3>
              <span className="font-display italic text-sepia md:text-lg">{e.org}</span>
            </div>
            <p className="max-w-prose text-sm leading-relaxed text-muted-foreground md:text-base">{e.notes}</p>
            <div className="h-px w-0 bg-brass transition-all duration-500 group-hover:w-full" />
          </motion.li>
        ))}
      </ol>

      <section className="flex flex-col gap-4">
        <SectionLabel>Academia</SectionLabel>
        <ul className="grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {education.map((e) => (
            <li
              key={e.title}
              className="flex flex-col gap-1 rounded-sm border border-border bg-card/40 p-4 sm:p-6 lg:p-8"
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

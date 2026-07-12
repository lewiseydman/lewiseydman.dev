import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { pillButtonClasses } from "./primitives/pillButton";
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
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          <span className="font-mono-mar">Actions ·</span>
          <a
            href="/Lewis_Eydman_Resume.pdf"
            download="Lewis_Eydman_Resume.pdf"
            className={pillButtonClasses("primary", undefined, "sm")}
          >
            <Download className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
            Download Résumé
          </a>
        </div>
      </header>

      {/* Manuscript rail — mirrors About > Disciplines */}
      <div className="relative flex flex-col">
        <div className="pointer-events-none absolute bottom-2 left-[0.45rem] top-2 w-px bg-sepia/30" />

        <ol className="flex flex-col">
          {experience.map((e, i) => (
            <motion.li
              key={e.year}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: 0.06 * i }}
              className="relative flex gap-5 border-b border-border py-6 last:border-b-0"
            >
              <span className="absolute left-0 top-[1.9rem] flex h-[0.9rem] w-[0.9rem] items-center justify-center">
                <span className="h-2 w-2 rounded-full border border-sepia bg-background" />
              </span>
              <div className="w-4 shrink-0 pl-7" aria-hidden />
              <div className="grid flex-1 gap-x-6 gap-y-1 md:grid-cols-[9rem_1fr]">
                <div className="flex flex-col gap-1 md:pt-1">
                  <span className="font-mono-mar">{e.year}</span>
                  <span className="font-display italic text-sepia md:text-base">{e.org}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-2xl tracking-[-0.01em] md:text-3xl">{e.role}</h3>
                  <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">{e.notes}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* education footer */}
      <section className="flex flex-col gap-4">
        <SectionLabel>Education · Studia</SectionLabel>
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

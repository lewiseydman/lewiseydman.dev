import { motion } from "framer-motion";
import portrait from "@/assets/portrait.png";

const disciplines = [
  {
    numeral: "I",
    label: "Design",
    principle: "From research to motion spec.",
    body:
      "Service blueprinting, UX strategy and user-centred design — the patient mapping of journeys before pixels. WCAG-aware, prototype-driven, accountable to evidence.",
    tools: ["Figma", "Service Blueprints", "UCD", "Prototyping"],
  },
  {
    numeral: "II",
    label: "Engineering",
    principle: "Shipping the thing I just sketched.",
    body:
      "React + TypeScript frontends, JSON-LD architecture, automated CI/CD. Comfortable in the system and the component — Playwright/Cypress at the seams.",
    tools: ["React", "TypeScript", "Node", "Playwright"],
  },
  {
    numeral: "III",
    label: "Product",
    principle: "Outcomes over roadmaps.",
    body:
      "Discovery, prioritisation and stakeholder orchestration. Translate ambiguous business goals into measurable releases — A/B tested, analytics-led, regulation-aware.",
    tools: ["Discovery", "Roadmaps", "Analytics", "A/B Testing"],
  },
];

const stats: Array<[string, string]> = [
  ["7+", "Years shipping"],
  ["20+", "Products launched"],
  ["4", "Industries served"],
  ["100%", "On-time delivery"],
];

const interests = [
  "Coding",
  "Gaming",
  "Making music",
  "Muay Thai",
  "Open source",
  "Landscaping",
  "Generative art",
  "Sketching",
];

export function About() {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-border bg-card paper-grain">
              <img
                src={portrait}
                alt="Sketch portrait of Lewis Eydman"
                loading="lazy"
                className="h-full w-full object-contain mix-blend-multiply dark:mix-blend-screen dark:invert"
              />
              <div className="absolute inset-0 blueprint-grid-fine opacity-30 mix-blend-overlay pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="font-mono-mar">Stud. ·  retrato</span>
                <span className="font-mono-mar">N° 042</span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-mono-mar">Plate I</span>
              <span className="font-mono-mar">London · MMXXVI</span>
            </div>
          </motion.div>

          <div className="flex flex-col gap-10">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-display text-2xl leading-relaxed text-foreground md:text-3xl"
            >
              I build software the way the masters built machines &mdash; with{" "}
              <span className="italic text-sepia">pencil first</span>, then the workshop. A product
              manager who can sketch the interface, ship the prototype, and argue both sides of the
              technical trade-off.
            </motion.p>

            <div className="relative flex flex-col">
              {/* manuscript spine */}
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
                  {/* spine dot */}
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
                      <span className="font-mono-mar">Instruments</span>
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

          </div>
        </div>

      {/* full-width stats band */}
      <div className="border-t border-border pt-8">
        <div className="mb-5 flex items-center gap-3">
          <span className="font-mono-mar">Quantities · Summa</span>
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
      </div>

      {/* hobbies & interests */}
      <div className="border-t border-border pt-8">
        <div className="mb-5 flex items-center gap-3">
          <span className="font-mono-mar">Marginalia · Beyond the desk</span>
          <span className="hairline h-px flex-1" />
        </div>
        <div className="grid gap-6 md:grid-cols-[0.85fr_1.15fr] md:gap-14">
          <p className="font-display text-xl italic leading-relaxed text-sepia md:text-2xl">
            Curious by trade — the same instinct that drives the work fills the
            weekends.
          </p>
          <div className="flex flex-wrap gap-2">
            {interests.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
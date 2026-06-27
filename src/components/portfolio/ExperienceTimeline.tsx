import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

const experience = [
  {
    year: "2024 — Now",
    role: "Senior Product Manager",
    org: "Independent Studio",
    notes: "Advising founders on product, design systems, and the careful build of small teams.",
  },
  {
    year: "2021 — 2024",
    role: "Head of Product",
    org: "Aviary (acq.)",
    notes: "Founded, designed, and shipped a scheduling primitive for distributed teams.",
  },
  {
    year: "2018 — 2021",
    role: "Senior PM · Design Tech",
    org: "Helios",
    notes: "Led the operator console rewrite. Embedded with engineering for two of the three years.",
  },
  {
    year: "2015 — 2018",
    role: "Product Designer & Engineer",
    org: "Atlas",
    notes: "Began as a designer, became a hybrid. First taste of the polymath approach.",
  },
];

function Gear({ teeth = 8 }: { teeth?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.svg
      animate={reduce ? {} : { rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      viewBox="0 0 40 40"
      className="h-10 w-10 text-blueprint"
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
    <section id="experience" className="relative px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          numeral="III"
          kicker="Cursus Honorum"
          title="A mechanical"
          italicTail="chronology."
        />

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
      </div>
    </section>
  );
}
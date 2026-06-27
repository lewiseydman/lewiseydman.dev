import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

const writings = [
  {
    date: "MMXXVI · iii",
    title: "The product manager as draftsman",
    excerpt: "On sketching as the first technical decision, not the last design polish.",
  },
  {
    date: "MMXXVI · i",
    title: "Notes on small surfaces",
    excerpt: "Why most operator tools collapse under the weight of their own dashboards.",
  },
  {
    date: "MMXXV · xi",
    title: "Hiring for the hyphen",
    excerpt: "Designer-engineers, engineer-PMs, and the case against the pure specialist.",
  },
  {
    date: "MMXXV · viii",
    title: "Against the platform shrug",
    excerpt: "A short essay on owning the runtime, even when the cloud is convenient.",
  },
];

const appraisals = [
  {
    subject: "Linear",
    verdict: "Master of restraint",
    note: "A working argument that opinionated tools age better than configurable ones.",
  },
  {
    subject: "Figma's editor",
    verdict: "Quietly polymathic",
    note: "Engineering choices that read as design choices and vice versa.",
  },
  {
    subject: "Things 3",
    verdict: "The patient classic",
    note: "Twenty years of refusing to add features I would have added in week one.",
  },
  {
    subject: "Are.na",
    verdict: "An honest workshop",
    note: "A reminder that the best software still resembles a commonplace book.",
  },
];

export function WritingsAppraisals() {
  return (
    <section id="writings" className="relative px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          numeral="IV"
          kicker="Codex Notarum"
          title="Blogs &"
          italicTail="appraisals."
        />

        <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
          <div className="bg-background p-8 md:p-12">
            <div className="mb-8 flex items-center justify-between">
              <h3 className="font-display text-2xl">Writings</h3>
              <span className="font-mono-mar">Essays · {writings.length}</span>
            </div>
            <ul className="divide-y divide-border">
              {writings.map((w, i) => (
                <motion.li
                  key={w.title}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group"
                >
                  <a href="#" className="flex flex-col gap-2 py-5 transition-colors">
                    <div className="flex items-baseline justify-between gap-4">
                      <h4 className="font-display text-xl text-foreground transition-colors group-hover:text-blueprint md:text-2xl">
                        {w.title}
                      </h4>
                      <span className="font-mono-mar shrink-0">{w.date}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{w.excerpt}</p>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="bg-background p-8 md:p-12 paper-grain">
            <div className="mb-8 flex items-center justify-between">
              <h3 className="font-display text-2xl italic text-sepia">Appraisals</h3>
              <span className="font-mono-mar">Marginalia</span>
            </div>
            <ul className="space-y-6">
              {appraisals.map((a, i) => (
                <motion.li
                  key={a.subject}
                  initial={{ opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1"
                >
                  <span className="font-mono-mar pt-1">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3">
                      <h4 className="font-display text-lg text-foreground">{a.subject}</h4>
                      <span className="font-display italic text-sepia">&mdash; {a.verdict}</span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{a.note}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
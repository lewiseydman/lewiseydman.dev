import { motion } from "framer-motion";

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
  {
    subject: "Arc Browser",
    verdict: "Brave, occasionally lost",
    note: "Proof that ambition without restraint is a feature, until it isn't.",
  },
  {
    subject: "iA Writer",
    verdict: "The narrow doorway",
    note: "One opinion, defended for fifteen years. The clearest writing surface I own.",
  },
];

export function Appraisals() {
  return (
    <div className="flex flex-col gap-8">
      <p className="font-display text-2xl leading-snug md:text-3xl">
        Marginalia &mdash;{" "}
        <span className="italic text-sepia">short verdicts on tools that have shaped my taste.</span>
      </p>
      <ul className="grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2">
        {appraisals.map((a, i) => (
          <motion.li
            key={a.subject}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group flex flex-col gap-3 bg-background p-6 md:p-7"
          >
            <div className="flex items-baseline justify-between">
              <span className="font-mono-mar">{`Laus · ${String(i + 1).padStart(2, "0")}`}</span>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-display text-2xl md:text-3xl">{a.subject}</h3>
              <p className="font-display text-lg italic text-sepia md:text-xl">&mdash; {a.verdict}</p>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{a.note}</p>
            <div className="mt-1 h-px w-0 bg-sepia transition-all duration-500 group-hover:w-full" />
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
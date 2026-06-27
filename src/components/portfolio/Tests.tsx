import { motion } from "framer-motion";

const tests = [
  {
    num: "I",
    title: "Product Sense",
    domain: "Discovery · Judgement",
    note: "A written disputatio on a consumer product of your choosing — structure, opportunity, and the first three things I would change.",
  },
  {
    num: "II",
    title: "Systems Thinking",
    domain: "Architecture · Trade-offs",
    note: "Map an existing software product as a system of forces. Where does it bend, where does it break, and how would you re-balance it?",
  },
  {
    num: "III",
    title: "Design Critique",
    domain: "Craft · Taste",
    note: "Annotate a single screen of your choosing. Argue both sides — the designer's intent and the user's experience.",
  },
  {
    num: "IV",
    title: "Execution",
    domain: "Prototype · Ship",
    note: "A small, working artefact built in under a week. Code, Figma, or pen — whichever speaks most clearly.",
  },
];

export function Tests() {
  return (
    <div className="flex flex-col gap-8">
      <p className="font-display text-2xl leading-snug text-foreground md:text-3xl">
        Short <span className="italic text-sepia">disputationes</span> — exercises I use to think
        with collaborators, and that collaborators can use to think with me.
      </p>

      <ol className="grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2">
        {tests.map((t, i) => (
          <motion.li
            key={t.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 * i }}
            className="group flex flex-col gap-3 bg-background p-6 md:p-8"
          >
            <div className="flex items-start justify-between">
              <span className="font-mono-mar">{`Disputatio · ${t.num}`}</span>
              <span className="font-mono-mar">{t.domain}</span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl">{t.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{t.note}</p>
            <div className="mt-2 h-px w-0 bg-sepia transition-all duration-500 group-hover:w-full" />
          </motion.li>
        ))}
      </ol>

      <p className="font-mono-mar">
        — Request a disputatio by correspondence; replies within seven days.
      </p>
    </div>
  );
}
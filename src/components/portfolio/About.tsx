import { motion } from "framer-motion";
import portrait from "@/assets/portrait.png";

const disciplines = [
  {
    label: "Design",
    body: "Systems thinking, interaction design, type. From wireframe to motion spec.",
    tools: "Figma · Linear · Framer",
  },
  {
    label: "Engineering",
    body: "TypeScript across the stack. React, Node, Postgres, and the edge.",
    tools: "TS · React · Postgres",
  },
  {
    label: "Product",
    body: "Discovery, strategy, and the patient orchestration of cross-disciplinary teams.",
    tools: "Roadmaps · Research · Rituals",
  },
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

            <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-3">
              {disciplines.map((d, i) => (
                <motion.div
                  key={d.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="flex flex-col gap-3 bg-background p-6"
                >
                  <span className="font-mono-mar">{`§ ${String(i + 1).padStart(2, "0")}`}</span>
                  <h3 className="font-display text-2xl">{d.label}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{d.body}</p>
                  <span className="font-mono-mar mt-auto pt-3">{d.tools}</span>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                ["08", "Years shipping"],
                ["40+", "Products advised"],
                ["3", "Disciplines woven"],
                ["∞", "Notebooks filled"],
              ].map(([n, l]) => (
                <div key={l} className="flex flex-col">
                  <span className="font-display text-4xl text-foreground">{n}</span>
                  <span className="font-mono-mar mt-2">{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  );
}
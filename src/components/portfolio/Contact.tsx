import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

const links = [
  { label: "Email", value: "hello@lewiseydman.com", href: "mailto:hello@lewiseydman.com" },
  { label: "GitHub", value: "github.com/lewiseydman", href: "https://github.com" },
  { label: "LinkedIn", value: "in/lewiseydman", href: "https://linkedin.com" },
  { label: "Read.cv", value: "read.cv/lewiseydman", href: "https://read.cv" },
];

export function Contact() {
  return (
    <section id="contact" className="relative px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          numeral="V"
          kicker="Correspondentia"
          title="Begin a"
          italicTail="correspondence."
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-sm border border-border bg-card p-10 md:p-16"
        >
          <div className="absolute inset-0 blueprint-grid-fine opacity-20 pointer-events-none" />
          <div className="absolute inset-0 paper-grain pointer-events-none" />

          <div className="relative grid gap-12 md:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="font-display text-3xl leading-tight text-foreground md:text-5xl">
                I'm always glad to receive a letter &mdash; whether it concerns a{" "}
                <span className="italic text-sepia">half-formed product</span> or a{" "}
                <span className="italic text-sepia">finished one</span> in need of a second pair of
                eyes.
              </p>
              <a
                href="mailto:hello@lewiseydman.com"
                className="group mt-10 inline-flex items-center gap-3 rounded-full border border-foreground/80 bg-foreground px-6 py-3 text-sm text-background transition-all hover:gap-4"
              >
                Write to me
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>

            <ul className="flex flex-col divide-y divide-border self-end">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="group flex items-baseline justify-between gap-4 py-4 transition-colors hover:text-sepia"
                  >
                    <span className="font-mono-mar">{l.label}</span>
                    <span className="font-display text-lg transition-transform group-hover:-translate-x-1">
                      {l.value} <span className="text-sepia">↗</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mt-14 flex items-end justify-between border-t border-border pt-6">
            <span className="font-mono-mar">Signed,</span>
            <span
              className="font-display text-5xl italic text-sepia"
              style={{ fontFamily: "var(--font-display)" }}
            >
              L. Eydman
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
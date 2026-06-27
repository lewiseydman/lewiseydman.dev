import { motion, useReducedMotion } from "framer-motion";
import vitruvian from "@/assets/vitruvian.png";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative isolate flex min-h-screen items-center overflow-hidden px-6 pt-32 pb-20 md:px-12"
    >
      {/* blueprint backdrop */}
      <div className="absolute inset-0 -z-10 blueprint-grid opacity-40" />
      <div className="absolute inset-0 -z-10 paper-grain" />
      {/* corner crosshairs */}
      {["top-6 left-6", "top-6 right-6", "bottom-6 left-6", "bottom-6 right-6"].map((p) => (
        <div key={p} className={`pointer-events-none absolute ${p} text-blueprint/60`}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 0v20M0 10h20" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
      ))}

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono-mar mb-6 flex items-center gap-3"
          >
            <span className="hairline h-px w-10" />
            <span>Folio · Anno MMXXVI</span>
          </motion.div>

          <h1 className="font-display text-[3.2rem] leading-[0.95] tracking-[-0.02em] sm:text-[4.5rem] md:text-[5.5rem]">
            {"Lewis".split("").map((c, i) => (
              <motion.span
                key={`l1-${i}`}
                initial={{ y: "60%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.04, ease: [0.2, 0.7, 0.2, 1] }}
                className="inline-block"
              >
                {c}
              </motion.span>
            ))}
            <br />
            <span className="italic text-sepia">
              {"Eydman".split("").map((c, i) => (
                <motion.span
                  key={`l2-${i}`}
                  initial={{ y: "60%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.35 + i * 0.04, ease: [0.2, 0.7, 0.2, 1] }}
                  className="inline-block"
                >
                  {c}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Product Manager bridging{" "}
            <span className="text-foreground underline decoration-blueprint underline-offset-4">UX/UI design</span> and{" "}
            <span className="text-foreground underline decoration-blueprint underline-offset-4">
              full-stack development
            </span>
            . Drawing connections between disciplines in the tradition of the renaissance polymath.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="mt-10 flex flex-wrap items-center gap-6"
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-3 rounded-full border border-foreground/80 bg-foreground px-6 py-3 text-sm text-background transition-all hover:gap-4"
            >
              View the codex
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a href="#contact" className="font-mono-mar hover:text-foreground">
              · Correspondence
            </a>
          </motion.div>
        </div>

        {/* Vitruvian */}
        <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center">
          <motion.div
            initial={{ rotate: 0 }}
            animate={reduce ? {} : { rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <svg viewBox="0 0 400 400" className="h-full w-full text-blueprint/40">
              <circle
                cx="200"
                cy="200"
                r="195"
                stroke="currentColor"
                strokeWidth="0.5"
                fill="none"
                strokeDasharray="2 4"
              />
              <circle cx="200" cy="200" r="170" stroke="currentColor" strokeWidth="0.5" fill="none" />
            </svg>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            className="relative h-[90%] w-[90%]"
          >
            <img
              src={vitruvian}
              alt="Vitruvian-style line drawing"
              className="h-full w-full object-contain mix-blend-multiply dark:mix-blend-screen dark:invert dark:hue-rotate-180"
            />
          </motion.div>
          {/* annotation */}
          <div className="absolute -right-2 top-6 hidden flex-col items-end gap-1 md:flex">
            <span className="font-mono-mar">Proportio · Hominis</span>
            <span className="hairline h-px w-16" />
          </div>
          <div className="absolute -left-2 bottom-10 hidden flex-col items-start gap-1 md:flex">
            <span className="hairline h-px w-16" />
            <span className="font-mono-mar">Fig. 01</span>
          </div>
        </div>
      </div>

      {/* scroll hint */}
      <motion.div
        animate={reduce ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono-mar">Scroll</span>
        <span className="hairline h-10 w-px" />
      </motion.div>
    </section>
  );
}

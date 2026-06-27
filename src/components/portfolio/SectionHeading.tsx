import { motion } from "framer-motion";

export function SectionHeading({
  numeral,
  kicker,
  title,
  italicTail,
}: {
  numeral: string;
  kicker: string;
  title: string;
  italicTail?: string;
}) {
  return (
    <div className="mb-14 flex flex-col gap-4 md:mb-20">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-mono-mar flex items-center gap-3"
      >
        <span>Folio · {numeral}</span>
        <span className="hairline h-px w-12" />
        <span>{kicker}</span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-display text-4xl tracking-[-0.01em] md:text-6xl"
      >
        {title}
        {italicTail ? <span className="italic text-sepia"> {italicTail}</span> : null}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{ transformOrigin: "left" }}
        className="hairline h-px w-full"
      />
    </div>
  );
}
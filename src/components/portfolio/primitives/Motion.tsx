import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { durations, easeOut } from "@/lib/motion";

type FadeInProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  duration?: number;
};

/**
 * Shared entry animation. Skips motion when the user prefers reduced motion,
 * so we don't have to remember the guard at every call site.
 */
export function FadeIn({ delay = 0, y = 10, duration = durations.base, ...rest }: FadeInProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : duration, delay: reduce ? 0 : delay, ease: easeOut }}
      {...rest}
    />
  );
}

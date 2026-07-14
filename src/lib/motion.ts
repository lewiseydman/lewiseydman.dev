import type { Transition, Variants } from "framer-motion";

/**
 * Centralised motion tokens. Import these instead of hand-rolling
 * `{ type: "spring", stiffness: ... }` at call sites so easing, spring
 * feel and durations stay consistent across the site.
 */
export const durations = {
  fast: 0.2,
  base: 0.3,
  slow: 0.5,
} as const;

export const easeOut = [0.22, 1, 0.36, 1] as const;

export const spring: Transition = {
  type: "spring",
  stiffness: 220,
  damping: 30,
  mass: 0.85,
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 32,
  mass: 0.7,
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: durations.base, ease: easeOut } },
};

/** Zero-motion transition for `useReducedMotion()` fallbacks. */
export const reducedTransition: Transition = { duration: 0 };

export function withReduced<T extends Transition>(t: T, reduced: boolean): Transition {
  return reduced ? reducedTransition : t;
}

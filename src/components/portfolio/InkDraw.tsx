import { motion, useReducedMotion, type MotionProps } from "framer-motion";
import type { ReactNode } from "react";

type Props = MotionProps & {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
};

export function InkDrawSvg({ children, className, duration = 2.4, delay = 0, ...rest }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.svg
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reduce ? 0 : duration, delay, ease: "easeInOut" }}
      {...rest}
    >
      {children}
    </motion.svg>
  );
}

export const drawVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1 },
};
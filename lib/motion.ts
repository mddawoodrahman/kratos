import type { Variants } from "framer-motion";

export const transition = {
  type: "spring",
  duration: 0.3,
};

export const slideIn: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.25, 0, 1], // easeOutQuart
    },
  },
  exit: {
    opacity: 0,
    y: 20,
  },
};

export const fadeIn: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
  },
};

export const scaleIn: Variants = {
  initial: {
    opacity: 0,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
  },
};

export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const motionTokens = {
  duration: {
    fast: 0.12,
    normal: 0.24,
    slow: 0.4,
  },
  ease: {
    default: [0.25, 0.25, 0, 1],
    in: [0.4, 0, 1, 1],
    out: [0, 0, 0.2, 1],
    easeInOut: [0.4, 0, 0.2, 1],
  },
};

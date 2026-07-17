import { Variants } from "framer-motion"

// ==========================================
// K&T GLOBAL ANIMATION SYSTEM
// ==========================================

export const ANIMATION_DURATION = {
  fast: 0.2,      // 200ms
  standard: 0.5,  // 500ms
  narrative: 0.8, // 800ms
}

export const ANIMATION_EASING = {
  // Smooth deceleration for entries
  smooth: [0.22, 1, 0.36, 1],
  // Quick and clean exits
  exit: [0.76, 0, 0.24, 1],
  // Mechanical feel for technological elements
  mechanical: [0.85, 0, 0.15, 1],
  // Slight elasticity for buttons/micro-interactions
  elastic: [0.34, 1.56, 0.64, 1],
}

// ==========================================
// VARIANTS
// ==========================================

export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATION.standard,
      ease: ANIMATION_EASING.smooth,
    },
  },
}

export const fadeDownVariant: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATION.standard,
      ease: ANIMATION_EASING.smooth,
    },
  },
}

export const blurFadeInVariant: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)", scale: 0.98 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: ANIMATION_DURATION.narrative,
      ease: ANIMATION_EASING.smooth,
    },
  },
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const textRevealVariant: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    transition: {
      duration: ANIMATION_DURATION.standard,
      ease: ANIMATION_EASING.mechanical,
    },
  },
}

export const scanlineVariant: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)", opacity: 0, y: 20 },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATION.narrative,
      ease: ANIMATION_EASING.smooth,
    },
  },
}

// Card depth entries
export const cardDepthVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATION.standard,
      ease: ANIMATION_EASING.smooth,
    },
  },
}

// Line drawings
export const drawLineVariant: Variants = {
  hidden: { scaleX: 0, transformOrigin: "left" },
  visible: {
    scaleX: 1,
    transition: {
      duration: ANIMATION_DURATION.narrative,
      ease: ANIMATION_EASING.smooth,
    },
  },
}

// Minimal static fallback for prefers-reduced-motion
export const reducedMotionVariant: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: ANIMATION_DURATION.fast } },
}

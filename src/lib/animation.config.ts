// Global animation configuration
// All timings are designed to feel slow, emotional, and cinematic

export const EASING = {
    smooth: 'easeInOutQuad' as const,
    gentle: 'easeInOutSine' as const,
    dramatic: 'easeInOutCubic' as const,
    spring: 'spring(1, 80, 10, 0)' as const,
};

export const DURATION = {
    fast: 0.4,
    normal: 0.8,
    slow: 1.2,
    cinematic: 1.8,
    dramatic: 2.5,
};

export const STAGGER = {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
    text: 0.08,
};

// Framer Motion transition presets
export const transitions = {
    fadeIn: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: DURATION.normal, ease: [0.25, 0.1, 0.25, 1] },
    },
    slideUp: {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: DURATION.slow, ease: [0.25, 0.1, 0.25, 1] },
    },
    slideLeft: {
        initial: { opacity: 0, x: -60 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: DURATION.slow, ease: [0.25, 0.1, 0.25, 1] },
    },
    slideRight: {
        initial: { opacity: 0, x: 60 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: DURATION.slow, ease: [0.25, 0.1, 0.25, 1] },
    },
    scale: {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: DURATION.slow, ease: [0.25, 0.1, 0.25, 1] },
    },
};

// Anime.js timeline defaults
export const animeDefaults = {
    easing: 'easeInOutQuad',
    duration: 800,
};

// Reduced motion check
export const prefersReducedMotion = (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

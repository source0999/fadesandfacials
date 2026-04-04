"use client";

import { useScroll, useTransform } from "framer-motion";

/**
 * Scroll-linked scale for full-bleed backgrounds.
 * Progress while the section crosses the viewport: 1 → maxScale.
 */
export function useCinematicBackgroundScale(sectionRef, maxScale = 1.1) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
    layoutEffect: false,
  });
  return useTransform(scrollYProgress, [0, 1], [1, maxScale]);
}

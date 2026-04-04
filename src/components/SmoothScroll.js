"use client";

import { Fragment, useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll({ children }) {
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return undefined;

    let lenis;
    try {
      lenis = new Lenis({
        autoRaf: true,
        lerp: 0.085,
        smoothWheel: true,
        anchors: true,
      });
    } catch {
      return undefined;
    }

    return () => {
      lenis?.destroy();
    };
  }, []);

  return <Fragment>{children}</Fragment>;
}

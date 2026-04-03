"use client";

/**
 * iOS “Add to Home Screen” and slow networks can delay or fail JS chunks.
 * Avoid opacity:0 SSR — that left whole sections invisible without hydration.
 */
export function ScrollReveal({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

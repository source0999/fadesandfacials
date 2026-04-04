"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { BASE_PATH } from "../lib/basePath";

/** Time each slide is fully visible before cross-fade to the next (5s). */
const SLIDE_INTERVAL_MS = 5000;

/** Cross-fade length (1.5s) — keep in sync with Framer `transition.duration` below. */
const CROSS_FADE_DURATION_S = 1.5;

/** Viewports under 768px: static JPEG instead of GIF carousel (performance + readability). */
const MOBILE_MEDIA_QUERY = "(max-width: 767px)";

/* Filenames must match `public/` exactly — GitHub Pages (Linux) is case-sensitive. */
const GIF_FILES = ["productsBg1.gif", "productsBg2.gif", "productsBg3.gif"];

const MOBILE_BG_URL = `${BASE_PATH}/mobileBg.jpg`;

function subscribeMq(mq, onChange) {
  if (typeof mq.addEventListener === "function") {
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }
  mq.addListener(onChange);
  return () => mq.removeListener(onChange);
}

export function ProductsBackgroundCarousel() {
  const urls = useMemo(
    () => GIF_FILES.map((f) => `${BASE_PATH}/${f}`),
    [BASE_PATH]
  );
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const mq = window.matchMedia(MOBILE_MEDIA_QUERY);
    const sync = () => setIsMobile(mq.matches);
    sync();
    return subscribeMq(mq, sync);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const id = window.setInterval(() => {
      setIndex((n) => (n + 1) % urls.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [urls.length, isMobile]);

  if (isMobile) {
    return (
      <div
        className="products-bg-carousel products-bg-carousel--static"
        style={{ backgroundImage: `url("${MOBILE_BG_URL}")` }}
        aria-hidden
      />
    );
  }

  const src = urls[index];

  return (
    <div className="products-bg-carousel" aria-hidden>
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={src}
          className="products-bg-carousel-slide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: CROSS_FADE_DURATION_S,
            ease: "easeInOut",
          }}
        >
          <img
            src={src}
            alt=""
            className="products-bg-carousel-img"
            width={1920}
            height={1080}
            decoding="async"
            fetchPriority="low"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

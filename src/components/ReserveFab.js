"use client";

import { useEffect, useState } from "react";
import { useBookModal } from "./BookModalProvider";

const SHOW_AFTER_PX = 120;

export function ReserveFab() {
  const { openBookModal } = useBookModal();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`reserve-fab${visible ? " reserve-fab--visible" : ""}`}
      tabIndex={visible ? 0 : -1}
      onClick={openBookModal}
    >
      Reserve Now
    </button>
  );
}

"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { BookNowModal } from "./BookNowModal";

const BookModalContext = createContext(null);

export function BookModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openBookModal = useCallback(() => setOpen(true), []);
  const closeBookModal = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ openBookModal }),
    [openBookModal]
  );

  return (
    <BookModalContext.Provider value={value}>
      {children}
      <BookNowModal open={open} onClose={closeBookModal} />
    </BookModalContext.Provider>
  );
}

const noopOpen = () => {};

/**
 * Returns openBookModal. If BookModalProvider is missing (HMR, mis-placed tree),
 * no-ops instead of throwing so the app still renders.
 */
export function useBookModal() {
  const ctx = useContext(BookModalContext);
  if (ctx) return ctx;
  if (process.env.NODE_ENV === "development") {
    console.warn(
      "[useBookModal] Used outside BookModalProvider — booking actions are disabled."
    );
  }
  return { openBookModal: noopOpen };
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const BASE_PATH = "/fadesandfacials";

const links = [
  { href: `${BASE_PATH}/#home`, label: "Home", idx: "01" },
  { href: `${BASE_PATH}/#book`, label: "Book Now", idx: "02" },
  { href: `${BASE_PATH}/#services`, label: "Services", idx: "03" },
  { href: `${BASE_PATH}/#products`, label: "Products", idx: "04" },
  { href: `${BASE_PATH}/#cart`, label: "Cart", idx: "05" },
];

const spring = { type: "spring", stiffness: 420, damping: 28 };

const menuContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.09, delayChildren: 0.08 },
  },
};

const menuItem = {
  initial: { opacity: 0, x: 56 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 380,
      damping: 24,
      mass: 0.85,
    },
  },
};

function MorphHamburger({ open, onClick, className }) {
  return (
    <button
      type="button"
      className={className}
      aria-expanded={open}
      aria-controls="site-menu-overlay"
      onClick={onClick}
    >
      <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      <span className="nav-burger" aria-hidden>
        <motion.span
          className="nav-burger-bar"
          animate={open ? { y: 8, rotate: 45 } : { y: 0, rotate: 0 }}
          transition={spring}
          style={{ top: 0, transformOrigin: "center" }}
        />
        <motion.span
          className="nav-burger-bar"
          animate={
            open ? { opacity: 0, scaleX: 0.15 } : { opacity: 1, scaleX: 1 }
          }
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 32,
            opacity: { duration: 0.12 },
          }}
          style={{ top: 8 }}
        />
        <motion.span
          className="nav-burger-bar"
          animate={open ? { y: -8, rotate: -45 } : { y: 0, rotate: 0 }}
          transition={spring}
          style={{ top: 16, transformOrigin: "center" }}
        />
      </span>
    </button>
  );
}

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(false);

  const pill = navVisible || open;

  useEffect(() => {
    function update() {
      const heroEl = document.getElementById("home");
      const headerOffset = 96; // makes the transition happen right after the hero
      if (!heroEl) {
        setNavVisible(window.scrollY > headerOffset);
        return;
      }

      const threshold = heroEl.offsetTop + heroEl.offsetHeight - headerOffset;
      setNavVisible(window.scrollY >= threshold);
    }

    let rafId = 0;
    function onScroll() {
      // Throttle scroll handler for smoother motion.
      window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(update);
    }

    update();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    function onChange() {
      if (mq.matches) setOpen(false);
    }
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    }
    mq.addListener(onChange);
    return () => mq.removeListener(onChange);
  }, []);

  function toggleMenu() {
    setOpen((v) => !v);
  }

  return (
    <>
      <motion.header
        className={`nav-header${pill ? " nav-header--visible" : ""}`}
        aria-label="Main"
        initial={{ opacity: 0, y: "100%", scale: 0.98 }}
        animate={{
          opacity: pill ? 1 : 0,
          y: pill ? 0 : "100%",
          scale: pill ? 1 : 0.98,
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="nav-header-pill">
          <a
            href={`${BASE_PATH}/#home`}
            className="nav-brand nav-brand--logo-only"
            aria-label="Fades & Facials — Home"
          >
            <Image
              src={`${BASE_PATH}/logo.png`}
              alt=""
              width={90}
              height={66}
              priority
              className="nav-brand-mark"
            />
            <span className="sr-only">Fades &amp; Facials</span>
          </a>

          <nav className="nav-desktop" aria-label="Primary desktop">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="nav-desktop-link">
                {link.label}
              </a>
            ))}
          </nav>

          <MorphHamburger
            open={open}
            onClick={toggleMenu}
            className="nav-menu-trigger"
          />
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="site-menu-overlay"
            className="nav-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="nav-overlay-panel"
              initial={{ opacity: 0.85, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0.85, y: -24 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setOpen(false)}
              role="presentation"
            >
              <motion.nav
                className="nav-overlay-nav"
                aria-label="Primary"
                variants={menuContainer}
                initial="initial"
                animate="animate"
                onClick={(e) => e.stopPropagation()}
              >
                {links.map((link) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="nav-overlay-link"
                    variants={menuItem}
                    onClick={() => setOpen(false)}
                  >
                    <span className="nav-overlay-idx">{link.idx}</span>
                    <span className="nav-overlay-label">{link.label}</span>
                  </motion.a>
                ))}
              </motion.nav>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

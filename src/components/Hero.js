"use client";

import { motion } from "framer-motion";
import { BASE_PATH } from "../lib/basePath";

const ease = [0.22, 1, 0.36, 1];

export function Hero() {
  return (
    <section id="home" className="hero-experience" aria-label="Hero">
      <motion.div
        className="hero-experience-media"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.95, ease }}
      >
        <video
          className="hero-experience-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        >
          <source src={`${BASE_PATH}/chairs.mp4`} type="video/mp4" />
        </video>
        <div className="hero-experience-fade" aria-hidden />
      </motion.div>

      <div className="hero-experience-content">
        <motion.h1
          className="hero-experience-title"
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.45, ease }}
        >
          <span className="hero-experience-title-word">
            Fades <span className="hero-experience-title-accent">and</span> Facials
          </span>
        </motion.h1>

        <motion.p
          className="hero-experience-sub"
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.62, ease }}
        >
          It&apos;s more than a haircut. It&apos;s an experience.
        </motion.p>

        <motion.div
          className="hero-experience-cta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.85, ease }}
        >
          <motion.a
            href="#book"
            className="btn-appointment hero-experience-btn"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.9, ease }}
          >
            Make an Appointment
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { BASE_PATH } from "../lib/basePath";
import { useBookModal } from "./BookModalProvider";
import { useCinematicBackgroundScale } from "../hooks/useCinematicBackgroundScale";

export function Hero() {
  const { openBookModal } = useBookModal();
  const sectionRef = useRef(null);
  const scale = useCinematicBackgroundScale(sectionRef, 1.1);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="hero-experience"
      aria-label="Hero"
    >
      <div className="hero-experience-media">
        <motion.div
          className="hero-experience-media-scale"
          style={{
            scale,
            transformOrigin: "50% 50%",
          }}
        >
          <img
            src={`${BASE_PATH}/lele1.gif`}
            alt=""
            className="hero-experience-bg"
            width={1920}
            height={1080}
            decoding="async"
            fetchPriority="high"
          />
        </motion.div>
        <div className="hero-experience-overlay" aria-hidden />
      </div>

      <div className="hero-experience-content">
        <h1 className="hero-experience-title">
          <span className="hero-experience-title-word">
            Fades <span className="hero-experience-title-accent">and</span> Facials
          </span>
        </h1>

        <p className="hero-experience-sub">
          It&apos;s more than a haircut. It&apos;s an experience.
        </p>

        <div className="hero-experience-cta" id="book">
          <button
            type="button"
            className="btn-appointment hero-experience-btn"
            onClick={openBookModal}
          >
            Make an Appointment
          </button>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BASE_PATH } from "../lib/basePath";

export function Hero() {
  const bookHref = `${BASE_PATH}/#book`;
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

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
            transformOrigin: "50% 0%",
          }}
        >
          <video
            className="hero-experience-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={`${BASE_PATH}/hair1.jpg`}
            aria-hidden
          >
            <source src={`${BASE_PATH}/chairs.mp4`} type="video/mp4" />
          </video>
        </motion.div>
        <div className="hero-experience-fade" aria-hidden />
        <div className="hero-experience-melt" aria-hidden />
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
          <a href={bookHref} className="btn-appointment hero-experience-btn">
            Make an Appointment
          </a>
        </div>
      </div>
    </section>
  );
}

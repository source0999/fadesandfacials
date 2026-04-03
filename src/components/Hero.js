"use client";

import { BASE_PATH } from "../lib/basePath";

export function Hero() {
  const bookHref = `${BASE_PATH}/#book`;

  return (
    <section id="home" className="hero-experience" aria-label="Hero">
      <div className="hero-experience-media">
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
        <div className="hero-experience-fade" aria-hidden />
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

        <div className="hero-experience-cta">
          <a href={bookHref} className="btn-appointment hero-experience-btn">
            Make an Appointment
          </a>
        </div>
      </div>
    </section>
  );
}

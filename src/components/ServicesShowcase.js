"use client";

import Image from "next/image";
import { BASE_PATH } from "../lib/basePath";
import { useBookModal } from "./BookModalProvider";

const SERVICES = [
  {
    num: "01",
    name: "Signature Fades",
    detail: "Precision taper, skin fade, texture.",
    image: `${BASE_PATH}/fade.gif`,
    imageAlt: "Signature fade result",
  },
  {
    num: "02",
    name: "Hot Towel Shaves",
    detail: "Classic straight-razor finish.",
    image: `${BASE_PATH}/lele2.gif`,
    imageAlt: "Hot towel shave",
  },
  {
    num: "03",
    name: "Restorative Facials",
    detail: "Steam, extract, calm, refresh.",
    image: `${BASE_PATH}/facial.gif`,
    imageAlt: "Facial treatment",
  },
];

export function ServicesShowcase() {
  const { openBookModal } = useBookModal();

  return (
    <section id="services" className="services-showcase services-showcase-lifetime">
      <div className="services-showcase-inner">
        <header className="services-showcase-intro">
          <p className="services-micro-heading">Services</p>
          <h2 className="services-statement-title">
            Elevated Grooming for the Modern Man
          </h2>
        </header>

        <ul className="services-list">
          {SERVICES.map((s) => (
            <li key={s.num} className="services-list-item">
              <div className="services-copy-block">
                <span className="services-num-bg" aria-hidden="true">
                  {s.num}
                </span>
                <div className="services-copy">
                  <span className="services-name">{s.name}</span>
                  <span className="services-detail">{s.detail}</span>
                </div>
              </div>
              <div className="services-item-photo">
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  width={1200}
                  height={800}
                  className="services-item-img"
                  sizes="(max-width: 768px) 100vw, 42rem"
                  unoptimized
                />
                <button
                  type="button"
                  className="services-item-micro-tag"
                  onClick={openBookModal}
                >
                  Book Now →
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

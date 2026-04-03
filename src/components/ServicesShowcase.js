"use client";

import Image from "next/image";

const BASE_PATH = "/fadesandfacials";

const SERVICES = [
  {
    num: "01",
    name: "Signature Fades",
    detail: "Precision taper, skin fade, texture.",
    image: `${BASE_PATH}/hair1.jpg`,
    imageAlt: "Signature fade result",
  },
  {
    num: "02",
    name: "Hot Towel Shaves",
    detail: "Classic straight-razor finish.",
    image: `${BASE_PATH}/hair2.jpg`,
    imageAlt: "Hot towel shave",
  },
  {
    num: "03",
    name: "Restorative Facials",
    detail: "Steam, extract, calm, refresh.",
    image: `${BASE_PATH}/hair3.jpg`,
    imageAlt: "Facial treatment",
  },
];

export function ServicesShowcase() {
  return (
    <section id="services" className="services-showcase">
      <div className="services-kinetic-layer" aria-hidden="true">
        <p className="services-kinetic-text">
          FADES • SHAVES • FACIALS • CRAFT • FADES • SHAVES • FACIALS •
        </p>
      </div>

      <div className="services-showcase-inner">
        <h2 className="services-heading">Services</h2>
        <p className="services-lede">
          Engineered sessions — not templates. Every visit is calibrated to you.
        </p>

        <ul className="services-list">
          {SERVICES.map((s) => (
            <li key={s.num} className="services-list-item">
              <div className="services-list-grid">
                <span className="services-num">{s.num}</span>
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
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

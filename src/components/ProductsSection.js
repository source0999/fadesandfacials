"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BASE_PATH } from "../lib/basePath";

const PRODUCTS = [
  {
    id: "item-1",
    name: "Matte Clay",
    tag: "Hold / Texture",
    price: "$24",
    image: `${BASE_PATH}/item1.png`,
  },
  {
    id: "item-2",
    name: "Sea Salt Mist",
    tag: "Volume / Grit",
    price: "$22",
    image: `${BASE_PATH}/item2.png`,
  },
  {
    id: "item-3",
    name: "Post-Shave Balm",
    tag: "Calm / Repair",
    price: "$28",
    image: `${BASE_PATH}/item3.png`,
  },
  {
    id: "item-4",
    name: "Daily Moisturizer",
    tag: "Hydrate / Finish",
    price: "$26",
    image: `${BASE_PATH}/item4.png`,
  },
];

function ProductCard({ product }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const [tiltEnabled, setTiltEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    function sync() {
      setTiltEnabled(mq.matches);
    }
    sync();
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", sync);
      return () => mq.removeEventListener("change", sync);
    }
    mq.addListener(sync);
    return () => mq.removeListener(sync);
  }, []);

  function onMove(e) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    mx.set(px);
    my.set(py);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  const rotateXTarget = useTransform(my, [-0.5, 0.5], [7, -7]);
  const rotateYTarget = useTransform(mx, [-0.5, 0.5], [-10, 10]);
  const rotateX = useSpring(rotateXTarget, {
    stiffness: 260,
    damping: 22,
  });
  const rotateY = useSpring(rotateYTarget, {
    stiffness: 260,
    damping: 22,
  });

  const tiltStyle = tiltEnabled
    ? {
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }
    : {
        rotateX: 0,
        rotateY: 0,
        transformStyle: "flat",
      };

  const href = `${BASE_PATH}/#cart`;

  return (
    <motion.a
      ref={ref}
      href={href}
      className="product-card"
      aria-label={`${product.name}, ${product.price} — view in cart`}
      onPointerMove={tiltEnabled ? onMove : undefined}
      onPointerLeave={tiltEnabled ? onLeave : undefined}
      style={tiltStyle}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    >
      <div className="product-card-face">
        <span className="product-card-plus" aria-hidden="true">
          +
        </span>
        <div className="product-card-photo product-card-photo--png">
          <img
            src={product.image}
            alt=""
            loading="eager"
            decoding="async"
            className="product-card-img product-card-img--png"
          />
        </div>
        <span className="product-card-tag">{product.tag}</span>
        <h3 className="product-card-name">{product.name}</h3>
        <span className="product-card-price">{product.price}</span>
      </div>
    </motion.a>
  );
}

export function ProductsSection() {
  return (
    <section id="products" className="products-section">
      <h2 className="section-title">Products</h2>
      <p className="section-lede">
        Shelf staples we use on the floor — same finish at home.
      </p>
      <div
        className="product-grid"
        style={{ perspective: "1200px" }}
      >
        {PRODUCTS.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

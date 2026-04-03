"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const PRODUCTS = [
  {
    id: "item-1",
    name: "Matte Clay",
    tag: "Hold / Texture",
    price: "$24",
    image: "/item1.png",
  },
  {
    id: "item-2",
    name: "Sea Salt Mist",
    tag: "Volume / Grit",
    price: "$22",
    image: "/item2.png",
  },
  {
    id: "item-3",
    name: "Post-Shave Balm",
    tag: "Calm / Repair",
    price: "$28",
    image: "/item3.png",
  },
  {
    id: "item-4",
    name: "Daily Moisturizer",
    tag: "Hydrate / Finish",
    price: "$26",
    image: "/item4.png",
  },
];

function ProductCard({ product }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

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

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), {
    stiffness: 260,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
    stiffness: 260,
    damping: 22,
  });

  return (
    <motion.article
      ref={ref}
      className="product-card"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    >
      <div className="product-card-face">
        <div className="product-card-photo product-card-photo--png">
          <Image
            src={product.image}
            alt=""
            fill
            className="product-card-img product-card-img--png"
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
          />
        </div>
        <span className="product-card-tag">{product.tag}</span>
        <h3 className="product-card-name">{product.name}</h3>
        <span className="product-card-price">{product.price}</span>
        <span className="product-card-cta">Tap to explore</span>
      </div>
    </motion.article>
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

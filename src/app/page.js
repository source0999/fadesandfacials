import { Hero } from "../components/Hero";
import { Navigation } from "../components/Navigation";
import { ProductsBackgroundCarousel } from "../components/ProductsBackgroundCarousel";
import { ProductsSection } from "../components/ProductsSection";
import { ReserveFab } from "../components/ReserveFab";
import { ScrollReveal } from "../components/ScrollReveal";
import { ServicesShowcase } from "../components/ServicesShowcase";

export default function Home() {
  return (
    <>
      <Navigation />
      <ReserveFab />
      <main className="main-surface">
        <Hero />

        <div className="services-curtain-wrap">
          <ServicesShowcase />
        </div>

        <div className="products-surface products-surface--immersive">
          <ProductsBackgroundCarousel />
          <div className="products-immersive-scrim" aria-hidden />
          <div className="section-block products-immersive-content">
            <ProductsSection />
          </div>
        </div>

        <ScrollReveal className="section-block section-cart">
          <h2 className="section-title" id="cart">
            Cart
          </h2>
          <p className="section-lede">
            Checkout lives here — line items, tips, and product add-ons in one
            motion.
          </p>
        </ScrollReveal>
      </main>
    </>
  );
}

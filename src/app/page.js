import { Hero } from "../components/Hero";
import { Navigation } from "../components/Navigation";
import { ProductsSection } from "../components/ProductsSection";
import { ScrollReveal } from "../components/ScrollReveal";
import { ServicesShowcase } from "../components/ServicesShowcase";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="main-surface">
        <Hero />

        <ScrollReveal className="section-block section-book" delay={0}>
          <h2 className="section-title" id="book">
            Book Now
          </h2>
          <p className="section-lede">
            Reserve your chair — quiet calendar, zero friction. Walk-ins when
            the room allows.
          </p>
        </ScrollReveal>

        <ServicesShowcase />

        <ScrollReveal className="section-block" delay={0.05}>
          <ProductsSection />
        </ScrollReveal>

        <ScrollReveal className="section-block section-cart" delay={0.06}>
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

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

        <ScrollReveal className="section-block section-book">
          <h2 className="section-title" id="book">
            Book Now
          </h2>
          <p className="section-lede">
            Reserve your chair — quiet calendar, zero friction. Walk-ins when
            the room allows.
          </p>
        </ScrollReveal>

        <ServicesShowcase />

        {/* No ScrollReveal: iOS Safari/Chrome often never satisfy Framer whileInView; content stayed opacity:0 */}
        <div className="section-block">
          <ProductsSection />
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

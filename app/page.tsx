import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import FeaturedDishes from "@/components/home/FeaturedDishes";
import About from "@/components/home/About";
import Testimonials from "@/components/home/Testimonials";
import Gallery from "@/components/home/Gallery";
import Location from "@/components/home/Location";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturedDishes />
        <About />
        <Testimonials />
        <Gallery />
        <Location />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

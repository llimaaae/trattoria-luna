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
  const restaurantJsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Trattoria Luna",
    description: "Restaurante italiano autêntico. Receitas tradicionais, ingredientes frescos, ambiente acolhedor.",
    url: "https://trattoria-luna.vercel.app",
    telephone: "+5500000000000",
    email: "contato@trattorialuna.com.br",
    servesCuisine: ["Italiana", "Massas frescas"],
    priceRange: "R$$",
    acceptsReservations: "True",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua das Acácias, 123",
      addressLocality: "Porto Alegre",
      addressRegion: "RS",
      postalCode: "90570-000",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -30.0397,
      longitude: -51.2004,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday"],
        opens: "18:00",
        closes: "23:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday", "Saturday"],
        opens: "12:00",
        closes: "00:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday"],
        opens: "12:00",
        closes: "16:00",
      },
    ],
    sameAs: [
      "https://instagram.com/trattorialuna",
      "https://facebook.com/trattorialuna",
      "https://tiktok.com/@trattorialuna",
    ],
    menu: "https://trattoria-luna.vercel.app/cardapio",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
      />
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

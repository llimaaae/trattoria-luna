"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
      {/* Background image placeholder - will be replaced with real photo */}
      <div className="absolute inset-0 bg-gradient-to-br from-terracotta/20 via-cream to-olive/10">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-0" id="hero-bg" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-charcoal mb-6 leading-tight">
            Sabores que atravessam
            <br />
            <span className="text-terracotta">gerações</span>
          </h1>
          <p className="text-xl sm:text-2xl text-charcoal/80 max-w-3xl mx-auto mb-8 font-light">
            Autêntica culinária italiana. Receitas de família. Ingredientes frescos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/reservas"
              className="inline-flex items-center justify-center rounded-md bg-terracotta px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-terracotta/90 transition-smooth focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
              onClick={() => {
                if (typeof window !== "undefined" && window.gtag) {
                  window.gtag("event", "cta_click", {
                    location: "hero",
                    action: "reservar_mesa",
                  });
                }
              }}
            >
              Reservar Mesa
            </Link>
            <Link
              href="/cardapio"
              className="inline-flex items-center justify-center rounded-md border-2 border-charcoal bg-cream px-8 py-4 text-base font-semibold text-charcoal shadow-lg hover:bg-charcoal hover:text-cream transition-smooth focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
            >
              Ver Cardápio
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-charcoal/30 flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-charcoal rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

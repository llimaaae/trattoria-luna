"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-terracotta to-terracotta/80 text-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-display font-bold mb-6">
            Pronto para uma experiência autêntica?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Reserve sua mesa e descubra os sabores que atravessam gerações. Prepare-se para uma viagem gastronômica pela Itália.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/reservas"
              className="inline-flex items-center justify-center rounded-md bg-white px-8 py-4 text-base font-semibold text-terracotta shadow-lg hover:bg-cream transition-smooth focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              onClick={() => {
                if (typeof window !== "undefined" && window.gtag) {
                  window.gtag("event", "cta_click", {
                    location: "cta_section",
                    action: "reservar_mesa",
                  });
                }
              }}
            >
              Reservar Mesa
            </Link>
            <Link
              href="/cardapio"
              className="inline-flex items-center justify-center rounded-md border-2 border-white bg-transparent px-8 py-4 text-base font-semibold text-white hover:bg-white hover:text-terracotta transition-smooth focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Explorar Cardápio
            </Link>
          </div>
          <div className="mt-8 pt-8 border-t border-white/20">
            <p className="text-white/80 text-sm">
              Atendemos de terça a domingo. Segunda, estamos preparando novos pratos para você.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

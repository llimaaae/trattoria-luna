"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const galleryImages = [
  { id: 1, src: "/images/gallery-1.jpg", alt: "Interior acolhedor do restaurante", category: "Ambiente" },
  { id: 2, src: "/images/gallery-2.jpg", alt: "Prato de pasta fresca artesanal", category: "Pratos" },
  { id: 3, src: "/images/gallery-3.jpg", alt: "Mesa preparada para jantar especial", category: "Ambiente" },
  { id: 4, src: "/images/gallery-4.jpg", alt: "Sobremesa italiana tradicional", category: "Sobremesas" },
  { id: 5, src: "/images/gallery-5.jpg", alt: "Chef preparando massa fresca", category: "Cozinha" },
  { id: 6, src: "/images/gallery-6.jpg", alt: "Vinhos selecionados", category: "Bebidas" },
];

export default function Gallery() {
  return (
    <section className="py-16 sm:py-24 bg-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-charcoal mb-4">
            Galeria
          </h2>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
            Um vislumbre da experiência que te aguarda
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-terracotta/30 to-olive/30 group-hover:opacity-0 transition-smooth" />
              <div className="absolute inset-0 bg-charcoal/40 group-hover:bg-charcoal/20 transition-smooth" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-sm font-semibold px-4 py-2 bg-terracotta/90 rounded-full opacity-0 group-hover:opacity-100 transition-smooth">
                  {image.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="/galeria"
            className="inline-flex items-center text-terracotta font-semibold hover:text-terracotta/80 transition-smooth group"
          >
            Ver galeria completa
            <svg
              className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-smooth"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

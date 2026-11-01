"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const galleryImages = [
  { id: 1, category: "Ambiente", alt: "Interior acolhedor do restaurante" },
  { id: 2, category: "Pratos", alt: "Prato de pasta fresca artesanal" },
  { id: 3, category: "Ambiente", alt: "Mesa preparada para jantar especial" },
  { id: 4, category: "Sobremesas", alt: "Sobremesa italiana tradicional" },
  { id: 5, category: "Cozinha", alt: "Chef preparando massa fresca" },
  { id: 6, category: "Bebidas", alt: "Vinhos selecionados" },
  { id: 7, category: "Pratos", alt: "Entrada italiana com burrata" },
  { id: 8, category: "Ambiente", alt: "Detalhes da decoração" },
  { id: 9, category: "Pratos", alt: "Risoto cremoso com funghi" },
  { id: 10, category: "Cozinha", alt: "Preparação dos pratos" },
  { id: 11, category: "Sobremesas", alt: "Tiramisù clássico" },
  { id: 12, category: "Ambiente", alt: "Vista geral do salão" },
];

const categories = ["Todos", "Ambiente", "Pratos", "Sobremesas", "Cozinha", "Bebidas"];

export default function GaleriaPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredImages = selectedCategory === "Todos" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        <section className="bg-gradient-to-br from-terracotta/20 to-olive/10 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              className="text-5xl sm:text-6xl font-display font-bold text-charcoal mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Galeria
            </motion.h1>
            <motion.p
              className="text-xl text-charcoal/70 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Um vislumbre da experiência que te aguarda na Trattoria Luna
            </motion.p>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-smooth ${
                    selectedCategory === cat
                      ? "bg-terracotta text-white"
                      : "bg-white text-charcoal hover:bg-charcoal/5 shadow-sm"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="relative aspect-square bg-gradient-to-br from-terracotta/20 to-olive/20 rounded-lg overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-smooth"
                >
                  <div className="absolute inset-0 bg-charcoal/40 group-hover:bg-charcoal/20 transition-smooth" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold px-4 py-2 bg-terracotta/90 rounded-full opacity-0 group-hover:opacity-100 transition-smooth">
                      {image.category}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-charcoal/80 to-transparent">
                    <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-smooth">
                      {image.alt}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-display font-bold text-charcoal mb-4">
              Pronto para viver essa experiência?
            </h2>
            <p className="text-lg text-charcoal/70 mb-8">
              Reserve sua mesa e descubra cada detalhe pessoalmente
            </p>
            <a
              href="/reservas"
              className="inline-flex items-center justify-center rounded-md bg-terracotta px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-terracotta/90 transition-smooth"
            >
              Reservar Mesa
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const featuredDishes = [
  {
    id: 1,
    name: "Tagliatelle al Ragù",
    description: "Massa fresca artesanal com molho bolonhesa tradicional, cozido por 6 horas",
    price: "R$ 68,00",
    category: "Massas",
    image: "/images/tagliatelle.jpg",
    dietary: ["Destaque do Chef"],
  },
  {
    id: 2,
    name: "Ossobuco alla Milanese",
    description: "Jarrete bovino braseado lentamente com risoto açafrão e gremolata",
    price: "R$ 92,00",
    category: "Carnes",
    image: "/images/ossobuco.jpg",
    dietary: ["Prato Especial"],
  },
  {
    id: 3,
    name: "Burrata con Pomodori",
    description: "Burrata artesanal com tomates confitados, manjericão e azeite trufado",
    price: "R$ 54,00",
    category: "Entradas",
    image: "/images/burrata.jpg",
    dietary: ["Vegetariano"],
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function FeaturedDishes() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl sm:text-5xl font-display font-bold text-charcoal mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Destaques da Casa
          </motion.h2>
          <motion.p
            className="text-lg text-charcoal/70 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Pratos que contam histórias, preparados com técnicas tradicionais e ingredientes cuidadosamente selecionados
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {featuredDishes.map((dish) => (
            <motion.article
              key={dish.id}
              variants={item}
              className="group bg-cream rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-smooth"
            >
              <div className="relative h-64 bg-gradient-to-br from-terracotta/10 to-olive/10 overflow-hidden">
                <div className="absolute top-4 right-4 space-y-2">
                  {dish.dietary.map((tag) => (
                    <span
                      key={tag}
                      className="block bg-gold text-charcoal text-xs font-semibold px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-sm text-olive font-semibold uppercase tracking-wide">
                      {dish.category}
                    </span>
                    <h3 className="text-2xl font-display font-bold text-charcoal mt-1 group-hover:text-terracotta transition-smooth">
                      {dish.name}
                    </h3>
                  </div>
                  <span className="text-xl font-semibold text-terracotta whitespace-nowrap ml-4">
                    {dish.price}
                  </span>
                </div>
                <p className="text-charcoal/70 text-sm leading-relaxed">
                  {dish.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href="/cardapio"
            className="inline-flex items-center text-terracotta font-semibold hover:text-terracotta/80 transition-smooth group"
          >
            Ver cardápio completo
            <svg
              className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-smooth"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

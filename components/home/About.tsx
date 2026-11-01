"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="py-16 sm:py-24 bg-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-terracotta/20 to-olive/20" />
              {/* Placeholder - real image will be added */}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div>
              <span className="text-olive font-semibold uppercase tracking-wide text-sm">
                Nossa História
              </span>
              <h2 className="text-4xl sm:text-5xl font-display font-bold text-charcoal mt-2 mb-6">
                Tradição que se renova a cada prato
              </h2>
            </div>

            <div className="space-y-4 text-charcoal/80 leading-relaxed">
              <p>
                A Trattoria Luna nasceu do sonho de uma família italiana que trouxe consigo não apenas receitas, mas histórias e tradições que atravessam o Atlântico e várias gerações.
              </p>
              <p>
                Cada prato que servimos é preparado com a mesma dedicação de uma cozinha de nonnas italianas, respeitando o tempo de cada ingrediente e as técnicas que transformam o simples em extraordinário.
              </p>
              <p>
                Nossa massa é feita diariamente à mão. Nossos molhos cozinham pelo tempo necessário, não pelo mais rápido. E nosso compromisso é com o sabor autêntico que conta histórias em cada garfada.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-charcoal/10">
              <div className="text-center">
                <div className="text-3xl font-display font-bold text-terracotta mb-1">12+</div>
                <div className="text-sm text-charcoal/60">Anos de tradição</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-display font-bold text-terracotta mb-1">100%</div>
                <div className="text-sm text-charcoal/60">Receitas originais</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-display font-bold text-terracotta mb-1">Fresh</div>
                <div className="text-sm text-charcoal/60">Ingredientes diários</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

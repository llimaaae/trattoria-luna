"use client";

import { motion } from "framer-motion";

export default function Location() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div>
              <span className="text-olive font-semibold uppercase tracking-wide text-sm">
                Visite-nos
              </span>
              <h2 className="text-4xl sm:text-5xl font-display font-bold text-charcoal mt-2 mb-6">
                Localização e Horários
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-charcoal mb-2">Endereço</h3>
                <address className="not-italic text-charcoal/70">
                  Rua das Acácias, 123<br />
                  Moinhos de Vento<br />
                  Porto Alegre - RS, 90570-000
                </address>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-charcoal mb-2">Horários</h3>
                <dl className="space-y-2 text-charcoal/70">
                  <div className="flex justify-between">
                    <dt className="font-medium">Terça a Quinta:</dt>
                    <dd>18h00 - 23h00</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Sexta e Sábado:</dt>
                    <dd>12h00 - 15h00 e 18h00 - 00h00</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Domingo:</dt>
                    <dd>12h00 - 16h00 e 18h00 - 22h00</dd>
                  </div>
                  <div className="flex justify-between text-terracotta font-semibold">
                    <dt>Segunda:</dt>
                    <dd>Fechado</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-charcoal mb-2">Contato</h3>
                <div className="space-y-2 text-charcoal/70">
                  <p>
                    <a href="tel:+5500000000000" className="hover:text-terracotta transition-smooth">
                      (00) 00000-0000
                    </a>
                  </p>
                  <p>
                    <a href="mailto:contato@trattorialuna.com.br" className="hover:text-terracotta transition-smooth">
                      contato@trattorialuna.com.br
                    </a>
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href="https://www.google.com/maps/search/Rua+das+Acácias,+123+Moinhos+de+Vento+Porto+Alegre"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-terracotta font-semibold hover:text-terracotta/80 transition-smooth group"
                >
                  Abrir no Google Maps
                  <svg
                    className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-smooth"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-terracotta/20 to-olive/20 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto text-charcoal/20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-charcoal/40 text-sm">Mapa ilustrativo</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

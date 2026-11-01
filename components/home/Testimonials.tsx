"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    content: "A melhor massa fresca que já comi fora da Itália. O ambiente é aconchegante e o atendimento impecável. Voltamos sempre!",
    author: "Ana Paula Silva",
    role: "Cliente desde 2023",
    rating: 5,
  },
  {
    id: 2,
    content: "Cada prato é uma experiência única. O Ossobuco alla Milanese é simplesmente perfeito. Ingredientes frescos e preparação impecável.",
    author: "Roberto Mendes",
    role: "Gastrônomo",
    rating: 5,
  },
  {
    id: 3,
    content: "Atendimento familiar, comida autêntica e aquele gostinho de estar em casa. A Trattoria Luna é nosso lugar favorito para ocasiões especiais.",
    author: "Carla e Fernando Costa",
    role: "Clientes regulares",
    rating: 5,
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

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-24 bg-charcoal text-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4">
            O que dizem nossos clientes
          </h2>
          <p className="text-lg text-cream/70 max-w-2xl mx-auto">
            Histórias de quem já experimentou a autenticidade da nossa cozinha
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial) => (
            <motion.article
              key={testimonial.id}
              variants={item}
              className="bg-cream/5 backdrop-blur-sm rounded-lg p-8 border border-cream/10 hover:border-gold/50 transition-smooth"
            >
              <div className="flex mb-4" aria-label={`${testimonial.rating} de 5 estrelas`}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-gold"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote>
                <p className="text-cream/90 leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>
              </blockquote>
              <div>
                <cite className="not-italic">
                  <div className="font-semibold text-gold">{testimonial.author}</div>
                  <div className="text-sm text-cream/60">{testimonial.role}</div>
                </cite>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

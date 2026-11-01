"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        {/* Hero */}
        <section className="bg-gradient-to-br from-terracotta/20 to-olive/10 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              className="text-5xl sm:text-6xl font-display font-bold text-charcoal mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Nossa História
            </motion.h1>
            <motion.p
              className="text-xl text-charcoal/70 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Uma jornada de sabores que atravessa o Atlântico e várias gerações
            </motion.p>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <div className="space-y-6 text-charcoal/80 leading-relaxed">
                <p className="text-xl font-semibold text-charcoal">
                  A Trattoria Luna nasceu de um sonho antigo, cultivado ao longo de três gerações em uma pequena vila na Toscana.
                </p>

                <p>
                  Em 2012, a família Rossini decidiu cruzar o oceano, trazendo consigo não apenas receitas guardadas em cadernos amarelados, mas histórias, tradições e um profundo amor pela culinária italiana autêntica. Porto Alegre se tornou seu novo lar, e foi aqui que a Trattoria Luna abriu suas portas.
                </p>

                <p>
                  O nome "Luna" foi escolhido pela Nonna Maria, matriarca da família, que sempre dizia que a lua governa os ciclos da natureza e, portanto, o sabor dos ingredientes. "Respeite a lua, respeite as estações, e a comida falará por si mesma", era seu mantra.
                </p>

                <p>
                  Cada prato que servimos carrega essa filosofia. Nossa massa é feita diariamente, à mão, seguindo a técnica que o Nonno Giuseppe aprendeu com seu pai. Nossos molhos cozinham pelo tempo necessário — não pelo mais rápido —, e nossos ingredientes são escolhidos com o mesmo cuidado que uma nonna italiana coloca ao selecionar tomates no mercado.
                </p>

                <p>
                  Mais de uma década depois, a Trattoria Luna se tornou um pedaço da Itália no coração de Porto Alegre. Não apenas um restaurante, mas um lugar onde histórias são compartilhadas, amizades se formam, e cada refeição é uma celebração da tradição e do sabor autêntico.
                </p>

                <p className="text-xl font-semibold text-charcoal pt-6">
                  Bem-vindo à nossa mesa. Aqui, você faz parte da família.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-charcoal text-center mb-12">
              Nossos Valores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-charcoal mb-2">Feito com Amor</h3>
                <p className="text-charcoal/70">Cada prato preparado com dedicação e paixão, como se fosse para nossa própria família.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-olive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-olive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-charcoal mb-2">Autenticidade</h3>
                <p className="text-charcoal/70">Receitas tradicionais respeitadas, ingredientes selecionados, técnicas que honram a tradição.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-charcoal mb-2">Família</h3>
                <p className="text-charcoal/70">Tratamos cada cliente como parte da família, com o mesmo carinho e atenção.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 sm:py-24 bg-cream">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-charcoal text-center mb-12">
              Nossa Equipe
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-48 h-48 bg-gradient-to-br from-terracotta/20 to-olive/20 rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-charcoal">Chef Giovanni Rossini</h3>
                <p className="text-terracotta font-medium mb-2">Chef Executivo</p>
                <p className="text-sm text-charcoal/70">Terceira geração de chefs, aprendeu na cozinha da Nonna Maria desde os 8 anos.</p>
              </div>
              <div className="text-center">
                <div className="w-48 h-48 bg-gradient-to-br from-olive/20 to-gold/20 rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-charcoal">Chiara Rossini</h3>
                <p className="text-terracotta font-medium mb-2">Sommelier</p>
                <p className="text-sm text-charcoal/70">Especialista em vinhos italianos, cuida da harmonização perfeita para cada prato.</p>
              </div>
              <div className="text-center">
                <div className="w-48 h-48 bg-gradient-to-br from-gold/20 to-terracotta/20 rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-charcoal">Marco Bianchi</h3>
                <p className="text-terracotta font-medium mb-2">Sous Chef</p>
                <p className="text-sm text-charcoal/70">Mestre das massas frescas, responsável pela produção diária artesanal.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

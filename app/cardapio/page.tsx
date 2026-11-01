"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { menuData, categories, allTags, type MenuItem } from "@/data/menu";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredMenu = useMemo(() => {
    return menuData.filter((item) => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !selectedCategory || item.category === selectedCategory;
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => item.tags.includes(tag));

      return matchesSearch && matchesCategory && matchesTags && item.available;
    });
  }, [searchQuery, selectedCategory, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const groupedMenu = useMemo(() => {
    const groups: Record<string, MenuItem[]> = {};
    filteredMenu.forEach(item => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    });
    return groups;
  }, [filteredMenu]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-terracotta/20 to-olive/10 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              className="text-5xl sm:text-6xl font-display font-bold text-charcoal mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Nosso Cardápio
            </motion.h1>
            <motion.p
              className="text-xl text-charcoal/70 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Receitas tradicionais preparadas com ingredientes selecionados e muito amor
            </motion.p>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 bg-white border-b border-charcoal/10 sticky top-20 z-40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-xl mx-auto">
                <input
                  type="search"
                  placeholder="Buscar por prato ou ingrediente..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 pr-4 rounded-lg border border-charcoal/20 focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-smooth"
                  aria-label="Buscar no cardápio"
                />
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-smooth ${
                  selectedCategory === null
                    ? "bg-terracotta text-white"
                    : "bg-charcoal/5 text-charcoal hover:bg-charcoal/10"
                }`}
              >
                Todos
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-smooth ${
                    selectedCategory === category
                      ? "bg-terracotta text-white"
                      : "bg-charcoal/5 text-charcoal hover:bg-charcoal/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Tag Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-smooth ${
                    selectedTags.includes(tag)
                      ? "bg-olive text-white"
                      : "bg-olive/10 text-olive hover:bg-olive/20"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Results count */}
            {(searchQuery || selectedCategory || selectedTags.length > 0) && (
              <p className="text-center mt-4 text-sm text-charcoal/60">
                {filteredMenu.length} {filteredMenu.length === 1 ? "prato encontrado" : "pratos encontrados"}
              </p>
            )}
          </div>
        </section>

        {/* Menu Items */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {Object.keys(groupedMenu).length === 0 ? (
              <div className="text-center py-16">
                <svg className="w-16 h-16 mx-auto text-charcoal/20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-lg text-charcoal/60">Nenhum prato encontrado</p>
                <p className="text-sm text-charcoal/40 mt-2">Tente ajustar os filtros</p>
              </div>
            ) : (
              Object.entries(groupedMenu).map(([category, items]) => (
                <div key={category} className="mb-16">
                  <h2 className="text-3xl sm:text-4xl font-display font-bold text-charcoal mb-8 text-center">
                    {category}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item, index) => (
                      <motion.article
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-smooth group"
                      >
                        <div className="relative h-48 bg-gradient-to-br from-terracotta/10 to-olive/10">
                          {item.tags.length > 0 && (
                            <div className="absolute top-3 right-3 space-y-1 z-10">
                              {item.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="block bg-gold text-charcoal text-xs font-semibold px-2 py-1 rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-xl font-display font-bold text-charcoal group-hover:text-terracotta transition-smooth flex-1">
                              {item.name}
                            </h3>
                            <span className="text-xl font-semibold text-terracotta whitespace-nowrap ml-4">
                              R$ {item.price.toFixed(2)}
                            </span>
                          </div>
                          <p className="text-charcoal/70 text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-br from-terracotta/10 to-olive/10">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-charcoal mb-4">
              Pronto para experimentar?
            </h2>
            <p className="text-lg text-charcoal/70 mb-8">
              Reserve sua mesa e deixe-se envolver pelos sabores autênticos da Itália
            </p>
            <a
              href="/reservas"
              className="inline-flex items-center justify-center rounded-md bg-terracotta px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-terracotta/90 transition-smooth focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
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

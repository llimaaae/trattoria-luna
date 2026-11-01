"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { menuData } from "@/data/menu";
import { searchablePages } from "@/data/pages";

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-gold text-charcoal">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "/" && !open) {
        const target = e.target as HTMLElement;
        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return { menu: [] as typeof menuData, pages: searchablePages };
    }
    const menu = menuData
      .filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      )
      .slice(0, 6);
    const pages = searchablePages
      .filter(
        (page) =>
          page.name.toLowerCase().includes(q) ||
          page.description.toLowerCase().includes(q)
      )
      .slice(0, 4);
    return { menu, pages };
  }, [query]);

  const openSearch = () => {
    setOpen(true);
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "search_used", { action: "open" });
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={openSearch}
        aria-label="Buscar no site"
        className="rounded-full p-2 text-charcoal hover:bg-terracotta/10 transition-smooth focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[70] bg-charcoal/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Busca do site"
        >
          <div
            className="mx-auto mt-24 max-w-xl w-[calc(100%-2rem)] bg-white rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center border-b border-charcoal/10">
              <svg className="ml-4 w-5 h-5 text-charcoal/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar pratos, páginas..."
                className="w-full px-4 py-4 text-base focus:outline-none"
                aria-label="Termo de busca"
              />
              <button
                ref={closeRef}
                onClick={() => setOpen(false)}
                className="mr-3 rounded-full p-1.5 text-charcoal/60 hover:bg-charcoal/5"
                aria-label="Fechar busca"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {results.pages.length > 0 && (
                <div className="pt-3">
                  <h3 className="px-4 pb-2 text-xs font-semibold uppercase tracking-wider text-olive">
                    Páginas
                  </h3>
                  <ul>
                    {results.pages.map((page) => (
                      <li key={page.href}>
                        <Link
                          href={page.href}
                          onClick={() => { setOpen(false); setQuery(""); }}
                          className="flex items-center justify-between px-4 py-3 hover:bg-cream transition-smooth"
                        >
                          <span>
                            <span className="font-semibold text-charcoal"><Highlight text={page.name} query={query} /></span>
                            <span className="block text-sm text-charcoal/60"><Highlight text={page.description} query={query} /></span>
                          </span>
                          <span className="flex-shrink-0 ml-4 rounded-full bg-cream px-3 py-1 text-xs font-semibold text-olive">Página</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {results.menu.length > 0 && (
                <div className="pt-3 pb-3">
                  <h3 className="px-4 pb-2 text-xs font-semibold uppercase tracking-wider text-terracotta">
                    Pratos
                  </h3>
                  <ul>
                    {results.menu.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={`/cardapio?prato=${item.id}`}
                          onClick={() => { setOpen(false); setQuery(""); }}
                          className="flex items-center justify-between px-4 py-3 hover:bg-cream transition-smooth"
                        >
                          <span>
                            <span className="font-semibold text-charcoal"><Highlight text={item.name} query={query} /></span>
                            <span className="block text-sm text-charcoal/60 line-clamp-1"><Highlight text={item.description} query={query} /></span>
                          </span>
                          <span className="flex-shrink-0 ml-4 text-sm font-semibold text-terracotta">
                            R$ {item.price.toFixed(2)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {query.trim() && results.menu.length === 0 && results.pages.length === 0 && (
                <div className="px-4 py-10 text-center">
                  <p className="text-charcoal/60">Nenhum resultado encontrado</p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {["Burrata", "Massas", "Reservas", "Horários"].map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="rounded-full bg-cream px-3 py-1.5 text-sm font-semibold text-charcoal hover:bg-terracotta/10 transition-smooth"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {!query.trim() && (
                <div className="px-4 py-6">
                  <p className="text-sm text-charcoal/50 mb-3">Sugestões rápidas:</p>
                  <div className="flex flex-wrap gap-2">
                    {["Burrata", "Tiramisù", "Risotto", "Horários"].map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="rounded-full bg-cream px-3 py-1.5 text-sm font-semibold text-charcoal hover:bg-terracotta/10 transition-smooth"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

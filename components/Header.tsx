"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import GlobalSearch from "@/components/GlobalSearch";

const navigation = [
  { name: "Início", href: "/" },
  { name: "Cardápio", href: "/cardapio" },
  { name: "Reservas", href: "/reservas" },
  { name: "Sobre", href: "/sobre" },
  { name: "Galeria", href: "/galeria" },
  { name: "Contato", href: "/contato" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-terracotta/10">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Principal">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 transition-smooth hover:opacity-80">
              <Image
                src="/logo.svg"
                alt="Trattoria Luna"
                width={120}
                height={48}
                priority
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-semibold transition-smooth ${
                    isActive
                      ? "text-terracotta border-b-2 border-terracotta"
                      : "text-charcoal hover:text-terracotta"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <GlobalSearch />
            <div className="hidden md:block">
              <Link
                href="/reservas"
                className="rounded-md bg-terracotta px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-terracotta/90 transition-smooth focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
              >
                Reservar Mesa
              </Link>
            </div>

            {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden rounded-md p-2 text-charcoal hover:bg-terracotta/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Menu principal"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-terracotta/10">
            <div className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-3 text-base font-semibold rounded-md transition-smooth ${
                      isActive
                        ? "bg-terracotta text-white"
                        : "text-charcoal hover:bg-terracotta/10"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="px-4 pt-2">
                <Link
                  href="/reservas"
                  className="block w-full rounded-md bg-terracotta px-6 py-3 text-center text-base font-semibold text-white shadow-sm hover:bg-terracotta/90 transition-smooth"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Reservar Mesa
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

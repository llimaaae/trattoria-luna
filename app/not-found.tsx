import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center py-16">
          <div className="mb-8">
            <div className="text-9xl font-display font-bold text-terracotta/20">404</div>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-charcoal mt-4 mb-6">
              Página não encontrada
            </h1>
            <p className="text-lg text-charcoal/70 mb-8">
              Parece que esta página saiu para buscar ingredientes frescos. Que tal explorar outras opções?
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md bg-terracotta px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-terracotta/90 transition-smooth"
            >
              Voltar ao Início
            </Link>
            <Link
              href="/cardapio"
              className="inline-flex items-center justify-center rounded-md border-2 border-charcoal bg-transparent px-8 py-4 text-base font-semibold text-charcoal hover:bg-charcoal hover:text-white transition-smooth"
            >
              Ver Cardápio
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-charcoal/10">
            <p className="text-sm text-charcoal/60 mb-4">Procurando algo específico?</p>
            <nav className="flex flex-wrap gap-4 justify-center text-sm">
              <Link href="/reservas" className="text-terracotta hover:underline">Reservas</Link>
              <span className="text-charcoal/30">•</span>
              <Link href="/sobre" className="text-terracotta hover:underline">Sobre</Link>
              <span className="text-charcoal/30">•</span>
              <Link href="/galeria" className="text-terracotta hover:underline">Galeria</Link>
              <span className="text-charcoal/30">•</span>
              <Link href="/contato" className="text-terracotta hover:underline">Contato</Link>
            </nav>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Header from "@/components/Header";

const BASE_URL = "https://trattoria-luna.vercel.app";

export const metadata: Metadata = {
  title: "Cardápio | Trattoria Luna",
  description:
    "Cardápio completo da Trattoria Luna: entradas, massas frescas artesanais, carnes, peixes, risottos e sobremesas italianas tradicionais.",
  alternates: { canonical: `${BASE_URL}/cardapio` },
  openGraph: {
    title: "Cardápio | Trattoria Luna",
    description: "Pratos autênticos da culinária italiana, preparados com ingredientes frescos.",
    url: `${BASE_URL}/cardapio`,
  },
};

export default function CardapioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menuJsonLd = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "Menu Trattoria Luna",
    url: `${BASE_URL}/cardapio`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd) }}
      />
      {children}
    </>
  );
}

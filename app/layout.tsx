import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Trattoria Luna | Sabores que atravessam gerações",
  description: "Restaurante italiano autêntico. Receitas tradicionais, ingredientes frescos, ambiente acolhedor. Reserve sua mesa.",
  keywords: ["restaurante italiano", "culinária italiana", "massa artesanal", "Porto Alegre", "trattoria"],
  authors: [{ name: "Trattoria Luna" }],
  openGraph: {
    title: "Trattoria Luna | Restaurante Italiano Autêntico",
    description: "Sabores que atravessam gerações. Receitas tradicionais em ambiente acolhedor.",
    url: "https://trattoria-luna.vercel.app",
    siteName: "Trattoria Luna",
    locale: "pt_BR",
    type: "restaurant.restaurant",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Trattoria Luna - Restaurante Italiano",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trattoria Luna | Restaurante Italiano",
    description: "Sabores que atravessam gerações",
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="antialiased font-sans text-gray-900 bg-cream">
        {children}
      </body>
    </html>
  );
}

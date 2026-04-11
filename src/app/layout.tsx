import type { Metadata } from "next";
import { Cormorant_Garamond, Mulish } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/shared/FloatingContact";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const mulish = Mulish({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Жидкое мыло и бытовая химия оптом | Производитель Дар Косметик",
  description: "Натуральная мыльная продукция оптом от производителя. Жидкое мыло, бытовая химия и средства гигиены для розницы, HoReCa и дистрибьюции. Собственное производство, сертифицированное качество.",
  keywords: ["жидкое мыло оптом", "бытовая химия оптом", "производитель мыла", "оптовые поставки", "HoReCa"],
  openGraph: {
    title: "Дар Косметик — Производитель мыла и бытовой химии оптом",
    description: "Натуральная мыльная продукция оптом от производителя",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${cormorant.variable} ${mulish.variable} antialiased font-body`}
      >
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}

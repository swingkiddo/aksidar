import type { Metadata } from "next";
import { Cormorant_Garamond, Mulish } from "next/font/google";
import "./globals.css";

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
  description: "Натуральная мыльная продукция оптом от производителя.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={`${cormorant.variable} ${mulish.variable} antialiased font-body`}>
        {children}
      </body>
    </html>
  );
}
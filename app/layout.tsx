import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nissrine Bussenet — Développeuse Fullstack",
  description:
    "Portfolio de Nissrine Bussenet, développeuse fullstack en reconversion. Web & mobile — React, Angular, Node.js, Next.js.",
  openGraph: {
    title: "Nissrine Bussenet — Développeuse Fullstack",
    description:
      "Développeuse fullstack en reconversion — React, Angular, Node.js, MongoDB, Next.js.",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nissrine Bussenet — Développeuse Fullstack",
    description:
      "Développeuse fullstack en reconversion — React, Angular, Node.js, MongoDB, Next.js.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      data-theme="light"
      data-palette="aurore"
      data-motion="on"
      className={`${outfit.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}

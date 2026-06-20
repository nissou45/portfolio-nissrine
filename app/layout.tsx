import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nissrine Bussenet | Développeuse Fullstack",
  description:
    "Portfolio de Nissrine Bussenet, développeuse fullstack junior en reconversion professionnelle. React, Angular, Node.js, MongoDB.",
  openGraph: {
    title: "Nissrine Bussenet | Développeuse Fullstack",
    description:
      "Développeuse fullstack junior en reconversion — React, Angular, Node.js, MongoDB, Next.js.",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nissrine Bussenet | Développeuse Fullstack",
    description:
      "Développeuse fullstack junior en reconversion — React, Angular, Node.js, MongoDB, Next.js.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

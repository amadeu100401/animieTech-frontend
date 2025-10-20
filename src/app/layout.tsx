import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../app/styles/App.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Animie Tech",
  description: "Catalogo de animes com informações técnicas detalhadas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased m-0 p-0`}   
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/config/providers";
import Header from "@/components/header";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EcoSpine - Premium Ortopedik Matraslar",
  description:
    "O'zbekistonda eng sifatli ortopedik va ekologik matraslar. 15 yildan ortiq tajriba, 50,000+ mamnun mijoz. Bepul yetkazib berish va 30 kun sinab ko'rish.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased `}
        >
      <Providers >

        <div className="bg-[#14192C]">
        <Header />
          {children}
          <Footer />
        </div>
      </Providers>

        </body>
    </html>
  );
}

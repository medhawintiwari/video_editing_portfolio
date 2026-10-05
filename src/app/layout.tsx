import type { Metadata } from "next";
import { Inter, Syncopate, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { personalInfo } from "@/data/personal";
import { CustomCursor } from "@/components/ui/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syncopate = Syncopate({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-syncopate",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://medha.win'),
  title: {
    default: `${personalInfo.name} — ${personalInfo.title}`,
    template: `%s | ${personalInfo.name}`,
  },
  description: personalInfo.tagline,
  keywords: ["video editor", "post-production", "colorist", "motion design", "director"],
  authors: [{ name: personalInfo.name }],
  creator: personalInfo.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://medha.win",
    title: `${personalInfo.name} — ${personalInfo.title}`,
    description: personalInfo.tagline,
    siteName: `medha.win`,
  },
};

import { AppleStyleDock } from "@/components/ui/dock-demo";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${syncopate.variable} ${jetbrainsMono.variable} font-body bg-bg-primary text-text-primary antialiased min-h-screen flex flex-col selection:bg-blue-electric selection:text-bg-primary`}
      >
        <CustomCursor />
        <SmoothScroll>
          <a href="#main-content" className="skip-to-content">
            Skip to content
          </a>
          <Header />
          <main id="main-content" className="flex-grow">
            {children}
          </main>
          <Footer />
          <AppleStyleDock />
        </SmoothScroll>
      </body>
    </html>
  );
}

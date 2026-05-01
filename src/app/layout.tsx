import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LangProvider } from "@/lib/LangContext";

export const metadata: Metadata = {
  title: {
    default: "NovaStack Africa — AI-Powered Solutions. Built for Impact.",
    template: "%s | NovaStack Africa",
  },
  description:
    "NovaStack Africa is a modern enterprise software company specializing in AI solutions, application development, process automation, and digital transformation for businesses across Africa.",
  keywords: [
    "AI solutions Africa",
    "software development Abidjan",
    "digital transformation",
    "automation",
    "enterprise software",
    "web applications",
    "Côte d'Ivoire tech",
    "NovaStack Africa",
  ],
  authors: [{ name: "NovaStack Africa" }],
  creator: "NovaStack Africa",
  metadataBase: new URL("https://novastack.africa"),
  openGraph: {
    type: "website",
    locale: "fr_CI",
    url: "https://novastack.africa",
    siteName: "NovaStack Africa",
    title: "NovaStack Africa — AI-Powered Solutions. Built for Impact.",
    description:
      "Enterprise AI, automation & software development for African businesses.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NovaStack Africa",
    description: "AI-Powered Solutions. Built for Impact.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="bg-dark-900 text-white antialiased">
        <LangProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "NovaStack Africa — Solutions IA. Construites pour l'impact.",
    template: "%s | NovaStack Africa",
  },
  description:
    "NovaStack Africa est une entreprise moderne de logiciels d'entreprise spécialisée dans les solutions IA, le développement d'applications et la transformation digitale pour les entreprises africaines.",
  keywords: [
    "solutions IA Afrique",
    "développement logiciel Abidjan",
    "transformation digitale",
    "automatisation",
    "logiciel entreprise",
    "applications web",
    "tech Côte d'Ivoire",
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
    title: "NovaStack Africa — Solutions IA. Construites pour l'impact.",
    description: "IA d'entreprise, automatisation et développement logiciel pour les entreprises africaines.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NovaStack Africa",
    description: "Solutions IA. Construites pour l'impact.",
  },
  robots: { index: true, follow: true },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "fr" | "en")) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} className="scroll-smooth">
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
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

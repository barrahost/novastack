import type { Metadata } from "next";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Space_Grotesk, Hanken_Grotesk, Newsreader } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--f-display",
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--f-body",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["italic"],
  variable: "--f-edit",
  display: "swap",
});

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
    <html
      lang={locale}
      className={`${spaceGrotesk.variable} ${hankenGrotesk.variable} ${newsreader.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body
        style={{
          fontFamily: "var(--f-body)",
        }}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

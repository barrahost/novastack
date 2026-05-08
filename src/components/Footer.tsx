"use client";

import Link from "next/link";
import { Mail, MapPin, Linkedin, ArrowUpRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();

  const company = [
    { label: tNav("about"), href: `/${locale}/about` },
    { label: tNav("services"), href: `/${locale}/services` },
    { label: tNav("contact"), href: `/${locale}/contact` },
  ];

  return (
    <footer className="relative border-t border-slate-border/30 bg-dark-950">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-blue-primary/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="40" height="40" rx="8" fill="url(#footerLogoGrad)" />
                  <path d="M8 28V12L16 22L20 16L24 22L32 12V28H28V20L24 26L20 20L16 26L12 20V28H8Z" fill="white" />
                  <circle cx="32" cy="10" r="3" fill="#F59E0B" />
                  <defs>
                    <linearGradient id="footerLogoGrad" x1="0" y1="0" x2="40" y2="40">
                      <stop stopColor="#0041C2" />
                      <stop offset="1" stopColor="#1A6BFF" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div>
                <span className="font-bold text-base">
                  <span className="text-white">Nova</span>
                  <span className="text-gradient-blue">Stack</span>
                </span>
                <div className="text-[8px] tracking-[0.2em] text-slate-text font-medium uppercase leading-none">
                  Africa
                </div>
              </div>
            </Link>
            <p className="text-slate-text text-sm leading-relaxed mb-5">
              {t("tagline")}
            </p>
            <div className="space-y-2.5">
              <a href="mailto:contact@novastack.africa"
                className="flex items-center gap-2.5 text-sm text-slate-text hover:text-white transition-colors group">
                <Mail className="w-4 h-4 text-blue-primary group-hover:scale-110 transition-transform" />
                contact@novastack.africa
              </a>
              <div className="flex items-center gap-2.5 text-sm text-slate-text">
                <MapPin className="w-4 h-4 text-blue-primary flex-shrink-0" />
                Abidjan, Côte d&apos;Ivoire
              </div>
              <a href="https://www.linkedin.com/company/novastack-africa" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-slate-text hover:text-white transition-colors group">
                <Linkedin className="w-4 h-4 text-blue-primary group-hover:scale-110 transition-transform" />
                LinkedIn
                <ArrowUpRight className="w-3 h-3 opacity-50" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">{t("company")}</h4>
            <ul className="space-y-2.5">
              {company.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-slate-text hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">{t("services")}</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href={`/${locale}/services`} className="text-slate-text hover:text-white text-sm transition-colors">
                  Application Development
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-border/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-muted text-xs">
            © {new Date().getFullYear()} NovaStack Africa. {t("rights")}
          </p>
          <p className="text-slate-muted text-xs">
            {t("builtIn")} 🇨🇮
          </p>
        </div>
      </div>
    </footer>
  );
}

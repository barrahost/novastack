"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Landmark, Radio, Truck, Server, ShoppingBag, Building, Heart, ArrowRight, ChevronRight } from "lucide-react";
import { useLang } from "@/lib/LangContext";
import { translations } from "@/lib/translations";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const stagger = { visible: { transition: { staggerChildren: 0.09 } } };

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

const industryIcons = [Landmark, Radio, Truck, Server, ShoppingBag, Building, Heart];

export default function IndustriesPage() {
  const { lang } = useLang();
  const t = translations[lang].industries;

  return (
    <div className="relative overflow-hidden pt-20">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 border-b border-slate-border/20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#03070F] to-dark-900" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-primary/6 rounded-full blur-[120px]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="label-orange mb-4">
            {t.badge}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight max-w-3xl">
            {t.h1}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl text-slate-text leading-relaxed max-w-2xl">
            {t.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Industries grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-slate-border/20 border border-slate-border/20">
            {t.items.map((ind, i) => {
              const Icon = industryIcons[i];
              const accent = i % 2 === 0 ? "blue" : "orange";
              return (
                <Section key={ind.name}>
                  <motion.div variants={fadeUp} className="card-dark p-8 group transition-all duration-300">
                    <div className="flex items-start gap-5 mb-6">
                      <div className={accent === "blue" ? "icon-box-blue flex-shrink-0" : "icon-box-orange flex-shrink-0"}>
                        <Icon className={`w-5 h-5 ${accent === "blue" ? "text-white" : "text-orange-primary"}`} />
                      </div>
                      <div>
                        <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${accent === "blue" ? "text-blue-light" : "text-orange-primary"}`}>
                          {t.industryLabel}
                        </p>
                        <h3 className="text-xl font-black text-white">{ind.name}</h3>
                      </div>
                    </div>
                    <p className="text-slate-text leading-relaxed mb-6 text-sm">{ind.desc}</p>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-muted mb-3">{t.useCasesLabel}</p>
                      <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {ind.useCases.map((uc) => (
                          <li key={uc} className="flex items-start gap-2 text-xs text-slate-text">
                            <div className={`w-1 h-1 mt-1.5 flex-shrink-0 ${accent === "blue" ? "bg-blue-primary" : "bg-orange-primary"}`} />
                            {uc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </Section>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-slate-border/20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-primary/5 via-transparent to-orange-primary/5" />
        <div className="relative max-w-2xl mx-auto text-center px-4">
          <Section>
            <motion.p variants={fadeUp} className="label-orange mb-4">{t.ctaLabel}</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl font-black text-white mb-4">
              {t.ctaTitle}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-text mb-8">{t.ctaText}</motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary group">
                {t.ctaPrimary} <ChevronRight className="w-4 h-4" />
              </Link>
              <Link href="/services" className="btn-outline">
                {t.ctaSecondary} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </Section>
        </div>
      </section>
    </div>
  );
}

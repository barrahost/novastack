"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Landmark, Radio, Truck, Server, ShoppingBag, Building, Heart, ArrowRight, ChevronRight } from "lucide-react";

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
const industryAccents = ["blue", "orange", "blue", "orange", "blue", "orange", "blue"];

export default function IndustriesPage() {
  const t = useTranslations("industries");
  const locale = useLocale();

  const industries = [
    { icon: industryIcons[0], accent: industryAccents[0], name: t("ind1Name"), desc: t("ind1Desc"), useCases: [t("ind1uc1"), t("ind1uc2"), t("ind1uc3"), t("ind1uc4")] },
    { icon: industryIcons[1], accent: industryAccents[1], name: t("ind2Name"), desc: t("ind2Desc"), useCases: [t("ind2uc1"), t("ind2uc2"), t("ind2uc3"), t("ind2uc4")] },
    { icon: industryIcons[2], accent: industryAccents[2], name: t("ind3Name"), desc: t("ind3Desc"), useCases: [t("ind3uc1"), t("ind3uc2"), t("ind3uc3"), t("ind3uc4")] },
    { icon: industryIcons[3], accent: industryAccents[3], name: t("ind4Name"), desc: t("ind4Desc"), useCases: [t("ind4uc1"), t("ind4uc2"), t("ind4uc3"), t("ind4uc4")] },
    { icon: industryIcons[4], accent: industryAccents[4], name: t("ind5Name"), desc: t("ind5Desc"), useCases: [t("ind5uc1"), t("ind5uc2"), t("ind5uc3"), t("ind5uc4")] },
    { icon: industryIcons[5], accent: industryAccents[5], name: t("ind6Name"), desc: t("ind6Desc"), useCases: [t("ind6uc1"), t("ind6uc2"), t("ind6uc3"), t("ind6uc4")] },
    { icon: industryIcons[6], accent: industryAccents[6], name: t("ind7Name"), desc: t("ind7Desc"), useCases: [t("ind7uc1"), t("ind7uc2"), t("ind7uc3"), t("ind7uc4")] },
  ];

  return (
    <div className="relative overflow-hidden pt-20">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 border-b border-slate-border/20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#03070F] to-dark-900" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-primary/6 rounded-full blur-[120px]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="label-orange mb-4">
            {t("label")}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight max-w-3xl">
            {t("title")}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl text-slate-text leading-relaxed max-w-2xl">
            {t("desc")}
          </motion.p>
        </div>
      </section>

      {/* Industries grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-slate-border/20 border border-slate-border/20">
            {industries.map((ind) => {
              const Icon = ind.icon;
              return (
                <Section key={ind.name}>
                  <motion.div variants={fadeUp} className="card-dark p-8 group transition-all duration-300">
                    <div className="flex items-start gap-5 mb-6">
                      <div className={ind.accent === "blue" ? "icon-box-blue flex-shrink-0" : "icon-box-orange flex-shrink-0"}>
                        <Icon className={`w-5 h-5 ${ind.accent === "blue" ? "text-white" : "text-orange-primary"}`} />
                      </div>
                      <div>
                        <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${ind.accent === "blue" ? "text-blue-light" : "text-orange-primary"}`}>
                          {t("industryTag")}
                        </p>
                        <h3 className="text-xl font-black text-white">{ind.name}</h3>
                      </div>
                    </div>
                    <p className="text-slate-text leading-relaxed mb-6 text-sm">{ind.desc}</p>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-muted mb-3">{t("useCasesLabel")}</p>
                      <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {ind.useCases.map((uc) => (
                          <li key={uc} className="flex items-start gap-2 text-xs text-slate-text">
                            <div className={`w-1 h-1 mt-1.5 flex-shrink-0 ${ind.accent === "blue" ? "bg-blue-primary" : "bg-orange-primary"}`} />
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
            <motion.p variants={fadeUp} className="label-orange mb-4">{t("ctaLabel")}</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl font-black text-white mb-4">{t("ctaTitle")}</motion.h2>
            <motion.p variants={fadeUp} className="text-slate-text mb-8">{t("ctaDesc")}</motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/contact`} className="btn-primary group">
                {t("ctaBtn")} <ChevronRight className="w-4 h-4" />
              </Link>
              <Link href={`/${locale}/services`} className="btn-outline">
                {t("ctaServices")} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </Section>
        </div>
      </section>
    </div>
  );
}

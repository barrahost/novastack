"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Code as Code2, ChevronRight, Globe, LayoutDashboard, Users, CircleCheck as CheckCircle2, ArrowRight, Building2 } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

export default function ServicesPage() {
  const t = useTranslations("services");
  const locale = useLocale();

  const subServices = [
    {
      icon: Globe,
      title: t("sub1Title"),
      desc: t("sub1Desc"),
      features: [t("sub1f1"), t("sub1f2"), t("sub1f3"), t("sub1f4")],
    },
    {
      icon: Building2,
      title: t("sub2Title"),
      desc: t("sub2Desc"),
      features: [t("sub2f1"), t("sub2f2"), t("sub2f3"), t("sub2f4")],
    },
    {
      icon: Users,
      title: t("sub3Title"),
      desc: t("sub3Desc"),
      features: [t("sub3f1"), t("sub3f2"), t("sub3f3"), t("sub3f4")],
    },
    {
      icon: LayoutDashboard,
      title: t("sub4Title"),
      desc: t("sub4Desc"),
      features: [t("sub4f1"), t("sub4f2"), t("sub4f3"), t("sub4f4")],
    },
  ];

  const process = [
    { step: "01", title: t("step1"), desc: t("step1Desc") },
    { step: "02", title: t("step2"), desc: t("step2Desc") },
    { step: "03", title: t("step3"), desc: t("step3Desc") },
    { step: "04", title: t("step4"), desc: t("step4Desc") },
    { step: "05", title: t("step5"), desc: t("step5Desc") },
  ];

  const features = [t("feat1"), t("feat2"), t("feat3"), t("feat4"), t("feat5")];

  return (
    <div className="relative overflow-hidden pt-20">
      {/* Hero */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 to-dark-900" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-primary/8 rounded-full blur-[100px]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-primary/30 bg-blue-primary/8 text-blue-light text-xs font-medium mb-6">
            <Code2 className="w-3.5 h-3.5" /> {t("badge")}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            {t("title")} <br />
            <span className="text-gradient-blue">{t("titleHighlight")}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl text-slate-text leading-relaxed max-w-2xl mx-auto mb-10">
            {t("desc")}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-primary hover:bg-blue-light text-white font-semibold rounded-xl transition-all shadow-glow-blue text-sm">
              {t("ctaPrimary")} <ChevronRight className="w-4 h-4" />
            </Link>
            <Link href={`/${locale}/about`} className="inline-flex items-center gap-2 px-7 py-3.5 border border-slate-border hover:border-blue-primary/40 text-slate-text hover:text-white rounded-xl transition-all text-sm font-semibold">
              {t("ctaSecondary")} <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features bar */}
      <section className="py-8 relative border-t border-slate-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-6 justify-center">
              {features.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-text">
                  <CheckCircle2 className="w-4 h-4 text-blue-primary flex-shrink-0" />
                  {item}
                </div>
              ))}
            </motion.div>
          </Section>
        </div>
      </section>

      {/* Sub-services */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <p className="label-orange mb-3">{t("deliverLabel")}</p>
              <h2 className="text-4xl font-black text-white mb-4">{t("deliverTitle")}</h2>
              <p className="text-slate-text max-w-xl mx-auto">{t("deliverDesc")}</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {subServices.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <motion.div key={s.title} variants={fadeUp}
                    className="card-dark p-8 group transition-all duration-300 hover:border-blue-primary/30">
                    <div className={`inline-flex p-3 rounded-xl mb-5 ${idx % 2 === 0 ? "bg-blue-primary/10 border border-blue-primary/20" : "bg-orange-primary/10 border border-orange-primary/20"}`}>
                      <Icon className={`w-6 h-6 ${idx % 2 === 0 ? "text-blue-light" : "text-orange-primary"}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{s.title}</h3>
                    <p className="text-slate-text leading-relaxed mb-6">{s.desc}</p>
                    <ul className="space-y-2">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-center gap-2.5 text-sm text-slate-text">
                          <div className={`w-1 h-1 flex-shrink-0 ${idx % 2 === 0 ? "bg-blue-primary" : "bg-orange-primary"}`} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </Section>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 relative border-t border-slate-border/20">
        <div className="absolute inset-0 bg-dark-800/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <p className="label-blue mb-3">{t("processLabel")}</p>
              <h2 className="text-4xl font-black text-white mb-4">{t("processTitle")}</h2>
              <p className="text-slate-text max-w-lg mx-auto">{t("processDesc")}</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {process.map((p, idx) => (
                <motion.div key={p.step} variants={fadeUp} className="relative">
                  <div className="card-dark p-6 h-full">
                    <div className="text-xs font-mono text-blue-light mb-3">{p.step}</div>
                    <h4 className="text-white font-bold mb-2">{p.title}</h4>
                    <p className="text-slate-text text-sm leading-relaxed">{p.desc}</p>
                  </div>
                  {idx < process.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-blue-primary/30 z-10" />
                  )}
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* Industries callout */}
      <section className="py-16 relative border-t border-slate-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={fadeUp} className="flex flex-col lg:flex-row items-center justify-between gap-8 card-dark p-10">
              <div className="max-w-xl">
                <p className="label-orange mb-3">{t("industryLabel")}</p>
                <h3 className="text-2xl font-bold text-white mb-3">{t("industryTitle")}</h3>
                <p className="text-slate-text leading-relaxed">{t("industryDesc")}</p>
              </div>
              <div className="flex-shrink-0">
                <Link href={`/${locale}/industries`} className="inline-flex items-center gap-2 px-7 py-3.5 border border-orange-primary/40 hover:bg-orange-primary/10 text-orange-primary font-semibold rounded-xl transition-all text-sm">
                  {t("industryCta")} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative border-t border-slate-border/20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-primary/5 via-transparent to-orange-primary/5" />
        <div className="relative max-w-2xl mx-auto text-center px-4">
          <Section>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-white mb-4">{t("ctaTitle")}</motion.h2>
            <motion.p variants={fadeUp} className="text-slate-text mb-8">{t("ctaDesc")}</motion.p>
            <motion.div variants={fadeUp}>
              <Link href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-primary hover:bg-blue-light text-white font-semibold rounded-xl transition-all shadow-glow-blue">
                {t("ctaBtn")} <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </Section>
        </div>
      </section>
    </div>
  );
}

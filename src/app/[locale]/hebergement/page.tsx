"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import {
  Globe, Server, Mail, Wrench, ChevronRight, ArrowRight,
  CircleCheck as CheckCircle2, ExternalLink, ShieldCheck, Zap, HeadphonesIcon,
} from "lucide-react";

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

export default function HebergementPage() {
  const t = useTranslations("hosting");
  const locale = useLocale();

  const services = [
    {
      icon: Globe,
      title: t("svc1Title"),
      desc: t("svc1Desc"),
      features: [t("svc1f1"), t("svc1f2"), t("svc1f3"), t("svc1f4")],
      color: "blue",
    },
    {
      icon: Server,
      title: t("svc2Title"),
      desc: t("svc2Desc"),
      features: [t("svc2f1"), t("svc2f2"), t("svc2f3"), t("svc2f4")],
      color: "orange",
    },
    {
      icon: Mail,
      title: t("svc3Title"),
      desc: t("svc3Desc"),
      features: [t("svc3f1"), t("svc3f2"), t("svc3f3"), t("svc3f4")],
      color: "blue",
    },
    {
      icon: Wrench,
      title: t("svc4Title"),
      desc: t("svc4Desc"),
      features: [t("svc4f1"), t("svc4f2"), t("svc4f3"), t("svc4f4")],
      color: "orange",
    },
  ];

  const why = [
    { icon: ShieldCheck, title: t("why1Title"), desc: t("why1Desc") },
    { icon: Zap,         title: t("why2Title"), desc: t("why2Desc") },
    { icon: Globe,       title: t("why3Title"), desc: t("why3Desc") },
    { icon: HeadphonesIcon, title: t("why4Title"), desc: t("why4Desc") },
    { icon: Server,      title: t("why5Title"), desc: t("why5Desc") },
    { icon: CheckCircle2,title: t("why6Title"), desc: t("why6Desc") },
  ];

  const features = [t("feat1"), t("feat2"), t("feat3"), t("feat4"), t("feat5")];

  return (
    <div className="relative overflow-hidden pt-20">

      {/* Hero */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 to-dark-900" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-orange-primary/8 rounded-full blur-[100px]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-primary/30 bg-orange-primary/8 text-orange-primary text-xs font-medium mb-6">
            <Server className="w-3.5 h-3.5" /> {t("badge")}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            {t("title")} <br />
            <span className="text-gradient-orange">{t("titleHighlight")}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl text-slate-text leading-relaxed max-w-2xl mx-auto mb-10">
            {t("desc")}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://espace.d-infras.africa" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-orange-primary hover:opacity-90 text-white font-semibold rounded-xl transition-all shadow-glow-orange text-sm">
              {t("ctaPrimary")} <ExternalLink className="w-4 h-4" />
            </a>
            <Link href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-slate-border hover:border-orange-primary/40 text-slate-text hover:text-white rounded-xl transition-all text-sm font-semibold">
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
                  <CheckCircle2 className="w-4 h-4 text-orange-primary flex-shrink-0" />
                  {item}
                </div>
              ))}
            </motion.div>
          </Section>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <p className="label-orange mb-3">{t("servicesLabel")}</p>
              <h2 className="text-4xl font-black text-white mb-4">{t("servicesTitle")}</h2>
              <p className="text-slate-text max-w-xl mx-auto">{t("servicesDesc")}</p>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {services.map((s) => {
                const Icon = s.icon;
                const isBlue = s.color === "blue";
                return (
                  <motion.div key={s.title} variants={fadeUp}
                    className="card-dark p-8 group transition-all duration-300 hover:border-orange-primary/30">
                    <div className={`inline-flex p-3 rounded-xl mb-5 ${isBlue ? "bg-blue-primary/10 border border-blue-primary/20" : "bg-orange-primary/10 border border-orange-primary/20"}`}>
                      <Icon className={`w-6 h-6 ${isBlue ? "text-blue-light" : "text-orange-primary"}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{s.title}</h3>
                    <p className="text-slate-text leading-relaxed mb-6">{s.desc}</p>
                    <ul className="space-y-2">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-center gap-2.5 text-sm text-slate-text">
                          <div className={`w-1 h-1 flex-shrink-0 ${isBlue ? "bg-blue-primary" : "bg-orange-primary"}`} />
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

      {/* Domaines callout */}
      <section className="py-16 relative border-t border-slate-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={fadeUp} className="card-dark p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-primary/5 rounded-full blur-[60px]" />
              <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="max-w-xl">
                  <p className="label-orange mb-3">{t("domainLabel")}</p>
                  <h3 className="text-2xl font-bold text-white mb-3">{t("domainTitle")}</h3>
                  <p className="text-slate-text leading-relaxed">{t("domainDesc")}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {[".ci", ".africa", ".com", ".net", ".org", ".info"].map((ext) => (
                      <span key={ext} className="px-3 py-1 border border-orange-primary/30 text-orange-primary text-sm font-mono font-bold">{ext}</span>
                    ))}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <a href="https://espace.d-infras.africa" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 border border-orange-primary/40 hover:bg-orange-primary/10 text-orange-primary font-semibold rounded-xl transition-all text-sm">
                    {t("domainCta")} <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* Why D-INFRAS */}
      <section className="py-20 relative border-t border-slate-border/20">
        <div className="absolute inset-0 bg-dark-800/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <p className="label-blue mb-3">{t("whyLabel")}</p>
              <h2 className="text-4xl font-black text-white mb-4">{t("whyTitle")}</h2>
              <p className="text-slate-text max-w-xl mx-auto">{t("whyDesc")}</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {why.map((w, idx) => {
                const Icon = w.icon;
                return (
                  <motion.div key={w.title} variants={fadeUp} className="card-dark p-6">
                    <div className={`inline-flex p-2.5 mb-4 ${idx % 2 === 0 ? "bg-blue-primary/10 border border-blue-primary/20" : "bg-orange-primary/10 border border-orange-primary/20"}`}>
                      <Icon className={`w-5 h-5 ${idx % 2 === 0 ? "text-blue-light" : "text-orange-primary"}`} />
                    </div>
                    <h4 className="text-white font-bold mb-2">{w.title}</h4>
                    <p className="text-slate-text text-sm leading-relaxed">{w.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </Section>
        </div>
      </section>

      {/* Espace client CTA */}
      <section className="py-20 relative border-t border-slate-border/20">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-primary/5 via-transparent to-blue-primary/5" />
        <div className="relative max-w-2xl mx-auto text-center px-4">
          <Section>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 border border-orange-primary/30 bg-orange-primary/8 text-orange-primary text-xs font-medium mb-6">
              <Server className="w-3.5 h-3.5" /> espace.d-infras.africa
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-white mb-4">{t("ctaTitle")}</motion.h2>
            <motion.p variants={fadeUp} className="text-slate-text mb-8">{t("ctaDesc")}</motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://espace.d-infras.africa" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-orange-primary hover:opacity-90 text-white font-semibold rounded-xl transition-all shadow-glow-orange">
                {t("ctaBtn")} <ExternalLink className="w-4 h-4" />
              </a>
              <Link href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 px-8 py-4 border border-slate-border hover:border-orange-primary/40 text-slate-text hover:text-white rounded-xl transition-all font-semibold">
                {t("ctaContact")} <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </Section>
        </div>
      </section>

    </div>
  );
}

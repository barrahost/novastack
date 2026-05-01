"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  Brain, Workflow, Code2, Building2, ArrowRight,
  Sparkles, Shield, Globe, TrendingUp, CheckCircle2,
  Zap, BarChart3, Layers, ChevronRight
} from "lucide-react";
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

const serviceIcons = [Brain, Code2, Workflow, Building2];
const reasonIcons = [Sparkles, TrendingUp, Zap, Shield, Globe, Layers];

export default function HomePage() {
  const { lang } = useLang();
  const t = translations[lang].home;

  return (
    <div className="relative overflow-hidden">

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#03070F] via-dark-900 to-dark-900" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-primary/6 rounded-full blur-[140px]" />
        <div className="absolute top-20 right-1/3 w-48 h-48 bg-orange-primary/5 rounded-full blur-[80px]" />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: `linear-gradient(rgba(26,107,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(26,107,255,1) 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="badge mb-8 w-fit">
              <span className="w-1.5 h-1.5 bg-orange-primary animate-pulse" />
              {t.badge}
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[1.04] mb-6">
              <span className="text-white">{t.h1a}</span><br />
              <span className="text-gradient-orange">{t.h1b}</span><br />
              <span className="text-white">{t.h1c}</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-text max-w-2xl mb-10 leading-relaxed">
              {t.subtitle}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn-primary group">
                {t.ctaPrimary}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/services" className="btn-outline group">
                {t.ctaSecondary}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Pillars — honnêtes, pas de faux chiffres */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-border/30 border border-slate-border/30 w-fit">
            {t.pillars.map((p) => (
              <div key={p.value} className="bg-dark-800 px-6 py-5">
                <div className="text-xl font-black text-gradient-blue mb-1 leading-none">{p.value}</div>
                <div className="text-xs text-slate-text leading-snug mt-1 max-w-[130px]">{p.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="relative py-24 lg:py-32 border-t border-slate-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={fadeUp} className="mb-14">
              <p className="label-orange mb-3">{t.sectionServicesLabel}</p>
              <h2 className="text-4xl lg:text-5xl font-black text-white max-w-xl leading-tight">
                {t.sectionServicesTitle}
              </h2>
              <p className="text-slate-text mt-3 max-w-xl">{t.sectionServicesSubtitle}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-border/20">
              {t.services.map((s, i) => {
                const Icon = serviceIcons[i];
                const accent = i % 2 === 0 ? "blue" : "orange";
                return (
                  <motion.div key={s.title} variants={fadeUp}
                    className="card-dark p-8 group transition-all duration-300">
                    <div className={accent === "blue" ? "icon-box-blue mb-5" : "icon-box-orange mb-5"}>
                      <Icon className={`w-5 h-5 ${accent === "blue" ? "text-white" : "text-orange-primary"}`} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                    <p className="text-slate-text text-sm leading-relaxed mb-5">{s.desc}</p>
                    <ul className="space-y-2">
                      {s.items.map((item) => (
                        <li key={item} className="flex items-center gap-2.5 text-sm text-slate-text">
                          <div className={`w-1 h-1 flex-shrink-0 ${accent === "blue" ? "bg-blue-primary" : "bg-orange-primary"}`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>

            <motion.div variants={fadeUp} className="mt-8">
              <Link href="/services" className="inline-flex items-center gap-2 text-orange-primary hover:text-orange-light text-sm font-semibold uppercase tracking-wider transition-colors group">
                {t.seeAllServices}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ─── AI EXPERTISE ─── */}
      <section className="relative py-24 border-t border-slate-border/20">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-80 h-80 bg-blue-primary/6 rounded-full blur-[100px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div variants={fadeUp}>
                <p className="label-orange mb-3">{t.aiLabel}</p>
                <h2 className="text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
                  {t.aiTitle}{" "}
                  <span className="text-gradient-orange">{t.aiTitleAccent}</span>
                </h2>
                <p className="text-slate-text leading-relaxed mb-6">{t.aiText}</p>
                <ul className="space-y-3 mb-8">
                  {t.aiPoints.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-text">
                      <CheckCircle2 className="w-4 h-4 text-orange-primary flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/services" className="btn-outline w-fit">
                  {t.aiCta} <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>

              {/* Visual panel */}
              <motion.div variants={fadeUp}>
                <div className="relative card-dark p-8 aspect-square max-w-sm mx-auto">
                  <div className="flex items-center justify-center h-full">
                    <div className="relative w-40 h-40">
                      <div className="absolute inset-0 border border-blue-primary/20 animate-spin-slow" style={{ borderRadius: 0 }} />
                      <div className="absolute inset-6 border border-orange-primary/20 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "12s", borderRadius: 0 }} />
                      <div className="absolute inset-12 bg-blue-secondary/30 border border-blue-primary/30 flex items-center justify-center">
                        <Brain className="w-8 h-8 text-blue-light" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 card-dark p-3 text-xs min-w-[130px]">
                    <div className="flex items-center gap-1.5 mb-1">
                      <div className="w-1.5 h-1.5 bg-green-400 animate-pulse" />
                      <span className="font-semibold text-white">Agent Active</span>
                    </div>
                    <span className="text-slate-text">Workflow automatisé</span>
                  </div>
                  <div className="absolute bottom-4 left-4 card-dark p-3 text-xs min-w-[130px]">
                    <div className="flex items-center gap-1.5 mb-1">
                      <div className="w-1.5 h-1.5 bg-orange-primary animate-pulse" />
                      <span className="font-semibold text-white">Automation</span>
                    </div>
                    <span className="text-slate-text">Tâches automatisées</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </Section>
        </div>
      </section>

      {/* ─── WHY NOVASTACK ─── */}
      <section className="py-24 border-t border-slate-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={fadeUp} className="mb-14">
              <p className="label-blue mb-3">{t.whyLabel}</p>
              <h2 className="text-4xl lg:text-5xl font-black text-white max-w-xl leading-tight">
                {t.whyTitle}
              </h2>
              <p className="text-slate-text mt-3 max-w-lg">{t.whySubtitle}</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-border/20 border border-slate-border/20">
              {t.reasons.map((r, i) => {
                const Icon = reasonIcons[i];
                return (
                  <motion.div key={r.title} variants={fadeUp}
                    className="card-dark p-6 group transition-all duration-300">
                    <div className={`mb-4 ${i % 2 === 0 ? "icon-box-blue" : "icon-box-orange"}`}>
                      <Icon className={`w-4 h-4 ${i % 2 === 0 ? "text-white" : "text-orange-primary"}`} />
                    </div>
                    <h3 className="text-white font-bold mb-2">{r.title}</h3>
                    <p className="text-slate-text text-sm leading-relaxed">{r.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </Section>
        </div>
      </section>

      {/* ─── INDUSTRIES ─── */}
      <section className="py-16 border-t border-slate-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={fadeUp} className="mb-10">
              <p className="label-orange mb-3">{t.industriesLabel}</p>
              <h2 className="text-3xl font-black text-white">{t.industriesTitle}</h2>
            </motion.div>
            <motion.div variants={stagger} className="flex flex-wrap gap-2">
              {t.industriesList.map((ind) => (
                <motion.span key={ind} variants={fadeUp}
                  className="px-4 py-2.5 border border-slate-border/50 text-slate-text text-xs font-semibold uppercase tracking-wider hover:border-orange-primary/50 hover:text-orange-primary transition-all cursor-default">
                  {ind}
                </motion.span>
              ))}
            </motion.div>
            <motion.div variants={fadeUp} className="mt-6">
              <Link href="/industries" className="inline-flex items-center gap-2 text-orange-primary text-xs font-semibold uppercase tracking-wider hover:text-orange-light transition-colors">
                {t.seeAllIndustries} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 border-t border-slate-border/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-primary/5 via-transparent to-orange-primary/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-blue-primary/6 rounded-full blur-[100px]" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <Section>
            <motion.p variants={fadeUp} className="label-orange mb-5">{t.ctaLabel}</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
              {t.ctaTitle} <span className="text-gradient-blue">{t.ctaTitleAccent}</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-text text-lg mb-10">
              {t.ctaText}
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary group">
                {t.ctaPrimary2}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/about" className="btn-outline">
                {t.ctaSecondary2}
              </Link>
            </motion.div>
          </Section>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  Brain, Code2, Workflow, Building2, ChevronRight, Zap,
  Bot, Cpu, MessageSquare, Globe, LayoutDashboard,
  Users, FileBarChart, Settings, Monitor, TrendingUp, Database
} from "lucide-react";
import { useLang } from "@/lib/LangContext";
import { translations } from "@/lib/translations";

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

const catIcons = [Brain, Code2, Workflow, Building2];
const subIcons = [
  [Bot, Cpu, MessageSquare, Zap],
  [Globe, Building2, Users, LayoutDashboard],
  [Settings, Database, Monitor, FileBarChart],
  [Settings, TrendingUp, Monitor, Globe],
];

export default function ServicesPage() {
  const { lang } = useLang();
  const t = translations[lang].services;

  return (
    <div className="relative overflow-hidden pt-20">
      {/* Hero */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 to-dark-900" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-primary/8 rounded-full blur-[100px]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-primary/30 bg-blue-primary/8 text-blue-light text-xs font-medium mb-6">
            <Zap className="w-3.5 h-3.5" /> {t.badge}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            {t.h1} <span className="text-gradient-blue">{t.h1Accent}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl text-slate-text leading-relaxed max-w-2xl mx-auto">
            {t.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Service categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-24">
        {t.categories.map((cat, idx) => {
          const CatIcon = catIcons[idx];
          const accent = idx % 2 === 0 ? "blue" : "orange";
          return (
            <Section key={cat.label}>
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Info */}
                <motion.div variants={fadeUp} className={idx % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-xs font-mono text-slate-muted">{cat.label}</span>
                    <div className={`h-px flex-1 ${accent === "blue" ? "bg-blue-primary/30" : "bg-orange-primary/30"}`} />
                  </div>
                  <div className={`inline-flex p-3 rounded-xl mb-5 ${
                    accent === "blue"
                      ? "bg-blue-primary/10 border border-blue-primary/20"
                      : "bg-orange-primary/10 border border-orange-primary/20"
                  }`}>
                    <CatIcon className={`w-7 h-7 ${accent === "blue" ? "text-blue-light" : "text-orange-primary"}`} />
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-2">{cat.title}</h2>
                  <p className={`text-sm font-medium mb-4 ${accent === "blue" ? "text-blue-light" : "text-orange-primary"}`}>
                    {cat.tagline}
                  </p>
                  <p className="text-slate-text leading-relaxed mb-8">{cat.desc}</p>
                  <Link href="/contact"
                    className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
                      accent === "blue"
                        ? "bg-blue-primary hover:bg-blue-light text-white shadow-glow-blue"
                        : "border border-orange-primary/40 hover:bg-orange-primary/10 text-orange-primary"
                    }`}>
                    {cat.cta} <ChevronRight className="w-4 h-4" />
                  </Link>
                </motion.div>

                {/* Service cards */}
                <motion.div variants={stagger} className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                  {cat.services.map((s, si) => {
                    const SIcon = subIcons[idx][si];
                    return (
                      <motion.div key={s.name} variants={fadeUp} className="card-glass rounded-xl p-5 group transition-all duration-300">
                        <div className={`p-2 rounded-lg w-fit mb-3 ${
                          accent === "blue"
                            ? "bg-blue-primary/10 border border-blue-primary/15"
                            : "bg-orange-primary/10 border border-orange-primary/15"
                        }`}>
                          <SIcon className={`w-4 h-4 ${accent === "blue" ? "text-blue-light" : "text-orange-primary"}`} />
                        </div>
                        <h4 className="text-white font-semibold text-sm mb-1.5">{s.name}</h4>
                        <p className="text-slate-text text-xs leading-relaxed">{s.desc}</p>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </Section>
          );
        })}
      </div>

      {/* CTA */}
      <section className="py-20 relative border-t border-slate-border/20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-primary/5 via-transparent to-orange-primary/5" />
        <div className="relative max-w-2xl mx-auto text-center px-4">
          <Section>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-white mb-4">
              {t.ctaTitle}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-text mb-8">{t.ctaText}</motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-primary hover:bg-blue-light text-white font-semibold rounded-xl transition-all shadow-glow-blue">
                {t.ctaBtn} <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </Section>
        </div>
      </section>
    </div>
  );
}

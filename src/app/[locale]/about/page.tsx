"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Target, Eye, Heart, Zap, Globe, TrendingUp, ArrowRight, ChevronRight, Users, Cpu } from "lucide-react";

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

const expertisePcts = [97, 92, 88, 85, 82];
const valueIcons = [Target, Zap, Heart, Globe, TrendingUp, Users];

export default function AboutPage() {
  const t = useTranslations("about");
  const locale = useLocale();

  const expertise = [
    { label: t("exp1"), pct: expertisePcts[0] },
    { label: t("exp2"), pct: expertisePcts[1] },
    { label: t("exp3"), pct: expertisePcts[2] },
    { label: t("exp4"), pct: expertisePcts[3] },
    { label: t("exp5"), pct: expertisePcts[4] },
  ];

  const values = [
    { icon: valueIcons[0], title: t("val1Title"), desc: t("val1Desc") },
    { icon: valueIcons[1], title: t("val2Title"), desc: t("val2Desc") },
    { icon: valueIcons[2], title: t("val3Title"), desc: t("val3Desc") },
    { icon: valueIcons[3], title: t("val4Title"), desc: t("val4Desc") },
    { icon: valueIcons[4], title: t("val5Title"), desc: t("val5Desc") },
    { icon: valueIcons[5], title: t("val6Title"), desc: t("val6Desc") },
  ];

  const approachItems = [t("approachItem1"), t("approachItem2"), t("approachItem3"), t("approachItem4")];

  return (
    <div className="relative overflow-hidden pt-20">
      {/* Hero */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 to-dark-900" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-primary/8 rounded-full blur-[100px]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-primary/30 bg-blue-primary/8 text-blue-light text-xs font-medium mb-6">
            <Cpu className="w-3.5 h-3.5" /> {t("badge")}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            {t("title")}{" "}
            <span className="text-gradient-blue">{t("titleHighlight")}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl text-slate-text leading-relaxed max-w-2xl mx-auto">
            {t("desc")}
          </motion.p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <div className="grid lg:grid-cols-2 gap-8">
              {[
                { icon: Eye, title: t("visionTitle"), color: "blue", content: t("visionContent") },
                { icon: Target, title: t("missionTitle"), color: "orange", content: t("missionContent") },
              ].map((card) => {
                const Icon = card.icon;
                return (
                  <motion.div key={card.title} variants={fadeUp} className="card-glass rounded-2xl p-8">
                    <div className={`inline-flex p-3 rounded-xl mb-5 ${card.color === "blue" ? "bg-blue-primary/10 border border-blue-primary/20" : "bg-orange-primary/10 border border-orange-primary/20"}`}>
                      <Icon className={`w-6 h-6 ${card.color === "blue" ? "text-blue-light" : "text-orange-primary"}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{card.title}</h3>
                    <p className="text-slate-text leading-relaxed">{card.content}</p>
                  </motion.div>
                );
              })}
            </div>
          </Section>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-dark-800/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={fadeUp}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-primary/30 bg-orange-primary/8 text-orange-primary text-xs font-medium mb-5">
                  {t("approachBadge")}
                </div>
                <h2 className="text-4xl font-bold text-white mb-5">
                  {t("approachTitle")}{" "}
                  <span className="text-gradient-gold">{t("approachTitleHighlight")}</span>
                </h2>
                <p className="text-slate-text leading-relaxed mb-6">{t("approachDesc1")}</p>
                <p className="text-slate-text leading-relaxed mb-6">{t("approachDesc2")}</p>
                <div className="space-y-3">
                  {approachItems.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm text-slate-text">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-primary mt-2 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-5">
                <h3 className="text-lg font-semibold text-white mb-6">{t("expertiseTitle")}</h3>
                {expertise.map((e) => (
                  <div key={e.label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-slate-text">{e.label}</span>
                      <span className="text-blue-light font-medium">{e.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-dark-500 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${e.pct}%` }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="h-full bg-gradient-to-r from-blue-primary to-blue-light rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </Section>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <h2 className="text-4xl font-bold text-white mb-4">{t("valuesTitle")}</h2>
              <p className="text-slate-text max-w-lg mx-auto">{t("valuesDesc")}</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <motion.div key={v.title} variants={fadeUp} className="card-glass rounded-2xl p-6">
                    <div className="p-2.5 rounded-lg bg-blue-primary/10 border border-blue-primary/20 w-fit mb-4">
                      <Icon className="w-5 h-5 text-blue-light" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">{v.title}</h3>
                    <p className="text-slate-text text-sm leading-relaxed">{v.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </Section>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-primary/5 via-transparent to-orange-primary/5" />
        <div className="relative max-w-2xl mx-auto text-center px-4">
          <Section>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-white mb-4">{t("ctaTitle")}</motion.h2>
            <motion.p variants={fadeUp} className="text-slate-text mb-8">{t("ctaDesc")}</motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-primary hover:bg-blue-light text-white font-semibold rounded-xl transition-all text-sm">
                {t("ctaBtn")} <ChevronRight className="w-4 h-4" />
              </Link>
              <Link href={`/${locale}/services`} className="inline-flex items-center gap-2 px-7 py-3.5 border border-slate-border hover:border-blue-primary/40 text-slate-text hover:text-white rounded-xl transition-all text-sm font-semibold">
                {t("ctaServices")} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </Section>
        </div>
      </section>
    </div>
  );
}

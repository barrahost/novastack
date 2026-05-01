"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Linkedin, Send, ChevronRight, CheckCircle2 } from "lucide-react";
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

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", company: "", need: "", message: "" });
  const [honeypot, setHoneypot] = useState("");
  const { lang } = useLang();
  const t = translations[lang].contact;

  const contactInfo = [
    { icon: Mail, label: t.labels.email, value: "contact@novastack.africa", href: "mailto:contact@novastack.africa" },
    { icon: Linkedin, label: t.labels.linkedin, value: "NovaStack Africa", href: "https://linkedin.com/company/novastack-africa" },
    { icon: MapPin, label: t.labels.location, value: "Abidjan, Côte d'Ivoire", href: null },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
  };

  return (
    <div className="relative overflow-hidden pt-20">
      {/* Hero */}
      <section className="relative py-24 lg:py-28 border-b border-slate-border/20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#03070F] to-dark-900" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-primary/6 rounded-full blur-[120px]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="label-orange mb-4">
            {t.badge}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl lg:text-6xl font-black text-white mb-5 leading-tight">
            {t.h1}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl text-slate-text max-w-xl">
            {t.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">

              {/* Sidebar */}
              <motion.div variants={fadeUp} className="lg:col-span-1 space-y-6">
                <div>
                  <h2 className="text-xl font-black text-white mb-1">{t.infoTitle}</h2>
                  <p className="text-slate-text text-sm">{t.infoSubtitle}</p>
                </div>

                <div className="space-y-3">
                  {contactInfo.map((item) => {
                    const Icon = item.icon;
                    const content = (
                      <div className="flex items-start gap-4 p-4 card-dark group transition-all duration-200">
                        <div className="icon-box-blue flex-shrink-0">
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-muted uppercase tracking-wider font-semibold mb-0.5">{item.label}</p>
                          <p className="text-white text-sm font-medium group-hover:text-orange-primary transition-colors">{item.value}</p>
                        </div>
                      </div>
                    );
                    return item.href ? (
                      <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                        {content}
                      </a>
                    ) : (
                      <div key={item.label}>{content}</div>
                    );
                  })}
                </div>

                <div className="card-dark p-5">
                  <p className="label-orange mb-4">{t.expectTitle}</p>
                  <ul className="space-y-3">
                    {t.expectItems.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-slate-text">
                        <CheckCircle2 className="w-4 h-4 text-orange-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Form */}
              <motion.div variants={fadeUp} className="lg:col-span-2">
                {status === "sent" ? (
                  <div className="card-dark p-10 text-center h-full flex flex-col items-center justify-center">
                    <div className="icon-box-orange p-4 mb-5">
                      <CheckCircle2 className="w-8 h-8 text-orange-primary" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-3">{t.successTitle}</h3>
                    <p className="text-slate-text max-w-sm">{t.successText}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="card-dark p-8 space-y-5">
                    <input type="text" name="_honey" value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
                      style={{ display: "none" }} tabIndex={-1} aria-hidden="true" />

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="label-blue block mb-2">{t.formName}</label>
                        <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Jean Dupont"
                          className="w-full bg-dark-800 border border-slate-border/50 text-white placeholder-slate-muted px-4 py-3 text-sm focus:outline-none focus:border-blue-primary transition-colors" />
                      </div>
                      <div>
                        <label className="label-blue block mb-2">{t.formEmail}</label>
                        <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="jean@entreprise.com"
                          className="w-full bg-dark-800 border border-slate-border/50 text-white placeholder-slate-muted px-4 py-3 text-sm focus:outline-none focus:border-blue-primary transition-colors" />
                      </div>
                    </div>

                    <div>
                      <label className="label-blue block mb-2">{t.formCompany}</label>
                      <input type="text" required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="Votre entreprise"
                        className="w-full bg-dark-800 border border-slate-border/50 text-white placeholder-slate-muted px-4 py-3 text-sm focus:outline-none focus:border-blue-primary transition-colors" />
                    </div>

                    <div>
                      <label className="label-blue block mb-2">{t.formNeed}</label>
                      <select value={form.need} onChange={(e) => setForm({ ...form, need: e.target.value })}
                        className="w-full bg-dark-800 border border-slate-border/50 text-white px-4 py-3 text-sm focus:outline-none focus:border-blue-primary transition-colors appearance-none cursor-pointer">
                        <option value="">{t.formNeedPlaceholder}</option>
                        {t.needs.map((n) => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="label-blue block mb-2">{t.formMessage}</label>
                      <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder={t.formMessagePlaceholder}
                        className="w-full bg-dark-800 border border-slate-border/50 text-white placeholder-slate-muted px-4 py-3 text-sm focus:outline-none focus:border-blue-primary transition-colors resize-none" />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <p className="text-xs text-slate-muted">{t.formRequired}</p>
                      <button type="submit" disabled={status === "sending"}
                        className="btn-primary group disabled:opacity-60 disabled:cursor-not-allowed">
                        {status === "sending" ? (
                          <span className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin" />
                            {t.formSending}
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            {t.formSend}
                            <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          </Section>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { Mail, MapPin, Linkedin, Send, ChevronRight, CircleCheck as CheckCircle2 } from "lucide-react";

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

const EDGE_FUNCTION_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-contact-email`;

export default function ContactPage() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", company: "", need: "", message: "" });
  const [honeypot, setHoneypot] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;
    setStatus("sending");
    try {
      const res = await fetch(EDGE_FUNCTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const contactInfo = [
    { icon: Mail, label: t("emailLabel"), value: "contact@novastack.africa", href: "mailto:contact@novastack.africa" },
    { icon: Linkedin, label: t("linkedinLabel"), value: "NovaStack Africa", href: "https://linkedin.com/company/novastack-africa" },
    { icon: MapPin, label: t("locationLabel"), value: "Abidjan, Côte d'Ivoire", href: null },
  ];

  const needs = [t("need1"), t("need2"), t("need3"), t("need4"), t("need5")];
  const expectItems = [t("expect1"), t("expect2"), t("expect3"), t("expect4")];

  return (
    <div className="relative overflow-hidden pt-20">
      {/* Hero */}
      <section className="relative py-24 lg:py-28 border-b border-slate-border/20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#03070F] to-dark-900" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-primary/6 rounded-full blur-[120px]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="label-orange mb-4">
            {t("label")}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl lg:text-6xl font-black text-white mb-5 leading-tight">
            {t("title")}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl text-slate-text max-w-xl">
            {t("desc")}
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
                  <h2 className="text-xl font-black text-white mb-1">{t("sidebarTitle")}</h2>
                  <p className="text-slate-text text-sm">{t("sidebarDesc")}</p>
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
                  <p className="label-orange mb-4">{t("expectLabel")}</p>
                  <ul className="space-y-3">
                    {expectItems.map((item) => (
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
                    <h3 className="text-2xl font-black text-white mb-3">{t("successTitle")}</h3>
                    <p className="text-slate-text max-w-sm">{t("successDesc")}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="card-dark p-8 space-y-5">
                    <input type="text" name="_honey" value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
                      style={{ display: "none" }} tabIndex={-1} aria-hidden="true" />

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="label-blue block mb-2">{t("fieldName")}</label>
                        <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Jean Dupont"
                          className="w-full bg-dark-800 border border-slate-border/50 text-white placeholder-slate-muted px-4 py-3 text-sm focus:outline-none focus:border-blue-primary transition-colors" />
                      </div>
                      <div>
                        <label className="label-blue block mb-2">{t("fieldEmail")}</label>
                        <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="jean@entreprise.com"
                          className="w-full bg-dark-800 border border-slate-border/50 text-white placeholder-slate-muted px-4 py-3 text-sm focus:outline-none focus:border-blue-primary transition-colors" />
                      </div>
                    </div>

                    <div>
                      <label className="label-blue block mb-2">{t("fieldCompany")}</label>
                      <input type="text" required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder={t("companyPlaceholder")}
                        className="w-full bg-dark-800 border border-slate-border/50 text-white placeholder-slate-muted px-4 py-3 text-sm focus:outline-none focus:border-blue-primary transition-colors" />
                    </div>

                    <div>
                      <label className="label-blue block mb-2">{t("fieldNeed")}</label>
                      <select value={form.need} onChange={(e) => setForm({ ...form, need: e.target.value })}
                        className="w-full bg-dark-800 border border-slate-border/50 text-white px-4 py-3 text-sm focus:outline-none focus:border-blue-primary transition-colors appearance-none cursor-pointer">
                        <option value="">{t("needPlaceholder")}</option>
                        {needs.map((n) => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="label-blue block mb-2">{t("fieldMessage")}</label>
                      <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder={t("messagePlaceholder")}
                        className="w-full bg-dark-800 border border-slate-border/50 text-white placeholder-slate-muted px-4 py-3 text-sm focus:outline-none focus:border-blue-primary transition-colors resize-none" />
                    </div>

                    {status === "error" && (
                      <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 px-4 py-2.5 rounded-lg">
                        {t("errorMsg")}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      <p className="text-xs text-slate-muted">{t("required")}</p>
                      <button type="submit" disabled={status === "sending"}
                        className="btn-primary group disabled:opacity-60 disabled:cursor-not-allowed">
                        {status === "sending" ? (
                          <span className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin" />
                            {t("sending")}
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            {t("send")}
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

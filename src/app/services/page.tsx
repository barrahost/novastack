"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Code as Code2, ChevronRight, Zap, Globe, LayoutDashboard, Users, Monitor, CircleCheck as CheckCircle2, ArrowRight, Building2 } from "lucide-react";

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

const subServices = [
  {
    icon: Globe,
    title: "Web Applications",
    desc: "Full-stack applications built with modern frameworks — performant, secure, and production-ready. From internal tools to customer-facing portals, we engineer software that scales with your ambitions.",
    features: ["Next.js, React, TypeScript", "REST & GraphQL APIs", "Mobile-responsive design", "CI/CD & cloud deployment"],
  },
  {
    icon: Building2,
    title: "Business Platforms",
    desc: "Core operational platforms that digitize and centralize your most critical business processes. We architect systems that serve as the backbone of your digital operations.",
    features: ["ERP-style platforms", "Multi-user role management", "Workflow automation built-in", "Real-time data synchronization"],
  },
  {
    icon: Users,
    title: "Client Portals",
    desc: "Branded, secure portals that give your clients real-time access to their data and services. Strengthen relationships while reducing your support overhead.",
    features: ["Secure authentication", "Custom branding & white-label", "Document & file management", "Notification & messaging systems"],
  },
  {
    icon: LayoutDashboard,
    title: "Dashboards & BI",
    desc: "Interactive analytics dashboards that turn your raw data into actionable business intelligence. Make faster, better decisions with data visualizations built for your exact KPIs.",
    features: ["Real-time data visualization", "Custom KPI tracking", "Multi-source data integration", "Exportable reports & alerts"],
  },
];

const process = [
  { step: "01", title: "Discovery", desc: "We immerse ourselves in your business — processes, constraints, and goals — before writing a single line of code." },
  { step: "02", title: "Architecture", desc: "We design a technical blueprint that matches your needs today and scales with your growth tomorrow." },
  { step: "03", title: "Build", desc: "Agile sprints with weekly demos. You see progress continuously, not at the end." },
  { step: "04", title: "Deploy", desc: "Production launch with thorough testing, performance validation, and team onboarding." },
  { step: "05", title: "Optimize", desc: "Post-launch support, iteration cycles, and continuous improvements based on real usage data." },
];

export default function ServicesPage() {
  return (
    <div className="relative overflow-hidden pt-20">
      {/* Hero */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 to-dark-900" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-primary/8 rounded-full blur-[100px]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-primary/30 bg-blue-primary/8 text-blue-light text-xs font-medium mb-6">
            <Code2 className="w-3.5 h-3.5" /> What We Build
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Application Development <br />
            <span className="text-gradient-blue">built for impact</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl text-slate-text leading-relaxed max-w-2xl mx-auto mb-10">
            From internal business tools to customer-facing platforms, we design and build modern software
            that is fast, reliable, and built to grow with your organization.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-primary hover:bg-blue-light text-white font-semibold rounded-xl transition-all shadow-glow-blue text-sm">
              Get a Quote <ChevronRight className="w-4 h-4" />
            </Link>
            <Link href="/about" className="inline-flex items-center gap-2 px-7 py-3.5 border border-slate-border hover:border-blue-primary/40 text-slate-text hover:text-white rounded-xl transition-all text-sm font-semibold">
              How We Work <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* What's included intro */}
      <section className="py-8 relative border-t border-slate-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-6 justify-center">
              {["Bespoke software, not off-the-shelf", "Modern tech stack", "Agile delivery", "Post-launch support", "African enterprise expertise"].map((item) => (
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
              <p className="label-orange mb-3">What We Deliver</p>
              <h2 className="text-4xl font-black text-white mb-4">Four types of software we build</h2>
              <p className="text-slate-text max-w-xl mx-auto">Each engagement is scoped and architected to match your exact use case — no templates, no shortcuts.</p>
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
              <p className="label-blue mb-3">Our Process</p>
              <h2 className="text-4xl font-black text-white mb-4">How we deliver</h2>
              <p className="text-slate-text max-w-lg mx-auto">A structured approach that ensures clarity, quality, and zero surprises from kickoff to launch.</p>
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
                <p className="label-orange mb-3">Industry Expertise</p>
                <h3 className="text-2xl font-bold text-white mb-3">Software built for your sector</h3>
                <p className="text-slate-text leading-relaxed">
                  We've delivered solutions across Banking, Telecom, Logistics, Government, Healthcare, Retail, and Datacenter — with deep understanding of each sector's constraints and compliance requirements.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Link href="/industries" className="inline-flex items-center gap-2 px-7 py-3.5 border border-orange-primary/40 hover:bg-orange-primary/10 text-orange-primary font-semibold rounded-xl transition-all text-sm">
                  View Industries <ArrowRight className="w-4 h-4" />
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
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-white mb-4">
              Ready to start building?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-text mb-8">
              Book a free 30-minute consultation. We'll assess your needs and scope a solution.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-primary hover:bg-blue-light text-white font-semibold rounded-xl transition-all shadow-glow-blue">
                Book a Free Consultation <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </Section>
        </div>
      </section>
    </div>
  );
}

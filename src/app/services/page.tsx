"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  Brain, Code2, Workflow, Building2, ChevronRight,
  Bot, Cpu, MessageSquare, Zap, Globe, LayoutDashboard,
  Users, FileBarChart, Settings, Monitor, TrendingUp, Database
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

const serviceCategories = [
  {
    id: "ai",
    icon: Brain,
    accent: "blue",
    label: "01",
    title: "AI Solutions",
    tagline: "Intelligence that works for you",
    desc: "We design and deploy AI systems that automate decision-making, augment your team's capabilities, and unlock insights hidden in your data.",
    services: [
      { icon: Bot, name: "AI Agents", desc: "Autonomous agents that handle complex, multi-step business workflows without human intervention." },
      { icon: Cpu, name: "AI Copilots", desc: "Intelligent assistants embedded in your existing tools to supercharge team productivity." },
      { icon: MessageSquare, name: "Intelligent Chatbots", desc: "Conversational AI systems for customer support, internal helpdesks, and automated intake." },
      { icon: Zap, name: "AI Workflow Automation", desc: "End-to-end automation pipelines that combine AI with your existing business processes." },
    ],
  },
  {
    id: "dev",
    icon: Code2,
    accent: "orange",
    label: "02",
    title: "Application Development",
    tagline: "Software built to perform and scale",
    desc: "From internal business tools to customer-facing platforms, we build modern web applications that are fast, reliable, and beautiful.",
    services: [
      { icon: Globe, name: "Web Applications", desc: "Full-stack applications built with modern frameworks — performant, secure, and production-ready." },
      { icon: Building2, name: "Business Platforms", desc: "Core operational platforms that digitize and centralize your most critical business processes." },
      { icon: Users, name: "Client Portals", desc: "Branded, secure portals that give your clients real-time access to their data and services." },
      { icon: LayoutDashboard, name: "Dashboards & BI", desc: "Interactive analytics dashboards that turn your raw data into actionable business intelligence." },
    ],
  },
  {
    id: "automation",
    icon: Workflow,
    accent: "blue",
    label: "03",
    title: "Process Automation",
    tagline: "Eliminate manual work at scale",
    desc: "We identify bottlenecks in your operations and replace them with intelligent, automated workflows — saving time, reducing errors, and lowering costs.",
    services: [
      { icon: Settings, name: "Workflow Digitization", desc: "Transform manual, paper-based, or email-driven processes into streamlined digital workflows." },
      { icon: Database, name: "System Integration", desc: "Connect your ERP, CRM, and other systems to eliminate data silos and automate hand-offs." },
      { icon: Monitor, name: "MS 365 Automation", desc: "Power Automate, Power Apps, and custom connectors to maximize your Microsoft 365 investment." },
      { icon: FileBarChart, name: "Reporting Systems", desc: "Automated reporting pipelines that generate and distribute insights on your schedule." },
    ],
  },
  {
    id: "enterprise",
    icon: Building2,
    accent: "orange",
    label: "04",
    title: "Enterprise Solutions",
    tagline: "Platforms built for complexity",
    desc: "Large organizations need software that handles scale, security, and complexity. We build enterprise-grade systems that your operations can depend on.",
    services: [
      { icon: Settings, name: "Internal Tools", desc: "Custom-built operational tools tailored to the exact way your teams work — no compromise." },
      { icon: TrendingUp, name: "Operations Platforms", desc: "Centralized platforms for managing field operations, logistics, and service delivery at scale." },
      { icon: Monitor, name: "Monitoring Systems", desc: "Real-time visibility into your infrastructure, operations, and business KPIs." },
      { icon: Globe, name: "Digital Transformation", desc: "End-to-end digital transformation programs: strategy, architecture, build, and change management." },
    ],
  },
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
            <Zap className="w-3.5 h-3.5" /> What We Offer
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Solutions built for <span className="text-gradient-blue">enterprise impact</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl text-slate-text leading-relaxed max-w-2xl mx-auto">
            Four core service areas. One goal: accelerate your digital transformation with precision-built technology.
          </motion.p>
        </div>
      </section>

      {/* Service categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-24">
        {serviceCategories.map((cat, idx) => {
          const CatIcon = cat.icon;
          return (
            <Section key={cat.id}>
              <div className={`grid lg:grid-cols-2 gap-12 items-start ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                {/* Info */}
                <motion.div variants={fadeUp} className={idx % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-xs font-mono text-slate-muted">{cat.label}</span>
                    <div className={`h-px flex-1 ${cat.accent === "blue" ? "bg-blue-primary/30" : "bg-orange-primary/30"}`} />
                  </div>
                  <div className={`inline-flex p-3 rounded-xl mb-5 ${
                    cat.accent === "blue"
                      ? "bg-blue-primary/10 border border-blue-primary/20"
                      : "bg-orange-primary/10 border border-orange-primary/20"
                  }`}>
                    <CatIcon className={`w-7 h-7 ${cat.accent === "blue" ? "text-blue-light" : "text-orange-primary"}`} />
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-2">{cat.title}</h2>
                  <p className={`text-sm font-medium mb-4 ${cat.accent === "blue" ? "text-blue-light" : "text-orange-primary"}`}>
                    {cat.tagline}
                  </p>
                  <p className="text-slate-text leading-relaxed mb-8">{cat.desc}</p>
                  <Link href="/contact"
                    className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
                      cat.accent === "blue"
                        ? "bg-blue-primary hover:bg-blue-light text-white shadow-glow-blue"
                        : "border border-orange-primary/40 hover:bg-orange-primary/10 text-orange-primary"
                    }`}>
                    Get a quote <ChevronRight className="w-4 h-4" />
                  </Link>
                </motion.div>

                {/* Service cards */}
                <motion.div variants={stagger} className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                  {cat.services.map((s) => {
                    const SIcon = s.icon;
                    return (
                      <motion.div key={s.name} variants={fadeUp} className="card-glass rounded-xl p-5 group transition-all duration-300">
                        <div className={`p-2 rounded-lg w-fit mb-3 ${
                          cat.accent === "blue"
                            ? "bg-blue-primary/10 border border-blue-primary/15"
                            : "bg-orange-primary/10 border border-orange-primary/15"
                        }`}>
                          <SIcon className={`w-4 h-4 ${cat.accent === "blue" ? "text-blue-light" : "text-orange-primary"}`} />
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
              Not sure where to start?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-text mb-8">
              Book a free 30-minute consultation. We'll assess your needs and recommend the right solution.
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

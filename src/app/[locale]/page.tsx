"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Icon } from "@/components/Icons";

/* ------------------------------------------------------------------ */
/* Pipeline bar shape (labels filled inside component via t())         */
/* ------------------------------------------------------------------ */
const PIPE_ROW_META: { base: number; phase: number }[] = [
  { base: 0.48, phase: 0 },
  { base: 0.33, phase: 1.3 },
  { base: 0.20, phase: 2.6 },
  { base: 0.56, phase: 3.9 },
];

const PIPE_STAT_META: { count: number; suffix: string }[] = [
  { count: 68, suffix: "%" },
  { count: 3,  suffix: "×" },
  { count: 24, suffix: "/7" },
];

/* ------------------------------------------------------------------ */
/* Portfolio projects                                                   */
/* ------------------------------------------------------------------ */
const PROJECTS: {
  key: string;
  catKey: string;
  titleKey: string;
  descKey: string;
  done: boolean;
  url: string | null;
  stack: string[];
}[] = [
  { key:"p1",  catKey:"proj1Cat",  titleKey:"proj1Title",  descKey:"proj1Desc",  done:true, url:"https://contemplationgospel.com",        stack:["React","TypeScript","Supabase","Stripe"] },
  { key:"p2",  catKey:"proj2Cat",  titleKey:"proj2Title",  descKey:"proj2Desc",  done:true, url:"https://cv.patricetano.com",              stack:["React","TypeScript","Vite"] },
  { key:"p3",  catKey:"proj3Cat",  titleKey:"proj3Title",  descKey:"proj3Desc",  done:true, url:"https://favho.org",                       stack:["React","TypeScript","Firebase"] },
  { key:"p4",  catKey:"proj4Cat",  titleKey:"proj4Title",  descKey:"proj4Desc",  done:true, url:"https://www.porteursdevie.org",            stack:["React","TypeScript","Supabase","Express"] },
  { key:"p5",  catKey:"proj5Cat",  titleKey:"proj5Title",  descKey:"proj5Desc",  done:true, url:"https://origin360.io",                    stack:["React","TypeScript","Paystack"] },
  { key:"p6",  catKey:"proj6Cat",  titleKey:"proj6Title",  descKey:"proj6Desc",  done:true, url:"https://bergerie.evdh.org",               stack:["React","TypeScript","Supabase"] },
  { key:"p7",  catKey:"proj7Cat",  titleKey:"proj7Title",  descKey:"proj7Desc",  done:true, url:"https://zoom.porteursdevie.org",           stack:["HTML","CSS","JavaScript"] },
  { key:"p8",  catKey:"proj8Cat",  titleKey:"proj8Title",  descKey:"proj8Desc",  done:true, url:"https://d-infras.africa",                 stack:["React","TypeScript","Supabase","Express"] },
  { key:"p9",  catKey:"proj9Cat",  titleKey:"proj9Title",  descKey:"proj9Desc",  done:true, url:"https://hebergement.novastack.africa",     stack:["React","TypeScript","Vite"] },
  { key:"p10", catKey:"proj10Cat", titleKey:"proj10Title", descKey:"proj10Desc", done:true, url:"https://monitor.d-infras.africa",          stack:["Cloudflare Workers","Supabase"] },
  { key:"p11", catKey:"proj11Cat", titleKey:"proj11Title", descKey:"proj11Desc", done:true, url:"https://novastack.africa",                stack:["Next.js","TypeScript","Cloudflare Pages"] },
];

/* ------------------------------------------------------------------ */
/* easeOut cubic                                                        */
/* ------------------------------------------------------------------ */
function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/* ------------------------------------------------------------------ */
/* Page component                                                       */
/* ------------------------------------------------------------------ */
export default function HomePage() {
  const locale = useLocale();
  const t  = useTranslations("home");
  const tn = useTranslations("nav");
  const tf = useTranslations("footer");

  /* Translated data arrays (must be inside component) */
  const PIPE_ROWS = PIPE_ROW_META.map((r, i) => ({
    ...r,
    label: t(`pipeRow${i + 1}` as Parameters<typeof t>[0]),
  }));

  const PIPE_STATS = PIPE_STAT_META.map((s, i) => ({
    ...s,
    label: t(`pipeStat${i + 1}Label` as Parameters<typeof t>[0]),
  }));

  /* ----- nav state ----- */
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const [drawerOpen, setDrawerOpen] = useState(false);

  /* ----- pipeline state ----- */
  const [pipeStarted, setPipeStarted] = useState(false);
  const [barWidths, setBarWidths] = useState<number[]>(PIPE_ROWS.map(() => 0));
  const [pcts, setPcts] = useState<number[]>(PIPE_ROWS.map(() => 0));
  const [counters, setCounters] = useState<string[]>(
    PIPE_STATS.map((s) => "0" + s.suffix)
  );

  /* ----- refs for sections ----- */
  const pipeRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  /* ----- reveal: IntersectionObserver on .rv elements ----- */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = document.querySelectorAll<HTMLElement>(".rv");

    if (reduce) {
      elements.forEach((el) => el.classList.add("in"));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );

    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* ----- scroll: nav scrolled + scroll-spy ----- */
  useEffect(() => {
    const SECTIONS = ["top", "about", "services", "contact"];

    function onScroll() {
      setScrolled(window.scrollY > 8);

      const mid = window.innerHeight * 0.4;
      let current = "top";
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= mid) current = id;
        }
      }
      setActiveSection(current);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ----- pipeline: start when #pipe enters viewport ----- */
  const startPipeline = useCallback(() => {
    if (pipeStarted) return;
    setPipeStarted(true);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t0 = performance.now();
    const dur = 1400;

    // Animate counters
    PIPE_STATS.forEach((stat) => {
      (function step(now: number) {
        const p = Math.min(1, (now - t0) / dur);
        const val = Math.round(stat.count * easeOut(p));
        setCounters((prev) => {
          const next = [...prev];
          next[PIPE_STATS.indexOf(stat)] = val + stat.suffix;
          return next;
        });
        if (p < 1) requestAnimationFrame(step);
      })(t0);
    });

    if (reduce) {
      setBarWidths(PIPE_ROWS.map((r) => Math.min(0.95, r.base + 0.4) * 100));
      setPcts(PIPE_ROWS.map((r) => Math.round(Math.min(0.95, r.base + 0.4) * 100)));
      return;
    }

    // Wobble animation
    function runPipe() {
      const t = performance.now() / 1000;
      const widths: number[] = [];
      const pctVals: number[] = [];
      PIPE_ROWS.forEach((row) => {
        const wobble = 0.12 * (0.5 + 0.5 * Math.sin(t * 0.7 + row.phase));
        const val = Math.min(0.97, row.base + 0.28 + wobble);
        widths.push(parseFloat((val * 100).toFixed(0)));
        pctVals.push(Math.round(val * 100));
      });
      setBarWidths(widths);
      setPcts(pctVals);
      rafRef.current = requestAnimationFrame(runPipe);
    }
    rafRef.current = requestAnimationFrame(runPipe);
  }, [pipeStarted]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const el = pipeRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startPipeline();
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [startPipeline]);

  /* ----- drawer: lock body scroll ----- */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const closeDrawer = () => setDrawerOpen(false);

  /* ------------------------------------------------------------------ */
  /* Render                                                               */
  /* ------------------------------------------------------------------ */
  return (
    <>
      {/* ============================================================ NAV */}
      <header className={`nav${scrolled ? " scrolled" : ""}`} id="nav">
        <div className="wrap nav-in">
          <a className="brand" href="#top">
            <Icon name="logo" />
            <span><b>Nova</b><span className="a2">Stack</span></span>
          </a>

          <nav className="nav-links">
            <a href="#top"      className={activeSection === "top"      ? "active" : ""}>{tn("home")}</a>
            <a href="#about"    className={activeSection === "about"    ? "active" : ""}>{tn("about")}</a>
            <a href="#services" className={activeSection === "services" ? "active" : ""}>{tn("services")}</a>
            <a href="#contact"  className={activeSection === "contact"  ? "active" : ""}>{tn("contact")}</a>
          </nav>

          <div className="nav-right">
            <div className="lang">
              <Link href="/fr" className={locale === "fr" ? "on" : ""}>FR</Link>
              <Link href="/en" className={locale === "en" ? "on" : ""}>EN</Link>
            </div>
            <a className="btn btn-primary" href="#contact">
              {tn("bookCall")}<Icon name="arrow" />
            </a>
            <button
              className="menu-btn"
              aria-label="Menu"
              onClick={() => setDrawerOpen(true)}
            >
              <Icon name="platform" />
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================ DRAWER */}
      <div className={`drawer${drawerOpen ? " open" : ""}`}>
        <div className="drawer-top">
          <a className="brand" href="#top" onClick={closeDrawer}>
            <Icon name="logo" />
            <span><b>Nova</b><span className="a2">Stack</span></span>
          </a>
          <button className="menu-btn" aria-label="Fermer" onClick={closeDrawer}>
            <Icon name="check" />
          </button>
        </div>
        <nav>
          <a href="#top"      onClick={closeDrawer}>{tn("home")}</a>
          <a href="#about"    onClick={closeDrawer}>{tn("about")}</a>
          <a href="#services" onClick={closeDrawer}>{tn("services")}</a>
          <a href="#contact"  onClick={closeDrawer}>{tn("contact")}</a>
        </nav>
        <a className="btn btn-primary btn-lg" href="#contact" onClick={closeDrawer}>
          {tn("bookCall")}<Icon name="arrow" />
        </a>
      </div>

      <main id="top">

        {/* ========================================================== HERO */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <span className="eyebrow rv">{t("heroBadge")}</span>
              <h1 className="rv d1">
                {t("heroLine1")} <em>{t("heroEm")}</em><br />
                <span className="soft">{t("heroSoft")}</span> {t("heroLine2")}
              </h1>
              <p className="hero-sub rv d2">
                {t("heroDesc")}
              </p>
              <div className="hero-cta rv d3">
                <a className="btn btn-primary btn-lg" href="#contact">
                  {t("ctaPrimary")}<Icon name="arrow" />
                </a>
                <a className="btn btn-ghost btn-lg" href="#services">{t("ctaSecondary")}</a>
              </div>
            </div>

            <div className="hero-art rv d2" aria-hidden="true">
              <div className="stack-scene">
                <div className="plate" style={{ opacity: 0.5, transform: "rotate(45deg) translate(0,46px) scale(.92)" }} />
                <div className="plate" style={{ opacity: 0.78, transform: "rotate(45deg) translate(0,22px) scale(.96)" }} />
                <div className="plate" style={{ transform: "rotate(45deg)" }} />
              </div>
              <div className="hero-tag t1">
                <Icon name="ai" />
                {t("heroTag1")}
              </div>
              <div className="hero-tag t2">
                <span className="pulse-dot" />
                {t("heroTag2")}
              </div>
              <div className="hero-tag t3">
                <Icon name="stack" />
                {t("heroTag3")}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================== STRIP */}
        <div className="strip" aria-hidden="true">
          <div className="strip-track">
            <span>{t("stripItem1")}</span>
            <span>{t("stripItem2")}</span>
            <span>{t("stripItem3")}</span>
            <span>{t("stripItem4")}</span>
            <span>{t("stripItem5")}</span>
            <span>{t("stripItem6")}</span>
            <span>{t("stripItem1")}</span>
            <span>{t("stripItem2")}</span>
            <span>{t("stripItem3")}</span>
            <span>{t("stripItem4")}</span>
            <span>{t("stripItem5")}</span>
            <span>{t("stripItem6")}</span>
          </div>
        </div>

        {/* ========================================================== WHO */}
        <section className="who" id="about">
          <div className="wrap sec who-in">
            <div className="rv">
              <span className="eyebrow">{t("whoEyebrow")}</span>
            </div>
            <p className="big rv d1">
              {t("whoText")}{" "}
              <b>{t("whoTextBold")}</b>{" "}
              {t("whoTextEnd")}
            </p>
          </div>
        </section>

        {/* ========================================================== SERVICES */}
        <section className="sec wrap" id="services">
          <div className="svc-top">
            <div className="sec-head rv">
              <span className="eyebrow">{t("svcEyebrow")}</span>
              <h2>{t("svcTitle")}</h2>
            </div>
            <div className="rv d1">
              <p className="lead">
                {t("svcLead1")}
              </p>
              <p className="lead">
                {t("svcLead2")}
              </p>
            </div>
          </div>
          <div className="svc-grid">
            <article className="svc-card rv">
              <span className="num">01</span>
              <Icon name="apps" />
              <h3>{t("sub1Title")}</h3>
              <p>{t("sub1Desc")}</p>
            </article>
            <article className="svc-card rv d1">
              <span className="num">02</span>
              <Icon name="platform" />
              <h3>{t("sub2Title")}</h3>
              <p>{t("sub2Desc")}</p>
            </article>
            <article className="svc-card rv d2">
              <span className="num">03</span>
              <Icon name="portal" />
              <h3>{t("sub3Title")}</h3>
              <p>{t("sub3Desc")}</p>
            </article>
            <article className="svc-card rv d3">
              <span className="num">04</span>
              <Icon name="dashboard" />
              <h3>{t("sub4Title")}</h3>
              <p>{t("sub4Desc")}</p>
            </article>
          </div>
        </section>

        {/* ========================================================== AI */}
        <section className="ai">
          <div className="wrap sec ai-grid">
            <div className="rv">
              <span className="eyebrow">{t("aiEyebrow")}</span>
              <h2>{t("aiTitle")} <em>{t("aiTitleEm")}</em> {t("aiTitleEnd")}</h2>
              <p style={{ marginTop: "20px", color: "oklch(0.82 0.01 70)", fontSize: "1.08rem" }}>
                {t("aiDesc")}
              </p>
              <ul className="ai-list">
                <li><Icon name="check" />{t("aiPoint1")}</li>
                <li><Icon name="check" />{t("aiPoint2")}</li>
                <li><Icon name="check" />{t("aiPoint3")}</li>
                <li><Icon name="check" />{t("aiPoint4")}</li>
              </ul>
            </div>

            {/* Pipeline panel */}
            <div className="pipe rv d2" id="pipe" ref={pipeRef}>
              <div className="pipe-head">
                <Icon name="ai" style={{ width: "20px", height: "20px", color: "var(--clay-tint)" }} />
                {t("pipeTitle")}
                <span className="live">
                  <span className="pulse-dot" style={{ background: "var(--blue)" }} />
                  {t("pipeLive")}
                </span>
              </div>
              <div className="pipe-rows">
                {PIPE_ROWS.map((row, i) => (
                  <div className="pipe-row" key={row.label}>
                    <div className="lbl">
                      <b>{row.label}</b>
                      <span className="pct">{pcts[i]}%</span>
                    </div>
                    <div className="bar">
                      <i style={{ width: `${barWidths[i]}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="pipe-foot">
                {PIPE_STATS.map((stat, i) => (
                  <div className="stat" key={stat.label}>
                    <div className="v">{counters[i]}</div>
                    <div className="k">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================== WHY */}
        <section className="sec wrap">
          <div className="sec-head rv">
            <span className="eyebrow">{t("whyEyebrow")}</span>
            <h2>{t("whyTitle")}</h2>
            <p>{t("whyDesc")}</p>
          </div>
          <div className="why-grid">
            <article className="why-card rv">
              <Icon name="ai" />
              <h3>{t("why1Title")}</h3>
              <p>{t("why1Desc")}</p>
            </article>
            <article className="why-card rv d1">
              <Icon name="business" />
              <h3>{t("why2Title")}</h3>
              <p>{t("why2Desc")}</p>
            </article>
            <article className="why-card rv d2">
              <Icon name="execution" />
              <h3>{t("why3Title")}</h3>
              <p>{t("why3Desc")}</p>
            </article>
            <article className="why-card rv">
              <Icon name="durable" />
              <h3>{t("why4Title")}</h3>
              <p>{t("why4Desc")}</p>
            </article>
            <article className="why-card rv d1">
              <Icon name="africa" />
              <h3>{t("why5Title")}</h3>
              <p>{t("why5Desc")}</p>
            </article>
            <article className="why-card rv d2">
              <Icon name="stack" />
              <h3>{t("why6Title")}</h3>
              <p>{t("why6Desc")}</p>
            </article>
          </div>
        </section>

        {/* ========================================================== PORTFOLIO */}
        <section className="sec wrap" id="portfolio">
          <div className="sec-head rv">
            <span className="eyebrow">{t("portEyebrow")}</span>
            <h2>{t("portTitle")}</h2>
            <p>{t("portDesc")}</p>
          </div>
          <div className="port-grid">
            {PROJECTS.map((p, i) => (
              <article key={p.key} className={`port-card rv${i > 0 ? ` d${Math.min(i, 4)}` : ""}`}>
                <div className="port-badges">
                  <span className="port-cat">{t(p.catKey as Parameters<typeof t>[0])}</span>
                  <span className="port-status">
                    {p.done ? t("portDone") : t("portWip")}
                  </span>
                </div>
                <h3>{t(p.titleKey as Parameters<typeof t>[0])}</h3>
                <p>{t(p.descKey as Parameters<typeof t>[0])}</p>
                <div className="port-stack">
                  {p.stack.map((s) => <span key={s} className="port-tech">{s}</span>)}
                </div>
                {p.url && (
                  <a className="port-link" href={p.url} target="_blank" rel="noopener noreferrer">
                    {t("portSee")}<Icon name="arrow" />
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* ========================================================== INDUSTRIES */}
        <section className="ind">
          <div className="wrap sec">
            <div className="sec-head rv">
              <span className="eyebrow">{t("indEyebrow")}</span>
              <h2>{t("indTitle")}</h2>
            </div>
            <div className="ind-grid">
              <div className="ind-card rv"><Icon name="finance" />Banking &amp; Finance</div>
              <div className="ind-card rv d1"><Icon name="telecom" />Telecom</div>
              <div className="ind-card rv d2"><Icon name="logistics" />Logistics</div>
              <div className="ind-card rv d3"><Icon name="datacenter" />Datacenter</div>
              <div className="ind-card rv"><Icon name="retail" />Retail</div>
              <div className="ind-card rv d1"><Icon name="government" />Government</div>
              <div className="ind-card rv d2"><Icon name="healthcare" />Healthcare</div>
              <a className="ind-card more rv d3" href="#contact">
                {t("indMore")}<Icon name="arrow" />
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================== CTA */}
        <section className="sec wrap" id="contact">
          <div className="cta-band rv">
            <div className="cta-glow" />
            <div className="cta-glow two" />
            <span className="eyebrow">{t("ctaEyebrow")}</span>
            <h2>{t("ctaTitle")} <em>{t("ctaTitleEm")}</em></h2>
            <p>{t("ctaDesc")}</p>
            <div className="cta-row">
              <a className="btn btn-primary btn-lg" href="mailto:contact@novastack.africa">
                {t("ctaBtn")}<Icon name="arrow" />
              </a>
              <a className="btn btn-ghost btn-lg" href="#about">{t("ctaAbout")}</a>
            </div>
          </div>
        </section>

      </main>

      {/* ========================================================== FOOTER */}
      <footer className="foot">
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <div className="brand">
                <Icon name="logo" />
                <span><b>Nova</b><span className="a2">Stack</span></span>
              </div>
              <p className="blurb">
                {tf("tagline")}
              </p>
              <div className="foot-contact">
                <a href="mailto:contact@novastack.africa">
                  <Icon name="mail" />
                  contact@novastack.africa
                </a>
                <span>
                  <Icon name="pin" />
                  Abidjan, Côte d&apos;Ivoire
                </span>
                <a href="https://www.linkedin.com/company/novastack-africa" target="_blank" rel="noopener noreferrer">
                  <Icon name="linkedin" />
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="foot-col">
              <h4>{tf("company")}</h4>
              <ul>
                <li><a href="#about">{tn("about")}</a></li>
                <li><a href="#services">{tn("services")}</a></li>
                <li><a href="#contact">{tn("contact")}</a></li>
              </ul>
            </div>

            <div className="foot-col">
              <h4>{tf("services")}</h4>
              <ul>
                <li><a href="#services">{t("sub1Title")}</a></li>
                <li><a href="#services">{t("sub2Title")}</a></li>
                <li><a href="#services">{t("sub4Title")}</a></li>
              </ul>
            </div>

            <div className="foot-col">
              <h4>{tf("language")}</h4>
              <ul>
                <li><Link href="/fr">{tf("langFr")}</Link></li>
                <li><Link href="/en">{tf("langEn")}</Link></li>
              </ul>
            </div>
          </div>

          <div className="foot-bot">
            <span>© 2026 NovaStack Africa. {tf("rights")}</span>
            <span className="made">{tf("builtIn")} <span>🇨🇮</span></span>
          </div>
        </div>
      </footer>
    </>
  );
}

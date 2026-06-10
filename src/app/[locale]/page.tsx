"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Icon } from "@/components/Icons";

/* ------------------------------------------------------------------ */
/* Pipeline bar data                                                    */
/* ------------------------------------------------------------------ */
const PIPE_ROWS: { label: string; base: number; phase: number }[] = [
  { label: "Traitement de données", base: 0.48, phase: 0 },
  { label: "Automatisation",        base: 0.33, phase: 1.3 },
  { label: "Modèle prédictif",      base: 0.20, phase: 2.6 },
  { label: "Flux simplifiés",       base: 0.56, phase: 3.9 },
];

const PIPE_STATS: { count: number; suffix: string; label: string }[] = [
  { count: 68, suffix: "%",  label: "Tâches automatisées" },
  { count: 3,  suffix: "×",  label: "Décisions plus rapides" },
  { count: 24, suffix: "/7", label: "Traitement continu" },
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
  }, [pipeStarted]);

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
            <a href="#top"      className={activeSection === "top"      ? "active" : ""}>Accueil</a>
            <a href="#about"    className={activeSection === "about"    ? "active" : ""}>À propos</a>
            <a href="#services" className={activeSection === "services" ? "active" : ""}>Services</a>
            <a href="#contact"  className={activeSection === "contact"  ? "active" : ""}>Contact</a>
          </nav>

          <div className="nav-right">
            <div className="lang">
              <Link href="/fr" className={locale === "fr" ? "on" : ""}>FR</Link>
              <Link href="/en" className={locale === "en" ? "on" : ""}>EN</Link>
            </div>
            <a className="btn btn-primary" href="#contact">
              Échangeons<Icon name="arrow" />
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
          <a href="#top"      onClick={closeDrawer}>Accueil</a>
          <a href="#about"    onClick={closeDrawer}>À propos</a>
          <a href="#services" onClick={closeDrawer}>Services</a>
          <a href="#contact"  onClick={closeDrawer}>Contact</a>
        </nav>
        <a className="btn btn-primary btn-lg" href="#contact" onClick={closeDrawer}>
          Échangeons<Icon name="arrow" />
        </a>
      </div>

      <main id="top">

        {/* ========================================================== HERO */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <span className="eyebrow rv">Une équipe technique née à Abidjan</span>
              <h1 className="rv d1">
                Nous construisons avec <em>rigueur.</em><br />
                <span className="soft">Nous grandissons</span> avec vous.
              </h1>
              <p className="hero-sub rv d2">
                NovaStack Africa conçoit des applications web, des plateformes métier et des tableaux de bord analytiques pour des organisations africaines qui ont de vrais problèmes à résoudre.
              </p>
              <div className="hero-cta rv d3">
                <a className="btn btn-primary btn-lg" href="#contact">
                  Échangeons<Icon name="arrow" />
                </a>
                <a className="btn btn-ghost btn-lg" href="#services">Nos services</a>
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
                IA intégrée
              </div>
              <div className="hero-tag t2">
                <span className="pulse-dot" />
                En production
              </div>
              <div className="hero-tag t3">
                <Icon name="stack" />
                Stack moderne
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================== STRIP */}
        <div className="strip" aria-hidden="true">
          <div className="strip-track">
            <span>Applications Web</span>
            <span>Plateformes Métier</span>
            <span>Portails Clients</span>
            <span>Tableaux de bord &amp; BI</span>
            <span>Automatisation</span>
            <span>Modèles prédictifs</span>
            <span>Applications Web</span>
            <span>Plateformes Métier</span>
            <span>Portails Clients</span>
            <span>Tableaux de bord &amp; BI</span>
            <span>Automatisation</span>
            <span>Modèles prédictifs</span>
          </div>
        </div>

        {/* ========================================================== WHO */}
        <section className="who" id="about">
          <div className="wrap sec who-in">
            <div className="rv">
              <span className="eyebrow">Qui nous sommes</span>
            </div>
            <p className="big rv d1">
              Nous sommes au début. Nous en sommes conscients — et c&apos;est ce qui nous pousse à travailler avec{" "}
              <b>plus de soin, plus d&apos;écoute et plus d&apos;engagement.</b>{" "}
              Chaque projet compte pour nous.
            </p>
          </div>
        </section>

        {/* ========================================================== SERVICES */}
        <section className="sec wrap" id="services">
          <div className="svc-top">
            <div className="sec-head rv">
              <span className="eyebrow">Ce que nous construisons</span>
              <h2>Développement d&apos;applications, du premier croquis à la production.</h2>
            </div>
            <div className="rv d1">
              <p className="lead">
                Des outils internes aux plateformes clients, nous construisons des applications web modernes, rapides et fiables, pensées pour évoluer avec votre activité.
              </p>
              <p className="lead">
                Chaque projet démarre par une compréhension approfondie de vos processus — puis un logiciel qui s&apos;y adapte précisément, sans complexité inutile.
              </p>
            </div>
          </div>
          <div className="svc-grid">
            <article className="svc-card rv">
              <span className="num">01</span>
              <Icon name="apps" />
              <h3>Applications Web</h3>
              <p>Applications full-stack — performantes, sécurisées, prêtes pour la production.</p>
            </article>
            <article className="svc-card rv d1">
              <span className="num">02</span>
              <Icon name="platform" />
              <h3>Plateformes Métier</h3>
              <p>Plateformes opérationnelles qui centralisent vos processus clés.</p>
            </article>
            <article className="svc-card rv d2">
              <span className="num">03</span>
              <Icon name="portal" />
              <h3>Portails Clients</h3>
              <p>Portails sécurisés et personnalisés pour un accès client en temps réel.</p>
            </article>
            <article className="svc-card rv d3">
              <span className="num">04</span>
              <Icon name="dashboard" />
              <h3>Tableaux de bord &amp; BI</h3>
              <p>Analytiques interactives qui transforment vos données en décisions.</p>
            </article>
          </div>
        </section>

        {/* ========================================================== AI */}
        <section className="ai">
          <div className="wrap sec ai-grid">
            <div className="rv">
              <span className="eyebrow">Notre approche IA</span>
              <h2>L&apos;intelligence au <em>cœur</em> de chaque solution</h2>
              <p style={{ marginTop: "20px", color: "oklch(0.82 0.01 70)", fontSize: "1.08rem" }}>
                Nous n&apos;ajoutons pas l&apos;IA en fin de parcours. Dès la conception, nous réfléchissons à comment l&apos;automatisation, la prédiction et le traitement des données peuvent alléger le travail de vos équipes.
              </p>
              <ul className="ai-list">
                <li><Icon name="check" />Automatisation de flux métier répétitifs</li>
                <li><Icon name="check" />Outils d&apos;aide à la décision basés sur vos données</li>
                <li><Icon name="check" />Modèles prédictifs adaptés à votre secteur</li>
                <li><Icon name="check" />Interfaces en langage naturel pour vos systèmes existants</li>
              </ul>
            </div>

            {/* Pipeline panel */}
            <div className="pipe rv d2" id="pipe" ref={pipeRef}>
              <div className="pipe-head">
                <Icon name="ai" style={{ width: "20px", height: "20px", color: "var(--clay-tint)" }} />
                Pipeline NovaStack
                <span className="live">
                  <span className="pulse-dot" style={{ background: "var(--blue)" }} />
                  En cours d&apos;analyse
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
            <span className="eyebrow">Pourquoi NovaStack</span>
            <h2>Ce que nous apportons</h2>
            <p>Des fondamentaux solides, une vraie écoute, et des solutions qui servent réellement votre activité.</p>
          </div>
          <div className="why-grid">
            <article className="why-card rv">
              <Icon name="ai" />
              <h3>IA utile, pas décorative</h3>
              <p>L&apos;IA que nous intégrons résout un problème réel ou elle n&apos;y est pas. Pas de buzzwords, pas de gadgets.</p>
            </article>
            <article className="why-card rv d1">
              <Icon name="business" />
              <h3>Le métier avant la technique</h3>
              <p>Chaque décision technique est ancrée dans vos objectifs. Nous construisons ce dont vous avez besoin.</p>
            </article>
            <article className="why-card rv d2">
              <Icon name="execution" />
              <h3>Exécution maîtrisée</h3>
              <p>Des cycles courts, des jalons clairs et une communication continue. Vous n&apos;êtes jamais dans le flou.</p>
            </article>
            <article className="why-card rv">
              <Icon name="durable" />
              <h3>Construit pour durer</h3>
              <p>Architecture soignée, code maintenable, déploiement stable. Le travail bien fait dès le départ.</p>
            </article>
            <article className="why-card rv d1">
              <Icon name="africa" />
              <h3>Ancré en Afrique</h3>
              <p>Nous comprenons les contraintes d&apos;infrastructure, les réalités locales et les ambitions des organisations africaines.</p>
            </article>
            <article className="why-card rv d2">
              <Icon name="stack" />
              <h3>Stack moderne</h3>
              <p>Des technologies choisies pour leur pertinence et leur maintenabilité à long terme.</p>
            </article>
          </div>
        </section>

        {/* ========================================================== INDUSTRIES */}
        <section className="ind">
          <div className="wrap sec">
            <div className="sec-head rv">
              <span className="eyebrow">Secteurs</span>
              <h2>Les secteurs que nous ciblons</h2>
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
                Voir tous les secteurs<Icon name="arrow" />
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================== CTA */}
        <section className="sec wrap" id="contact">
          <div className="cta-band rv">
            <div className="cta-glow" />
            <div className="cta-glow two" />
            <span className="eyebrow">Prêt à démarrer&nbsp;?</span>
            <h2>Construisons ensemble, <em>solidement.</em></h2>
            <p>Parlez-nous de votre défi. Nous vous écoutons avant de proposer quoi que ce soit.</p>
            <div className="cta-row">
              <a className="btn btn-primary btn-lg" href="mailto:contact@novastack.africa">
                Échangeons<Icon name="arrow" />
              </a>
              <a className="btn btn-ghost btn-lg" href="#about">En savoir plus</a>
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
                Une équipe technique née à Abidjan, qui construit des logiciels sérieux pour des organisations africaines qui avancent.
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
              <h4>Entreprise</h4>
              <ul>
                <li><a href="#about">À propos</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="foot-col">
              <h4>Services</h4>
              <ul>
                <li><a href="#services">Applications Web</a></li>
                <li><a href="#services">Plateformes Métier</a></li>
                <li><a href="#services">Tableaux de bord &amp; BI</a></li>
              </ul>
            </div>

            <div className="foot-col">
              <h4>Langue</h4>
              <ul>
                <li><Link href="/fr">Français</Link></li>
                <li><Link href="/en">English</Link></li>
              </ul>
            </div>
          </div>

          <div className="foot-bot">
            <span>© 2026 NovaStack Africa. Tous droits réservés.</span>
            <span className="made">Conçu avec soin à Abidjan <span>🇨🇮</span></span>
          </div>
        </div>
      </footer>
    </>
  );
}

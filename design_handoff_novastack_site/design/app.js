/* ============================================================
   NovaStack Africa — interactions
   (scroll-based reveals — robust across environments)
   ============================================================ */
(function () {
  "use strict";

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const vh = () => window.innerHeight || document.documentElement.clientHeight;
  const inView = (el, frac) => {
    const r = el.getBoundingClientRect();
    const trigger = vh() * (1 - (frac == null ? 0.12 : frac));
    return r.top < trigger && r.bottom > 0;
  };

  /* ---- sticky nav shadow ---- */
  const nav = document.getElementById("nav");

  /* ---- scroll reveal ---- */
  const rvs = [...document.querySelectorAll(".rv")];
  function checkReveal() {
    for (let i = rvs.length - 1; i >= 0; i--) {
      const el = rvs[i];
      if (inView(el)) { el.classList.add("in"); rvs.splice(i, 1); }
    }
  }
  if (reduce) rvs.forEach((el) => el.classList.add("in"));

  /* ---- AI pipeline ---- */
  const pipe = document.getElementById("pipe");
  let pipeStarted = false;
  function startPipe() {
    if (!pipe || pipeStarted) return;
    pipeStarted = true;
    const bars = [...pipe.querySelectorAll("[data-bar]")];
    const pcts = [...pipe.querySelectorAll("[data-pct]")];
    const counters = [...pipe.querySelectorAll("[data-count]")];
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    counters.forEach((el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const dur = 1400, t0 = performance.now();
      (function step(now) {
        const p = Math.min(1, (now - t0) / dur);
        el.textContent = Math.round(target * easeOut(p)) + suffix;
        if (p < 1) requestAnimationFrame(step);
      })(t0);
    });

    if (reduce) {
      bars.forEach((b, i) => {
        const v = Math.min(0.95, parseFloat(b.dataset.bar) + 0.4);
        b.style.width = v * 100 + "%";
        if (pcts[i]) pcts[i].textContent = Math.round(v * 100) + "%";
      });
      return;
    }
    (function runPipe() {
      const t = performance.now() / 1000;
      bars.forEach((bar, i) => {
        const base = parseFloat(bar.dataset.bar);
        const wobble = 0.12 * (0.5 + 0.5 * Math.sin(t * 0.7 + i * 1.3));
        const val = Math.min(0.97, base + 0.28 + wobble);
        bar.style.width = (val * 100).toFixed(0) + "%";
        if (pcts[i]) pcts[i].textContent = Math.round(val * 100) + "%";
      });
      requestAnimationFrame(runPipe);
    })();
  }

  /* ---- active nav link ---- */
  const sections = ["top", "about", "services", "contact"]
    .map((id) => document.getElementById(id)).filter(Boolean);
  const links = [...document.querySelectorAll(".nav-links a")];
  function checkActive() {
    const mid = vh() * 0.4;
    let current = sections[0] && sections[0].id;
    for (const s of sections) {
      const r = s.getBoundingClientRect();
      if (r.top <= mid) current = s.id;
    }
    links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + current));
  }

  /* ---- master scroll handler (synchronous — no rAF dependency) ---- */
  let last = 0;
  function onScroll() {
    const now = Date.now();
    if (now - last < 60) return;
    last = now;
    nav.classList.toggle("scrolled", window.scrollY > 8);
    checkReveal();
    checkActive();
    if (pipe && inView(pipe, 0.3)) startPipe();
  }
  window.addEventListener("scroll", () => { last = 0; onScroll(); }, { passive: true });
  window.addEventListener("resize", () => { last = 0; onScroll(); }, { passive: true });
  /* run a few times after load so above-the-fold + late layout/fonts settle */
  function tick() { last = 0; onScroll(); }
  tick();
  [60, 200, 500, 1000, 1600].forEach((t) => setTimeout(tick, t));

  /* ---- mobile drawer ---- */
  const drawer = document.getElementById("drawer");
  const open = document.getElementById("openMenu");
  const close = document.getElementById("closeMenu");
  if (open) open.addEventListener("click", () => { drawer.classList.add("open"); document.body.style.overflow = "hidden"; });
  if (close) close.addEventListener("click", () => { drawer.classList.remove("open"); document.body.style.overflow = ""; });
  drawer && drawer.querySelectorAll("nav a, .btn").forEach((a) =>
    a.addEventListener("click", () => { drawer.classList.remove("open"); document.body.style.overflow = ""; })
  );
})();

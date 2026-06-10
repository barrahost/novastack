# Handoff : Site vitrine NovaStack Africa

## Vue d'ensemble
Site vitrine (landing page) one-page pour **NovaStack Africa**, une équipe technique basée à Abidjan
qui construit des applications web, plateformes métier, portails clients et tableaux de bord BI, avec
de l'IA intégrée. La page est en français (avec un sélecteur FR/EN prévu), ton éditorial sérieux,
ancrage africain, esthétique « warm-editorial » sur fond bleu nuit avec accent terracotta/orange.

Sections, dans l'ordre : Nav fixe → Hero → bandeau défilant (trust strip) → Qui nous sommes →
Services → Approche IA (avec panneau « pipeline » animé) → Pourquoi NovaStack → Secteurs →
CTA → Footer. Un menu mobile (drawer) plein écran est inclus.

## À propos des fichiers de design
Les fichiers du dossier `design/` sont des **références de design réalisées en HTML/CSS/JS** — un
prototype haute-fidélité qui montre l'apparence et le comportement attendus. **Ce n'est pas du code de
production à copier tel quel.** La tâche consiste à **recréer ce design dans l'environnement de votre
codebase** (React/Next, Vue, Astro, etc.) en suivant ses conventions, ses composants et son système de
styles. Si aucun environnement n'existe encore, choisissez le framework le plus adapté (pour un site
vitrine statique, **Astro** ou **Next.js** sont d'excellents choix) et implémentez-y le design.

Le HTML est volontairement « propre » et sémantique : il se traduit directement en composants
(Nav, Hero, ServiceCard, WhyCard, IndustryCard, AiPipeline, CtaBand, Footer, MobileDrawer).

## Fidélité
**Haute-fidélité (hifi).** Couleurs, typographie, espacements, rayons, ombres et animations sont
définitifs. Recréez l'UI au pixel près en réutilisant les composants/patterns existants de votre
codebase pour le styling, mais en respectant les tokens ci-dessous.

## Système de design (tokens)

### Couleurs (toutes en oklch — voir `:root` dans styles.css)
| Token | Valeur oklch | Rôle |
|---|---|---|
| `--paper` | `oklch(0.168 0.022 258)` | Fond principal (bleu nuit) |
| `--paper-2` | `oklch(0.205 0.025 260)` | Sections surélevées / bandeau |
| `--card` | `oklch(0.224 0.027 260)` | Cartes / panneaux |
| `--ink` | `oklch(0.972 0.006 250)` | Texte quasi-blanc |
| `--ink-soft` | `oklch(0.722 0.026 256)` | Texte secondaire gris-bleu |
| `--ink-faint` | `oklch(0.585 0.027 258)` | Texte tertiaire / numéros |
| `--line` | `oklch(0.315 0.030 260)` | Bordures |
| `--line-soft` | `oklch(0.262 0.028 260)` | Bordures discrètes |
| `--clay` | `oklch(0.730 0.170 53)` | **Orange — marque + action** |
| `--clay-deep` | `oklch(0.660 0.168 47)` | Orange foncé (hover/press) |
| `--clay-bright` | `oklch(0.770 0.150 60)` | Orange vif (mots en emphase) |
| `--clay-tint` | `oklch(0.815 0.110 64)` | Orange clair (bordure hover) |
| `--on-clay` | `oklch(0.205 0.030 50)` | Texte sur bouton orange |
| `--blue` | `oklch(0.620 0.078 248)` | Bleu acier sobre — **réservé aux données** |
| `--blue-deep` / `--blue-soft` | `oklch(0.520 0.082 250)` / `oklch(0.715 0.058 246)` | Variantes data |
| `--ink-rev` | `oklch(0.198 0.028 262)` | Fond des panneaux « feature » (section IA, CTA) |

> Règle de couleur importante : **l'orange est la couleur de marque et d'action ; le bleu acier est
> sobre et réservé aux éléments de données** (barres du pipeline, libellés de stats). Ne pas utiliser
> le bleu pour des CTA.

### Typographie (Google Fonts)
- `--f-display` : **Space Grotesk** (400/500/600/700) — titres, boutons, labels, chiffres.
- `--f-body` : **Hanken Grotesk** (400/500/600) — corps de texte. Body = 17px, line-height 1.6.
- `--f-edit` : **Newsreader** italique (opsz 18, 400/500) — eyebrows et mots en emphase (`em`).
- Titres : weight 600, `letter-spacing: -0.02em`, `line-height: 1.04`, `text-wrap: balance`.
- H1 hero : `clamp(2.6rem, 6.2vw, 4.75rem)`. H2 section : `clamp(2rem, 4.2vw, 3.1rem)`.
- Les mots accentués en `<em>` passent en Newsreader italique couleur `--clay-bright`.

### Espacement & layout
- Largeur max conteneur `--maxw: 1200px` ; padding latéral `--pad: clamp(20px, 5vw, 64px)`.
- Padding vertical de section : `clamp(64px, 9vw, 128px)`.
- Rayons : boutons `999px` (pill) ; cartes services `18px` ; cartes secteurs `14px` ;
  bloc « pourquoi » `22px` ; bande CTA `28px` ; tags hero `12px`.
- Ombres : douces et chaudes, ex. cartes hover `0 24px 50px -34px oklch(0.4 0.06 50 / 0.55)`.

### Eyebrows (sur-titres)
Newsreader italique, couleur `--clay-deep`, précédé d'un tiret terracotta de 26px
(`::before` : trait 26×1.5px en `--clay`).

## Écrans / sections (détail)

### 1. Nav (fixe, `position: sticky`)
- Hauteur 72px, fond `--paper` à 80% d'opacité + `backdrop-filter: blur(14px) saturate(1.3)`.
- À gauche : logo (icône `logo` + « **Nova**Stack », « Stack » en `--clay-deep`).
- Centre : liens Accueil / À propos / Services / Contact (lien actif = `--ink`).
- Droite : sélecteur de langue FR/EN (FR « on » avec bordure), bouton primaire « Échangeons » + flèche,
  et bouton hamburger (visible ≤ 860px uniquement).
- **Comportement** : au scroll > 8px, ajoute la classe `.scrolled` (bordure basse + fond plus opaque).
  Le lien de nav actif change selon la section visible (scroll-spy, seuil à 40% de la hauteur).

### 2. Hero
- Grille 2 colonnes `1.15fr 0.85fr`, gap `clamp(32px, 5vw, 72px)`.
- Gauche : eyebrow « Une équipe technique née à Abidjan », H1, sous-titre, 2 CTA (primaire + ghost).
- Droite (`.hero-art`, masquée ≤ 860px) : scène décorative = 3 « plaques » carrées empilées et
  tournées à 45° (effet stack), + 3 tags flottants (« IA intégrée », « En production » avec point
  pulsé, « Stack moderne »).
- Le point pulsé `.pulse-dot` : 8px, anim `pulse` 2.4s infinie (halo orange qui s'étend).

### 3. Trust strip (bandeau défilant)
- Bordures haut/bas, fond `--paper-2`. Marquee horizontal infini (`@keyframes slide` 32s linéaire),
  liste de mots-clés en Space Grotesk séparés par un astérisque orange `✳`. Pause au survol.
  Le contenu est dupliqué pour une boucle continue (translation -50%).

### 4. Qui nous sommes (`.who`, fond `--sand`)
- Grille `0.8fr 1.2fr`. Eyebrow + grande phrase en Space Grotesk medium
  `clamp(1.4rem, 2.6vw, 2.1rem)`, mots clés en `--clay-bright`.

### 5. Services
- En-tête en grille `1.15fr 0.85fr` (titre + 2 paragraphes lead).
- Grille de 4 cartes (`repeat(4,1fr)`, gap 20px) : numéro 01–04 en haut à droite, icône (38px,
  marge basse 50px), titre, description. Hover : `translateY(-4px)`, bordure `--clay-tint`, ombre,
  icône passe en `--clay-deep`. Cartes : Applications Web, Plateformes Métier, Portails Clients,
  Tableaux de bord & BI.

### 6. Approche IA (`.ai`, fond `--ink-rev`)
- Grille `1fr 1fr`. Gauche : titre (« cœur » en em orange) + paragraphe + liste à puces (chaque ligne
  = icône check orange + texte, séparateurs `border-top` blancs à 10%).
- Droite : **panneau « Pipeline NovaStack »** (`#pipe`, fond `oklch(0.255 0.014 56)`, rayon 20px).
  - En-tête : icône IA + titre + indicateur live (« En cours d'analyse » + point pulsé bleu).
  - 4 lignes avec libellé + pourcentage (couleur `--blue-soft`, tabular-nums) + barre de progression
    (`.bar i`, dégradé bleu).
  - Pied : 3 stats (68% tâches automatisées, 3× décisions plus rapides, 24/7 traitement continu).
  - **Animation** (voir app.js) : déclenchée quand le panneau entre dans le viewport (`startPipe`).
    Les compteurs s'animent de 0 à la cible (ease-out cubique, 1400ms). Les barres « respirent »
    en continu via `requestAnimationFrame` (oscillation sinusoïdale autour d'une base + offset).
    En `prefers-reduced-motion`, valeurs figées sans boucle.

### 7. Pourquoi NovaStack
- Eyebrow + H2 + sous-titre. Grille `repeat(3,1fr)` de 6 cartes dans **un seul bloc bordé** (rayon 22px,
  bordures internes partagées entre cellules ; les 3n perdent la bordure droite, les 3 derniers la
  bordure basse). Chaque carte : icône + titre + texte. Hover : fond `--paper-2`, icône `--clay-deep`.

### 8. Secteurs (`.ind`, fond `--paper-2`)
- Grille `repeat(4,1fr)`, gap 14px. 7 cartes (icône + libellé : Banking & Finance, Telecom, Logistics,
  Datacenter, Retail, Government, Healthcare) + 1 carte « Voir tous les secteurs » en style pointillé
  (bordure dashed, lien vers #contact). Hover : `translateY(-3px)`, bordure orange clair.

### 9. CTA (`.cta-band`)
- Bloc `--ink-rev`, rayon 28px, padding `clamp(44px,6vw,84px)`. 2 halos radiaux décoratifs
  (`.cta-glow` orange en bas-droite, `.cta-glow.two` bleu en haut-gauche). Eyebrow + H2
  (« solidement » en em orange) + paragraphe + 2 boutons (mailto:contact@novastack.africa + ghost).

### 10. Footer
- Grille `1.4fr 0.8fr 0.8fr 1fr`. Col 1 : logo + blurb + contacts (email, localisation Abidjan,
  LinkedIn). Col 2–4 : Entreprise / Services / Langue. Barre du bas : copyright + « Conçu avec soin à
  Abidjan 🇨🇮 ».

### Menu mobile (drawer)
- `.drawer` plein écran (`position: fixed; inset: 0`), masqué par défaut, `.open` l'affiche en flex
  colonne. Liens en grand (Space Grotesk 1.8rem). Ouverture/fermeture via boutons hamburger/check ;
  bloque le scroll du body (`overflow: hidden`) quand ouvert ; se ferme au clic sur un lien.

## Interactions & comportement (résumé, voir `app.js`)
- **Scroll reveal** : tout élément `.rv` reçoit `.in` quand il entre dans le viewport (seuil 12%),
  jouant `@keyframes rvIn` (fade + translateY 22px → 0, 0.72s). Délais en cascade via `.d1`–`.d4`.
  En reduced-motion, `.in` est appliqué immédiatement sans animation.
- **Nav scrolled / scroll-spy** : voir section Nav.
- **Pipeline IA** : voir section 6.
- **Drawer mobile** : voir ci-dessus.
- Le handler de scroll est throttlé (~60ms) et rejoué plusieurs fois après le load
  (60/200/500/1000/1600ms) pour rattraper le layout tardif et le chargement des polices.

## Responsive (breakpoints)
- **≤ 1020px** : services en 2 col, secteurs en 3 col, pourquoi en 2 col (bordures recalculées).
- **≤ 860px** : toutes les grilles 2-col passent en 1 col ; `.hero-art` masquée ; nav-links + langue
  masqués, hamburger affiché.
- **≤ 560px** : body 16px ; services/secteurs/pourquoi en 1 col ; bouton de nav masqué (CTA via drawer).

## Système d'icônes (`icons.js`)
Set d'icônes custom, **à recréer en SVG dans votre codebase** (ne pas dépendre du script d'injection).
Caractéristiques : grille 24×24, une seule épaisseur de trait, joints arrondis, `stroke: currentColor`.
Langage visuel commun : géométrie en **couches/cadres empilés** (clin d'œil à « NovaStack »), et **un
unique nœud terracotta** par icône (classe `.nd`, couleur `--clay`). Le script remplace les
`<span class="ic" data-icon="…">` par le SVG correspondant. Icônes utilisées : logo, apps, platform,
portal, dashboard, ai, business, execution, durable, africa, stack, finance, telecom, logistics,
datacenter, retail, government, healthcare, check, arrow, mail, pin, linkedin.

## Assets
- **Aucune image bitmap** dans le design (visuels 100% CSS/SVG). Les 3 captures dans `uploads/` du
  projet sont des références de l'ancien site, non utilisées par le code.
- **Polices** : Google Fonts (Space Grotesk, Hanken Grotesk, Newsreader) — voir le `<link>` dans
  `index.html`. À auto-héberger ou charger selon les conventions de votre codebase.
- **Sélecteur de langue FR/EN** : présent dans l'UI mais non câblé. Prévoir l'i18n (le contenu actuel
  est en français ; une version EN est attendue).

## Fichiers fournis (dans `design/`)
- `index.html` — structure complète et copie (texte définitif).
- `styles.css` — tous les styles et tokens (`:root`), animations, responsive.
- `app.js` — interactions (reveal, scroll-spy, pipeline animé, drawer).
- `icons.js` — définitions SVG du set d'icônes + logique d'injection.

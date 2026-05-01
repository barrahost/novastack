# NovaStack Africa — Website

**AI-Powered Solutions. Built for Impact.**

Official website for [NovaStack Africa](https://novastack.africa) — a modern enterprise software company specializing in AI solutions, application development, and digital transformation for businesses across Africa.

---

## Tech Stack

- **Framework**: Next.js 14 (App Router, Static Export)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Font**: Fira Sans (Google Fonts)
- **Deployment**: Cloudflare Pages
- **Language**: TypeScript

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/barrahost/novastack.git
cd novastack
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

The static output is generated in the `out/` folder — ready for Cloudflare Pages.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout (Navbar, Footer, metadata)
│   ├── page.tsx          # Home
│   ├── about/page.tsx    # About
│   ├── services/page.tsx # Services
│   ├── industries/page.tsx # Industries
│   └── contact/page.tsx  # Contact
├── components/
│   ├── Navbar.tsx
│   └── Footer.tsx
└── app/globals.css       # Global styles + Fira Sans
public/
└── favicon.svg
```

---

## Deployment (Cloudflare Pages)

1. Push to GitHub: `git push origin main`
2. In Cloudflare Pages:
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Environment variable**: `NODE_VERSION=18`
3. Connect domain `novastack.africa` in DNS settings

---

## Design System

| Token | Value |
|-------|-------|
| Primary Blue | `#1A6BFF` |
| Navy Blue | `#00457C` |
| Orange Accent | `#FF934E` |
| Background | `#060C18` |
| Card | `#0A1525` |
| Font | Fira Sans |
| Border Radius | 0–4px (sharp) |

The visual identity is coherent with [D-INFRAS Africa](https://d-infras.africa) — same font (Fira Sans), same color family (navy blue + orange), same sharp-corner approach.

---

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, services, AI expertise, why NovaStack, industries, CTA |
| About | `/about` | Vision, mission, approach, values, expertise |
| Services | `/services` | AI, Dev, Automation, Enterprise — detailed breakdown |
| Industries | `/industries` | Banking, Telecom, Logistics, Datacenter, Retail, Gov, Health |
| Contact | `/contact` | Contact form, email, LinkedIn, location |

---

## Future Pages (Planned)

- `/blog` — Insights and articles
- `/projects` — Portfolio and case studies
- `/client` — Secure client portal
- `/docs` — Documentation hub

---

Built with ❤️ in Abidjan, Côte d'Ivoire 🇨🇮

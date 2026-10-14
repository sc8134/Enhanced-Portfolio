<div align="center">

<svg width="800" height="120" viewBox="0 0 800 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#07090d"/>
      <stop offset="100%" style="stop-color:#0f131a"/>
    </linearGradient>
    <linearGradient id="brass" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#d4a054"/>
      <stop offset="50%" style="stop-color:#f5c378"/>
      <stop offset="100%" style="stop-color:#d4a054"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="800" height="120" rx="12" fill="url(#bg)"/>
  <rect x="0" y="108" width="800" height="2" rx="1" fill="url(#brass)" opacity="0.6"/>

  <!-- Animated scan line -->
  <rect x="0" y="0" width="800" height="2" rx="1" fill="url(#brass)" opacity="0.4">
    <animateTransform attributeName="transform" type="translate" from="0,0" to="0,120" dur="3s" repeatCount="indefinite"/>
  </rect>

  <!-- Corner dots -->
  <circle cx="20" cy="20" r="4" fill="#d4a054" opacity="0.8">
    <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite"/>
  </circle>
  <circle cx="780" cy="20" r="4" fill="#d4a054" opacity="0.8">
    <animate attributeName="opacity" values="0.2;0.8;0.2" dur="2s" repeatCount="indefinite"/>
  </circle>
  <circle cx="20" cy="100" r="4" fill="#d4a054" opacity="0.8">
    <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2.5s" repeatCount="indefinite"/>
  </circle>
  <circle cx="780" cy="100" r="4" fill="#d4a054" opacity="0.8">
    <animate attributeName="opacity" values="0.2;0.8;0.2" dur="2.5s" repeatCount="indefinite"/>
  </circle>

  <!-- Title -->
  <text x="400" y="52" font-family="monospace" font-size="28" font-weight="bold" fill="url(#brass)" text-anchor="middle" filter="url(#glow)">ENHANCED PORTFOLIO</text>
  <text x="400" y="78" font-family="monospace" font-size="13" fill="#9fa7b3" text-anchor="middle">by Sagar Roka Chhetri · Full Stack Engineer · Kathmandu, Nepal</text>
  <text x="400" y="100" font-family="monospace" font-size="10" fill="#4a5568" text-anchor="middle">React 19 · TypeScript · TanStack Router · Tailwind v4 · Vite 8</text>
</svg>

<br/>

![Status](https://img.shields.io/badge/status-live-brightgreen?style=for-the-badge&labelColor=0f131a&color=10b981)
![License](https://img.shields.io/badge/license-Proprietary-d4a054?style=for-the-badge&labelColor=0f131a)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3b82f6?style=for-the-badge&labelColor=0f131a&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&labelColor=0f131a&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646cff?style=for-the-badge&labelColor=0f131a&logo=vite&logoColor=white)

</div>

---

<div align="center">

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   ⚡  I write my own code.                                  │
│      I test it, fix it, and deploy it. Every time.         │
│                                                             │
│                              — Sagar Roka Chhetri           │
└─────────────────────────────────────────────────────────────┘
```

</div>

---

## ✦ What is this

This is my personal portfolio — built from scratch, no templates, no starter kits I didn't understand. Every architectural decision was intentional. It doubles as a boilerplate I can reuse and evolve.

> **All rights reserved. This code may not be used, copied, or adapted without explicit written permission from the author. See [LICENSE](./LICENSE).**

---

## ✦ Feature Showcase

<div align="center">

<svg width="760" height="300" viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="card1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f131a"/>
      <stop offset="100%" style="stop-color:#161c24"/>
    </linearGradient>
    <linearGradient id="card2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f131a"/>
      <stop offset="100%" style="stop-color:#161c24"/>
    </linearGradient>
  </defs>

  <!-- Card 1: Live Code Playground -->
  <rect x="10" y="10" width="225" height="130" rx="10" fill="url(#card1)" stroke="#1c232e" stroke-width="1"/>
  <rect x="10" y="10" width="225" height="3" rx="1" fill="#10b981" opacity="0.7"/>
  <text x="30" y="42" font-family="monospace" font-size="11" fill="#10b981">▶  Live Code Playground</text>
  <text x="30" y="62" font-family="monospace" font-size="9" fill="#4a5568">TypeScript source on left.</text>
  <text x="30" y="76" font-family="monospace" font-size="9" fill="#4a5568">Live React output on right.</text>
  <text x="30" y="90" font-family="monospace" font-size="9" fill="#4a5568">4 real projects: E-Commerce,</text>
  <text x="30" y="104" font-family="monospace" font-size="9" fill="#4a5568">Job Board, Dashboard, SaaS.</text>
  <text x="30" y="125" font-family="monospace" font-size="8" fill="#10b981" opacity="0.6">Click Run ▶ to render output</text>

  <!-- Card 2: 3D Monitor -->
  <rect x="247" y="10" width="225" height="130" rx="10" fill="url(#card1)" stroke="#1c232e" stroke-width="1"/>
  <rect x="247" y="10" width="225" height="3" rx="1" fill="#d4a054" opacity="0.7"/>
  <text x="267" y="42" font-family="monospace" font-size="11" fill="#d4a054">◈  3D Desktop Monitor</text>
  <text x="267" y="62" font-family="monospace" font-size="9" fill="#4a5568">CSS 3D perspective transform.</text>
  <text x="267" y="76" font-family="monospace" font-size="9" fill="#4a5568">Mouse parallax tilt effect.</text>
  <text x="267" y="90" font-family="monospace" font-size="9" fill="#4a5568">Idle float animation.</text>
  <text x="267" y="104" font-family="monospace" font-size="9" fill="#4a5568">Scanlines + glass glare overlay.</text>
  <text x="267" y="125" font-family="monospace" font-size="8" fill="#d4a054" opacity="0.6">No WebGL · Pure CSS · Any device</text>

  <!-- Card 3: Terminal CLI -->
  <rect x="484" y="10" width="225" height="130" rx="10" fill="url(#card1)" stroke="#1c232e" stroke-width="1"/>
  <rect x="484" y="10" width="225" height="3" rx="1" fill="#3b82f6" opacity="0.7"/>
  <text x="504" y="42" font-family="monospace" font-size="11" fill="#3b82f6">$  Interactive Terminal CLI</text>
  <text x="504" y="62" font-family="monospace" font-size="9" fill="#4a5568">Full command set: whoami,</text>
  <text x="504" y="76" font-family="monospace" font-size="9" fill="#4a5568">projects, skills, why-hired.</text>
  <text x="504" y="90" font-family="monospace" font-size="9" fill="#4a5568">Free-form Q&amp;A with keyword</text>
  <text x="504" y="104" font-family="monospace" font-size="9" fill="#4a5568">matching. Open with ⌘K or /</text>
  <text x="504" y="125" font-family="monospace" font-size="8" fill="#3b82f6" opacity="0.6">Keyboard shortcut: ⌘K or /</text>

  <!-- Card 4: BS Calendar -->
  <rect x="10" y="155" width="225" height="130" rx="10" fill="url(#card1)" stroke="#1c232e" stroke-width="1"/>
  <rect x="10" y="155" width="225" height="3" rx="1" fill="#8b5cf6" opacity="0.7"/>
  <text x="30" y="187" font-family="monospace" font-size="11" fill="#8b5cf6">◉  BS Calendar Engine</text>
  <text x="30" y="207" font-family="monospace" font-size="9" fill="#4a5568">Custom Bikram Sambat ↔ AD</text>
  <text x="30" y="221" font-family="monospace" font-size="9" fill="#4a5568">conversion. Hand-verified</text>
  <text x="30" y="235" font-family="monospace" font-size="9" fill="#4a5568">lookup tables. Nepal UTC+5:45</text>
  <text x="30" y="249" font-family="monospace" font-size="9" fill="#4a5568">timezone. GPL-3.0 open source.</text>
  <text x="30" y="270" font-family="monospace" font-size="8" fill="#8b5cf6" opacity="0.6">No external library · 10yr accuracy</text>

  <!-- Card 5: Contact Form -->
  <rect x="247" y="155" width="225" height="130" rx="10" fill="url(#card1)" stroke="#1c232e" stroke-width="1"/>
  <rect x="247" y="155" width="225" height="3" rx="1" fill="#ec4899" opacity="0.7"/>
  <text x="267" y="187" font-family="monospace" font-size="11" fill="#ec4899">✉  Web3Forms Contact</text>
  <text x="267" y="207" font-family="monospace" font-size="9" fill="#4a5568">Sends directly to inbox.</text>
  <text x="267" y="221" font-family="monospace" font-size="9" fill="#4a5568">No backend, no email client.</text>
  <text x="267" y="235" font-family="monospace" font-size="9" fill="#4a5568">Subject presets, name, company,</text>
  <text x="267" y="249" font-family="monospace" font-size="9" fill="#4a5568">message. Zero spam tracking.</text>
  <text x="267" y="270" font-family="monospace" font-size="8" fill="#ec4899" opacity="0.6">Powered by Web3Forms API</text>

  <!-- Card 6: Recruiter Modal -->
  <rect x="484" y="155" width="225" height="130" rx="10" fill="url(#card1)" stroke="#1c232e" stroke-width="1"/>
  <rect x="484" y="155" width="225" height="3" rx="1" fill="#f59e0b" opacity="0.7"/>
  <text x="504" y="187" font-family="monospace" font-size="11" fill="#f59e0b">✦  60s Recruiter Brief</text>
  <text x="504" y="207" font-family="monospace" font-size="9" fill="#4a5568">One-click recruiter packet.</text>
  <text x="504" y="221" font-family="monospace" font-size="9" fill="#4a5568">Copyable summary, resume</text>
  <text x="504" y="235" font-family="monospace" font-size="9" fill="#4a5568">download, LinkedIn, GitHub.</text>
  <text x="504" y="249" font-family="monospace" font-size="9" fill="#4a5568">Interactive fit checker UI.</text>
  <text x="504" y="270" font-family="monospace" font-size="8" fill="#f59e0b" opacity="0.6">Built for hiring managers</text>
</svg>

</div>

---

## ✦ Tech Stack

<div align="center">

| Layer | Technology | Why |
|:---|:---|:---|
| **UI Framework** | React 19 | Concurrent features, stable |
| **Language** | TypeScript 5.7 strict | Zero guessing at runtime |
| **Routing** | TanStack Router | File-based, fully type-safe |
| **Styling** | Tailwind CSS v4 | `@theme` tokens, native Vite plugin |
| **Build Tool** | Vite 8 | Sub-second HMR, rolldown bundler |
| **Legacy Support** | `@vitejs/plugin-legacy` | Works on shared hosting |
| **Contact** | Web3Forms | No backend, delivers to inbox |
| **Deployment** | Static SPA | InfinityFree, cPanel, Vercel, Netlify |

</div>

---

## ✦ Project Structure

```
portfolio/
├── public/                   # Static assets (images, resume, favicon)
├── src/
│   ├── components/
│   │   └── sections/         # All portfolio sections and widgets
│   │       ├── portfolio.tsx       # Main portfolio page (all sections)
│   │       ├── code-playground.tsx # 3D monitor + live code output
│   │       ├── terminal-modal.tsx  # Interactive CLI terminal
│   │       ├── recruiter-modal.tsx # 60-second recruiter brief
│   │       ├── project-modal.tsx   # Project deep-dive modal
│   │       ├── github-pulse.tsx    # Git activity heatmap
│   │       ├── namo-patro-widget.tsx  # BS calendar demo
│   │       └── jobhunt-agent-widget.tsx # AI matcher demo
│   ├── data/
│   │   ├── profile.ts        # ← Edit this to customise content
│   │   └── notes.ts          # ← Edit this for blog entries
│   ├── lib/
│   │   ├── calendar/
│   │   │   └── bs-converter.ts   # Bikram Sambat engine
│   │   └── error-component.tsx
│   ├── routes/
│   │   ├── __root.tsx        # Root layout
│   │   └── index.tsx         # Home route "/"
│   ├── main.tsx              # App entry point
│   ├── router.tsx            # Router + module augmentation
│   └── styles.css            # Design tokens + global styles
├── index.html                # Vite entry HTML
├── vite.config.ts            # Build configuration
├── tsconfig.json             # TypeScript config
├── package.json
├── LICENSE                   # Proprietary — all rights reserved
└── README.md
```

---

## ✦ Getting Started

```bash
# 1. Clone
git clone https://github.com/sc8134/Enhanced-Portfolio.git
cd Enhanced-Portfolio

# 2. Install
npm install

# 3. Dev server (opens on http://localhost:8080)
npm run dev

# 4. Type check
npm run typecheck

# 5. Build for production
npm run build
```

---

## ✦ Deploying to Shared Hosting (InfinityFree / cPanel)

```bash
# Build
npm run build

# Zip the dist/ contents
# Upload dist.zip to htdocs/ via File Manager
# Extract in place
```

Add a `.htaccess` in `htdocs/` for client-side routing:

```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [L]
```

---

## ✦ Customising

All content lives in two files:

**`src/data/profile.ts`** — your name, bio, tagline, projects, skills, career path, socials, Q&A replies

**`src/data/notes.ts`** — your blog entries / field notes

Change those two files and everything on the site updates automatically.

---

## ✦ Design System

<div align="center">

<svg width="600" height="80" viewBox="0 0 600 80" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="80" rx="8" fill="#07090d" stroke="#1c232e" stroke-width="1"/>
  <!-- Color swatches -->
  <rect x="20" y="20" width="40" height="40" rx="6" fill="#07090d" stroke="#1c232e" stroke-width="1"/>
  <text x="40" y="74" font-family="monospace" font-size="7" fill="#4a5568" text-anchor="middle">bg</text>

  <rect x="70" y="20" width="40" height="40" rx="6" fill="#0f131a"/>
  <text x="90" y="74" font-family="monospace" font-size="7" fill="#4a5568" text-anchor="middle">surface</text>

  <rect x="120" y="20" width="40" height="40" rx="6" fill="#1c232e"/>
  <text x="140" y="74" font-family="monospace" font-size="7" fill="#4a5568" text-anchor="middle">line</text>

  <rect x="170" y="20" width="40" height="40" rx="6" fill="#d4a054"/>
  <text x="190" y="74" font-family="monospace" font-size="7" fill="#4a5568" text-anchor="middle">brass</text>

  <rect x="220" y="20" width="40" height="40" rx="6" fill="#f5f2eb"/>
  <text x="240" y="74" font-family="monospace" font-size="7" fill="#4a5568" text-anchor="middle">fg</text>

  <rect x="270" y="20" width="40" height="40" rx="6" fill="#9fa7b3"/>
  <text x="290" y="74" font-family="monospace" font-size="7" fill="#4a5568" text-anchor="middle">muted</text>

  <rect x="320" y="20" width="40" height="40" rx="6" fill="#f4efe6"/>
  <text x="340" y="74" font-family="monospace" font-size="7" fill="#4a5568" text-anchor="middle">paper</text>

  <rect x="370" y="20" width="40" height="40" rx="6" fill="#10b981"/>
  <text x="390" y="74" font-family="monospace" font-size="7" fill="#4a5568" text-anchor="middle">emerald</text>

  <rect x="420" y="20" width="40" height="40" rx="6" fill="#3b82f6"/>
  <text x="440" y="74" font-family="monospace" font-size="7" fill="#4a5568" text-anchor="middle">blue</text>

  <rect x="470" y="20" width="40" height="40" rx="6" fill="#8b5cf6"/>
  <text x="490" y="74" font-family="monospace" font-size="7" fill="#4a5568" text-anchor="middle">violet</text>

  <rect x="520" y="20" width="40" height="40" rx="6" fill="#ef4444"/>
  <text x="540" y="74" font-family="monospace" font-size="7" fill="#4a5568" text-anchor="middle">red</text>
</svg>

**Fonts:** `Fraunces` (display/headings) · `Outfit` (body/UI) · `JetBrains Mono` (code/terminal)

</div>

---

## ✦ License

<div align="center">

<svg width="600" height="100" viewBox="0 0 600 100" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="100" rx="10" fill="#0f131a" stroke="#ef444430" stroke-width="1"/>
  <rect x="0" y="0" width="600" height="3" rx="1" fill="#ef4444" opacity="0.6"/>
  <text x="300" y="35" font-family="monospace" font-size="14" font-weight="bold" fill="#ef4444" text-anchor="middle">⚠  PROPRIETARY — ALL RIGHTS RESERVED</text>
  <text x="300" y="58" font-family="monospace" font-size="10" fill="#9fa7b3" text-anchor="middle">This software may NOT be used, copied, modified, or distributed</text>
  <text x="300" y="74" font-family="monospace" font-size="10" fill="#9fa7b3" text-anchor="middle">without explicit written permission from Sagar Roka Chhetri.</text>
  <text x="300" y="92" font-family="monospace" font-size="9" fill="#4a5568" text-anchor="middle">Contact: sc81341@gmail.com · Copyright © 2026 Sagar Roka Chhetri</text>
</svg>

</div>

---

## ✦ Author

<div align="center">

<svg width="500" height="90" viewBox="0 0 500 90" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="authorbg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f131a"/>
      <stop offset="100%" style="stop-color:#161c24"/>
    </linearGradient>
  </defs>
  <rect width="500" height="90" rx="10" fill="url(#authorbg)" stroke="#1c232e" stroke-width="1"/>
  <rect x="0" y="0" width="500" height="3" rx="1" fill="url(#brass)"/>
  <circle cx="55" cy="45" r="28" fill="#d4a05420" stroke="#d4a05440" stroke-width="1"/>
  <text x="55" y="51" font-family="monospace" font-size="22" text-anchor="middle">⚡</text>
  <text x="105" y="30" font-family="monospace" font-size="14" font-weight="bold" fill="#f5f2eb">Sagar Roka Chhetri</text>
  <text x="105" y="48" font-family="monospace" font-size="10" fill="#d4a054">Full Stack Engineer · Kathmandu, Nepal (UTC+5:45)</text>
  <text x="105" y="65" font-family="monospace" font-size="9" fill="#4a5568">github.com/sc8134  ·  linkedin.com/in/sagar-rc  ·  sc81341@gmail.com</text>
  <!-- Status dot -->
  <circle cx="460" cy="20" r="5" fill="#10b981">
    <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
  </circle>
  <text x="445" y="38" font-family="monospace" font-size="8" fill="#10b981" text-anchor="middle">Open to work</text>
</svg>

<br/>

[![GitHub](https://img.shields.io/badge/GitHub-sc8134-d4a054?style=for-the-badge&labelColor=0f131a&logo=github&logoColor=white)](https://github.com/sc8134)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-sagar--rc-3b82f6?style=for-the-badge&labelColor=0f131a&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sagar-rc)
[![Email](https://img.shields.io/badge/Email-sc81341@gmail.com-10b981?style=for-the-badge&labelColor=0f131a&logo=gmail&logoColor=white)](mailto:sc81341@gmail.com)

</div>

---

<div align="center">
<sub>Built from scratch · Every line written, tested, and deployed by Sagar RC</sub>
</div>

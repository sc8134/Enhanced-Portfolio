<div align="center">

<svg width="800" height="140" viewBox="0 0 800 140" xmlns="http://www.w3.org/2000/svg">
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
      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
      <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect width="800" height="140" rx="14" fill="url(#bg)"/>
  <rect x="0" y="136" width="800" height="3" rx="1" fill="url(#brass)" opacity="0.8"/>
  <rect x="0" y="1" width="800" height="3" rx="1" fill="url(#brass)" opacity="0.5"/>

  <!-- Animated scan line -->
  <rect x="0" y="0" width="800" height="2" fill="url(#brass)" opacity="0.3">
    <animateTransform attributeName="transform" type="translate" from="0,-2" to="0,142" dur="4s" repeatCount="indefinite"/>
  </rect>

  <!-- Pulsing corner dots -->
  <circle cx="22" cy="22" r="4" fill="#d4a054"><animate attributeName="opacity" values="1;0.2;1" dur="2s" repeatCount="indefinite"/></circle>
  <circle cx="778" cy="22" r="4" fill="#d4a054"><animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite"/></circle>
  <circle cx="22" cy="118" r="4" fill="#d4a054"><animate attributeName="opacity" values="1;0.2;1" dur="2.5s" repeatCount="indefinite"/></circle>
  <circle cx="778" cy="118" r="4" fill="#d4a054"><animate attributeName="opacity" values="0.2;1;0.2" dur="2.5s" repeatCount="indefinite"/></circle>

  <!-- Title -->
  <text x="400" y="52" font-family="'Courier New',monospace" font-size="30" font-weight="bold" fill="url(#brass)" text-anchor="middle" filter="url(#glow)">ENHANCED PORTFOLIO</text>
  <text x="400" y="80" font-family="'Courier New',monospace" font-size="13" fill="#9fa7b3" text-anchor="middle">Boilerplate by Sagar Roka Chhetri · Full Stack Engineer · Kathmandu, Nepal</text>
  <text x="400" y="104" font-family="'Courier New',monospace" font-size="10" fill="#4a5568" text-anchor="middle">React 19  ·  TypeScript 5.7  ·  TanStack Router  ·  Tailwind CSS v4  ·  Vite 8</text>

  <!-- Status indicator -->
  <circle cx="356" cy="122" r="4" fill="#10b981"><animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/></circle>
  <text x="365" y="126" font-family="'Courier New',monospace" font-size="9" fill="#10b981">Open to work</text>
</svg>

<br/>

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3b82f6?style=flat-square&logo=typescript&logoColor=white&labelColor=0f131a)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=white&labelColor=0f131a)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?style=flat-square&logo=vite&logoColor=white&labelColor=0f131a)](https://vite.dev/)
[![TanStack Router](https://img.shields.io/badge/TanStack_Router-1.x-f59e0b?style=flat-square&labelColor=0f131a)](https://tanstack.com/router)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06b6d4?style=flat-square&logo=tailwindcss&logoColor=white&labelColor=0f131a)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-ef4444?style=flat-square&labelColor=0f131a)](./LICENSE)

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

## ✦ About

This is my personal developer portfolio — built from scratch with no starter templates, no copied scaffolding, no code I don't understand. Every decision was intentional. It doubles as a reusable boilerplate I own and maintain.

> ⚠️ **All rights reserved.** This code may not be used, copied, modified, or distributed without explicit written permission from the author. See [LICENSE](./LICENSE).

---

## ✦ Features

| Feature | Description |
|:---|:---|
| 🖥️ **3D Desktop Monitor** | CSS perspective transform, mouse parallax tilt, idle float animation, scanlines overlay — no WebGL |
| ▶️ **Live Code Playground** | TypeScript source on left, live React output on right. Click Run to render. 4 real mini-apps |
| ⌨️ **Interactive Terminal CLI** | Full command set: `whoami`, `projects`, `skills`, `why-hired`. Open with `⌘K` or `/` |
| ✨ **60s Recruiter Brief** | One-click modal with copyable recruiter packet, resume download, LinkedIn, GitHub links |
| 📅 **BS Calendar Engine** | Custom Bikram Sambat ↔ Gregorian conversion — hand-verified tables, no external library |
| ✉️ **Web3Forms Contact** | Sends directly to inbox — no backend, no email client popup required |
| 📊 **GitHub Pulse** | Deterministic contribution heatmap showing engineering velocity |
| 🎨 **Design Token System** | `@theme` CSS variables in Tailwind v4 — brass accent, dark palette, serif display font |
| 📱 **Fully Responsive** | Mobile-first, tested 320px → 1440px. Mobile pane switcher for code playground |
| 🚀 **Shared Hosting Ready** | Legacy plugin generates `nomodule` bundles — works on InfinityFree, cPanel |

---

## ✦ Tech Stack

```
Frontend    React 19 + TypeScript 5.7 (strict)
Routing     TanStack Router (file-based, type-safe)
Styling     Tailwind CSS v4 (native Vite plugin, @theme tokens)
Build       Vite 8 (rolldown bundler, sub-second HMR)
Fonts       Fraunces (display) · Outfit (sans) · JetBrains Mono (mono)
Contact     Web3Forms (zero backend)
Hosting     Static SPA → InfinityFree / cPanel / Vercel / Netlify
```

---

## ✦ Project Structure

```
portfolio/
├── public/                        # Static assets
│   ├── pic/                       # Avatar photo
│   ├── projects/                  # Project screenshots
│   ├── resume/                    # ATS resume PDF
│   ├── certificate/               # Credentials
│   └── favicon.svg
│
├── src/
│   ├── components/
│   │   └── sections/              # All portfolio components
│   │       ├── portfolio.tsx      # Main page (all sections wired together)
│   │       ├── code-playground.tsx # 3D monitor + live code output
│   │       ├── terminal-modal.tsx  # Interactive CLI
│   │       ├── recruiter-modal.tsx # 60-second recruiter brief
│   │       ├── project-modal.tsx   # Project deep-dive modal
│   │       ├── github-pulse.tsx    # Git activity heatmap
│   │       ├── namo-patro-widget.tsx  # BS calendar demo
│   │       ├── jobhunt-agent-widget.tsx # AI matcher demo
│   │       ├── signal-canvas.tsx   # Three.js 3D scene (unused, kept)
│   │       └── audio-feedback.ts  # Web Audio API tactile sounds
│   │
│   ├── data/
│   │   ├── profile.ts             # ← Edit this to update all content
│   │   └── notes.ts               # ← Edit this for blog entries
│   │
│   ├── utils/
│   │   ├── calendar/
│   │   │   └── bs-converter.ts    # Bikram Sambat engine
│   │   └── error-component.tsx    # Route error boundary
│   │
│   ├── routes/
│   │   ├── __root.tsx             # Root layout (Outlet)
│   │   └── index.tsx              # Home route "/"
│   │
│   ├── main.tsx                   # App entry point
│   ├── router.tsx                 # TanStack Router setup
│   ├── routeTree.gen.ts           # Auto-generated by TanStack Router
│   └── styles.css                 # Design tokens + global styles
│
├── index.html                     # Vite HTML entry
├── vite.config.ts                 # Build config
├── tsconfig.json                  # TypeScript config
├── package.json
├── LICENSE                        # Proprietary — all rights reserved
└── README.md
```

---

## ✦ Getting Started

```bash
# Clone
git clone https://github.com/sc8134/Enhanced-Portfolio.git
cd Enhanced-Portfolio

# Install dependencies
npm install

# Start dev server → http://localhost:8080
npm run dev

# Type check
npm run typecheck

# Production build → dist/
npm run build

# Preview production build
npm run preview
```

---

## ✦ Deploying to Shared Hosting

```bash
npm run build
# Zip contents of dist/ and upload to htdocs/ via File Manager
# Extract in place
```

Add `.htaccess` in `htdocs/` for client-side routing:

```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [L]
```

Works on **InfinityFree**, **cPanel**, and any static host.

---

## ✦ Customising

Two files control all content:

**`src/data/profile.ts`** — name, bio, tagline, projects, skills, career path, socials, terminal Q&A replies

**`src/data/notes.ts`** — blog entries / field notes

Edit those and every section of the site updates automatically.

---

## ✦ Design Tokens

```css
/* Colors */
--color-bg:        #07090d   /* Page background        */
--color-surface:   #0f131a   /* Card background         */
--color-brass:     #d4a054   /* Primary accent (gold)   */
--color-fg:        #f5f2eb   /* Primary text            */
--color-muted:     #9fa7b3   /* Secondary text          */
--color-line:      #1c232e   /* Borders                 */
--color-paper:     #f4efe6   /* Light section bg        */

/* Typography */
--font-display:    "Fraunces"      /* Headings, pull quotes  */
--font-sans:       "Outfit"        /* Body, UI labels        */
--font-mono:       "JetBrains Mono" /* Code, terminal         */
```

---

## ✦ License

<div align="center">

```
⚠  PROPRIETARY — ALL RIGHTS RESERVED

This software may NOT be used, copied, modified, distributed,
or built upon without explicit written permission from:

Sagar Roka Chhetri · sc81341@gmail.com

Copyright © 2026 Sagar Roka Chhetri
```

</div>

See [LICENSE](./LICENSE) for full terms.

---

## ✦ Author

<div align="center">

<svg width="520" height="88" viewBox="0 0 520 88" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="abg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f131a"/>
      <stop offset="100%" style="stop-color:#161c24"/>
    </linearGradient>
    <linearGradient id="br2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#d4a054"/>
      <stop offset="100%" style="stop-color:#f5c378"/>
    </linearGradient>
  </defs>
  <rect width="520" height="88" rx="12" fill="url(#abg)" stroke="#1c232e" stroke-width="1"/>
  <rect x="0" y="0" width="520" height="3" rx="1" fill="url(#br2)"/>
  <circle cx="52" cy="44" r="30" fill="#d4a05415" stroke="#d4a05430" stroke-width="1"/>
  <text x="52" y="51" font-family="monospace" font-size="24" text-anchor="middle">⚡</text>
  <text x="98" y="28" font-family="'Courier New',monospace" font-size="15" font-weight="bold" fill="#f5f2eb">Sagar Roka Chhetri</text>
  <text x="98" y="46" font-family="'Courier New',monospace" font-size="10" fill="#d4a054">Full Stack Engineer · Kathmandu, Nepal (UTC+5:45)</text>
  <text x="98" y="63" font-family="'Courier New',monospace" font-size="9" fill="#4a5568">github.com/sc8134  ·  linkedin.com/in/sagar-rc</text>
  <text x="98" y="76" font-family="'Courier New',monospace" font-size="9" fill="#4a5568">sc81341@gmail.com</text>
  <circle cx="490" cy="18" r="5" fill="#10b981">
    <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite"/>
  </circle>
</svg>

<br/>

[![GitHub](https://img.shields.io/badge/GitHub-sc8134-d4a054?style=flat-square&logo=github&logoColor=white&labelColor=0f131a)](https://github.com/sc8134)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-sagar--rc-3b82f6?style=flat-square&logo=linkedin&logoColor=white&labelColor=0f131a)](https://www.linkedin.com/in/sagar-rc)
[![Email](https://img.shields.io/badge/Email-sc81341@gmail.com-10b981?style=flat-square&logo=gmail&logoColor=white&labelColor=0f131a)](mailto:sc81341@gmail.com)

<br/>
<sub>Built from scratch · Every line written, tested, and deployed by Sagar RC</sub>

</div>

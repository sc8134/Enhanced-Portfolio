<div align="center">

<svg width="820" height="130" viewBox="0 0 820 130" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#07090d"/>
      <stop offset="100%" style="stop-color:#0f131a"/>
    </linearGradient>
    <linearGradient id="brass" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#b87a30"/>
      <stop offset="35%" style="stop-color:#d4a054"/>
      <stop offset="65%" style="stop-color:#f5c96a"/>
      <stop offset="100%" style="stop-color:#d4a054"/>
    </linearGradient>
    <linearGradient id="muted" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#2d3848"/>
      <stop offset="100%" style="stop-color:#1c232e"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="softglow">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- background -->
  <rect width="820" height="130" rx="14" fill="url(#bg)"/>

  <!-- top + bottom brass rule -->
  <rect x="0" y="0"   width="820" height="1.5" rx="1" fill="url(#brass)" opacity="0.5"/>
  <rect x="0" y="128" width="820" height="1.5" rx="1" fill="url(#brass)" opacity="0.5"/>

  <!-- subtle side columns -->
  <rect x="0"   y="0" width="1.5" height="130" rx="1" fill="url(#brass)" opacity="0.15"/>
  <rect x="818" y="0" width="1.5" height="130" rx="1" fill="url(#brass)" opacity="0.15"/>

  <!-- animated scan line -->
  <rect x="14" y="0" width="792" height="1" rx="0.5" fill="url(#brass)" opacity="0.18">
    <animateTransform attributeName="transform" type="translate" from="0,0" to="0,130" dur="4s" repeatCount="indefinite"/>
  </rect>

  <!-- corner dots -->
  <circle cx="22"  cy="22"  r="3.5" fill="#d4a054" opacity="0.7"><animate attributeName="opacity" values="0.7;0.2;0.7" dur="2.2s" repeatCount="indefinite"/></circle>
  <circle cx="798" cy="22"  r="3.5" fill="#d4a054" opacity="0.7"><animate attributeName="opacity" values="0.2;0.7;0.2" dur="2.2s" repeatCount="indefinite"/></circle>
  <circle cx="22"  cy="108" r="3.5" fill="#d4a054" opacity="0.7"><animate attributeName="opacity" values="0.7;0.2;0.7" dur="2.8s" repeatCount="indefinite"/></circle>
  <circle cx="798" cy="108" r="3.5" fill="#d4a054" opacity="0.7"><animate attributeName="opacity" values="0.2;0.7;0.2" dur="2.8s" repeatCount="indefinite"/></circle>

  <!-- monogram -->
  <text x="60" y="72" font-family="monospace" font-size="26" font-weight="900" fill="url(#brass)" opacity="0.12" filter="url(#softglow)">SRC</text>

  <!-- title -->
  <text x="410" y="52" font-family="'Space Grotesk',monospace" font-size="27" font-weight="700" fill="url(#brass)" text-anchor="middle" filter="url(#glow)" letter-spacing="3">SAGAR RC · PORTFOLIO</text>

  <!-- subtitle -->
  <text x="410" y="78" font-family="monospace" font-size="12.5" fill="#9fa7b3" text-anchor="middle" letter-spacing="0.5">Full-Stack Engineer · Python &amp; Automation · Kathmandu, Nepal</text>

  <!-- stack line -->
  <rect x="155" y="90" width="510" height="1" rx="0.5" fill="url(#muted)" opacity="0.6"/>
  <text x="410" y="106" font-family="monospace" font-size="9.5" fill="#4a5568" text-anchor="middle" letter-spacing="0.3">React 19 · TypeScript 5.7 · Python · Node.js · Flask · PostgreSQL · Tailwind v4 · Vite 8</text>
</svg>

<br/>

![Status](https://img.shields.io/badge/status-live-brightgreen?style=for-the-badge&labelColor=0f131a&color=10b981)
![License](https://img.shields.io/badge/license-Proprietary-d4a054?style=for-the-badge&labelColor=0f131a)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3b82f6?style=for-the-badge&labelColor=0f131a&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&labelColor=0f131a&logo=react&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.12-3776ab?style=for-the-badge&labelColor=0f131a&logo=python&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646cff?style=for-the-badge&labelColor=0f131a&logo=vite&logoColor=white)

</div>

---

<div align="center">

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   "Full-stack engineer who builds complete products —           │
│    from frontend to backend to deployment.                      │
│    Strong in Python and automation, comfortable across          │
│    modern web technologies."                                    │
│                                                                 │
│                                    — Sagar Roka Chhetri         │
└─────────────────────────────────────────────────────────────────┘
```

</div>

---

## ✦ Overview

Personal portfolio for **Sagar Roka Chhetri** — Full-Stack Engineer focused on Python & Automation. Built entirely from scratch: no templates, no starter kits. Every architectural decision was intentional.

> **All rights reserved. This code may not be used, copied, or adapted without explicit written permission. See [LICENSE](./LICENSE).**

**Live:** [sagarrc.com.np](https://sagarrc.com.np)

---

## ✦ What's Inside

### Hero — Floating MacBook Pro Mockup

The hero right column renders a fully animated Space Gray MacBook Pro in CSS 3D:

- `perspective` + `rotateX` + `rotateY` — real open-laptop geometry (lid tilts back, base stays flat)
- **Floating animation** — 16px sine float every 3.8s, ground shadow shrinks in sync
- **Screen reflection sweep** — subtle gloss pass across the screen on a 6s cycle
- **Notch** with camera dot, deep black bezel
- **Activity bar · sidebar file tree · tab bar · minimap · status bar** — full VS Code layout

#### Typing animation

Characters appear one-by-one with natural speed variation (8–28ms per char). At ~60% through each line, a random typo is injected and backspaced. The matching keyboard key flashes brass.

#### Projects cycling

| # | Project | Stack | Preview |
|:--|:--------|:------|:--------|
| 01 | JobHunt Agent | Python · LangGraph · spaCy | CLI + cover letter UI |
| 02 | AI Reel Generator | Python · FFmpeg · OpenAI | Render progress bar |
| 03 | Signal Job Portal | TypeScript · Node.js · PostgreSQL | Job search UI |
| 04 | Janakpur Bolts Army | React · Node.js · cPanel | Cricket fanpage |

---

### Interactive Terminal CLI (`⌘K` or `/`)

Full SSH-style terminal modal with production-realistic output:

```
whoami     experience   skills     neofetch
projects   education    contact    resume
why-hired  remote       help       clear
```

`neofetch` renders a two-column system info panel (Arch Linux, kernel, Hyprland WM, RAM, GPU, colour blocks).

---

### Skills — Proof Matrix

Grouped by category, each skill shows level (`Production` / `Working` / `Exploring`) and which shipped project proves it.

**Order:** AI & Automation → Backend → Frontend → Databases → DevOps

---

### Career Timeline

```
● Full-Stack Engineer       CodeRunners Technologies   Jul 2025 – Present
● Full-Stack Dev Intern     CodeAlpha                  Aug–Sep 2026
● Independent Builder       Self-directed              2023–2025
○ B.C.E. Computer Eng.     Cosmos / Pokhara University 2022–2026
○ +2 Science (Physics)      Milestone International     2019–2021
```

---

## ✦ Tech Stack

| Layer | Technology |
|:------|:-----------|
| UI Framework | React 19 |
| Language | TypeScript 5.7 strict |
| Styling | Tailwind CSS v4 (`@theme` design tokens) |
| Build | Vite 8 + rolldown bundler |
| Legacy support | `@vitejs/plugin-legacy` (shared hosting) |
| Fonts | Space Grotesk · Fraunces · Outfit · JetBrains Mono |
| Contact | Web3Forms (no backend needed) |
| Icons | Inline SVG brand icons (zero dep) |
| Audio | Web Audio API (tactile click / chime) |
| Deploy | InfinityFree · cPanel · Vercel · GitHub Pages |

---

## ✦ Project Structure

```
Enhanced-Portfolio/
├── public/
│   ├── pic/                        # Avatar (me.webp)
│   ├── projects/                   # Project screenshots (.webp)
│   ├── resume/                     # ATS resume PDF
│   └── certificate/                # CodeAlpha cert + LOR
├── src/
│   ├── components/sections/
│   │   ├── portfolio.tsx           # Full page — all sections
│   │   ├── hero-terminal.tsx       # MacBook 3D mockup + typing animation
│   │   ├── terminal-modal.tsx      # Interactive CLI modal (⌘K)
│   │   ├── recruiter-modal.tsx     # 60s recruiter brief
│   │   ├── project-modal.tsx       # Case study deep-dive
│   │   ├── github-pulse.tsx        # Live GitHub activity
│   │   ├── tech-icons.tsx          # SVG brand icons + TechPill
│   │   └── audio-feedback.ts       # Web Audio click / chime
│   ├── data/
│   │   └── profile.ts              # ← single source of truth for all content
│   └── utils/
│       ├── amp.tsx
│       ├── github.ts
│       └── calendar/bs-converter.ts
├── dist/                           # Production build output
├── infinityfree-deploy.zip         # Upload-ready zip for InfinityFree
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## ✦ Getting Started

```bash
# Clone
git clone https://github.com/sc8134/Enhanced-Portfolio.git
cd Enhanced-Portfolio

# Install
npm install

# Dev server → http://localhost:8080
npm run dev

# Production build → dist/
npm run build

# Type check only
npx tsc --noEmit
```

---

## ✦ Deploying to InfinityFree / cPanel

```bash
npm run build
# Upload dist/ contents → extract into htdocs/
```

A `.htaccess` is bundled in `dist/` for SPA routing:

```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [QSA,L]
```

Or use the pre-built `infinityfree-deploy.zip` — upload directly and extract into `htdocs/`.

---

## ✦ Editing Content

Everything lives in **`src/data/profile.ts`**:

| Key | What it controls |
|:----|:-----------------|
| `profile.heroBio` | Hero paragraph |
| `profile.roles[]` | Rotating taglines |
| `profile.stats[]` | Metrics counter row |
| `projects[]` | All project cards + case studies |
| `skillGroups[]` | Skills + proof matrix |
| `path[]` | Career timeline |
| `replies[]` | Terminal CLI Q&A answers |

Edit, rebuild (`npm run build`), and the whole site reflects the change.

---

## ✦ Design System

**Palette**

| Token | Hex | Usage |
|:------|:----|:------|
| `bg` | `#07090d` | Page background |
| `surface` | `#0f131a` | Card / panel backgrounds |
| `surface-2` | `#161c24` | Elevated surfaces |
| `brass` | `#d4a054` | Primary accent (gold) |
| `fg` | `#f5f2eb` | Primary text |
| `muted` | `#9fa7b3` | Secondary text |
| `paper` | `#f4efe6` | Warm light-section bg |
| `line` | `#1c232e` | Borders |
| `line-bright` | `#2d3848` | Highlighted borders |

**Fonts**

| Font | Role |
|:-----|:-----|
| `Space Grotesk` | UI labels, nav, badges — geometric, technical feel |
| `Fraunces` | Display headings — optical-size serif with character |
| `Outfit` | Body text — clean, readable |
| `JetBrains Mono` | Code, terminal, monospace elements |

---

## ✦ License

> **PROPRIETARY — ALL RIGHTS RESERVED**
>
> This software may not be used, copied, modified, or distributed without explicit written permission from Sagar Roka Chhetri.
>
> Contact: sc81341@gmail.com · © 2026 Sagar Roka Chhetri

---

## ✦ Author

**Sagar Roka Chhetri** — Full-Stack Engineer · Python & Automation · Kathmandu, Nepal (UTC+5:45)

[![GitHub](https://img.shields.io/badge/GitHub-sc8134-d4a054?style=for-the-badge&labelColor=0f131a&logo=github&logoColor=white)](https://github.com/sc8134)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-sagar--rc-3b82f6?style=for-the-badge&labelColor=0f131a&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sagar-rc)
[![Email](https://img.shields.io/badge/Email-sc81341@gmail.com-10b981?style=for-the-badge&labelColor=0f131a&logo=gmail&logoColor=white)](mailto:sc81341@gmail.com)

---

<div align="center">
<sub>Built from scratch · every line written, tested, and deployed by Sagar RC</sub>
</div>

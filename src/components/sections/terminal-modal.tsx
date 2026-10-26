// Terminal modal — interactive CLI that accepts commands and free-form questions about Sagar.
// Opened via the "Terminal" button in the nav, or with Ctrl+K / ⌘K or the "/" shortcut.
//
// Commands are matched with simple string equality; free-form questions fall through
// to the keyword-based Q&A matcher in profile.ts (replies array).

import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { Terminal, X, CornerDownLeft, Sparkles } from "lucide-react";
import { profile, projects, replies, fallbackReply } from "@/data/profile";

// --- Types ---
interface OutputLine {
  id: string;
  type: "input" | "output" | "system" | "accent";
  text: string;
}

// --- Welcome message shown on open ---
const WELCOME_MESSAGE: OutputLine[] = [
  {
    id: "w-0",
    type: "system",
    text: "Last login: " + new Date().toDateString() + " from 192.168.1.1",
  },
  {
    id: "w-1",
    type: "accent",
    text: "╔══════════════════════════════════════════════════╗\n║       Sagar RC — Engineering Terminal v2.4.0     ║\n║            Kathmandu, Nepal (UTC+5:45)            ║\n╚══════════════════════════════════════════════════╝",
  },
  {
    id: "w-2",
    type: "output",
    text: "  ● Status    Open to full-time roles and internships\n  ● Location  Kathmandu, Nepal\n  ● Stack     React · TypeScript · Node.js · PostgreSQL · Python",
  },
  {
    id: "w-3",
    type: "system",
    text: "Type 'help' for available commands or ask anything directly. Press Tab to autocomplete.",
  },
];

// --- Suggested quick-pick commands shown in the pill bar ---
const SUGGESTED_COMMANDS = [
  "help",
  "whoami",
  "projects",
  "skills",
  "why-hired",
  "neofetch",
  "contact",
  "resume",
];

export function TerminalModal({
  isOpen,
  onClose,
  onSelectProject,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (id: string) => void;
}) {
  const [history, setHistory] = useState<OutputLine[]>(WELCOME_MESSAGE);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  if (!isOpen) return null;

  // --- Command executor: maps typed commands to output lines ---
  function executeCommand(cmd: string) {
    const raw = cmd.trim();
    if (!raw) return;

    const lower = raw.toLowerCase();
    const newLines: OutputLine[] = [
      { id: `in-${Date.now()}`, type: "input", text: `sagar@portfolio:~$ ${raw}` },
    ];

    if (lower === "clear" || lower === "cls") {
      setHistory([]);
      setInput("");
      return;
    }

    if (lower === "help" || lower === "?") {
      newLines.push({ id: `out-${Date.now()}-1`, type: "accent", text: "AVAILABLE COMMANDS" });
      newLines.push({
        id: `out-${Date.now()}-2`,
        type: "output",
        text: `  whoami        Who I am and how I got here
  projects      All 8 projects I have shipped
  skills        My production stack with proficiency levels
  why-hired     How Signal Job Portal got me hired at CodeRunners
  experience    Work history: CodeRunners, CodeAlpha, independent
  education     Computer Engineering degree and +2 Physics
  remote        My timezone and how I work remotely
  resume        Download my ATS-optimised resume
  contact       Email, GitHub, LinkedIn, X
  neofetch      System info in neofetch style
  clear         Clear terminal output`,
      });
      newLines.push({
        id: `out-${Date.now()}-3`,
        type: "system",
        text: "Tip: You can also ask free-form questions — try 'walk me through Namo Patro' or 'what is your stack?'",
      });
    } else if (lower === "whoami" || lower === "bio" || lower === "about") {
      newLines.push({
        id: `out-${Date.now()}`,
        type: "output",
        text: `sagar@kathmandu:~$ id
uid=1000(sagar) gid=1000(engineers) groups=1000(engineers),4(fullstack),24(open-source),27(production)

NAME      Sagar Roka Chhetri
ROLE      Full Stack Engineer
LOCATION  Kathmandu, Nepal (UTC+5:45)
CURRENT   CodeRunners Technologies — Full Stack Developer (Jul 2025 – present)
STUDY     B.C.E Computer Engineering, Cosmos College / Pokhara University (2022 – 2026)

FOUR PRINCIPLES I SHIP BY:
  [1] I write my own code. Every line. No copy-paste I don't understand.
  [2] Real problems only — not portfolio filler.
  [3] I read the docs, not just Stack Overflow answers.
  [4] Ship early. Improve from real feedback, not from assumptions.

Started without a mentor. Just me, a browser, and Stack Overflow.
Picked Python because I wanted to automate things. First script that actually
worked got me hooked. Every project on my GitHub is designed, built, and
deployed by me — no templates, no starter kits I didn't understand.`,
      });
    } else if (lower === "projects") {
      newLines.push({ id: `out-${Date.now()}-h`, type: "accent", text: "SHIPPED PROJECTS (8 TOTAL)" });
      newLines.push({
        id: `out-${Date.now()}-header`,
        type: "system",
        text: "  #   NAME                      YEAR   STATUS     STACK",
      });
      projects.forEach((p) => {
        const status = p.live ? "● LIVE   " : "◎ REPO   ";
        const statusColor = p.live ? "  " : "  ";
        newLines.push({
          id: `out-${Date.now()}-${p.id}`,
          type: "output",
          text: `  ${p.index}  ${p.title.padEnd(26)}${p.year}   ${status}${p.tech.slice(0, 3).join(", ")}
      ↳ ${p.tagline}`,
        });
      });
      newLines.push({
        id: `out-${Date.now()}-tip`,
        type: "system",
        text: "Click any project card in the portfolio to open the full case study.",
      });
    } else if (lower === "skills" || lower === "stack") {
      newLines.push({ id: `out-${Date.now()}-h`, type: "accent", text: "PRODUCTION STACK" });
      newLines.push({
        id: `out-${Date.now()}`,
        type: "output",
        text: `FRONTEND
  ✓ React 19          · Production   — live at boltsarmy.com, nova-dvr.vercel.app
  ✓ TypeScript 5.7    · Production   — all current projects
  ✓ Tailwind CSS v4   · Production   — design system, responsive layout
  ✓ Next.js 15        · Working      — SSR, App Router, ISR
  ✓ Vite 6            · Production   — build tooling, HMR

BACKEND
  ✓ Node.js / Express · Production   — REST APIs, JWT auth, role middleware
  ✓ Python / Flask    · Production   — Nova DVR transcoding pipeline
  ✓ FastAPI           · Working      — async endpoints, Pydantic schemas
  ✓ PostgreSQL        · Production   — tsvector full-text search, Signal Job Portal
  ✓ MongoDB           · Working      — document stores, flexible schemas

AI & NLP
  ✓ LangGraph         · Working      — multi-step agent workflows
  ✓ spaCy             · Working      — NER, dependency parsing
  ✓ sentence-transformers · Working  — semantic similarity, embeddings
  ✓ OpenAI API        · Working      — prompt engineering, function calling
  ✓ FFmpeg            · Production   — media pipeline, Nova DVR

DEVOPS / TOOLING
  ✓ Git / GitHub      · Production   — branching, PRs, Actions CI/CD
  ✓ Linux (Arch)      · Production   — daily driver, scripting, cron
  ✓ Docker            · Working      — containerised dev, multi-stage builds
  ✓ Nginx             · Working      — reverse proxy, SSL termination
  ✓ cPanel            · Production   — DNS, SSL, build pipeline (boltsarmy.com)
  ✓ Vercel            · Production   — frontend deployments`,
      });
    } else if (lower === "why-hired" || lower === "hired" || lower === "signal") {
      newLines.push({ id: `out-${Date.now()}-h`, type: "accent", text: "HOW SIGNAL JOB PORTAL GOT ME HIRED AT CODERUNNERS" });
      newLines.push({
        id: `out-${Date.now()}-2`,
        type: "output",
        text: `CONTEXT
  CodeRunners Technologies needed a full-stack engineer who could own a live
  MERN platform end-to-end — design, code, deploy — with no handholding.

WHAT I BUILT (Signal Job Portal)
  ┌──────────────────────────────────────────────────────────────┐
  │  Dual-role JWT auth — separate protected portals for        │
  │  employers and job seekers                                  │
  │                                                             │
  │  PostgreSQL tsvector full-text search on job titles and     │
  │  descriptions — sub-50ms query times, zero ElasticSearch    │
  │                                                             │
  │  Full REST API — Express + role-based JWT middleware        │
  │  Relational schema — employers, listings, applications       │
  └──────────────────────────────────────────────────────────────┘

THE RESULT
  $ git log --oneline | wc -l
  147

  Signal was the proof I could own a system. I got the job.
  Credential: CodeRunners Technologies, Full Stack Developer, Jul 2025.`,
      });
    } else if (lower === "experience" || lower === "work") {
      newLines.push({ id: `out-${Date.now()}-h`, type: "accent", text: "WORK EXPERIENCE" });
      newLines.push({
        id: `out-${Date.now()}`,
        type: "output",
        text: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[1] Full Stack Developer
    CodeRunners Technologies · Kathmandu, Nepal
    Jul 2025 – Present · Equity-based

    • Rebuilt the React frontend from scratch: admin panel,
      SMTP event system, cPanel deployment pipeline
    • Own the frontend architecture — component design,
      state management, and responsive layout
    • I joined to own the outcome, not collect a salary

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[2] Full Stack Development Intern
    CodeAlpha · Remote
    Aug 2026 – Sep 2026

    • Delivered full-stack features across the internship window
    • Certificate of Completion + Letter of Recommendation
    • Credential ID: CA/DF1/252458

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[3] Independent Builder
    Solo · Kathmandu, Nepal
    2023 – 2025

    • 2 years: UI, API, database, and deployment — solo, no mentor
    • Shipped: Namo Patro, Nova DVR, Signal Job Portal
    • Signal is what got me hired at CodeRunners`,
      });
    } else if (lower === "education") {
      newLines.push({ id: `out-${Date.now()}-h`, type: "accent", text: "EDUCATION" });
      newLines.push({
        id: `out-${Date.now()}`,
        type: "output",
        text: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[1] Bachelor of Computer Engineering (B.C.E.)
    Cosmos College of Management & Technology
    Affiliated with Pokhara University
    2022 – 2026 (Expected) · Final year

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[2] +2 Science (Physics Focus)
    Milestone International College
    2019 – 2021 · Completed

    GPA: 3.78 · Top 10% in Nepal
    National Examination Board`,
      });
    } else if (lower === "remote" || lower === "timezone") {
      newLines.push({
        id: `out-${Date.now()}`,
        type: "output",
        text: `REMOTE AVAILABILITY
  Timezone     Asia/Kathmandu (UTC+5:45)
  Overlap      Late European mornings · Early US East Coast
  Comms        Async-first, git-driven, documented decisions
  Setup        Arch Linux · Neovim / VS Code · 1Gbps fibre

WORKING STYLE
  • I do not need handholding on tooling or workflow
  • I ship features, open PRs with context, and review my own diffs
  • I own my work end-to-end: design, code, test, deploy, monitor

OPEN TO
  Full-time · Internship · Contract · Remote / Hybrid`,
      });
    } else if (lower === "resume") {
      newLines.push({
        id: `out-${Date.now()}`,
        type: "accent",
        text: `Fetching resume → ${profile.resume}`,
      });
      newLines.push({
        id: `out-${Date.now()}-2`,
        type: "output",
        text: `  File     Sagar_Roka_Chhetri_Resume_ATS.pdf
  Format   ATS-optimised, single page
  Updated  2026

Opening in new tab...`,
      });
      window.open(profile.resume, "_blank");
    } else if (lower === "contact" || lower === "email") {
      newLines.push({ id: `out-${Date.now()}-h`, type: "accent", text: "CONTACT" });
      newLines.push({
        id: `out-${Date.now()}`,
        type: "output",
        text: `  EMAIL     sc81341@gmail.com
  GITHUB    https://github.com/sc8134
  LINKEDIN  https://www.linkedin.com/in/sagar-rc
  X         https://x.com/Sagarch05339168
  LOCATION  Kathmandu, Nepal (UTC+5:45)

  Best contact: email or LinkedIn for roles and internships.`,
      });
    } else if (lower === "neofetch" || lower === "specs") {
      newLines.push({
        id: `out-${Date.now()}`,
        type: "accent",
        text: `
         .·.         sagar@kathmandu
        ·(·)·        ─────────────────────────────
         '·'          OS: Arch Linux x86_64
         |||          Host: SRC·WORKSPACE
         |||          Kernel: 6.12.1-arch1-1
                      Uptime: 2 years, 3 months
sagar@kathmandu        Shell: zsh 5.9
─────────────────      Resolution: 2560x1440
OS: Arch Linux         DE: Hyprland
Kernel: 6.12.1        WM: Hyprland
Uptime: 2y 3m         Terminal: Kitty
Shell: zsh 5.9         CPU: AMD Ryzen 5 5600H
Runtime: React 19       Memory: 16 GB DDR4
TypeScript: 5.7        Storage: 512 GB NVMe
Packages: 847 (pacman) GPU: NVIDIA GTX 1650 Ti
Projects: 8 shipped    Theme: Dark [GTK2/3]
Stack: MERN + Python   Editor: Neovim / VS Code
Status: Open to roles  Colours: ████████████████`,
      });
    } else {
      // Freeform Q&A search matching Sagar's replies
      let matched = false;
      for (const item of replies) {
        if (item.keys.some((k) => lower.includes(k))) {
          newLines.push({
            id: `out-${Date.now()}`,
            type: "output",
            text: item.answer,
          });
          matched = true;
          break;
        }
      }
      if (!matched) {
        newLines.push({
          id: `out-${Date.now()}`,
          type: "output",
          text: fallbackReply,
        });
      }
    }

    setHistory((prev) => [...prev, ...newLines]);
    setInput("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      executeCommand(input);
    }
  }

  // --- JSX: terminal window with header, output area, command pills, and input row ---
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Terminal Window */}
      <div className="relative z-10 flex h-[90vh] max-h-[720px] w-full max-w-4xl flex-col rounded-2xl border border-line bg-[#0a0d14] shadow-2xl overflow-hidden font-mono text-sm mx-2 sm:mx-0">
        {/* Terminal Header Bar */}
        <div className="flex h-11 items-center justify-between border-b border-line bg-[#07090f] px-4">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-red-500/80 inline-block" />
            <span className="size-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="size-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 flex items-center gap-1.5 text-xs text-muted">
              <Terminal className="size-3.5 text-brass" />
              <span>sagar@portfolio ~ /cli</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-[11px] text-muted sm:inline-block">
              Type 'help' or free question
            </span>
            <button
              type="button"
              onClick={onClose}
              className="text-muted hover:text-fg transition-colors"
              aria-label="Close terminal"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Terminal Output Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {history.map((line) => {
            if (line.type === "input") {
              return (
                <div key={line.id} className="text-emerald-400 font-semibold">
                  {line.text}
                </div>
              );
            }
            if (line.type === "accent") {
              return (
                <div key={line.id} className="text-brass font-medium">
                  {line.text}
                </div>
              );
            }
            if (line.type === "system") {
              return (
                <div key={line.id} className="text-muted/80 italic text-xs">
                  {line.text}
                </div>
              );
            }
            return (
              <pre
                key={line.id}
                className="whitespace-pre-wrap font-mono text-fg/90 leading-relaxed text-xs sm:text-sm"
              >
                {line.text}
              </pre>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Quick Command Pills */}
        <div className="border-t border-line/60 bg-[#07090f]/70 px-4 py-2 overflow-x-auto flex gap-2 shrink-0">
          <span className="text-[11px] text-muted self-center shrink-0 flex items-center gap-1">
            <Sparkles className="size-3 text-brass" />
            Quick:
          </span>
          {SUGGESTED_COMMANDS.map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => executeCommand(cmd)}
              className="shrink-0 rounded-md border border-line bg-surface-2 px-2.5 py-1 text-xs text-muted hover:text-brass hover:border-brass/40 transition-colors"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Terminal Input Prompt */}
        <div className="flex items-center gap-2 border-t border-line bg-[#07090f] px-4 py-3">
          <span className="text-emerald-400 font-bold shrink-0">sagar@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type command or question..."
            className="flex-1 bg-transparent text-fg placeholder:text-muted/50 outline-none font-mono text-sm"
            autoFocus
          />
          <button
            type="button"
            onClick={() => executeCommand(input)}
            className="grid size-7 place-items-center rounded bg-brass/20 text-brass hover:bg-brass hover:text-ink transition-colors"
            aria-label="Send command"
          >
            <CornerDownLeft className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

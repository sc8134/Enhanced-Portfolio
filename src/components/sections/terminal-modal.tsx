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
    id: "w-1",
    type: "accent",
    text: "Sagar RC — Engineering Terminal [v2.4.0]",
  },
  {
    id: "w-2",
    type: "system",
    text: "Type 'help' for commands or ask me anything directly.",
  },
  {
    id: "w-3",
    type: "output",
    text: "Status: Open to full-time roles and internships | Kathmandu (UTC+5:45)",
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
      newLines.push({ id: `out-${Date.now()}-1`, type: "accent", text: "COMMANDS:" });
      newLines.push({
        id: `out-${Date.now()}-2`,
        type: "output",
        text: `  whoami       - Who I am and how I got here
  projects     - All 8 projects I have shipped
  skills       - My production stack and tools
  why-hired    - How Signal Job Portal got me hired at CodeRunners
  experience   - Work history: CodeRunners, CodeAlpha, independent building
  education    - Computer Engineering degree and +2 Physics
  remote       - My timezone and how I work remotely
  resume       - Download my ATS resume
  contact      - Email, GitHub, LinkedIn
  neofetch     - Portfolio system info
  clear        - Clear the terminal`,
      });
      newLines.push({
        id: `out-${Date.now()}-3`,
        type: "system",
        text: "You can also ask free-form questions like 'Walk me through Namo Patro' or 'What is your stack?'",
      });
    } else if (lower === "whoami" || lower === "bio" || lower === "about") {
      newLines.push({
        id: `out-${Date.now()}`,
        type: "output",
        text: `Sagar Roka Chhetri. Full Stack Engineer from Kathmandu, Nepal.
Final-year Computer Engineering student at Cosmos College (Pokhara University).
Currently Full Stack Developer at CodeRunners Technologies.

I started without a mentor. Just me and Stack Overflow.
I write my own code. I test it, fix it, and deploy it.

Four things I stick to:
1. I write my own code. No templates I do not understand.
2. Real problems only. Not portfolio filler.
3. I read the docs. Not just Stack Overflow answers.
4. Ship early. Improve from real feedback.`,
      });
    } else if (lower === "projects") {
      newLines.push({ id: `out-${Date.now()}-h`, type: "accent", text: "PROJECTS I SHIPPED (8 TOTAL):" });
      projects.forEach((p, idx) => {
        newLines.push({
          id: `out-${Date.now()}-${idx}`,
          type: "output",
          text: `[${p.index}] ${p.title} (${p.year}) - ${p.flags.join(", ")}
    ${p.tagline}
    Stack: ${p.tech.join(" · ")}`,
        });
      });
      newLines.push({
        id: `out-${Date.now()}-tip`,
        type: "system",
        text: "Click any project in the portfolio to open the full case study.",
      });
    } else if (lower === "skills" || lower === "stack") {
      newLines.push({
        id: `out-${Date.now()}`,
        type: "output",
        text: `MY PRODUCTION STACK:
• Frontend: React 19, TypeScript, Tailwind CSS, Next.js, Vite
• Backend: Node.js, Express, Python, Flask, FastAPI, REST APIs
• Databases: PostgreSQL (tsvector full-text search), MongoDB, MySQL
• DevOps: Git, Linux, Docker, Nginx, cPanel, Vercel, GitHub Actions
• AI/NLP: LangGraph, spaCy, sentence-transformers, FFmpeg, OpenAI API`,
      });
    } else if (lower === "why-hired" || lower === "hired" || lower === "signal") {
      newLines.push({ id: `out-${Date.now()}`, type: "accent", text: "HOW SIGNAL GOT ME HIRED AT CODERUNNERS:" });
      newLines.push({
        id: `out-${Date.now()}-2`,
        type: "output",
        text: `I built Signal Job Portal solo to prove I could build a complete system end to end.
Dual-role JWT auth, PostgreSQL tsvector full-text search, separate dashboards for employers and job seekers.
When CodeRunners needed a full-stack engineer who could own a live MERN platform with no handholding,
Signal was the proof. I got the job.`,
      });
    } else if (lower === "experience" || lower === "work") {
      newLines.push({
        id: `out-${Date.now()}`,
        type: "output",
        text: `MY EXPERIENCE:
1. CodeRunners Technologies (Jul 2025 – Present) | Full Stack Developer
   • Rebuilt the React frontend from scratch: admin panel, SMTP events, cPanel deployment
   • Equity-based. I joined to own the outcome.

2. CodeAlpha (Aug 2026 – Sep 2026) | Full Stack Development Intern
   • Delivered full-stack features, earned Certificate of Completion and Letter of Recommendation
   • Credential ID: CA/DF1/252458

3. Independent Builder (2023 – 2025)
   • 2 years doing UI, API, database, and deployment solo with no mentor
   • Shipped Namo Patro, Nova DVR, and Signal. Signal is what got me hired.`,
      });
    } else if (lower === "education") {
      newLines.push({
        id: `out-${Date.now()}`,
        type: "output",
        text: `EDUCATION:
• B.C.E. Computer Engineering (2022 – 2026)
  Cosmos College of Management & Technology (Pokhara University)
  Final year, waiting to graduate.

• +2 Science, Physics (2019 – 2021)
  Milestone International College
  3.78 GPA, top 10% in Nepal.`,
      });
    } else if (lower === "remote" || lower === "timezone") {
      newLines.push({
        id: `out-${Date.now()}`,
        type: "output",
        text: `REMOTE SETUP:
• Location: Kathmandu, Nepal (UTC+5:45)
• Overlap: Late European mornings, early US East Coast
• Async-first, git-driven, no-handholding needed`,
      });
    } else if (lower === "resume") {
      newLines.push({ id: `out-${Date.now()}`, type: "accent", text: `Resume: ${profile.resume}` });
      window.open(profile.resume, "_blank");
    } else if (lower === "contact" || lower === "email") {
      newLines.push({
        id: `out-${Date.now()}`,
        type: "output",
        text: `CONTACT:
• Email: sc81341@gmail.com
• GitHub: https://github.com/sc8134
• LinkedIn: https://www.linkedin.com/in/sagar-rc
• X: https://x.com/Sagarch05339168`,
      });
    } else if (lower === "neofetch" || lower === "specs") {
      newLines.push({
        id: `out-${Date.now()}`,
        type: "accent",
        text: `         /\_/\          sagar@kathmandu
        ( o.o )         --------------------
         > ^ <          OS: Arch Linux x86_64
                        Location: Kathmandu, Nepal (UTC+5:45)
                        Runtime: React 19 + TypeScript 5.7
                        Uptime: 2+ years in production
                        Projects: 8 shipped (3 open source)
                        Shell: Vite + Tailwind CSS v4
                        Status: Open to full-time and internships
                        Editor: Neovim / VS Code`,
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

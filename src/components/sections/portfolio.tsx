import { Component, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Code2,
  Copy,
  Download,
  ExternalLink,
  Eye,
  FileText,
  Github,
  Layers,
  Linkedin,
  Loader2,
  Mail,
  Menu,
  MessageSquare,
  Sparkles,
  Terminal,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { notes, type Note, type NoteBlock } from "@/data/notes";
import {
  credentials,
  fallbackReply,
  path,
  profile,
  projects,
  replies,
  skillGroups,
  socials,
  suggested,
  type Project,
  type Skill,
} from "@/data/profile";
import { CodePlayground } from "./code-playground";
import { RecruiterModal } from "./recruiter-modal";
import { TerminalModal } from "./terminal-modal";
import { ProjectModal } from "./project-modal";
import { GithubPulse } from "./github-pulse";
import { getAudioMuted, initAudio, playChime, playClick, toggleAudioMute } from "./audio-feedback";

const NAV = [
  { id: "signal", label: "Overview" },
  { id: "origin", label: "Origin" },
  { id: "work", label: "The Builds" },
  { id: "craft", label: "Proof Matrix" },
  { id: "path", label: "Career & Study" },
  { id: "notes", label: "Field Notes" },
  { id: "hire", label: "Recruiter Hub" },
];

function formatNoteDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  const names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  if (!year || !month || !day) return iso;
  return `${day} ${names[month - 1]} ${year}`;
}

function replyFor(query: string) {
  const q = query.toLowerCase().trim();
  if (!q) return fallbackReply;
  let best: { len: number; answer: string } | null = null;
  for (const item of replies) {
    for (const key of item.keys) {
      if (q.includes(key) && (!best || key.length > best.len)) {
        best = { len: key.length, answer: item.answer };
      }
    }
  }
  return best?.answer ?? fallbackReply;
}

function XMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M14.7 10.4 21.8 2h-2.1l-6.1 7.1L8.3 2H2.2l7.5 10.9L2.2 22h2.1l6.6-7.6L15.6 22h6.1l-7-11.6Zm-2.3 2.7-.8-1.1L5.2 3.5h2.6l4.9 7 .8 1.1 6.3 9h-2.6l-5.2-7.5Z" />
    </svg>
  );
}

function Emblem() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-bg" aria-hidden="true">
      <div className="relative size-64">
        <span className="absolute inset-0 rounded-full border border-line" />
        <span className="absolute inset-8 rounded-full border-2 border-brass/60" />
        <span className="absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass shadow-lg shadow-brass/50" />
      </div>
    </div>
  );
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return <Emblem />;
    return this.props.children;
  }
}

function SignalFrame({
  activeProjectId: _activeProjectId,
  onSelectProject: _onSelectProject,
}: {
  activeProjectId: string;
  onSelectProject: (id: string) => void;
}) {
  return (
    <div className="relative h-[420px] sm:aspect-square sm:h-auto w-full overflow-hidden rounded-2xl border border-line bg-[#07090d] shadow-2xl">
      <CodePlayground />
    </div>
  );
}

function NoteBody({ blocks }: { blocks: NoteBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          return (
            <h3 key={index} className="pt-4 font-display text-2xl sm:text-3xl text-ink font-normal">
              {block.text}
            </h3>
          );
        }
        if (block.type === "quote") {
          return (
            <blockquote
              key={index}
              className="border-l-3 border-brass-ink pl-4 font-display text-xl sm:text-2xl text-ink italic my-4"
            >
              "{block.text}"
            </blockquote>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={index} className="space-y-2.5 text-ink-soft my-4">
              {block.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brass-ink" />
                  <span className="text-sm sm:text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={index} className="text-base sm:text-lg leading-relaxed text-ink-soft">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

export function Portfolio() {
  const [menu, setMenu] = useState(false);
  const [recruiterModalOpen, setRecruiterModalOpen] = useState(false);
  const [terminalModalOpen, setTerminalModalOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);
  const [active, setActive] = useState("signal");
  const [role, setRole] = useState(0);
  const [ready, setReady] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [projectId, setProjectId] = useState(projects[2]?.id ?? projects[0].id); // Signal Job Portal default
  const [filter, setFilter] = useState<"All" | "Live" | "From scratch" | "AI">("All");
  const [groupId, setGroupId] = useState(skillGroups[0].id);
  const [skillId, setSkillId] = useState(skillGroups[0].skills[0].id);
  const [note, setNote] = useState<Note | null>(null);
  const [copied, setCopied] = useState(false);
  const [clock, setClock] = useState("NPT");
  const [progress, setProgress] = useState(0);

  // Contact form states
  const [from, setFrom] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [contactSubjectPreset, setContactSubjectPreset] = useState("Full-time Engineering Role");
  const [sending, setSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<"idle" | "success" | "error">("idle");
  const [question, setQuestion] = useState(suggested[0]);

  // Ref for scrolling to project detail card on mobile when a project is selected
  const projectDetailRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setReady(true);
    initAudio();
    setIsMuted(getAudioMuted());

    const handleGlobalKey = (e: globalThis.KeyboardEvent) => {
      // Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        playChime();
        setTerminalModalOpen((prev) => !prev);
        return;
      }
      // Slash (/) when not focusing an input or textarea
      const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (e.key === "/" && targetTag !== "input" && targetTag !== "textarea") {
        e.preventDefault();
        playChime();
        setTerminalModalOpen(true);
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, []);

  function handleSoundToggle() {
    const nextMuted = toggleAudioMute();
    setIsMuted(nextMuted);
  }

  useEffect(() => {
    if (!ready) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const id = window.setInterval(() => {
      setRole((current) => (current + 1) % profile.roles.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [ready]);

  useEffect(() => {
    if (!ready) return;
    const tick = () => {
      setClock(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kathmandu",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hourCycle: "h23",
        }).format(new Date()),
      );
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [ready]);

  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? window.scrollY / height : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nodes = NAV.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
    const signal = document.getElementById("signal");
    const watch = signal ? [signal, ...nodes] : nodes;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.15, 0.4] },
    );
    watch.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!recruiterModalOpen && !terminalModalOpen && !selectedCaseStudy && !menu) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setRecruiterModalOpen(false);
        setTerminalModalOpen(false);
        setSelectedCaseStudy(null);
        setMenu(false);
      }
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [recruiterModalOpen, terminalModalOpen, selectedCaseStudy, menu]);

  const visibleProjects = useMemo(() => {
    if (filter === "Live") return projects.filter((item) => item.live);
    if (filter === "From scratch") return projects.filter((item) => item.flags.includes("From scratch"));
    if (filter === "AI") return projects.filter((item) => item.flags.includes("AI & ML"));
    return projects;
  }, [filter]);

  const activeProject = visibleProjects.find((item) => item.id === projectId) ?? visibleProjects[0] ?? projects[0];
  const group = skillGroups.find((item) => item.id === groupId) ?? skillGroups[0];
  const skill = group.skills.find((item) => item.id === skillId) ?? group.skills[0];
  const answer = replyFor(question);

  function chooseFilter(next: "All" | "Live" | "From scratch" | "AI") {
    playClick();
    setFilter(next);
    const list =
      next === "Live"
        ? projects.filter((item) => item.live)
        : next === "From scratch"
          ? projects.filter((item) => item.flags.includes("From scratch"))
          : next === "AI"
            ? projects.filter((item) => item.flags.includes("AI & ML"))
            : projects;
    if (!list.some((item) => item.id === projectId) && list[0]) setProjectId(list[0].id);
  }

  function chooseGroup(id: string) {
    playClick();
    const next = skillGroups.find((item) => item.id === id) ?? skillGroups[0];
    setGroupId(next.id);
    setSkillId(next.skills[0].id);
  }

  async function copyEmail() {
    playClick();
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  async function submitForm() {
    if (sending) return;
    setSending(true);
    setSendStatus("idle");
    playChime();

    const subject = `${contactSubjectPreset} — ${company || from || "from Portfolio"}`;
    const body = [
      `From: ${from || "[Your Name]"}`,
      company ? `Company/Team: ${company}` : "",
      "",
      message || "Hi Sagar, let's connect regarding a software engineering role / project.",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "2e3bcb3a-3736-411b-a862-1883194e2423",
          subject,
          from_name: from || "Portfolio Visitor",
          message: body,
          botcheck: "",
        }),
      });
      const data = (await res.json()) as { success: boolean };
      if (data.success) {
        setSendStatus("success");
        setFrom("");
        setCompany("");
        setMessage("");
      } else {
        setSendStatus("error");
      }
    } catch {
      setSendStatus("error");
    } finally {
      setSending(false);
    }
  }

  function openNote(next: Note) {
    playClick();
    setNote(next);
    window.setTimeout(() => {
      document.getElementById("reader")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
  }

  function handleOpenProject(p: Project) {
    playChime();
    setSelectedCaseStudy(p);
  }

  return (
    <div className="min-h-screen bg-bg text-fg selection:bg-brass selection:text-ink">
      {/* Top Reading Progress Bar */}
      <div
        className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-gradient-to-r from-brass via-amber-400 to-brass"
        style={{ transform: `scaleX(${progress})` }}
      />

      <a
        href="#origin"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-paper focus:px-3 focus:py-2 focus:text-ink rounded"
      >
        Skip to the story
      </a>

      {/* Global Navigation Header */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
          {/* Logo & Identity */}
          <a
            href="#signal"
            onClick={playClick}
            className="flex items-center gap-3 group"
          >
            <div className="relative size-9 overflow-hidden rounded-lg border border-brass/50 bg-surface shadow-md">
              <img
                src={profile.avatar}
                alt="Sagar RC"
                className="h-full w-full object-cover object-top"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
              <span className="grid size-full place-items-center bg-brass font-display text-sm font-bold text-ink">
                SRC
              </span>
            </div>
            <div className="leading-tight">
              <span className="block text-sm font-medium text-fg group-hover:text-brass transition-colors">
                Sagar RC
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-muted">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Kathmandu (UTC+5:45)
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main Sections">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={playClick}
                className={`rounded-full px-3 py-1.5 text-xs font-medium tracking-wide transition-colors ${
                  active === item.id
                    ? "bg-surface-2 text-brass border border-brass/30"
                    : "text-muted hover:text-fg hover:bg-surface/50"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              type="button"
              onClick={handleSoundToggle}
              title={isMuted ? "Enable tactile sounds" : "Mute sounds"}
              aria-label={isMuted ? "Enable sound" : "Mute sound"}
              className="grid size-9 place-items-center rounded-full border border-line text-muted hover:text-brass hover:border-brass/40 transition-colors"
            >
              {isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4 text-brass" />}
            </button>

            {/* Terminal CLI Button */}
            <button
              type="button"
              onClick={() => {
                playChime();
                setTerminalModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-mono text-muted hover:text-emerald-400 hover:border-emerald-500/50 transition-colors"
              title="Open Developer Terminal / Sara Assistant (⌘K or /)"
            >
              <Terminal className="size-3.5 text-emerald-400" />
              <span className="hidden sm:inline">CLI</span>
              <kbd className="hidden md:inline-block rounded border border-line bg-surface-2 px-1 text-[10px] text-muted font-sans font-medium">
                ⌘K
              </kbd>
            </button>

            {/* Recruiter 60s Brief Pill */}
            <button
              type="button"
              onClick={() => {
                playChime();
                setRecruiterModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 rounded-full bg-brass px-3.5 py-1.5 text-xs font-semibold text-ink hover:bg-brass-hover transition-transform duration-150 active:scale-95 shadow-md shadow-brass/20"
            >
              <Sparkles className="size-3.5" />
              <span>Recruiter Brief</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              type="button"
              className="grid size-9 place-items-center rounded-full border border-line text-muted hover:text-fg lg:hidden"
              aria-label={menu ? "Close menu" : "Open menu"}
              onClick={() => {
                playClick();
                setMenu((value) => !value);
              }}
            >
              {menu ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {menu ? (
        <div className="fixed inset-0 z-30 bg-bg px-6 pt-24 pb-8 lg:hidden flex flex-col justify-between">
          <nav className="flex flex-col gap-2" aria-label="Mobile Navigation">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => {
                  playClick();
                  setMenu(false);
                }}
                className="border-b border-line py-3.5 font-display text-2xl text-fg hover:text-brass transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="pt-6 border-t border-line space-y-3">
            <button
              type="button"
              onClick={() => {
                setMenu(false);
                setRecruiterModalOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-brass py-3 text-sm font-semibold text-ink"
            >
              <Sparkles className="size-4" />
              <span>Open 60s Recruiter Brief</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMenu(false);
                setTerminalModalOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-line bg-surface py-3 text-sm font-mono text-fg"
            >
              <Terminal className="size-4 text-emerald-400" />
              <span>Launch Interactive CLI</span>
            </button>
          </div>
        </div>
      ) : null}

      <main>
        {/* HERO SECTION: The Book Cover */}
        <section id="signal" className="book-cover relative overflow-hidden scroll-mt-0">
          {/* Subtle background glow */}
          <div className="absolute top-1/4 left-1/4 -z-10 size-96 rounded-full bg-brass/5 blur-3xl pointer-events-none" />

          <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 pt-24 pb-12 lg:grid-cols-12 lg:pt-36 lg:pb-24">
            {/* Left Column: Bio & Core Pitch */}
            <div className="lg:col-span-7 space-y-6">
              {/* Location & Status HUD */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-brass/30 bg-surface px-3.5 py-1.5 text-xs text-muted backdrop-blur-sm">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-fg font-medium">Kathmandu, Nepal</span>
                <span className="text-line-bright">|</span>
                <span className="text-brass">Open to Roles & Internships</span>
              </div>

              {/* Title & Name */}
              <div>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl leading-none text-fg font-normal tracking-tight">
                  Sagar
                  <span className="block italic text-brass font-normal mt-1">
                    Roka Chhetri
                  </span>
                </h1>

                {/* Rotating Roles Tagline */}
                <p className="mt-4 min-h-8 font-display text-xl sm:text-2xl text-fg/90 italic">
                  <span className="role-in text-brass" key={profile.roles[role]}>
                    {profile.roles[role]}
                  </span>
                </p>
              </div>

              {/* Verified Elevator Bio */}
              <p className="max-w-xl text-base leading-relaxed text-muted">
                {profile.heroBio}
              </p>

              {/* Primary Action Row */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    playChime();
                    setRecruiterModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-brass px-5 py-3 text-sm font-semibold text-ink hover:bg-brass-hover transition-transform duration-150 active:scale-95 shadow-lg shadow-brass/20"
                >
                  <Sparkles className="size-4" />
                  <span>Recruiter Brief</span>
                </button>

                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noreferrer"
                  download="Sagar_Roka_Chhetri_Resume.pdf"
                  onClick={playClick}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-sm font-medium text-fg hover:border-brass transition-colors active:scale-95"
                >
                  <Download className="size-4 text-brass" />
                  <span>ATS Resume</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    playChime();
                    setTerminalModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-3 text-sm font-mono text-muted hover:text-emerald-400 hover:border-emerald-500/50 transition-colors active:scale-95"
                >
                  <Terminal className="size-4 text-emerald-400" />
                  <span>Terminal</span>
                </button>

                <a
                  href="https://github.com/sc8134"
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClick}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-3 text-sm text-muted hover:text-fg hover:border-brass transition-colors active:scale-95"
                >
                  <Github className="size-4" />
                  <span>GitHub</span>
                </a>
              </div>

              {/* Verified Metrics Counter */}
              <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4 shadow-xl">
                {profile.stats.map((stat) => (
                  <div key={stat.label} className="bg-surface px-4 py-4.5">
                    <dt className="text-[11px] tracking-wider text-muted uppercase font-medium">
                      {stat.label}
                    </dt>
                    <dd className="mt-1.5 font-display text-2xl sm:text-3xl text-fg font-normal">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Right Column: Interactive 3D Canvas Showcase */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <SignalFrame
                activeProjectId={projectId}
                onSelectProject={(id) => {
                  playChime();
                  setProjectId(id);
                  const p = projects.find((item) => item.id === id);
                  if (p) setSelectedCaseStudy(p);
                }}
              />
            </div>
          </div>

          {/* Live Git Activity & Engineering Velocity Pulse */}
          <div className="mx-auto max-w-6xl px-5 pb-16">
            <GithubPulse />
          </div>
        </section>

        {/* SECTION 2: ORIGIN & EDITORIAL STORY ("The Long Way Around") */}
        <section id="origin" className="book-page scroll-mt-20 border-b border-paper-line">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:gap-12 lg:py-20 lg:grid-cols-12">
            <div className="chapter-divider lg:col-span-12">
              <span className="chapter-number">Chapter 2 · Origin & Philosophy</span>
            </div>
            {/* Left Column: Editorial Callout */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <p className="text-xs tracking-widest text-brass-ink uppercase font-semibold">
                  02 · Origin & Philosophy
                </p>
                <h2 className="mt-3 font-display text-4xl sm:text-5xl leading-tight font-normal">
                  The long way around.
                </h2>
              </div>

              <p className="text-base sm:text-lg leading-relaxed text-ink-soft">
                No bootcamp, no corporate sponsor, no senior engineer to ping at midnight. Learning to build real software in Kathmandu requires an obsessive kind of self-reliance.
              </p>

              <blockquote className="border-l-3 border-brass-ink pl-4 font-display text-xl sm:text-2xl italic text-ink my-6">
                "{profile.tagline}"
              </blockquote>

              <div className="rounded-2xl border border-paper-line bg-white/60 p-5 shadow-sm space-y-2">
                <span className="text-xs uppercase tracking-wider text-brass-ink font-semibold">
                  The 30-Second Truth
                </span>
                <p className="text-sm leading-relaxed text-ink-soft">
                  Final-year computer engineering student at Cosmos College. Two years of shipping applications solo from database schema to deployment, followed by leading production MERN platform frontend and cPanel deployments at CodeRunners Technologies.
                </p>
              </div>
            </div>

            {/* Right Column: Deep Biographical Story */}
            <div className="lg:col-span-7 space-y-6">
              {profile.bio.map((paragraph, index) => (
                <div key={index} className="flex gap-4">
                  <span className="font-display text-2xl text-brass-ink font-semibold shrink-0 pt-0.5">
                    0{index + 1}
                  </span>
                  <p className={`text-base sm:text-lg leading-relaxed text-ink-soft ${index === 0 ? "drop-cap" : ""}`}>
                    {paragraph}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: IMMUTABLE ENGINEERING PRINCIPLES */}
        <section id="principles" className="book-page scroll-mt-20 border-b border-paper-line">
          <div className="mx-auto max-w-6xl px-5 py-12 sm:py-20">
            <div className="chapter-divider">
              <span className="chapter-number">Chapter 3 · How I Build</span>
            </div>
            <p className="text-xs tracking-widest text-brass uppercase font-semibold">
              03 · How I Build
            </p>
            <h2 className="mt-3 max-w-xl font-display text-4xl sm:text-5xl leading-none font-normal">
              Four rules I actually keep.
            </h2>

            <ol className="mt-12 divide-y divide-line border-y border-line">
              {profile.principles.map((item, index) => (
                <li
                  key={item.title}
                  className="grid gap-3 py-7 md:grid-cols-12 md:items-baseline group hover:bg-surface/50 px-3 rounded-lg transition-colors"
                >
                  <span className="font-display text-2xl text-brass md:col-span-1">
                    0{index + 1}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl text-fg md:col-span-4 font-normal">
                    {item.title}
                  </h3>
                  <p className="text-base leading-relaxed text-muted md:col-span-7">
                    {item.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* SECTION 4: FLAGSHIP WORK SHOWCASE (ALL 8 BUILDS) */}
        <section id="work" className="book-page scroll-mt-20 border-b border-paper-line">
          <div className="mx-auto max-w-6xl px-5 py-12 sm:py-20">
            <div className="chapter-divider">
              <span className="chapter-number">Chapter 4 · The Showcase</span>
            </div>
            {/* Header & Filter Pills */}
            <div className="flex flex-wrap items-end justify-between gap-6 pb-6 border-b border-line">
              <div>
                <p className="text-xs tracking-widest text-brass uppercase font-semibold">
                  04 · The Showcase
                </p>
                <h2 className="mt-3 font-display text-4xl sm:text-5xl leading-none font-normal">
                  Every product, built with friction.
                </h2>
                <p className="mt-2 text-sm text-muted">
                  Click any project card to inspect full architecture, trade-offs, and live repositories.
                </p>
              </div>

              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
                {(["All", "Live", "From scratch", "AI"] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => chooseFilter(item)}
                    className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                      filter === item
                        ? "bg-brass text-ink font-semibold shadow-md shadow-brass/20"
                        : "border border-line bg-surface text-muted hover:text-fg hover:border-brass/40"
                    }`}
                  >
                    {item === "AI" ? "AI & ML" : item}
                  </button>
                ))}
              </div>
            </div>

            {/* Split Showcase Layout */}
            <div className="mt-10 grid gap-6 lg:grid-cols-12">
              {/* Left Column: Project Selector Cards */}
              <ul className="space-y-3 lg:col-span-5">
                {visibleProjects.map((item) => {
                  const isSelected = activeProject?.id === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => {
                          playClick();
                          setProjectId(item.id);
                          // On mobile, scroll to the detail card after selecting
                          setTimeout(() => {
                            if (window.innerWidth < 1024) {
                              projectDetailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                            }
                          }, 100);
                        }}
                        className={`flex w-full items-start justify-between gap-4 rounded-2xl border p-4 text-left transition-all duration-200 ${
                          isSelected
                            ? "border-brass bg-surface-2 shadow-xl ring-1 ring-brass/30"
                            : "border-line bg-surface/50 hover:bg-surface hover:border-brass/30"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {/* Mini Thumbnail */}
                          <div className="relative size-12 shrink-0 overflow-hidden rounded-xl border border-line bg-bg">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="h-full w-full object-cover object-top"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = "none";
                              }}
                            />
                            <div
                              className="grid size-full place-items-center text-xs font-bold text-fg"
                              style={{ backgroundColor: `${item.color}33` }}
                            >
                              {item.index}
                            </div>
                          </div>

                          <div>
                            <span className="block text-[11px] tracking-wider text-muted uppercase">
                              {item.index} · {item.year}
                            </span>
                            <span className="mt-0.5 block font-display text-xl sm:text-2xl text-fg font-normal">
                              {item.title}
                            </span>
                            <span className="mt-1 block text-xs text-muted line-clamp-1">
                              {item.tagline}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-1 shrink-0">
                          {item.live ? (
                            <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] text-emerald-400 font-medium">
                              Live
                            </span>
                          ) : (
                            <span className="rounded-full bg-surface-2 border border-line px-2 py-0.5 text-[10px] text-muted">
                              Repo
                            </span>
                          )}
                          <ChevronRight
                            className={`size-4 transition-transform ${isSelected ? "text-brass translate-x-0.5" : "text-muted"}`}
                          />
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* Right Column: Detailed Featured Project Inspection Card */}
              {activeProject ? (
                <article ref={projectDetailRef} className="lg:col-span-7 rounded-2xl border border-line bg-surface p-6 sm:p-8 lg:sticky lg:top-24 lg:self-start space-y-6 shadow-2xl scroll-mt-20">
                  {/* Top Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-brass/15 px-3 py-1 text-xs font-medium text-brass">
                          {activeProject.index} · {activeProject.year}
                        </span>
                        {activeProject.flags.map((flag) => (
                          <span
                            key={flag}
                            className="rounded-full border border-line bg-surface-2 px-2.5 py-0.5 text-xs text-muted"
                          >
                            {flag}
                          </span>
                        ))}
                      </div>

                      <h3 className="mt-3 font-display text-3xl sm:text-4xl text-fg font-normal">
                        {activeProject.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-muted">{activeProject.tagline}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenProject(activeProject)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-brass/40 bg-brass/10 px-3.5 py-1.5 text-xs font-semibold text-brass hover:bg-brass hover:text-ink transition-colors"
                    >
                      <Eye className="size-3.5" />
                      <span>Deep Dive</span>
                    </button>
                  </div>

                  {/* Project Screenshot Banner */}
                  {activeProject.image && (
                    <div
                      className="relative overflow-hidden rounded-xl border border-line bg-bg aspect-video max-h-64 cursor-pointer group"
                      onClick={() => handleOpenProject(activeProject)}
                    >
                      <img
                        src={activeProject.image}
                        alt={activeProject.title}
                        className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                        <span className="inline-flex items-center gap-1 text-xs text-fg font-medium bg-surface/80 backdrop-blur-md px-3 py-1 rounded-full border border-line">
                          Click to inspect architecture & trade-offs
                          <ArrowUpRight className="size-3" />
                        </span>
                      </div>
                    </div>
                  )}

                  {/* The Friction */}
                  <div className="rounded-xl border border-line bg-surface-2 p-4">
                    <span className="text-[11px] uppercase tracking-wider text-brass font-semibold">
                      The Friction (Why Built)
                    </span>
                    <p className="mt-1.5 font-display text-lg italic text-fg/90">
                      "{activeProject.why}"
                    </p>
                  </div>

                  {/* Summary */}
                  <p className="text-sm leading-relaxed text-muted">
                    {activeProject.summary}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2">
                    {activeProject.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-line bg-surface-2 px-3 py-1 text-xs text-fg"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Direct Action Links */}
                  <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-line">
                    {activeProject.live && (
                      <a
                        href={activeProject.live}
                        target="_blank"
                        rel="noreferrer"
                        onClick={playClick}
                        className="inline-flex items-center gap-2 rounded-full bg-brass px-4 py-2 text-xs font-semibold text-ink hover:bg-brass-hover transition-colors"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight className="size-3.5" />
                      </a>
                    )}

                    {activeProject.repo && (
                      <a
                        href={activeProject.repo}
                        target="_blank"
                        rel="noreferrer"
                        onClick={playClick}
                        className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-2 px-4 py-2 text-xs font-medium text-fg hover:border-brass transition-colors"
                      >
                        <Github className="size-3.5" />
                        <span>Source Code</span>
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => handleOpenProject(activeProject)}
                      className="inline-flex items-center gap-1.5 text-xs text-brass hover:underline ml-auto"
                    >
                      <Layers className="size-3.5" />
                      <span>Full Case Study</span>
                    </button>
                  </div>
                </article>
              ) : null}
            </div>
          </div>
        </section>

        {/* SECTION 5: CRAFT & PROOF MATRIX (SKILLS WITH REAL CODE PROOF) */}
        <section id="craft" className="book-page scroll-mt-20 border-b border-paper-line">
          <div className="mx-auto max-w-6xl px-5 py-12 sm:py-20">
            <div className="chapter-divider">
              <span className="chapter-number">Chapter 5 · Proof, Not Percentages</span>
            </div>
            <p className="text-xs tracking-widest text-brass uppercase font-semibold">
              05 · Proof, Not Percentages
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl sm:text-5xl leading-tight font-normal">
              Where each skill actually shipped.
            </h2>
            <p className="mt-3 max-w-2xl text-muted text-sm sm:text-base">
              Levels mean something tangible. "Production" is deployed code running for live users. "Working" is proven in finished projects. "Exploring" is honest about current research.
            </p>

            {/* Category Pills */}
            <div className="mt-8 flex flex-wrap gap-2">
              {skillGroups.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => chooseGroup(item.id)}
                  className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                    group.id === item.id
                      ? "bg-brass text-ink font-semibold shadow-md shadow-brass/20"
                      : "border border-line bg-surface text-fg hover:border-brass/40"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Skill Cards Grid */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {group.skills.map((item) => {
                const isSelected = skill.id === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      playClick();
                      setSkillId(item.id);
                    }}
                    className={`rounded-2xl border p-4 text-left transition-all ${
                      isSelected
                        ? "border-brass bg-surface-2 shadow-lg ring-1 ring-brass/30"
                        : "border-line bg-surface/40 hover:bg-surface hover:border-line-bright"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="block text-[11px] tracking-wider text-muted uppercase">
                        {item.level}
                      </span>
                      {item.level === "Production" && (
                        <span className="size-1.5 rounded-full bg-emerald-400" />
                      )}
                    </div>
                    <span className="mt-2 block font-display text-xl text-fg font-normal">
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Skill Verification Inspector */}
            <div className="mt-6 rounded-2xl border border-line bg-surface p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-brass font-semibold">
                    Verified Production Proof · {skill.name}
                  </span>
                  <h4 className="font-display text-2xl text-fg font-normal mt-1">
                    {skill.level} Capability
                  </h4>
                </div>
                <span className="rounded-full border border-line bg-surface-2 px-3 py-1 text-xs text-muted">
                  {group.label}
                </span>
              </div>
              <p className="mt-4 text-base leading-relaxed text-fg/90">
                {skill.proof}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 6: THE PATH (CAREER, STUDY & CREDENTIALS) */}
        <section id="path" className="book-page scroll-mt-20 border-b border-paper-line">
          <div className="mx-auto max-w-6xl px-5 py-12 sm:py-20">
            <div className="chapter-divider">
              <span className="chapter-number">Chapter 6 · The Path</span>
            </div>
            <p className="text-xs tracking-widest text-brass-ink uppercase font-semibold">
              06 · The Path
            </p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl leading-tight font-normal">
              Work, and the degree that ran beside it.
            </h2>

            <ol className="mt-12 space-y-0">
              {path.map((item, index) => (
                <li
                  key={item.id}
                  className="grid gap-4 border-t border-paper-line py-8 md:grid-cols-12"
                >
                  <div className="md:col-span-4 space-y-1">
                    <p className="text-xs tracking-widest text-brass-ink uppercase font-semibold">
                      {item.kind === "work" ? "Work Experience" : "Education"} · 0{index + 1}
                    </p>
                    <h3 className="font-display text-2xl sm:text-3xl text-ink font-normal">
                      {item.role}
                    </h3>
                    <p className="text-base font-medium text-ink">{item.place}</p>
                    {item.detail && <p className="text-xs text-ink-soft">{item.detail}</p>}
                    <p className="text-xs text-ink-soft pt-1">
                      {item.date}
                      {item.where ? ` · ${item.where}` : ""}
                    </p>
                  </div>

                  <div className="md:col-span-8">
                    <p className="text-base sm:text-lg leading-relaxed text-ink-soft">
                      {item.story}
                    </p>
                    {item.tech && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {item.tech.map((t) => (
                          <li
                            key={t}
                            className="rounded-full border border-paper-line bg-white/70 px-3 py-1 text-xs text-ink font-medium"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ol>

            {/* Verified Certifications */}
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {credentials.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClick}
                  className="rounded-2xl border border-paper-line bg-white/70 p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-brass-ink font-semibold">
                      Official Credential · {item.code}
                    </span>
                    <ArrowUpRight className="size-4 text-brass-ink" />
                  </div>
                  <h3 className="mt-2 font-display text-2xl text-ink font-normal">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink-soft">
                    {item.issuer} · {item.field}
                  </p>
                  <p className="mt-3 text-xs text-ink-soft">{item.date}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: FIELD NOTES & ESSAYS (FULL EDITORIAL READS) */}
        <section id="notes" className="book-page scroll-mt-20 border-b border-paper-line">
          <div className="mx-auto max-w-6xl px-5 py-12 sm:py-20">
            <div className="chapter-divider">
              <span className="chapter-number">Chapter 7 · Field Notes</span>
            </div>
            <p className="text-xs tracking-widest text-brass uppercase font-semibold">
              07 · Field Notes
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl sm:text-5xl leading-tight font-normal">
              Essays, in his own words.
            </h2>
            <p className="mt-3 max-w-2xl text-muted text-sm sm:text-base">
              Seven original essays from sagarrc.com.np. Unfiltered case studies, the realities of teaching yourself in Nepal without mentors, and how to ship solo. Open one to read in full.
            </p>

            <ul className="mt-10 divide-y divide-line border-y border-line">
              {notes.map((item) => (
                <li key={item.slug}>
                  <button
                    type="button"
                    onClick={() => openNote(item)}
                    className="flex w-full flex-col gap-2 py-6 text-left transition-colors hover:bg-surface/40 px-3 rounded-lg md:flex-row md:items-baseline md:justify-between group"
                  >
                    <div>
                      <span className="text-xs tracking-widest text-brass uppercase font-medium">
                        {item.entryNumber} · {item.mood}
                      </span>
                      <span className="mt-1 block font-display text-2xl sm:text-3xl text-fg font-normal group-hover:text-brass transition-colors">
                        {item.title}
                      </span>
                      <span className="mt-2 block max-w-2xl text-sm leading-relaxed text-muted">
                        {item.excerpt}
                      </span>
                    </div>

                    <span className="shrink-0 text-xs tracking-wider text-muted uppercase mt-2 md:mt-0">
                      {formatNoteDate(item.date)} · {item.readTime} min read
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            {/* In-Line Full Note Reader */}
            {note ? (
              <article
                id="reader"
                className="scroll-mt-24 mt-10 rounded-2xl bg-paper px-6 py-10 text-ink sm:px-10 shadow-2xl"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-paper-line pb-4">
                  <span className="text-xs tracking-widest text-brass-ink uppercase font-semibold">
                    {note.entryNumber} · {formatNoteDate(note.date)} · {note.readTime} MIN READ
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      setNote(null);
                    }}
                    className="text-xs font-semibold uppercase tracking-wider text-ink underline underline-offset-4 hover:text-brass-ink"
                  >
                    Close Reader
                  </button>
                </div>

                <h3 className="mt-6 font-display text-3xl sm:text-5xl leading-tight font-normal text-ink">
                  {note.title}
                </h3>
                <p className="mt-3 font-display text-xl text-ink-soft italic">
                  {note.subtitle}
                </p>

                <div className="mt-8 border-t border-paper-line pt-8">
                  <NoteBody blocks={note.content} />
                </div>

                <div className="mt-10 border-t border-paper-line pt-6 flex justify-between items-center text-xs text-ink-soft">
                  <span>Tags: {note.tags.join(", ")}</span>
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      setNote(null);
                    }}
                    className="rounded-full bg-ink px-4 py-1.5 text-xs font-semibold text-paper hover:bg-brass-ink transition-colors"
                  >
                    Done Reading
                  </button>
                </div>
              </article>
            ) : null}
          </div>
        </section>

        {/* SECTION 8: RECRUITER & CONTACT HUB */}
        <section id="hire" className="book-page scroll-mt-20">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:gap-12 lg:py-20 lg:grid-cols-12">
            <div className="chapter-divider lg:col-span-12">
              <span className="chapter-number">Chapter 8 · Recruiter & Hire Hub</span>
            </div>
            {/* Left Column: Direct Info & Timezone Clock */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <p className="text-xs tracking-widest text-brass uppercase font-semibold">
                  08 · Recruiter & Hire Hub
                </p>
                <h2 className="mt-3 font-display text-4xl sm:text-5xl leading-none font-normal">
                  If the work fits, write.
                </h2>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  {profile.openToWork}. Based in {profile.location}.
                </p>
              </div>

              {/* Live Kathmandu Timepiece */}
              <div className="rounded-2xl border border-line bg-surface p-6 shadow-xl space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-muted font-medium flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Kathmandu Time (Asia/Kathmandu · UTC+5:45)
                </span>
                <p className="font-display text-3xl sm:text-4xl font-mono text-fg tracking-tight">
                  {ready ? clock : "--:--:--"}
                </p>
                <p className="text-xs text-muted">
                  Seamless overlap with European working hours & US morning schedules.
                </p>
              </div>

              {/* Verified Handles */}
              <ul className="space-y-2">
                {socials.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.url}
                      target={item.id === "email" ? undefined : "_blank"}
                      rel="noreferrer"
                      onClick={playClick}
                      className="group flex items-center justify-between border-b border-line py-3 hover:border-brass transition-colors"
                    >
                      <div>
                        <span className="block text-[11px] tracking-wider text-muted uppercase font-medium">
                          {item.label}
                        </span>
                        <span className="text-base text-fg group-hover:text-brass transition-colors">
                          {item.handle}
                        </span>
                      </div>
                      <ArrowUpRight className="size-4 text-muted group-hover:text-brass transition-colors" />
                    </a>
                  </li>
                ))}
              </ul>

              {/* Copy Email Button */}
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-3 text-sm font-medium text-fg hover:border-brass transition-colors active:scale-95 shadow-md w-full sm:w-auto justify-center sm:justify-start"
              >
                {copied ? <Check className="size-4 text-emerald-400 shrink-0" /> : <Copy className="size-4 text-brass shrink-0" />}
                <span className="truncate">{copied ? "Email Copied!" : "Copy Email (sc81341@gmail.com)"}</span>
              </button>
            </div>

            {/* Right Column: Pre-Formatted Recruiter Mail Composer & Q&A */}
            <div className="space-y-6 lg:col-span-7">
              {/* Recruiter Outreach Form */}
              <form
                className="rounded-2xl border border-line bg-surface p-6 sm:p-8 shadow-2xl space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  void submitForm();
                }}
              >
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-normal text-fg">
                    Draft a Direct Email
                  </h3>
                  <p className="mt-1 text-xs text-muted">
                    Sends directly to Sagar's inbox via Web3Forms — no email client needed.
                  </p>
                </div>

                {/* Subject Presets */}
                <div>
                  <span className="text-xs uppercase tracking-wider text-muted font-medium">
                    Inquiry Type
                  </span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {[
                      "Full-time Engineering Role",
                      "Frontend / React Role",
                      "Full Stack Developer Position",
                      "Contract / Freelance Build",
                      "Coffee / Technical Chat",
                    ].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => {
                          playClick();
                          setContactSubjectPreset(preset);
                        }}
                        className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
                          contactSubjectPreset === preset
                            ? "bg-brass text-ink font-semibold"
                            : "border border-line bg-surface-2 text-muted hover:text-fg"
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs">
                    <span className="text-muted uppercase tracking-wider">Your Name</span>
                    <input
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      placeholder="e.g. Sarah Connor"
                      className="mt-1.5 w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 text-sm text-fg outline-none focus:border-brass"
                      autoComplete="name"
                    />
                  </label>

                  <label className="block text-xs">
                    <span className="text-muted uppercase tracking-wider">Company / Team</span>
                    <input
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Acme Corp / Stealth"
                      className="mt-1.5 w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 text-sm text-fg outline-none focus:border-brass"
                      autoComplete="organization"
                    />
                  </label>
                </div>

                <label className="block text-xs">
                  <span className="text-muted uppercase tracking-wider">Note / Job Description</span>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Tell Sagar about your team, tech stack, and what problem you need solved..."
                    className="mt-1.5 w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 text-sm text-fg outline-none focus:border-brass"
                  />
                </label>

                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-2 rounded-full bg-brass px-6 py-3 text-xs font-semibold text-ink hover:bg-brass-hover transition-transform duration-150 active:scale-95 shadow-lg shadow-brass/20 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Mail className="size-4" />
                  )}
                  <span>{sending ? "Sending…" : "Send Message"}</span>
                </button>

                {sendStatus === "success" && (
                  <p className="text-xs text-emerald-400 flex items-center gap-1.5">
                    <Check className="size-3.5" />
                    Message sent — Sagar will get back to you shortly.
                  </p>
                )}
                {sendStatus === "error" && (
                  <p className="text-xs text-red-400">
                    Something went wrong. Try emailing directly at{" "}
                    <a href={`mailto:${profile.email}`} className="underline underline-offset-2">
                      {profile.email}
                    </a>
                    .
                  </p>
                )}
              </form>

              {/* Straight Answers Q&A */}
              <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8 shadow-xl space-y-4">
                <div>
                  <h3 className="font-display text-2xl font-normal text-fg">
                    Straight Answers
                  </h3>
                  <p className="mt-1 text-xs text-muted">
                    Deterministic query matcher based strictly on Sagar's verified record. It will never invent facts or hallucinate metrics.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {suggested.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        playClick();
                        setQuestion(item);
                      }}
                      className={`rounded-full px-3 py-1 text-xs transition-colors ${
                        question === item
                          ? "bg-brass text-ink font-semibold"
                          : "border border-line bg-surface-2 text-muted hover:text-fg"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <input
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask about Namo Patro, Signal, stack, CodeRunners..."
                    className="w-full rounded-xl border border-line bg-bg px-4 py-2.5 text-sm text-fg outline-none focus:border-brass pr-10"
                  />
                </div>

                <div className="rounded-xl border border-line bg-surface-2 p-4">
                  <p className="text-sm leading-relaxed text-fg/90">{answer}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <footer className="border-t border-line bg-surface/50">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-lg text-fg italic">
              Built from Kathmandu, one commit at a time.
            </p>
            <p className="text-xs text-muted mt-0.5">
              React 19 · Vite · Three.js · Tailwind CSS · Every line of code is Sagar's.
            </p>
          </div>

          <div className="flex items-center gap-4 text-muted">
            <a
              href="https://github.com/sc8134"
              aria-label="GitHub"
              target="_blank"
              rel="noreferrer"
              className="hover:text-brass transition-colors"
            >
              <Github className="size-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/sagar-rc"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
              className="hover:text-brass transition-colors"
            >
              <Linkedin className="size-4" />
            </a>
            <a
              href="https://x.com/Sagarch05339168"
              aria-label="X"
              target="_blank"
              rel="noreferrer"
              className="hover:text-brass transition-colors"
            >
              <XMark className="size-4" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="hover:text-brass transition-colors"
            >
              <Mail className="size-4" />
            </a>
          </div>
        </div>
      </footer>

      {/* Modals & Dialogs */}
      <RecruiterModal
        isOpen={recruiterModalOpen}
        onClose={() => setRecruiterModalOpen(false)}
      />

      <TerminalModal
        isOpen={terminalModalOpen}
        onClose={() => setTerminalModalOpen(false)}
        onSelectProject={(id) => {
          setTerminalModalOpen(false);
          const p = projects.find((item) => item.id === id);
          if (p) setSelectedCaseStudy(p);
        }}
      />

      <ProjectModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />
    </div>
  );
}

import { Component, useEffect, useMemo, useState, type ReactNode } from "react";
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
// notes import removed — essays section hidden from main page
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
import { Amp, amp } from "@/utils/amp";
import { HeroTerminal } from "./hero-terminal";
import { TechPill } from "./tech-icons";

const NAV = [
  { id: "signal", label: "Overview" },
  { id: "origin", label: "Origin" },
  { id: "work", label: "The Builds" },
  { id: "craft", label: "Proof Matrix" },
  { id: "path", label: "Career" },
  { id: "honours", label: "Honours" },
  { id: "hire", label: "Hire" },
];

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
  return <HeroTerminal />;
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
  const [showAllSkills, setShowAllSkills] = useState(false);
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
    if (!recruiterModalOpen && !terminalModalOpen && !selectedCaseStudy) return;
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
  }, [recruiterModalOpen, terminalModalOpen, selectedCaseStudy]);

  // Separate effect: Escape closes menu without locking body scroll
  useEffect(() => {
    if (!menu) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  const visibleProjects = useMemo(() => {
    if (filter === "Live") return projects.filter((item) => item.live);
    if (filter === "From scratch") return projects.filter((item) => item.flags.includes("From scratch"));
    if (filter === "AI") return projects.filter((item) => item.flags.includes("AI & ML"));
    return projects;
  }, [filter]);

  const activeProject = visibleProjects.find((item) => item.id === projectId) ?? visibleProjects[0] ?? projects[0];
  const group = skillGroups.find((item) => item.id === groupId) ?? skillGroups[0];
  const visibleSkills = showAllSkills ? group.skills : group.skills.filter((s) => s.level === "Production");
  const skill = visibleSkills.find((item) => item.id === skillId) ?? visibleSkills[0] ?? group.skills[0];
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
    setShowAllSkills(false);
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
            className="flex shrink-0 items-center gap-3 group"
          >
            <div className="relative size-9 overflow-hidden rounded-lg border border-brass/50 bg-surface shadow-md">
              <img
                src={profile.avatar}
                srcSet={`${profile.avatarSmall} 1x, ${profile.avatar} 2x`}
                width={36}
                height={36}
                loading="eager"
                decoding="async"
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
              <span className="hidden items-center gap-1.5 text-[11px] text-muted min-[360px]:flex">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Kathmandu (UTC+5:45)
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center lg:flex" aria-label="Main Sections">
            <div className="flex items-center gap-0.5 rounded-full border border-line bg-surface/80 backdrop-blur-sm px-1.5 py-1">
              {NAV.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={playClick}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium tracking-wide transition-all duration-150 ${
                    active === item.id
                      ? "bg-brass text-ink shadow-sm"
                      : "text-muted hover:text-fg hover:bg-surface-2"
                  }`}
                >
                  {amp(item.label)}
                </a>
              ))}
            </div>
          </nav>

          {/* Header Actions */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
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
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-brass px-3.5 py-1.5 text-xs font-semibold text-ink hover:bg-brass-hover transition-transform duration-150 active:scale-95 shadow-md shadow-brass/20"
            >
              <Sparkles className="size-3.5" />
              <span>Recruiter Brief</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              type="button"
              className="grid size-9 place-items-center rounded-full border border-line text-muted hover:text-fg lg:hidden"
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
              aria-controls="mobile-nav"
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
        <div
          id="mobile-nav"
          className="fixed inset-0 z-30 overflow-y-auto overscroll-contain bg-bg px-6 pt-24 pb-8 lg:hidden flex flex-col justify-between"
        >
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
                {amp(item.label)}
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
        {/* HERO SECTION: The 1-of-1 Centerpiece */}
        <section id="signal" className="border-b border-line relative">
          {/* Subtle background glow */}
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 size-96 rounded-full bg-brass/5 blur-3xl" />
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 sm:px-5 pt-24 pb-12 lg:grid-cols-12 lg:pt-36 lg:pb-24">
            {/* Left Column: Bio & Core Pitch */}
            <div className="min-w-0 lg:col-span-6 space-y-6">
              {/* Location & Status HUD */}
              <div className="inline-flex max-w-full flex-wrap items-center gap-x-2.5 gap-y-1 rounded-full border border-brass/30 bg-surface px-3.5 py-1.5 text-xs text-muted backdrop-blur-sm">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-fg font-medium">Kathmandu, Nepal</span>
                <span className="hidden text-line-bright min-[360px]:inline">|</span>
                <span className="text-brass">Open to Full-Time Roles</span>
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
                <p className="mt-4 min-h-8 font-display text-lg sm:text-xl lg:text-2xl text-fg/90 italic">
                  <span className="role-in text-brass" key={profile.roles[role]}>
                    {profile.roles[role]}
                  </span>
                </p>
              </div>

              {/* Verified Elevator Bio */}
              <p className="max-w-xl text-sm sm:text-base leading-relaxed text-muted">
                {profile.heroBio}
              </p>

              {/* Primary Action Row */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2">
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
              <dl className="mt-6 sm:mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4 shadow-xl">
                {profile.stats.map((stat) => (
                  <div key={stat.label} className="bg-surface px-3 py-3.5 sm:px-4 sm:py-4.5">
                    <dt className="text-[10px] sm:text-[11px] tracking-wider text-muted uppercase font-medium">
                      {stat.label}
                    </dt>
                    <dd className="mt-1 sm:mt-1.5 font-display text-xl sm:text-2xl lg:text-3xl text-fg font-normal">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Right Column: Interactive 3D MacBook Showcase */}
            <div className="min-w-0 w-full lg:col-span-6 flex flex-col items-center overflow-visible">
              {/* Scale for each breakpoint so it never overflows */}
              <div className="w-full min-w-0 flex items-center justify-center origin-top
                              scale-[0.52] sm:scale-[0.65] md:scale-[0.78] lg:scale-100
                              -mb-52 sm:-mb-36 md:-mb-20 lg:mb-0">
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
          </div>

          {/* Live Git Activity & Engineering Velocity Pulse */}
          <div className="mx-auto max-w-6xl px-4 sm:px-5 pb-10 sm:pb-16">
            <GithubPulse />
          </div>
        </section>

        {/* SECTION 2: ORIGIN & EDITORIAL STORY ("The Long Way Around") */}
        <section id="origin" className="scroll-mt-20 bg-paper text-ink border-b border-paper-line">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-5 py-12 lg:gap-12 lg:py-20 lg:grid-cols-12">
            {/* Left Column: Editorial Callout */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <p className="text-xs tracking-widest text-brass-ink uppercase font-semibold">
                  02 · Origin <Amp ink /> Philosophy
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


            </div>

            {/* Right Column: Brief Origin Story */}
            <div className="lg:col-span-7 space-y-6">
              {profile.bio.map((paragraph, index) => (
                <p key={index} className="text-base sm:text-lg leading-relaxed text-ink-soft">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>


        {/* SECTION 4: FLAGSHIP WORK SHOWCASE (ALL 8 BUILDS) */}
        <section id="work" className="scroll-mt-20 border-b border-line">
          <div className="mx-auto max-w-6xl px-4 sm:px-5 py-12 sm:py-20">
            {/* Header & Filter Pills */}
            <div className="flex flex-wrap items-end justify-between gap-4 sm:gap-6 pb-6 border-b border-line">
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
                    {item === "AI" ? <>AI <Amp /> ML</> : item}
                  </button>
                ))}
              </div>
            </div>

            {/* Split Showcase Layout */}
            <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Left Column: Project Selector Cards */}
              <ul className="min-w-0 space-y-2 sm:space-y-3 lg:col-span-5">
                {visibleProjects.map((item) => {
                  const isSelected = activeProject?.id === item.id;
                  const thumb = item.image.replace("/projects/", "/projects/thumb/").replace(/\.webp$/, "");
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => {
                          playClick();
                          setProjectId(item.id);
                        }}
                        className={`flex w-full min-w-0 items-start justify-between gap-4 rounded-2xl border p-4 text-left transition-all duration-200 ${
                          isSelected
                            ? "border-brass bg-surface-2 shadow-xl ring-1 ring-brass/30"
                            : "border-line bg-surface/50 hover:bg-surface hover:border-brass/30"
                        }`}
                      >
                        <div className="flex min-w-0 items-start gap-3">
                          {/* Mini Thumbnail */}
                          <div
                            className="relative size-12 shrink-0 overflow-hidden rounded-xl border border-line"
                            style={{ backgroundColor: `${item.color}22` }}
                          >
                            <img
                              src={`${thumb}-256.webp`}
                              srcSet={`${thumb}-128.webp 1x, ${thumb}-256.webp 2x`}
                              width={48}
                              height={48}
                              loading="lazy"
                              decoding="async"
                              alt={item.title}
                              className="absolute inset-0 h-full w-full object-cover object-top"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.opacity = "0";
                              }}
                            />
                            <div
                              className="absolute inset-0 grid place-items-center text-[10px] font-bold"
                              style={{ color: item.color }}
                            >
                              {item.index}
                            </div>
                          </div>

                          <div className="min-w-0">
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
                <article className="lg:col-span-7 rounded-2xl border border-line bg-surface p-6 sm:p-8 lg:sticky lg:top-24 lg:self-start space-y-6 shadow-2xl">
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
                      className="cursor-pointer group"
                      onClick={() => handleOpenProject(activeProject)}
                    >
                      {/* Browser chrome frame */}
                      <div className="rounded-xl overflow-hidden border border-line shadow-xl">
                        {/* Fake browser bar */}
                        <div className="flex items-center gap-2 px-3 py-2 bg-surface-2 border-b border-line">
                          <span className="size-2.5 rounded-full bg-red-500/70" />
                          <span className="size-2.5 rounded-full bg-amber-400/70" />
                          <span className="size-2.5 rounded-full bg-emerald-500/70" />
                          <div className="flex-1 mx-2 rounded-md bg-surface px-2 py-0.5 text-[10px] text-muted font-mono truncate border border-line">
                            {activeProject.live
                              ? activeProject.live.replace("https://", "")
                              : `github.com/sc8134/${activeProject.id}`}
                          </div>
                          <ArrowUpRight className="size-3 text-muted group-hover:text-brass transition-colors" />
                        </div>
                        {/* Screenshot */}
                        <div className="relative overflow-hidden bg-bg" style={{ aspectRatio: "16/9" }}>
                          <img
                            src={activeProject.image}
                            alt={activeProject.title}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                            <span className="inline-flex items-center gap-1 text-xs text-fg font-medium bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                              Inspect architecture <Amp /> trade-offs
                              <ArrowUpRight className="size-3" />
                            </span>
                          </div>
                        </div>
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
        <section id="craft" className="scroll-mt-20 border-b border-line bg-surface/30">
          <div className="mx-auto max-w-6xl px-4 sm:px-5 py-12 sm:py-20">
            <p className="text-xs tracking-widest text-brass uppercase font-semibold">
              05 · Proof, Not Percentages
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl sm:text-5xl leading-tight font-normal">
              Where each skill actually shipped.
            </h2>
            <p className="mt-3 max-w-2xl text-muted text-sm sm:text-base">
              Levels mean something tangible. "Production" is deployed code running for live users. "Working" is proven in finished projects. "Exploring" is honest about current research.
            </p>

            {/* Category Pills — scrollable on mobile */}
            <div className="mt-6 sm:mt-8 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible scrollbar-none">
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
                  {amp(item.label)}
                </button>
              ))}
            </div>

            {/* Skill Cards Grid */}
            <div className="mt-4 sm:mt-6 grid gap-2 sm:gap-3 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
              {group.skills
                .filter((item) => showAllSkills || item.level === "Production")
                .map((item) => {
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
                      {amp(item.name)}
                    </span>                  </button>
                );
              })}
            </div>

            {/* Toggle for Working/Exploring skills */}
            <button
              type="button"
              onClick={() => {
                playClick();
                setShowAllSkills((v) => !v);
              }}
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted hover:text-brass transition-colors"
            >
              <ChevronRight className={`size-3.5 transition-transform ${showAllSkills ? "rotate-90" : ""}`} />
              {showAllSkills ? "Show production only" : "Show working & exploring skills"}
            </button>

            {/* Selected Skill Verification Inspector */}
            <div className="mt-6 rounded-2xl border border-line bg-surface p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-brass font-semibold">
                    Verified Production Proof · {amp(skill.name)}
                  </span>
                  <h4 className="font-display text-2xl text-fg font-normal mt-1">
                    {skill.level} Capability
                  </h4>
                </div>
                <span className="rounded-full border border-line bg-surface-2 px-3 py-1 text-xs text-muted">
                  {amp(group.label)}
                </span>
              </div>
              <p className="mt-4 text-base leading-relaxed text-fg/90">
                {skill.proof}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 6: THE PATH (CAREER, STUDY & CREDENTIALS) */}
        <section id="path" className="scroll-mt-20 bg-paper text-ink border-b border-paper-line">
          <div className="mx-auto max-w-6xl px-4 sm:px-5 py-12 sm:py-20">
            <p className="text-xs tracking-widest text-brass-ink uppercase font-semibold">
              06 · The Path
            </p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl leading-tight font-normal">
              Work, and the degree that ran beside it.
            </h2>

            {/* Timeline */}
            <ol className="mt-12 relative">
              {/* Vertical line */}
              <div className="absolute left-[6px] top-2 bottom-2 w-px bg-paper-line md:left-[11px]" aria-hidden="true" />

              {path.map((item, index) => (
                <li
                  key={item.id}
                  className="relative pl-8 md:pl-12 pb-12 last:pb-0"
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-0 top-1.5 size-3.5 rounded-full border-2 md:size-[22px] md:left-0 md:top-1 flex items-center justify-center ${
                      item.kind === "work"
                        ? "bg-brass border-brass"
                        : "bg-paper border-brass-ink"
                    }`}
                    aria-hidden="true"
                  >
                    {item.kind === "work" ? (
                      <div className="size-1.5 rounded-full bg-ink hidden md:block" />
                    ) : (
                      <div className="size-1.5 rounded-full bg-brass-ink hidden md:block" />
                    )}
                  </div>

                  <div className="grid gap-4 md:grid-cols-12 md:gap-8">
                    {/* Left: meta */}
                    <div className="md:col-span-4 space-y-1.5">
                      {/* Kind badge */}
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                        item.kind === "work"
                          ? "bg-brass/15 text-brass-ink"
                          : "bg-ink/8 text-ink-soft"
                      }`}>
                        {item.kind === "work" ? "Work Experience" : "Education"}
                      </span>

                      {/* Date badge */}
                      <div className="inline-flex items-center gap-1.5 rounded-lg border border-paper-line bg-white/60 px-2.5 py-1 text-xs text-ink-soft font-mono">
                        <svg viewBox="0 0 16 16" className="size-3 shrink-0" fill="currentColor">
                          <path d="M4 1a1 1 0 0 0-1 1v1H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-1V2a1 1 0 0 0-2 0v1H5V2a1 1 0 0 0-1-1zM2 5h12v8H2V5z" />
                        </svg>
                        {item.date}
                      </div>

                      <h3 className="font-display text-2xl sm:text-3xl text-ink font-normal leading-tight mt-1">
                        {amp(item.role, true)}
                      </h3>
                      <p className="text-sm font-semibold text-ink">{amp(item.place, true)}</p>
                      {item.detail && <p className="text-xs text-ink-soft">{item.detail}</p>}
                      {item.where && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-ink-soft">
                          <svg viewBox="0 0 16 16" className="size-3" fill="currentColor">
                            <path d="M8 1a5 5 0 0 0-5 5c0 4 5 9 5 9s5-5 5-9a5 5 0 0 0-5-5zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
                          </svg>
                          {item.where}
                        </span>
                      )}
                    </div>

                    {/* Right: story + tech */}
                    <div className="md:col-span-8 space-y-4">
                      <p className="text-base sm:text-lg leading-relaxed text-ink-soft">
                        {item.story}
                      </p>
                      {item.tech && item.tech.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {item.tech.map((t) => (
                            <TechPill key={t} name={t} size={13} />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* SECTION 7: CREDENTIALS & HONOURS */}
        <section id="honours" className="scroll-mt-20 border-b border-line bg-surface/20">
          <div className="mx-auto max-w-6xl px-4 sm:px-5 py-12 sm:py-20">

            {/* Section header */}
            <p className="text-xs tracking-widest text-brass uppercase font-semibold">
              07 · Credentials <Amp /> Honours
            </p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl leading-none font-normal">
              Verified. In writing.
            </h2>
            <p className="mt-3 max-w-2xl text-muted text-sm sm:text-base">
              Issued credentials from CodeAlpha following a completed virtual full-stack engineering internship. Both documents are verifiable — click either card to open the original PDF.
            </p>

            {/* Credential cards */}
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {credentials.map((item, idx) => (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClick}
                  className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-line bg-surface p-7 shadow-xl transition-all hover:border-brass/50 hover:shadow-brass/10 hover:shadow-2xl"
                >
                  {/* Ambient glow on hover */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-brass/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Top row: badge + open icon */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {/* Seal icon */}
                      <div className="grid size-11 shrink-0 place-items-center rounded-xl border border-brass/30 bg-brass/10 text-brass">
                        {idx === 0 ? (
                          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="8" r="6" />
                            <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                            <polyline points="10 9 9 9 8 9" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase tracking-widest text-brass font-semibold">
                          {item.type}
                        </span>
                        <span className="block text-[11px] text-muted">
                          {item.issuedBy}
                        </span>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-surface-2 px-2.5 py-1 text-[10px] text-muted group-hover:border-brass/40 group-hover:text-brass transition-colors">
                      <span>Open PDF</span>
                      <ArrowUpRight className="size-3" />
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl text-fg font-normal leading-tight group-hover:text-brass transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer metadata */}
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-line pt-4">
                    <div className="space-y-0.5">
                      <span className="block text-[10px] uppercase tracking-wider text-muted">
                        Credential ID
                      </span>
                      <span className="font-mono text-xs text-fg">
                        {item.code}
                      </span>
                    </div>
                    <div className="space-y-0.5 text-right">
                      <span className="block text-[10px] uppercase tracking-wider text-muted">
                        Issued
                      </span>
                      <span className="text-xs text-fg">{item.date}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Issuer note */}
            <p className="mt-6 text-xs text-muted">
              Issued by{" "}
              <a
                href="https://codealpha.tech"
                target="_blank"
                rel="noreferrer"
                className="text-brass hover:underline"
              >
                CodeAlpha
              </a>{" "}
              · Credential ID CA/DF1/252458 · Full Stack Development track · Remote internship, Aug – Sep 2026.
            </p>
          </div>
        </section>

        {/* SECTION 8: RECRUITER & CONTACT HUB */}
        <section id="hire" className="scroll-mt-20">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-5 py-12 lg:gap-12 lg:py-20 lg:grid-cols-12">
            {/* Left Column: Direct Info & Timezone Clock */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <p className="text-xs tracking-widest text-brass uppercase font-semibold">
                  09 · Recruiter <Amp /> Hire Hub
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
                  Seamless overlap with European working hours <Amp /> US morning schedules.
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
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-3 text-sm font-medium text-fg hover:border-brass transition-colors active:scale-95 shadow-md w-full justify-center"
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
                  <div className="mt-2 flex flex-wrap gap-1.5 sm:gap-2">
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
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-lg text-fg italic">
              Built from Kathmandu, one commit at a time.
            </p>
            <p className="text-xs text-muted mt-0.5">
              Built from scratch in Kathmandu - no templates, no shortcuts, no borrowed opinions.
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

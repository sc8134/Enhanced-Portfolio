// JobHunt Agent widget — interactive semantic job-role matcher demo embedded in the project modal.
// Simulates the NLP cosine-similarity matching and auto-drafted cover letter pitch from the real JobHunt Agent project.
import { useState } from "react";
import { Bot, Sparkles, Check, Zap, FileText } from "lucide-react";

const SAMPLE_ROLES = [
  {
    title: "Full Stack Engineer (React + Node/Postgres)",
    score: "96.4% Match",
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "Full-Stack System Design"],
    tailoredPitch:
      "Having built Signal Job Portal solo—architecting dual-role JWT auth and PostgreSQL tsvector full-text search—and leading production MERN platform frontend and cPanel deployments at CodeRunners, I possess the direct end-to-end engineering velocity needed to contribute to your core stack from day one.",
  },
  {
    title: "Frontend Engineer (React 19 + Performance)",
    score: "94.8% Match",
    skills: ["React", "Tailwind CSS", "TypeScript", "Three.js", "Component Architecture"],
    tailoredPitch:
      "My daily frontend workflow revolves around clean React component architecture, zero-template Tailwind CSS systems, and WebGL 3D visualizations. At CodeRunners, I rebuilt our entire user-facing admin dashboard and event interfaces from scratch, improving sub-second rendering across mobile and desktop.",
  },
  {
    title: "Backend & Automation Engineer (Python + APIs)",
    score: "92.1% Match",
    skills: ["Python", "Flask", "FastAPI", "FFmpeg", "LangGraph", "NLP"],
    tailoredPitch:
      "I started my engineering journey writing automation scripts in Python. Across Nova DVR, AI Reel Generator, and JobHunt Agent, I've designed resilient microservices, programmatic FFmpeg media pipelines, and local NLP vector matching using open-source models with zero commercial API dependencies.",
  },
];

export function JobHuntAgentWidget() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeRole = SAMPLE_ROLES[selectedIdx];

  return (
    <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-indigo-500/20 pb-3">
        <div className="flex items-center gap-2">
          <Bot className="size-4 text-indigo-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
            JobHunt Agent · Semantic Matcher & Draft Engine
          </span>
        </div>
        <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] text-indigo-300 font-mono">
          Local Open-Source NLP
        </span>
      </div>

      {/* Role Selector Pills */}
      <div>
        <label className="text-[10px] uppercase text-muted block mb-2 font-medium">
          Select Target Engineering Role to Simulate Semantic Alignment:
        </label>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_ROLES.map((role, idx) => (
            <button
              key={role.title}
              type="button"
              onClick={() => setSelectedIdx(idx)}
              className={`rounded-lg px-3 py-1.5 text-xs transition-all text-left ${
                selectedIdx === idx
                  ? "bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30"
                  : "border border-line bg-surface text-muted hover:text-fg"
              }`}
            >
              {role.title}
            </button>
          ))}
        </div>
      </div>

      {/* Real-time Match Metrics */}
      <div className="grid grid-cols-1 gap-3 rounded-lg bg-surface p-3.5 border border-line sm:grid-cols-2">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-muted font-medium">
            Cosine Semantic Similarity
          </span>
          <p className="font-display text-2xl font-normal text-emerald-400 mt-0.5">
            {activeRole.score}
          </p>
          <span className="text-[10px] text-muted">spaCy + sentence-transformers</span>
        </div>
        <div>
          <span className="text-[10px] uppercase tracking-wider text-muted font-medium">
            Overlapping Core Competencies
          </span>
          <div className="flex flex-wrap gap-1 mt-1">
            {activeRole.skills.slice(0, 3).map((s) => (
              <span key={s} className="rounded bg-surface-2 px-1.5 py-0.5 text-[10px] text-fg">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Auto-Drafted Cover Letter Pitch */}
      <div className="rounded-lg bg-surface-2 p-3.5 border border-line space-y-1.5">
        <span className="text-[10px] uppercase tracking-wider text-indigo-400 font-semibold flex items-center gap-1">
          <FileText className="size-3" />
          Automated Pitch Generation (From Sagar's Verified Experience)
        </span>
        <p className="text-xs leading-relaxed text-fg/90 italic">
          "{activeRole.tailoredPitch}"
        </p>
      </div>
    </div>
  );
}

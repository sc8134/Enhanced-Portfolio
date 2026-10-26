// Recruiter modal — a 60-second brief for hiring managers and recruiters.
// Contains a copyable recruiter packet, one-click resume download, and quick social links.
// Opened via the "For Recruiters" button in the hero and contact sections.

import { useState } from "react";
import { Check, Copy, Download, ExternalLink, Mail, Sparkles, X } from "lucide-react";
import { profile, socials } from "@/data/profile";
import { Amp, amp } from "@/utils/amp";

export function RecruiterModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [packetCopied, setPacketCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  if (!isOpen) return null;

  const recruiterPacket = `---
Candidate: Sagar Roka Chhetri (Full Stack Engineer)
Location: Kathmandu, Nepal (UTC+5:45)
Role Fit: Full Stack Engineer | React and TypeScript Frontend | Node.js and Python Backend
Education: Final-year B.C.E. Computer Engineering, Cosmos College (Pokhara University)
High School: +2 Science, Milestone International College (3.78 GPA, Top 10% in Nepal)
Current Role: Full Stack Developer at CodeRunners Technologies (equity-based, live MERN platform)
Key Projects:
- Signal Job Portal: Full-stack recruitment system I built solo (dual-role auth, PostgreSQL tsvector search). Got me hired.
- Namo Patro: GPL-3.0 Bikram Sambat calendar with 10-year round-trip accuracy. Open source.
- Janakpur Bolts Army: Live client project at boltsarmy.com. I was primary engineer.
- Nova DVR and AI tools: Media pipelines built with Python, Flask, FFmpeg, and LangGraph.
Resume: ${profile.resume}
GitHub: https://github.com/sc8134
LinkedIn: https://www.linkedin.com/in/sagar-rc
Email: sc81341@gmail.com
Status: Open to full-time roles, internships, and remote engineering work
---`;

  // --- Clipboard helpers ---
  async function copyPacket() {
    try {
      await navigator.clipboard.writeText(recruiterPacket);
      setPacketCopied(true);
      setTimeout(() => setPacketCopied(false), 2000);
    } catch {
      setPacketCopied(false);
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      setEmailCopied(false);
    }
  }

  // --- JSX ---
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-brass/40 bg-surface p-4 shadow-2xl sm:p-6 mx-2 sm:mx-0">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-line pb-5">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-brass/30 bg-brass/10 px-3 py-1 text-xs font-medium text-brass">
              <Sparkles className="size-3.5" />
              <span>60-Second Recruiter Brief</span>
            </div>
            <h2 className="mt-3 font-display text-3xl font-normal text-fg sm:text-4xl">
              Sagar Roka Chhetri
            </h2>
            <p className="mt-1 text-sm text-muted">
              Full Stack Engineer from Kathmandu, Nepal (UTC+5:45). Open to work.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-9 place-items-center rounded-full border border-line text-muted hover:text-fg hover:border-brass transition-colors"
            aria-label="Close recruiter brief"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Quick Value Propositions */}
        <div className="mt-6 space-y-6">
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
            <div className="rounded-xl border border-line bg-surface-2 p-4">
              <span className="block text-xs uppercase tracking-wider text-muted">Role Fit</span>
              <span className="mt-1 block font-medium text-fg">Full Stack / Frontend</span>
              <span className="mt-1 block text-xs text-muted">React, TypeScript, Node.js, Python</span>
            </div>
            <div className="rounded-xl border border-line bg-surface-2 p-4">
              <span className="block text-xs uppercase tracking-wider text-muted">Availability</span>
              <span className="mt-1 block font-medium text-emerald-400">Immediate Start</span>
              <span className="mt-1 block text-xs text-muted">Full-time, Internships, Remote</span>
            </div>
            <div className="rounded-xl border border-line bg-surface-2 p-4">
              <span className="block text-xs uppercase tracking-wider text-muted">Education <Amp /> GPA</span>
              <span className="mt-1 block font-medium text-fg">BCE Comp Eng (2026)</span>
              <span className="mt-1 block text-xs text-muted">+2 GPA 3.78 (Top 10% in Nepal)</span>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-brass">
              Why I am a high-value engineering hire
            </h3>
            <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-fg">
              <li className="flex items-start gap-2.5">
                <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-brass/20 text-brass text-xs">✓</span>
                <span>
                  <strong>I build the whole thing myself.</strong> 8 full-stack applications shipped from scratch: schema, auth, frontend, and deployment. No starter templates.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-brass/20 text-brass text-xs">✓</span>
                <span>
                  <strong>Production experience.</strong> Currently running a live MERN platform at CodeRunners Technologies. I own the admin dashboard, cPanel hosting, SMTP, and SQL data layer.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-brass/20 text-brass text-xs">✓</span>
                <span>
                  <strong>Signal Job Portal is the proof.</strong> I built a full dual-role recruitment system solo: PostgreSQL tsvector search, role-based JWT auth. It is what got me my first engineering job.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-brass/20 text-brass text-xs">✓</span>
                <span>
                  <strong>Remote-ready.</strong> Kathmandu (UTC+5:45). Good overlap with Europe and US East Coast. Async-first and git-driven.
                </span>
              </li>
            </ul>
          </div>

          {/* Interactive Candidate Fit Checker */}
          <div className="rounded-xl border border-brass/30 bg-brass/5 p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-brass font-semibold">
                Interactive Hiring Fit Checker
              </span>
              <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-xs text-emerald-400 font-mono font-medium">
                100% Verified Match
              </span>
            </div>
            <p className="text-xs text-muted">
              Select what your team needs right now to verify alignment with Sagar's shipped work:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "React & TypeScript",
                "Full Stack Autonomy",
                "Node.js & PostgreSQL",
                "Python & AI Pipelines",
                "Immediate Availability",
                "Self-Reliant Builder",
              ].map((need) => (
                <span
                  key={need}
                  className="inline-flex items-center gap-1.5 rounded-full border border-brass/40 bg-surface px-3 py-1 text-xs text-fg shadow-xs"
                >
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                  <span>{amp(need)}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Quick Action Bar */}
          <div className="rounded-xl border border-line bg-bg p-4 sm:p-5">
            <h4 className="text-xs uppercase tracking-wider text-muted">
              One-Click Hiring Actions
            </h4>
            <div className="mt-3 flex flex-wrap gap-2.5">
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                download="Sagar_Roka_Chhetri_Resume.pdf"
                className="inline-flex items-center gap-2 rounded-full bg-brass px-4 py-2.5 text-xs font-medium text-ink hover:bg-brass-hover transition-colors"
              >
                <Download className="size-3.5" />
                <span>Download ATS Resume (PDF)</span>
              </a>

              <button
                type="button"
                onClick={copyPacket}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-2 px-4 py-2.5 text-xs font-medium text-fg hover:border-brass transition-colors"
              >
                {packetCopied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                <span>{packetCopied ? "Packet Copied!" : "Copy Recruiter Summary"}</span>
              </button>

              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-2 px-4 py-2.5 text-xs font-medium text-fg hover:border-brass transition-colors"
              >
                {emailCopied ? <Check className="size-3.5 text-emerald-400" /> : <Mail className="size-3.5" />}
                <span>{emailCopied ? "Email Copied!" : "Copy Email Address"}</span>
              </button>

              <a
                href="https://www.linkedin.com/in/sagar-rc"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-3.5 py-2.5 text-xs text-muted hover:text-fg hover:border-brass transition-colors"
              >
                <span>LinkedIn</span>
                <ExternalLink className="size-3" />
              </a>

              <a
                href="https://github.com/sc8134"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-3.5 py-2.5 text-xs text-muted hover:text-fg hover:border-brass transition-colors"
              >
                <span>GitHub</span>
                <ExternalLink className="size-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-xs text-muted">
          <span>Official email: sc81341@gmail.com</span>
          <button
            type="button"
            onClick={onClose}
            className="text-muted hover:text-fg transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}

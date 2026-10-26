// --- Project deep-dive modal ---
// Project deep-dive modal — shows architecture, trade-offs, metrics, and live demos
// for each project. Opened by clicking a project card or an orbiting satellite in the 3D canvas.

import { useState } from "react";
import { ArrowUpRight, Check, Copy, ExternalLink, Github, Layers, Sparkles, X } from "lucide-react";
import type { Project } from "@/data/profile";
import { NamoPatroWidget } from "./namo-patro-widget";
import { JobHuntAgentWidget } from "./jobhunt-agent-widget";

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  // --- Clipboard helper ---
  async function copyRepo() {
    if (!project?.repo) return;
    try {
      await navigator.clipboard.writeText(project.repo);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  // --- JSX ---
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-line bg-surface shadow-2xl mx-2 sm:mx-0">
        {/* Project Header Banner */}
        <div className="relative overflow-hidden border-b border-line bg-surface-2 p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-brass/15 px-3 py-1 text-xs font-medium text-brass">
                  {project.index} · {project.year}
                </span>
                {project.flags.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-line bg-surface px-2.5 py-0.5 text-xs text-muted"
                  >
                    {f}
                  </span>
                ))}
              </div>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl text-fg">
                {project.title}
              </h2>
              <p className="mt-2 text-base text-muted max-w-2xl">{project.tagline}</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="grid size-9 place-items-center rounded-full border border-line text-muted hover:text-fg hover:border-brass transition-colors shrink-0"
              aria-label="Close project inspection"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Action Links */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brass px-4 py-2 text-xs font-medium text-ink hover:bg-brass-hover transition-colors"
              >
                <span>Visit Live Application</span>
                <ArrowUpRight className="size-3.5" />
              </a>
            )}

            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-xs font-medium text-fg hover:border-brass transition-colors"
              >
                <Github className="size-3.5" />
                <span>GitHub Source</span>
              </a>
            )}

            {project.repo && (
              <button
                type="button"
                onClick={copyRepo}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-2 text-xs text-muted hover:text-fg transition-colors"
              >
                {copied ? <Check className="size-3 text-emerald-400" /> : <Copy className="size-3" />}
                <span>{copied ? "Copied" : "Copy Repo"}</span>
              </button>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Screenshot Showcase */}
          {project.image && (
            <div className="relative overflow-hidden rounded-xl border border-line bg-bg aspect-video max-h-[380px]">
              <img
                src={project.image}
                alt={`${project.title} preview`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            </div>
          )}

          {/* The Friction (Problem Statement) */}
          <div className="rounded-xl border border-brass/30 bg-brass/5 p-5">
            <span className="text-xs uppercase tracking-widest text-brass font-semibold">
              The Real Friction (Why Built)
            </span>
            <p className="mt-2 font-display text-xl sm:text-2xl italic text-fg leading-relaxed">
              "{project.why}"
            </p>
          </div>

          {/* Live Interactive Embeds */}
          {project.id === "namo-patro" && <NamoPatroWidget />}
          {project.id === "jobhunt-agent" && <JobHuntAgentWidget />}

          {/* Summary */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-muted font-semibold">
              Project Overview
            </h3>
            <p className="mt-2 text-base leading-relaxed text-muted">{project.summary}</p>
          </div>

          {/* Architecture Breakdown */}
          {project.architecture && (
            <div>
              <div className="flex items-center gap-2">
                <Layers className="size-4 text-brass" />
                <h3 className="text-xs uppercase tracking-widest text-brass font-semibold">
                  System Architecture & Stack Decisions
                </h3>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-line bg-surface-2 p-4">
                  <span className="block text-xs uppercase text-muted font-medium">Frontend</span>
                  <p className="mt-1.5 text-sm text-fg leading-relaxed">
                    {project.architecture.frontend}
                  </p>
                </div>
                <div className="rounded-xl border border-line bg-surface-2 p-4">
                  <span className="block text-xs uppercase text-muted font-medium">Backend & APIs</span>
                  <p className="mt-1.5 text-sm text-fg leading-relaxed">
                    {project.architecture.backend}
                  </p>
                </div>
                <div className="rounded-xl border border-line bg-surface-2 p-4">
                  <span className="block text-xs uppercase text-muted font-medium">Data Layer</span>
                  <p className="mt-1.5 text-sm text-fg leading-relaxed">
                    {project.architecture.database}
                  </p>
                </div>
                <div className="rounded-xl border border-line bg-surface-2 p-4">
                  <span className="block text-xs uppercase text-muted font-medium">Infrastructure</span>
                  <p className="mt-1.5 text-sm text-fg leading-relaxed">
                    {project.architecture.deployment}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Trade-offs & Engineering Thinking */}
          {project.tradeoffs && (
            <div className="rounded-xl border border-line bg-surface-2 p-5">
              <span className="text-xs uppercase tracking-widest text-muted font-semibold">
                Key Technical Trade-off
              </span>
              <p className="mt-2 text-sm leading-relaxed text-fg/90">
                {project.tradeoffs}
              </p>
            </div>
          )}

          {/* Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div>
              <span className="text-xs uppercase tracking-widest text-muted font-semibold">
                Key Metrics & Deliverables
              </span>
              <ul className="mt-3 grid gap-2 sm:grid-cols-3">
                {project.metrics.map((m) => (
                  <li
                    key={m}
                    className="flex items-center gap-2 rounded-lg border border-line bg-bg px-3.5 py-2.5 text-xs text-fg"
                  >
                    <span className="size-1.5 rounded-full bg-brass shrink-0" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Concrete Bullets */}
          <div>
            <span className="text-xs uppercase tracking-widest text-muted font-semibold">
              Core Capabilities Shipped
            </span>
            <ul className="mt-3 space-y-2">
              {project.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-muted">
                  <span className="mt-1.5 size-1.5 rounded-full bg-brass shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Pills */}
          <div>
            <span className="text-xs uppercase tracking-widest text-muted font-semibold">
              Technologies Used
            </span>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line bg-surface-2 px-3 py-1 text-xs font-medium text-fg"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-line bg-surface-2 px-6 py-4">
          <span className="text-xs text-muted">
            Every line written, tested, and deployed by me
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-brass/20 px-4 py-1.5 text-xs font-medium text-brass hover:bg-brass hover:text-ink transition-colors"
          >
            Close Deep Dive
          </button>
        </div>
      </div>
    </div>
  );
}

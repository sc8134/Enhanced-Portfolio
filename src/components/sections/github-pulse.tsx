// GitHub Pulse — LIVE engineering velocity + contribution heatmap for the
// portfolio owner. Fetches real GitHub data for the given user (default
// @sc8134) with no token, caches responses in localStorage for ~1h, and
// degrades gracefully (stale cache → error/retry) on rate limits.
//
// Data sources (all CORS-friendly, unauthenticated):
//   - api.github.com/users/:user            → profile + counts
//   - api.github.com/users/:user/repos       → stars, forks, languages
//   - api.github.com/users/:user/events      → recent public activity
//   - github-contributions-api.jogruber.de   → last-year contribution calendar
import { useCallback, useEffect, useMemo, useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import {
  Activity,
  AlertCircle,
  CircleDot,
  ExternalLink,
  GitBranch,
  GitCommit,
  GitFork,
  GitPullRequest,
  RefreshCw,
  Star,
  Tag,
} from "lucide-react";
import {
  bestDay,
  buildWeeks,
  computeStreaks,
  fetchContributions,
  fetchGithubEvents,
  fetchGithubRepos,
  fetchGithubUser,
  toActivity,
  topLanguages,
  totalContributions,
  totalStars,
  type ActivityItem,
  type Contribution,
  type FetchResult,
  type GithubEvent,
  type GithubEventType,
  type GithubRepo,
  type GithubUser,
} from "@/utils/github";
import { Amp } from "@/utils/amp";

const USERNAME_DEFAULT = "sc8134";

type Status = "loading" | "ready" | "error";

interface PulseState {
  status: Status;
  user: GithubUser | null;
  repos: GithubRepo[];
  events: GithubEvent[];
  contributions: Contribution[];
  stale: boolean;
  rateLimited: boolean;
  updatedAt: number;
  error: string | null;
}

// --- hooks -------------------------------------------------------------

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

function useCountUp(target: number, enabled: boolean, durationMs = 900): number {
  const [value, setValue] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!enabled) return;
    if (reduced || target <= 0) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, enabled, durationMs, reduced]);
  return value;
}

function useGithubPulse(username: string) {
  const [state, setState] = useState<PulseState>({
    status: "loading",
    user: null,
    repos: [],
    events: [],
    contributions: [],
    stale: false,
    rateLimited: false,
    updatedAt: 0,
    error: null,
  });

  const load = useCallback(async () => {
    setState((prev) => ({ ...prev, status: "loading", error: null }));

    let user: GithubUser | null = null;
    let repos: GithubRepo[] = [];
    let events: GithubEvent[] = [];
    let contributions: Contribution[] = [];
    let stale = false;
    let rateLimited = false;
    let updatedAt = 0;
    let anyOk = false;

    const absorb = <T,>(
      p: Promise<FetchResult<T>>,
      apply: (r: FetchResult<T>) => void,
    ): Promise<void> =>
      p
        .then((r) => {
          apply(r);
          anyOk = true;
          if (r.stale) stale = true;
          if (r.rateLimited) rateLimited = true;
          if (r.updatedAt > updatedAt) updatedAt = r.updatedAt;
        })
        .catch(() => {
          /* swallow — partial failures are handled below */
        });

    await Promise.all([
      absorb(fetchGithubUser(username), (r) => {
        user = r.data;
      }),
      absorb(fetchGithubRepos(username), (r) => {
        repos = r.data;
      }),
      absorb(fetchGithubEvents(username), (r) => {
        events = r.data;
      }),
      absorb(fetchContributions(username), (r) => {
        contributions = r.data.contributions;
      }),
    ]);

    if (!anyOk) {
      setState({
        status: "error",
        user: null,
        repos: [],
        events: [],
        contributions: [],
        stale: false,
        rateLimited: false,
        updatedAt: 0,
        error: "All requests failed — the anonymous API rate limit was likely hit with no cached data yet.",
      });
      return;
    }

    setState({
      status: "ready",
      user,
      repos,
      events,
      contributions,
      stale,
      rateLimited,
      updatedAt,
      error: null,
    });
  }, [username]);

  useEffect(() => {
    void load();
  }, [load]);

  return { state, reload: load };
}

// --- helpers -----------------------------------------------------------

function getColor(level: number): string {
  switch (level) {
    case 4:
      return "bg-brass shadow-sm shadow-brass/30";
    case 3:
      return "bg-amber-600/80";
    case 2:
      return "bg-amber-800/60";
    case 1:
      return "bg-amber-950/70 border border-amber-900/40";
    default:
      return "bg-surface-2/60";
  }
}

function activityIcon(type: GithubEventType) {
  switch (type) {
    case "PushEvent":
      return GitCommit;
    case "PullRequestEvent":
      return GitPullRequest;
    case "CreateEvent":
      return GitBranch;
    case "WatchEvent":
      return Star;
    case "ForkEvent":
      return GitFork;
    case "ReleaseEvent":
      return Tag;
    case "IssuesEvent":
      return CircleDot;
    default:
      return Activity;
  }
}

function formatDay(date: string): string {
  try {
    return format(new Date(date + "T00:00:00"), "d MMM yyyy");
  } catch {
    return date;
  }
}

// --- subcomponents -----------------------------------------------------

function StatCard({
  label,
  target,
  ready,
  hint,
}: {
  label: string;
  target: number;
  ready: boolean;
  hint?: string;
}) {
  const value = useCountUp(target, ready);
  return (
    <div className="rounded-xl border border-line bg-surface-2 p-3">
      <span className="text-[10px] uppercase text-muted font-medium">{label}</span>
      <p className="font-display text-lg text-fg mt-0.5 tabular-nums">{value.toLocaleString()}</p>
      {hint ? <span className="text-[10px] text-muted">{hint}</span> : null}
    </div>
  );
}

function VelocityPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-lg border border-line bg-surface/60 px-3 py-2">
      <span className="text-[10px] uppercase tracking-wide text-muted">{label}</span>
      <span className="font-display text-sm text-fg">{value}</span>
    </div>
  );
}

function ActivityRow({ item, index, reduced }: { item: ActivityItem; index: number; reduced: boolean }) {
  const Icon = activityIcon(item.type);
  let ago = "";
  try {
    ago = formatDistanceToNow(new Date(item.createdAt), { addSuffix: true });
  } catch {
    ago = "";
  }
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      className={`group flex items-center gap-3 rounded-lg border border-transparent px-2 py-2 hover:bg-surface-2 hover:border-line transition-colors ${!reduced ? "gp-slide-in" : ""}`}
      style={!reduced ? { animationDelay: `${Math.min(index * 90, 900)}ms` } : undefined}
    >
      <span className="grid size-7 shrink-0 place-items-center rounded-md border border-line bg-surface text-brass">
        <Icon className="size-3.5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-xs text-fg">
          <span className="text-brass font-medium">{item.repo}</span>
          <span className="text-muted"> · {item.detail}</span>
        </span>
        <span className="text-[10px] text-muted">{ago}</span>
      </span>
      <ExternalLink className="size-3 text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  );
}

function Skeleton({ reduced }: { reduced: boolean }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between gap-3 border-b border-line pb-4">
        <div className="h-6 w-64 rounded bg-surface-2 animate-pulse" />
        <div className="h-4 w-28 rounded bg-surface-2 animate-pulse" />
      </div>
      <div className="flex flex-wrap gap-1">
        {Array.from({ length: 52 }).map((_, w) => (
          <div key={w} className="flex flex-col gap-1">
            {Array.from({ length: 7 }).map((_, d) => (
              <span
                key={d}
                className="size-2.5 rounded-xs bg-surface-2 animate-pulse"
                style={!reduced ? { animationDelay: `${(w * 7 + d) * 6}ms` } : undefined}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 rounded-xl bg-surface-2 animate-pulse" />
        ))}
      </div>
    </div>
  );
}

// --- main component ----------------------------------------------------

export function GithubPulse({ username = USERNAME_DEFAULT }: { username?: string }) {
  const { state, reload } = useGithubPulse(username);
  const reduced = useReducedMotion();

  const weeks = useMemo(() => buildWeeks(state.contributions), [state.contributions]);
  const streaks = useMemo(() => computeStreaks(state.contributions), [state.contributions]);
  const yearTotal = useMemo(() => totalContributions(state.contributions), [state.contributions]);
  const peak = useMemo(() => bestDay(state.contributions), [state.contributions]);
  const stars = useMemo(() => totalStars(state.repos), [state.repos]);
  const langs = useMemo(() => topLanguages(state.repos, 2), [state.repos]);
  const activity = useMemo(() => toActivity(state.events, 6), [state.events]);

  const ready = state.status === "ready";
  let updatedLabel = "";
  if (state.updatedAt > 0) {
    try {
      updatedLabel = formatDistanceToNow(new Date(state.updatedAt), { addSuffix: true });
    } catch {
      updatedLabel = "";
    }
  }

  if (state.status === "loading") return <Skeleton reduced={reduced} />;

  if (state.status === "error") {
    return (
      <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
          <div className="flex items-center gap-2.5">
            <GitCommit className="size-4 text-brass" />
            <h3 className="font-display text-xl sm:text-2xl font-normal text-fg">
              Engineering Velocity <Amp /> Git Pulse
            </h3>
            <span className="rounded-full border border-brass/30 bg-brass/10 px-2.5 py-0.5 text-[10px] text-brass font-medium">
              @{username}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
          <AlertCircle className="size-8 text-muted" />
          <p className="text-sm text-muted max-w-sm">
            Live GitHub data couldn&apos;t load right now. This usually means the
            anonymous API rate limit was hit (60 requests/hour) — it resets shortly.
          </p>
          <button
            type="button"
            onClick={() => void reload()}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-2 px-4 py-2 text-xs text-fg hover:border-brass hover:text-brass transition-colors"
          >
            <RefreshCw className="size-3.5" />
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <div className="flex items-center gap-2.5">
          <GitCommit className="size-4 text-brass" />
          <h3 className="font-display text-xl sm:text-2xl font-normal text-fg">
            Engineering Velocity <Amp /> Git Pulse
          </h3>
          <span className="rounded-full border border-brass/30 bg-brass/10 px-2.5 py-0.5 text-[10px] text-brass font-medium">
            @{username}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-[11px] text-muted">
            <span className="size-1.5 rounded-full bg-emerald-400 pulse-dot" />
            {state.rateLimited ? "Cached · rate-limited" : state.stale ? "Cached" : "Live"}
            {updatedLabel ? <span className="text-muted/70"> · {updatedLabel}</span> : null}
          </span>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-brass transition-colors"
          >
            <span>View GitHub Profile</span>
            <ExternalLink className="size-3" />
          </a>
        </div>
      </div>

      {/* Contribution heatmap */}
      {weeks.length > 0 ? (
        <div className="overflow-x-auto pb-2 -mx-2 px-2">
          <div className="inline-flex flex-col gap-1" style={{ minWidth: "620px" }}>
            <div className="flex gap-1">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1">
                  {week.map((day, dIdx) => (
                    <div
                      key={dIdx}
                      title={
                        day
                          ? `${day.count} contribution${day.count === 1 ? "" : "s"} on ${formatDay(day.date)}`
                          : "No activity"
                      }
                      className={`size-2.5 rounded-xs transition-colors ${getColor(day?.level ?? 0)} ${!reduced ? "gp-cell-in" : ""}`}
                      style={
                        !reduced
                          ? { animationDelay: `${Math.min(wIdx * 10 + dIdx * 4, 1500)}ms` }
                          : undefined
                      }
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-[10px] text-muted pt-1">
              <span>
                {yearTotal.toLocaleString()} contributions in the last year
              </span>
              <div className="flex items-center gap-1.5">
                <span>Less</span>
                <span className="size-2 rounded-xs bg-surface-2" />
                <span className="size-2 rounded-xs bg-amber-950" />
                <span className="size-2 rounded-xs bg-amber-800" />
                <span className="size-2 rounded-xs bg-amber-600" />
                <span className="size-2 rounded-xs bg-brass" />
                <span>More</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-line bg-surface-2 p-4 text-xs text-muted">
          Contribution calendar unavailable — showing profile <Amp /> activity below.
        </div>
      )}

      {/* Count-up stat cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Public Repos" target={state.user?.public_repos ?? 0} ready={ready} hint="All live" />
        <StatCard label="Total Stars" target={stars} ready={ready} hint="Across repos" />
        <StatCard label="Followers" target={state.user?.followers ?? 0} ready={ready} hint="Community" />
        <StatCard label="Contributions" target={yearTotal} ready={ready} hint="Last 12 months" />
      </div>

      {/* Engineering velocity metrics */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 pt-1">
        <VelocityPill label="Current streak" value={`${streaks.current} day${streaks.current === 1 ? "" : "s"}`} />
        <VelocityPill label="Longest streak" value={`${streaks.longest} day${streaks.longest === 1 ? "" : "s"}`} />
        <VelocityPill
          label="Best day"
          value={peak ? `${peak.count} · ${format(new Date(peak.date + "T00:00:00"), "d MMM")}` : "—"}
        />
        <VelocityPill label="Top languages" value={langs.length > 0 ? langs.join(" · ") : "—"} />
      </div>

      {/* Live activity stream */}
      {activity.length > 0 ? (
        <div className={`pt-2 border-t border-line ${!reduced ? "gp-fade-in" : ""}`}>
          <div className="mb-2 flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-400 pulse-dot" />
            <span className="text-[11px] uppercase tracking-wide text-muted font-medium">
              Recent activity
            </span>
          </div>
          <div className="space-y-0.5">
            {activity.map((item, i) => (
              <ActivityRow key={item.id} item={item} index={i} reduced={reduced} />
            ))}
          </div>
        </div>
      ) : null}

      {/* Stale / rate-limit notice */}
      {state.rateLimited ? (
        <p className="text-[10px] text-muted/70 pt-1 border-t border-line">
          Showing cached data — the live feed hit GitHub&apos;s anonymous rate
          limit and will refresh automatically within the hour.
        </p>
      ) : null}
    </div>
  );
}

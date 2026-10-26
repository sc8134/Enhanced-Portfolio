// GitHub Pulse — live data client.
//
// All requests are unauthenticated (no token) so nothing secret is ever
// bundled into the static build. The GitHub REST API is rate-limited to
// 60 req/hr per IP when anonymous, so every response is cached in
// localStorage for ~1 hour and served stale when a fresh request fails
// or is rate-limited. The contribution heatmap comes from the public
// jogruber contributions API (CORS-friendly, used by react-github-calendar).

const API = "https://api.github.com";
const CONTRIB_API = "https://github-contributions-api.jogruber.de/v4";
const TTL = 60 * 60 * 1000; // 1 hour

// --- Types -------------------------------------------------------------

export interface GithubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  created_at: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  fork: boolean;
  updated_at: string;
  homepage: string | null;
}

export type GithubEventType =
  | "PushEvent"
  | "PullRequestEvent"
  | "CreateEvent"
  | "DeleteEvent"
  | "IssuesEvent"
  | "IssueCommentEvent"
  | "WatchEvent"
  | "ForkEvent"
  | "ReleaseEvent"
  | "PublicEvent";

export interface GithubEvent {
  id: string;
  type: GithubEventType;
  repo: { name: string };
  created_at: string;
  payload: {
    action?: string;
    ref?: string;
    ref_type?: string;
    commits?: { sha: string; message: string }[];
    pull_request?: { title: string; merged: boolean; html_url: string };
    issue?: { title: string; html_url: string };
  };
}

export interface Contribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionsResponse {
  total: Record<string, number>;
  contributions: Contribution[];
}

export interface ActivityItem {
  id: string;
  type: GithubEventType;
  repo: string;
  detail: string;
  createdAt: string;
  url: string;
}

// --- Cache -------------------------------------------------------------

interface CacheEntry<T> {
  data: T;
  ts: number;
}

function readCache<T>(key: string): CacheEntry<T> | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as CacheEntry<T>;
  } catch {
    return null;
  }
}

function writeCache<T>(key: string, entry: CacheEntry<T>): void {
  try {
    localStorage.setItem(key, JSON.stringify(entry));
  } catch {
    // storage full / unavailable — non-fatal, caching is best-effort
  }
}

export interface FetchResult<T> {
  data: T;
  stale: boolean;
  rateLimited: boolean;
  updatedAt: number;
}

/**
 * Fetch a JSON endpoint with localStorage caching. Returns fresh data when
 * available; otherwise serves the last cached value marked `stale`. Throws
 * only when there is no cached value AND the network request fails.
 */
async function cachedFetch<T>(
  cacheKey: string,
  url: string,
  init?: RequestInit,
): Promise<FetchResult<T>> {
  const key = `ghpulse:${cacheKey}`;
  const cached = readCache<T>(key);

  try {
    const res = await fetch(url, {
      ...init,
      headers: { Accept: "application/json", ...(init?.headers ?? {}) },
    });

    // 403 / 429 ⇒ GitHub rate-limited (or jogruber throttled).
    if (res.status === 403 || res.status === 429) {
      if (cached) {
        return { data: cached.data, stale: true, rateLimited: true, updatedAt: cached.ts };
      }
      throw new Error("rate-limited and no cached data available");
    }
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);

    const data = (await res.json()) as T;
    const ts = Date.now();
    writeCache(key, { data, ts });
    return { data, stale: false, rateLimited: false, updatedAt: ts };
  } catch (err) {
    // Network/parse error — fall back to cache if we have one.
    if (cached) {
      return { data: cached.data, stale: true, rateLimited: false, updatedAt: cached.ts };
    }
    throw err;
  }
}

// --- Fetchers ----------------------------------------------------------

export function fetchGithubUser(username: string): Promise<FetchResult<GithubUser>> {
  return cachedFetch<GithubUser>(
    `user:${username}`,
    `${API}/users/${encodeURIComponent(username)}`,
  );
}

export function fetchGithubRepos(username: string): Promise<FetchResult<GithubRepo[]>> {
  return cachedFetch<GithubRepo[]>(
    `repos:${username}`,
    `${API}/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100`,
  );
}

export function fetchGithubEvents(username: string): Promise<FetchResult<GithubEvent[]>> {
  return cachedFetch<GithubEvent[]>(
    `events:${username}`,
    `${API}/users/${encodeURIComponent(username)}/events?per_page=100`,
  );
}

export function fetchContributions(username: string): Promise<FetchResult<ContributionsResponse>> {
  return cachedFetch<ContributionsResponse>(
    `contrib:${username}`,
    `${CONTRIB_API}/${encodeURIComponent(username)}?y=last`,
  );
}

// --- Derivations -------------------------------------------------------

/** Build a Sunday-aligned weeks grid (columns = weeks, rows = Sun..Sat). */
export function buildWeeks(contributions: Contribution[]): (Contribution | null)[][] {
  if (contributions.length === 0) return [];
  const first = new Date(contributions[0].date + "T00:00:00");
  const lead = first.getDay(); // 0 = Sunday
  const flat: (Contribution | null)[] = [];
  for (let i = 0; i < lead; i++) flat.push(null);
  for (const c of contributions) flat.push(c);
  while (flat.length % 7 !== 0) flat.push(null);

  const weeks: (Contribution | null)[][] = [];
  for (let i = 0; i < flat.length; i += 7) weeks.push(flat.slice(i, i + 7));
  return weeks;
}

/** Current streak (consecutive active days ending at the most recent active day)
 *  and the longest streak within the dataset. */
export function computeStreaks(contributions: Contribution[]): { current: number; longest: number } {
  let longest = 0;
  let run = 0;
  for (const c of contributions) {
    if (c.count > 0) {
      run += 1;
      if (run > longest) longest = run;
    } else {
      run = 0;
    }
  }

  let current = 0;
  let k = contributions.length - 1;
  while (k >= 0 && contributions[k].count === 0) k -= 1; // ignore trailing zeros
  while (k >= 0 && contributions[k].count > 0) {
    current += 1;
    k -= 1;
  }
  return { current, longest };
}

/** Total contributions across the dataset (the last year). */
export function totalContributions(contributions: Contribution[]): number {
  return contributions.reduce((sum, c) => sum + c.count, 0);
}

/** Most active day in the dataset. */
export function bestDay(contributions: Contribution[]): Contribution | null {
  let best: Contribution | null = null;
  for (const c of contributions) {
    if (!best || c.count > best.count) best = c;
  }
  return best && best.count > 0 ? best : null;
}

/** Top languages by non-fork repo count. */
export function topLanguages(repos: GithubRepo[], limit = 2): string[] {
  const counts = new Map<string, number>();
  for (const r of repos) {
    if (r.fork || !r.language) continue;
    counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([lang]) => lang);
}

/** Total stars across all repos. */
export function totalStars(repos: GithubRepo[]): number {
  return repos.reduce((sum, r) => sum + r.stargazers_count, 0);
}

/** Transform raw events into a friendly activity feed. */
export function toActivity(events: GithubEvent[], limit = 6): ActivityItem[] {
  const seen = new Set<string>();
  const items: ActivityItem[] = [];
  for (const e of events) {
    if (items.length >= limit) break;
    const base = `https://github.com/${e.repo.name}`;
    let detail = "";
    let url = base;
    switch (e.type) {
      case "PushEvent":
        detail = `pushed ${e.payload.commits?.length ?? 1} commit${(e.payload.commits?.length ?? 1) === 1 ? "" : "s"}`;
        break;
      case "PullRequestEvent":
        detail = `${e.payload.action ?? "opened"} pull request`;
        if (e.payload.pull_request?.title) detail += ` · ${e.payload.pull_request.title}`;
        url = e.payload.pull_request?.html_url ?? base;
        break;
      case "CreateEvent":
        detail = `created ${e.payload.ref_type ?? "repository"}${e.payload.ref ? ` ${e.payload.ref}` : ""}`;
        break;
      case "DeleteEvent":
        detail = `deleted ${e.payload.ref_type ?? "branch"}${e.payload.ref ? ` ${e.payload.ref}` : ""}`;
        break;
      case "IssuesEvent":
        detail = `${e.payload.action ?? "opened"} issue`;
        if (e.payload.issue?.title) detail += ` · ${e.payload.issue.title}`;
        url = e.payload.issue?.html_url ?? base;
        break;
      case "IssueCommentEvent":
        detail = "commented on an issue";
        url = e.payload.issue?.html_url ?? base;
        break;
      case "WatchEvent":
        detail = "starred";
        break;
      case "ForkEvent":
        detail = "forked";
        break;
      case "ReleaseEvent":
        detail = "released";
        break;
      case "PublicEvent":
        detail = "open-sourced a repository";
        break;
      default:
        detail = String(e.type).replace(/Event$/, "").replace(/([A-Z])/g, " $1").trim().toLowerCase();
    }
    const key = `${e.id}:${detail}`;
    if (seen.has(key)) continue;
    seen.add(key);
    items.push({
      id: e.id,
      type: e.type,
      repo: e.repo.name,
      detail,
      createdAt: e.created_at,
      url,
    });
  }
  return items;
}

// Hero Terminal — exact sketch layout:
//
//  ┌──────────┬───────────────────────┬────────────────┐
//  │  VScode  │  code (typing)        │  direc icons   │  ← tab bar
//  ├──────────┴───────────────────────┴────────────────┤
//  │                                  │                │
//  │   Terminal  (npm run dev …)       │  Browser       │
//  │                                  │  output        │
//  └──────────────────────────────────┴────────────────┘
//
// Cycles through 4 real projects. Code animates like typing.
// Terminal shows real localhost output. Browser renders live app.

import { useState, useEffect, useRef } from "react";
import type { JSX } from "react";
import {
  Lock, RefreshCw, ChevronLeft, ChevronRight,
  Files, Search, GitBranch, Play, Settings, Package,
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────────

type ScriptType = "cmd" | "out" | "out-ok" | "out-info" | "out-dim" | "out-brand" | "out-warn" | "out-err" | "blank";

interface ScriptLine {
  type: ScriptType;
  text: string;
  ms?: number;
}

interface Project {
  id: string;
  label: string;
  icon: string;
  iconColor: string;
  file: string;
  lang: "TypeScript" | "Python";
  port: number;
  branch: string;
  url: string;
  code: string[];
  script: ScriptLine[];
  Preview: () => JSX.Element;
}

// ─── Mini browser apps ─────────────────────────────────────────────────────────

function SignalPreview() {
  const [query, setQuery] = useState("");
  const jobs = [
    { title: "Full Stack Engineer", co: "TechFlow Nepal", tag: "Full-time", tc: "#10b981" },
    { title: "Frontend Developer",  co: "Leapfrog",       tag: "Remote",    tc: "#3b82f6" },
    { title: "Python Backend Dev",  co: "Cotiviti",       tag: "Contract",  tc: "#f59e0b" },
    { title: "React Native Dev",    co: "Fusemachines",   tag: "Full-time", tc: "#10b981" },
  ];
  const list = query ? jobs.filter(j => j.title.toLowerCase().includes(query.toLowerCase())) : jobs;
  return (
    <div style={S.app("#07090d","#f0ede8")}>
      <div style={S.bar("#0f131a","#1c232e")}>
        <span style={{ fontWeight:800, color:"#d4a054", fontSize:11 }}>⚡ Signal Jobs</span>
        <span style={S.badge("#d4a054")}>Post a Job</span>
      </div>
      <div style={{ padding:"5px 8px", flexShrink:0 }}>
        <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search roles, skills…"
          style={{ width:"100%", padding:"3px 7px", background:"#0f131a", border:"1px solid #1c232e", borderRadius:5, color:"#f0ede8", fontSize:8, outline:"none", boxSizing:"border-box" }} />
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"0 8px 8px", display:"flex", flexDirection:"column", gap:3 }}>
        {list.map(j=>(
          <div key={j.title} style={S.card("#0f131a","#1c232e")}>
            <div><div style={{ fontWeight:600, fontSize:8.5, marginBottom:1 }}>{j.title}</div><div style={{ color:"#9fa7b3", fontSize:7.5 }}>{j.co}</div></div>
            <span style={S.pill(j.tc)}>{j.tag}</span>
          </div>
        ))}
        {list.length===0 && <p style={{ color:"#9fa7b3", fontSize:8, textAlign:"center", padding:10 }}>No results</p>}
      </div>
    </div>
  );
}

function NovaDVRPreview() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(()=>{
    setPct(0); setDone(false);
    const id = setInterval(()=> setPct(p=>{ if(p>=100){clearInterval(id);setDone(true);return 100;} return p+1.5; }), 40);
    return ()=>clearInterval(id);
  },[]);
  const files = [
    { name:"react_hooks_tutorial.mp4", size:"128 MB", st: done?"✓": pct>30?"↓":"·" },
    { name:"nextjs_crash_course.webm", size:"84 MB",  st: done?"✓": pct>60?"↓":"·" },
    { name:"typescript_advanced.mp4",  size:"202 MB", st: done?"✓": pct>80?"↓":"·" },
  ];
  return (
    <div style={S.app("#0f0f0f","#f0f0f0")}>
      <div style={S.bar("#1a1a1a","#2a2a2a")}>
        <span style={{ fontWeight:800, color:"#2563eb", fontSize:11 }}>🎬 Nova DVR</span>
        <span style={{ fontSize:8, fontWeight:700, color: done?"#10b981":"#f59e0b" }}>{done?"✓ Done":`${Math.round(pct)}%`}</span>
      </div>
      <div style={{ padding:"5px 8px", flexShrink:0 }}>
        <div style={{ height:3, background:"#2a2a2a", borderRadius:2, overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${pct}%`, background:"linear-gradient(90deg,#2563eb,#60a5fa)", transition:"width 0.08s" }} />
        </div>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"0 8px 8px", display:"flex", flexDirection:"column", gap:3 }}>
        {files.map(f=>(
          <div key={f.name} style={S.card("#1a1a1a","#2a2a2a")}>
            <span style={{ fontSize:13 }}>🎬</span>
            <div style={{ flex:1, minWidth:0, overflow:"hidden" }}>
              <div style={{ fontSize:8, fontWeight:600, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{f.name}</div>
              <div style={{ color:"#9fa7b3", fontSize:7 }}>{f.size}</div>
            </div>
            <span style={{ fontWeight:700, fontSize:10, color: f.st==="✓"?"#10b981": f.st==="↓"?"#2563eb":"#555" }}>{f.st}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function NamoPaatroPreview() {
  const days = Array.from({length:30},(_,i)=>i+1);
  const today = 15;
  return (
    <div style={S.app("#0a0a0a","#f0f0f0")}>
      <div style={S.bar("#111","#222")}>
        <span style={{ fontWeight:800, color:"#059669", fontSize:11 }}>📅 Namo Patro</span>
        <span style={{ fontSize:8, color:"#9fa7b3" }}>२०८१ BS</span>
      </div>
      <div style={{ padding:"3px 8px", textAlign:"center", fontWeight:700, color:"#059669", fontSize:9, flexShrink:0 }}>
        Kartik 2081 — कार्तिक
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:1, padding:"0 6px", flexShrink:0 }}>
        {["S","M","T","W","T","F","S"].map((d,i)=>(
          <div key={i} style={{ textAlign:"center", fontSize:6.5, color:"#9fa7b3", padding:"1px 0" }}>{d}</div>
        ))}
        {[0,1,2].map(i=><div key={"e"+i}/>)}
        {days.map(d=>(
          <div key={d} style={{ textAlign:"center", fontSize:7.5, padding:"2px 1px", borderRadius:2,
            background: d===today?"#059669":"transparent",
            color: d===today?"#fff": d%7===0?"#ef4444":"#f0f0f0",
            fontWeight: d===today?700:400 }}>{d}</div>
        ))}
      </div>
      <div style={{ padding:"4px 8px", flex:1 }}>
        <div style={{ background:"#05966915", border:"1px solid #05966930", borderRadius:4, padding:"4px 7px", fontSize:7.5, color:"#34d399" }}>
          🎉 Tihar — Festival of Lights · Laxmi Puja
        </div>
      </div>
    </div>
  );
}

function VeloraPreview() {
  const [sel, setSel] = useState(0);
  const items = [
    { title:"Inception (2010)",       ico:"🎬", tag:"Sci-Fi",  pct:"98%" },
    { title:"Interstellar (2014)",    ico:"🚀", tag:"Drama",   pct:"94%" },
    { title:"The Dark Knight (2008)", ico:"🦇", tag:"Action",  pct:"91%" },
  ];
  return (
    <div style={S.app("#07070a","#f0ede8")}>
      <div style={S.bar("#0f0d14","#1c1828")}>
        <span style={{ fontWeight:800, color:"#8b5cf6", fontSize:11 }}>🎯 Velora</span>
        <span style={{ fontSize:8, color:"#9fa7b3" }}>AI Picks</span>
      </div>
      <div style={{ padding:"3px 8px", fontSize:7.5, color:"#9fa7b3", textTransform:"uppercase", letterSpacing:"0.4px", flexShrink:0 }}>
        Recommended for you
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"0 8px 8px", display:"flex", flexDirection:"column", gap:3 }}>
        {items.map((it,i)=>(
          <div key={it.title} onClick={()=>setSel(i)}
            style={{ ...S.card("#0f0d14","#1c1828"), border:`1px solid ${sel===i?"#8b5cf6":"#1c1828"}`,
              background: sel===i?"#1c182888":"#0f0d14", cursor:"pointer", gap:6 }}>
            <div style={{ width:24, height:24, borderRadius:5, background:"#8b5cf622", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, flexShrink:0 }}>{it.ico}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:8.5, fontWeight:600, marginBottom:1 }}>{it.title}</div>
              <div style={{ fontSize:7, color:"#9fa7b3" }}>{it.tag}</div>
            </div>
            <span style={{ fontSize:8, fontWeight:700, color:"#8b5cf6" }}>{it.pct}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Shared style helpers ──────────────────────────────────────────────────────

const S = {
  app: (bg: string, color: string) => ({
    fontFamily:"system-ui,sans-serif", background:bg, color, height:"100%",
    display:"flex", flexDirection:"column" as const, overflow:"hidden", fontSize:11,
    boxSizing:"border-box" as const,
  }),
  bar: (bg: string, border: string) => ({
    padding:"6px 10px", background:bg, borderBottom:`1px solid ${border}`,
    display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0,
  }),
  card: (bg: string, border: string) => ({
    background:bg, border:`1px solid ${border}`, borderRadius:6, padding:"5px 7px",
    display:"flex", alignItems:"center", justifyContent:"space-between",
    minWidth:0, overflow:"hidden",
  }),
  badge: (color: string) => ({
    padding:"2px 7px", background:color, color:"#000", borderRadius:3, fontSize:8, fontWeight:700,
  }),
  pill: (color: string) => ({
    padding:"1px 5px", borderRadius:20, fontSize:7.5, fontWeight:600,
    background:color+"22", color,
  }),
};

// ─── Projects ─────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id:"signal", label:"Signal Job Portal", icon:"⚡", iconColor:"#d97706",
    file:"src/lib/search.ts", lang:"TypeScript", port:5173, branch:"main",
    url:"https://signal.sagarrc.com.np",
    Preview: SignalPreview,
    code:[
      `// PostgreSQL tsvector full-text search`,
      `import { db } from "@/lib/db";`,
      `import type { Job } from "@/types";`,
      ``,
      `export async function searchJobs(`,
      `  q: string,`,
      `  role: "employer" | "seeker"`,
      `) {`,
      `  return db.query<Job>(`,
      "    `SELECT *,",
      `       ts_rank(search_vector, query) AS rank`,
      `     FROM jobs,`,
      `       plainto_tsquery('english',$1) query`,
      `     WHERE search_vector @@ query`,
      `       AND visible_to = $2`,
      "     ORDER BY rank DESC LIMIT 20`,",
      `    [q, role]`,
      `  );`,
      `}`,
    ],
    script:[
      { type:"cmd",     text:"pnpm build && pnpm test" },
      { type:"out-dim", text:"vite v6.3.2 building for production…" },
      { type:"out-ok",  text:"✓ 1,842 modules transformed." },
      { type:"out-dim", text:"dist/index.html          2.41 kB │ gzip  0.94 kB" },
      { type:"out-dim", text:"dist/assets/index.css   48.21 kB │ gzip  9.08 kB" },
      { type:"out-dim", text:"dist/assets/index.js   412.80 kB │ gzip 128.4 kB" },
      { type:"out-ok",  text:"✓ built in 4.32s" },
      { type:"blank",   text:"", ms:220 },
      { type:"out-ok",  text:"✓ 128 tests passed (3.84s)" },
      { type:"out-dim", text:"Test Files  12 passed (12) · Coverage 94.2%" },
      { type:"blank",   text:"", ms:220 },
      { type:"cmd",     text:"pnpm deploy --prod" },
      { type:"out-info",text:"▲ Uploading 18 assets to edge…" },
      { type:"out-brand", text:"✓ signal.sagarrc.com.np  live" },
      { type:"blank",   text:"", ms:200 },
      { type:"out-ok",  text:"GET  /api/jobs?q=react   200  47ms" },
      { type:"out-ok",  text:"GET  /api/jobs?q=python  200  41ms" },
      { type:"out-info",text:"POST /api/auth/login     200  12ms" },
    ],
  },
  {
    id:"nova", label:"Nova DVR", icon:"🎬", iconColor:"#2563eb",
    file:"pipeline/downloader.py", lang:"Python", port:8000, branch:"main",
    url:"https://nova.sagarrc.com.np",
    Preview: NovaDVRPreview,
    code:[
      `# Nova DVR — async download pipeline`,
      `import yt_dlp, asyncio`,
      `from pathlib import Path`,
      `from .tagger import tag_metadata`,
      ``,
      `async def download(`,
      `    url: str,`,
      `    fmt: str = "mp4"`,
      `) -> Path:`,
      `    opts = {`,
      `        "format": "bestvideo+bestaudio",`,
      `        "postprocessors": [{`,
      `            "key": "FFmpegVideoConvertor",`,
      `            "preferedformat": fmt,`,
      `        }],`,
      `    }`,
      `    with yt_dlp.YoutubeDL(opts) as ydl:`,
      `        info = ydl.extract_info(url)`,
      `        path = Path(ydl.prepare_filename(info))`,
      `    await tag_metadata(path, info)`,
      `    return path`,
    ],
    script:[
      { type:"cmd",     text:"pytest -q && docker compose up -d --build" },
      { type:"out-dim", text:"........................ 24 passed in 2.11s" },
      { type:"out-ok",  text:"✓ 24 passed · coverage 91%" },
      { type:"blank",   text:"", ms:200 },
      { type:"out",     text:"Building api · python:3.12-slim" },
      { type:"out-dim", text:"[3/5] COPY requirements.txt ./" },
      { type:"out-dim", text:"[4/5] RUN pip install -r requirements.txt" },
      { type:"out-dim", text:"[5/5] COPY app ./app" },
      { type:"out-ok",  text:"✓ Image nova-api:prod  184 MB" },
      { type:"blank",   text:"", ms:200 },
      { type:"out-ok",  text:"✓ nova-api-1     healthy  2.1s" },
      { type:"out-ok",  text:"✓ nova-worker-1  healthy  2.3s" },
      { type:"blank",   text:"", ms:200 },
      { type:"cmd",     text:"curl -s nova.sagarrc.com.np/health" },
      { type:"out-brand", text:'{"status":"ok","queue":0,"uptime":"31d"}' },
      { type:"out-info",text:"POST /download  202  job=8f21c9  queued" },
      { type:"out-ok",  text:"INFO  ffmpeg merge → mp4  128 MB done" },
    ],
  },
  {
    id:"namo", label:"Namo Patro", icon:"📅", iconColor:"#059669",
    file:"src/utils/bs-converter.ts", lang:"TypeScript", port:5174, branch:"main",
    url:"https://namo.sagarrc.com.np",
    Preview: NamoPaatroPreview,
    code:[
      `// Bikram Sambat ↔ Gregorian converter`,
      `// Verified vs Nepal Govt records`,
      `import { BS_MONTHS } from "@/data/calendar";`,
      ``,
      `export function bsToAd(`,
      `  year: number,`,
      `  month: number,`,
      `  day: number`,
      `): Date {`,
      `  // Epoch: 1 Baisakh 2000 = 13 Apr 1943`,
      `  let n = 0;`,
      `  for (let y = 2000; y < year; y++)`,
      `    for (let m = 0; m < 12; m++)`,
      `      n += BS_MONTHS[y][m];`,
      `  for (let m = 0; m < month-1; m++)`,
      `    n += BS_MONTHS[year][m];`,
      `  n += day - 1;`,
      `  const d = new Date(1943, 3, 13);`,
      `  d.setDate(d.getDate() + n);`,
      `  return d;`,
      `}`,
    ],
    script:[
      { type:"cmd",     text:"pnpm test:calendar && pnpm build" },
      { type:"out-dim", text:"RUN  v3.2.4  /Users/sagar/namo-patro" },
      { type:"out-ok",  text:"✓ bs-converter.test.ts  1,462 passed 1.84s" },
      { type:"out-ok",  text:"✓ 3,652 dates verified (2000–2081 BS)" },
      { type:"out-dim", text:"Test Files  9 passed (9) · Tests 1,462" },
      { type:"blank",   text:"", ms:200 },
      { type:"out",     text:"vite v6.3.2 building for production…" },
      { type:"out-ok",  text:"✓ 604 modules transformed." },
      { type:"out-dim", text:"dist/index.html         1.92 kB │ gzip 0.81 kB" },
      { type:"out-dim", text:"dist/assets/index.js  186.40 kB │ gzip 58.2 kB" },
      { type:"out-ok",  text:"✓ built in 2.61s" },
      { type:"blank",   text:"", ms:200 },
      { type:"cmd",     text:"rsync -az dist/ sagar@sagarrc.com.np:/var/www" },
      { type:"out-ok",  text:"✓ 14 files · 412 KB" },
      { type:"out-brand", text:"✓ namo.sagarrc.com.np  live" },
      { type:"blank",   text:"", ms:200 },
      { type:"out-ok",  text:"GET /api/calendar/2082/07  200  9ms" },
      { type:"out-info",text:"GET /api/panchang/today    200  14ms" },
    ],
  },
  {
    id:"velora", label:"Velora", icon:"🎯", iconColor:"#8b5cf6",
    file:"src/hooks/useMediaCatalog.ts", lang:"TypeScript", port:5175, branch:"main",
    url:"https://velora.sagarrc.com.np",
    Preview: VeloraPreview,
    code:[
      `// Velora — AI-powered media catalog`,
      `import { useState, useEffect } from "react";`,
      `import { vectorSearch } from "@/lib/embeddings";`,
      `import type { MediaItem } from "@/types";`,
      ``,
      `export function useMediaCatalog(`,
      `  query: string`,
      `) {`,
      `  const [results, setResults] =`,
      `    useState<MediaItem[]>([]);`,
      `  const [loading, setLoading] =`,
      `    useState(false);`,
      ``,
      `  useEffect(() => {`,
      `    if (!query.trim()) return;`,
      `    setLoading(true);`,
      `    vectorSearch(query)`,
      `      .then(setResults)`,
      `      .finally(() => setLoading(false));`,
      `  }, [query]);`,
      ``,
      `  return { results, loading };`,
      `}`,
    ],
    script:[
      { type:"cmd",     text:"pnpm build && pnpm deploy" },
      { type:"out",     text:"vite v6.3.2 building for production…" },
      { type:"out-ok",  text:"✓ 1,204 modules transformed." },
      { type:"out-dim", text:"dist/assets/index.css  36.80 kB │ gzip  7.2 kB" },
      { type:"out-dim", text:"dist/assets/index.js  298.10 kB │ gzip 96.3 kB" },
      { type:"out-ok",  text:"✓ built in 3.71s" },
      { type:"blank",   text:"", ms:200 },
      { type:"out-ok",  text:"✓ Embeddings index  1,204 items  2.4 MB" },
      { type:"out-ok",  text:"✓ 96 tests passed (2.02s)" },
      { type:"blank",   text:"", ms:200 },
      { type:"cmd",     text:"pnpm deploy --prod" },
      { type:"out-info",text:"▲ Uploading 22 assets to edge…" },
      { type:"out-brand", text:"✓ velora.sagarrc.com.np  live" },
      { type:"blank",   text:"", ms:200 },
      { type:"out-ok",  text:"GET /api/search?q=sci-fi  200  23ms" },
      { type:"out-info",text:"POST /api/index/rebuild    202  0.8ms" },
    ],
  },
];

// ─── Syntax highlight ──────────────────────────────────────────────────────────

type Token = { t: string; c: string };

function tokenize(line: string): Token[] {
  if (!line.trim()) return [{ t: " ", c: "inherit" }];
  if (/^\s*(\/\/|#)/.test(line)) return [{ t: line, c: "#6b7280" }];
  const out: Token[] = [];
  let rest = line;
  const rules: [RegExp, string][] = [
    [/^(`[^`]*`)/, "#a3e635"],
    [/^("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/, "#a3e635"],
    [/^(import|export|from|const|let|var|function|async|await|return|type|interface|class|new|void|of|in|if|for|def|with|async def)\b/, "#60a5fa"],
    [/^([A-Z][a-zA-Z0-9_]*)/, "#f472b6"],
    [/^(\d+)/, "#fb923c"],
    [/^([a-zA-Z_$][a-zA-Z0-9_$]*)/, "#dcdcaa"],
    [/^(\s+)/, "inherit"],
    [/^([^\s\w])/, "#9fa7b3"],
  ];
  while (rest.length) {
    let hit = false;
    for (const [re, c] of rules) {
      const m = rest.match(re);
      if (m) { out.push({ t: m[0], c }); rest = rest.slice(m[0].length); hit = true; break; }
    }
    if (!hit) { out.push({ t: rest[0], c: "#9fa7b3" }); rest = rest.slice(1); }
  }
  return out;
}

function termColor(type: ScriptType, brand: string) {
  if (type === "out-ok")   return "#34d399";
  if (type === "out-info") return "#60a5fa";
  if (type === "out-brand")return brand;
  if (type === "out-err")  return "#f87171";
  if (type === "out-warn") return "#fbbf24";
  if (type === "out-dim")  return "#6b7280";
  if (type === "cmd")      return "#d4a054";
  return "#a7b0bd";
}

function sleep(ms: number) { return new Promise<void>(r => setTimeout(r, ms)); }

// ─── Component ────────────────────────────────────────────────────────────────

const CHAR_MS = 14;
const LINE_MS = 65;

// Physical key that would produce each shifted symbol
const SHIFT_MAP: Record<string, string> = {
  "(": "9", ")": "0", "{": "[", "}": "]", ":": ";", '"': "'", ">": ".", "<": ",",
  "+": "=", "_": "-", "*": "8", "|": "\\", "!": "1", "&": "7", "$": "4", "#": "3",
  "@": "2", "?": "/", "~": "`", "%": "5", "^": "6",
};

const CODE_KEYS = "abcdefghijklmnopqrstuvwxyz0123456789,./;'[]\\=- ".split("");

export function HeroTerminal() {
  const [projIdx,     setProjIdx]     = useState(0);
  const [codeLines,   setCodeLines]   = useState(0);
  // char-by-char current line being typed
  const [typingLine,  setTypingLine]  = useState<{ text: string; lineIdx: number } | null>(null);
  const [termLines,   setTermLines]   = useState<{ text:string; type:ScriptType; done:boolean }[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [cursor,      setCursor]      = useState(true);
  const [phase,       setPhase]       = useState<"code"|"term"|"preview"|"pause">("code");
  const [pressedKey,  setPressedKey]  = useState<string | null>(null);
  const termRef   = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const stageRef  = useRef<HTMLDivElement>(null);
  const mountedRef= useRef(true);
  const runRef    = useRef(false);

  const proj = PROJECTS[projIdx];

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setCursor(c => !c), 530);
    return () => clearInterval(id);
  }, []);

  // Scroll terminal pane only — never the page
  useEffect(() => {
    const el = termRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [termLines]);

  // Keep the line being typed inside the editor viewport, like a real editor
  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    const active = Math.max(0, typingLine?.lineIdx ?? codeLines - 1);
    const lineEl = el.querySelector<HTMLElement>(`[data-line="${active}"]`);
    if (!lineEl) return;
    const bottom = lineEl.offsetTop + lineEl.offsetHeight;
    if (bottom > el.scrollTop + el.clientHeight - 2) {
      el.scrollTop = bottom - el.clientHeight + 20;
    }
  }, [codeLines, typingLine]);

  // Pointer parallax gives the scene real depth on desktop
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || still.matches) return;
    let frame = 0;
    const target = { x: 0, y: 0 };
    const apply = () => {
      frame = 0;
      el.style.setProperty("--ht-rx", `${(-target.y * 2.6).toFixed(2)}deg`);
      el.style.setProperty("--ht-ry", `${(target.x * 4.5).toFixed(2)}deg`);
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(apply); };
    const onMove = (e: PointerEvent) => {
      const b = el.getBoundingClientRect();
      target.x = Math.max(-1, Math.min(1, ((e.clientX - b.left) / b.width - 0.5) * 2));
      target.y = Math.max(-1, Math.min(1, ((e.clientY - b.top) / b.height - 0.5) * 2));
      queue();
    };
    const onLeave = () => { target.x = 0; target.y = 0; queue(); };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  // Press the physical key that would produce this character
  function flashKey(ch: string) {
    const shifted = SHIFT_MAP[ch];
    const k = (shifted ?? ch).toLowerCase();
    const key = !shifted && CODE_KEYS.includes(k) ? k : CODE_KEYS[Math.floor(Math.random() * 20)];
    setPressedKey(key);
    setTimeout(() => setPressedKey(null), 105);
  }

  function pressEnter() {
    setPressedKey("↵");
    setTimeout(() => setPressedKey(null), 130);
  }

  // Animation loop
  useEffect(() => {
    if (runRef.current) return;
    runRef.current = true;

    async function typeCodeLine(lineText: string, lineIdx: number) {
      // occasionally inject a typo + backspace correction
      const injectAt = lineText.length > 6 ? Math.floor(lineText.length * 0.6) : -1;
      let built = "";
      for (let c = 0; c < lineText.length; c++) {
        if (!mountedRef.current) return;
        // natural speed variation: 8–28ms per char
        const ms = 8 + Math.random() * 20;
        await sleep(ms);
        built += lineText[c];
        setTypingLine({ text: built, lineIdx });
        flashKey(lineText[c]);

        // inject typo
        if (c === injectAt && Math.random() < 0.35) {
          const typo = "qwerty"[Math.floor(Math.random() * 6)];
          built += typo;
          setTypingLine({ text: built, lineIdx });
          await sleep(60 + Math.random() * 60);
          // backspace
          built = built.slice(0, -1);
          setTypingLine({ text: built, lineIdx });
          setPressedKey("⌫");
          await sleep(80);
          setPressedKey(null);
        }
      }
      pressEnter();
      await sleep(60);
      setTypingLine(null);
    }

    async function runProject(p: Project, idx: number) {
      if (!mountedRef.current) return;
      setProjIdx(idx);
      setPhase("code");
      setCodeLines(0);
      setTypingLine(null);
      setTermLines([]);
      setShowPreview(false);

      // Phase 1 — type code line by line, char by char
      for (let i = 0; i < p.code.length; i++) {
        if (!mountedRef.current) return;
        await typeCodeLine(p.code[i], i);
        setCodeLines(i + 1);
        await sleep(40 + Math.random() * 30);
      }
      await sleep(500);
      if (!mountedRef.current) return;

      // Phase 2 — run the production build / test / deploy log
      setPhase("term");
      for (const item of p.script) {
        if (!mountedRef.current) return;
        if (item.type === "blank") {
          setTermLines(prev => [...prev, { text:"", type:"blank", done:true }]);
          await sleep(item.ms ?? LINE_MS);
          continue;
        }
        if (item.type === "cmd") {
          const full = "$ " + item.text;
          setTermLines(prev => [...prev, { text:"", type:"cmd", done:false }]);
          for (let i = 1; i <= full.length; i++) {
            if (!mountedRef.current) return;
            await sleep(7 + Math.random() * 13);
            flashKey(full[i - 1]);
            setTermLines(prev => {
              const next = [...prev];
              next[next.length-1] = { text:full.slice(0,i), type:"cmd", done:false };
              return next;
            });
          }
          setTermLines(prev => {
            const next = [...prev];
            next[next.length-1] = { ...next[next.length-1], done:true };
            return next;
          });
          pressEnter();
          await sleep(item.ms ?? 320);
        } else {
          // tool output is emitted as whole lines, like a real log stream
          setTermLines(prev => [...prev, { text:"  " + item.text, type:item.type, done:true }]);
          await sleep(item.ms ?? (item.type === "out-dim" ? 85 : 130));
        }
      }

      // Phase 3 — show browser
      await sleep(350);
      if (!mountedRef.current) return;
      setPhase("preview");
      setShowPreview(true);
      await sleep(4500);
    }

    async function loop() {
      let i = 0;
      while (mountedRef.current) {
        await runProject(PROJECTS[i], i);
        if (!mountedRef.current) return;
        setPhase("pause");
        await sleep(300);
        i = (i + 1) % PROJECTS.length;
      }
    }

    loop();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const PreviewComp = proj.Preview;
  const langColor = proj.lang === "TypeScript" ? "#3178c6" : "#3776ab";

  // ── Keyboard layout ──────────────────────────────────────────────────────────
  const KB_ROWS = [
    { keys: ["esc","F1","F2","F3","F4","","F5","F6","F7","F8","","F9","F10","F11","F12"], ws: [] as number[] },
    { keys: ["`","1","2","3","4","5","6","7","8","9","0","-","=","⌫"],          ws:[1,1,1,1,1,1,1,1,1,1,1,1,1,1.8]},
    { keys: ["⇥","q","w","e","r","t","y","u","i","o","p","[","]","\\"],         ws:[1.5,1,1,1,1,1,1,1,1,1,1,1,1,1.3]},
    { keys: ["⇪","a","s","d","f","g","h","j","k","l",";","'","↵"],              ws:[1.8,1,1,1,1,1,1,1,1,1,1,1,2.2]},
    { keys: ["⇧","z","x","c","v","b","n","m",",",".","/","⇧"],                  ws:[2.3,1,1,1,1,1,1,1,1,1,1,2.7]},
    { keys: ["fn","⌃","⌥","⌘"," ","⌘","⌥","◀","▲▼","▶"],                      ws:[1,1,1,1.3,5.5,1.3,1,0.9,0.9,0.9]},
  ];

  return (
    <div
      className="relative w-full flex items-end justify-center select-none"
      aria-hidden="true"
      style={{
        height: "clamp(510px, 58vw, 640px)",
        fontFamily: "'JetBrains Mono','Cascadia Code','Fira Code',monospace",
        overflow: "visible",
      }}
    >
      <style>{`
        @keyframes htFloat {
          0%,100% { transform: translate3d(0, 0, 0); }
          50%     { transform: translate3d(0, -11px, 0); }
        }
        @keyframes htShadow {
          0%,100% { transform: translateX(-50%) scaleX(1);   opacity: 0.78; }
          50%     { transform: translateX(-50%) scaleX(0.94); opacity: 0.56; }
        }
        @keyframes htGlow {
          0%,100% { opacity: 0.55; }
          50%     { opacity: 0.9; }
        }
        @keyframes htSheen {
          0%      { transform: translateX(-70%) rotate(8deg); }
          62%,100%{ transform: translateX(190%) rotate(8deg); }
        }
        @keyframes htSpin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) {
          .ht-float, .ht-shadow, .ht-glow, .ht-sheen { animation: none !important; }
        }
      `}</style>

      {/* Warm floor glow */}
      <div
        aria-hidden
        className="ht-glow"
        style={{
          position: "absolute", bottom: -2, left: "50%", transform: "translateX(-50%)",
          width: "78%", height: 112, pointerEvents: "none",
          background: `radial-gradient(ellipse at 50% 62%, ${proj.iconColor}2e 0%, rgba(212,160,84,0.09) 44%, transparent 74%)`,
          filter: "blur(34px)", animation: "htGlow 5.2s ease-in-out infinite",
        }}
      />

      {/* Contact shadow */}
      <div
        aria-hidden
        className="ht-shadow"
        style={{
          position: "absolute", bottom: 7, left: "50%", width: "72%", height: 24,
          pointerEvents: "none", animation: "htShadow 5.2s ease-in-out infinite",
          background: "radial-gradient(ellipse, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 46%, transparent 76%)",
          filter: "blur(13px)",
        }}
      />

      {/* Rim light behind the lid */}
      <div
        aria-hidden
        style={{
          position: "absolute", top: "5%", left: "50%", transform: "translateX(-50%)",
          width: "64%", height: 170, pointerEvents: "none", opacity: 0.65,
          background: "radial-gradient(ellipse at 50% 40%, rgba(212,160,84,0.15) 0%, transparent 68%)",
          filter: "blur(44px)",
        }}
      />

      <div
        ref={stageRef}
        style={{
          width: "min(100%, 594px)", marginBottom: 26,
          perspective: "1500px", perspectiveOrigin: "50% 32%", touchAction: "pan-y",
        }}
      >
        <div
          className="ht-float"
          style={{ animation: "htFloat 5.2s ease-in-out infinite", transformStyle: "preserve-3d" }}
        >
          <div
            style={{
              transformStyle: "preserve-3d",
              transform: "rotateX(calc(8.5deg + var(--ht-rx, 0deg))) rotateY(calc(-17deg + var(--ht-ry, 0deg)))",
              transition: "transform 320ms cubic-bezier(.2,.8,.2,1)",
              willChange: "transform",
            }}
          >
            <div style={{ position: "relative", transformStyle: "preserve-3d" }}>

              {/* Screen glow bloom behind the panel */}
              <div
                aria-hidden
                style={{
                  position: "absolute", inset: "-6% 3% 36%", pointerEvents: "none",
                  background: `radial-gradient(ellipse at 50% 38%, ${proj.iconColor}38 0%, transparent 66%)`,
                  filter: "blur(36px)", transform: "translateZ(-26px)", opacity: 0.8,
                }}
              />

              {/* ══════════════════ LID ══════════════════ */}
              <div
                style={{
                  transformOrigin: "bottom center",
                  transform: "rotateX(-25deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    padding: "10px 10px 0",
                    borderRadius: "17px 17px 4px 4px",
                    background:
                      "repeating-linear-gradient(90deg, rgba(255,255,255,0.016) 0 1px, rgba(0,0,0,0.012) 1px 2px), linear-gradient(152deg, #575c64 0%, #3b3f46 30%, #2c3036 66%, #212429 100%)",
                    border: "1px solid #5b606a",
                    borderBottom: "none",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.22), inset 1px 0 0 rgba(255,255,255,0.07), inset -1px 0 0 rgba(0,0,0,0.45), 0 -3px 20px rgba(0,0,0,0.55)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    aria-hidden
                    style={{
                      position: "absolute", inset: 1, borderRadius: "16px 16px 3px 3px",
                      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.045)", pointerEvents: "none",
                    }}
                  />

                  {/* Screen glass */}
                  <div
                    style={{
                      position: "relative", borderRadius: "8px 8px 0 0", overflow: "hidden",
                      background: "#04060a",
                      boxShadow: "0 0 0 1px #101318, inset 0 0 26px rgba(0,0,0,0.7)",
                      transform: "translateZ(1px)",
                    }}
                  >
                    {/* Notch + camera */}
                    <div
                      style={{
                        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                        width: 96, height: 15, background: "#04060a", zIndex: 10,
                        borderRadius: "0 0 9px 9px", display: "flex", alignItems: "center",
                        justifyContent: "center", gap: 5,
                        boxShadow: "0 1px 0 rgba(255,255,255,0.025)",
                      }}
                    >
                      <div
                        style={{
                          width: 5, height: 5, borderRadius: "50%",
                          background: "radial-gradient(circle at 35% 30%, #42536f, #0b1018 58%, #04060a)",
                          border: "0.5px solid #1e2733",
                          boxShadow: "inset 0 0 1.5px rgba(90,140,220,0.4)",
                        }}
                      />
                      <div style={{ width: 2, height: 2, borderRadius: "50%", background: "#1a2130" }} />
                    </div>

                    {/* ── VS Code surface ── */}
                    <div
                      style={{
                        display: "flex", flexDirection: "column", position: "relative",
                        height: "clamp(274px, 30vw, 348px)", background: "#1e1e1e",
                      }}
                    >
                      {/* Title bar */}
                      <div
                        style={{
                          height: 20, flexShrink: 0, display: "flex", alignItems: "center",
                          justifyContent: "space-between", gap: 6, padding: "0 8px",
                          background: "linear-gradient(180deg,#3a3d40,#323336)",
                          borderBottom: "1px solid #252526",
                        }}
                      >
                        <div style={{ display: "flex", gap: 4.5, flexShrink: 0 }}>
                          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, #ff8a80, #ff5f57 60%, #d33b34)" }} />
                          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, #ffd479, #febc2e 60%, #d99a12)" }} />
                          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, #6ee787, #28c840 60%, #149a2c)" }} />
                        </div>
                        <span
                          style={{
                            flex: 1, minWidth: 0, textAlign: "center", fontSize: 6.4,
                            color: "#b8bcc4", fontFamily: "system-ui,sans-serif",
                            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                          }}
                        >
                          {proj.file.split("/").pop()} — {proj.label}
                        </span>
                        <span style={{ fontSize: 6, color: "#7d838d", flexShrink: 0, letterSpacing: "0.04em" }}>
                          ⌘K
                        </span>
                      </div>

                      {/* Main row */}
                      <div style={{ display: "flex", flex: 1, minHeight: 0, overflow: "hidden" }}>

                        {/* Activity bar */}
                        <div
                          style={{
                            width: 27, flexShrink: 0, background: "#333333",
                            borderRight: "1px solid #252526", display: "flex",
                            flexDirection: "column", alignItems: "center", paddingTop: 4,
                          }}
                        >
                          {[
                            { icon: <Files size={9} strokeWidth={1.6} />, active: true },
                            { icon: <Search size={9} strokeWidth={1.6} />, active: false },
                            { icon: <GitBranch size={9} strokeWidth={1.6} />, active: false },
                            { icon: <Play size={9} strokeWidth={1.6} />, active: false },
                            { icon: <Package size={9} strokeWidth={1.6} />, active: false },
                          ].map((item, i) => (
                            <div
                              key={i}
                              style={{
                                position: "relative", width: 27, height: 25,
                                display: "grid", placeItems: "center",
                                color: item.active ? "#e5e7eb" : "#6f7681",
                              }}
                            >
                              {item.active && (
                                <span
                                  style={{
                                    position: "absolute", left: 0, top: 5, bottom: 5, width: 1.5,
                                    background: proj.iconColor, borderRadius: 2,
                                  }}
                                />
                              )}
                              {item.icon}
                            </div>
                          ))}
                          <div style={{ marginTop: "auto", marginBottom: 6, color: "#6f7681" }}>
                            <Settings size={9} strokeWidth={1.6} />
                          </div>
                        </div>

                        {/* Explorer */}
                        <div
                          style={{
                            width: 86, flexShrink: 0, background: "#252526",
                            borderRight: "1px solid #1e1e1e", overflow: "hidden", padding: "4px 0",
                          }}
                        >
                          <div
                            style={{
                              display: "flex", alignItems: "center", justifyContent: "space-between",
                              padding: "0 7px 3px", fontSize: 6, color: "#9aa0a8",
                              textTransform: "uppercase", letterSpacing: "0.09em",
                            }}
                          >
                            <span>Explorer</span><span style={{ opacity: 0.5 }}>···</span>
                          </div>
                          {[
                            { n: "src", d: 0, folder: true, open: true },
                            { n: "lib", d: 1, folder: true, open: true },
                            { n: proj.file.split("/").pop() ?? "index.ts", d: 2, active: true },
                            { n: "db.ts", d: 2 },
                            { n: "types", d: 1, folder: true },
                            { n: "tests", d: 0, folder: true },
                            { n: "search.test.ts", d: 1 },
                            { n: "package.json", d: 0 },
                            { n: "tsconfig.json", d: 0 },
                          ].map((f, i) => (
                            <div
                              key={i}
                              style={{
                                display: "flex", alignItems: "center", gap: 3,
                                padding: `0.5px 6px 0.5px ${6 + f.d * 9}px`,
                                fontSize: 6.4, lineHeight: "10px", whiteSpace: "nowrap",
                                color: f.active ? "#e5e7eb" : "#9aa0a8",
                                background: f.active ? "#2a2d2e" : "transparent",
                                fontWeight: f.active ? 600 : 400,
                                overflow: "hidden", textOverflow: "ellipsis",
                              }}
                            >
                              <span style={{ width: 5, flexShrink: 0, color: "#6f7681", fontSize: 5.5 }}>
                                {f.folder ? (f.open ? "▾" : "▸") : ""}
                              </span>
                              {f.active && (
                                <span style={{ width: 4, height: 4, borderRadius: 1, background: langColor, flexShrink: 0 }} />
                              )}
                              <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{f.n}</span>
                            </div>
                          ))}
                        </div>

                        {/* Editor column */}
                        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>

                          {/* Tabs */}
                          <div
                            style={{
                              height: 20, flexShrink: 0, display: "flex", alignItems: "stretch",
                              background: "#2d2d2d", borderBottom: "1px solid #252526",
                            }}
                          >
                            <div
                              style={{
                                display: "flex", alignItems: "center", gap: 4, padding: "0 7px",
                                background: "#1e1e1e", borderTop: `1.5px solid ${proj.iconColor}`,
                                borderRight: "1px solid #1e1e1e", fontSize: 6.5, color: "#d4d4d4",
                              }}
                            >
                              <span style={{ fontSize: 5.5, fontWeight: 800, color: langColor }}>
                                {proj.lang === "TypeScript" ? "TS" : "PY"}
                              </span>
                              <span style={{ maxWidth: 84, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                {proj.file.split("/").pop()}
                              </span>
                              <span style={{ width: 4, height: 4, borderRadius: "50%", background: proj.iconColor, flexShrink: 0 }} />
                              <span style={{ marginLeft: 2, color: "#6f7681", fontSize: 7 }}>×</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "0 7px", fontSize: 6.2, color: "#7c7c7c" }}>
                              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#4b5563" }} />
                              <span>index.ts</span>
                            </div>
                            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 3, padding: "0 6px", fontSize: 5.8, color: "#6f7681" }}>
                              <GitBranch size={6} /> <span>{proj.branch}</span>
                            </div>
                          </div>

                          {/* Breadcrumb */}
                          <div
                            style={{
                              height: 14, flexShrink: 0, display: "flex", alignItems: "center", gap: 3,
                              padding: "0 7px", fontSize: 6, color: "#8b949e",
                              background: "#1e1e1e", borderBottom: "1px solid #202124",
                            }}
                          >
                            <span>src</span><span style={{ opacity: 0.4 }}>›</span>
                            <span>lib</span><span style={{ opacity: 0.4 }}>›</span>
                            <span style={{ color: "#d4d4d4" }}>{proj.file.split("/").pop()}</span>
                            <span style={{ marginLeft: "auto", opacity: 0.55 }}>
                              {proj.lang === "TypeScript" ? "TS" : "PY"}
                            </span>
                          </div>

                          {/* Editor + minimap */}
                          <div style={{ display: "flex", flex: "0 0 46%", minHeight: 0, overflow: "hidden" }}>
                            <div
                              ref={editorRef}
                              style={{ flex: 1, minWidth: 0, overflow: "hidden", background: "#1e1e1e" }}
                            >
                              {proj.code.map((line, i) => {
                                const committed = i < codeLines;
                                const isTyping = typingLine?.lineIdx === i;
                                const displayText = isTyping ? typingLine!.text : (committed ? line : "");
                                const visible = committed || isTyping;
                                const isActive = (isTyping || i === codeLines - 1) && phase === "code";
                                return (
                                  <div
                                    key={`${proj.id}-${i}`}
                                    data-line={i}
                                    style={{
                                      display: "flex", alignItems: "flex-start",
                                      minHeight: 11, lineHeight: "11px",
                                      background: isActive ? "#264f7840" : "transparent",
                                      borderLeft: isActive ? `1.5px solid ${proj.iconColor}` : "1.5px solid transparent",
                                      opacity: visible ? 1 : 0.05,
                                    }}
                                  >
                                    <span
                                      style={{
                                        width: 19, flexShrink: 0, textAlign: "right", paddingRight: 5,
                                        fontSize: 5.8, lineHeight: "11px",
                                        color: isActive ? "#c8c8c8" : "#585858", userSelect: "none",
                                      }}
                                    >
                                      {i + 1}
                                    </span>
                                    <span
                                      style={{
                                        flex: 1, minWidth: 0, whiteSpace: "pre", overflow: "hidden",
                                        fontSize: 7.1, lineHeight: "11px", paddingLeft: 3, color: "#d4d4d4",
                                      }}
                                    >
                                      {visible
                                        ? tokenize(displayText).map((tk, ti) => (
                                            <span key={ti} style={{ color: tk.c }}>{tk.t}</span>
                                          ))
                                        : <span style={{ color: "#262626" }}>{line || " "}</span>}
                                      {isActive && (
                                        <span
                                          style={{
                                            display: "inline-block", width: 1.5, height: "0.92em",
                                            background: "#d4a054", opacity: cursor ? 1 : 0,
                                            verticalAlign: "text-bottom", marginLeft: 1,
                                            boxShadow: "0 0 5px rgba(212,160,84,0.7)",
                                          }}
                                        />
                                      )}
                                    </span>
                                    {isActive && (
                                      <span
                                        style={{
                                          flexShrink: 0, fontSize: 4.8, lineHeight: "11px",
                                          color: "#4b5563", paddingRight: 4, whiteSpace: "nowrap",
                                        }}
                                      >
                                        Sagar RC · now
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>

                            {/* Minimap */}
                            <div
                              style={{
                                width: 25, flexShrink: 0, background: "#1e1e1e",
                                borderLeft: "1px solid #252526", padding: "2px 0",
                                position: "relative", opacity: 0.55,
                              }}
                            >
                              {proj.code.map((line, i) => (
                                <div
                                  key={i}
                                  style={{
                                    height: 1.8, margin: "1px 2px",
                                    background: i < codeLines ? "#ffffff0a" : "transparent",
                                    borderRadius: 1, overflow: "hidden",
                                  }}
                                >
                                  {i < codeLines && (
                                    <div
                                      style={{
                                        height: "100%",
                                        width: `${Math.min(100, line.length * 2.2)}%`,
                                        background: i === codeLines - 1 ? proj.iconColor : "#ffffff18",
                                        borderRadius: 1,
                                      }}
                                    />
                                  )}
                                </div>
                              ))}
                              <div
                                style={{
                                  position: "absolute", top: "10%", left: 1, right: 1, height: "34%",
                                  border: "0.5px solid rgba(255,255,255,0.10)",
                                  background: "rgba(255,255,255,0.025)", borderRadius: 2,
                                }}
                              />
                            </div>
                          </div>

                          {/* Panel header */}
                          <div
                            style={{
                              height: 15, flexShrink: 0, display: "flex", alignItems: "stretch",
                              gap: 8, padding: "0 7px", background: "#252526",
                              borderTop: "1px solid #2d2d2d", borderBottom: "1px solid #181818",
                            }}
                          >
                            <span
                              style={{
                                display: "flex", alignItems: "center", fontSize: 5.8,
                                letterSpacing: "0.08em", color: "#e5e7eb",
                                borderBottom: "1px solid #c8c8c8",
                              }}
                            >
                              TERMINAL
                            </span>
                            <span style={{ display: "flex", alignItems: "center", fontSize: 5.8, color: "#6f7681" }}>OUTPUT</span>
                            <span style={{ display: "flex", alignItems: "center", fontSize: 5.8, color: "#6f7681" }}>PROBLEMS</span>
                            <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4, fontSize: 5.6, color: "#6f7681" }}>
                              <span style={{ color: proj.iconColor }}>zsh</span><span>⌘</span>
                            </span>
                          </div>

                          {/* Terminal log */}
                          <div
                            ref={termRef}
                            style={{
                              flex: 1, minHeight: 0, overflowY: "auto", padding: "4px 7px 6px",
                              background: "#0b0d11", fontSize: 6.5, lineHeight: 1.62,
                              boxShadow: "inset 0 1px 7px rgba(0,0,0,0.55)",
                            }}
                          >
                            <div style={{ color: "#3a4250", fontSize: 5.7, marginBottom: 2, userSelect: "none" }}>
                              Last login: {new Date().toDateString()} on ttys001
                            </div>
                            {termLines.map((line, i) => {
                              const isLast = i === termLines.length - 1;
                              const showCur = isLast && !line.done && phase === "term";
                              return (
                                <div
                                  key={i}
                                  style={{
                                    display: "flex", color: termColor(line.type, proj.iconColor),
                                    whiteSpace: "pre-wrap", wordBreak: "break-word",
                                  }}
                                >
                                  <span>{line.text}</span>
                                  {showCur && (
                                    <span
                                      style={{
                                        display: "inline-block", width: 4.5, height: "0.85em",
                                        background: "#d4a054", opacity: cursor ? 1 : 0,
                                        verticalAlign: "middle", marginLeft: 1, flexShrink: 0,
                                      }}
                                    />
                                  )}
                                </div>
                              );
                            })}
                            {(phase === "preview" || phase === "pause") && (
                              <div style={{ display: "flex", alignItems: "center", gap: 3, color: "#d4a054", marginTop: 3 }}>
                                <span>$</span>
                                <span
                                  style={{
                                    display: "inline-block", width: 4.5, height: "0.85em",
                                    background: "#d4a054", opacity: cursor ? 1 : 0,
                                    verticalAlign: "middle", boxShadow: "0 0 5px rgba(212,160,84,0.55)",
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Browser preview */}
                        <div
                          style={{
                            width: "38%", flexShrink: 0, display: "flex", flexDirection: "column",
                            borderLeft: "1px solid #252526", overflow: "hidden", background: "#1e1e1e",
                            minWidth: 0,
                          }}
                        >
                          <div
                            style={{
                              height: 18, flexShrink: 0, display: "flex", alignItems: "center",
                              gap: 2.5, padding: "0 5px", background: "#2d2d2d",
                              borderBottom: "1px solid #252526",
                            }}
                          >
                            <ChevronLeft size={7} style={{ color: "#4b5563" }} />
                            <ChevronRight size={7} style={{ color: "#4b5563" }} />
                            <RefreshCw size={6.5} style={{ color: "#6f7681" }} />
                            <div
                              style={{
                                flex: 1, minWidth: 0, display: "flex", alignItems: "center", gap: 3,
                                height: 13, padding: "0 4px", margin: "0 2px",
                                background: "#1a1d21", border: "1px solid #3a3f46", borderRadius: 4,
                              }}
                            >
                              <Lock size={5.5} style={{ color: showPreview ? "#34d399" : "#4b5563", flexShrink: 0 }} />
                              <span
                                style={{
                                  fontSize: 5.8, color: showPreview ? "#a7b0bd" : "#4b5563",
                                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                                }}
                              >
                                {showPreview ? proj.url.replace("https://", "") : "building…"}
                              </span>
                              {showPreview && (
                                <span
                                  style={{
                                    width: 4, height: 4, borderRadius: "50%", background: "#34d399",
                                    marginLeft: "auto", flexShrink: 0, boxShadow: "0 0 4px #34d399",
                                  }}
                                />
                              )}
                            </div>
                          </div>
                          <div style={{ flex: 1, position: "relative", minHeight: 0, overflow: "hidden", background: "#0d1117" }}>
                            {showPreview ? (
                              <div inert style={{ position: "absolute", inset: 0, pointerEvents: "none" }}><PreviewComp /></div>
                            ) : (
                              <div
                                style={{
                                  position: "absolute", inset: 0, display: "flex", flexDirection: "column",
                                  alignItems: "center", justifyContent: "center", gap: 5,
                                }}
                              >
                                <div
                                  style={{
                                    width: 13, height: 13, borderRadius: "50%",
                                    border: `1.5px solid ${proj.iconColor}33`,
                                    borderTopColor: proj.iconColor,
                                    animation: "htSpin 0.9s linear infinite",
                                  }}
                                />
                                <span style={{ fontSize: 5.8, color: "#4b5563" }}>deploying…</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Status bar */}
                      <div
                        style={{
                          height: 13, flexShrink: 0, display: "flex", alignItems: "center",
                          justifyContent: "space-between", padding: "0 7px",
                          background: "linear-gradient(180deg,#191d23,#12151a)",
                          borderTop: `1px solid ${proj.iconColor}55`,
                          color: "#8e98a6", fontSize: 5.7, fontWeight: 500,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                          <GitBranch size={6} style={{ color: proj.iconColor }} />
                          <span style={{ color: "#c2cad6" }}>{proj.branch}*</span>
                          <span style={{ opacity: 0.6 }}>↻</span>
                          <span style={{ opacity: 0.55 }}>0 ⚠ 0</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span>Ln {codeLines}, Col 1</span>
                          <span>UTF-8</span>
                          <span style={{ color: proj.iconColor }}>{proj.lang === "TypeScript" ? "TS 5.7" : "PY 3.12"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Glass reflections */}
                    <div
                      aria-hidden
                      style={{
                        position: "absolute", inset: 0, zIndex: 8, pointerEvents: "none",
                        borderRadius: "8px 8px 0 0", mixBlendMode: "screen",
                        background:
                          "linear-gradient(126deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.018) 17%, transparent 38%), radial-gradient(120% 60% at 72% -10%, rgba(255,255,255,0.055), transparent 60%)",
                      }}
                    />
                    <div
                      aria-hidden
                      className="ht-sheen"
                      style={{
                        position: "absolute", top: "-20%", left: 0, width: "26%", height: "140%",
                        zIndex: 9, pointerEvents: "none", mixBlendMode: "screen",
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
                        animation: "htSheen 9s ease-in-out infinite",
                      }}
                    />
                    <div
                      aria-hidden
                      style={{
                        position: "absolute", inset: 0, zIndex: 9, pointerEvents: "none",
                        borderRadius: "8px 8px 0 0",
                        boxShadow: "inset 0 0 26px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.025)",
                      }}
                    />
                  </div>

                  {/* Chin */}
                  <div style={{ height: 11, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span
                      style={{
                        fontSize: 4.3, letterSpacing: "0.24em", textTransform: "uppercase",
                        color: "rgba(255,255,255,0.15)", fontWeight: 500,
                      }}
                    >
                      MacBook Pro
                    </span>
                  </div>
                </div>
              </div>

              {/* ══════════════════ HINGE ══════════════════ */}
              <div
                style={{
                  height: 7, margin: "0 7px", display: "flex", alignItems: "stretch",
                  background: "linear-gradient(180deg,#1b1e23 0%,#2f333a 40%,#14171b 100%)",
                  borderLeft: "1px solid #4b5058", borderRight: "1px solid #4b5058",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), 0 2px 7px rgba(0,0,0,0.85)",
                }}
              >
                <div style={{ width: 58, borderRadius: "2px 0 0 2px", background: "linear-gradient(90deg,#101216,#3c4148 46%,#171a1f)" }} />
                <div style={{ flex: 1, background: "repeating-linear-gradient(90deg, rgba(255,255,255,0.035) 0 1px, transparent 1px 6px)" }} />
                <div style={{ width: 58, borderRadius: "0 2px 2px 0", background: "linear-gradient(270deg,#101216,#3c4148 46%,#171a1f)" }} />
              </div>

              {/* ══════════════════ BASE ══════════════════ */}
              <div
                style={{
                  position: "relative", marginTop: -1, padding: "10px 16px 18px",
                  borderRadius: "2px 2px 17px 17px",
                  background:
                    "repeating-linear-gradient(90deg, rgba(255,255,255,0.012) 0 1px, rgba(0,0,0,0.014) 1px 2px), linear-gradient(176deg, #4b4f57 0%, #383c43 30%, #2c3036 66%, #22252a 100%)",
                  border: "1px solid #575c65", borderTop: "none",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.16), inset 0 -3px 6px rgba(0,0,0,0.45), 0 26px 50px rgba(0,0,0,0.9)",
                }}
              >
                {/* Screen light spilling onto the deck */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute", top: 0, left: "12%", right: "12%", height: 64,
                    pointerEvents: "none", borderRadius: "0 0 50% 50%",
                    background: `linear-gradient(to bottom, ${proj.iconColor}26, transparent)`,
                    filter: "blur(10px)",
                  }}
                />

                {/* Right-side ports on the visible edge */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute", right: -4, top: 28, bottom: 36, width: 4,
                    borderRadius: "0 3px 3px 0",
                    background: "linear-gradient(90deg,#15181c,#42474f 55%,#1a1d22)",
                    boxShadow: "inset -1px 0 0 rgba(255,255,255,0.08)",
                  }}
                >
                  {[
                    { y: 10, h: 10, w: 1.5 },
                    { y: 28, h: 6, w: 1.5 },
                    { y: 42, h: 4, w: 1.5 },
                  ].map((p, i) => (
                    <div
                      key={i}
                      style={{
                        position: "absolute", right: 1, top: p.y, width: p.w, height: p.h,
                        borderRadius: 1, background: "#0a0c0f",
                        boxShadow: "inset 0 0 1px rgba(255,255,255,0.16)",
                      }}
                    />
                  ))}
                </div>

                {/* Speaker grilles */}
                {[9, undefined].map((left, i) => (
                  <div
                    key={i}
                    aria-hidden
                    style={{
                      position: "absolute", top: 16, bottom: 86,
                      ...(left !== undefined ? { left } : { right: 9 }),
                      width: 22, borderRadius: 5, opacity: 0.3,
                      backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.18) 0.55px, transparent 0.9px)",
                      backgroundSize: "3px 3px",
                      maskImage: "linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)",
                      WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)",
                    }}
                  />
                ))}

                {/* Keyboard well */}
                <div
                  style={{
                    position: "relative", margin: "0 26px", padding: "5px 6px 6px",
                    borderRadius: 7, background: "linear-gradient(180deg,#1a1d21,#23262b)",
                    boxShadow: "inset 0 2px 7px rgba(0,0,0,0.85), inset 0 -1px 0 rgba(255,255,255,0.035)",
                  }}
                >
                  {/* Keyboard backlight */}
                  <div
                    aria-hidden
                    style={{
                      position: "absolute", inset: 4, borderRadius: 5, pointerEvents: "none",
                      background: `radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.10) 0%, ${proj.iconColor}16 40%, transparent 76%)`,
                      filter: "blur(5px)",
                    }}
                  />

                  {/* Function row */}
                  <div style={{ position: "relative", display: "flex", gap: 2, marginBottom: 2 }}>
                    {KB_ROWS[0].keys.map((k, ki) => (
                      <div
                        key={ki}
                        style={{
                          flex: k === "" ? "0 0 4px" : 1,
                          height: 8.5, borderRadius: 2,
                          background: k === "" ? "transparent" : "linear-gradient(180deg,#3f434a,#2b2e34)",
                          border: k === "" ? "none" : "0.5px solid #555a63",
                          borderBottom: k === "" ? "none" : "1px solid #131519",
                          boxShadow: k === "" ? "none" : "inset 0 1px 0 rgba(255,255,255,0.07)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 4, color: "#77808d", fontFamily: "system-ui,sans-serif", userSelect: "none",
                        }}
                      >
                        {k}
                      </div>
                    ))}
                  </div>

                  {/* Main keys */}
                  {KB_ROWS.slice(1).map((row, ri) => (
                    <div key={ri} style={{ position: "relative", display: "flex", gap: 2, marginBottom: 2 }}>
                      {row.keys.map((k, ki) => {
                        const isPressed = pressedKey === k;
                        return (
                          <div
                            key={ki}
                            style={{
                              flex: row.ws[ki] ?? 1,
                              height: ri === KB_ROWS.length - 2 ? 15.5 : 15,
                              borderRadius: 3,
                              background: isPressed
                                ? `linear-gradient(180deg, ${proj.iconColor}44, #24272c)`
                                : "linear-gradient(180deg,#42464d 0%,#34383e 52%,#2a2d33 100%)",
                              border: `0.5px solid ${isPressed ? proj.iconColor + "88" : "#575c65"}`,
                              borderBottom: `1.5px solid ${isPressed ? proj.iconColor + "66" : "#14161a"}`,
                              boxShadow: isPressed
                                ? `inset 0 1px 2px rgba(0,0,0,0.7), 0 0 9px ${proj.iconColor}66`
                                : "inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 1px rgba(0,0,0,0.28)",
                              transform: isPressed ? "translateY(1px)" : "none",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: k.length > 1 ? 4.2 : 5.1,
                              color: isPressed ? "#fff" : "#98a1af",
                              fontFamily: "system-ui,sans-serif", userSelect: "none",
                              textShadow: isPressed ? `0 0 4px ${proj.iconColor}` : "none",
                              transition: "transform 60ms ease-out, background 60ms, border-color 60ms, box-shadow 60ms, color 60ms",
                            }}
                          >
                            {k === " " ? "" : k}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Trackpad */}
                <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
                  <div
                    style={{
                      width: 128, height: 56, borderRadius: 7, position: "relative", overflow: "hidden",
                      background: "linear-gradient(155deg,#3b3f46 0%,#2c2f35 45%,#23262b 100%)",
                      border: "0.5px solid #565b64",
                      boxShadow:
                        "inset 0 1px 2px rgba(255,255,255,0.08), inset 0 -2px 5px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.04)",
                    }}
                  >
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 36%)" }} />
                    <div style={{ position: "absolute", left: "6%", right: "6%", bottom: 3, height: 1, background: "rgba(255,255,255,0.05)" }} />
                  </div>
                </div>

                {/* Front lip */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute", left: 24, right: 24, bottom: 5, height: 1.5,
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.20), transparent)",
                  }}
                />
                <div
                  aria-hidden
                  style={{ position: "absolute", left: 20, right: 20, bottom: 2, height: 1, background: "rgba(0,0,0,0.55)" }}
                />

                {/* Embossed initials */}
                <div
                  style={{
                    position: "absolute", bottom: 8, right: 14, fontSize: 5.5,
                    letterSpacing: "0.2em", color: "rgba(212,160,84,0.10)", fontWeight: 600,
                  }}
                >
                  SRC
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project indicator dots */}
      <div
        style={{
          position: "absolute", bottom: 4, left: "50%", transform: "translateX(-50%)",
          display: "flex", alignItems: "center", gap: 5,
        }}
      >
        {PROJECTS.map((p, i) => (
          <div
            key={p.id}
            style={{
              height: 2.5, borderRadius: 99,
              width: i === projIdx ? 18 : 2.5,
              background: i === projIdx ? p.iconColor : "#2a313b",
              boxShadow: i === projIdx ? `0 0 8px ${p.iconColor}88` : "none",
              transition: "all 0.45s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

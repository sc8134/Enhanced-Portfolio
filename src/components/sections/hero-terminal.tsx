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
import { Lock, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface ScriptLine {
  type: "cmd" | "out" | "out-ok" | "out-warn" | "out-err" | "blank";
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
      { type:"cmd",    text:"npm run dev" },
      { type:"blank",  text:"" },
      { type:"out",    text:"  VITE v6.3.2  ready in 284 ms" },
      { type:"blank",  text:"" },
      { type:"out-ok", text:"  ➜  Local:   http://localhost:5173/" },
      { type:"out",    text:"  ➜  Network: http://192.168.1.10:5173/" },
      { type:"blank",  text:"", ms:500 },
      { type:"out-ok", text:"GET  /api/jobs?q=react   200  47ms" },
      { type:"out-ok", text:"GET  /api/jobs?q=python  200  41ms" },
      { type:"out",    text:"POST /api/auth/login     200  12ms" },
      { type:"out-ok", text:"GET  /api/jobs?q=node    200  38ms" },
    ],
  },
  {
    id:"nova", label:"Nova DVR", icon:"🎬", iconColor:"#2563eb",
    file:"pipeline/downloader.py", lang:"Python", port:8000, branch:"main",
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
      { type:"cmd",    text:"uvicorn app:main --port 8000 --reload" },
      { type:"out",    text:"INFO:     Uvicorn running on" },
      { type:"out-ok", text:"INFO:     http://127.0.0.1:8000" },
      { type:"out",    text:"INFO:     Started reloader process [21048]" },
      { type:"blank",  text:"", ms:400 },
      { type:"out-ok", text:'POST /download  202  {"job":"queued"}' },
      { type:"out",    text:"INFO:     Downloading: react_hooks_tutorial.mp4" },
      { type:"out",    text:"INFO:     [ffmpeg] Merging formats → mp4" },
      { type:"out-ok", text:"INFO:     Tagged metadata ✓  128 MB done" },
      { type:"out-ok", text:'POST /download  202  {"job":"queued"}' },
      { type:"out",    text:"INFO:     Downloading: nextjs_crash_course.webm" },
    ],
  },
  {
    id:"namo", label:"Namo Patro", icon:"📅", iconColor:"#059669",
    file:"src/utils/bs-converter.ts", lang:"TypeScript", port:5174, branch:"main",
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
      { type:"cmd",    text:"npm run dev" },
      { type:"blank",  text:"" },
      { type:"out",    text:"  VITE v6.3.2  ready in 301 ms" },
      { type:"blank",  text:"" },
      { type:"out-ok", text:"  ➜  Local:   http://localhost:5174/" },
      { type:"out",    text:"  ➜  Network: http://192.168.1.10:5174/" },
      { type:"blank",  text:"", ms:400 },
      { type:"cmd",    text:"npm run test:calendar" },
      { type:"out",    text:"Running BS ↔ AD round-trip suite…" },
      { type:"out-ok", text:"✓  3,652 dates verified  (2000–2081 BS)" },
      { type:"out-ok", text:"Test Suites: 1 passed  Time: 1.84s" },
    ],
  },
  {
    id:"velora", label:"Velora", icon:"🎯", iconColor:"#8b5cf6",
    file:"src/hooks/useMediaCatalog.ts", lang:"TypeScript", port:5175, branch:"main",
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
      { type:"cmd",    text:"npm run dev" },
      { type:"blank",  text:"" },
      { type:"out",    text:"  VITE v6.3.2  ready in 318 ms" },
      { type:"blank",  text:"" },
      { type:"out-ok", text:"  ➜  Local:   http://localhost:5175/" },
      { type:"out",    text:"  ➜  Network: http://192.168.1.10:5175/" },
      { type:"blank",  text:"", ms:400 },
      { type:"out-ok", text:"GET /api/search?q=sci-fi  200  23ms" },
      { type:"out-ok", text:"GET /api/catalog           200  11ms" },
      { type:"out",    text:"Embeddings model loaded ✓" },
      { type:"out-ok", text:"Vector index: 1,204 items ready" },
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

function termColor(type: string) {
  if (type === "out-ok")  return "#10b981";
  if (type === "out-err") return "#ef4444";
  if (type === "out-warn")return "#f59e0b";
  if (type === "cmd")     return "#d4a054";
  return "#9fa7b3";
}

function sleep(ms: number) { return new Promise<void>(r => setTimeout(r, ms)); }

// ─── Component ────────────────────────────────────────────────────────────────

const CHAR_MS = 14;
const LINE_MS = 65;

// Keys to flash during code typing
const CODE_KEYS = "abcdefghijklmnopqrstuvwxyz0123456789,./;'[]\\=- ".split("");

export function HeroTerminal() {
  const [projIdx,     setProjIdx]     = useState(0);
  const [codeLines,   setCodeLines]   = useState(0);
  // char-by-char current line being typed
  const [typingLine,  setTypingLine]  = useState<{ text: string; lineIdx: number } | null>(null);
  const [termLines,   setTermLines]   = useState<{ text:string; type:string; done:boolean }[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [cursor,      setCursor]      = useState(true);
  const [phase,       setPhase]       = useState<"code"|"term"|"preview"|"pause">("code");
  const [pressedKey,  setPressedKey]  = useState<string | null>(null);
  const termRef   = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  // Flash a random key briefly
  function flashKey(ch: string) {
    const k = ch.toLowerCase();
    const key = CODE_KEYS.includes(k) ? k : CODE_KEYS[Math.floor(Math.random() * 20)];
    setPressedKey(key);
    setTimeout(() => setPressedKey(null), 90);
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

      // Phase 2 — run terminal
      setPhase("term");
      for (const item of p.script) {
        if (!mountedRef.current) return;
        if (item.type === "blank") {
          setTermLines(prev => [...prev, { text:"", type:"blank", done:true }]);
          await sleep(item.ms ?? LINE_MS);
          continue;
        }
        const prefix = item.type === "cmd" ? "$ " : "  ";
        const full   = prefix + item.text;
        setTermLines(prev => [...prev, { text:"", type:item.type, done:false }]);
        for (let i = 1; i <= full.length; i++) {
          if (!mountedRef.current) return;
          const ms = item.type === "cmd" ? 8 + Math.random() * 18 : 4;
          await sleep(ms);
          if (item.type === "cmd") flashKey(full[i - 1]);
          setTermLines(prev => {
            const next = [...prev];
            next[next.length-1] = { text:full.slice(0,i), type:item.type, done:false };
            return next;
          });
        }
        setTermLines(prev => {
          const next = [...prev];
          next[next.length-1] = { ...next[next.length-1], done:true };
          return next;
        });
        await sleep(item.ms ?? LINE_MS);
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
    <div className="relative w-full flex items-end justify-center select-none"
      style={{
        height:"clamp(500px, 58vw, 620px)",
        fontFamily:"'JetBrains Mono','Cascadia Code','Fira Code',monospace",
        overflow:"visible",
      }}>

      {/* ── Keyframe definitions ── */}
      <style>{`
        @keyframes mbf {
          0%,100% { transform: translateY(0px)    rotateX(11deg) rotateY(-19deg); }
          50%      { transform: translateY(-16px)  rotateX(11deg) rotateY(-19deg); }
        }
        @keyframes mbs {
          0%,100% { transform:translateX(-50%) scaleX(1);    opacity:0.5; }
          50%      { transform:translateX(-50%) scaleX(0.78); opacity:0.22; }
        }
        @keyframes mgp {
          0%,100% { opacity:0.55; }
          50%      { opacity:1; }
        }
        @keyframes kpress {
          0%   { transform:translateY(0);    background:#1c232e; }
          40%  { transform:translateY(1.5px); background:#d4a05430; }
          100% { transform:translateY(0);    background:#1c232e; }
        }
        @keyframes scr {
          0%,100% { opacity:0.06; }
          50%      { opacity:0.12; }
        }
      `}</style>

      {/* Ground shadow */}
      <div className="absolute pointer-events-none" style={{
        bottom:8, left:"50%",
        width:"68%", height:22, borderRadius:"50%",
        background:"radial-gradient(ellipse,rgba(0,0,0,0.75) 0%,transparent 70%)",
        filter:"blur(12px)",
        animation:"mbs 3.8s ease-in-out infinite",
      }} />

      {/* Screen ambient glow — screen-color tinted */}
      <div className="absolute pointer-events-none" style={{
        bottom:60, left:"50%", transform:"translateX(-38%)",
        width:"52%", height:90,
        background:`radial-gradient(ellipse, ${proj.iconColor}20 0%, #d4a05418 40%, transparent 70%)`,
        filter:"blur(36px)",
        animation:"mgp 3.8s ease-in-out infinite",
      }} />

      {/* ── Perspective wrapper ── */}
      <div style={{ width:"min(100%,590px)", marginBottom:28, perspective:"1350px", perspectiveOrigin:"50% 42%" }}>

        {/* Floating + rotated scene */}
        <div style={{
          animation:"mbf 3.8s ease-in-out infinite",
          transformStyle:"preserve-3d",
          filter:"drop-shadow(0 36px 52px rgba(0,0,0,0.92)) drop-shadow(0 6px 14px rgba(212,160,84,0.07))",
        }}>

          {/* ══════════════════════════════════════════
              LID  — rotates backward from hinge
          ══════════════════════════════════════════ */}
          <div style={{ transformOrigin:"bottom center", transform:"rotateX(-27deg)", transformStyle:"preserve-3d" }}>

            {/* Outer shell — Space Gray aluminium */}
            <div style={{
              position:"relative",
              borderRadius:"14px 14px 0 0",
              overflow:"hidden",
              background:"linear-gradient(160deg, #3a3d42 0%, #2c2f34 40%, #26292d 100%)",
              border:"1px solid #4a4d52",
              borderBottom:"none",
              boxShadow:`
                inset 0 1px 0 rgba(255,255,255,0.12),
                inset -1px 0 0 rgba(255,255,255,0.04),
                inset 1px 0 0 rgba(255,255,255,0.04),
                -2px -2px 20px rgba(0,0,0,0.4)
              `,
            }}>

              {/* Apple logo area (subtle indent) */}
              <div style={{
                position:"absolute", top:8, left:"50%", transform:"translateX(-50%)",
                width:18, height:22, opacity:0.06,
                filter:"blur(0.5px)",
                fontFamily:"system-ui", fontSize:18, color:"#fff",
                display:"flex", alignItems:"center", justifyContent:"center",
                userSelect:"none", pointerEvents:"none",
              }}>🍎</div>

              {/* Screen bezel — deep black inset */}
              <div style={{
                margin:"8px 8px 0",
                borderRadius:"8px 8px 0 0",
                overflow:"hidden",
                background:"#070809",
                boxShadow:"inset 0 0 0 1px #111215, 0 0 0 1px #1c1e22",
                position:"relative",
              }}>

                {/* Notch */}
                <div style={{
                  position:"absolute", top:0, left:"50%", transform:"translateX(-50%)",
                  width:90, height:14, background:"#070809",
                  borderRadius:"0 0 10px 10px", zIndex:10,
                  display:"flex", alignItems:"center", justifyContent:"center", gap:6,
                }}>
                  <div style={{ width:5, height:5, borderRadius:"50%", background:"#1a1e24",
                    border:"1px solid #2a2e34", boxShadow:"inset 0 0 2px rgba(0,0,0,0.9)" }} />
                </div>

                {/* Subtle screen reflection sweep */}
                <div style={{
                  position:"absolute", top:0, left:"-20%", width:"50%", height:"100%",
                  background:"linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.022) 50%, transparent 70%)",
                  pointerEvents:"none", zIndex:9,
                  animation:"scr 6s ease-in-out infinite",
                }} />

                {/* ── VSCode UI ── */}
                <div style={{ display:"flex", flexDirection:"column", height:"clamp(268px,30vw,330px)", background:"#1e1e1e", position:"relative" }}>

                  {/* Title bar */}
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
                    borderBottom:"1px solid #252526", background:"#323233",
                    padding:"3px 10px", flexShrink:0 }}>
                    <div style={{ display:"flex", gap:5 }}>
                      <div style={{ width:10, height:10, borderRadius:"50%", background:"#ff5f57", boxShadow:"inset 0 0 0 0.5px rgba(0,0,0,0.2)" }} />
                      <div style={{ width:10, height:10, borderRadius:"50%", background:"#febc2e", boxShadow:"inset 0 0 0 0.5px rgba(0,0,0,0.2)" }} />
                      <div style={{ width:10, height:10, borderRadius:"50%", background:"#28c840", boxShadow:"inset 0 0 0 0.5px rgba(0,0,0,0.2)" }} />
                    </div>
                    <span style={{ fontSize:8, color:"#cccccc88", fontFamily:"system-ui,sans-serif" }}>
                      {proj.label} — Visual Studio Code
                    </span>
                    <span style={{ fontSize:8, color: proj.iconColor }}>{proj.icon}</span>
                  </div>

                  {/* Activity bar + content */}
                  <div style={{ display:"flex", flex:1, overflow:"hidden", minHeight:0 }}>

                    {/* Activity bar (leftmost icons) */}
                    <div style={{ width:32, flexShrink:0, background:"#333333",
                      borderRight:"1px solid #252526", display:"flex", flexDirection:"column",
                      alignItems:"center", paddingTop:6, gap:8 }}>
                      {["◫","⎇","🔍","⚙"].map((ic,i) => (
                        <div key={i} style={{ fontSize:i===0?11:9, color:i===0?"#cccccc":"#55555a",
                          cursor:"default", userSelect:"none" }}>{ic}</div>
                      ))}
                    </div>

                    {/* Sidebar — file tree */}
                    <div style={{ width:88, flexShrink:0, background:"#252526",
                      borderRight:"1px solid #1e1e1e", overflow:"hidden", padding:"4px 0" }}>
                      <div style={{ fontSize:7, color:"#bbbbbb88", padding:"0 6px 3px",
                        textTransform:"uppercase", letterSpacing:"0.08em", userSelect:"none" }}>Explorer</div>
                      {["src","  ├ components","  ├ hooks","  ├ utils","  └ data"].map((f,i) => (
                        <div key={i} style={{ fontSize:7, color: i===0?"#cccccc":"#9fa7b3",
                          padding:"0.5px 6px", whiteSpace:"nowrap", overflow:"hidden",
                          background: i===1?"#2a2d2e":"transparent",
                          fontWeight: i===0?600:400 }}>{f}</div>
                      ))}
                      <div style={{ marginTop:2, fontSize:7, color: langColor,
                        padding:"1px 6px", background:"#2a2d2e", display:"flex", alignItems:"center", gap:2 }}>
                        <span style={{ fontWeight:800, fontSize:6 }}>{proj.lang==="TypeScript"?"TS":"PY"}</span>
                        <span style={{ color:"#ccc", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                          {proj.file.split("/").pop()}
                        </span>
                      </div>
                    </div>

                    {/* Tab bar + editor + terminal */}
                    <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", minWidth:0 }}>

                      {/* Tab bar */}
                      <div style={{ display:"flex", alignItems:"stretch", background:"#2d2d2d",
                        borderBottom:"1px solid #252526", flexShrink:0, height:22 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:4, padding:"0 10px",
                          borderRight:"1px solid #1e1e1e", borderTop:`2px solid ${proj.iconColor}`,
                          background:"#1e1e1e", fontSize:7.5, color:"#cccccc" }}>
                          <span style={{ color:langColor, fontWeight:800, fontSize:6.5 }}>{proj.lang==="TypeScript"?"TS":"PY"}</span>
                          <span>{proj.file.split("/").pop()}</span>
                          <span style={{ width:5, height:5, borderRadius:"50%", background:proj.iconColor+"99",
                            display:"inline-block", marginLeft:2 }} />
                        </div>
                        <div style={{ display:"flex", alignItems:"center", gap:3, padding:"0 8px",
                          fontSize:7, color:"#cccccc30" }}>
                          <span>⎇</span><span>{proj.branch}</span>
                        </div>
                        <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:3,
                          padding:"0 6px", fontSize:6.5, color:"#cccccc18" }}>
                          <span>⊘ 0</span><span>⚠ 0</span>
                        </div>
                      </div>

                      {/* Editor + minimap row */}
                      <div style={{ display:"flex", flex:"0 0 44%", overflow:"hidden", minHeight:0 }}>

                        {/* Code editor */}
                        <div style={{ flex:1, overflow:"hidden", background:"#1e1e1e" }}>
                          {proj.code.map((line, i) => {
                            const committed = i < codeLines;
                            const isTyping  = typingLine?.lineIdx === i;
                            const displayText = isTyping ? typingLine!.text : (committed ? line : "");
                            const visible = committed || isTyping;
                            const isActive = (isTyping || i === codeLines - 1) && phase === "code";
                            return (
                              <div key={`${proj.id}-${i}`} style={{
                                display:"flex", alignItems:"flex-start",
                                opacity: visible ? 1 : 0.035,
                                background: isActive ? "#264f7820" : "transparent",
                                minHeight:"1.42em",
                              }}>
                                <span style={{ width:20, fontSize:7, lineHeight:"1.42em",
                                  color: isActive?"#5a7a8a":"#444", textAlign:"right",
                                  paddingRight:6, flexShrink:0, userSelect:"none" }}>{i+1}</span>
                                <span style={{ flex:1, whiteSpace:"pre", overflow:"hidden",
                                  fontSize:7, lineHeight:"1.42em", paddingLeft:4 }}>
                                  {visible
                                    ? tokenize(displayText).map((tk,ti) => (
                                        <span key={ti} style={{ color:tk.c }}>{tk.t}</span>
                                      ))
                                    : <span style={{ color:"#222" }}>{line||" "}</span>
                                  }
                                  {isActive && (
                                    <span style={{ display:"inline-block", width:1.5, height:"0.85em",
                                      background:"#aeafad", opacity:cursor?1:0,
                                      verticalAlign:"text-bottom", marginLeft:1 }} />
                                  )}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Minimap */}
                        <div style={{ width:28, flexShrink:0, background:"#1e1e1e",
                          borderLeft:"1px solid #252526", overflow:"hidden", opacity:0.45 }}>
                          {proj.code.map((line, i) => (
                            <div key={i} style={{ height:2.1, margin:"0 2px",
                              background: i < codeLines ? "#ffffff0a" : "transparent",
                              borderRadius:1, overflow:"hidden" }}>
                              {i < codeLines && (
                                <div style={{ height:"100%",
                                  width:`${Math.min(100, line.length * 2.2)}%`,
                                  background: i === codeLines-1 ? proj.iconColor+"60" : "#ffffff18",
                                  borderRadius:1 }} />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Terminal divider */}
                      <div style={{ height:15, flexShrink:0, background:"#2d2d2d",
                        borderTop:"1px solid #252526", borderBottom:"1px solid #1a1a1a",
                        display:"flex", alignItems:"center", gap:6, padding:"0 8px" }}>
                        <span style={{ fontSize:6.5, color:"#cccccc40", textTransform:"uppercase", letterSpacing:"0.06em" }}>Terminal</span>
                        <span style={{ fontSize:6.5, color:proj.iconColor+"66" }}>zsh</span>
                        <span style={{ marginLeft:"auto", fontSize:6, color:"#cccccc18" }}>sagar@mbp ~/{proj.id}</span>
                      </div>

                      {/* Terminal output */}
                      <div ref={termRef} style={{
                        flex:1, overflowY:"auto", padding:"4px 8px 4px",
                        background:"#0d0d0d", fontSize:7, lineHeight:"1.6", minHeight:0,
                      }}>
                        <div style={{ color:"#2a2a2a", fontSize:6.5, marginBottom:2, userSelect:"none" }}>
                          Last login: {new Date().toDateString()}
                        </div>
                        {termLines.map((line, i) => {
                          const isLast  = i === termLines.length - 1;
                          const showCur = isLast && !line.done && phase === "term";
                          return (
                            <div key={i} style={{ display:"flex", color:termColor(line.type),
                              whiteSpace:"pre-wrap", wordBreak:"break-all" }}>
                              <span>{line.text}</span>
                              {showCur && (
                                <span style={{ display:"inline-block", width:5, height:"0.85em",
                                  background:"#d4a054", opacity:cursor?1:0,
                                  verticalAlign:"middle", marginLeft:1, flexShrink:0 }} />
                              )}
                            </div>
                          );
                        })}
                        {(phase==="preview"||phase==="pause") && (
                          <div style={{ display:"flex", alignItems:"center", gap:2, color:"#d4a054", marginTop:2 }}>
                            <span>$ </span>
                            <span style={{ display:"inline-block", width:5, height:"0.85em",
                              background:"#d4a054", opacity:cursor?1:0, verticalAlign:"middle" }} />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* RIGHT — browser preview */}
                    <div style={{ width:"40%", flexShrink:0, display:"flex", flexDirection:"column",
                      borderLeft:"1px solid #252526", overflow:"hidden" }}>
                      {/* Browser chrome */}
                      <div style={{ display:"flex", alignItems:"center", gap:3, padding:"3px 6px",
                        background:"#2d2d2d", borderBottom:"1px solid #252526", flexShrink:0 }}>
                        {["◀","▶","↻"].map((ic,i) => (
                          <span key={i} style={{ fontSize:7, color:"#cccccc25", userSelect:"none" }}>{ic}</span>
                        ))}
                        <div style={{ flex:1, display:"flex", alignItems:"center", gap:3,
                          background:"#1a1a1a", border:"1px solid #333", borderRadius:4,
                          padding:"1px 5px", margin:"0 3px" }}>
                          <span style={{ fontSize:6, color:"#10b981", opacity:0.5 }}>🔒</span>
                          <span style={{ fontSize:6.5, fontFamily:"monospace",
                            color: showPreview?"#aaaaaa":"#2a2a2a",
                            overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                            {showPreview ? `localhost:${proj.port}` : "waiting…"}
                          </span>
                        </div>
                      </div>
                      {/* App */}
                      <div style={{ flex:1, overflow:"hidden", position:"relative", minHeight:0 }}>
                        {showPreview ? (
                          <div style={{ position:"absolute", inset:0 }}><PreviewComp /></div>
                        ) : (
                          <div style={{ position:"absolute", inset:0, display:"flex",
                            flexDirection:"column", alignItems:"center", justifyContent:"center", gap:5 }}>
                            <div style={{ width:14, height:14, borderRadius:"50%",
                              border:`2px solid ${proj.iconColor}33`,
                              borderTopColor:proj.iconColor,
                              animation:"spin 1s linear infinite" }} />
                            <span style={{ fontSize:6.5, color:"#2a2a2a", fontFamily:"monospace" }}>starting…</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status bar */}
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
                    padding:"0 8px", height:14, flexShrink:0,
                    background:proj.iconColor, color:"#000", fontWeight:600, fontSize:6.5 }}>
                    <div style={{ display:"flex", gap:6 }}>
                      <span>⎇ {proj.branch}</span>
                      <span style={{ opacity:0.5 }}>·</span>
                      <span style={{ opacity:0.65 }}>0 errors</span>
                    </div>
                    <div style={{ display:"flex", gap:5 }}>
                      <span>{proj.lang}</span>
                      <span style={{ opacity:0.5 }}>·</span>
                      <span>Ln {codeLines} Col 1</span>
                      <span style={{ opacity:0.5 }}>·</span>
                      <span>UTF-8</span>
                    </div>
                  </div>
                </div>{/* end VSCode */}

              </div>{/* end screen bezel inset */}

              {/* Bottom bezel */}
              <div style={{ height:8, background:"linear-gradient(to bottom,#26292d,#1e2124)",
                borderTop:"1px solid #1a1c1f" }} />

            </div>{/* end outer shell */}
          </div>{/* end lid rotateX */}

          {/* ══════════════════════════════════════════
              HINGE
          ══════════════════════════════════════════ */}
          <div style={{
            height:5, background:"linear-gradient(to bottom,#3a3d42,#26292d)",
            borderLeft:"1px solid #4a4d52", borderRight:"1px solid #4a4d52",
            boxShadow:"0 2px 8px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.06)",
          }} />

          {/* ══════════════════════════════════════════
              BASE / KEYBOARD DECK  — Space Gray
          ══════════════════════════════════════════ */}
          <div style={{
            position:"relative",
            background:"linear-gradient(175deg, #3a3d42 0%, #2e3136 45%, #26292d 100%)",
            border:"1px solid #4a4d52", borderTop:"none",
            borderRadius:"0 0 16px 16px",
            padding:"8px 14px 16px",
            boxShadow:`0 18px 50px rgba(0,0,0,0.95), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -2px 0 rgba(0,0,0,0.5)`,
          }}>

            {/* Fn row */}
            <div style={{ display:"flex", gap:2, marginBottom:3 }}>
              {KB_ROWS[0].keys.map((k,ki) => (
                <div key={ki} style={{
                  flex: k===""?"0 0 4px":1,
                  height:10, borderRadius:2,
                  background: k===""?"transparent":"linear-gradient(to bottom,#3c3f45,#30333a)",
                  border: k===""?"none":"1px solid #505460",
                  boxShadow: k===""?"none":"0 1px 0 #1a1c20, inset 0 1px 0 rgba(255,255,255,0.05)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:4.5, color:"#606878", fontFamily:"system-ui,sans-serif", userSelect:"none",
                }}>{k}</div>
              ))}
            </div>

            {/* Main key rows */}
            {KB_ROWS.slice(1).map((row, ri) => (
              <div key={ri} style={{ display:"flex", gap:2, marginBottom:2 }}>
                {row.keys.map((k, ki) => {
                  const isPressed = pressedKey === k || (pressedKey === " " && k === " ");
                  return (
                    <div key={ki} style={{
                      flex: row.ws[ki] ?? 1,
                      height: ri === KB_ROWS.length - 2 ? 17 : 17,
                      borderRadius:4,
                      background: isPressed
                        ? "linear-gradient(to bottom,#d4a05420,#1c232e)"
                        : "linear-gradient(to bottom,#3c3f45 0%,#2e3136 55%,#26292d 100%)",
                      border:`1px solid ${isPressed?"#d4a05440":"#505460"}`,
                      borderBottom:`${isPressed?"1px":"2px"} solid ${isPressed?"#d4a05430":"#1a1c20"}`,
                      boxShadow: isPressed
                        ? "inset 0 1px 0 rgba(212,160,84,0.15)"
                        : "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.2)",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize: k.length > 1 ? 4.5 : 5.5,
                      color: isPressed ? "#d4a054cc" : "#8892a0",
                      fontFamily:"system-ui,sans-serif", userSelect:"none",
                      transition:"background 0.05s, border-color 0.05s, color 0.05s",
                    }}>{k === " " ? "" : k}</div>
                  );
                })}
              </div>
            ))}

            {/* Trackpad */}
            <div style={{ display:"flex", justifyContent:"center", marginTop:7 }}>
              <div style={{
                width:112, height:64, borderRadius:8,
                background:"linear-gradient(158deg,#33363c,#28292e,#222428)",
                border:"1px solid #484c54",
                boxShadow:"inset 0 1px 4px rgba(0,0,0,0.7), inset 0 -0.5px 0 rgba(255,255,255,0.025)",
                position:"relative", overflow:"hidden",
              }}>
                <div style={{ position:"absolute", top:0, left:0, right:0, height:"38%",
                  background:"linear-gradient(to bottom,rgba(255,255,255,0.018),transparent)",
                  borderRadius:"8px 8px 0 0" }} />
                <div style={{ position:"absolute", bottom:0, left:"8%", right:"8%", height:1,
                  background:"rgba(72,76,84,0.6)" }} />
              </div>
            </div>

            {/* Embossed logo */}
            <div style={{
              position:"absolute", bottom:10, right:16,
              fontSize:7, fontFamily:"monospace", letterSpacing:"0.14em",
              color:"rgba(212,160,84,0.07)",
            }}>SRC</div>
          </div>{/* end base */}

        </div>{/* end scene rotation */}
      </div>{/* end perspective wrapper */}

      {/* Project indicator dots */}
      <div style={{
        position:"absolute", bottom:5, left:"50%", transform:"translateX(-50%)",
        display:"flex", alignItems:"center", gap:5,
      }}>
        {PROJECTS.map((p,i) => (
          <div key={p.id} style={{
            height:3, borderRadius:99,
            width: i===projIdx ? 16 : 3,
            background: i===projIdx ? p.iconColor : "#1c232e",
            transition:"all 0.4s ease",
          }} />
        ))}
      </div>
    </div>
  );
}

// Live Code Monitor — CSS 3D desktop workstation.
// Left pane: TypeScript/React source code (syntax highlighted, read-only).
// Right pane: the actual live React component rendered — same code that's shown.
// 4 tabs: E-Commerce, Job Board, Dashboard, SaaS Landing.

import { useState, useRef, useEffect } from "react";
import { Monitor, Play } from "lucide-react";

// ─── Mini site components (the actual live React apps) ─────────────────────────

function EcommerceApp() {
  const [cart, setCart] = useState<string[]>([]);
  const [toast, setToast] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const products = [
    { name: "Wireless Earbuds", price: "₹2,999", emoji: "🎧" },
    { name: "Mech Keyboard",    price: "₹5,499", emoji: "⌨️" },
    { name: "USB-C Hub",        price: "₹1,799", emoji: "🔌" },
    { name: "4K Webcam",        price: "₹7,999", emoji: "📷" },
  ];

  function addToCart(name: string) {
    setCart(c => [...c, name]);
    setToast("✓ " + name + " added!");
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  }

  return (
    <div style={{ fontFamily: "system-ui,sans-serif", background: "#0f0f0f", color: "#f0f0f0", fontSize: 12, height: "100%", overflow: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", background: "#1a1a1a", borderBottom: "1px solid #2a2a2a", position: "sticky", top: 0 }}>
        <span style={{ fontWeight: 800, color: "#f59e0b", fontSize: 13 }}>⚡ NOVA SHOP</span>
        <span style={{ background: "#f59e0b", color: "#000", border: "none", padding: "4px 10px", borderRadius: 5, fontWeight: 700, fontSize: 10 }}>
          🛒 Cart ({cart.length})
        </span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, padding: 10 }}>
        {products.map((p) => (
          <div key={p.name} style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8, overflow: "hidden" }}>
            <div style={{ height: 60, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, background: "#222" }}>
              {p.emoji}
            </div>
            <div style={{ padding: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 600, marginBottom: 2 }}>{p.name}</div>
              <div style={{ color: "#f59e0b", fontWeight: 700, fontSize: 11, marginBottom: 6 }}>{p.price}</div>
              <button
                onClick={() => addToCart(p.name)}
                style={{ width: "100%", padding: "4px 0", background: "#f59e0b", color: "#000", border: "none", borderRadius: 5, fontSize: 9, fontWeight: 700, cursor: "pointer" }}
              >
                + Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      {toastVisible && (
        <div style={{ position: "fixed", bottom: 10, right: 10, background: "#f59e0b", color: "#000", padding: "6px 10px", borderRadius: 7, fontSize: 10, fontWeight: 600 }}>
          {toast}
        </div>
      )}
    </div>
  );
}

function JobBoardApp() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [query, setQuery] = useState("");

  const jobs = [
    { title: "Full Stack Engineer", company: "TechFlow Nepal", emoji: "🚀", color: "#3b82f6", badge: "Full-time", badgeColor: "#10b981", skills: ["React", "Node.js", "PostgreSQL"] },
    { title: "Frontend Developer",  company: "Leapfrog",       emoji: "🦊", color: "#f59e0b", badge: "Full-time", badgeColor: "#10b981", skills: ["React", "TypeScript", "Tailwind"] },
    { title: "Python Backend Dev",  company: "Cotiviti",        emoji: "🐍", color: "#8b5cf6", badge: "Contract",  badgeColor: "#f59e0b", skills: ["Python", "FastAPI", "Docker"] },
    { title: "React Native Dev",    company: "Fusemachines",    emoji: "📱", color: "#ec4899", badge: "Remote",    badgeColor: "#3b82f6", skills: ["RN", "TypeScript", "Firebase"] },
  ];

  const filtered = query
    ? jobs.filter(j => j.title.toLowerCase().includes(query) || j.skills.some(s => s.toLowerCase().includes(query)))
    : jobs;

  return (
    <div style={{ fontFamily: "system-ui,sans-serif", background: "#07090d", color: "#f0ede8", fontSize: 12, height: "100%", overflow: "auto" }}>
      <div style={{ padding: "8px 12px", background: "#0f131a", borderBottom: "1px solid #1c232e", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0 }}>
        <span style={{ fontWeight: 800, color: "#d4a054", fontSize: 13 }}>⚡ Signal Jobs</span>
        <span style={{ padding: "4px 10px", background: "#d4a054", color: "#000", borderRadius: 5, fontSize: 9, fontWeight: 700 }}>Post a Job</span>
      </div>
      <div style={{ padding: "8px 12px" }}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value.toLowerCase())}
          placeholder="Search roles, skills..."
          style={{ width: "100%", padding: "6px 10px", background: "#0f131a", border: "1px solid #1c232e", borderRadius: 7, color: "#f0ede8", fontSize: 10, outline: "none" }}
        />
      </div>
      <div style={{ padding: "0 12px 12px", display: "flex", flexDirection: "column", gap: 6 }}>
        {filtered.length === 0 && <p style={{ color: "#9fa7b3", textAlign: "center", padding: 16, fontSize: 10 }}>No results</p>}
        {filtered.map((j, i) => (
          <div
            key={j.title}
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            style={{ background: "#0f131a", border: `1px solid ${openIdx === i ? "#d4a054" : "#1c232e"}`, borderRadius: 9, padding: 10, cursor: "pointer" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, background: j.color + "22", flexShrink: 0 }}>
                {j.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 10, marginBottom: 1 }}>{j.title}</div>
                <div style={{ color: "#9fa7b3", fontSize: 9 }}>{j.company}</div>
              </div>
              <span style={{ padding: "2px 6px", borderRadius: 20, fontSize: 8, fontWeight: 600, background: j.badgeColor + "22", color: j.badgeColor }}>
                {j.badge}
              </span>
            </div>
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" as const, marginTop: 6 }}>
              {j.skills.map(s => (
                <span key={s} style={{ padding: "1px 5px", background: "#161c24", borderRadius: 4, fontSize: 8, color: "#9fa7b3" }}>{s}</span>
              ))}
            </div>
            {openIdx === i && (
              <button
                onClick={e => { e.stopPropagation(); alert("Applied for: " + j.title + "!"); }}
                style={{ display: "block", width: "100%", marginTop: 8, padding: "5px 0", background: "#d4a054", color: "#000", border: "none", borderRadius: 6, fontWeight: 700, fontSize: 9, cursor: "pointer" }}
              >
                Apply Now →
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardApp() {
  const [counts, setCounts] = useState({ rev: 0, users: 0, orders: 0, bounce: 0 });

  useEffect(() => {
    const targets = { rev: 48291, users: 12847, orders: 3204, bounce: 34 };
    const steps = 60;
    let tick = 0;
    const id = setInterval(() => {
      tick++;
      const p = Math.min(tick / steps, 1);
      setCounts({
        rev:    Math.floor(targets.rev * p),
        users:  Math.floor(targets.users * p),
        orders: Math.floor(targets.orders * p),
        bounce: Math.floor(targets.bounce * p),
      });
      if (tick >= steps) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, []);

  const bars = [42, 58, 35, 71, 89, 64, 95];
  const days = ["M","T","W","T","F","S","S"];
  const barColors = ["#1c232e","#1c232e","#1c232e","#1c232e","#d4a054","#3b82f6","#10b981"];
  const max = Math.max(...bars);

  const stats = [
    { label: "Revenue",  value: "$" + counts.rev.toLocaleString(), color: "#d4a054" },
    { label: "Users",    value: counts.users.toLocaleString(),       color: "#3b82f6" },
    { label: "Orders",   value: counts.orders.toLocaleString(),      color: "#10b981" },
    { label: "Bounce",   value: counts.bounce + "%",                 color: "#ef4444" },
  ];

  return (
    <div style={{ fontFamily: "system-ui,sans-serif", background: "#07090d", color: "#f0ede8", fontSize: 12, height: "100%", overflow: "auto" }}>
      <div style={{ padding: "8px 12px", background: "#0f131a", borderBottom: "1px solid #1c232e", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0 }}>
        <span style={{ fontWeight: 800, color: "#d4a054", fontSize: 13 }}>📊 Analytics</span>
        <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 9, color: "#10b981" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
          Live
        </span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, padding: 10 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: "#0f131a", border: "1px solid #1c232e", borderRadius: 8, padding: 10 }}>
            <div style={{ color: "#9fa7b3", fontSize: 8, textTransform: "uppercase" as const, letterSpacing: ".5px", marginBottom: 3 }}>{s.label}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: "0 10px 10px" }}>
        <div style={{ fontSize: 8, textTransform: "uppercase" as const, letterSpacing: ".5px", color: "#9fa7b3", marginBottom: 6 }}>Weekly Revenue</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 50 }}>
          {bars.map((v, i) => (
            <div key={i} style={{ flex: 1, height: (v / max * 100) + "%", background: barColors[i], borderRadius: "2px 2px 0 0", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
              <span style={{ fontSize: 7, color: "#9fa7b3", paddingBottom: 2 }}>{days[i]}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "0 10px 10px" }}>
        <div style={{ fontSize: 8, textTransform: "uppercase" as const, letterSpacing: ".5px", color: "#9fa7b3", marginBottom: 6 }}>Recent Activity</div>
        {[
          { icon: "🛒", name: "Order #4821", time: "2 min ago", val: "+$289", vc: "#10b981" },
          { icon: "👤", name: "New signup",   time: "5 min ago", val: "+1",    vc: "#d4a054" },
          { icon: "✅", name: "Order shipped",time: "12 min ago",val: "Done",  vc: "#9fa7b3" },
        ].map(a => (
          <div key={a.name} style={{ display: "flex", alignItems: "center", gap: 7, background: "#0f131a", border: "1px solid #1c232e", borderRadius: 7, padding: "6px 8px", marginBottom: 5 }}>
            <span style={{ fontSize: 12 }}>{a.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 9, fontWeight: 500 }}>{a.name}</div>
              <div style={{ fontSize: 8, color: "#9fa7b3" }}>{a.time}</div>
            </div>
            <span style={{ fontSize: 9, fontWeight: 700, color: a.vc }}>{a.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SaasApp() {
  return (
    <div style={{ fontFamily: "system-ui,sans-serif", background: "#07090d", color: "#f0ede8", fontSize: 12, height: "100%", overflow: "auto" }}>
      <div style={{ padding: "8px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #1c232e", position: "sticky", top: 0, background: "#07090dcc", backdropFilter: "blur(8px)" }}>
        <span style={{ fontWeight: 800, color: "#d4a054", fontSize: 13 }}>⚡ FlowBase</span>
        <button onClick={() => alert("Starting trial!")} style={{ padding: "4px 10px", background: "#d4a054", color: "#000", border: "none", borderRadius: 6, fontSize: 10, fontWeight: 700, cursor: "pointer" }}>
          Get Started
        </button>
      </div>
      <div style={{ padding: "20px 14px 16px", textAlign: "center" as const }}>
        <div style={{ display: "inline-block", padding: "2px 10px", background: "#d4a05415", border: "1px solid #d4a05440", borderRadius: 20, fontSize: 9, color: "#d4a054", marginBottom: 10 }}>
          🚀 Now with AI features
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, lineHeight: 1.2, marginBottom: 8 }}>
          Build faster.<br /><span style={{ color: "#d4a054" }}>Ship with confidence.</span>
        </div>
        <div style={{ color: "#9fa7b3", fontSize: 10, lineHeight: 1.6, marginBottom: 14 }}>
          The all-in-one platform for developers to build, deploy, and scale modern apps.
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          <button onClick={() => alert("Free trial started!")} style={{ padding: "7px 14px", background: "#d4a054", color: "#000", border: "none", borderRadius: 7, fontWeight: 700, fontSize: 11, cursor: "pointer" }}>
            Start Free Trial
          </button>
          <button onClick={() => alert("Opening demo...")} style={{ padding: "7px 14px", background: "transparent", color: "#f0ede8", border: "1px solid #1c232e", borderRadius: 7, fontSize: 11, cursor: "pointer" }}>
            Live Demo →
          </button>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 20, padding: "10px 14px", borderTop: "1px solid #1c232e", borderBottom: "1px solid #1c232e", background: "#0f131a" }}>
        {[["50k+","Developers"],["99.9%","Uptime"],["2M+","Deploys"]].map(([v,l]) => (
          <div key={l} style={{ textAlign: "center" as const }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#d4a054" }}>{v}</div>
            <div style={{ fontSize: 8, color: "#9fa7b3" }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: "12px 12px", display: "flex", flexDirection: "column" as const, gap: 7 }}>
        {[
          { icon: "⚡", color: "#3b82f6", title: "Instant Deploys",  desc: "Push to deploy in seconds with zero-downtime rollbacks." },
          { icon: "🔐", color: "#d4a054", title: "Built-in Auth",    desc: "JWT, OAuth and 2FA out of the box — no config needed." },
          { icon: "📊", color: "#10b981", title: "Real-time Analytics",desc: "Performance metrics, error tracking, and user insights." },
        ].map(f => (
          <div key={f.title} style={{ display: "flex", gap: 9, alignItems: "flex-start", background: "#0f131a", border: "1px solid #1c232e", borderRadius: 9, padding: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, background: f.color + "20", flexShrink: 0 }}>
              {f.icon}
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 2 }}>{f.title}</div>
              <div style={{ fontSize: 9, color: "#9fa7b3", lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, padding: "0 12px 16px" }}>
        <div style={{ background: "#0f131a", border: "1px solid #1c232e", borderRadius: 9, padding: 11 }}>
          <div style={{ fontWeight: 700, fontSize: 11, marginBottom: 3 }}>Starter</div>
          <div style={{ fontSize: 17, fontWeight: 800, color: "#d4a054", marginBottom: 8 }}>$0<span style={{ fontSize: 9, color: "#9fa7b3", fontWeight: 400 }}>/mo</span></div>
          {["3 projects","1GB storage","Community support"].map(f => <div key={f} style={{ fontSize: 9, color: "#9fa7b3", marginBottom: 3 }}>✓ {f}</div>)}
          <button style={{ width: "100%", marginTop: 8, padding: "5px 0", background: "#1c232e", color: "#f0ede8", border: "none", borderRadius: 6, fontSize: 9, fontWeight: 700, cursor: "pointer" }}>Get Free</button>
        </div>
        <div style={{ background: "#0f131a", border: "1px solid #d4a054", borderRadius: 9, padding: 11, position: "relative" as const }}>
          <div style={{ position: "absolute" as const, top: -8, left: "50%", transform: "translateX(-50%)", background: "#d4a054", color: "#000", fontSize: 7, fontWeight: 700, padding: "2px 8px", borderRadius: 20, whiteSpace: "nowrap" as const }}>POPULAR</div>
          <div style={{ fontWeight: 700, fontSize: 11, marginBottom: 3 }}>Pro</div>
          <div style={{ fontSize: 17, fontWeight: 800, color: "#d4a054", marginBottom: 8 }}>$19<span style={{ fontSize: 9, color: "#9fa7b3", fontWeight: 400 }}>/mo</span></div>
          {["Unlimited projects","50GB storage","Priority support"].map(f => <div key={f} style={{ fontSize: 9, color: "#9fa7b3", marginBottom: 3 }}>✓ {f}</div>)}
          <button onClick={() => alert("Upgrading to Pro!")} style={{ width: "100%", marginTop: 8, padding: "5px 0", background: "#d4a054", color: "#000", border: "none", borderRadius: 6, fontSize: 9, fontWeight: 700, cursor: "pointer" }}>Upgrade</button>
        </div>
      </div>
    </div>
  );
}

// ─── TypeScript source code shown in the editor pane ──────────────────────────

const SOURCE_CODE: Record<string, string> = {
  ecommerce: `// E-Commerce Store — React + TypeScript
// Real state management, no HTML strings

function EcommerceApp() {
  const [cart, setCart] =
    useState<string[]>([]);
  const [toast, setToast] = useState("");
  const [visible, setVisible] =
    useState(false);

  const products = [
    { name: "Wireless Earbuds",
      price: "₹2,999", emoji: "🎧" },
    { name: "Mech Keyboard",
      price: "₹5,499", emoji: "⌨️" },
    { name: "USB-C Hub",
      price: "₹1,799", emoji: "🔌" },
    { name: "4K Webcam",
      price: "₹7,999", emoji: "📷" },
  ];

  function addToCart(name: string) {
    setCart(c => [...c, name]);
    setToast("✓ " + name + " added!");
    setVisible(true);
    setTimeout(() =>
      setVisible(false), 2000);
  }

  return (
    <div className="bg-[#0f0f0f]">
      <nav className="...">
        <span>⚡ NOVA SHOP</span>
        <span>🛒 Cart ({cart.length})</span>
      </nav>
      <div className="grid grid-cols-2">
        {products.map(p => (
          <ProductCard
            key={p.name}
            product={p}
            onAdd={addToCart}
          />
        ))}
      </div>
      {visible && (
        <Toast message={toast} />
      )}
    </div>
  );
}`,

  jobboard: `// Job Board — React + TypeScript
// Search filtering, expand/collapse cards

function JobBoardApp() {
  const [openIdx, setOpenIdx] =
    useState<number | null>(null);
  const [query, setQuery] =
    useState("");

  const jobs = [
    { title: "Full Stack Engineer",
      company: "TechFlow Nepal",
      badge: "Full-time",
      skills: ["React","Node.js","PostgreSQL"]
    },
    // ... more jobs
  ];

  const filtered = query
    ? jobs.filter(j =>
        j.title.toLowerCase()
          .includes(query) ||
        j.skills.some(s =>
          s.toLowerCase().includes(query))
      )
    : jobs;

  function toggle(i: number) {
    setOpenIdx(openIdx === i ? null : i);
  }

  return (
    <div className="bg-[#07090d]">
      <SearchBar
        value={query}
        onChange={setQuery}
      />
      <div className="flex flex-col gap-2">
        {filtered.map((job, i) => (
          <JobCard
            key={job.title}
            job={job}
            isOpen={openIdx === i}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>
    </div>
  );
}`,

  dashboard: `// Analytics Dashboard — React + TypeScript
// Animated counters, bar chart, live feed

function DashboardApp() {
  const [counts, setCounts] = useState({
    rev: 0, users: 0,
    orders: 0, bounce: 0,
  });

  // Animate counters on mount
  useEffect(() => {
    const targets = {
      rev: 48291, users: 12847,
      orders: 3204, bounce: 34,
    };
    const steps = 60;
    let tick = 0;

    const id = setInterval(() => {
      tick++;
      const p = Math.min(tick / steps, 1);
      setCounts({
        rev:    Math.floor(targets.rev * p),
        users:  Math.floor(targets.users * p),
        orders: Math.floor(targets.orders * p),
        bounce: Math.floor(targets.bounce * p),
      });
      if (tick >= steps) clearInterval(id);
    }, 16);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-[#07090d]">
      <StatGrid counts={counts} />
      <BarChart data={weeklyRevenue} />
      <ActivityFeed items={activity} />
    </div>
  );
}`,

  saas: `// SaaS Landing Page — React + TypeScript
// Hero, features, pricing — fully interactive

function SaasApp() {
  return (
    <div className="bg-[#07090d]">
      <nav className="sticky top-0
        backdrop-blur-md border-b
        border-line">
        <span className="text-brass
          font-bold">
          ⚡ FlowBase
        </span>
        <Button onClick={startTrial}>
          Get Started
        </Button>
      </nav>

      <Hero>
        <Badge>🚀 Now with AI features</Badge>
        <h1>Build faster.<br/>
          <span className="text-brass">
            Ship with confidence.
          </span>
        </h1>
        <ButtonGroup>
          <PrimaryButton>
            Start Free Trial
          </PrimaryButton>
          <SecondaryButton>
            Live Demo →
          </SecondaryButton>
        </ButtonGroup>
      </Hero>

      <Stats data={metrics} />
      <FeatureList features={features} />
      <PricingGrid plans={plans} />
    </div>
  );
}`,
};

// ─── Snippet metadata ──────────────────────────────────────────────────────────

interface Tab {
  id: string;
  label: string;
  color: string;
  component: React.ComponentType;
}

const TABS: Tab[] = [
  { id: "dashboard", label: "Dashboard",    color: "#10b981", component: DashboardApp },
  { id: "ecommerce", label: "E-Commerce",   color: "#f59e0b", component: EcommerceApp },
  { id: "jobboard",  label: "Job Board",    color: "#d4a054", component: JobBoardApp  },
  { id: "saas",      label: "SaaS Landing", color: "#3b82f6", component: SaasApp      },
];

// ─── Syntax-highlight colours ──────────────────────────────────────────────────
// Simple token-based highlighter — no external deps.

function highlight(code: string): string {
  return code
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    // strings
    .replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
      '<span style="color:#a3e635">$1</span>')
    // comments
    .replace(/(\/\/[^\n]*)/g,
      '<span style="color:#6b7280;font-style:italic">$1</span>')
    // keywords
    .replace(/\b(function|return|const|let|var|if|else|for|while|import|export|default|type|interface|class|extends|implements|new|null|undefined|true|false|void|async|await|of|in)\b/g,
      '<span style="color:#60a5fa">$1</span>')
    // JSX tags
    .replace(/(&lt;\/?)([\w.]+)/g,
      '$1<span style="color:#f472b6">$2</span>')
    // numbers
    .replace(/\b(\d+)\b/g,
      '<span style="color:#fb923c">$1</span>')
    // React hooks & common functions
    .replace(/\b(useState|useEffect|useCallback|useRef|useMemo|setCart|setToast|setOpenIdx|setQuery|setCounts|toggle|addToCart)\b/g,
      '<span style="color:#d4a054">$1</span>');
}

// ─── Scanlines overlay ─────────────────────────────────────────────────────────

function Scanlines() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 opacity-[0.025]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,1) 2px,rgba(0,0,0,1) 4px)",
      }}
    />
  );
}

// ─── Screen content: tabs switch between code and live preview on mobile ───────

function EditorScreen() {
  const [activeIdx, setActiveIdx] = useState(0);
  // On mobile: "code" or "preview" pane toggle
  const [mobilePane, setMobilePane] = useState<"code" | "preview">("preview");
  const [blink, setBlink] = useState(true);
  // ran: flashes the preview pane border on "run" to show output updated
  const [ran, setRan] = useState(false);
  // hasRun: only render the live output after user clicks Run
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setBlink(b => !b), 530);
    return () => clearInterval(id);
  }, []);

  function handleRun() {
    // Switch to preview pane (mobile) and flash border (desktop)
    setMobilePane("preview");
    setHasRun(true);
    setRan(true);
    setTimeout(() => setRan(false), 800);
  }

  function selectSnippet(i: number) {
    setActiveIdx(i);
    // Reset: hide output until user runs again
    setMobilePane("code");
    setRan(false);
    setHasRun(false);
  }

  const active = TABS[activeIdx];
  const LiveComponent = active.component;
  const rawCode = SOURCE_CODE[active.id] ?? "";

  return (
    <div className="flex h-full w-full flex-col bg-[#050709] font-mono overflow-hidden">

      {/* Title bar */}
      <div className="flex items-center gap-1.5 border-b border-[#1a2030] bg-[#0a0d14] px-3 py-2 shrink-0">
        <span className="size-2.5 rounded-full bg-red-500/80" />
        <span className="size-2.5 rounded-full bg-amber-400/80" />
        <span className="size-2.5 rounded-full bg-emerald-500/80" />
        <span className="ml-2 flex items-center gap-1.5 text-[10px] text-[#4a5568] min-w-0 overflow-hidden">
          <Monitor className="size-2.5 shrink-0" style={{ color: active.color }} />
          <span style={{ color: active.color + "cc" }} className="shrink-0">sagar</span>
          <span className="text-[#2d3748] shrink-0">/</span>
          <span className="text-[#718096] truncate">{active.id}.tsx</span>
        </span>
        <span
          className="ml-auto text-[9px] text-[#2d3748] shrink-0"
          style={{ opacity: blink ? 1 : 0, transition: "opacity 0.1s" }}
        >▋</span>
      </div>

      {/* App tabs */}
      <div className="flex gap-px border-b border-[#0f1520] bg-[#070a10] px-2 pt-1.5 shrink-0 overflow-x-auto">
        {TABS.map((t, i) => (
          <button
            key={t.id}
            type="button"
            onClick={() => selectSnippet(i)}
            className={`shrink-0 rounded-t px-2 py-1 text-[9px] transition-colors ${
              activeIdx === i
                ? "bg-[#0a0d14] border-t border-x border-[#1a2030]"
                : "text-[#4a5568] hover:text-[#718096]"
            }`}
            style={activeIdx === i ? { color: t.color } : {}}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Mobile pane switcher — only shown when screen is narrow */}
      <div className="flex border-b border-[#0f1520] bg-[#070a10] shrink-0 sm:hidden">
        <button
          type="button"
          onClick={() => setMobilePane("code")}
          className={`flex-1 py-1 text-[9px] transition-colors ${mobilePane === "code" ? "text-[#d4a054] border-b border-[#d4a054]" : "text-[#4a5568]"}`}
        >
          {"</>  Code"}
        </button>
        <button
          type="button"
          onClick={() => setMobilePane("preview")}
          className={`flex-1 py-1 text-[9px] transition-colors ${mobilePane === "preview" ? "text-[#d4a054] border-b border-[#d4a054]" : "text-[#4a5568]"}`}
          style={mobilePane === "preview" ? { color: active.color } : {}}
        >
          ▶  Preview
        </button>
      </div>

      {/* Split: side-by-side on sm+, tabbed on mobile */}
      <div className="flex flex-1 overflow-hidden min-h-0">

        {/* Code pane */}
        <div className={`flex flex-col border-r border-[#0f1520] min-w-0
          sm:flex sm:w-1/2
          ${mobilePane === "code" ? "flex w-full" : "hidden sm:flex sm:w-1/2"}`}>
          <div className="flex items-center px-3 py-1 border-b border-[#0f1520] shrink-0">
            <span className="text-[8px] text-[#2d3748] uppercase tracking-wider">TypeScript · React</span>
          </div>
          <div className="flex-1 overflow-auto px-3 py-2">
            <pre
              className="text-[9px] leading-relaxed whitespace-pre"
              dangerouslySetInnerHTML={{ __html: highlight(rawCode) }}
            />
          </div>
        </div>

        {/* Live preview pane */}
        <div className={`flex flex-col min-w-0 overflow-hidden
          sm:flex sm:w-1/2
          ${mobilePane === "preview" ? "flex w-full" : "hidden sm:flex sm:w-1/2"}`}>
          <div className="flex items-center justify-between px-3 py-1 border-b border-[#0f1520] shrink-0">
            <span className="text-[8px] uppercase tracking-wider" style={{ color: active.color + "99" }}>
              live output
            </span>
            <span className="text-[8px] text-[#1a2030]">React</span>
          </div>
          <div
            className="flex-1 overflow-auto relative"
            style={{
              outline: ran ? `1px solid ${active.color}60` : "none",
              transition: "outline 0.3s ease",
            }}
          >
            {hasRun ? (
              <>
                <LiveComponent />
                {ran && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${active.color}08, transparent)`,
                      animation: "fadeOut 0.8s ease forwards",
                    }}
                  />
                )}
              </>
            ) : (
              /* Placeholder shown before Run is clicked */
              <div className="flex h-full flex-col items-center justify-center gap-3 px-4 text-center">
                <div
                  className="size-10 rounded-full flex items-center justify-center"
                  style={{ background: active.color + "15", border: `1px solid ${active.color}30` }}
                >
                  <Play className="size-4" style={{ color: active.color }} />
                </div>
                <p className="text-[10px] text-[#4a5568] leading-relaxed">
                  Click <span style={{ color: active.color }} className="font-semibold">Run ▶</span> to render<br />
                  <span className="text-[#2d3748]">{active.label}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between border-t border-[#0f1520] bg-[#070a10] px-3 py-1.5 shrink-0">
        <span className="text-[8px] text-[#1a2030] hidden sm:block">TypeScript · same code that runs here</span>
        <span className="text-[8px] text-[#1a2030] sm:hidden">tap Code / Preview to switch</span>
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-[8px]" style={{ color: active.color + "50" }}>{active.label}</span>
          <button
            type="button"
            onClick={handleRun}
            className="flex items-center gap-1 rounded px-2.5 py-1 text-[9px] font-semibold transition-all active:scale-95"
            style={{
              background: active.color + "20",
              border: `1px solid ${active.color}40`,
              color: active.color,
            }}
          >
            <Play className="size-2.5" />
            Run ▶
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Particles ─────────────────────────────────────────────────────────────────

function Particles({ color }: { color: string }) {
  const pts = Array.from({ length: 16 }, (_, i) => ({
    id: i, x: 10 + (i * 73) % 80, y: 10 + (i * 47) % 80,
    size: 1 + (i % 3), delay: (i * 0.4) % 4, dur: 3 + (i % 4),
    op: 0.06 + (i % 4) * 0.04,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {pts.map(p => (
        <div key={p.id} className="absolute rounded-full" style={{
          left: `${p.x}%`, top: `${p.y}%`,
          width: `${p.size}px`, height: `${p.size}px`,
          backgroundColor: color, opacity: p.op,
          animation: `pulse-dot ${p.dur}s ${p.delay}s ease-in-out infinite`,
        }} />
      ))}
    </div>
  );
}

// ─── 3D Desktop Workstation ────────────────────────────────────────────────────

export function CodePlayground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [floatY, setFloatY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const glowColor = "#d4a054";

  // Detect mobile
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Parallax tilt — desktop only
  useEffect(() => {
    if (isMobile) return;
    const el = containerRef.current;
    if (!el) return;
    function onMove(e: MouseEvent) {
      const r = el!.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      setTilt({ x: dy * -5, y: dx * 6 });
    }
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", () => { setTilt({ x: 0, y: 0 }); setIsHovered(false); });
    el.addEventListener("mouseenter", () => setIsHovered(true));
    return () => el.removeEventListener("mousemove", onMove);
  }, [isMobile]);

  // Idle float — gentler on mobile
  useEffect(() => {
    let frame: number; let start = 0;
    function animate(ts: number) {
      if (!start) start = ts;
      setFloatY(Math.sin((ts - start) / 1000 * 0.8) * (isMobile ? 2 : 4));
      frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isMobile]);

  const monitorWidth = isMobile
    ? "min(92vw, 340px)"
    : "clamp(280px, 52vw, 460px)";

  const screenHeight = isMobile
    ? "clamp(240px, 55vw, 300px)"
    : "clamp(200px, 36vw, 320px)";

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{ perspective: isMobile ? "800px" : "1200px", backgroundColor: "#020305" }}
    >
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-16 opacity-20 blur-3xl rounded-full"
        style={{ background: `radial-gradient(ellipse,${glowColor} 0%,transparent 70%)` }}
      />
      <Particles color={glowColor} />

      <div style={{
        transform: isMobile
          ? `translateY(${floatY}px)`
          : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${isHovered ? 0 : floatY}px)`,
        transition: isHovered ? "transform 0.1s ease-out" : "transform 1.2s ease-in-out",
        transformStyle: "preserve-3d",
      }}>
        <div style={{ width: monitorWidth, transformStyle: "preserve-3d" }}>

          {/* Bezel */}
          <div className="relative rounded-xl overflow-hidden" style={{
            background: "linear-gradient(145deg,#1a1f2e 0%,#0d1018 100%)",
            border: "3px solid #1e2535",
            boxShadow: `0 0 0 1px #0a0d14,0 30px 80px -10px rgba(0,0,0,0.9),0 0 50px -20px ${glowColor}25,inset 0 1px 0 rgba(255,255,255,0.05)`,
            padding: "28px 8px 8px",
          }}>
            <div className="absolute top-0 inset-x-0 h-7 flex items-center justify-center">
              <div className="size-1.5 rounded-full bg-[#1e2535]" />
              <div className="absolute right-3 top-2 text-[9px] text-[#1e2535] font-mono tracking-widest">SAGAR·DEV</div>
            </div>

            <div className="relative rounded-lg overflow-hidden" style={{
              height: screenHeight,
              boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.04),0 0 30px ${glowColor}10`,
            }}>
              <EditorScreen />
              <Scanlines />
              <div className="pointer-events-none absolute inset-0 rounded-lg" style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.025) 0%,transparent 50%)" }} />
              <div className="pointer-events-none absolute -inset-4 -z-10 opacity-20 blur-2xl rounded-full" style={{ background: glowColor }} />
            </div>

            <div className="flex items-center justify-center gap-2 pt-2 pb-1">
              <div className="h-px flex-1 bg-[#1e2535]" />
              <span className="text-[8px] text-[#1e2535] font-mono tracking-[0.3em] uppercase">SRC·WORKSPACE</span>
              <div className="h-px flex-1 bg-[#1e2535]" />
            </div>
          </div>

          {/* Neck */}
          <div className="flex justify-center">
            <div style={{ width: "14%", height: "20px", background: "linear-gradient(to bottom,#1a1f2e,#141820)", clipPath: "polygon(20% 0%,80% 0%,65% 100%,35% 100%)" }} />
          </div>

          {/* Base */}
          <div className="flex justify-center">
            <div style={{ width: "55%", height: "10px", background: "linear-gradient(to bottom,#1a1f2e,#0f1218)", borderRadius: "4px 4px 0 0", boxShadow: "0 4px 20px rgba(0,0,0,0.6)" }} />
          </div>

          {/* Desk */}
          <div style={{ height: "8px", background: "linear-gradient(to bottom,#111520,#0a0d14)", borderRadius: "2px", boxShadow: "0 8px 32px rgba(0,0,0,0.8)" }} />

          {/* Reflection */}
          <div style={{ height: "36px", background: "linear-gradient(to bottom,rgba(17,21,32,0.5),transparent)", transform: "scaleY(-1)", opacity: 0.25, filter: "blur(4px)" }} />
        </div>
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] text-[#2d3748] whitespace-nowrap">
        {isMobile
          ? <span>tap Code / Preview to switch</span>
          : <>
              <span>move mouse to orbit</span>
              <span className="text-[#1a2030]">·</span>
              <span className="text-[#1a2030]">TypeScript · live React output</span>
            </>
        }
      </div>
    </div>
  );
}

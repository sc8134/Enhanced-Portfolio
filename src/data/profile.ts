// Profile data: bio, projects, skills, career path, socials, and Q&A replies.
// Single source of truth for the portfolio. Edit here to update content everywhere.

export const profile = {
  name: "Sagar Roka Chhetri",
  short: "Sagar RC",
  role: "Full Stack Engineer",
  location: "Kathmandu, Nepal",
  timezone: "Asia/Kathmandu (UTC+5:45)",
  email: "sc81341@gmail.com",
  avatar: "/pic/me-192.webp",
  avatarSmall: "/pic/me-96.webp",
  resume: "/resume/Sagar_Roka_Chhetri_Resume_ATS.pdf",
  resumeExternal:
    "https://github.com/sc8134/My_Portfolio/blob/master/public/resume/Sagar_Roka_Chhetri_Resume_ATS.pdf",
  openToWork: "Open to Full-Time Roles",
  tagline: "I write it, test it, automate it, deploy it",
  heroBio:
    "Full-stack engineer who builds complete products — from frontend to backend to deployment. Strong in Python and automation, comfortable across modern web technologies. Currently shipping production systems at CodeRunners Technologies.",
  roles: [
    "Full-Stack Engineer · Python & Automation",
    "I write it, test it, automate it, deploy it",
    "Python · Node.js · React · PostgreSQL",
    "Open source contributor",
    "Building from Kathmandu",
  ],
  bio: [
    "I started coding without a mentor and without a roadmap. Just me, a browser, and Stack Overflow. I picked Python first because I wanted to automate things. The first script that actually worked got me hooked and that feeling never went away. Every project on my GitHub is something I designed, built, and deployed myself — no templates, no starter kits I did not understand. I build things because I need them, not to fill a portfolio.",
  ],
  principles: [
    {
      title: "I write my own code",
      body: "Every line is mine. I do not copy starters I do not understand. I build it so I know how it works.",
    },
    {
      title: "Real problems only",
      body: "I do not build projects to fill a portfolio. I build them because something is broken and I want to fix it.",
    },
    {
      title: "I read the docs",
      body: "Search helps but I go to the source. Knowing why something works matters more than getting it to run once.",
    },
    {
      title: "Ship, then improve",
      body: "Waiting for perfect is how projects die in a private repo. I push early and improve from real feedback.",
    },
  ],
  stats: [
    { value: "8", label: "Products Shipped" },
    { value: "2+", label: "Years Building" },
    { value: "3.78", label: "+2 GPA (Top 10%)" },
    { value: "Jul '25", label: "In Production" },
  ],
} as const;

export const socials = [
  { id: "github", label: "GitHub", handle: "@sc8134", url: "https://github.com/sc8134" },
  { id: "linkedin", label: "LinkedIn", handle: "Sagar RC", url: "https://www.linkedin.com/in/sagar-rc" },
  { id: "x", label: "X", handle: "@Sagarch05339168", url: "https://x.com/Sagarch05339168" },
  { id: "email", label: "Email", handle: "sc81341@gmail.com", url: "mailto:sc81341@gmail.com" },
] as const;

// --- Project type ---

export type Project = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  why: string;
  summary: string;
  image: string;
  color: string;
  tech: string[];
  bullets: string[];
  year: number;
  live?: string;
  repo?: string;
  flags: string[];
  architecture?: {
    frontend: string;
    backend: string;
    database: string;
    deployment: string;
  };
  tradeoffs?: string;
  metrics?: string[];
};

export const projects: Project[] = [
  {
    id: "jobhunt-agent",
    index: "01",
    title: "JobHunt Agent",
    tagline: "AI agent that matches resumes to jobs and writes tailored cover letters. Runs on open-source models.",
    why: "Writing the same cover letter twelve times with minor tweaks is not a human problem. It is pattern matching. I wanted to see how far open-source models could take it without paying for commercial APIs.",
    summary:
      "Give it a resume and job listings. It matches semantically, ranks the best fits, and drafts a tailored cover letter for each. Runs entirely on local open-source NLP models. No paid API keys needed.",
    image: "/projects/jobhunt.webp",
    color: "#6366f1",
    tech: ["Python", "LangGraph", "spaCy", "sentence-transformers", "NLP"],
    bullets: [
      "Semantic resume to job matching using vector embeddings, not keyword stuffing",
      "Automated tailored cover letter generation per job",
      "Runs locally on sentence-transformers and spaCy with no commercial API keys",
    ],
    year: 2025,
    repo: "https://github.com/sc8134/JobHunt-Agent",
    flags: ["Built from scratch", "AI and ML", "Python · Automation", "Zero API cost"],
    architecture: {
      frontend: "CLI and web interface for uploading resumes and job listings",
      backend: "Python LangGraph workflow for NLP parsing and document generation",
      database: "Local vector index using sentence-transformers embeddings",
      deployment: "Runs entirely on local hardware, no cloud needed",
    },
    tradeoffs:
      "Used local sentence-transformers and spaCy instead of OpenAI. Resume data stays private and there is zero ongoing cost.",
    metrics: ["Zero API costs", "Semantic vector matching", "Instant tailored cover letter per role"],
  },
  {
    id: "ai-reel-generator",
    index: "02",
    title: "AI Reel Generator",
    tagline: "Type a prompt, get a finished video. Full automation in Python.",
    why: "I wanted to know if you could automate the whole short-form video pipeline from a single text prompt. Script, voiceover, captions, music, assembly. Turns out you mostly can.",
    summary:
      "Give it a text prompt and it produces a complete short-form reel: captions, background music, visual templates, all assembled via FFmpeg. No manual editing needed.",
    image: "/projects/ai-reel.webp",
    color: "#0891b2",
    tech: ["Python", "FFmpeg", "OpenAI API", "AI/ML", "REST API"],
    bullets: [
      "Text prompt to finished video reel, fully automated",
      "Word-by-word captions synced to synthesized speech",
      "Background music selection, volume ducking, and layout via FFmpeg",
    ],
    year: 2025,
    repo: "https://github.com/sc8134/ai-reel-generator",
    flags: ["Built from scratch", "AI and ML", "Python · Automation"],
    architecture: {
      frontend: "REST API triggers and real-time render status",
      backend: "Python pipeline for TTS, transcription timestamps, and FFmpeg filters",
      database: "Template and asset library with programmatic layout presets",
      deployment: "Headless Linux server with hardware-accelerated FFmpeg",
    },
    tradeoffs:
      "Used FFmpeg filtergraphs directly instead of web video editors. Got deterministic millisecond caption sync and much lower memory usage.",
    metrics: ["100% automated assembly", "Word-accurate caption sync", "Under 60 seconds to render"],
  },
  {
    id: "signal-job-portal",
    index: "03",
    title: "Signal Job Portal",
    tagline: "A full-stack recruitment platform I built solo. This is the project that got me hired.",
    why: "I wanted to prove I could build a complete system with real auth, two separate user dashboards, and PostgreSQL full-text search, without cutting corners. I finished it and it got me the job at CodeRunners.",
    summary:
      "A job portal for how tech hiring works in Nepal. Dual-role auth for employers and job seekers, smart filtering, and a full REST API on Node.js and PostgreSQL. I built every part of it myself.",
    image: "/projects/signal.webp",
    color: "#d97706",
    tech: ["TypeScript", "React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    bullets: [
      "Dual-role auth with separate protected portals for employers and candidates",
      "PostgreSQL full-text search with tsvector indexing",
      "Full REST API with Node.js, relational schema, and JWT role verification",
    ],
    year: 2025,
    repo: "https://github.com/sc8134/signal-job-portal",
    flags: ["Built from scratch", "Featured", "Got me hired"],
    architecture: {
      frontend: "React with TypeScript, separate dashboard layouts per role, reactive search filters",
      backend: "Express.js REST API with role-based JWT middleware",
      database: "PostgreSQL with tsvector full-text search on job titles and descriptions",
      deployment: "Node.js server with environment isolation and connection pooling",
    },
    tradeoffs:
      "Used PostgreSQL full-text search directly instead of spinning up ElasticSearch. For this scale it gives fast queries with zero extra infrastructure.",
    metrics: ["Got me hired at CodeRunners", "Full dual-role permission enforcement", "Sub-50ms full-text query times"],
  },
  {
    id: "bolts-army",
    index: "04",
    title: "Janakpur Bolts Army",
    tagline: "Official cricket fanpage. A real client project I built with CodeRunners.",
    why: "Janakpur Bolts Army came to CodeRunners to build their online presence. I was the primary engineer on this. I designed it, built the frontend and backend, and handled the full cPanel deployment myself.",
    summary:
      "Official fanpage for the Janakpur Bolts Army cricket club. Three person team. I did around 50 percent of the build: UI design, core frontend and backend, and the complete deployment at boltsarmy.com.",
    image: "/projects/janakpur.webp",
    color: "#b91c1c",
    tech: ["React", "TypeScript", "Node.js", "Tailwind CSS", "cPanel"],
    bullets: [
      "Built the membership system, events page, gallery, Fan Frame feature, and admin panel",
      "Led UI design and core frontend and backend as primary engineer",
      "Handled full cPanel deployment including domain config, build pipeline, and production maintenance",
    ],
    year: 2025,
    live: "https://boltsarmy.com",
    flags: ["Live", "Featured", "Client Project · cPanel"],
    architecture: {
      frontend: "React SPA with Tailwind CSS and a custom Fan Frame canvas generator I built from scratch",
      backend: "Node.js REST API with authentication and event management",
      database: "MySQL for member rosters, event schedules, and form submissions",
      deployment: "cPanel server with SSL, DNS config, and custom build pipeline",
    },
    tradeoffs:
      "Used Node.js and cPanel instead of cloud services because the client already had a cPanel hosting setup. Kept things simple and it loads fast.",
    metrics: ["Primary engineer, roughly 50% of the codebase", "Live at boltsarmy.com", "Ran through the full cricket season without downtime"],
  },
  {
    id: "nova-dvr",
    index: "05",
    title: "Nova DVR",
    tagline: "A media downloader I built because I was tired of juggling five tools.",
    why: "I had five different apps open every time I wanted to download, convert, and tag a batch of videos. None of them worked together. I got tired of it and built one tool that does all of it.",
    summary:
      "One pipeline for multi-platform downloads, batch scheduling, format conversion, cloud sync, and AI metadata tagging. React on the front, Python and Flask on the back, deployed on Vercel.",
    image: "/projects/nova.webp",
    color: "#2563eb",
    tech: ["TypeScript", "React", "Python", "Flask", "Tailwind CSS", "Vercel"],
    bullets: [
      "Multi-platform download pipeline with async batch scheduling",
      "AI metadata tagging to auto-categorize media",
      "Cloud sync and format conversion in one workflow",
    ],
    year: 2025,
    live: "https://nova-dvr.vercel.app",
    repo: "https://github.com/sc8134/Nova_DVR",
    flags: ["Live", "Built from scratch", "Featured", "Full Stack"],
    architecture: {
      frontend: "React with TypeScript, live download queue, and real-time progress tracking",
      backend: "Python Flask microservice for extraction, transcoding, and tag parsing",
      database: "Lightweight metadata store with local and cloud sync",
      deployment: "Vercel for frontend, Python serverless backend",
    },
    tradeoffs:
      "Put the media extraction in Python and Flask because Python has much better media library support than Node. yt-dlp and ffmpeg wrappers just work better there.",
    metrics: ["Replaced 5 separate tools", "Sub-second UI updates", "Batch queue with retry on failure"],
  },
  {
    id: "velora",
    index: "06",
    title: "Velora",
    tagline: "A media hub that actually makes sense to use.",
    why: "Nova DVR solved downloading but content discovery was still manual. I wanted one interface for finding content, pulling it, and surfacing what was worth watching.",
    summary:
      "Started as a side experiment and became something I use daily. Video downloading, AI recognition, and smart content discovery in one React and TypeScript interface.",
    image: "/projects/velora.webp",
    color: "#8b5cf6",
    tech: ["TypeScript", "React", "Tailwind CSS", "AI APIs", "Vercel"],
    bullets: [
      "Smart video extraction across multiple platforms",
      "AI visual and audio recognition for content indexing",
      "Responsive UI that works on mobile, tablet, and desktop",
    ],
    year: 2025,
    repo: "https://github.com/sc8134/Velora",
    flags: ["Built from scratch", "Frontend polish"],
    architecture: {
      frontend: "React with TypeScript, responsive card grid, quick action buttons",
      backend: "AI API orchestrator for content tagging and stream resolution",
      database: "Browser IndexedDB and edge cache for offline media catalogs",
      deployment: "Vercel with automated preview branches",
    },
    tradeoffs:
      "Built client-heavy with edge caching to keep the media catalog fast and avoid server storage costs.",
    metrics: ["Works across all screen sizes", "Unified media catalog", "Instant client-side search"],
  },
  {
    id: "namo-patro",
    index: "07",
    title: "Namo Patro",
    tagline: "Nepali calendar app built because every existing one was either broken or full of ads.",
    why: "I am Nepali and we use Bikram Sambat. Every calendar app I tried was cluttered, slow, or just wrong. I wanted one that actually worked the way a Nepali person would use it.",
    summary:
      "Bikram Sambat to Gregorian conversion, Nepali festival listings, tithis, and live radio. Built from scratch and open-sourced under GPL-3.0. The hard part was getting the calendar data right, not the UI.",
    image: "/projects/namo.webp",
    color: "#059669",
    tech: ["TypeScript", "React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    bullets: [
      "Accurate BS to Gregorian conversion with 10-year round-trip test verification",
      "Nepali festival listings, tithi calculations, and public holiday database",
      "Live Nepali streaming radio and finance tools. GPL-3.0 open source.",
    ],
    year: 2024,
    repo: "https://github.com/sc8134/Namo-Patro",
    flags: ["Built from scratch", "Open source", "Featured", "GPL-3.0"],
    architecture: {
      frontend: "React calendar grid with BS date pickers and a live audio player",
      backend: "Node.js API for festival schedules, tithis, and audio streams",
      database: "PostgreSQL with verified BS month length tables going back decades",
      deployment: "GitHub Actions CI/CD with linting and test suites",
    },
    tradeoffs:
      "BS month lengths are irregular, 29 to 32 days, with no clean formula. I built hand-verified lookup tables cross-referenced with Nepal Government records instead of guessing.",
    metrics: ["GPL-3.0 open source", "10-year round-trip test suite, 100% accurate", "No ads, clean interface"],
  },
  {
    id: "phishing-tool",
    index: "08",
    title: "Phishing Simulation Tool",
    tagline: "Security awareness training for organizations. Controlled, safe, educational.",
    why: "Most security training is a PDF nobody reads. The only thing that changes behavior is letting someone click a simulated link and seeing the feedback immediately. I built a safe environment to do that.",
    summary:
      "Organizations run controlled phishing campaigns, track who clicked, and measure vulnerability over time. React and Tailwind on the front, Flask on the back.",
    image: "/projects/phishing.webp",
    color: "#ec4899",
    tech: ["React", "TypeScript", "Tailwind CSS", "Flask", "Python"],
    bullets: [
      "Controlled campaign creation, template authoring, and recipient management",
      "Real-time click tracking and vulnerability analytics",
      "Clean admin dashboard for security officers",
    ],
    year: 2024,
    repo: "https://github.com/sc8134/phishing-simulation-tool",
    flags: ["Built from scratch", "Cybersecurity", "Full Stack"],
    architecture: {
      frontend: "React dashboard with real-time charts and campaign editors",
      backend: "Python Flask API for email dispatch, tokenized link generation, and click callbacks",
      database: "Relational DB tracking campaign events, timestamps, and engagement",
      deployment: "Isolated environment with SPF/DKIM verification",
    },
    tradeoffs:
      "Used tokenized single-use landing pages instead of storing credentials. Safety and educational value were the priority.",
    metrics: ["Safe simulation environment", "Actionable vulnerability reports", "Instant educational feedback on click"],
  },
];

// --- Skill types ---

export type Skill = {
  id: string;
  name: string;
  level: "Production" | "Working" | "Exploring";
  proof: string;
};

export type SkillGroup = {
  id: string;
  label: string;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "ai",
    label: "AI & Automation",
    skills: [
      { id: "python", name: "Python", level: "Production", proof: "Where I started. Nova DVR, AI Reel Generator, JobHunt Agent." },
      { id: "langgraph", name: "LangGraph", level: "Production", proof: "Agentic workflow graph orchestration in JobHunt Agent." },
      { id: "spacy", name: "spaCy & NLP", level: "Production", proof: "Resume parsing and keyword tokenization in JobHunt Agent." },
      { id: "sentence-transformers", name: "Vector Embeddings", level: "Production", proof: "Semantic cosine similarity search on local hardware." },
      { id: "ffmpeg", name: "FFmpeg Automation", level: "Production", proof: "Programmatic video and audio pipeline in AI Reel Generator." },
      { id: "openai", name: "OpenAI API", level: "Production", proof: "Prompt engineering, structured outputs, and video scripts." },
    ],
  },
  {
    id: "backend",
    label: "Backend & APIs",
    skills: [
      { id: "node", name: "Node.js", level: "Production", proof: "Signal's REST API and the CodeRunners production backend." },
      { id: "express", name: "Express", level: "Production", proof: "API layer for Signal and CodeRunners." },
      { id: "flask", name: "Flask", level: "Production", proof: "Nova DVR backend and the phishing simulation tool." },
      { id: "fastapi", name: "FastAPI", level: "Production", proof: "High-performance REST APIs for AI-backed services." },
      { id: "rest", name: "REST APIs", level: "Production", proof: "Designed and consumed across five or more production projects." },
      { id: "ws", name: "WebSockets", level: "Working", proof: "Real-time event sync and live audio stream handling." },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      { id: "react", name: "React", level: "Production", proof: "Production at CodeRunners. Also Signal, Namo Patro, and Nova DVR." },
      { id: "typescript", name: "TypeScript", level: "Production", proof: "Default on every project since 2024." },
      { id: "javascript", name: "JavaScript", level: "Production", proof: "The MERN work at CodeRunners is JavaScript end to end." },
      { id: "tailwind", name: "Tailwind CSS", level: "Production", proof: "Every frontend since Signal Job Portal." },
      { id: "vite", name: "Vite", level: "Production", proof: "Build tool on Nova DVR and my own sites." },
      { id: "next", name: "Next.js", level: "Production", proof: "Used for SSR experiments and portfolio builds." },
      { id: "motion", name: "Motion & 3D", level: "Working", proof: "Three.js interactive canvases and scroll-linked micro-animations." },
      { id: "angular", name: "Angular", level: "Production", proof: "Built production frontend interfaces using Angular. Used in real projects alongside React." },
    ],
  },
  {
    id: "data",
    label: "Databases & Storage",
    skills: [
      { id: "postgres", name: "PostgreSQL", level: "Production", proof: "Signal Job Portal (full-text tsvector) and Namo Patro data layer." },
      { id: "mongo", name: "MongoDB", level: "Production", proof: "Primary database on the CodeRunners MERN stack." },
      { id: "mysql", name: "MySQL", level: "Production", proof: "cPanel-hosted relational database for CodeRunners deployments." },
      { id: "redis", name: "Redis", level: "Working", proof: "Caching and session store in backend services." },
      { id: "prisma", name: "Prisma", level: "Working", proof: "ORM on TypeScript-first Node projects." },
      { id: "firebase", name: "Firebase", level: "Working", proof: "Auth and realtime data in earlier projects." },
      { id: "supabase", name: "Supabase", level: "Working", proof: "Postgres with an auth layer for rapid prototyping." },
      { id: "clickhouse", name: "ClickHouse", level: "Exploring", proof: "Studied columnar analytics storage." },
    ],
  },
  {
    id: "ops",
    label: "DevOps & Tooling",
    skills: [
      { id: "git", name: "Git", level: "Production", proof: "Daily driver across every project for two-plus years." },
      { id: "linux", name: "Linux", level: "Production", proof: "Primary machine, server administration at CodeRunners." },
      { id: "cpanel", name: "cPanel & DNS", level: "Production", proof: "Live domain configuration and cPanel deployment for Janakpur Bolts Army." },
      { id: "docker", name: "Docker", level: "Working", proof: "Containerized Flask and Node apps locally and in CI." },
      { id: "aws", name: "AWS", level: "Working", proof: "S3 for storage, EC2 and Lambda compute experiments." },
      { id: "actions", name: "GitHub Actions", level: "Working", proof: "Test and deploy automation, including Namo Patro." },
      { id: "nginx", name: "Nginx", level: "Working", proof: "Reverse proxy on the CodeRunners production server." },
      { id: "cicd", name: "CI/CD Pipelines", level: "Working", proof: "Automated pipelines on open-source repositories." },
    ],
  },
];

// --- Career path types ---

export type PathEntry = {
  id: string;
  kind: "work" | "study";
  role: string;
  place: string;
  detail?: string;
  date: string;
  where?: string;
  story: string;
  tech?: string[];
};

export const path: PathEntry[] = [
  {
    id: "coderunners",
    kind: "work",
    role: "Full-Stack Engineer",
    place: "CodeRunners Technologies",
    date: "Jul 2025 – Present",
    where: "Kathmandu · Remote",
    story:
      "Building and shipping production full-stack systems for real users. I own the React frontend, admin panels, backend API, and all cPanel deployments — domain config, build pipeline, and ongoing production maintenance. Working across backend, frontend, automation, and deployment based on what the project needs. Equity-based. I joined to own the outcome.",
    tech: ["MongoDB", "Express", "React", "Node.js", "Python", "cPanel"],
  },
  {
    id: "codealpha",
    kind: "work",
    role: "Full-Stack Development Intern",
    place: "CodeAlpha",
    date: "Aug 2026 – Sep 2026",
    where: "Remote",
    story:
      "A virtual engineering internship. I adapted quickly, delivered full-stack features, and finished with a Certificate of Completion and a Letter of Recommendation from the CEO. Credential ID: CA/DF1/252458.",
    tech: ["React", "Node.js", "JavaScript", "REST APIs"],
  },
  {
    id: "independent",
    kind: "work",
    role: "Independent Builder",
    place: "Self-directed",
    date: "2023 – 2025",
    story:
      "No job, no one setting priorities. I decided what to build, how to build it, and when to ship. Two years doing the UI, API, database, and deployment myself with no one to ask and no one to blame. Namo Patro, Nova DVR, and Signal came out of this period. Signal is what got me hired.",
    tech: ["React", "TypeScript", "Flask", "Node.js", "PostgreSQL", "Python"],
  },
  {
    id: "bce",
    kind: "study",
    role: "B.C.E. Computer Engineering",
    place: "Cosmos College of Management & Technology",
    detail: "Pokhara University",
    date: "2022 – 2026",
    story:
      "Final year, waiting to graduate. The degree gave me the core vocabulary: algorithms, networking, data structures, operating systems. Every semester I was also building real projects outside class. Assignments taught me the words. Projects taught me the judgment.",
  },
  {
    id: "plus2",
    kind: "study",
    role: "+2 Science (Physics)",
    place: "Milestone International College",
    date: "2019 – 2021",
    story:
      "Graduated with a 3.78 GPA, top 10% in Nepal. Physics did not teach me how to code. It taught me how to sit with a problem before reaching for a solution. I still spend more time thinking about a problem than writing code for it.",
  },
];

// --- Credentials ---

export const credentials = [
  {
    id: "cert",
    type: "Certificate of Completion",
    title: "Full Stack Development",
    issuer: "CodeAlpha",
    issuedBy: "CodeAlpha Training Programme",
    field: "Full Stack Development",
    date: "20 Sep 2026",
    code: "CA/DF1/252458",
    href: "/certificate/codealpha-certificate.pdf",
    description:
      "Awarded upon successful completion of a virtual full-stack engineering internship. Covers production React, Node.js, and REST API delivery under real project deadlines.",
  },
  {
    id: "lor",
    type: "Letter of Recommendation",
    title: "Engineering Excellence",
    issuer: "CodeAlpha",
    issuedBy: "Founder & CEO, CodeAlpha",
    field: "Full Stack Development",
    date: "20 Sep 2026",
    code: "CA/DF1/252458",
    href: "/certificate/codealpha-lor.pdf",
    description:
      "Personal recommendation from the Founder & CEO commending autonomous delivery, technical depth, and professional conduct throughout the internship engagement.",
  },
] as const;

// --- Q&A reply map used by the terminal modal ---
// Each entry has keyword triggers and a plain-text answer.

export const replies: { keys: string[]; answer: string }[] = [
  {
    keys: ["namo", "calendar", "patro", "bikram", "nepali date"],
    answer:
      "Namo Patro is a Bikram Sambat calendar app I built because every existing one was either full of ads or just wrong. BS month lengths vary from 29 to 32 days with no formula to calculate them, so I built hand-verified lookup tables cross-referenced with Nepal Government records and wrote a 10-year round-trip test suite. GPL-3.0 open source.",
  },
  {
    keys: ["signal", "job portal", "hired", "hire story"],
    answer:
      "Signal Job Portal is the project that got me hired at CodeRunners. I built it solo from scratch: dual-role JWT auth for employers and job seekers, PostgreSQL tsvector full-text search, and separate dashboards for each role. I finished it to prove I could build a complete system end to end. It worked.",
  },
  {
    keys: ["bolts", "cricket", "janakpur"],
    answer:
      "Janakpur Bolts Army is live at boltsarmy.com. I was the primary engineer on this CodeRunners client project, around 50% of the build. I owned the design, core frontend and backend, and the full cPanel deployment including the Fan Frame feature, events page, and membership system.",
  },
  {
    keys: ["nova", "dvr", "velora", "reel", "phishing", "jobhunt", "agent"],
    answer:
      "Nova DVR is a React and Flask media downloader I built to replace five separate tools. Velora adds AI content discovery on top of it. JobHunt Agent matches resumes to jobs using local open-source NLP models with no API cost. AI Reel Generator turns a text prompt into a finished video via FFmpeg automation. The Phishing Tool runs controlled security awareness training for organizations.",
  },
  {
    keys: ["coderunners", "codealpha", "experience", "internship"],
    answer:
      "Since July 2025 I have been working as a Full Stack Developer at CodeRunners Technologies on an equity basis. I own the React frontend, admin panels, and cPanel deployments. In 2026 I completed a full-stack internship at CodeAlpha and received a Letter of Recommendation from the CEO.",
  },
  {
    keys: ["college", "university", "degree", "gpa", "education", "cosmos", "study"],
    answer:
      "Final-year B.C.E. Computer Engineering at Cosmos College under Pokhara University, graduating 2026. I also have a +2 Science degree with a 3.78 GPA, top 10% in Nepal, from Milestone International College.",
  },
  {
    keys: ["stack", "tech", "language", "framework", "tools"],
    answer:
      "My production stack: React 19, TypeScript, Tailwind CSS, Node.js, Express, Python, Flask, PostgreSQL, MongoDB. DevOps tools: Git, Linux, Docker, Nginx, cPanel, GitHub Actions, Vercel. AI tools: LangGraph, spaCy, sentence-transformers, FFmpeg, OpenAI API.",
  },
  {
    keys: ["remote", "timezone", "location", "kathmandu", "nepal", "utc"],
    answer:
      "I am based in Kathmandu, Nepal (UTC+5:45). Good overlap with late European mornings and early US East Coast. I work async-first with a git-driven workflow. Available immediately for full-time, internship, or remote contracts.",
  },
  {
    keys: ["open source", "gpl", "github", "contribution"],
    answer:
      "Three GPL-3.0 and MIT licensed projects on GitHub: Namo Patro, Signal Job Portal, and JobHunt Agent. All public, all documented, all written by me without cloned templates.",
  },
];

// Shown when no keyword matches in the terminal Q&A
export const fallbackReply =
  "No verified answer for that. Try: projects, skills, experience, why-hired, or contact. Or email me directly at sc81341@gmail.com.";

// Suggested questions shown in the "Straight Answers" Q&A section of the contact hub.
export const suggested = [
  "What is your production stack?",
  "Walk me through Signal Job Portal",
  "Are you available for remote work?",
  "What did you build at CodeRunners?",
  "Tell me about Namo Patro",
  "What is your education background?",
];

// Notes data — blog-style entries written by Sagar.
export type NoteBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

export type Note = {
  id: string;
  slug: string;
  entryNumber: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: number;
  mood: string;
  tags: string[];
  excerpt: string;
  content: NoteBlock[];
};

export const notes: Note[] = [
  {
    "id": "1",
    "slug": "why-i-built-this-portfolio",
    "entryNumber": "#001",
    "title": "Why I Built This Portfolio From Scratch",
    "subtitle": "No templates. No shortcuts. Just me, VS Code, and way too many late nights.",
    "date": "2026-08-15",
    "readTime": 5,
    "mood": "reflecting",
    "tags": [
      "portfolio",
      "react",
      "personal"
    ],
    "excerpt": "Everyone said just use a template. I almost did. Then I spent three weeks building it from zero instead. Here is the honest story of why, and what broke along the way.",
    "content": [
      {
        "type": "paragraph",
        "text": "Okay so the original plan was simple. Update the old portfolio, add the new projects, ship it, move on. That was it. I opened the old site, stared at it for maybe thirty seconds, and closed the tab."
      },
      {
        "type": "paragraph",
        "text": "It was not that it looked bad. It looked fine. That was the problem. It looked like everyone else's portfolio. Generic layout, generic font choices, the same hero section structure I had seen a hundred times. Anyone could have built it. I could not see myself in it anymore."
      },
      {
        "type": "heading",
        "text": "So I started over"
      },
      {
        "type": "paragraph",
        "text": "I set one rule: nothing pre-built. No component libraries, no Tailwind UI, no shadcn, nothing. Every single thing you see on this site I wrote myself. That includes the nav, the animations, the card layouts, all of it. Not because I think using libraries is wrong. I use them in my actual job every day. But I wanted this one thing to be completely mine."
      },
      {
        "type": "quote",
        "text": "When you build it yourself, you stop asking \"how do I make this look good\" and start asking \"why does this feel right.\" Those are very different questions."
      },
      {
        "type": "paragraph",
        "text": "The design took forever to nail. I wanted something warm, not the usual dark-mode developer aesthetic. The parchment background, the Cormorant Garamond for headings, the coral accent color. None of that was planned upfront. I arrived at it by trying things and deleting them until something finally felt honest."
      },
      {
        "type": "heading",
        "text": "The part that actually hurt"
      },
      {
        "type": "paragraph",
        "text": "The scroll reveal animations took two full days. Not the code part. The IntersectionObserver logic is like twenty lines. The part that took two days was getting the timing to feel natural. Too fast and it looks cheap. Too slow and it feels sluggish. There is no formula for that. You just keep tweaking until your gut says yes."
      },
      {
        "type": "list",
        "items": [
          "One bad spacing decision will quietly break five other things downstream",
          "The instinct for what looks good is a real skill and you build it by doing, not reading",
          "Portfolios are not showcases, they are conversations - build them that way",
          "Shipping something imperfect is always better than keeping something perfect in a private repo"
        ]
      },
      {
        "type": "paragraph",
        "text": "This site is not finished and honestly it probably never will be. Every time I learn something new I want to come back and improve something. That is fine. It is a living thing. This blog is part of that."
      }
    ]
  },
  {
    "id": "2",
    "slug": "my-take-on-the-ai-era",
    "entryNumber": "#002",
    "title": "My Take on the AI Era as a Dev from Nepal",
    "subtitle": "Everyone has an opinion on AI and coding. Here is mine, from someone who actually uses it every day.",
    "date": "2026-08-28",
    "readTime": 6,
    "mood": "thinking",
    "tags": [
      "ai",
      "opinion",
      "career"
    ],
    "excerpt": "I use AI tools every single day to build real things. And I think most of the \"developers are being replaced\" conversation is completely missing the point.",
    "content": [
      {
        "type": "paragraph",
        "text": "Let me be upfront. I use Claude, GPT, and Copilot regularly. Not to avoid work, but because they genuinely help me move faster. So when I say I think the \"AI is replacing developers\" panic is overblown, I am not saying it as someone who avoids the tools. I am saying it as someone who uses them and can see clearly what they do and do not do."
      },
      {
        "type": "heading",
        "text": "What AI is actually good at"
      },
      {
        "type": "paragraph",
        "text": "AI is excellent at pattern completion. Give it a clear, well-shaped problem and it will write working code faster than I can type. Boilerplate, CRUD operations, standard component structures, converting something from one format to another. All of that it handles really well. I am not going to pretend otherwise."
      },
      {
        "type": "paragraph",
        "text": "But here is what it cannot do. It cannot tell you why a system was built a certain way. It cannot feel when a technically correct solution is the wrong one for your actual users. It does not have judgment. It does not have taste. Every output it gives you is a probability distribution, not a decision. The decision is still yours."
      },
      {
        "type": "quote",
        "text": "The devs who will struggle are not the ones who cannot code without AI. They are the ones who stopped thinking once AI could type for them."
      },
      {
        "type": "heading",
        "text": "Why I chose to understand first"
      },
      {
        "type": "paragraph",
        "text": "I got into coding without a mentor, without a bootcamp, without any structured path. Just me and Stack Overflow and a lot of broken scripts. When these AI tools became widely available I could have used them to skip the hard parts. I deliberately did not. Because I understood that if I never built the mental model myself, I would never be able to effectively direct the AI or catch when it was wrong. And it is wrong more often than people admit."
      },
      {
        "type": "list",
        "items": [
          "Use AI to go faster, not to avoid understanding what you are building",
          "Build things by hand first, automate the parts you already understand",
          "The junior to senior jump is increasingly about judgment, not just syntax knowledge",
          "Every AI output is a first draft - the edit is where the real work starts"
        ]
      },
      {
        "type": "paragraph",
        "text": "I am building from Kathmandu. The global market is more competitive now, that is real. But the floor for what is worth paying a human developer for has also gone up. The commodity stuff is getting automated. What is left - architecture decisions, understanding user needs, debugging weird production issues at 2am, knowing when to say no to a feature - that stuff is more valuable than ever."
      },
      {
        "type": "paragraph",
        "text": "My bet is simple. A developer who thinks clearly and knows how to use AI well can do more than a team that does not. I would rather be that developer than spend energy worrying about being replaced."
      }
    ]
  },
  {
    "id": "3",
    "slug": "building-sara-my-ai-assistant",
    "entryNumber": "#003",
    "title": "I Built an AI Assistant Into My Portfolio. Here is What Actually Happened.",
    "subtitle": "The gap between \"add AI\" and building something that genuinely works is bigger than I expected.",
    "date": "2026-09-01",
    "readTime": 6,
    "mood": "building",
    "tags": [
      "ai",
      "project",
      "building",
      "sara"
    ],
    "excerpt": "Sara is the AI assistant living in my portfolio. Getting her from \"kinda works\" to something I was proud to ship took a lot more thought than I expected. This is that story.",
    "content": [
      {
        "type": "paragraph",
        "text": "The idea was straightforward. Instead of someone landing on my portfolio and reading static text about me, they could just ask questions. Sara would answer. Simple concept. I thought it would take a weekend. It took significantly longer than that."
      },
      {
        "type": "heading",
        "text": "Version one was embarrassing"
      },
      {
        "type": "paragraph",
        "text": "First version was: write a system prompt with my bio, take user message, call the API, stream the response back. It worked in the technical sense. Responses came back. They were just... bad. Too formal. Too generic. Reading them felt like talking to a LinkedIn post, not a person. I had built a chatbot that happened to know some facts about me, not an assistant that represented me."
      },
      {
        "type": "quote",
        "text": "The hardest part of building AI features is not the API integration. It is making the output feel like it was made by someone who actually cares."
      },
      {
        "type": "heading",
        "text": "The thing that actually fixed it"
      },
      {
        "type": "paragraph",
        "text": "The shift that changed everything was reframing the system prompt goal. Instead of \"describe Sagar accurately,\" I changed it to \"you are talking to someone who is deciding whether to reach out to Sagar for work.\" That one change completely transformed the outputs. Sara stopped giving Wikipedia summaries and started giving answers that actually moved the conversation forward."
      },
      {
        "type": "list",
        "items": [
          "Prompt engineering is product design - the whole user experience lives in that system prompt",
          "Specific instructions beat comprehensive instructions every single time",
          "Streaming makes responses feel alive in a way that waiting for the full reply never does",
          "Error states and rate limiting are not edge cases, they are part of the product"
        ]
      },
      {
        "type": "paragraph",
        "text": "The name Sara comes from SARA - Sagar's Autonomous Response Assistant. Yes it is a bit on the nose. It stuck anyway. She knows my projects, my stack, my opinions, the kind of work I am looking for. When someone asks something outside her context she says so directly instead of making something up."
      },
      {
        "type": "heading",
        "text": "What this taught me about AI features in general"
      },
      {
        "type": "paragraph",
        "text": "Most AI features fail not because the model is bad but because the thinking around it is weak. The model is just the engine. The actual work is everything wrapped around it: what context you give it, what constraints you set, what happens when something goes wrong, how you manage user expectations. Treat AI as a feature toggle and you get something forgettable. Treat it as a product problem and you might build something worth using."
      },
      {
        "type": "paragraph",
        "text": "Sara is still a work in progress. I keep tweaking the prompt, adjusting the UI, thinking about what she should and should not be able to do. But she works now in the way I actually wanted her to work. That was the goal."
      }
    ]
  },
  {
    "id": "4",
    "slug": "namo-patro-case-study",
    "entryNumber": "#004",
    "title": "Namo Patro: Building a Nepali Calendar App That Actually Works",
    "subtitle": "A case study on turning a genuinely hard localization problem into something people actually use.",
    "date": "2026-09-05",
    "readTime": 7,
    "mood": "building",
    "tags": [
      "case-study",
      "project",
      "nepal",
      "fullstack"
    ],
    "excerpt": "Nepali date conversion sounds like a niche problem until you realize every government document, every school form, and every bank in Nepal runs on BS dates. Here is how I built Namo Patro.",
    "content": [
      {
        "type": "paragraph",
        "text": "Every developer in Nepal hits this at some point. A client needs a date picker. Simple enough. Except the entire country officially runs on the Bikram Sambat calendar, which is 56 to 57 years ahead of Gregorian, has months of irregular lengths, and the conversion logic is not something you can just npm install your way out of. I hit this wall and decided to build the solution properly."
      },
      {
        "type": "paragraph",
        "text": "Namo Patro is a Nepali calendar and date converter app. The name means \"good calendar\" in Nepali. It lets users see the current BS date, convert between BS and AD, view festivals and public holidays, and look up tithis. On paper it sounds straightforward. In practice almost every part of it had a gotcha waiting underneath."
      },
      {
        "type": "heading",
        "text": "The calendar data problem"
      },
      {
        "type": "paragraph",
        "text": "The first thing I learned is that Bikram Sambat does not have a clean mathematical formula. Unlike the Gregorian calendar where you can compute any date algorithmically, BS month lengths have to be looked up from a reference table. Different years have different month lengths. Some months are 29 days, some are 32. There is no shortcut."
      },
      {
        "type": "paragraph",
        "text": "I spent two days just sourcing and verifying the reference data. I cross-checked month lengths across multiple official sources and found inconsistencies between them. The Nepal government calendar, various library implementations, and the data from existing Nepali calendar apps did not always agree. I had to make judgment calls on which source to trust and document why."
      },
      {
        "type": "quote",
        "text": "When your data source is the problem, no amount of clever code saves you. You have to go upstream and fix the data first."
      },
      {
        "type": "heading",
        "text": "The conversion logic"
      },
      {
        "type": "paragraph",
        "text": "Once I had clean reference data, the conversion algorithm itself was satisfying to write. The core idea is simple: convert the BS date to a day count offset from a known epoch, then map that offset to a Gregorian date. Going the other direction is the same operation in reverse. The tricky part is handling edge cases at month boundaries and making sure leap year behavior in the Gregorian side does not cause off-by-one errors on the BS side."
      },
      {
        "type": "paragraph",
        "text": "I wrote a test suite that converted every single day in a 10-year range in both directions and checked that the round trip always produced the original date. That caught three edge case bugs I would have missed entirely if I had just tested happy path scenarios."
      },
      {
        "type": "heading",
        "text": "The festival and tithi layer"
      },
      {
        "type": "paragraph",
        "text": "Public holidays in Nepal are declared by the government each year and are not always predictable from the calendar math alone. Some are fixed BS dates. Some like Dashain and Tihar are tied to lunar phases, which adds another calculation layer entirely. I ended up with a hybrid approach: fixed BS holidays are computed, lunar-based festivals are looked up from precomputed data for each year."
      },
      {
        "type": "list",
        "items": [
          "Always validate your reference data against at least two independent sources before writing a single line of logic",
          "Round-trip tests catch edge cases that directional tests miss completely",
          "Localization is rarely just a translation problem, it is often a fundamentally different data model",
          "Users do not care about your algorithm, they care about whether Dashain shows up on the right day",
          "Precomputed lookup tables are not laziness, sometimes they are just the honest solution"
        ]
      },
      {
        "type": "heading",
        "text": "What I would do differently"
      },
      {
        "type": "paragraph",
        "text": "I would separate the calendar engine from the UI layer much earlier. I built them too tightly coupled at first, which made testing harder than it needed to be. The conversion logic should have been a standalone module with a clear API from day one. It would have been easier to test, easier to reuse, and easier to swap out if I ever needed to update the reference data."
      },
      {
        "type": "paragraph",
        "text": "Namo Patro taught me that the projects that look simple from the outside are often the ones that demand the most rigor. A calendar app. How hard can it be. The answer is: harder than you think, and more interesting than you expect."
      }
    ]
  },
  {
    "id": "5",
    "slug": "signal-job-portal-case-study",
    "entryNumber": "#005",
    "title": "Signal Job Portal: What I Learned Building a Recruitment Platform Solo",
    "subtitle": "Two user types, one developer, a lot of design decisions made at 1am.",
    "date": "2026-09-10",
    "readTime": 8,
    "mood": "shipping",
    "tags": [
      "case-study",
      "project",
      "fullstack",
      "backend"
    ],
    "excerpt": "Signal is a job portal I built for the Nepali market. This is the honest breakdown of every major technical and product decision, what worked, what did not, and what I would change.",
    "content": [
      {
        "type": "paragraph",
        "text": "Signal started from a frustration I kept hearing. Developers and designers in Nepal looking for work were using Facebook groups, LinkedIn with no local context, and word of mouth. Employers on the other side had no good way to post tech roles and reach people who were actually qualified. The existing job boards were bloated, generic, and not built for the local market. I decided to build something that was."
      },
      {
        "type": "heading",
        "text": "The two-user-type problem"
      },
      {
        "type": "paragraph",
        "text": "Any platform with two distinct user types, in this case job seekers and employers, is secretly two products sharing a database. Every feature decision has to be made twice. A job seeker needs to browse, filter, save, and apply. An employer needs to post, review applications, manage listings, and communicate with candidates. The flows are completely different but they have to feel like one coherent product."
      },
      {
        "type": "paragraph",
        "text": "I started by mapping out every action each user type would take and listing the data each action needed. That exercise alone took half a day and saved me from several schema decisions I would have regretted later. The job listing is the central object that both sides interact with, so I made sure that model was solid before touching anything else."
      },
      {
        "type": "quote",
        "text": "Get the data model right before the first line of application code. Changing it later is not refactoring, it is surgery."
      },
      {
        "type": "heading",
        "text": "Auth and role management"
      },
      {
        "type": "paragraph",
        "text": "I used JWT-based auth with roles baked into the token payload. On registration, users pick whether they are a job seeker or an employer. That role is stored in the database and included in every token. On protected routes the middleware checks both that the token is valid and that the role matches what the route requires. Simple in concept, but the number of places you have to enforce it consistently adds up fast."
      },
      {
        "type": "paragraph",
        "text": "The biggest auth mistake I made early on was not separating the employer dashboard routes from the seeker routes at the router level. I was checking roles inside individual controllers instead. When I realized this I refactored it to use role-specific middleware at the router level, which made the codebase much easier to reason about and audit."
      },
      {
        "type": "heading",
        "text": "Search and filtering"
      },
      {
        "type": "paragraph",
        "text": "The search feature went through three implementations. Version one was a simple SQL LIKE query on the job title. Fast to build, embarrassingly limited. Version two added filters for location, job type, and salary range using query parameters. Version three added full-text search on both title and description using PostgreSQL full-text search vectors. Each version taught me something the previous one did not."
      },
      {
        "type": "paragraph",
        "text": "The thing about search that I did not appreciate early enough is that the query itself is only half the problem. The other half is deciding what to do when results are sparse. If a user searches for a very specific skill set and there are only two matching jobs, do you show those two and stop, or do you show related listings below them? I went with a fallback results section that shows listings from the same category when the exact search returns fewer than five results."
      },
      {
        "type": "heading",
        "text": "The application flow"
      },
      {
        "type": "paragraph",
        "text": "Job seekers can apply with a cover letter and either upload a resume or link to their existing one. Employers see a dashboard with all applications for each listing, can mark them as reviewed, shortlisted, or rejected, and can send a templated message to the applicant. I kept the communication layer deliberately simple. Full in-platform messaging was on the roadmap but adding it before validating the core loop would have been a distraction."
      },
      {
        "type": "list",
        "items": [
          "Map every user action and its required data before touching the schema",
          "Enforce authorization at the router or middleware level, not inside individual handlers",
          "Build search incrementally, but plan for full-text from the start so you do not paint yourself into a corner",
          "Ship the core loop before building communication or notification features",
          "Two user types means two products, budget time accordingly",
          "Sparse results need a fallback strategy, silence is a worse UX than imperfect suggestions"
        ]
      },
      {
        "type": "heading",
        "text": "What Signal taught me about product thinking"
      },
      {
        "type": "paragraph",
        "text": "Building Signal made me much more deliberate about the difference between features that make the core loop work and features that make it nicer. The core loop for Signal is: employer posts a job, seeker finds it and applies, employer reviews the application. Everything else is polish. I kept pulling myself back to that loop when I felt the temptation to add something clever."
      },
      {
        "type": "paragraph",
        "text": "The project also reinforced something I had read but not fully understood before: the hardest part of building a two-sided marketplace is not the technology, it is the cold start problem. Both sides need to exist for either side to get value. I solved this locally by seeding the platform with a few real job listings before opening it up. That gave early job seekers something to actually interact with."
      }
    ]
  },
  {
    "id": "6",
    "slug": "how-i-ship-fullstack-apps-solo",
    "entryNumber": "#006",
    "title": "How I Ship Full-Stack Apps Solo",
    "subtitle": "No team, no PM, no standups. Just a process that actually works for one person.",
    "date": "2026-09-14",
    "readTime": 6,
    "mood": "shipping",
    "tags": [
      "workflow",
      "productivity",
      "building",
      "solo"
    ],
    "excerpt": "Solo shipping is completely different from team development. The bottleneck is never the code. It is always the decision-making. Here is the system I built to keep moving.",
    "content": [
      {
        "type": "paragraph",
        "text": "I have shipped several full-stack projects without a team. Not small weekend scripts, actual applications with auth, databases, deployed frontends, and real users. People sometimes ask how I stay organized without a PM or a team to keep me accountable. The honest answer is that I had to build my own process from scratch because almost every productivity system out there is designed for teams, not solo builders."
      },
      {
        "type": "heading",
        "text": "The planning phase is not optional"
      },
      {
        "type": "paragraph",
        "text": "The single biggest mistake I made on my earlier projects was starting to code before I had a clear enough picture of what I was building. I thought planning was the slow part and coding was the fast part. That is completely backwards. An hour of planning removes days of backtracking. Now I do not write a single line of application code until I have answered three questions: What is the core user action this app exists to enable? What is the minimum data model that supports that action? What does done look like for version one?"
      },
      {
        "type": "quote",
        "text": "If you cannot describe your MVP in two sentences, you are not ready to build it yet."
      },
      {
        "type": "heading",
        "text": "How I structure the build"
      },
      {
        "type": "paragraph",
        "text": "I work in three phases for every project. Phase one is foundation: database schema, auth, basic routing, and the core data models. Nothing visible to a user, just the skeleton. Phase two is the core loop: the minimum set of features that makes the product actually usable for its primary purpose. Phase three is polish: error states, loading states, edge cases, the UI details that make it feel real. I never start phase three before phase two is working end to end."
      },
      {
        "type": "paragraph",
        "text": "The temptation to jump to phase three is constant. It is way more satisfying to make things look good than to handle a missing database record gracefully. But a polished broken app is worse than an ugly working one. I have a literal rule for myself: do not touch visual polish until the core flow works without any happy path cheating."
      },
      {
        "type": "heading",
        "text": "Managing decisions when there is no team"
      },
      {
        "type": "paragraph",
        "text": "On a team, you talk through decisions. Solo, you can spin in circles for an hour trying to pick between two approaches that are honestly pretty similar. I fixed this with a simple rule: if a decision is reversible, pick one and move on in under five minutes. If it is not reversible, spend the time to think it through properly. Most decisions are reversible. Choosing a UI library is reversible. Choosing a database schema after you have a week of data in it is not."
      },
      {
        "type": "paragraph",
        "text": "I also keep a short running notes file for each project where I write down decisions and the reason I made them. Not a formal spec, just a few sentences. This is invaluable when I come back to a project after two weeks away and cannot remember why I structured something a certain way."
      },
      {
        "type": "heading",
        "text": "Shipping without the finish line feeling real"
      },
      {
        "type": "paragraph",
        "text": "Solo projects have a weird psychological trap. Because there is no external deadline and no one waiting on you, it is easy to keep adding things and never call it done. I set a deliberate ship criteria at the start of every project: a specific list of what must work for v1. When that list is checked off, I deploy. Not when it feels perfect, not when I have added the nice-to-have features, when the list is done."
      },
      {
        "type": "list",
        "items": [
          "Answer the three planning questions before touching a code editor",
          "Foundation first, then core loop, then polish, never out of order",
          "Reversible decisions get five minutes max, irreversible ones get proper time",
          "Write down why you made architectural decisions, future you will thank you",
          "Define ship criteria upfront and treat that list as a contract with yourself",
          "Ugly and working beats beautiful and broken every single time"
        ]
      },
      {
        "type": "paragraph",
        "text": "The process is not glamorous but it works. The projects I shipped fastest were the ones where I followed these steps most closely. The ones that dragged on were the ones where I skipped planning because I was excited to start coding. Every single time."
      }
    ]
  },
  {
    "id": "7",
    "slug": "learning-to-code-in-nepal-without-mentors",
    "entryNumber": "#007",
    "title": "Learning to Code in Nepal Without Mentors",
    "subtitle": "No bootcamp, no senior dev to ask, no local community to lean on. Just you, the internet, and a lot of broken code.",
    "date": "2026-09-18",
    "readTime": 7,
    "mood": "reflecting",
    "tags": [
      "personal",
      "nepal",
      "learning",
      "career"
    ],
    "excerpt": "Learning to code anywhere is hard. Learning to code in Nepal without a mentor, without a community, and with inconsistent internet adds a specific kind of difficulty that most advice online does not account for.",
    "content": [
      {
        "type": "paragraph",
        "text": "Most coding advice on the internet comes from people who learned in San Francisco, London, or Bangalore. Places with bootcamps, meetups, senior developers you can email, and communities where asking for help is normal and expected. I learned in Kathmandu, largely alone, and the experience was different enough that I think it is worth writing about honestly."
      },
      {
        "type": "heading",
        "text": "What nobody tells you about self-teaching"
      },
      {
        "type": "paragraph",
        "text": "The resources are not the problem. You can get to YouTube tutorials, freeCodeCamp, documentation, Stack Overflow, all of it. The problem is knowing which resources to trust and in what order to use them. When you have a mentor, they curate that for you. They say start here, skip that, this course is outdated. Without one, you spend real time on things that will not help you, and you have no way of knowing until you are already deep into them."
      },
      {
        "type": "paragraph",
        "text": "I spent several months learning jQuery properly before someone online mentioned in passing that it was being phased out of serious projects. No one told me to skip it. I just did not know. That is a small example but the pattern repeated itself across frameworks, languages, and tools. The curriculum problem is real."
      },
      {
        "type": "quote",
        "text": "In tech, knowing what not to learn is just as valuable as knowing what to learn. Without a guide, you figure that out the hard way."
      },
      {
        "type": "heading",
        "text": "The isolation problem"
      },
      {
        "type": "paragraph",
        "text": "When you are stuck on a bug at 11pm, in a team environment you can ping someone or leave it for the next day and ask. Solo, you sit with it. You search for the error message, try twelve variations, read docs that assume knowledge you do not have yet. Some nights you fix it. Some nights you go to sleep having made zero visible progress and wake up with the solution obvious. That second kind of night is hard to get through when you are still early in learning."
      },
      {
        "type": "paragraph",
        "text": "The fix I eventually found was building in public, even when there was no audience. Posting what I was working on, writing about problems I solved, leaving comments on GitHub issues even when I had nothing definitive to add. It forced me to articulate my thinking, which improved my thinking. And occasionally someone would reply with something useful."
      },
      {
        "type": "heading",
        "text": "What Nepal specifically adds to the challenge"
      },
      {
        "type": "paragraph",
        "text": "Load shedding is less severe now than it was a few years ago but it was a real constraint when I was starting out. Downloading large project dependencies on inconsistent internet, trying to watch video tutorials that buffered constantly, losing work to sudden power cuts before learning to save obsessively. These are not complaints, they are context. The constraint of unreliable infrastructure forces a certain kind of resourcefulness."
      },
      {
        "type": "paragraph",
        "text": "There is also the career question that is specific to Nepal. The local tech market is growing but it is still small. Most of the roles that match what I was building toward are remote or abroad. That means you are competing globally from day one, which is motivating in some ways and isolating in others. You are learning to build things for a market you are not physically embedded in."
      },
      {
        "type": "heading",
        "text": "What actually moved the needle"
      },
      {
        "type": "paragraph",
        "text": "Building projects moved the needle, not tutorials. I could watch a React tutorial ten times and understand it abstractly. Building one bad project that broke in ten places taught me more than all of those tutorials combined. The error messages were mine, the debugging was mine, the decisions were mine. You cannot get that from watching someone else write code cleanly."
      },
      {
        "type": "list",
        "items": [
          "Tutorials teach syntax, projects teach judgment. You need both but in the right ratio",
          "Build in public even with no audience, the act of articulation sharpens the thinking",
          "Find one senior developer online whose writing you trust and learn their mental models, not just their code",
          "Spend time early figuring out what to learn, the curriculum problem is real and costly",
          "Constraints like bad internet and no local community build a problem-solving reflex that matters later",
          "Global competition from day one is harder psychologically but it raises the ceiling on where you can go"
        ]
      },
      {
        "type": "paragraph",
        "text": "I would not trade the path I took. Not because it was efficient, it absolutely was not. But because solving hard problems without a safety net builds a kind of self-reliance that is genuinely useful. When something breaks in production at midnight now, I do not panic because I spent years debugging alone with no one to call. The mentorless path was slower but it built something real."
      },
      {
        "type": "paragraph",
        "text": "If you are learning to code in Nepal right now, or anywhere without access to a local tech community, the main thing I want to say is this: the path is harder and it takes longer but the gap between where you are and where you want to be is closeable. I know because I closed a significant part of it myself, from a city most developers have not heard of, on an internet connection that used to cut out mid-download."
      }
    ]
  }
];

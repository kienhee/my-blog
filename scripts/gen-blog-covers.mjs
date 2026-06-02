import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const OUT = join(process.cwd(), "public/blog");
mkdirSync(OUT, { recursive: true });

const covers = [
  {
    file: "nextjs-drizzle.svg",
    accent: "#14532d",
    accentLight: "#4ade80",
    accentDim: "#0a2010",
    bg1: "#040c06",
    bg2: "#081410",
    cat: "NEXT.JS · DATABASE · TYPESCRIPT",
    line1: "Building Full-Stack",
    line2: "with Next.js 16 +",
    line3: "Drizzle ORM",
    desc1: "Type-safe SQL, zero runtime overhead,",
    desc2: "and Server Actions that actually make sense.",
    date: "Apr 28, 2026",
    read: "11 min read",
    visual: `
      <rect x="820" y="80" width="320" height="200" rx="8" fill="#040c06" stroke="#0a2010" stroke-width="1"/>
      <text x="836" y="108" font-family="monospace" font-size="11" fill="#14532d">const db = drizzle(client);</text>
      <text x="836" y="132" font-family="monospace" font-size="11" fill="#1e3a1e">export const users = sqliteTable(</text>
      <text x="836" y="152" font-family="monospace" font-size="11" fill="#1e3a1e">  'users', {</text>
      <text x="836" y="172" font-family="monospace" font-size="11" fill="#2d5a2d">    id: integer('id')</text>
      <text x="836" y="192" font-family="monospace" font-size="11" fill="#2d5a2d">      .primaryKey(),</text>
      <text x="836" y="212" font-family="monospace" font-size="11" fill="#2d5a2d">    email: text('email')</text>
      <text x="836" y="232" font-family="monospace" font-size="11" fill="#2d5a2d">      .notNull(),</text>
      <text x="836" y="252" font-family="monospace" font-size="11" fill="#1e3a1e">  });</text>
      <line x1="820" y1="300" x2="1140" y2="300" stroke="#0a2010" stroke-width="1"/>
      <text x="836" y="330" font-family="monospace" font-size="10" fill="#0a2010">Drizzle ORM + Turso + Next.js 16</text>
    `,
  },
  {
    file: "over-engineering.svg",
    accent: "#7f1d1d",
    accentLight: "#f87171",
    accentDim: "#200a0a",
    bg1: "#080404",
    bg2: "#120606",
    cat: "ENGINEERING · PRODUCTIVITY · MINDSET",
    line1: "The Hidden Cost of",
    line2: "Over-Engineering",
    line3: "Your Side Projects",
    desc1: "Why I abandoned a 6-month project",
    desc2: "and what I learned about premature abstraction.",
    date: "Apr 10, 2026",
    read: "6 min read",
    visual: `
      <text x="850" y="180" font-family="Arial Black, sans-serif" font-size="200" font-weight="900" fill="#100404" letter-spacing="-10">∞</text>
      <text x="900" y="420" font-family="monospace" font-size="11" fill="#3d0a0a" text-anchor="middle">never shipped</text>
    `,
  },
  {
    file: "vercel-deployment.svg",
    accent: "#1e3a8a",
    accentLight: "#60a5fa",
    accentDim: "#0a0a20",
    bg1: "#050510",
    bg2: "#080818",
    cat: "DEVOPS · VERCEL · DEPLOYMENT",
    line1: "From Zero to",
    line2: "Production with",
    line3: "Vercel",
    desc1: "CI/CD, preview deployments, edge config,",
    desc2: "and a custom domain — in 10 minutes.",
    date: "Mar 22, 2026",
    read: "7 min read",
    visual: `
      <!-- Pipeline boxes -->
      <rect x="820" y="130" width="80" height="36" rx="4" fill="#080818" stroke="#1e3a8a" stroke-width="1"/>
      <text x="860" y="153" font-family="monospace" font-size="9" fill="#3b82f6" text-anchor="middle">git push</text>
      <line x1="900" y1="148" x2="940" y2="148" stroke="#1e3a8a" stroke-width="1"/>
      <text x="930" y="145" font-family="monospace" font-size="10" fill="#1e3a8a">›</text>
      <rect x="940" y="130" width="80" height="36" rx="4" fill="#080818" stroke="#1e3a8a" stroke-width="1"/>
      <text x="980" y="153" font-family="monospace" font-size="9" fill="#3b82f6" text-anchor="middle">build</text>
      <line x1="1020" y1="148" x2="1060" y2="148" stroke="#1e3a8a" stroke-width="1"/>
      <text x="1050" y="145" font-family="monospace" font-size="10" fill="#1e3a8a">›</text>
      <rect x="1060" y="130" width="80" height="36" rx="4" fill="#080818" stroke="#14532d" stroke-width="1"/>
      <text x="1100" y="153" font-family="monospace" font-size="9" fill="#22c55e" text-anchor="middle">deploy ✓</text>
      <!-- Preview URL -->
      <rect x="820" y="210" width="320" height="28" rx="4" fill="#0a0a18" stroke="#1a1a30" stroke-width="1"/>
      <text x="836" y="229" font-family="monospace" font-size="9" fill="#3b82f6">https://my-app-pr-42.vercel.app</text>
      <text x="820" y="270" font-family="monospace" font-size="9" fill="#1e3a8a">Preview · Edge · SSL · Auto</text>
    `,
  },
  {
    file: "cursor-editor.svg",
    accent: "#1e40af",
    accentLight: "#93c5fd",
    accentDim: "#0a0f30",
    bg1: "#030810",
    bg2: "#060c18",
    cat: "TOOLS · PRODUCTIVITY · AI",
    line1: "Why I Switched",
    line2: "from VS Code",
    line3: "to Cursor",
    desc1: "8 months of daily use — what's better,",
    desc2: "what's overhyped, and is it worth $20/mo.",
    date: "Mar 5, 2026",
    read: "5 min read",
    visual: `
      <rect x="810" y="60" width="350" height="480" rx="8" fill="#060c18" stroke="#0a1830" stroke-width="1"/>
      <rect x="810" y="60" width="350" height="36" rx="8" fill="#0a1428"/>
      <rect x="810" y="82" width="350" height="14" fill="#0a1428"/>
      <circle cx="832" cy="78" r="5" fill="#ff5f57"/>
      <circle cx="850" cy="78" r="5" fill="#febc2e"/>
      <circle cx="868" cy="78" r="5" fill="#28c840"/>
      <text x="985" y="82" font-family="monospace" font-size="9" fill="#1e3a8a" text-anchor="middle">auth.ts — Cursor</text>
      <text x="828" y="118" font-family="monospace" font-size="10" fill="#1e3a8a">1</text>
      <text x="848" y="118" font-family="monospace" font-size="10" fill="#3b82f6">import</text>
      <text x="896" y="118" font-family="monospace" font-size="10" fill="#93c5fd"> { signIn }</text>
      <text x="828" y="138" font-family="monospace" font-size="10" fill="#1e3a8a">2</text>
      <text x="848" y="138" font-family="monospace" font-size="10" fill="#1e3a8a">// AI suggestion:</text>
      <rect x="828" y="148" width="310" height="56" rx="4" fill="#0a1a30" stroke="#1e40af" stroke-width="1"/>
      <text x="840" y="166" font-family="monospace" font-size="9" fill="#60a5fa">▸ Add rate limiting to prevent</text>
      <text x="840" y="182" font-family="monospace" font-size="9" fill="#60a5fa">  brute-force attacks on signIn</text>
      <text x="840" y="196" font-family="monospace" font-size="9" fill="#1e3a8a">  Tab to accept · Esc to dismiss</text>
    `,
  },
  {
    file: "typescript-tricks.svg",
    accent: "#1e3a8a",
    accentLight: "#60a5fa",
    accentDim: "#0a0f30",
    bg1: "#030810",
    bg2: "#050a18",
    cat: "TYPESCRIPT · ENGINEERING",
    line1: "TypeScript Tricks",
    line2: "Every Senior Dev",
    line3: "Should Know",
    desc1: "satisfies, template literals, conditional types,",
    desc2: "and the infer keyword — finally explained.",
    date: "Feb 18, 2026",
    read: "9 min read",
    visual: `
      <rect x="820" y="80" width="330" height="260" rx="8" fill="#040c18" stroke="#0f1f40" stroke-width="1"/>
      <text x="836" y="110" font-family="monospace" font-size="11" fill="#3b82f6">type Awaited&lt;T&gt; =</text>
      <text x="836" y="132" font-family="monospace" font-size="11" fill="#60a5fa">  T extends Promise&lt;infer U&gt;</text>
      <text x="836" y="152" font-family="monospace" font-size="11" fill="#60a5fa">    ? U</text>
      <text x="836" y="172" font-family="monospace" font-size="11" fill="#60a5fa">    : T;</text>
      <line x1="836" y1="188" x2="1130" y2="188" stroke="#0f1f40" stroke-width="1"/>
      <text x="836" y="210" font-family="monospace" font-size="11" fill="#1e40af">const config = {</text>
      <text x="836" y="230" font-family="monospace" font-size="11" fill="#1e40af">  port: 3000,</text>
      <text x="836" y="250" font-family="monospace" font-size="11" fill="#60a5fa">} satisfies Config;</text>
      <text x="836" y="270" font-family="monospace" font-size="11" fill="#1e40af">// port is number, not string | number</text>
      <text x="836" y="318" font-family="monospace" font-size="10" fill="#0f1f40">TypeScript 5.x · Advanced patterns</text>
    `,
  },
  {
    file: "tailwind-v4.svg",
    accent: "#164e63",
    accentLight: "#22d3ee",
    accentDim: "#061420",
    bg1: "#020c10",
    bg2: "#041018",
    cat: "CSS · TAILWIND · FRONTEND",
    line1: "Migrating to",
    line2: "Tailwind CSS v4:",
    line3: "What Changed",
    desc1: "CSS-first config, Lightning CSS, new utilities,",
    desc2: "and the gotchas that caught me off guard.",
    date: "May 10, 2026",
    read: "10 min read",
    visual: `
      <rect x="820" y="80" width="330" height="260" rx="8" fill="#020c10" stroke="#0a2030" stroke-width="1"/>
      <text x="836" y="110" font-family="monospace" font-size="11" fill="#164e63">@import "tailwindcss";</text>
      <text x="836" y="134" font-family="monospace" font-size="11" fill="#0e7490">@theme {</text>
      <text x="836" y="154" font-family="monospace" font-size="11" fill="#0891b2">  --font-display:</text>
      <text x="836" y="174" font-family="monospace" font-size="11" fill="#22d3ee">    "Archivo", sans-serif;</text>
      <text x="836" y="194" font-family="monospace" font-size="11" fill="#0891b2">  --color-brand:</text>
      <text x="836" y="214" font-family="monospace" font-size="11" fill="#22d3ee">    oklch(60% 0.2 250);</text>
      <text x="836" y="234" font-family="monospace" font-size="11" fill="#0e7490">}</text>
      <line x1="836" y1="250" x2="1130" y2="250" stroke="#0a2030" stroke-width="1"/>
      <text x="836" y="270" font-family="monospace" font-size="10" fill="#164e63">No more tailwind.config.js ·</text>
      <text x="836" y="290" font-family="monospace" font-size="10" fill="#164e63">Lightning CSS built-in</text>
      <text x="836" y="318" font-family="monospace" font-size="10" fill="#061420">Tailwind v4 · CSS-first config</text>
    `,
  },
  {
    file: "design-system.svg",
    accent: "#581c87",
    accentLight: "#d946ef",
    accentDim: "#1a0830",
    bg1: "#08030e",
    bg2: "#0c0618",
    cat: "DESIGN · FRONTEND · ARCHITECTURE",
    line1: "Building a Design",
    line2: "System From",
    line3: "Scratch in 2026",
    desc1: "Tailwind + Radix UI + Storybook —",
    desc2: "the decisions I made and the ones I regret.",
    date: "Apr 20, 2026",
    read: "13 min read",
    visual: `
      <!-- Color swatches -->
      <rect x="820" y="100" width="40" height="40" rx="4" fill="#1a0830"/>
      <rect x="868" y="100" width="40" height="40" rx="4" fill="#2d1050"/>
      <rect x="916" y="100" width="40" height="40" rx="4" fill="#4a1880"/>
      <rect x="964" y="100" width="40" height="40" rx="4" fill="#7c3aed"/>
      <rect x="1012" y="100" width="40" height="40" rx="4" fill="#a78bfa"/>
      <rect x="1060" y="100" width="40" height="40" rx="4" fill="#ddd6fe"/>
      <rect x="1108" y="100" width="40" height="40" rx="4" fill="#f5f3ff"/>
      <!-- Component boxes -->
      <rect x="820" y="168" width="140" height="52" rx="6" fill="#0c0618" stroke="#2d1050" stroke-width="1"/>
      <text x="890" y="198" font-family="monospace" font-size="10" fill="#7c3aed" text-anchor="middle">Button</text>
      <rect x="972" y="168" width="176" height="52" rx="6" fill="#0c0618" stroke="#2d1050" stroke-width="1"/>
      <text x="1060" y="198" font-family="monospace" font-size="10" fill="#7c3aed" text-anchor="middle">Input</text>
      <rect x="820" y="238" width="100" height="36" rx="6" fill="#4a1880" stroke="none"/>
      <text x="870" y="261" font-family="monospace" font-size="10" fill="#f5f3ff" text-anchor="middle">Primary</text>
      <rect x="930" y="238" width="100" height="36" rx="6" fill="#0c0618" stroke="#4a1880" stroke-width="1"/>
      <text x="980" y="261" font-family="monospace" font-size="10" fill="#7c3aed" text-anchor="middle">Ghost</text>
      <rect x="1040" y="238" width="108" height="36" rx="18" fill="#0c0618" stroke="#2d1050" stroke-width="1"/>
      <text x="1094" y="261" font-family="monospace" font-size="10" fill="#a78bfa" text-anchor="middle">Rounded</text>
      <!-- Typography scale -->
      <text x="820" y="320" font-family="Arial Black, sans-serif" font-size="20" font-weight="900" fill="#7c3aed">Aa</text>
      <text x="870" y="320" font-family="Arial Black, sans-serif" font-size="16" font-weight="700" fill="#4a1880">Bb</text>
      <text x="912" y="320" font-family="Arial, sans-serif" font-size="14" fill="#2d1050">Cc</text>
      <text x="944" y="320" font-family="monospace" font-size="11" fill="#1a0830">Mono</text>
    `,
  },
  {
    file: "web-performance.svg",
    accent: "#78350f",
    accentLight: "#fb923c",
    accentDim: "#1c0c02",
    bg1: "#080402",
    bg2: "#100804",
    cat: "PERFORMANCE · NEXT.JS · FRONTEND",
    line1: "Fixing Core Web",
    line2: "Vitals: A Practical",
    line3: "Guide",
    desc1: "Real fixes for LCP, CLS, and INP",
    desc2: "in production Next.js applications.",
    date: "Mar 14, 2026",
    read: "12 min read",
    visual: `
      <!-- Metrics -->
      <rect x="820" y="100" width="100" height="80" rx="8" fill="#080402" stroke="#78350f" stroke-width="1"/>
      <text x="870" y="135" font-family="Arial Black, sans-serif" font-size="22" font-weight="900" fill="#fb923c" text-anchor="middle">1.2s</text>
      <text x="870" y="158" font-family="monospace" font-size="8" fill="#78350f" text-anchor="middle">LCP</text>
      <circle cx="870" cy="168" r="4" fill="#22c55e"/>
      <rect x="934" y="100" width="100" height="80" rx="8" fill="#080402" stroke="#14532d" stroke-width="1"/>
      <text x="984" y="135" font-family="Arial Black, sans-serif" font-size="22" font-weight="900" fill="#4ade80" text-anchor="middle">0.02</text>
      <text x="984" y="158" font-family="monospace" font-size="8" fill="#14532d" text-anchor="middle">CLS</text>
      <circle cx="984" cy="168" r="4" fill="#22c55e"/>
      <rect x="1048" y="100" width="100" height="80" rx="8" fill="#080402" stroke="#78350f" stroke-width="1"/>
      <text x="1098" y="135" font-family="Arial Black, sans-serif" font-size="22" font-weight="900" fill="#fb923c" text-anchor="middle">180ms</text>
      <text x="1098" y="158" font-family="monospace" font-size="8" fill="#78350f" text-anchor="middle">INP</text>
      <circle cx="1098" cy="168" r="4" fill="#fbbf24"/>
      <!-- Perf bar chart -->
      <rect x="820" y="220" width="328" height="180" rx="8" fill="#080402" stroke="#1c0c02" stroke-width="1"/>
      <text x="836" y="244" font-family="monospace" font-size="9" fill="#78350f">Before</text>
      <rect x="836" y="252" width="200" height="14" rx="2" fill="#7f1d1d"/>
      <text x="836" y="278" font-family="monospace" font-size="9" fill="#14532d">After</text>
      <rect x="836" y="286" width="88" height="14" rx="2" fill="#14532d"/>
      <text x="836" y="312" font-family="monospace" font-size="9" fill="#78350f">Before</text>
      <rect x="836" y="320" width="160" height="14" rx="2" fill="#7f1d1d"/>
      <text x="836" y="346" font-family="monospace" font-size="9" fill="#14532d">After</text>
      <rect x="836" y="354" width="52" height="14" rx="2" fill="#14532d"/>
      <text x="1100" y="394" font-family="monospace" font-size="9" fill="#1c0c02" text-anchor="end">56% faster</text>
    `,
  },
  {
    file: "node-vs-bun.svg",
    accent: "#713f12",
    accentLight: "#fbbf24",
    accentDim: "#1a0e02",
    bg1: "#060400",
    bg2: "#0c0800",
    cat: "NODE.JS · BUN · BACKEND",
    line1: "Node.js vs Bun",
    line2: "in 2026:",
    line3: "Which Should You Use?",
    desc1: "6 months of production data —",
    desc2: "performance, compatibility, ecosystem.",
    date: "Feb 28, 2026",
    read: "8 min read",
    visual: `
      <!-- Comparison -->
      <rect x="820" y="100" width="150" height="240" rx="8" fill="#060400" stroke="#1a0e02" stroke-width="1"/>
      <text x="895" y="128" font-family="Arial Black, sans-serif" font-size="13" font-weight="700" fill="#6e7681" text-anchor="middle">Node 22</text>
      <text x="895" y="180" font-family="Arial Black, sans-serif" font-size="36" font-weight="900" fill="#6e7681" text-anchor="middle">42k</text>
      <text x="895" y="202" font-family="monospace" font-size="9" fill="#3f3f46" text-anchor="middle">req/sec</text>
      <rect x="820" y="218" width="150" height="44" rx="4" fill="#0a0a0a"/>
      <text x="895" y="244" font-family="monospace" font-size="9" fill="#3f3f46" text-anchor="middle">p99: 8.2ms</text>

      <rect x="988" y="100" width="162" height="240" rx="8" fill="#1a0e02" stroke="#713f12" stroke-width="1"/>
      <text x="1069" y="128" font-family="Arial Black, sans-serif" font-size="13" font-weight="700" fill="#fbbf24" text-anchor="middle">Bun 2.0</text>
      <text x="1069" y="180" font-family="Arial Black, sans-serif" font-size="36" font-weight="900" fill="#fbbf24" text-anchor="middle">118k</text>
      <text x="1069" y="202" font-family="monospace" font-size="9" fill="#713f12" text-anchor="middle">req/sec</text>
      <rect x="988" y="218" width="162" height="44" rx="4" fill="#120a00"/>
      <text x="1069" y="244" font-family="monospace" font-size="9" fill="#713f12" text-anchor="middle">p99: 2.9ms</text>

      <text x="975" y="370" font-family="Arial Black, sans-serif" font-size="22" fill="#fbbf24" text-anchor="middle">2.8×</text>
      <text x="975" y="390" font-family="monospace" font-size="9" fill="#713f12" text-anchor="middle">faster</text>
    `,
  },
  {
    file: "api-design.svg",
    accent: "#3730a3",
    accentLight: "#818cf8",
    accentDim: "#0e0c30",
    bg1: "#04040e",
    bg2: "#080818",
    cat: "API · BACKEND · ARCHITECTURE",
    line1: "API Design",
    line2: "Patterns I Wish",
    line3: "I Knew Earlier",
    desc1: "Versioning, error formats, pagination,",
    desc2: "and idempotency keys explained.",
    date: "Jan 30, 2026",
    read: "11 min read",
    visual: `
      <!-- REST endpoints -->
      <rect x="820" y="90" width="330" height="40" rx="6" fill="#080818" stroke="#0e0c30" stroke-width="1"/>
      <rect x="828" y="103" width="44" height="14" rx="2" fill="#14532d"/>
      <text x="850" y="114" font-family="monospace" font-size="9" fill="#4ade80" text-anchor="middle">GET</text>
      <text x="882" y="114" font-family="monospace" font-size="10" fill="#6366f1">/api/v1/posts</text>
      <text x="1100" y="114" font-family="monospace" font-size="9" fill="#14532d">200 OK</text>

      <rect x="820" y="142" width="330" height="40" rx="6" fill="#080818" stroke="#0e0c30" stroke-width="1"/>
      <rect x="828" y="155" width="44" height="14" rx="2" fill="#1e3a8a"/>
      <text x="850" y="166" font-family="monospace" font-size="9" fill="#60a5fa" text-anchor="middle">POST</text>
      <text x="882" y="166" font-family="monospace" font-size="10" fill="#6366f1">/api/v1/posts</text>
      <text x="1100" y="166" font-family="monospace" font-size="9" fill="#1e3a8a">201 Created</text>

      <rect x="820" y="194" width="330" height="40" rx="6" fill="#080818" stroke="#0e0c30" stroke-width="1"/>
      <rect x="828" y="207" width="44" height="14" rx="2" fill="#78350f"/>
      <text x="850" y="218" font-family="monospace" font-size="9" fill="#fb923c" text-anchor="middle">PUT</text>
      <text x="882" y="218" font-family="monospace" font-size="10" fill="#6366f1">/api/v1/posts/:id</text>
      <text x="1100" y="218" font-family="monospace" font-size="9" fill="#78350f">200 OK</text>

      <rect x="820" y="246" width="330" height="40" rx="6" fill="#080818" stroke="#0e0c30" stroke-width="1"/>
      <rect x="828" y="259" width="44" height="14" rx="2" fill="#7f1d1d"/>
      <text x="850" y="270" font-family="monospace" font-size="9" fill="#f87171" text-anchor="middle">DELETE</text>
      <text x="882" y="270" font-family="monospace" font-size="10" fill="#6366f1">/api/v1/posts/:id</text>
      <text x="1100" y="270" font-family="monospace" font-size="9" fill="#7f1d1d">204 No Content</text>

      <!-- Error response -->
      <rect x="820" y="310" width="330" height="90" rx="6" fill="#06040c" stroke="#200a40" stroke-width="1"/>
      <text x="836" y="332" font-family="monospace" font-size="9" fill="#4c1d95">{ "error": {</text>
      <text x="836" y="350" font-family="monospace" font-size="9" fill="#7c3aed">  "code": "NOT_FOUND",</text>
      <text x="836" y="368" font-family="monospace" font-size="9" fill="#7c3aed">  "message": "Post not found",</text>
      <text x="836" y="386" font-family="monospace" font-size="9" fill="#4c1d95">  "status": 404 }}</text>
    `,
  },
  {
    file: "git-workflow.svg",
    accent: "#14532d",
    accentLight: "#4ade80",
    accentDim: "#0a1e0a",
    bg1: "#030804",
    bg2: "#060e06",
    cat: "GIT · TOOLS · PRODUCTIVITY",
    line1: "My Git Workflow",
    line2: "as a Solo",
    line3: "Developer",
    desc1: "Trunk-based development for one —",
    desc2: "branches, commits, and tags that scale.",
    date: "Jan 15, 2026",
    read: "6 min read",
    visual: `
      <!-- Git branch diagram -->
      <!-- main branch line -->
      <line x1="850" y1="200" x2="1150" y2="200" stroke="#14532d" stroke-width="2"/>
      <!-- Commits on main -->
      <circle cx="880" cy="200" r="7" fill="#14532d"/>
      <circle cx="960" cy="200" r="7" fill="#14532d"/>
      <circle cx="1040" cy="200" r="7" fill="#14532d"/>
      <circle cx="1120" cy="200" r="7" fill="#22c55e"/>
      <!-- Feature branch -->
      <path d="M 960 200 Q 980 160 1000 140" stroke="#1e40af" stroke-width="1.5" fill="none"/>
      <line x1="1000" y1="140" x2="1060" y2="140" stroke="#1e40af" stroke-width="1.5"/>
      <path d="M 1060 140 Q 1080 160 1100 200" stroke="#1e40af" stroke-width="1.5" fill="none"/>
      <circle cx="1000" cy="140" r="5" fill="#1e40af"/>
      <circle cx="1040" cy="140" r="5" fill="#1e40af"/>
      <circle cx="1060" cy="140" r="5" fill="#1e40af"/>
      <!-- Labels -->
      <text x="845" y="228" font-family="monospace" font-size="9" fill="#14532d">main</text>
      <text x="980" y="128" font-family="monospace" font-size="9" fill="#1e40af">feat/new-feature</text>
      <!-- Commit messages -->
      <text x="856" y="258" font-family="monospace" font-size="8" fill="#1a3a1a">chore: init</text>
      <text x="928" y="258" font-family="monospace" font-size="8" fill="#1a3a1a">feat: auth</text>
      <text x="1000" y="258" font-family="monospace" font-size="8" fill="#1a3a1a">merge</text>
      <text x="1078" y="258" font-family="monospace" font-size="8" fill="#22c55e">v1.0.0 🏷</text>
      <!-- Tag -->
      <rect x="1096" y="170" width="56" height="20" rx="4" fill="#0a1e0a" stroke="#14532d" stroke-width="1"/>
      <text x="1124" y="184" font-family="monospace" font-size="8" fill="#4ade80" text-anchor="middle">v1.0.0</text>
      <!-- Terminal snippet -->
      <rect x="820" y="300" width="330" height="80" rx="6" fill="#030804" stroke="#0a1e0a" stroke-width="1"/>
      <text x="836" y="324" font-family="monospace" font-size="10" fill="#22c55e">$</text>
      <text x="852" y="324" font-family="monospace" font-size="10" fill="#4a4a5a"> git switch -c feat/dashboard</text>
      <text x="836" y="344" font-family="monospace" font-size="10" fill="#22c55e">$</text>
      <text x="852" y="344" font-family="monospace" font-size="10" fill="#4a4a5a"> git add -p</text>
      <text x="836" y="364" font-family="monospace" font-size="10" fill="#22c55e">$</text>
      <text x="852" y="364" font-family="monospace" font-size="10" fill="#4a4a5a"> git commit -m "feat: dashboard"</text>
    `,
  },
];

function makeCover({ file, accent, accentLight, accentDim, bg1, bg2, cat, line1, line2, line3, desc1, desc2, date, read, visual }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${bg1}"/>
      <stop offset="100%" style="stop-color:${bg2}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#bg)"/>

  ${visual}

  <!-- Category -->
  <text x="48" y="72" font-family="Arial, sans-serif" font-size="10" fill="${accent}" letter-spacing="4">${cat}</text>

  <!-- Title -->
  <text x="48" y="180" font-family="Arial Black, sans-serif" font-size="56" font-weight="900" fill="#f5f5f5" letter-spacing="-2">${line1}</text>
  <text x="48" y="252" font-family="Arial Black, sans-serif" font-size="56" font-weight="900" fill="#f5f5f5" letter-spacing="-2">${line2}</text>
  <text x="48" y="324" font-family="Arial Black, sans-serif" font-size="56" font-weight="900" fill="none" stroke="${accentDim}" stroke-width="1.5" letter-spacing="-2">${line3}</text>

  <!-- Description -->
  <text x="48" y="392" font-family="Arial, sans-serif" font-size="15" fill="#52525b">${desc1}</text>
  <text x="48" y="414" font-family="Arial, sans-serif" font-size="15" fill="#52525b">${desc2}</text>

  <!-- Meta bar -->
  <rect x="0" y="610" width="1200" height="65" fill="${bg1}" opacity="0.9"/>
  <line x1="0" y1="610" x2="1200" y2="610" stroke="${accentDim}" stroke-width="1"/>
  <text x="48" y="652" font-family="Arial, sans-serif" font-size="12" fill="#3f3f46">${date}</text>
  <text x="220" y="652" font-family="Arial, sans-serif" font-size="12" fill="#3f3f46">${read}</text>
  <text x="1152" y="652" font-family="Arial, sans-serif" font-size="11" fill="${accent}" text-anchor="end">kienhee.com</text>
</svg>`;
}

for (const cover of covers) {
  const svg = makeCover(cover);
  writeFileSync(join(OUT, cover.file), svg);
  console.log(`✓ ${cover.file}`);
}

console.log(`\nGenerated ${covers.length} blog cover images.`);

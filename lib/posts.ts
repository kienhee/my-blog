export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: number;
  featured?: boolean;
  /** Path relative to /public, e.g. "/blog/react-server-components.svg" */
  image?: string;
  content: string;
}

export const POSTS: Post[] = [
  {
    slug: "react-server-components-2026",
    title: "Understanding React Server Components in 2026",
    description:
      "A deep dive into RSC architecture, mental models for thinking about data fetching, and practical patterns I use every day.",
    date: "2026-05-20",
    tags: ["React", "Next.js", "Architecture"],
    readingTime: 8,
    featured: true,
    image: "/blog/react-server-components.svg",
    content: `
## What Are React Server Components?

React Server Components (RSC) represent a fundamental shift in how we think about rendering. Instead of fetching data client-side after the component mounts, RSC lets you fetch data directly in the component on the server.

\`\`\`tsx
// This runs on the server — no useEffect, no loading states
async function BlogPost({ slug }: { slug: string }) {
  const post = await db.posts.findUnique({ where: { slug } });
  return <article>{post.content}</article>;
}
\`\`\`

## The Mental Model

Think of your UI as two distinct layers:

1. **Server layer** — static structure, data-fetching, layout
2. **Client layer** — interactivity, state, browser APIs

The key insight is that most of your UI doesn't need to be interactive. It just needs to display data.

## Practical Patterns

### Pattern 1: Push client boundaries down

The most common mistake is making entire pages client components. Instead, push the \`"use client"\` boundary as far down the tree as possible.

\`\`\`tsx
// ❌ Bad — entire page is a client component
"use client";
export default function BlogPage() { ... }

// ✓ Good — only the interactive part is a client component
export default function BlogPage() {
  return (
    <div>
      <PostList posts={posts} />   {/* Server component */}
      <SearchBar />                 {/* Client component */}
    </div>
  );
}
\`\`\`

### Pattern 2: Parallel data fetching

When you have multiple independent data sources, fetch them in parallel:

\`\`\`tsx
async function Dashboard() {
  const [user, posts, analytics] = await Promise.all([
    getUser(),
    getPosts(),
    getAnalytics(),
  ]);
  // ...
}
\`\`\`

## Conclusion

RSC isn't just a performance optimization — it's a new programming model. Once it clicks, you'll find yourself writing significantly less boilerplate code.
    `.trim(),
  },
  {
    slug: "nextjs-16-drizzle-orm",
    title: "Building a Full-Stack App with Next.js 16 and Drizzle ORM",
    description:
      "How I set up a production-ready stack with Next.js App Router, Drizzle ORM, Turso, and Zod — zero runtime overhead.",
    date: "2026-04-28",
    tags: ["Next.js", "Database", "TypeScript"],
    readingTime: 11,
    featured: true,
    image: "/blog/nextjs-drizzle.svg",
    content: `
## Why Drizzle?

After years of using Prisma, I switched to Drizzle for one reason: **it's just TypeScript**.

No custom query language. No abstract DSL. Just type-safe SQL that compiles to the exact query you'd write by hand.

\`\`\`typescript
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN!,
});

export const db = drizzle(client);
\`\`\`

## Schema Definition

Defining your schema in TypeScript means your types are always in sync with your database:

\`\`\`typescript
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  publishedAt: integer('published_at', { mode: 'timestamp' }),
});
\`\`\`

## Server Actions + Drizzle

The real power comes when you combine Server Actions with Drizzle:

\`\`\`typescript
"use server";

import { db } from '@/lib/db';
import { posts } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function getPost(slug: string) {
  return db.select().from(posts).where(eq(posts.slug, slug)).get();
}
\`\`\`

## Conclusion

The Drizzle + Turso + Next.js stack gives you full-stack TypeScript with near-zero latency database access. Highly recommend.
    `.trim(),
  },
  {
    slug: "hidden-cost-of-over-engineering",
    title: "The Hidden Cost of Over-Engineering Your Side Projects",
    description:
      "Why I abandoned a 6-month side project, what I learned about premature abstraction, and how I approach new projects differently now.",
    date: "2026-04-10",
    tags: ["Engineering", "Productivity", "Mindset"],
    readingTime: 6,
    featured: true,
    image: "/blog/over-engineering.svg",
    content: `
## The Six-Month Project That Never Shipped

I spent six months building a SaaS tool. Beautiful architecture. Clean abstractions. A custom event bus, a plugin system, multi-tenant everything. It never launched.

The problem wasn't technical. The problem was I was solving problems I didn't have yet.

## What Over-Engineering Actually Costs

The obvious cost is time. But the hidden cost is **momentum**.

Every hour you spend on infrastructure is an hour you're not talking to users. Every abstraction layer you add is one more thing to explain to contributors. Every "future-proof" decision is a bet that the future will look exactly like you imagined.

> Complexity is easy to add and hard to remove.

## The Rule I Use Now

**Build for now. Refactor for scale when you have the problem.**

When starting a new project, I ask myself: *"Does this decision help me ship faster or slower today?"*

If a pattern, abstraction, or tool doesn't directly help me ship today, I skip it.

## Practical Rules

1. **No abstractions before 3 uses** — If you haven't repeated the pattern 3 times, don't abstract it.
2. **Use boring technology** — Postgres, not Kafka. A cron job, not an event-driven architecture.
3. **Ship the ugly version first** — Users don't see your code. They see what your code produces.

## Conclusion

The best architecture is the one that ships. Everything else is a hypothesis.
    `.trim(),
  },
  {
    slug: "zero-to-production-vercel",
    title: "From Zero to Production: Deploying with Vercel in 10 Minutes",
    description:
      "A practical walkthrough of Vercel's deployment pipeline, environment variables, preview deployments, and edge config.",
    date: "2026-03-22",
    tags: ["DevOps", "Vercel", "Deployment"],
    readingTime: 7,
    image: "/blog/vercel-deployment.svg",
    content: `
## Why Vercel?

For Next.js projects, Vercel is the easiest path to production. It handles:

- Automatic CI/CD from your git branch
- Preview deployments per PR
- Edge caching for static assets
- Serverless functions at the edge

## Setup in 3 Steps

### Step 1: Connect your repo

\`\`\`bash
npx vercel
\`\`\`

Follow the prompts. Done.

### Step 2: Environment variables

\`\`\`bash
vercel env add DATABASE_URL production
\`\`\`

### Step 3: Custom domain

Add your domain in the dashboard. Vercel handles SSL automatically.

## Preview Deployments

Every PR gets its own preview URL. This is my favorite feature — you can share a live URL with stakeholders before merging.

## Conclusion

For indie devs and small teams, Vercel's free tier is more than enough to get started.
    `.trim(),
  },
  {
    slug: "cursor-vs-vscode",
    title: "Why I Switched from VS Code to Cursor (and Never Looked Back)",
    description:
      "An honest look at Cursor IDE after 8 months of daily use — what's genuinely better, what's overhyped, and whether it's worth the subscription.",
    date: "2026-03-05",
    tags: ["Tools", "Productivity", "AI"],
    readingTime: 5,
    image: "/blog/cursor-editor.svg",
    content: `
## The Switch

I was skeptical. Another AI editor? GitHub Copilot already existed. I didn't see the point.

Then I watched a colleague use Cursor's Composer to rewrite an entire module in 3 minutes. I was sold.

## What's Actually Better

### 1. Codebase-aware context

Cursor understands your entire codebase, not just the open file. Ask "how does auth work in this project?" and it reads the relevant files.

### 2. Composer for larger tasks

Composer isn't autocomplete — it's an agentic loop that plans, edits multiple files, runs commands, and iterates.

### 3. Tab completion that actually thinks

Cursor's tab doesn't just predict the next token. It predicts the next meaningful edit.

## What's Overhyped

The AI isn't magic. It makes mistakes. You still need to understand the code it writes.

## Is It Worth It?

Yes. The $20/month pays for itself in the first week if you're a professional developer.
    `.trim(),
  },
  {
    slug: "typescript-tricks-senior-dev",
    title: "TypeScript Tricks Every Senior Dev Should Know",
    description:
      "Conditional types, template literal types, satisfies operator, and more — the underused TypeScript features that make your types actually useful.",
    date: "2026-02-18",
    tags: ["TypeScript", "Engineering"],
    readingTime: 9,
    image: "/blog/typescript-tricks.svg",
    content: `
## 1. The \`satisfies\` Operator

Introduced in TypeScript 4.9, \`satisfies\` validates a value against a type without widening it.

\`\`\`typescript
const config = {
  port: 3000,
  host: "localhost",
} satisfies Record<string, string | number>;
config.port.toFixed(); // Works! TypeScript knows it's a number
\`\`\`

## 2. Template Literal Types

\`\`\`typescript
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type ApiRoute = \`/api/\${string}\`;
type ApiHandler = \`\${HttpMethod} \${ApiRoute}\`;
\`\`\`

## 3. Conditional Types for Smart Inference

\`\`\`typescript
type Awaited<T> = T extends Promise<infer U> ? U : T;
\`\`\`

## 4. The \`infer\` keyword

\`\`\`typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
\`\`\`

## Conclusion

TypeScript's type system is Turing complete. Most developers use 10% of it.
    `.trim(),
  },
  {
    slug: "tailwind-css-v4-migration",
    title: "Migrating to Tailwind CSS v4: What Changed and What Broke",
    description:
      "A complete guide to upgrading from Tailwind v3 to v4 — CSS-first config, new utilities, removed classes, and the gotchas that caught me off guard.",
    date: "2026-05-10",
    tags: ["CSS", "Tailwind", "Frontend"],
    readingTime: 10,
    image: "/blog/tailwind-v4.svg",
    content: `
## The Biggest Change: No More tailwind.config.js

Tailwind v4 moves configuration entirely into CSS. Your \`tailwind.config.js\` is gone.

\`\`\`css
/* Before (v3): config file */
/* After (v4): CSS-first config */
@import "tailwindcss";

@theme {
  --font-display: "Archivo", sans-serif;
  --color-brand: oklch(60% 0.2 250);
  --spacing-18: 4.5rem;
}
\`\`\`

## New @theme Directive

The \`@theme\` directive is how you define design tokens. Everything you'd put in \`theme.extend\` now goes here.

## Lightning CSS is Built In

v4 ships with Lightning CSS as the default transformer — no more PostCSS config for modern CSS features like \`color-mix()\`, nesting, and container queries.

## What Broke for Me

1. **Arbitrary values changed syntax** — \`w-[calc(100%-2rem)]\` works differently
2. **Some utilities renamed** — \`overflow-ellipsis\` → \`text-ellipsis\`
3. **JIT is now the only mode** — this is actually fine

## Conclusion

The migration took me about 4 hours for a medium-sized project. The CSS-first DX is significantly better once you're used to it.
    `.trim(),
  },
  {
    slug: "building-design-system-from-scratch",
    title: "Building a Design System From Scratch in 2026",
    description:
      "How I built a reusable component library with Tailwind, Radix UI primitives, and Storybook — the decisions I made and the ones I regret.",
    date: "2026-04-20",
    tags: ["Design", "Frontend", "Architecture"],
    readingTime: 13,
    image: "/blog/design-system.svg",
    content: `
## Why Build Your Own?

Most teams reach for shadcn/ui (or a fork) and that's fine. But building your own teaches you things no tutorial can.

The three questions you must answer first:

1. Who uses it? (just you, a team, open source?)
2. What's the boundary? (primitives only, or full components?)
3. How will it be consumed? (npm package, monorepo, copy-paste?)

## The Foundation: Design Tokens

Before any components, define your tokens. These live as CSS custom properties:

\`\`\`css
@theme {
  /* Colors */
  --color-surface: oklch(10% 0 0);
  --color-surface-raised: oklch(13% 0 0);
  --color-text: oklch(96% 0 0);
  --color-text-muted: oklch(60% 0 0);

  /* Typography */
  --font-display: "Archivo", sans-serif;
  --font-body: "Inter", sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}
\`\`\`

## Radix UI Primitives

Don't build modals, dropdowns, or tooltips from scratch. Use Radix UI for accessible primitives and style them yourself.

\`\`\`tsx
import * as Dialog from '@radix-ui/react-dialog';

export function Modal({ children, trigger }: ModalProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ...">
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
\`\`\`

## What I Regret

- Starting with too many components
- Not writing docs from day one
- Not using Storybook until month 3

## Conclusion

A design system is a product. Treat it like one.
    `.trim(),
  },
  {
    slug: "web-performance-core-web-vitals",
    title: "Fixing Core Web Vitals: A Practical Guide for Next.js Apps",
    description:
      "Real fixes for LCP, CLS, and INP in production Next.js apps — from font loading to image optimization to third-party script hell.",
    date: "2026-03-14",
    tags: ["Performance", "Next.js", "Frontend"],
    readingTime: 12,
    image: "/blog/web-performance.svg",
    content: `
## The Problem With "It Works On My Machine"

Core Web Vitals are measured in the field, not in DevTools. Real users on real networks.

The three metrics that matter:

- **LCP** (Largest Contentful Paint) — how fast the main content loads
- **CLS** (Cumulative Layout Shift) — how much things jump around
- **INP** (Interaction to Next Paint) — how responsive the UI feels

## Fixing LCP

The most common culprit: a hero image without \`priority\`.

\`\`\`tsx
// This will block LCP
<Image src="/hero.jpg" alt="Hero" width={1200} height={600} />

// This preloads the image — fixes LCP
<Image src="/hero.jpg" alt="Hero" width={1200} height={600} priority />
\`\`\`

## Fixing CLS

Fonts are the #1 cause of layout shift. Fix with \`font-display: swap\` and size-adjust.

\`\`\`css
@font-face {
  font-family: 'Archivo';
  font-display: swap;
  size-adjust: 98%;
}
\`\`\`

## Fixing INP

Heavy client-side JavaScript is the usual cause. Profile with Chrome DevTools > Performance > Interactions.

Key fixes:
1. Defer non-critical JS with \`next/script\` strategy
2. Move expensive computation to Web Workers
3. Use \`useTransition\` to mark non-urgent updates

## Conclusion

Performance is a feature. Ship it like one.
    `.trim(),
  },
  {
    slug: "node-vs-bun-2026",
    title: "Node.js vs Bun in 2026: Which Should You Use?",
    description:
      "After running both in production for 6 months, here's an honest comparison — performance, compatibility, ecosystem, and when Bun is actually worth it.",
    date: "2026-02-28",
    tags: ["Node.js", "Bun", "Backend"],
    readingTime: 8,
    image: "/blog/node-vs-bun.svg",
    content: `
## The State of Bun in 2026

Bun 2.0 dropped in late 2025. Node.js compatibility hit 98%. The conversation shifted from "is it stable?" to "should I switch?"

## Performance Numbers

On a standard HTTP server benchmark (wrk, 8 threads, 100 connections):

| Runtime | Req/sec | Latency p99 |
|---------|---------|-------------|
| Node 22 | 42,000  | 8.2ms       |
| Bun 2.0 | 118,000 | 2.9ms       |

Bun is genuinely 2-3x faster for raw HTTP. But does that matter for your use case?

## Where Bun Wins

1. **CLI tools** — instant startup, no warm-up
2. **Test runner** — 40x faster than Jest (no exaggeration)
3. **Build tooling** — Bun.build is fast and zero-config
4. **SQLite** — built-in driver, no native dependencies

## Where Node.js Still Wins

1. **Ecosystem** — some packages still don't work with Bun
2. **Stability** — Node 22 LTS is battle-tested
3. **Cloud functions** — AWS Lambda, Google Cloud still ship Node
4. **Team familiarity** — switching runtimes has real migration cost

## My Take

Use Bun for: CLI tools, test running, local dev scripts.
Use Node for: production APIs, cloud functions, anything greenfield without constraints.

Don't rewrite a working system because of benchmarks.
    `.trim(),
  },
  {
    slug: "api-design-patterns-rest",
    title: "API Design Patterns I Wish I Knew Earlier",
    description:
      "Versioning strategies, error formats, pagination, and the subtle decisions that separate good APIs from the ones developers hate.",
    date: "2026-01-30",
    tags: ["API", "Backend", "Architecture"],
    readingTime: 11,
    image: "/blog/api-design.svg",
    content: `
## Consistent Error Responses

Every API error should have the same shape. Pick one and stick with it:

\`\`\`json
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Email address is invalid",
    "field": "email",
    "status": 422
  }
}
\`\`\`

## Versioning That Doesn't Break Clients

URL versioning (\`/v1/users\`) is simple and explicit. Header versioning (\`API-Version: 2024-01\`) is more flexible.

My preference: URL versioning for public APIs, header versioning for internal APIs.

## Pagination

Offset pagination is simple but breaks with live data:

\`\`\`
GET /posts?page=2&limit=20
\`\`\`

Cursor pagination handles insertions correctly:

\`\`\`
GET /posts?after=post_abc123&limit=20
\`\`\`

## Idempotency Keys

For mutations that should only happen once (payments, emails):

\`\`\`
POST /payments
Idempotency-Key: a8098c1a-f86e-11da-bd1a-00112444be1e
\`\`\`

## Rate Limiting Headers

Always tell clients their limit status:

\`\`\`
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 842
X-RateLimit-Reset: 1735689600
\`\`\`

## Conclusion

Good API design is invisible. Users only notice when it's bad.
    `.trim(),
  },
  {
    slug: "git-workflow-solo-dev",
    title: "My Git Workflow as a Solo Developer",
    description:
      "How I use branches, commits, and tags to ship confidently without a team — trunk-based development for one.",
    date: "2026-01-15",
    tags: ["Git", "Tools", "Productivity"],
    readingTime: 6,
    image: "/blog/git-workflow.svg",
    content: `
## The Problem With Gitflow For Solo Devs

Gitflow was designed for large teams with release managers. As a solo dev, it's overkill that adds ceremony without value.

## My Workflow: Trunk-Based + Feature Flags

Everything merges to \`main\`. Features hidden behind flags until ready.

\`\`\`bash
# New feature
git switch -c feat/dashboard-analytics
# ... work ...
git add -p  # stage hunks, not files
git commit -m "feat(analytics): add page view chart"
git switch main && git merge feat/dashboard-analytics
git branch -d feat/dashboard-analytics
\`\`\`

## Commit Convention

I use Conventional Commits strictly. It enables automatic changelogs and semantic versioning:

\`\`\`
feat: new feature
fix: bug fix
docs: documentation only
refactor: no behavior change
perf: performance improvement
chore: tooling, deps, config
\`\`\`

## Useful Aliases

\`\`\`bash
git config --global alias.undo 'reset HEAD~1 --soft'
git config --global alias.staged 'diff --cached'
git config --global alias.last 'log -1 HEAD --stat'
git config --global alias.wip 'commit -am "wip: checkpoint"'
\`\`\`

## Tags for Releases

\`\`\`bash
git tag -a v1.2.0 -m "Release 1.2.0"
git push origin v1.2.0
\`\`\`

## Conclusion

A simple, consistent workflow beats a complex one you don't follow.
    `.trim(),
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getFeaturedPosts(): Post[] {
  return POSTS.filter((p) => p.featured).slice(0, 3);
}

export function getAllTags(): string[] {
  const tags = POSTS.flatMap((p) => p.tags);
  return [...new Set(tags)].sort();
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

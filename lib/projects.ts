export interface Project {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  tags: string[];
  url?: string;
  github?: string;
  status: "live" | "wip" | "archived";
  year: string;
  featured?: boolean;
  image?: string;
  services?: string[];
  challenge?: string;
  solution?: string;
  features?: string[];
}

export const PROJECTS: Project[] = [
  {
    slug: "kienhee-com",
    name: "kienhee.com",
    description: "This blog — built with Next.js 16, Tailwind v4, and a minimal design philosophy.",
    longDescription:
      "My personal blog and portfolio. Designed from scratch with an obsession for typography, whitespace, and performance. No CMS, no database — just static content and great defaults.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    url: "https://kienhee.com",
    github: "https://github.com/kienhee/kienhee.com",
    status: "live",
    year: "2026",
    featured: true,
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1600&q=80",
    services: ["Design System", "Fullstack Development", "SEO Optimization"],
    challenge: "Building a modern developer portfolio that avoids standard static layouts, loads in under 1 second, and displays visual wow-factor without relying on heavy animation frameworks.",
    solution: "Leveraging Next.js App Router static optimization combined with a custom dual LERP cursor, background grid layouts, and native React 19 View Transitions to deliver speed and Awwwards-grade motion.",
    features: ["High performance loading scores", "Glassmorphic overlay cards", "Custom noise grain overlays"]
  },
  {
    slug: "devkit-cli",
    name: "devkit-cli",
    description: "A zero-config CLI that scaffolds production-ready Next.js apps in 30 seconds.",
    longDescription:
      "Tired of spending 2 hours setting up a new project? devkit-cli generates a complete Next.js 16 starter with auth, database, email, and payment integrations — configured and ready to ship.",
    tags: ["Node.js", "CLI", "TypeScript"],
    url: "https://devkit.sh",
    github: "https://github.com/kienhee/devkit-cli",
    status: "live",
    year: "2025",
    featured: true,
    image: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1600&q=80",
    services: ["CLI Tooling", "Node.js", "Scaffolding Templates"],
    challenge: "Scaffolding boilerplate repositories takes hours. Developers waste time copy-pasting packages for authentication, databases, payments, and styles.",
    solution: "Created devkit-cli, a Node.js CLI tool that bundles opinionated packages, compiles dynamic schemas, and setups ready-to-run microservice structures in 30 seconds.",
    features: ["Multi-database setups (Postgres, D1, SQLite)", "Interactive CLI prompts", "Automatic environment key generation"]
  },
  {
    slug: "readwise-to-notion",
    name: "readwise-to-notion",
    description: "Sync your Readwise highlights to Notion automatically — no manual copy-paste.",
    longDescription:
      "A lightweight worker that polls the Readwise API and pushes new highlights to a Notion database. Runs on Cloudflare Workers. Zero infrastructure to manage.",
    tags: ["Cloudflare Workers", "API", "Automation"],
    github: "https://github.com/kienhee/readwise-to-notion",
    status: "live",
    year: "2025",
    featured: true,
    image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1600&q=80",
    services: ["Automation", "API Integrations", "Serverless Architecture"],
    challenge: "Readwise acts as a central hub for reading highlights, but sync options are rigid. Notion databases require custom relations and constant polling to stay in sync.",
    solution: "A Cloudflare Workers background cron script that fetches highlights, merges duplicates, parses HTML snippets into Notion block layouts, and updates in real-time.",
    features: ["Incremental updates cron sync", "Notion rich-text paragraph conversions", "Highly-efficient serverless execution"]
  },
  {
    slug: "type-safe-env",
    name: "type-safe-env",
    description: "Tiny library for validating environment variables at runtime with Zod.",
    longDescription:
      "A 1KB utility that validates all your env vars on startup and gives you fully typed access. No more `process.env.SOMETHING as string`. Inspired by T3 Env but simpler.",
    tags: ["TypeScript", "Zod", "Library"],
    github: "https://github.com/kienhee/type-safe-env",
    status: "live",
    year: "2024",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1600&q=80",
    services: ["Library Dev", "Type safety", "Schema validation"],
    challenge: "Configuring environment variables is error-prone. Errors are only detected in runtime crashes, resulting in debug friction.",
    solution: "A tiny 1KB schema validator built on Zod that executes on application bootstrapping, throwing detailed, early errors if validation fails.",
    features: ["Full TypeScript autocomplete support", "Detailed missing key lists on boot", "Zero production bundle bloat"]
  },
  {
    slug: "aicommit",
    name: "aicommit",
    description: "Generate conventional commit messages using AI from your staged git diff.",
    longDescription:
      "A CLI tool that reads your `git diff --staged` and generates a conventional commit message using an LLM. Supports OpenAI, Anthropic, and Ollama (local models).",
    tags: ["AI", "Git", "CLI"],
    github: "https://github.com/kienhee/aicommit",
    status: "live",
    year: "2024",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80",
    services: ["Git Hook", "AI Orchestration", "CLI UX"],
    challenge: "Writing conventional git commits takes effort, leading developers to write generic messages like 'fix bug' or 'update code'.",
    solution: "A Git hook CLI that extracts diff hunks, passes them to a localized or remote LLM, compiles context, and drafts accurate commits automatically.",
    features: ["Context-aware git diff summary", "Conventional commit standard compliance", "Local LLM support (Ollama)"]
  },
  {
    slug: "logboard",
    name: "logboard",
    description:
      "Lightweight self-hosted analytics for Next.js — just page views and key events, nothing more.",
    longDescription:
      "Privacy-first analytics built on Cloudflare D1. No cookies, no fingerprinting. Drops in with one line of code. A direct alternative to Plausible for people who want full control.",
    tags: ["Analytics", "Next.js", "Cloudflare"],
    status: "wip",
    year: "2026",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    services: ["Analytics Engine", "Database design", "Client SDK"],
    challenge: "Commercial analytics tools are expensive and compromise user privacy. Self-hosting often requires configuring heavy infrastructure.",
    solution: "A privacy-first dashboard that runs on Cloudflare D1 SQL. Weighs under 2KB and provides zero-cookie tracking for full compliance.",
    features: ["Interactive SVG line chart trends", "Zero cookie collection logic", "Under 1s query speeds"]
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured);
}

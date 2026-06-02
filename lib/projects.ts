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
  /** Path relative to /public, e.g. "/projects/kienhee-com.png" */
  image?: string;
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
    image: "/projects/kienhee-com.svg",
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
    image: "/projects/devkit-cli.svg",
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
    image: "/projects/readwise-to-notion.svg",
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
    image: "/projects/type-safe-env.svg",
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
    image: "/projects/aicommit.svg",
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
    image: "/projects/logboard.svg",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured);
}

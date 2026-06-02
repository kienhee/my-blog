import type { Metadata } from "next";
import Link from "next/link";
import { Mail, ExternalLink, ArrowUpRight } from "lucide-react";
import { GitHubIcon, XIcon } from "@/components/icons";
import { NewsletterForm } from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "About",
  description:
    "Software engineer, writer, and builder. Based in Vietnam. I care about clean code, fast software, and great developer experience.",
};

const TIMELINE = [
  {
    year: "2026",
    title: "Independent consulting + open source",
    description:
      "Left full-time employment to focus on open source, consulting for early-stage startups, and writing.",
  },
  {
    year: "2023–2025",
    title: "Senior Engineer @ Stealth Startup",
    description:
      "Led frontend architecture for a B2B SaaS product. Built the design system from scratch, reduced bundle size by 60%, and shipped the public API.",
  },
  {
    year: "2021–2023",
    title: "Fullstack Engineer @ Agency",
    description:
      "Built web applications for clients across fintech, e-commerce, and media. First exposure to Next.js, which changed how I think about rendering.",
  },
  {
    year: "2019–2021",
    title: "Self-taught → First job",
    description:
      "Taught myself programming via open-source resources and side projects. Landed my first developer role within 18 months.",
  },
];

const SKILLS = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Hono", "tRPC", "REST / GraphQL"],
  },
  {
    category: "Data",
    items: ["PostgreSQL", "SQLite", "Drizzle ORM", "Redis"],
  },
  {
    category: "Infrastructure",
    items: ["Vercel", "Cloudflare Workers", "Docker", "GitHub Actions"],
  },
  {
    category: "Tools I swear by",
    items: ["Cursor", "Zod", "pnpm", "Turso"],
  },
];

const ELSEWHERE = [
  {
    href: "https://github.com/kienhee",
    label: "GitHub",
    handle: "@kienhee",
    icon: GitHubIcon,
  },
  {
    href: "https://twitter.com/kienhee",
    label: "Twitter / X",
    handle: "@kienhee",
    icon: XIcon,
  },
  {
    href: "mailto:hi@kienhee.com",
    label: "Email",
    handle: "hi@kienhee.com",
    icon: Mail,
  },
];

const INTERVIEWS = [
  {
    href: "#",
    title: "Buildspace S5 — Ships Week 3",
    source: "Buildspace",
  },
  {
    href: "#",
    title: "How I Went From Self-Taught to Senior Engineer",
    source: "Dev.to",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-14">
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-24">
        {/* ─── Header ─────────────────────────────────────── */}
        <div className="max-w-2xl mb-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-subtle)] mb-4">
            About
          </p>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-[var(--text)] tracking-tight mb-6">
            I build software for the web.
          </h1>
          <div className="space-y-4 text-[var(--text-muted)] leading-relaxed">
            <p>
              I&apos;m Kienhee — a software engineer based in Vietnam. I&apos;ve spent the
              past several years building full-stack web applications, with a particular
              obsession for developer experience, performance, and systems that don&apos;t
              collapse under their own weight.
            </p>
            <p>
              I started this blog because I kept rediscovering the same lessons. Writing
              forces me to think more precisely, and sharing publicly means other people
              don&apos;t have to learn the hard way.
            </p>
            <p>
              Outside of work, I contribute to open source, experiment with side projects,
              and occasionally do contract work for early-stage startups that need someone
              to help them ship fast without creating technical debt.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* ─── Left column ─────────────────────────────── */}
          <div className="lg:col-span-2 space-y-16">
            {/* Timeline */}
            <div>
              <h2 className="font-display font-semibold text-lg text-[var(--text)] tracking-tight mb-8">
                Career
              </h2>
              <div className="relative">
                <div
                  className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--border)]"
                  aria-hidden
                />
                <div className="space-y-8">
                  {TIMELINE.map((item) => (
                    <div key={item.year} className="flex gap-5">
                      <div className="relative flex flex-col items-center shrink-0">
                        <div className="w-3.5 h-3.5 rounded-full border-2 border-[var(--border)] bg-[var(--bg)] mt-0.5 z-10" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-medium text-sm text-[var(--text)]">
                            {item.title}
                          </h3>
                          <span className="text-xs text-[var(--text-subtle)] font-mono">
                            {item.year}
                          </span>
                        </div>
                        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h2 className="font-display font-semibold text-lg text-[var(--text)] tracking-tight mb-8">
                Stack
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {SKILLS.map(({ category, items }) => (
                  <div key={category}>
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-subtle)] mb-3">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map((item) => (
                        <span
                          key={item}
                          className="text-xs px-2.5 py-1 rounded-md border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-muted)]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interviews / Press */}
            {INTERVIEWS.length > 0 && (
              <div>
                <h2 className="font-display font-semibold text-lg text-[var(--text)] tracking-tight mb-6">
                  Features &amp; interviews
                </h2>
                <div className="space-y-3">
                  {INTERVIEWS.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-4 rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--text-subtle)] transition-colors duration-150 cursor-pointer"
                    >
                      <div>
                        <p className="text-sm text-[var(--text)] font-medium group-hover:text-[var(--text-muted)] transition-colors duration-150">
                          {item.title}
                        </p>
                        <p className="text-xs text-[var(--text-subtle)] mt-0.5">{item.source}</p>
                      </div>
                      <ArrowUpRight
                        size={14}
                        className="text-[var(--text-subtle)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0 ml-3"
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ─── Right column ─────────────────────────────── */}
          <div className="space-y-10">
            {/* Social */}
            <div>
              <h2 className="font-display font-semibold text-lg text-[var(--text)] tracking-tight mb-5">
                Elsewhere
              </h2>
              <div className="space-y-3">
                {ELSEWHERE.map(({ href, label, handle, icon: Icon }) => (
                  <a
                    key={href}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-3 cursor-pointer"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-subtle)] group-hover:text-[var(--text)] group-hover:border-[var(--text-muted)] transition-colors duration-150">
                      <Icon size={14} />
                    </span>
                    <div>
                      <p className="text-xs text-[var(--text-subtle)]">{label}</p>
                      <p className="text-sm text-[var(--text-muted)] group-hover:text-[var(--text)] transition-colors duration-150 font-medium">
                        {handle}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)]">
              <h3 className="font-display font-semibold text-sm text-[var(--text)] mb-1.5">
                Newsletter
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                New articles and project updates — once or twice a month.
              </p>
              <NewsletterForm />
            </div>

            {/* Hire */}
            <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)]">
              <h3 className="font-display font-semibold text-sm text-[var(--text)] mb-1.5">
                Work with me
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                Available for consulting on Next.js, full-stack architecture, and technical writing.
              </p>
              <a
                href="mailto:hi@kienhee.com"
                className="flex items-center gap-1.5 text-xs font-medium text-[var(--text)] hover:text-[var(--text-muted)] transition-colors duration-150 cursor-pointer"
              >
                <Mail size={12} />
                Get in touch
                <ExternalLink size={10} className="opacity-50" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

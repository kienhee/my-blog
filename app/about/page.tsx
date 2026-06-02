import { ViewTransition } from "react";
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

const STATS = [
  { value: "6+", label: "Years building" },
  { value: "12+", label: "Open source tools" },
  { value: "VN", label: "Based in Vietnam" },
];

export default function AboutPage() {
  return (
    <ViewTransition>
      <div className="pt-14">
        {/* ─── Hero (centered case study) ───────────────────── */}
        <header className="px-6 md:px-12 pt-20 pb-16 max-w-4xl mx-auto text-center border-b border-[var(--border)]">
          <p className="font-mono text-sm tracking-[0.35em] uppercase text-[var(--text-subtle)] mb-8">
            About — Case Study
          </p>

          <h1
            className="font-display font-black tracking-tighter text-[var(--text)] leading-[0.92] mb-8"
            style={{ fontSize: "clamp(2.75rem, 7vw, 6rem)" }}
          >
            I build software
            <br />
            for the web.
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl mx-auto mb-12">
            Software engineer, writer, and builder. I care about clean code, fast
            software, and developer experience that doesn&apos;t get in the way.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="font-display font-black text-3xl sm:text-4xl tracking-tight text-[var(--text)]">
                  {value}
                </p>
                <p className="font-mono text-sm tracking-widest uppercase text-[var(--text-subtle)] mt-1">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </header>

        {/* ─── Intro + sidebar ──────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 lg:py-20">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_280px] gap-14 lg:gap-20">
            <div className="max-w-2xl">
              <p className="font-mono text-sm tracking-widest uppercase text-[var(--text-subtle)] mb-6">
                01 — Introduction
              </p>
              <div className="space-y-5 text-[var(--text-muted)] leading-relaxed text-base">
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

              <blockquote className="mt-12 border-l-2 border-[var(--text)] pl-6">
                <p className="font-display text-xl sm:text-2xl tracking-tight leading-snug text-[var(--text)] italic">
                  &ldquo;The best architecture is the one that ships.&rdquo;
                </p>
              </blockquote>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-5">
                <p className="font-mono text-sm tracking-widest uppercase text-[var(--text-subtle)] mb-4">
                  Elsewhere
                </p>
                <div className="space-y-4">
                  {ELSEWHERE.map(({ href, label, handle, icon: Icon }) => (
                    <a
                      key={href}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-3 cursor-pointer"
                    >
                      <span className="flex items-center justify-center w-9 h-9 rounded-lg border border-[var(--border)] text-[var(--text-subtle)] group-hover:text-[var(--text)] group-hover:border-[var(--text-muted)] transition-colors">
                        <Icon size={15} />
                      </span>
                      <div className="min-w-0 text-left">
                        <p className="text-sm text-[var(--text-subtle)]">{label}</p>
                        <p className="text-sm font-medium text-[var(--text)] truncate group-hover:text-[var(--text-muted)] transition-colors">
                          {handle}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-5">
                <h3 className="font-display font-bold text-sm text-[var(--text)] mb-2">
                  Work with me
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                  Consulting on Next.js, full-stack architecture, and technical writing.
                </p>
                <a
                  href="mailto:hi@kienhee.com"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text)] hover:text-[var(--text-muted)] transition-colors cursor-pointer"
                >
                  <Mail size={14} />
                  Get in touch
                  <ExternalLink size={12} className="opacity-50" />
                </a>
              </div>

              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-5">
                <h3 className="font-display font-bold text-sm text-[var(--text)] mb-2">
                  Newsletter
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                  New articles and project updates — once or twice a month.
                </p>
                <NewsletterForm />
              </div>
            </aside>
          </div>
        </section>

        {/* ─── Career ───────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-6 md:px-12 py-16 border-t border-[var(--border)]">
          <p className="font-mono text-sm tracking-widest uppercase text-[var(--text-subtle)] mb-3 text-center">
            02 — Career
          </p>
          <h2
            className="font-display font-black tracking-tighter text-[var(--text)] text-center mb-14"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Timeline
          </h2>

          <div className="relative">
            <div
              className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--border)]"
              aria-hidden
            />
            <div className="space-y-10">
              {TIMELINE.map((item) => (
                <div key={item.year} className="flex gap-6">
                  <div className="shrink-0 pt-1">
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-[var(--text-muted)] bg-[var(--bg)] z-10 relative" />
                  </div>
                  <div>
                    <span className="font-mono text-sm text-[var(--text-subtle)]">
                      {item.year}
                    </span>
                    <h3 className="font-display font-bold text-lg text-[var(--text)] mt-1 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Stack ────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-6 md:px-12 py-16 border-t border-[var(--border)]">
          <p className="font-mono text-sm tracking-widest uppercase text-[var(--text-subtle)] mb-3 text-center">
            03 — Stack
          </p>
          <h2
            className="font-display font-black tracking-tighter text-[var(--text)] text-center mb-14"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Tools &amp; tech
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {SKILLS.map(({ category, items }) => (
              <div
                key={category}
                className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-5"
              >
                <h3 className="font-mono text-sm font-semibold tracking-widest uppercase text-[var(--text-subtle)] mb-4">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="text-sm px-2.5 py-1 rounded-md border border-[var(--border)] text-[var(--text-muted)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Features ─────────────────────────────────────── */}
        {INTERVIEWS.length > 0 && (
          <section className="max-w-3xl mx-auto px-6 md:px-12 py-16 pb-24 border-t border-[var(--border)]">
            <p className="font-mono text-sm tracking-widest uppercase text-[var(--text-subtle)] mb-3 text-center">
              04 — Press
            </p>
            <h2
              className="font-display font-black tracking-tighter text-[var(--text)] text-center mb-10"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
            >
              Features &amp; interviews
            </h2>
            <div className="space-y-3">
              {INTERVIEWS.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--text-muted)] transition-colors cursor-pointer"
                >
                  <div>
                    <p className="text-sm font-medium text-[var(--text)] group-hover:text-[var(--text-muted)] transition-colors">
                      {item.title}
                    </p>
                    <p className="text-sm text-[var(--text-subtle)] mt-0.5">{item.source}</p>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-[var(--text-subtle)] opacity-0 group-hover:opacity-100 transition-all shrink-0 ml-3"
                  />
                </a>
              ))}
            </div>

            <p className="text-center mt-12">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 font-mono text-sm tracking-widest uppercase text-[var(--text-subtle)] hover:text-[var(--text)] transition-colors"
              >
                Read the blog
                <ArrowUpRight size={14} />
              </Link>
            </p>
          </section>
        )}
      </div>
    </ViewTransition>
  );
}

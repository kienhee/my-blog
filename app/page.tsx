import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { GitHubIcon, XIcon } from "@/components/icons";
import { MarqueeText } from "@/components/MarqueeText";
import { AnimateIn } from "@/components/AnimateIn";
import { NewsletterForm } from "@/components/NewsletterForm";
import { getFeaturedPosts, POSTS } from "@/lib/posts";
import { getFeaturedProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { formatDateShort } from "@/lib/utils";

const MARQUEE_ITEMS = [
  "React", "Next.js", "TypeScript", "Node.js",
  "Tailwind CSS", "PostgreSQL", "Drizzle ORM", "Cloudflare Workers",
  "Open Source", "Web Performance", "Developer Experience",
];

export default function HomePage() {
  const featuredPosts = getFeaturedPosts();
  const featuredProjects = getFeaturedProjects();

  return (
    <div className="pt-14" style={{ cursor: "none" }}>

      {/* ═══════════════════════════════════════════════
          01 — HERO
      ═══════════════════════════════════════════════ */}
      <section
        className="relative min-h-[100svh] flex flex-col justify-between px-6 md:px-12 pt-16 pb-10"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        {/* Top meta row */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-subtle)]">
            01 — Introduction
          </span>
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/kienhee"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-[var(--text-subtle)] hover:text-[var(--text)] transition-colors"
            >
              <GitHubIcon size={14} />
            </a>
            <a
              href="https://twitter.com/kienhee"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter / X"
              className="text-[var(--text-subtle)] hover:text-[var(--text)] transition-colors"
            >
              <XIcon size={14} />
            </a>
            <span className="font-mono text-[10px] tracking-widest text-[var(--text-subtle)] uppercase">
              kienhee.com
            </span>
          </div>
        </div>

        {/* Main headline — fills the viewport */}
        <div className="my-auto py-12">
          <div
            className="overflow-hidden"
            style={{ animation: "fade-up 0.9s cubic-bezier(0.4,0,0.2,1) 0.1s both" }}
          >
            <h1
              className="font-display font-black leading-[0.9] tracking-tighter text-[var(--text)] uppercase"
              style={{ fontSize: "clamp(4.5rem, 13.5vw, 15rem)" }}
            >
              Building
            </h1>
          </div>

          {/* Horizontal rule with label */}
          <div
            className="flex items-center gap-6 my-4"
            style={{ animation: "fade-in 0.6s ease 0.4s both" }}
          >
            <div className="flex-1 h-px bg-[var(--border)]" />
            <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-subtle)] shrink-0">
              Software Engineer &amp; Writer
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-baseline justify-between gap-4">
            <div
              className="overflow-hidden"
              style={{ animation: "fade-up 0.9s cubic-bezier(0.4,0,0.2,1) 0.2s both" }}
            >
              <h1
                className="font-display font-black leading-[0.9] tracking-tighter text-[var(--text)] uppercase"
                style={{ fontSize: "clamp(4.5rem, 13.5vw, 15rem)" }}
              >
                for the
              </h1>
            </div>
            <div
              className="overflow-hidden"
              style={{ animation: "fade-up 0.9s cubic-bezier(0.4,0,0.2,1) 0.3s both" }}
            >
              <h1
                className="font-display font-black leading-[0.9] tracking-tighter uppercase"
                style={{
                  fontSize: "clamp(4.5rem, 13.5vw, 15rem)",
                  color: "transparent",
                  WebkitTextStroke: "1px var(--text-subtle)",
                }}
              >
                Web.
              </h1>
            </div>
          </div>
        </div>

        {/* Bottom meta row */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6"
          style={{ animation: "fade-in 0.6s ease 0.6s both" }}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Available for consulting &amp; collaborations
            </div>
            <p className="text-xs text-[var(--text-subtle)] font-mono">
              Based in Vietnam · Writing since 2024
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/blog"
              className="group flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            >
              Read the blog
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <span className="text-[var(--border)]">·</span>
            <Link
              href="/projects"
              className="group flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            >
              See projects
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="hidden lg:flex flex-col items-center gap-2 text-[var(--text-subtle)]">
            <span className="font-mono text-[9px] tracking-widest uppercase rotate-90 origin-center mb-2">
              Scroll
            </span>
            <ArrowDown size={12} className="animate-bounce" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          MARQUEE BELT
      ═══════════════════════════════════════════════ */}
      <div
        className="py-4 border-b border-[var(--border)]"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <MarqueeText
          items={MARQUEE_ITEMS}
          speed={35}
          className="text-xs font-mono tracking-widest uppercase text-[var(--text-subtle)]"
          separator="·"
        />
      </div>

      {/* ═══════════════════════════════════════════════
          02 — LATEST WRITING
      ═══════════════════════════════════════════════ */}
      <section className="px-6 md:px-12 py-20">
        {/* Section header */}
        <AnimateIn>
          <div className="flex items-end justify-between mb-2">
            <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-subtle)]">
              02 — Latest Writing
            </span>
            <Link
              href="/blog"
              className="group flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase text-[var(--text-subtle)] hover:text-[var(--text)] transition-colors"
            >
              All posts
              <ArrowUpRight size={10} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
          <div className="h-px bg-[var(--border)] mb-0" />
        </AnimateIn>

        {/* Post list — editorial numbered rows */}
        <div>
          {featuredPosts.map((post, i) => (
            <AnimateIn key={post.slug} delay={i * 80}>
              <Link
                href={`/blog/${post.slug}`}
                className="group grid grid-cols-[3rem_1fr_auto] lg:grid-cols-[3rem_1fr_200px_auto] items-center gap-4 lg:gap-8 py-6 border-b border-[var(--border-subtle)] hover:border-[var(--border)] transition-all"
              >
                {/* Number */}
                <span className="font-mono text-xs text-[var(--text-subtle)] group-hover:text-[var(--text-muted)] transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Title + desc */}
                <div className="min-w-0">
                  <h3 className="font-display font-semibold text-lg leading-tight text-[var(--text)] group-hover:text-[var(--text-muted)] transition-colors duration-200 truncate">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[var(--text-subtle)] mt-0.5 line-clamp-1 hidden sm:block">
                    {post.description}
                  </p>
                </div>

                {/* Tags + date */}
                <div className="hidden lg:flex items-center gap-3 justify-end">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono tracking-wider uppercase text-[var(--text-subtle)]"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="text-[var(--border)] text-xs">·</span>
                  <span className="text-xs text-[var(--text-subtle)] font-mono whitespace-nowrap">
                    {post.readingTime} min
                  </span>
                </div>

                {/* Arrow */}
                <ArrowUpRight
                  size={16}
                  className="text-[var(--text-subtle)] opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </AnimateIn>
          ))}
        </div>

        {/* More posts count */}
        <AnimateIn delay={300}>
          <div className="mt-8 flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-widest text-[var(--text-subtle)] uppercase">
              {POSTS.length - featuredPosts.length} more articles in the archive
            </span>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm font-medium border border-[var(--border)] px-4 py-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--text-muted)] transition-colors"
            >
              Browse all writing
              <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </AnimateIn>
      </section>

      {/* ═══════════════════════════════════════════════
          MARQUEE BELT 2 (reversed)
      ═══════════════════════════════════════════════ */}
      <div className="border-y border-[var(--border)] py-4 overflow-hidden">
        <div
          className="inline-flex whitespace-nowrap"
          style={{ animation: "marquee 25s linear infinite reverse" }}
          aria-hidden
        >
          {Array(6).fill("OPEN SOURCE · WEB DEVELOPMENT · ENGINEERING · DESIGN SYSTEMS · PERFORMANCE · ").join("")
            .split("").map((char, i) => (
              <span
                key={i}
                className="font-display font-black text-[var(--border)] text-4xl tracking-tighter"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
              >
                {char}
              </span>
            ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          03 — SELECTED PROJECTS
      ═══════════════════════════════════════════════ */}
      <section className="px-6 md:px-12 py-20">
        <AnimateIn>
          <div className="flex items-end justify-between mb-2">
            <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-subtle)]">
              03 — Selected Projects
            </span>
            <Link
              href="/projects"
              className="group flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase text-[var(--text-subtle)] hover:text-[var(--text)] transition-colors"
            >
              All projects
              <ArrowUpRight size={10} />
            </Link>
          </div>
          <div className="h-px bg-[var(--border)] mb-8" />
        </AnimateIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredProjects.map((project, i) => (
            <AnimateIn key={project.slug} delay={i * 100}>
              <ProjectCard project={project} index={i} />
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          04 — ABOUT + NEWSLETTER
      ═══════════════════════════════════════════════ */}
      <section
        className="px-6 md:px-12 py-20 border-t border-[var(--border)]"
      >
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* About */}
          <AnimateIn>
            <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-subtle)] mb-8 block">
              04 — About
            </span>
            <p
              className="font-display font-semibold leading-tight text-[var(--text)] tracking-tight mb-6"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)" }}
            >
              Software engineer building things on the web, one commit at a time.
            </p>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6 max-w-md">
              Based in Vietnam. I&apos;ve spent the last several years shipping full-stack
              products — from SaaS to developer tools — with a focus on clean code,
              performance, and developer experience. This blog is where I share what I learn.
            </p>
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--text)] hover:text-[var(--text-muted)] transition-colors"
            >
              Full story
              <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </AnimateIn>

          {/* Newsletter */}
          <AnimateIn delay={150}>
            <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-subtle)] mb-8 block">
              05 — Newsletter
            </span>
            <p
              className="font-display font-semibold leading-tight text-[var(--text)] tracking-tight mb-4"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)" }}
            >
              New articles, straight to your inbox.
            </p>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
              Once or twice a month. No sponsors. No spam. Unsubscribe anytime.
            </p>
            <NewsletterForm />
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}

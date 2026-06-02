import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ArrowRight } from "lucide-react";
import { getProjectBySlug, PROJECTS } from "@/lib/projects";
import { GitHubIcon } from "@/components/icons";
import { ViewTransition } from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.name} — Case Study`,
    description: project.longDescription,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const nextProject = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <ViewTransition>
      <div className="glass-glow-container min-h-screen pt-14">
        {/* Animated Glow Backdrops */}
        <div className="glass-glow-spot glass-glow-spot-1" />
        <div className="glass-glow-spot glass-glow-spot-2" />

        {/* ─── Back Link ─── */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 pt-8 z-10 relative">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-mono tracking-widest uppercase text-[var(--text-subtle)] hover:text-[var(--text)] transition-colors"
          >
            <ArrowLeft size={12} />
            Back to projects
          </Link>
        </div>

        {/* ─── Hero Banner ─── */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 pt-8 pb-12 z-10 relative">
          <div className="relative w-full h-[45vh] md:h-[60vh] overflow-hidden rounded-2xl border border-[var(--border)]">
            <ViewTransition name={`project-img-${project.slug}`}>
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-zinc-950 to-neutral-900 flex items-center justify-center">
                  <span className="font-display font-black text-white/5 text-9xl">
                    {project.name.slice(0, 2).toUpperCase()}
                  </span>
                </div>
              )}
            </ViewTransition>

            {/* Title Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-end p-6 md:p-12">
              <h1 className="font-display font-black text-4xl md:text-7xl uppercase text-white tracking-tighter leading-none select-none">
                {project.name}
              </h1>
            </div>
          </div>
        </div>

        {/* ─── Content Grid ─── */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 pb-24 grid lg:grid-cols-[1fr_320px] gap-12 lg:gap-20 z-10 relative">
          {/* Left Column: Details */}
          <div className="space-y-16">
            {/* Overview */}
            <section className="space-y-4">
              <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-subtle)]">
                01 — Overview
              </span>
              <h2 className="font-display font-bold text-2xl tracking-tight text-[var(--text)]">
                Project Goal
              </h2>
              <p className="text-base text-[var(--text-muted)] leading-relaxed font-body">
                {project.longDescription}
              </p>
            </section>

            {/* Challenge */}
            {project.challenge && (
              <section className="space-y-4">
                <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-subtle)]">
                  02 — The Challenge
                </span>
                <h2 className="font-display font-bold text-2xl tracking-tight text-[var(--text)]">
                  Friction & Problems
                </h2>
                <p className="text-base text-[var(--text-muted)] leading-relaxed font-body">
                  {project.challenge}
                </p>
              </section>
            )}

            {/* Solution */}
            {project.solution && (
              <section className="space-y-4">
                <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-subtle)]">
                  03 — The Solution
                </span>
                <h2 className="font-display font-bold text-2xl tracking-tight text-[var(--text)]">
                  Architectural Resolve
                </h2>
                <p className="text-base text-[var(--text-muted)] leading-relaxed font-body">
                  {project.solution}
                </p>
              </section>
            )}

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <section className="space-y-4">
                <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-subtle)]">
                  04 — Key Features
                </span>
                <h2 className="font-display font-bold text-2xl tracking-tight text-[var(--text)]">
                  Functional Scope
                </h2>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {project.features.map((feat, i) => (
                    <li
                      key={i}
                      className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)]/50 backdrop-blur-md flex items-start gap-3"
                    >
                      <span className="font-mono text-sm text-[var(--text-subtle)] mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-[var(--text-muted)] leading-relaxed font-body">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Right Column: Glassmorphism Stats Sidebar */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="glass-card rounded-2xl p-6 md:p-8 space-y-6">
              <div>
                <span className="font-mono text-[9px] tracking-widest uppercase text-[var(--text-subtle)] block mb-1.5">
                  Year
                </span>
                <span className="text-sm font-medium text-[var(--text)]">{project.year}</span>
              </div>

              {project.services && project.services.length > 0 && (
                <div>
                  <span className="font-mono text-[9px] tracking-widest uppercase text-[var(--text-subtle)] block mb-2">
                    Services
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.services.map((service) => (
                      <span
                        key={service}
                        className="text-sm px-2.5 py-1 rounded bg-[var(--text)]/5 text-[var(--text-muted)] font-body"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <span className="font-mono text-[9px] tracking-widest uppercase text-[var(--text-subtle)] block mb-2">
                  Technology
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm px-2.5 py-1 rounded border border-[var(--border)] text-[var(--text-muted)] font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[var(--border)] space-y-3">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-mono tracking-widest uppercase bg-[var(--text)] text-[var(--bg)] hover:opacity-90 transition-opacity"
                  >
                    Live Project <ArrowUpRight size={12} />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-mono tracking-widest uppercase border border-[var(--border)] hover:bg-[var(--bg-surface-2)] transition-colors"
                  >
                    <GitHubIcon size={12} /> Source Code
                  </a>
                )}
              </div>
            </div>
          </aside>
        </div>

        {/* ─── Next Project Footer Navigation ─── */}
        <div className="border-t border-[var(--border)] py-20 text-center bg-[var(--bg-surface)]/20 backdrop-blur-md z-10 relative">
          <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-subtle)] mb-4 block">
            Next Case Study
          </span>
          <Link
            href={`/projects/${nextProject.slug}`}
            transitionTypes={["nav-forward"]}
            className="group inline-flex flex-col items-center cursor-pointer"
          >
            <h2 className="font-display font-black text-3xl md:text-6xl uppercase tracking-tighter text-[var(--text)] group-hover:text-[var(--text-muted)] transition-colors leading-none">
              {nextProject.name}
            </h2>
            <span className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-[var(--text-subtle)] group-hover:text-[var(--text)] transition-colors mt-4">
              Explore Case Study{" "}
              <ArrowRight
                size={12}
                className="group-hover:translate-x-1 transition-transform"
              />
            </span>
          </Link>
        </div>
      </div>
    </ViewTransition>
  );
}

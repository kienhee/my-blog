"use client";

import { ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import type { Project } from "@/lib/projects";
import Link from "next/link";
import { ViewTransition } from "react";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const STATUS_DOT: Record<string, string> = {
  live: "bg-emerald-500",
  wip: "bg-amber-400",
  archived: "bg-zinc-500",
};

const STATUS_LABEL: Record<string, string> = {
  live: "Live",
  wip: "In progress",
  archived: "Archived",
};

/** Gradient placeholder used when no image is provided */
const PLACEHOLDER_GRADIENTS = [
  "from-zinc-900 to-zinc-800",
  "from-neutral-900 to-stone-800",
  "from-slate-900 to-slate-800",
  "from-zinc-950 to-neutral-900",
  "from-stone-900 to-zinc-900",
  "from-neutral-950 to-neutral-800",
];

export function ProjectCard({ project, index }: ProjectCardProps) {
  const gradient = PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length];
  const displayUrl = project.url
    ? project.url.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : null;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)]">
      {/* ── Image area ── */}
      <Link href={`/projects/${project.slug}`} transitionTypes={["nav-forward"]} className="cursor-pointer block">
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: "16/10" }}
        >
          <ViewTransition name={`project-img-${project.slug}`}>
            {project.image ? (
              <img
                src={project.image}
                alt={`${project.name} screenshot`}
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />
            ) : (
              /* Placeholder gradient with project initials */
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradient} flex items-center justify-center`}
              >
                <span
                  className="font-display font-black text-white/10 select-none pointer-events-none"
                  style={{ fontSize: "clamp(4rem, 12vw, 8rem)", letterSpacing: "-0.04em" }}
                >
                  {project.name
                    .replace(/[^a-zA-Z0-9\s]/g, "")
                    .split(" ")[0]
                    .slice(0, 2)
                    .toUpperCase()}
                </span>
              </div>
            )}
          </ViewTransition>

          {/* Dark hover overlay — desktop only */}
          <div className="hidden md:flex absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all duration-400 flex flex-col justify-end p-5 gap-3">
            {/* Description — only visible on hover */}
            <p className="text-white/0 group-hover:text-white/90 transition-all duration-300 delay-75 text-sm leading-relaxed translate-y-2 group-hover:translate-y-0">
              {project.description}
            </p>

            {/* CTA links */}
            <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100 translate-y-2 group-hover:translate-y-0">
              <span className="flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase text-white border border-white/30 hover:border-white hover:bg-white hover:text-black px-3 py-1.5 rounded transition-colors">
                View Case Study <ArrowUpRight size={10} />
              </span>
            </div>
          </div>

          {/* Status badge — top right */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
            <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[project.status]}`} />
            <span className="font-mono text-[9px] tracking-widest uppercase text-white/80">
              {STATUS_LABEL[project.status]}
            </span>
          </div>
        </div>
      </Link>

      {/* ── Card footer ── */}
      <div className="flex items-start justify-between gap-3 px-5 py-4">
        <div className="min-w-0 flex-1">
          {/* Project name */}
          <Link href={`/projects/${project.slug}`} transitionTypes={["nav-forward"]} className="cursor-pointer inline-block">
            <h3 className="font-display font-bold text-sm tracking-tight text-[var(--text)] hover:text-[var(--text-muted)] transition-colors truncate">
              {project.name}
            </h3>
          </Link>

          {/* URL */}
          {displayUrl && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] tracking-wide text-[var(--text-subtle)] hover:text-[var(--text-muted)] transition-colors truncate block mt-0.5"
            >
              {displayUrl}
            </a>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="font-mono text-[9px] tracking-widest uppercase text-[var(--text-subtle)] bg-[var(--bg-surface-2)] border border-[var(--border)] px-1.5 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Mobile-only static description & CTAs */}
          <div className="mt-3.5 md:hidden space-y-3">
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              {project.description}
            </p>
            <div className="flex items-center gap-3">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase text-[var(--text)] border border-[var(--border)] bg-[var(--bg-surface-2)] hover:bg-[var(--border)] px-3 py-1.5 rounded transition-colors"
                >
                  Visit <ArrowUpRight size={10} />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                >
                  <GitHubIcon size={12} /> Source
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Year + arrow */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <span className="font-mono text-[10px] text-[var(--text-subtle)]">
            {project.year}
          </span>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.name}`}
              className="hidden md:inline-flex p-1.5 rounded border border-[var(--border)] text-[var(--text-subtle)] hover:text-[var(--text)] hover:border-[var(--text-muted)] transition-colors"
            >
              <ArrowUpRight size={12} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

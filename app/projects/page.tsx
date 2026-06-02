import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/lib/projects";
import { GitHubIcon } from "@/components/icons";
import { AnimateIn } from "@/components/AnimateIn";
import { ProjectCard } from "@/components/ProjectCard";
import { NewsletterForm } from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A selection of open-source tools, side projects, and experiments I've shipped.",
};

const liveProjects = PROJECTS.filter((p) => p.status === "live");
const wipProjects = PROJECTS.filter((p) => p.status === "wip");

export default function ProjectsPage() {
  return (
    <div className="pt-14">
      {/* ─── Header ─────────────────────────────────────── */}
      <div className="px-6 md:px-12 pt-16 pb-12 border-b border-[var(--border)]">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-subtle)] mb-4 block">
              Work
            </span>
            <h1
              className="font-display font-black tracking-tighter text-[var(--text)] uppercase leading-none"
              style={{ fontSize: "clamp(3rem, 9vw, 10rem)" }}
            >
              Projects
            </h1>
          </div>
          <p className="text-sm text-[var(--text-muted)] max-w-sm leading-relaxed pb-1">
            A mix of open-source tools, side projects, and experiments.
            Hover each card to see details and visit links.
          </p>
        </div>
      </div>

      {/* ─── Live projects grid ──────────────────────────── */}
      <section className="px-6 md:px-12 pt-12 pb-8">
        <AnimateIn>
          <div className="flex items-center justify-between mb-8">
            <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-subtle)]">
              Live — {liveProjects.length} projects
            </span>
          </div>
        </AnimateIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {liveProjects.map((project, i) => (
            <AnimateIn key={project.slug} delay={i * 80}>
              <ProjectCard project={project} index={i} />
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ─── WIP projects ────────────────────────────────── */}
      {wipProjects.length > 0 && (
        <section className="px-6 md:px-12 py-8">
          <AnimateIn>
            <div className="flex items-center justify-between mb-8">
              <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-subtle)]">
                In progress — {wipProjects.length} project{wipProjects.length > 1 ? "s" : ""}
              </span>
            </div>
          </AnimateIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {wipProjects.map((project, i) => (
              <AnimateIn key={project.slug} delay={i * 80}>
                <ProjectCard project={project} index={liveProjects.length + i} />
              </AnimateIn>
            ))}
          </div>
        </section>
      )}

      {/* ─── Upload instructions ─────────────────────────── */}
      <AnimateIn>
        <div className="mx-6 md:mx-12 my-8 p-6 border border-dashed border-[var(--border)] rounded-xl bg-[var(--bg-surface)]">
          <p className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-subtle)] mb-2">
            Add project screenshots
          </p>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-1">
            Upload ảnh vào thư mục <code className="font-mono text-xs bg-[var(--bg-surface-2)] border border-[var(--border)] px-1.5 py-0.5 rounded text-[var(--text)]">public/projects/</code> với tên file tương ứng:
          </p>
          <div className="mt-3 space-y-1">
            {PROJECTS.map((p) => (
              <p key={p.slug} className="font-mono text-[10px] text-[var(--text-subtle)]">
                <span className="text-[var(--text-muted)]">{p.name}</span>
                {" → "}
                <span className="text-emerald-500">{p.image ?? "(no image set)"}</span>
              </p>
            ))}
          </div>
        </div>
      </AnimateIn>

      {/* ─── Open source CTA ─────────────────────────────── */}
      <AnimateIn>
        <div className="mx-6 md:mx-12 mb-12 p-8 border border-[var(--border)] bg-[var(--bg-surface)] rounded-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="font-display font-bold text-xl tracking-tight text-[var(--text)] mb-1.5">
                Everything is open source.
              </p>
              <p className="text-sm text-[var(--text-muted)] max-w-md leading-relaxed">
                All projects on GitHub. Issues, PRs, and forks welcome.
              </p>
            </div>
            <a
              href="https://github.com/kienhee"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--border)] hover:border-[var(--text-muted)] px-4 py-3 rounded-lg transition-colors whitespace-nowrap"
            >
              <GitHubIcon size={12} />
              View on GitHub
              <ArrowUpRight size={10} />
            </a>
          </div>
        </div>
      </AnimateIn>

      {/* ─── Newsletter ──────────────────────────────────── */}
      <div className="px-6 md:px-12 pb-24 max-w-lg">
        <AnimateIn>
          <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-subtle)] mb-4 block">
            Stay updated
          </span>
          <p className="font-display font-bold text-xl tracking-tight text-[var(--text)] mb-2">
            Get notified on new projects.
          </p>
          <p className="text-sm text-[var(--text-muted)] mb-6 leading-relaxed">
            I announce new tools in my newsletter before anywhere else.
          </p>
          <NewsletterForm />
        </AnimateIn>
      </div>
    </div>
  );
}

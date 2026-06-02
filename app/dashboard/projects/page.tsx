import Link from "next/link";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { MOCK_DASHBOARD_PROJECTS } from "@/lib/mock/dashboard";

export default function DashboardProjectsPage() {
  return (
    <DashboardShell
      title="Projects"
      description="Manage portfolio projects."
      actions={
        <Link href="/dashboard/projects/new" className="rounded-lg px-3.5 py-2 text-sm bg-[var(--text)] text-[var(--bg)]">
          New Project
        </Link>
      }
    >
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-4">
        <div className="space-y-2">
          {MOCK_DASHBOARD_PROJECTS.map((project) => (
            <div key={project.id} className="rounded-lg border border-[var(--border)] p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-[var(--text)]">{project.name}</p>
                <Link href={`/dashboard/projects/${project.id}/edit`} className="text-xs text-[var(--text-subtle)] hover:text-[var(--text)]">
                  Edit
                </Link>
              </div>
              <p className="mt-1 text-xs text-[var(--text-subtle)]">
                {project.status} · {project.owner} · {project.updatedAt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}

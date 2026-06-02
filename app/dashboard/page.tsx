import { DashboardShell } from "@/components/dashboard/DashboardShell";
import {
  DASHBOARD_STATS,
  MOCK_DASHBOARD_ACTIVITY,
  MOCK_DASHBOARD_POSTS,
  MOCK_DASHBOARD_PROJECTS,
} from "@/lib/mock/dashboard";

export default function DashboardOverviewPage() {
  return (
    <DashboardShell
      title="Overview"
      description="Mock CMS dashboard overview. Connect backend APIs later."
      actions={
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-lg px-3.5 py-2 text-sm border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            Export
          </button>
          <button
            type="button"
            className="rounded-lg px-3.5 py-2 text-sm bg-[var(--text)] text-[var(--bg)] hover:opacity-90 transition-opacity"
          >
            New Post
          </button>
        </div>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {DASHBOARD_STATS.map((item) => (
          <article key={item.id} className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-4">
            <p className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-subtle)]">{item.label}</p>
            <p className="mt-2 font-display text-3xl font-black tracking-tight text-[var(--text)]">{item.value}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-4">
          <h2 className="font-display text-xl font-bold tracking-tight text-[var(--text)]">Recent Posts</h2>
          <div className="mt-4 space-y-3">
            {MOCK_DASHBOARD_POSTS.map((post) => (
              <div key={post.id} className="rounded-lg border border-[var(--border)] px-3 py-2.5">
                <p className="text-sm text-[var(--text)]">{post.title}</p>
                <p className="mt-1 text-xs text-[var(--text-subtle)]">
                  {post.status} · {post.updatedAt}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-4">
          <h2 className="font-display text-xl font-bold tracking-tight text-[var(--text)]">Recent Projects</h2>
          <div className="mt-4 space-y-3">
            {MOCK_DASHBOARD_PROJECTS.map((project) => (
              <div key={project.id} className="rounded-lg border border-[var(--border)] px-3 py-2.5">
                <p className="text-sm text-[var(--text)]">{project.name}</p>
                <p className="mt-1 text-xs text-[var(--text-subtle)]">
                  {project.status} · {project.updatedAt}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-4">
        <h2 className="font-display text-xl font-bold tracking-tight text-[var(--text)]">Activity</h2>
        <div className="mt-4 space-y-2">
          {MOCK_DASHBOARD_ACTIVITY.map((item) => (
            <div key={item.id} className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
              <span className="text-[var(--text)]">{item.actor}</span>
              <span className="text-[var(--text-muted)]">{item.action}</span>
              <span className="text-[var(--text)]">{item.target}</span>
              <span className="text-[var(--text-subtle)]">· {item.timestamp}</span>
            </div>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}

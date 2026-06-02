import { DashboardShell } from "@/components/dashboard/DashboardShell";

const MOCK_USERS = [
  { id: "u-1", name: "Kienhee", email: "hi@kienhee.com", role: "admin" },
  { id: "u-2", name: "Editor One", email: "editor@kienhee.com", role: "editor" },
  { id: "u-3", name: "Viewer One", email: "viewer@kienhee.com", role: "viewer" },
];

export default function DashboardUsersPage() {
  return (
    <DashboardShell title="Users" description="Manage CMS user roles (UI mock).">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-4">
        <div className="space-y-2">
          {MOCK_USERS.map((user) => (
            <div key={user.id} className="rounded-lg border border-[var(--border)] p-3 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm text-[var(--text)]">{user.name}</p>
                <p className="text-xs text-[var(--text-subtle)] truncate">{user.email}</p>
              </div>
              <span className="text-xs uppercase tracking-widest px-2 py-1 rounded border border-[var(--border)] text-[var(--text-muted)]">
                {user.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}

import { DashboardShell } from "@/components/dashboard/DashboardShell";

import { fieldClassName } from "@/lib/formStyles";

export default function DashboardSettingsPage() {
  return (
    <DashboardShell title="Settings" description="Site-wide CMS settings (UI mock).">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-4 space-y-4">
        <div className="space-y-2">
          <label htmlFor="site-title" className="block text-sm text-[var(--text-subtle)]">Site Title</label>
          <input id="site-title" defaultValue="Kienhee — Tech Blogger" className={fieldClassName()} />
        </div>
        <div className="space-y-2">
          <label htmlFor="site-description" className="block text-sm text-[var(--text-subtle)]">Description</label>
          <textarea id="site-description" defaultValue="Writing about software engineering and building on the web." rows={4} className={fieldClassName()} />
        </div>
        <div className="flex justify-end">
          <button type="button" className="rounded-lg px-3.5 py-2 text-sm bg-[var(--text)] text-[var(--bg)]">Save Settings</button>
        </div>
      </div>
    </DashboardShell>
  );
}

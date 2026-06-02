import { DashboardShell } from "@/components/dashboard/DashboardShell";

import { fieldClassName } from "@/lib/formStyles";

export default function NewProjectPage() {
  return (
    <DashboardShell title="New Project" description="Create project entry (UI only).">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-4 space-y-4">
        <input type="text" placeholder="Project name" className={fieldClassName()} />
        <input type="text" placeholder="Slug" className={fieldClassName()} />
        <textarea placeholder="Short description" rows={3} className={fieldClassName()} />
        <textarea placeholder="Long description / case study" rows={10} className={fieldClassName()} />
        <div className="flex justify-end gap-2">
          <button type="button" className="rounded-lg px-3.5 py-2 text-sm border border-[var(--border)]">Save Draft</button>
          <button type="button" className="rounded-lg px-3.5 py-2 text-sm bg-[var(--text)] text-[var(--bg)]">Publish</button>
        </div>
      </div>
    </DashboardShell>
  );
}

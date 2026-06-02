import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { fieldClassName } from "@/lib/formStyles";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;

  return (
    <DashboardShell title={`Edit Project: ${id}`} description="Edit project details (mock UI).">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-4 space-y-4">
        <input type="text" defaultValue="Sample Project" className={fieldClassName()} />
        <input type="text" defaultValue="sample-project" className={fieldClassName()} />
        <textarea defaultValue="Project short description..." rows={3} className={fieldClassName()} />
        <textarea defaultValue="Project long description..." rows={10} className={fieldClassName()} />
        <div className="flex justify-end gap-2">
          <button type="button" className="rounded-lg px-3.5 py-2 text-sm border border-[var(--border)]">Save</button>
          <button type="button" className="rounded-lg px-3.5 py-2 text-sm bg-[var(--text)] text-[var(--bg)]">Update</button>
        </div>
      </div>
    </DashboardShell>
  );
}

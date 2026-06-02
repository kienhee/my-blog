import { DashboardShell } from "@/components/dashboard/DashboardShell";

const MOCK_MEDIA = [
  { id: "media-1", name: "hero-cover.jpg", size: "324 KB" },
  { id: "media-2", name: "project-card-01.png", size: "188 KB" },
  { id: "media-3", name: "thumbnail-react.png", size: "96 KB" },
];

export default function DashboardMediaPage() {
  return (
    <DashboardShell title="Media" description="Manage uploaded images and assets.">
      <div className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--bg-surface)] p-6 text-center">
        <p className="text-sm text-[var(--text-muted)]">Drop files here to upload (UI mock)</p>
      </div>

      <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_MEDIA.map((item) => (
            <article key={item.id} className="rounded-lg border border-[var(--border)] p-3">
              <div className="h-24 rounded-md bg-[var(--bg-surface-2)] mb-3" />
              <p className="text-sm text-[var(--text)] truncate">{item.name}</p>
              <p className="text-xs text-[var(--text-subtle)] mt-1">{item.size}</p>
            </article>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}

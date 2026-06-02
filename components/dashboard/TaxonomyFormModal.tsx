"use client";

import { fieldClassName } from "@/lib/formStyles";

interface TaxonomyFormValues {
  title: string;
  slug: string;
  description: string;
}

interface TaxonomyFormModalProps {
  open: boolean;
  mode: "create" | "edit";
  moduleName: string;
  values: TaxonomyFormValues;
  onChange: (values: TaxonomyFormValues) => void;
  onClose: () => void;
  onSubmit: () => void;
}

export function TaxonomyFormModal({ open, mode, moduleName, values, onChange, onClose, onSubmit }: TaxonomyFormModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90]">
      <button
        type="button"
        aria-label="Close drawer backdrop"
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />
      <aside className="absolute inset-y-0 right-0 w-full max-w-md border-l border-[var(--border)] bg-[var(--bg-surface)] shadow-2xl flex flex-col">
        <header className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-subtle)]">Off-canvas</p>
            <h3 className="font-display text-lg font-black tracking-tight text-[var(--text)]">
              {mode === "create" ? `Create ${moduleName}` : `Edit ${moduleName}`}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close drawer"
            className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]"
          >
            ×
          </button>
        </header>
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          <div>
            <label className="mb-1 block text-sm text-[var(--text)]">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              value={values.title}
              onChange={(e) => onChange({ ...values, title: e.target.value })}
              placeholder="Title"
              className={fieldClassName()}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-[var(--text)]">
              Slug <span className="text-red-500">*</span>
            </label>
            <input
              value={values.slug}
              onChange={(e) => onChange({ ...values, slug: e.target.value })}
              placeholder="Slug"
              className={fieldClassName()}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-[var(--text)]">Description</label>
            <textarea
              rows={5}
              value={values.description}
              onChange={(e) => onChange({ ...values, description: e.target.value })}
              placeholder="Description"
              className={fieldClassName("resize-y")}
            />
          </div>
        </div>
        <footer className="px-4 py-3 border-t border-[var(--border)] flex items-center justify-end gap-2 bg-[var(--bg-surface)]">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3.5 py-2 text-sm border border-[var(--border)] text-[var(--text-muted)]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="rounded-lg px-3.5 py-2 text-sm bg-[var(--text)] text-[var(--bg)]"
          >
            {mode === "create" ? "Create" : "Update"}
          </button>
        </footer>
      </aside>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { Pencil, RotateCcw, Trash2, Plus } from "lucide-react";
import type { TaxonomyItem, ModuleTab } from "@/lib/mock/cms";
import { ConfirmModal } from "@/components/dashboard/ConfirmModal";
import { TaxonomyFormModal } from "@/components/dashboard/TaxonomyFormModal";

interface CmsTaxonomyModuleProps {
  moduleName: string;
  initialItems: TaxonomyItem[];
}

const EMPTY_FORM = {
  title: "",
  slug: "",
  description: "",
};

type ConfirmAction = "trash" | "restore" | "delete";

export function CmsTaxonomyModule({ moduleName, initialItems }: CmsTaxonomyModuleProps) {
  const [items, setItems] = useState<TaxonomyItem[]>(initialItems);
  const [tab, setTab] = useState<ModuleTab>("list");
  const [selected, setSelected] = useState<string[]>([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>("trash");
  const [confirmIds, setConfirmIds] = useState<string[]>([]);

  const visibleItems = useMemo(
    () => items.filter((item) => (tab === "list" ? !item.deletedAt : Boolean(item.deletedAt))),
    [items, tab],
  );

  const allChecked = visibleItems.length > 0 && selected.length === visibleItems.length;

  function resetForm() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setFormOpen(false);
  }

  function submitForm() {
    if (!form.title.trim() || !form.slug.trim()) return;

    if (editingId) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? { ...item, title: form.title.trim(), slug: form.slug.trim(), description: form.description.trim() }
            : item,
        ),
      );
      resetForm();
      return;
    }

    const newItem: TaxonomyItem = {
      id: `${moduleName.toLowerCase()}-${Date.now()}`,
      title: form.title.trim(),
      slug: form.slug.trim(),
      description: form.description.trim(),
      deletedAt: null,
    };
    setItems((prev) => [newItem, ...prev]);
    resetForm();
  }

  function toggleCheck(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  }

  function toggleCheckAll() {
    if (allChecked) setSelected([]);
    else setSelected(visibleItems.map((i) => i.id));
  }

  function moveToTrash(ids: string[]) {
    setItems((prev) => prev.map((item) => (ids.includes(item.id) ? { ...item, deletedAt: new Date().toISOString() } : item)));
    setSelected([]);
  }

  function restore(ids: string[]) {
    setItems((prev) => prev.map((item) => (ids.includes(item.id) ? { ...item, deletedAt: null } : item)));
    setSelected([]);
  }

  function deletePermanent(ids: string[]) {
    setItems((prev) => prev.filter((item) => !ids.includes(item.id)));
    setSelected([]);
  }

  function openConfirm(action: ConfirmAction, ids: string[]) {
    setConfirmAction(action);
    setConfirmIds(ids);
    setConfirmOpen(true);
  }

  function handleConfirm() {
    if (confirmAction === "trash") moveToTrash(confirmIds);
    else if (confirmAction === "restore") restore(confirmIds);
    else deletePermanent(confirmIds);
    setConfirmOpen(false);
    setConfirmIds([]);
  }

  const confirmConfig = {
    trash: {
      title: "Xác nhận bỏ vào thùng rác",
      description: `Bạn có chắc muốn chuyển ${confirmIds.length} ${moduleName.toLowerCase()} vào thùng rác?`,
      confirmText: "Bỏ thùng rác",
      tone: "danger" as const,
    },
    restore: {
      title: "Xác nhận khôi phục",
      description: `Bạn có chắc muốn khôi phục ${confirmIds.length} ${moduleName.toLowerCase()}?`,
      confirmText: "Khôi phục",
      tone: "default" as const,
    },
    delete: {
      title: "Xác nhận xóa vĩnh viễn",
      description: `Hành động này không thể hoàn tác. Xóa vĩnh viễn ${confirmIds.length} ${moduleName.toLowerCase()}?`,
      confirmText: "Xóa vĩnh viễn",
      tone: "danger" as const,
    },
  }[confirmAction];

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] pb-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setTab("list");
                setSelected([]);
              }}
              className={`rounded-md px-3 py-1.5 text-sm ${tab === "list" ? "bg-[var(--bg)] border border-[var(--border)] text-[var(--text)]" : "text-[var(--text-muted)]"}`}
            >
              Danh sách
            </button>
            <button
              type="button"
              onClick={() => {
                setTab("trash");
                setSelected([]);
              }}
              className={`rounded-md px-3 py-1.5 text-sm ${tab === "trash" ? "bg-[var(--bg)] border border-[var(--border)] text-[var(--text)]" : "text-[var(--text-muted)]"}`}
            >
              Thùng rác
            </button>
          </div>
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm(EMPTY_FORM);
              setFormOpen(true);
            }}
            className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm bg-[var(--text)] text-[var(--bg)]"
          >
            <Plus size={14} />
            Thêm mới
          </button>
        </div>

        {selected.length > 0 ? (
          <div className="mt-3 mb-3 rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 flex flex-wrap items-center gap-2">
            <span className="text-sm text-[var(--text-muted)]">Đã chọn {selected.length}</span>
            {tab === "list" ? (
              <button type="button" onClick={() => openConfirm("trash", selected)} className="text-sm text-red-400">
                Bỏ thùng rác
              </button>
            ) : (
              <>
                <button type="button" onClick={() => openConfirm("restore", selected)} className="text-sm text-emerald-400">
                  Khôi phục
                </button>
                <button type="button" onClick={() => openConfirm("delete", selected)} className="text-sm text-red-400">
                  Xóa vĩnh viễn
                </button>
              </>
            )}
          </div>
        ) : null}

        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse">
            <thead>
              <tr className="text-left">
                <th className="py-2 pr-2">
                  <input type="checkbox" checked={allChecked} onChange={toggleCheckAll} />
                </th>
                <th className="py-2 pr-3 text-xs font-mono tracking-widest uppercase text-[var(--text-subtle)]">Title</th>
                <th className="py-2 pr-3 text-xs font-mono tracking-widest uppercase text-[var(--text-subtle)]">Slug</th>
                <th className="py-2 pr-3 text-xs font-mono tracking-widest uppercase text-[var(--text-subtle)]">Description</th>
                <th className="py-2 pr-0 text-xs font-mono tracking-widest uppercase text-[var(--text-subtle)] text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleItems.map((item) => (
                <tr key={item.id} className="border-t border-[var(--border)]">
                  <td className="py-3 pr-2">
                    <input type="checkbox" checked={selected.includes(item.id)} onChange={() => toggleCheck(item.id)} />
                  </td>
                  <td className="py-3 pr-3 text-sm text-[var(--text)]">{item.title}</td>
                  <td className="py-3 pr-3 text-sm text-[var(--text-muted)]">{item.slug}</td>
                  <td className="py-3 pr-3 text-sm text-[var(--text-muted)] line-clamp-1">{item.description}</td>
                  <td className="py-3 text-right">
                    {tab === "list" ? (
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(item.id);
                            setForm({
                              title: item.title,
                              slug: item.slug,
                              description: item.description,
                            });
                            setFormOpen(true);
                          }}
                          aria-label="Edit"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] bg-[var(--bg)]"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => openConfirm("trash", [item.id])}
                          aria-label="Move to trash"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border)] text-red-400 bg-[var(--bg)]"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => openConfirm("restore", [item.id])}
                          aria-label="Restore"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border)] text-emerald-400 bg-[var(--bg)]"
                        >
                          <RotateCcw size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => openConfirm("delete", [item.id])}
                          aria-label="Delete permanently"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border)] text-red-400 bg-[var(--bg)]"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {visibleItems.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-sm text-[var(--text-subtle)]">
                    Không có dữ liệu trong tab này.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
      <TaxonomyFormModal
        open={formOpen}
        mode={editingId ? "edit" : "create"}
        moduleName={moduleName}
        values={form}
        onChange={setForm}
        onClose={resetForm}
        onSubmit={submitForm}
      />
      <ConfirmModal
        open={confirmOpen}
        title={confirmConfig.title}
        description={confirmConfig.description}
        confirmText={confirmConfig.confirmText}
        tone={confirmConfig.tone}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}

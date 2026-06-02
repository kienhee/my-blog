"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Pencil, RotateCcw, Trash2 } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import {
  MOCK_CATEGORIES,
  MOCK_HASHTAGS,
  MOCK_POSTS,
  type ModuleTab,
  type PostItem,
  type PostStatus,
} from "@/lib/mock/cms";
import { ConfirmModal } from "@/components/dashboard/ConfirmModal";

type ConfirmAction = "trash" | "restore" | "delete";

export default function DashboardPostsPage() {
  const [posts, setPosts] = useState<PostItem[]>(MOCK_POSTS);
  const [tab, setTab] = useState<ModuleTab>("list");
  const [selected, setSelected] = useState<string[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>("trash");
  const [confirmIds, setConfirmIds] = useState<string[]>([]);

  const visiblePosts = useMemo(
    () => posts.filter((post) => (tab === "list" ? !post.deletedAt : Boolean(post.deletedAt))),
    [posts, tab],
  );

  const allChecked = visiblePosts.length > 0 && selected.length === visiblePosts.length;

  function toggleCheck(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  }

  function toggleCheckAll() {
    if (allChecked) setSelected([]);
    else setSelected(visiblePosts.map((post) => post.id));
  }

  function moveToTrash(ids: string[]) {
    setPosts((prev) => prev.map((post) => (ids.includes(post.id) ? { ...post, deletedAt: new Date().toISOString() } : post)));
    setSelected([]);
  }

  function restore(ids: string[]) {
    setPosts((prev) => prev.map((post) => (ids.includes(post.id) ? { ...post, deletedAt: null } : post)));
    setSelected([]);
  }

  function deletePermanent(ids: string[]) {
    setPosts((prev) => prev.filter((post) => !ids.includes(post.id)));
    setSelected([]);
  }

  function statusLabel(status: PostStatus) {
    if (status === "draft") return "Nháp";
    if (status === "scheduled") return "Lên lịch";
    return "Công khai";
  }

  function namesFromIds(ids: string[], data: { id: string; title: string }[]) {
    return data.filter((item) => ids.includes(item.id)).map((item) => item.title);
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
      description: `Bạn có chắc muốn chuyển ${confirmIds.length} bài viết vào thùng rác?`,
      confirmText: "Bỏ thùng rác",
      tone: "danger" as const,
    },
    restore: {
      title: "Xác nhận khôi phục",
      description: `Bạn có chắc muốn khôi phục ${confirmIds.length} bài viết?`,
      confirmText: "Khôi phục",
      tone: "default" as const,
    },
    delete: {
      title: "Xác nhận xóa vĩnh viễn",
      description: `Hành động này không thể hoàn tác. Xóa vĩnh viễn ${confirmIds.length} bài viết?`,
      confirmText: "Xóa vĩnh viễn",
      tone: "danger" as const,
    },
  }[confirmAction];

  return (
    <DashboardShell
      title="Posts"
      description="Manage posts list and trash."
      actions={
        <Link href="/dashboard/posts/new" className="rounded-lg px-3.5 py-2 text-sm bg-[var(--text)] text-[var(--bg)]">
          New Post
        </Link>
      }
    >
      <div className="space-y-4">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-4">
          <div className="flex items-center gap-2 border-b border-[var(--border)] pb-3">
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
            <table className="w-full min-w-[980px] border-collapse">
              <thead>
                <tr className="text-left">
                  <th className="py-2 pr-2">
                    <input type="checkbox" checked={allChecked} onChange={toggleCheckAll} />
                  </th>
                  <th className="py-2 pr-3 text-xs font-mono tracking-widest uppercase text-[var(--text-subtle)]">Post</th>
                  <th className="py-2 pr-3 text-xs font-mono tracking-widest uppercase text-[var(--text-subtle)]">Status</th>
                  <th className="py-2 pr-3 text-xs font-mono tracking-widest uppercase text-[var(--text-subtle)]">Hashtags</th>
                  <th className="py-2 pr-3 text-xs font-mono tracking-widest uppercase text-[var(--text-subtle)]">Categories</th>
                  <th className="py-2 pr-0 text-xs font-mono tracking-widest uppercase text-[var(--text-subtle)] text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visiblePosts.map((post) => (
                  <tr key={post.id} className="border-t border-[var(--border)] align-top">
                    <td className="py-3 pr-2">
                      <input type="checkbox" checked={selected.includes(post.id)} onChange={() => toggleCheck(post.id)} />
                    </td>
                    <td className="py-3 pr-3">
                      <div className="flex items-start gap-3">
                        <img
                          src={post.cover}
                          alt={post.title}
                          className="w-12 h-12 rounded-md object-cover border border-[var(--border)] shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-sm text-[var(--text)] line-clamp-2">{post.title}</p>
                          <p className="text-xs text-[var(--text-subtle)] mt-0.5">{post.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 pr-3 text-sm text-[var(--text-muted)]">{statusLabel(post.status)}</td>
                    <td className="py-3 pr-3 text-sm text-[var(--text-muted)]">
                      {namesFromIds(post.hashtagIds, MOCK_HASHTAGS).join(", ") || "-"}
                    </td>
                    <td className="py-3 pr-3 text-sm text-[var(--text-muted)]">
                      {namesFromIds(post.categoryIds, MOCK_CATEGORIES).join(", ") || "-"}
                    </td>
                    <td className="py-3 text-right">
                      {tab === "list" ? (
                        <div className="inline-flex items-center gap-1.5">
                          <Link
                            href={`/dashboard/posts/${post.id}/edit`}
                            aria-label="Edit post"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] bg-[var(--bg)]"
                          >
                            <Pencil size={13} />
                          </Link>
                          <button
                            type="button"
                            onClick={() => openConfirm("trash", [post.id])}
                            aria-label="Move post to trash"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border)] text-red-400 bg-[var(--bg)]"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => openConfirm("restore", [post.id])}
                            aria-label="Restore post"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border)] text-emerald-400 bg-[var(--bg)]"
                          >
                            <RotateCcw size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => openConfirm("delete", [post.id])}
                            aria-label="Delete post permanently"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border)] text-red-400 bg-[var(--bg)]"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {visiblePosts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-sm text-[var(--text-subtle)]">
                      Không có dữ liệu trong tab này.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ConfirmModal
        open={confirmOpen}
        title={confirmConfig.title}
        description={confirmConfig.description}
        confirmText={confirmConfig.confirmText}
        tone={confirmConfig.tone}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
      />
    </DashboardShell>
  );
}

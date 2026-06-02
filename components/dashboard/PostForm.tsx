"use client";

import { useMemo, useState } from "react";
import Select, { type MultiValue } from "react-select";
import type { PostItem, PostStatus, TaxonomyItem } from "@/lib/mock/cms";
import { TipTapEditor } from "@/components/dashboard/TipTapEditor";
import { fieldClassName, fieldClassNameMuted } from "@/lib/formStyles";

type PostFormValues = Omit<PostItem, "id" | "deletedAt">;

const EMPTY_FORM: PostFormValues = {
  cover: "",
  title: "",
  slug: "",
  description: "",
  content: "",
  status: "public",
  hashtagIds: [],
  categoryIds: [],
};

interface PostFormProps {
  mode: "create" | "edit";
  postId?: string;
  initialValues?: PostFormValues;
  hashtags: TaxonomyItem[];
  categories: TaxonomyItem[];
  onSubmit?: (values: PostFormValues) => void;
}

type SelectOption = { value: string; label: string };

export function PostForm({ mode, postId, initialValues, hashtags, categories, onSubmit }: PostFormProps) {
  const editorKey = mode === "edit" && postId ? `edit-${postId}` : "create";
  const [form, setForm] = useState<PostFormValues>(initialValues ?? EMPTY_FORM);

  const activeHashtags = useMemo(() => hashtags.filter((tag) => !tag.deletedAt), [hashtags]);
  const activeCategories = useMemo(() => categories.filter((cat) => !cat.deletedAt), [categories]);
  const hashtagOptions = useMemo<SelectOption[]>(
    () => activeHashtags.map((item) => ({ value: item.id, label: item.title })),
    [activeHashtags],
  );
  const categoryOptions = useMemo<SelectOption[]>(
    () => activeCategories.map((item) => ({ value: item.id, label: item.title })),
    [activeCategories],
  );
  const selectedHashtagOptions = useMemo(
    () => hashtagOptions.filter((item) => form.hashtagIds.includes(item.value)),
    [hashtagOptions, form.hashtagIds],
  );
  const selectedCategoryOptions = useMemo(
    () => categoryOptions.filter((item) => form.categoryIds.includes(item.value)),
    [categoryOptions, form.categoryIds],
  );

  function submit(targetStatus?: PostStatus) {
    const nextValues = targetStatus ? { ...form, status: targetStatus } : form;
    onSubmit?.(nextValues);
  }

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-4 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-subtle)]">
            {mode === "create" ? "Compose new post" : "Edit post"}
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Title, content ở bên trái · Meta, status ở sidebar bên phải.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => submit("draft")}
            className="rounded-lg px-3.5 py-2 text-sm border border-[var(--border)] text-[var(--text-muted)]"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => submit()}
            className="rounded-lg px-3.5 py-2 text-sm bg-[var(--text)] text-[var(--bg)]"
          >
            {mode === "create" ? "Create Post" : "Update Post"}
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,2.2fr)_minmax(260px,1fr)]">
        <section className="space-y-4">
          <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] p-4 space-y-3">
            <div>
              <label className="mb-1 block text-sm text-[var(--text)]">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Post title"
                className={fieldClassNameMuted()}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-[var(--text)]">
                Slug <span className="text-red-500">*</span>
              </label>
              <input
                value={form.slug}
                onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
                placeholder="Slug"
                className={fieldClassNameMuted()}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-[var(--text)]">Description</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Short description"
                className={fieldClassNameMuted("resize-none")}
              />
            </div>
          </div>

          <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] p-4">
            <label className="mb-1 block text-sm text-[var(--text)]">
              Content <span className="text-red-500">*</span>
            </label>
            <TipTapEditor
              key={editorKey}
              value={form.content}
              onChange={(html) => setForm((prev) => ({ ...prev, content: html }))}
              placeholder="Write your article content here..."
            />
            <p className="mt-2 text-xs text-[var(--text-subtle)]">Content được lưu dạng HTML (TipTap).</p>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] p-4 space-y-3">
            <label className="block text-sm text-[var(--text)]">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              value={form.status}
              onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value as PostStatus }))}
              className={fieldClassNameMuted()}
            >
              <option value="public">Công khai (default)</option>
              <option value="draft">Nháp</option>
              <option value="scheduled">Lên lịch</option>
            </select>
          </div>

          <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] p-4 space-y-3">
            <label className="block text-sm text-[var(--text)]">Cover URL</label>
            {form.cover ? (
              <img
                src={form.cover}
                alt="Cover preview"
                className="w-full rounded-md border border-[var(--border)] object-cover max-h-40"
              />
            ) : (
              <div className="w-full h-24 rounded-md border border-dashed border-[var(--border)] flex items-center justify-center text-xs text-[var(--text-subtle)]">
                Cover preview
              </div>
            )}
            <input
              value={form.cover}
              onChange={(e) => setForm((prev) => ({ ...prev, cover: e.target.value }))}
              placeholder="Cover image URL"
              className={fieldClassNameMuted()}
            />
          </div>

          <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] p-4">
            <label className="mb-2 block text-sm text-[var(--text)]">
              Hashtags <span className="text-red-500">*</span>
            </label>
            <Select<SelectOption, true>
              instanceId="post-hashtags"
              isMulti
              options={hashtagOptions}
              value={selectedHashtagOptions}
              onChange={(selected: MultiValue<SelectOption>) =>
                setForm((prev) => ({ ...prev, hashtagIds: selected.map((item) => item.value) }))
              }
              placeholder="Select hashtags..."
              noOptionsMessage={() => "No hashtag found"}
              unstyled
              classNames={{
                control: (state) =>
                  `min-h-[40px] rounded-lg border bg-[var(--bg-surface-2)] px-2 text-sm outline-none ${
                    state.isFocused ? "border-[var(--text-muted)]" : "border-[var(--border)]"
                  }`,
                placeholder: () => "text-[var(--text-subtle)]",
                input: () => "text-[var(--text)]",
                valueContainer: () => "gap-1 py-1",
                multiValue: () => "rounded-md border border-[var(--border)] bg-[var(--bg)]",
                multiValueLabel: () => "text-xs text-[var(--text)] px-1.5 py-0.5",
                multiValueRemove: () => "text-[var(--text-subtle)] hover:text-red-400 px-1",
                menu: () => "mt-1 rounded-lg border border-[var(--border)] bg-[var(--bg)] p-1 shadow-xl",
                option: (state) =>
                  `cursor-pointer rounded-md px-2.5 py-1.5 text-sm ${
                    state.isFocused ? "bg-[var(--bg-surface-2)] text-[var(--text)]" : "text-[var(--text-muted)]"
                  }`,
                noOptionsMessage: () => "px-2 py-1 text-xs text-[var(--text-subtle)]",
              }}
            />
          </div>

          <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] p-4">
            <label className="mb-2 block text-sm text-[var(--text)]">
              Categories <span className="text-red-500">*</span>
            </label>
            <Select<SelectOption, true>
              instanceId="post-categories"
              isMulti
              options={categoryOptions}
              value={selectedCategoryOptions}
              onChange={(selected: MultiValue<SelectOption>) =>
                setForm((prev) => ({ ...prev, categoryIds: selected.map((item) => item.value) }))
              }
              placeholder="Select categories..."
              noOptionsMessage={() => "No category found"}
              unstyled
              classNames={{
                control: (state) =>
                  `min-h-[40px] rounded-lg border bg-[var(--bg-surface-2)] px-2 text-sm outline-none ${
                    state.isFocused ? "border-[var(--text-muted)]" : "border-[var(--border)]"
                  }`,
                placeholder: () => "text-[var(--text-subtle)]",
                input: () => "text-[var(--text)]",
                valueContainer: () => "gap-1 py-1",
                multiValue: () => "rounded-md border border-[var(--border)] bg-[var(--bg)]",
                multiValueLabel: () => "text-xs text-[var(--text)] px-1.5 py-0.5",
                multiValueRemove: () => "text-[var(--text-subtle)] hover:text-red-400 px-1",
                menu: () => "mt-1 rounded-lg border border-[var(--border)] bg-[var(--bg)] p-1 shadow-xl",
                option: (state) =>
                  `cursor-pointer rounded-md px-2.5 py-1.5 text-sm ${
                    state.isFocused ? "bg-[var(--bg-surface-2)] text-[var(--text)]" : "text-[var(--text-muted)]"
                  }`,
                noOptionsMessage: () => "px-2 py-1 text-xs text-[var(--text-subtle)]",
              }}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}

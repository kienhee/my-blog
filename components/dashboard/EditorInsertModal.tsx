"use client";

import { useEffect, useId, useState } from "react";
import { fieldClassName } from "@/lib/formStyles";

export type EditorInsertMode = "link" | "image";

interface EditorInsertModalProps {
  mode: EditorInsertMode | null;
  initialUrl?: string;
  initialAlt?: string;
  initialOpenInNewTab?: boolean;
  canRemoveLink?: boolean;
  onClose: () => void;
  onSubmitLink: (data: { href: string; openInNewTab: boolean }) => void;
  onSubmitImage: (data: { src: string; alt: string }) => void;
  onRemoveLink?: () => void;
}

export function EditorInsertModal({
  mode,
  initialUrl = "",
  initialAlt = "",
  initialOpenInNewTab = true,
  canRemoveLink = false,
  onClose,
  onSubmitLink,
  onSubmitImage,
  onRemoveLink,
}: EditorInsertModalProps) {
  const urlId = useId();
  const altId = useId();
  const [url, setUrl] = useState(initialUrl);
  const [alt, setAlt] = useState(initialAlt);
  const [openInNewTab, setOpenInNewTab] = useState(initialOpenInNewTab);

  useEffect(() => {
    if (!mode) return;
    setUrl(initialUrl);
    setAlt(initialAlt);
    setOpenInNewTab(initialOpenInNewTab);
  }, [mode, initialUrl, initialAlt, initialOpenInNewTab]);

  if (!mode) return null;

  const isLink = mode === "link";
  const title = isLink ? "Insert link" : "Insert image";
  const description = isLink
    ? "Enter the URL. Selected text will become the link label."
    : "Enter the image URL. Alt text helps accessibility and SEO.";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) return;
    if (isLink) {
      onSubmitLink({ href: trimmed, openInNewTab });
    } else {
      onSubmitImage({ src: trimmed, alt: alt.trim() });
    }
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-4">
      <button type="button" aria-label="Close modal backdrop" onClick={onClose} className="absolute inset-0 bg-black/60" />
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="editor-insert-title"
        onSubmit={handleSubmit}
        className="relative w-full max-w-md rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-4 shadow-2xl"
      >
        <h3 id="editor-insert-title" className="font-display text-xl font-black tracking-tight text-[var(--text)]">
          {title}
        </h3>
        <p className="mt-2 text-sm text-[var(--text-muted)]">{description}</p>

        <div className="mt-4 space-y-3">
          <div>
            <label htmlFor={urlId} className="mb-1 block text-sm text-[var(--text)]">
              URL <span className="text-red-500">*</span>
            </label>
            <input
              id={urlId}
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={isLink ? "https://example.com" : "https://…/image.jpg"}
              className={fieldClassName()}
              autoFocus
            />
          </div>

          {!isLink ? (
            <div>
              <label htmlFor={altId} className="mb-1 block text-sm text-[var(--text)]">
                Alt text
              </label>
              <input
                id={altId}
                type="text"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                placeholder="Describe the image"
                className={fieldClassName()}
              />
            </div>
          ) : (
            <label className="flex cursor-pointer items-center gap-2 text-sm text-[var(--text-muted)]">
              <input
                type="checkbox"
                checked={openInNewTab}
                onChange={(e) => setOpenInNewTab(e.target.checked)}
                className="rounded border-[var(--border)]"
              />
              Open in new tab
            </label>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
          {isLink && canRemoveLink && onRemoveLink ? (
            <button
              type="button"
              onClick={() => {
                onRemoveLink();
                onClose();
              }}
              className="mr-auto rounded-lg px-3.5 py-2 text-sm text-red-400 hover:bg-[var(--bg)]"
            >
              Remove link
            </button>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3.5 py-2 text-sm border border-[var(--border)] text-[var(--text-muted)]"
          >
            Cancel
          </button>
          <button type="submit" className="rounded-lg px-3.5 py-2 text-sm bg-[var(--text)] text-[var(--bg)]">
            {isLink ? "Apply link" : "Insert image"}
          </button>
        </div>
      </form>
    </div>
  );
}

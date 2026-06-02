"use client";

import type { ReactNode } from "react";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  tone?: "default" | "danger";
  onConfirm: () => void;
  onClose: () => void;
  children?: ReactNode;
}

export function ConfirmModal({
  open,
  title,
  description,
  confirmText = "Xác nhận",
  cancelText = "Hủy",
  tone = "default",
  onConfirm,
  onClose,
  children,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <button type="button" aria-label="Close modal backdrop" onClick={onClose} className="absolute inset-0 bg-black/60" />
      <div className="relative w-full max-w-md rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-4 shadow-2xl">
        <h3 className="font-display text-xl font-black tracking-tight text-[var(--text)]">{title}</h3>
        <p className="mt-2 text-sm text-[var(--text-muted)]">{description}</p>
        {children ? <div className="mt-3">{children}</div> : null}
        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3.5 py-2 text-sm border border-[var(--border)] text-[var(--text-muted)]"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-lg px-3.5 py-2 text-sm ${
              tone === "danger" ? "bg-red-500 text-white" : "bg-[var(--text)] text-[var(--bg)]"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

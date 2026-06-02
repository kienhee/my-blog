import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded-lg border border-[var(--border)] px-3 py-2.5 text-sm text-[var(--text)] outline-none transition-colors focus:border-[var(--text-muted)] focus:outline-none";

export function fieldClassName(extra?: string) {
  return cn(fieldBase, "bg-[var(--bg)]", extra);
}

export function fieldClassNameMuted(extra?: string) {
  return cn(fieldBase, "bg-[var(--bg-surface-2)]", extra);
}

export function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return "";
  if (/^(https?:\/\/|mailto:|tel:|\/|#)/i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

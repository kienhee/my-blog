import type { ReactNode } from "react";

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <section className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 sm:p-7">
      <header className="mb-6">
        <h1 className="font-display text-2xl font-black tracking-tight text-[var(--text)]">{title}</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">{subtitle}</p>
      </header>
      <div className="space-y-4">{children}</div>
      {footer ? <div className="mt-6 border-t border-[var(--border)] pt-4">{footer}</div> : null}
    </section>
  );
}

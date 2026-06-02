import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { fieldClassName } from "@/lib/formStyles";

export default function LoginPage() {
  return (
    <AuthShell
      title="Login"
      subtitle="Sign in to access your CMS dashboard."
      footer={
        <p className="text-sm text-[var(--text-muted)]">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-[var(--text)] hover:text-[var(--text-muted)] transition-colors">
            Register
          </Link>
        </p>
      }
    >
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm text-[var(--text-subtle)]">Email</label>
        <input id="email" name="email" type="email" placeholder="you@example.com" className={fieldClassName()} />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm text-[var(--text-subtle)]">Password</label>
        <input id="password" name="password" type="password" placeholder="••••••••" className={fieldClassName()} />
      </div>
      <div className="flex items-center justify-between gap-3">
        <label className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)]">
          <input type="checkbox" className="accent-[var(--text)]" /> Remember me
        </label>
        <Link href="/auth/forgot-password" className="text-sm text-[var(--text-subtle)] hover:text-[var(--text)] transition-colors">
          Forgot password?
        </Link>
      </div>
      <button type="button" className="w-full rounded-lg px-4 py-2.5 bg-[var(--text)] text-[var(--bg)] text-sm font-semibold hover:opacity-90 transition-opacity">
        Login
      </button>
    </AuthShell>
  );
}

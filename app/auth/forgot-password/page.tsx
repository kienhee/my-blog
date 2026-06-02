import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { fieldClassName } from "@/lib/formStyles";

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Forgot Password"
      subtitle="Enter your email to receive a reset link."
      footer={
        <p className="text-sm text-[var(--text-muted)]">
          Back to{" "}
          <Link href="/auth/login" className="text-[var(--text)] hover:text-[var(--text-muted)] transition-colors">
            Login
          </Link>
        </p>
      }
    >
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm text-[var(--text-subtle)]">Email</label>
        <input id="email" name="email" type="email" placeholder="you@example.com" className={fieldClassName()} />
      </div>
      <button type="button" className="w-full rounded-lg px-4 py-2.5 bg-[var(--text)] text-[var(--bg)] text-sm font-semibold hover:opacity-90 transition-opacity">
        Send reset link
      </button>
    </AuthShell>
  );
}

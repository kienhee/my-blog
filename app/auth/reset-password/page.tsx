import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { fieldClassName } from "@/lib/formStyles";

export default function ResetPasswordPage() {
  return (
    <AuthShell
      title="Reset Password"
      subtitle="Set a new password for your account."
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
        <label htmlFor="password" className="block text-sm text-[var(--text-subtle)]">New Password</label>
        <input id="password" name="password" type="password" placeholder="Minimum 8 characters" className={fieldClassName()} />
      </div>
      <div className="space-y-2">
        <label htmlFor="confirm-password" className="block text-sm text-[var(--text-subtle)]">Confirm New Password</label>
        <input id="confirm-password" name="confirm-password" type="password" placeholder="Repeat new password" className={fieldClassName()} />
      </div>
      <button type="button" className="w-full rounded-lg px-4 py-2.5 bg-[var(--text)] text-[var(--bg)] text-sm font-semibold hover:opacity-90 transition-opacity">
        Update password
      </button>
    </AuthShell>
  );
}

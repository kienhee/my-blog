import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { fieldClassName } from "@/lib/formStyles";

export default function RegisterPage() {
  return (
    <AuthShell
      title="Register"
      subtitle="Create your CMS account."
      footer={
        <p className="text-sm text-[var(--text-muted)]">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[var(--text)] hover:text-[var(--text-muted)] transition-colors">
            Login
          </Link>
        </p>
      }
    >
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm text-[var(--text-subtle)]">Name</label>
        <input id="name" name="name" type="text" placeholder="Kienhee" className={fieldClassName()} />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm text-[var(--text-subtle)]">Email</label>
        <input id="email" name="email" type="email" placeholder="you@example.com" className={fieldClassName()} />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm text-[var(--text-subtle)]">Password</label>
        <input id="password" name="password" type="password" placeholder="Minimum 8 characters" className={fieldClassName()} />
      </div>
      <div className="space-y-2">
        <label htmlFor="confirm-password" className="block text-sm text-[var(--text-subtle)]">Confirm Password</label>
        <input id="confirm-password" name="confirm-password" type="password" placeholder="Repeat password" className={fieldClassName()} />
      </div>
      <button type="button" className="w-full rounded-lg px-4 py-2.5 bg-[var(--text)] text-[var(--bg)] text-sm font-semibold hover:opacity-90 transition-opacity">
        Create account
      </button>
    </AuthShell>
  );
}

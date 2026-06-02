"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setState("loading");
    setError("");

    // Simulate API call — replace with real endpoint
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email.includes("@")) {
      setState("success");
    } else {
      setState("error");
      setError("Please enter a valid email address.");
    }
  }

  if (state === "success") {
    return (
      <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--text)] text-[var(--bg)]">
          <Check size={12} />
        </span>
        You're in — I'll be in your inbox soon.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex gap-2">
        <input
          type="email"
          name="email"
          autoComplete="email"
          spellCheck={false}
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@example.com…"
          required
          disabled={state === "loading"}
          className="flex-1 min-w-0 px-4 py-2.5 rounded-lg text-sm bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-subtle)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text)] transition-all duration-150 disabled:opacity-50"
        />
         <button
            type="submit"
            aria-label="Subscribe to newsletter"
            disabled={state === "loading" || !email}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-[var(--text)] text-[var(--bg)] hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text)] focus-visible:ring-offset-2 transition-all duration-150 disabled:opacity-40 cursor-pointer shrink-0"
          >
            {state === "loading" ? (
              <Loader size={14} className="animate-spin" />
            ) : (
              <ArrowRight size={14} />
            )}
            <span className="hidden sm:inline">Subscribe</span>
          </button>
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </form>
  );
}

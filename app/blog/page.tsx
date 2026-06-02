import { ViewTransition } from "react";
import type { Metadata } from "next";
import { BlogClient } from "@/components/BlogClient";
import { POSTS, getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles on software engineering, web development, and building things on the internet.",
};

export default function BlogPage() {
  const tags = getAllTags();

  return (
    <ViewTransition
      enter={{ "nav-back": "slide-from-left", default: "none" }}
      exit={{ "nav-forward": "slide-to-left", default: "none" }}
      default="none"
    >
      <div className="pt-14">
      {/* ─── Header ─────────────────────────────────────── */}
      <div
        className="px-6 md:px-12 pt-16 pb-12 border-b border-[var(--border)]"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-subtle)] mb-4 block">
              Writing
            </span>
            <h1
              className="font-display font-black tracking-tighter text-[var(--text)] uppercase leading-none"
              style={{ fontSize: "clamp(3.5rem, 9vw, 10rem)" }}
            >
              Blog
            </h1>
          </div>
          <p className="text-sm text-[var(--text-muted)] max-w-sm leading-relaxed pb-1">
            Long-form articles on software engineering, architecture, developer tools,
            and the occasional opinion. {POSTS.length} posts and counting.
          </p>
        </div>
      </div>

      {/* ─── Content ─────────────────────────────────────── */}
      <div className="px-6 md:px-12 py-12">
        <BlogClient posts={POSTS} tags={tags} />
      </div>
    </div>
    </ViewTransition>
  );
}

import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";
import type { Post } from "@/lib/posts";
import { formatDateShort } from "@/lib/utils";

interface PostCardProps {
  post: Post;
  variant?: "default" | "compact";
}

export function PostCard({ post, variant = "default" }: PostCardProps) {
  if (variant === "compact") {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group flex items-start justify-between gap-4 py-4 border-b border-[var(--border-subtle)] last:border-0 cursor-pointer"
      >
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-[var(--text)] group-hover:text-[var(--text-muted)] transition-colors duration-150 leading-snug line-clamp-2">
            {post.title}
          </h3>
          <div className="mt-1.5 flex items-center gap-3 text-sm text-[var(--text-subtle)]">
            <span>{formatDateShort(post.date)}</span>
            <span className="flex items-center gap-1">
              <Clock size={10} />
              {post.readingTime} min
            </span>
          </div>
        </div>
        <ArrowUpRight
          size={14}
          className="mt-0.5 shrink-0 text-[var(--text-subtle)] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
        />
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block p-6 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--text-subtle)] hover:bg-[var(--bg-surface-2)] transition-all duration-200 cursor-pointer"
    >
      {/* Tags */}
      <div className="flex items-center gap-2 mb-4">
        {post.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="text-sm font-medium px-2 py-0.5 rounded-md bg-[var(--bg-surface-2)] text-[var(--text-subtle)] border border-[var(--border-subtle)]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h3 className="font-display font-semibold text-base leading-snug text-[var(--text)] group-hover:text-[var(--text-muted)] transition-colors duration-150 mb-2">
        {post.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-[var(--text-muted)] leading-relaxed line-clamp-2 mb-5">
        {post.description}
      </p>

      {/* Meta */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm text-[var(--text-subtle)]">
          <span>{formatDateShort(post.date)}</span>
          <span className="flex items-center gap-1">
            <Clock size={10} />
            {post.readingTime} min read
          </span>
        </div>
        <ArrowUpRight
          size={14}
          className="text-[var(--text-subtle)] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
        />
      </div>
    </Link>
  );
}

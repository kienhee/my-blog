"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Clock, ArrowUpRight } from "lucide-react";
import { SearchIcon, XIcon, LayoutGridIcon, LayoutListIcon } from "@animateicons/react/lucide";
import type { XIconHandle, LayoutGridIconHandle, LayoutListIconHandle } from "@animateicons/react/lucide";
import Link from "next/link";
import type { Post } from "@/lib/posts";
import { formatDateShort } from "@/lib/utils";

interface BlogClientProps {
  posts: Post[];
  tags: string[];
}

type ViewMode = "grid" | "list";

/* ─── Grid Card ──────────────────────────────────────────────────────── */
function GridCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      transitionTypes={["nav-forward"]}
      className="group flex flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--border-hover)] transition-all duration-300"
    >
      {/* Cover image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-800 flex items-center justify-center">
            <span
              className="font-display font-black text-white/10 select-none"
              style={{ fontSize: "clamp(3rem, 8vw, 6rem)", letterSpacing: "-0.04em" }}
            >
              {post.title.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}

        {/* Gradient overlay at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Tags floating over image */}
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="font-mono text-[8px] tracking-widest uppercase bg-black/60 backdrop-blur-sm text-white/70 px-2 py-0.5 rounded-full border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Arrow reveal on hover */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
            <ArrowUpRight size={12} className="text-black" />
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Date + reading time */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] text-[var(--text-subtle)] tracking-wide">
            {formatDateShort(post.date)}
          </span>
          <span className="flex items-center gap-1 font-mono text-[10px] text-[var(--text-subtle)]">
            <Clock size={9} />
            {post.readingTime} min
          </span>
        </div>

        {/* Title */}
        <h2 className="font-display font-bold text-base lg:text-lg leading-snug text-[var(--text)] group-hover:text-[var(--text-muted)] transition-colors line-clamp-2">
          {post.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-[var(--text-subtle)] leading-relaxed line-clamp-2 flex-1">
          {post.description}
        </p>

        <span className="inline-flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase text-[var(--text-subtle)] group-hover:text-[var(--text)] transition-colors">
          Read more
          <ArrowUpRight size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </span>
      </div>
    </Link>
  );
}

/* ─── List Row ───────────────────────────────────────────────────────── */
function ListRow({ post, index }: { post: Post; index: number }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      transitionTypes={["nav-forward"]}
      className="group relative grid grid-cols-[3rem_1fr] lg:grid-cols-[3rem_1fr_160px_100px_2rem] items-center gap-4 lg:gap-8 py-5 border-b border-[var(--border-subtle)] hover:border-[var(--border)] transition-all"
    >
      <span className="font-mono text-sm text-[var(--text-subtle)] group-hover:text-[var(--text-muted)] transition-colors">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="min-w-0">
        <h2 className="font-display font-semibold text-sm lg:text-base leading-snug text-[var(--text)] group-hover:text-[var(--text-muted)] transition-colors truncate">
          {post.title}
        </h2>
        <p className="text-sm text-[var(--text-subtle)] mt-0.5 line-clamp-1 hidden sm:block">
          {post.description}
        </p>
      </div>

      <div className="hidden lg:flex flex-wrap gap-2">
        {post.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="font-mono text-[9px] tracking-widest uppercase text-[var(--text-subtle)]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="hidden lg:flex items-center gap-1.5 text-[var(--text-subtle)] justify-end">
        <Clock size={10} />
        <span className="font-mono text-[10px]">{post.readingTime} min</span>
      </div>

      <ArrowUpRight
        size={14}
        className="hidden lg:block text-[var(--text-subtle)] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
      />
    </Link>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────── */
export function BlogClient({ posts, tags }: BlogClientProps) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  // Keep initial render stable (prevents hydration mismatch).
  const [view, setView] = useState<ViewMode>("grid");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("blog-view") as ViewMode | null;
      if (stored === "grid" || stored === "list") setView(stored);
    } catch {}
  }, []);

  const clearIconRef = useRef<XIconHandle>(null);
  const gridIconRef = useRef<LayoutGridIconHandle>(null);
  const listIconRef = useRef<LayoutListIconHandle>(null);

  function handleSetView(v: ViewMode) {
    setView(v);
    try { localStorage.setItem("blog-view", v); } catch {}
  }

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesQuery =
        !query ||
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.description.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      const matchesTag = !activeTag || post.tags.includes(activeTag);
      return matchesQuery && matchesTag;
    });
  }, [posts, query, activeTag]);

  const hasFilters = query || activeTag;
  const SHOW_LOAD_MORE = 8;

  return (
    <div>
      {/* ── Row 1: Search + View toggle ── */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative w-56 shrink-0">
          <SearchIcon
            size={13}
            color="currentColor"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-subtle)] pointer-events-none"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            placeholder="Search articles…"
            className="w-full pl-8 pr-4 py-2 text-sm font-mono bg-[var(--bg-surface)] border border-[var(--border)] rounded text-[var(--text)] placeholder:text-[var(--text-subtle)] focus:outline-none focus:border-[var(--text-muted)] transition-colors"
          />
        </div>

        {hasFilters && (
          <button
            onClick={() => { setQuery(""); setActiveTag(null); }}
            onMouseEnter={() => clearIconRef.current?.startAnimation()}
            className="flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase text-[var(--text-subtle)] hover:text-[var(--text)] transition-colors shrink-0"
          >
            <XIcon ref={clearIconRef} size={12} color="currentColor" /> Clear
          </button>
        )}

        <div className="flex-1" />

        {/* View toggle */}
        <div className="flex items-center gap-1 shrink-0 border border-[var(--border)] rounded p-0.5">
          <button
            onClick={() => handleSetView("grid")}
            onMouseEnter={() => gridIconRef.current?.startAnimation()}
            aria-label="Grid view"
            className={`p-1.5 rounded transition-colors ${
              view === "grid"
                ? "bg-[var(--text)] text-[var(--bg)]"
                : "text-[var(--text-subtle)] hover:text-[var(--text)]"
            }`}
          >
            <LayoutGridIcon ref={gridIconRef} size={14} color="currentColor" />
          </button>
          <button
            onClick={() => handleSetView("list")}
            onMouseEnter={() => listIconRef.current?.startAnimation()}
            aria-label="List view"
            className={`p-1.5 rounded transition-colors ${
              view === "list"
                ? "bg-[var(--text)] text-[var(--bg)]"
                : "text-[var(--text-subtle)] hover:text-[var(--text)]"
            }`}
          >
            <LayoutListIcon ref={listIconRef} size={14} color="currentColor" />
          </button>
        </div>
      </div>

      {/* ── Row 2: Tags (scrollable) ── */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => {
            setActiveTag(null);
          }}
          className={`shrink-0 px-3 py-1.5 rounded font-mono text-[10px] tracking-widest uppercase transition-colors ${
            !activeTag
              ? "bg-[var(--text)] text-[var(--bg)]"
              : "border border-[var(--border)] text-[var(--text-subtle)] hover:text-[var(--text-muted)] hover:border-[var(--text-muted)]"
          }`}
        >
          All
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => {
              setActiveTag(activeTag === tag ? null : tag);
            }}
            className={`shrink-0 px-3 py-1.5 rounded font-mono text-[10px] tracking-widest uppercase transition-colors ${
              activeTag === tag
                ? "bg-[var(--text)] text-[var(--bg)]"
                : "border border-[var(--border)] text-[var(--text-subtle)] hover:text-[var(--text-muted)] hover:border-[var(--text-muted)]"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* ── Count ── */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-subtle)]">
          {filtered.length} {filtered.length === 1 ? "article" : "articles"}
          {hasFilters ? " found" : ""}
        </span>
        <span className="font-mono text-[10px] text-[var(--text-subtle)] uppercase tracking-widest hidden sm:block">
          {view === "grid" ? "Grid view" : "List view"}
        </span>
      </div>

      {/* ── Divider ── */}
      <div className="h-px bg-[var(--border)] mb-6" />

      {/* ── Content ── */}
      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-mono text-sm tracking-widest uppercase text-[var(--text-subtle)]">
            No articles found
          </p>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((post) => (
            <GridCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="relative overflow-visible">
          {filtered.map((post, i) => (
            <ListRow key={post.slug} post={post} index={i} />
          ))}
        </div>
      )}

      {/* ── Load more (UI only) ── */}
      {filtered.length > SHOW_LOAD_MORE && (
        <div className="mt-12 flex items-center justify-center">
          <button
            type="button"
            className="px-8 py-3 rounded-full border z-10 border-[var(--text)] bg-[var(--text)] text-[var(--bg)] font-mono text-sm font-semibold tracking-widest uppercase hover:opacity-85 transition-opacity duration-200 cursor-pointer"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}

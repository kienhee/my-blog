import { ViewTransition } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { POSTS, getPostBySlug, formatDate } from "@/lib/posts";
import { extractToc } from "@/lib/utils";
import { TOC } from "@/components/TOC";
import { PostContent } from "@/components/PostContent";
import { NewsletterForm } from "@/components/NewsletterForm";
import { PostActions } from "@/components/PostActions";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Kienhee"],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const toc = extractToc(post.content);

  return (
    <ViewTransition
      enter={{ "nav-forward": "slide-from-right", default: "none" }}
      exit={{ "nav-back": "slide-to-right", default: "none" }}
      default="none"
    >
      <div className="pt-14">

        {/* ─── Header ─────────────────────────────────────────── */}
        <div className="px-6 md:px-12 pt-16 pb-10 max-w-4xl mx-auto text-center">

          {/* Back link — left aligned */}
          <div className="flex justify-start mb-10">
            <Link
              href="/blog"
              transitionTypes={["nav-back"]}
              className="inline-flex items-center gap-2 text-sm font-mono tracking-widest uppercase text-[var(--text-subtle)] hover:text-[var(--text)] transition-colors"
            >
              <ArrowLeft size={12} />
              All posts
            </Link>
          </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border border-[var(--border)] text-[var(--text-subtle)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1
          className="font-display font-black tracking-tighter text-[var(--text)] leading-[0.95] mb-8"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
        >
          {post.title}
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl mx-auto mb-8">
          {post.description}
        </p>

        {/* Meta row */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[var(--text-subtle)] font-mono mb-8">
          <span className="flex items-center gap-1.5">
            <Calendar size={11} />
            {formatDate(post.date)}
          </span>
          <span className="text-[var(--border)]">·</span>
          <span className="flex items-center gap-1.5">
            <Clock size={11} />
            {post.readingTime} min read
          </span>
          <span className="text-[var(--border)]">·</span>
          <span>By Kienhee</span>
        </div>

        {/* Actions */}
        <div className="flex justify-center">
          <PostActions slug={post.slug} title={post.title} />
        </div>
      </div>

      {/* ─── Hero image ─────────────────────────────────────── */}
      {post.image && (
        <div className="px-6 md:px-12">
          <div
            className="max-w-4xl mx-auto overflow-hidden rounded-xl border border-[var(--border)]"
            style={{ maxHeight: "560px", aspectRatio: "21/8" }}
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      )}

      {/* ─── Article body ───────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-16 pb-24">
        <div className="grid lg:grid-cols-[1fr_200px] gap-16">

          {/* Content column */}
          <div className="max-w-2xl">
            <PostContent content={post.content} />

            {/* Divider */}
            <hr className="border-[var(--border)] my-12" />

            {/* Bottom actions */}
            <div className="flex items-center justify-between flex-wrap gap-4 mb-12">
              <span className="font-mono text-sm text-[var(--text-subtle)] tracking-widest uppercase">
                Was this helpful?
              </span>
              <PostActions slug={post.slug} title={post.title} />
            </div>

            {/* Author card */}
            <div className="flex items-start gap-4 p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] mb-8">
              <div className="w-12 h-12 rounded-full bg-[var(--bg-surface-2)] border border-[var(--border)] flex items-center justify-center font-display font-black text-lg text-[var(--text)] shrink-0">
                K
              </div>
              <div>
                <p className="font-display font-bold text-sm text-[var(--text)] mb-1">Kienhee</p>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-3">
                  Software engineer writing about the web, developer tools, and building in public.
                </p>
                <div className="flex items-center gap-4">
                  <a
                    href="https://twitter.com/kienhee"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-subtle)] hover:text-[var(--text)] transition-colors"
                  >
                    Twitter
                  </a>
                  <a
                    href="https://github.com/kienhee"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-subtle)] hover:text-[var(--text)] transition-colors"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)]">
              <h3 className="font-display font-bold text-base text-[var(--text)] mb-1.5">
                Enjoyed this post?
              </h3>
              <p className="text-sm text-[var(--text-muted)] mb-4">
                Subscribe to get new articles straight to your inbox.
              </p>
              <NewsletterForm />
            </div>
          </div>

          {/* Sticky TOC sidebar */}
          {toc.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-20">
                <TOC items={toc} />
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
    </ViewTransition>
  );
}

import { ViewTransition } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, Calendar, ArrowLeft, ArrowRight } from "lucide-react";
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
  const currentIndex = POSTS.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? POSTS[currentIndex - 1] : null;
  const nextPost = currentIndex < POSTS.length - 1 ? POSTS[currentIndex + 1] : null;

  return (
    <ViewTransition
      enter={{ "nav-forward": "slide-from-right", default: "none" }}
      exit={{ "nav-back": "slide-to-right", default: "none" }}
      default="none"
    >
      <div className="pt-14">

        {/* ─── Header ─────────────────────────────────────────── */}
        <div className="px-4 sm:px-6 md:px-10 lg:px-12 pt-12 sm:pt-14 md:pt-16 pb-8 sm:pb-10 max-w-5xl mx-auto text-center">
          {/* Title */}
          <h1
            className="font-display font-black tracking-tighter text-[var(--text)] leading-[0.95] mb-6 sm:mb-8"
            style={{ fontSize: "clamp(2rem, 6.4vw, 5.5rem)" }}
          >
            {post.title}
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-[var(--text-muted)] leading-relaxed max-w-3xl mx-auto mb-6 sm:mb-8">
            {post.description}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 text-xs sm:text-sm text-[var(--text-subtle)] font-mono mb-6 sm:mb-8">
            <span className="flex items-center gap-1.5">
              <Calendar size={11} />
              {formatDate(post.date)}
            </span>
            <span className="text-[var(--border)] hidden sm:inline">·</span>
            <span className="flex items-center gap-1.5">
              <Clock size={11} />
              {post.readingTime} min read
            </span>
            <span className="text-[var(--border)] hidden sm:inline">·</span>
            <span>By Kienhee</span>
          </div>
        </div>

        {/* ─── Hero image ─────────────────────────────────────── */}
        {post.image && (
          <div className="px-0 sm:px-4 md:px-10 lg:px-12">
            <div
              className="max-w-6xl mx-auto overflow-hidden sm:rounded-2xl border-y sm:border border-[var(--border)] aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] lg:aspect-[2/1] max-h-[820px]"
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pt-10 sm:pt-14 md:pt-16 pb-20 sm:pb-24">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_220px] gap-10 sm:gap-12 md:gap-16">

            {/* Content column */}
            <div className="max-w-2xl min-w-0">
              <PostContent content={post.content} />

              {/* Tags at end */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-8 sm:mt-10">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] tracking-widest uppercase px-2.5 sm:px-3 py-1 rounded-full border border-[var(--border)] text-[var(--text-subtle)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Prev / Next navigation */}
              <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-[var(--border)] grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {prevPost ? (
                  <Link
                    href={`/blog/${prevPost.slug}`}
                    transitionTypes={["nav-back"]}
                    className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-4 hover:border-[var(--text-muted)] transition-colors min-w-0"
                  >
                    <p className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase text-[var(--text-subtle)] mb-2">
                      <ArrowLeft size={12} />
                      Prev
                    </p>
                    <p className="text-sm text-[var(--text)] leading-snug line-clamp-2">{prevPost.title}</p>
                  </Link>
                ) : (
                  <div />
                )}

                {nextPost ? (
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    transitionTypes={["nav-forward"]}
                    className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-4 hover:border-[var(--text-muted)] transition-colors min-w-0 sm:text-right"
                  >
                    <p className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase text-[var(--text-subtle)] mb-2 sm:justify-end">
                      Next
                      <ArrowRight size={12} />
                    </p>
                    <p className="text-sm text-[var(--text)] leading-snug line-clamp-2">{nextPost.title}</p>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
              {/* Divider */}
              <hr className="border-[var(--border)] my-10 sm:my-12" />

              {/* Bottom actions */}
              <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-4 mb-10 sm:mb-12">
                <span className="font-mono text-xs sm:text-sm text-[var(--text-subtle)] tracking-widest uppercase">
                  Was this helpful?
                </span>
                <PostActions slug={post.slug} title={post.title} />
              </div>

              {/* Author card */}
              <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] mb-8">
                <div className="w-12 h-12 rounded-full bg-[var(--bg-surface-2)] border border-[var(--border)] flex items-center justify-center font-display font-black text-lg text-[var(--text)] shrink-0">
                  K
                </div>
                <div className="min-w-0">
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
              <div className="p-5 sm:p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)]">
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

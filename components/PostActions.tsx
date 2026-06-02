"use client";

import { useState, useEffect, useRef } from "react";
import { CheckIcon, ThumbsUpIcon, ThumbsDownIcon, ShareIcon } from "@animateicons/react/lucide";
import type { ThumbsUpIconHandle, ThumbsDownIconHandle, ShareIconHandle, CheckIconHandle } from "@animateicons/react/lucide";

interface PostActionsProps {
  slug: string;
  title: string;
}

type Vote = "like" | "dislike" | null;

export function PostActions({ slug, title }: PostActionsProps) {
  const [vote, setVote] = useState<Vote>(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  const likeRef = useRef<ThumbsUpIconHandle>(null);
  const dislikeRef = useRef<ThumbsDownIconHandle>(null);
  const shareRef = useRef<ShareIconHandle>(null);
  const checkRef = useRef<CheckIconHandle>(null);

  useEffect(() => {
    const seed = slug.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
    setLikes(40 + (seed % 60));
    setDislikes(2 + (seed % 8));
    try {
      const saved = localStorage.getItem(`vote:${slug}`) as Vote;
      if (saved) setVote(saved);
    } catch {}
    setMounted(true);
  }, [slug]);

  function handleVote(next: Vote) {
    if (!mounted) return;

    setLikes((prev) => {
      if (vote === "like" && next !== "like") return prev - 1;
      if (vote !== "like" && next === "like") return prev + 1;
      return prev;
    });
    setDislikes((prev) => {
      if (vote === "dislike" && next !== "dislike") return prev - 1;
      if (vote !== "dislike" && next === "dislike") return prev + 1;
      return prev;
    });

    const newVote: Vote = vote === next ? null : next;
    setVote(newVote);

    if (next === "like") likeRef.current?.startAnimation();
    else if (next === "dislike") dislikeRef.current?.startAnimation();

    try {
      if (newVote) localStorage.setItem(`vote:${slug}`, newVote);
      else localStorage.removeItem(`vote:${slug}`);
    } catch {}
  }

  async function handleShare() {
    shareRef.current?.startAnimation();
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title, url }); return; } catch {}
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => { setCopied(false); }, 2000);
    } catch {}
  }

  if (!mounted) return null;

  const currentColor = "currentColor";

  return (
    <div className="flex items-center gap-3">
      {/* Like */}
      <button
        onClick={() => handleVote("like")}
        onMouseEnter={() => likeRef.current?.startAnimation()}
        aria-label="Like"
        className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono tracking-wide transition-all duration-200 ${
          vote === "like"
            ? "bg-[var(--text)] text-[var(--bg)] border-[var(--text)]"
            : "border-[var(--border)] text-[var(--text-subtle)] hover:border-[var(--text-muted)] hover:text-[var(--text)]"
        }`}
      >
        <ThumbsUpIcon ref={likeRef} size={14} color={currentColor} />
        <span>{likes}</span>
      </button>

      {/* Dislike */}
      <button
        onClick={() => handleVote("dislike")}
        onMouseEnter={() => dislikeRef.current?.startAnimation()}
        aria-label="Dislike"
        className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono tracking-wide transition-all duration-200 ${
          vote === "dislike"
            ? "bg-[var(--text)] text-[var(--bg)] border-[var(--text)]"
            : "border-[var(--border)] text-[var(--text-subtle)] hover:border-[var(--text-muted)] hover:text-[var(--text)]"
        }`}
      >
        <ThumbsDownIcon ref={dislikeRef} size={14} color={currentColor} />
        <span>{dislikes}</span>
      </button>

      <div className="w-px h-5 bg-[var(--border)]" />

      {/* Share */}
      <button
        onClick={handleShare}
        onMouseEnter={() => shareRef.current?.startAnimation()}
        aria-label="Share"
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] text-xs font-mono tracking-wide text-[var(--text-subtle)] hover:border-[var(--text-muted)] hover:text-[var(--text)] transition-all duration-200"
      >
        {copied ? (
          <>
            <CheckIcon ref={checkRef} size={14} color="rgb(52 211 153)" />
            <span className="text-emerald-400">Copied!</span>
          </>
        ) : (
          <>
            <ShareIcon ref={shareRef} size={14} color={currentColor} />
            <span>Share</span>
          </>
        )}
      </button>
    </div>
  );
}

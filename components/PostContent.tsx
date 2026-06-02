"use client";

import { useEffect } from "react";

interface PostContentProps {
  content: string;
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-");
}

function renderMarkdown(content: string): string {
  return content
    .split("\n")
    .map((line) => {
      // H2
      if (line.startsWith("## ")) {
        const text = line.slice(3);
        const id = slugifyHeading(text);
        return `<h2 id="${id}">${text}</h2>`;
      }
      // H3
      if (line.startsWith("### ")) {
        const text = line.slice(4);
        const id = slugifyHeading(text);
        return `<h3 id="${id}">${text}</h3>`;
      }
      // Code blocks (pass through)
      return line;
    })
    .join("\n")
    .replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
      const escaped = code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      return `<pre><code class="language-${lang || "text"}">${escaped}</code></pre>`;
    })
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>[\s\S]+?<\/li>)/g, "<ul>$1</ul>")
    .replace(/<\/ul>\s*<ul>/g, "")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .split("\n\n")
    .map((block) => {
      if (
        block.startsWith("<h") ||
        block.startsWith("<pre") ||
        block.startsWith("<ul") ||
        block.startsWith("<blockquote") ||
        block.trim() === ""
      ) {
        return block;
      }
      return `<p>${block}</p>`;
    })
    .join("\n");
}

export function PostContent({ content }: PostContentProps) {
  return (
    <div
      className="prose"
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
    />
  );
}

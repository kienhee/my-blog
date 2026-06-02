# kienhee.com — Project Context

> Resume file cho conversation tiếp theo. Tạo lúc: 2026-06-02

---

## Stack

- **Framework:** Next.js 16.2.6 (App Router, Turbopack)
- **UI:** React 19 + Tailwind CSS v4
- **Language:** TypeScript
- **Package manager:** pnpm
- **Fonts:** Archivo (display/headings) + Space Grotesk (body) — Google Fonts via `next/font`
- **Icons:** lucide-react v1.17 (GitHub/Twitter bị xóa → dùng custom SVG trong `components/icons.tsx`)
- **Dark mode:** Custom ThemeProvider (không dùng next-themes vì script warning với React 19)
- **Dev server:** `pnpm dev` → http://localhost:3000

---

## Tính năng đã build

| Trang | Mô tả |
|---|---|
| **Home** (`/`) | Full-viewport hero với massive typography (`clamp(4.5rem → 15rem)`), marquee ticker, numbered editorial post list, project cards, about snippet, newsletter |
| **Blog** (`/blog`) | Magazine header với massive "BLOG" title, live search + tag filter (client-side), editorial numbered list |
| **Blog Post** (`/blog/[slug]`) | Sticky TOC sidebar (Intersection Observer), reading time, author card, newsletter |
| **Projects** (`/projects`) | Card grid với ảnh (16:10 ratio), hover overlay hiện description + links |
| **About** (`/about`) | Career timeline, tech stack grid, social links, newsletter, "Work with me" card |

---

## Design System

### Màu (CSS custom properties)
```css
/* Dark mode (default) */
--bg: #050505
--bg-surface: #0d0d0d
--bg-surface-2: #141414
--border: #1f1f1f
--text: #f5f5f5
--text-muted: #a1a1aa
--text-subtle: #3f3f46

/* Light mode */
--bg: #fafafa
--bg-surface: #ffffff
--border: #e4e4e7
--text: #09090b
--text-muted: #52525b
```

### Dark mode
- Class-based: `.dark` trên `<html>` element
- Anti-FOUC: `<Script id="theme-init" strategy="beforeInteractive">` trong `layout.tsx` (đọc localStorage trước khi hydrate)
- Custom `useTheme` hook từ `@/components/ThemeProvider` (KHÔNG import từ `next-themes`)
- Toggle: Sun/Moon icon trong Navbar

### Awwwards-level visuals
- **Grain texture:** `body::before` SVG noise, opacity 2.8%
- **Custom cursor:** Dual cursor (dot 8px + ring 40px), `mix-blend-mode: difference`, lerp animation
- **Marquee:** CSS `@keyframes marquee`, 2 belts (tech stack + large background text)
- **Scroll reveal:** `AnimateIn` component dùng Intersection Observer
- **Logo collapse:** "Kienhee" → "K." khi scroll (CSS max-width + opacity transition)

---

## Cấu trúc file

```
app/
  globals.css              ← design tokens, grain, marquee keyframes, prose
  layout.tsx               ← fonts, metadata, ThemeProvider, CustomCursor, Script anti-FOUC
  page.tsx                 ← Home page
  about/page.tsx
  blog/
    page.tsx
    [slug]/page.tsx
  projects/page.tsx

components/
  ThemeProvider.tsx        ← Custom (không dùng next-themes), export useTheme
  Navbar.tsx               ← Logo collapse K., dark toggle, monospace nav links
  Footer.tsx               ← Editorial layout, social links
  CustomCursor.tsx         ← Dual cursor với mix-blend-mode difference
  MarqueeText.tsx          ← CSS marquee ticker
  AnimateIn.tsx            ← Scroll reveal (Intersection Observer)
  PostCard.tsx             ← Editorial list row (không phải card grid)
  ProjectCard.tsx          ← Card với ảnh 16:10, hover overlay, gradient placeholder
  BlogClient.tsx           ← Client: search + tag filter
  PostContent.tsx          ← Markdown renderer (dangerouslySetInnerHTML)
  TOC.tsx                  ← Table of contents (Intersection Observer highlight)
  NewsletterForm.tsx       ← Email form với loading/success state
  icons.tsx                ← GitHubIcon, XIcon (SVG inline vì lucide-react v1.17 đã xóa brand icons)

lib/
  posts.ts                 ← Mock data (6 posts) + helpers
  projects.ts              ← Mock data (6 projects) + image field
  utils.ts                 ← readingTime, formatDate, extractToc, cn

public/
  projects/               ← Upload ảnh project vào đây
    kienhee-com.png        (chưa có — hiện dùng gradient placeholder)
    devkit-cli.png
    readwise-to-notion.png
    type-safe-env.png
    aicommit.png
    logboard.png
```

---

## Mock data

### Blog posts (6 bài)
1. `react-server-components-2026` — React, Next.js, Architecture — 8 min — **featured**
2. `nextjs-16-drizzle-orm` — Next.js, Database, TypeScript — 11 min — **featured**
3. `hidden-cost-of-over-engineering` — Engineering, Productivity — 6 min — **featured**
4. `zero-to-production-vercel` — DevOps, Vercel — 7 min
5. `cursor-vs-vscode` — Tools, AI — 5 min
6. `typescript-tricks-senior-dev` — TypeScript — 9 min

### Projects (6 cái)
1. `kienhee-com` — kienhee.com (Next.js, TypeScript, Tailwind) — **live, featured**
2. `devkit-cli` — CLI scaffold Next.js apps — **live, featured**
3. `readwise-to-notion` — Cloudflare Workers automation — **live, featured**
4. `type-safe-env` — Zod env validation library — **live**
5. `aicommit` — AI git commit messages — **live**
6. `logboard` — Self-hosted analytics — **wip**

---

## Còn cần làm (potential TODOs)

- [ ] Upload ảnh thật vào `public/projects/` (16:10 ratio, ~1600×1000px)
- [ ] Thêm avatar/photo cho About page
- [ ] Kết nối newsletter form với service thật (Resend, ConvertKit...)
- [ ] RSS feed (`app/rss.xml/route.ts`)
- [ ] Thêm bài viết thật (MDX hoặc tiếp tục mock)
- [ ] Deploy lên Vercel
- [ ] Thêm domain kienhee.com

---

## Lỗi đã fix

| Lỗi | Fix |
|---|---|
| `Export Github doesn't exist` | lucide-react v1.17 xóa brand icons → tạo `components/icons.tsx` với SVG inline |
| `ThemeProvider script warning` | next-themes inject `<script>` trong component tree → viết custom ThemeProvider + dùng `next/script strategy="beforeInteractive"` |
| `scroll-behavior: smooth` warning | Thêm `data-scroll-behavior="smooth"` vào `<html>` |

---

## Lệnh hữu ích

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm tsc --noEmit # Type check
```

---

## Ghi chú quan trọng

- `useTheme` phải import từ `@/components/ThemeProvider`, KHÔNG từ `next-themes`
- Tailwind v4: dark mode config bằng `@custom-variant dark (&:is(.dark, .dark *));` trong globals.css
- `font-display` class = Archivo, `font-body` class = Space Grotesk (defined trong `@theme inline`)
- Project images: đặt vào `public/projects/<slug>.png`, field `image` trong `lib/projects.ts`

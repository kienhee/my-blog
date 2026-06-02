export type ModuleTab = "list" | "trash";
export type PostStatus = "draft" | "public" | "scheduled";

export interface TaxonomyItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  deletedAt: string | null;
}

export interface PostItem {
  id: string;
  cover: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  status: PostStatus;
  hashtagIds: string[];
  categoryIds: string[];
  deletedAt: string | null;
}

export const MOCK_HASHTAGS: TaxonomyItem[] = [
  {
    id: "tag-1",
    title: "Next.js",
    slug: "nextjs",
    description: "Articles and guides about Next.js.",
    deletedAt: null,
  },
  {
    id: "tag-2",
    title: "TypeScript",
    slug: "typescript",
    description: "TypeScript tips and architecture patterns.",
    deletedAt: null,
  },
  {
    id: "tag-3",
    title: "DevOps",
    slug: "devops",
    description: "Deployment and infrastructure topics.",
    deletedAt: "2026-06-01",
  },
];

export const MOCK_CATEGORIES: TaxonomyItem[] = [
  {
    id: "cat-1",
    title: "Frontend",
    slug: "frontend",
    description: "Frontend engineering practices.",
    deletedAt: null,
  },
  {
    id: "cat-2",
    title: "Backend",
    slug: "backend",
    description: "Backend and API engineering.",
    deletedAt: null,
  },
  {
    id: "cat-3",
    title: "Productivity",
    slug: "productivity",
    description: "Workflows and developer productivity.",
    deletedAt: "2026-05-28",
  },
];

export const MOCK_POSTS: PostItem[] = [
  {
    id: "post-1",
    cover: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=600&q=80",
    title: "Understanding React Server Components in 2026",
    slug: "react-server-components-2026",
    description: "A practical guide to RSC architecture and boundaries.",
    content: "Long content for post 1...",
    status: "public",
    hashtagIds: ["tag-1", "tag-2"],
    categoryIds: ["cat-1"],
    deletedAt: null,
  },
  {
    id: "post-2",
    cover: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    title: "Type-safe API Design Patterns",
    slug: "typesafe-api-design-patterns",
    description: "Design APIs with long-term maintainability.",
    content: "Long content for post 2...",
    status: "draft",
    hashtagIds: ["tag-2"],
    categoryIds: ["cat-2", "cat-3"],
    deletedAt: null,
  },
  {
    id: "post-3",
    cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    title: "Shipping with Vercel in 10 Minutes",
    slug: "shipping-with-vercel",
    description: "Deployment checklist for fast releases.",
    content: "Long content for post 3...",
    status: "scheduled",
    hashtagIds: ["tag-1", "tag-3"],
    categoryIds: ["cat-2"],
    deletedAt: "2026-05-30",
  },
];

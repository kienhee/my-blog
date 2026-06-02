export type ContentStatus = "draft" | "published" | "archived";

export interface DashboardPost {
  id: string;
  title: string;
  status: ContentStatus;
  author: string;
  updatedAt: string;
}

export interface DashboardProject {
  id: string;
  name: string;
  status: ContentStatus;
  owner: string;
  updatedAt: string;
}

export interface DashboardActivity {
  id: string;
  action: string;
  actor: string;
  target: string;
  timestamp: string;
}

export interface MockProfile {
  username: string;
  email: string;
  address: string;
  avatar: string;
  bio: string;
}

export const DASHBOARD_STATS = [
  { id: "posts", label: "Posts", value: 24 },
  { id: "projects", label: "Projects", value: 9 },
  { id: "media", label: "Media Assets", value: 132 },
  { id: "users", label: "Users", value: 5 },
];

export const MOCK_DASHBOARD_POSTS: DashboardPost[] = [
  {
    id: "post-1",
    title: "Understanding React Server Components in 2026",
    status: "published",
    author: "Kienhee",
    updatedAt: "2026-06-01",
  },
  {
    id: "post-2",
    title: "Fixing Core Web Vitals for Next.js Apps",
    status: "draft",
    author: "Kienhee",
    updatedAt: "2026-05-30",
  },
  {
    id: "post-3",
    title: "Node.js vs Bun in 2026",
    status: "archived",
    author: "Kienhee",
    updatedAt: "2026-05-26",
  },
];

export const MOCK_DASHBOARD_PROJECTS: DashboardProject[] = [
  {
    id: "project-1",
    name: "kienhee.com",
    status: "published",
    owner: "Kienhee",
    updatedAt: "2026-06-01",
  },
  {
    id: "project-2",
    name: "devkit-cli",
    status: "draft",
    owner: "Kienhee",
    updatedAt: "2026-05-28",
  },
  {
    id: "project-3",
    name: "logboard",
    status: "draft",
    owner: "Kienhee",
    updatedAt: "2026-05-25",
  },
];

export const MOCK_DASHBOARD_ACTIVITY: DashboardActivity[] = [
  {
    id: "act-1",
    action: "Updated",
    actor: "Kienhee",
    target: "Post: React Server Components",
    timestamp: "2 hours ago",
  },
  {
    id: "act-2",
    action: "Created",
    actor: "Kienhee",
    target: "Project: logboard",
    timestamp: "Yesterday",
  },
  {
    id: "act-3",
    action: "Uploaded",
    actor: "Kienhee",
    target: "12 media files",
    timestamp: "2 days ago",
  },
];

export const MOCK_PROFILE: MockProfile = {
  username: "kienhee",
  email: "hi@kienhee.com",
  address: "Ho Chi Minh City, Vietnam",
  avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
  bio: "Software engineer writing about web architecture, developer tools, and building in public.",
};

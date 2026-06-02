 "use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  FolderKanban,
  Settings,
  UserCircle2,
  ChevronUp,
  KeyRound,
  LogOut,
  Tags,
  FolderTree,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

const DASHBOARD_LINK_GROUPS = [
  {
    title: "Core",
    links: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "Content",
    links: [
      { href: "/dashboard/posts", label: "Posts", icon: FileText },
      { href: "/dashboard/hashtags", label: "Hashtags", icon: Tags },
      { href: "/dashboard/categories", label: "Categories", icon: FolderTree },
      { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
    ],
  },
  {
    title: "System",
    links: [
      { href: "/dashboard/users", label: "Users", icon: Users },
      { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ],
  },
];

interface DashboardShellProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function DashboardShell({ title, description, actions, children }: DashboardShellProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Mobile top bar */}
      <header className="lg:hidden sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-xl">
        <div className="h-14 px-4 flex items-center justify-between">
          <p className="font-display text-xl font-black tracking-tight text-[var(--text)]">CMS</p>
          <button
            type="button"
            aria-label={menuOpen ? "Close dashboard menu" : "Open dashboard menu"}
            onClick={() => setMenuOpen((v) => !v)}
            className="p-2 rounded-md border border-[var(--border)] text-[var(--text-subtle)] hover:text-[var(--text)] transition-colors"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </header>

      <div className="grid lg:grid-cols-[260px_minmax(0,1fr)]">
        {/* Sidebar desktop */}
        <aside className="hidden lg:flex lg:sticky lg:top-0 lg:h-screen flex-col border-r border-[var(--border)] bg-[var(--bg-surface)]">
          <div className="px-5 py-5 border-b border-[var(--border)]">
            <p className="font-display text-2xl font-black tracking-tight text-[var(--text)]">Kienhee CMS</p>
            <p className="mt-1 font-mono text-[10px] tracking-widest uppercase text-[var(--text-subtle)]">Content Workspace</p>
          </div>

          <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
            {DASHBOARD_LINK_GROUPS.map((group) => (
              <div key={group.title}>
                <p className="px-2 mb-1.5 font-mono text-[10px] tracking-widest uppercase text-[var(--text-subtle)]">{group.title}</p>
                <div className="space-y-1.5">
                  {group.links.map(({ href, label, icon: Icon }) => {
                    const active = href === "/dashboard" ? pathname === href : pathname.startsWith(href);
                    return (
                      <Link
                        key={href}
                        href={href}
                        className={cn(
                          "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-colors",
                          active
                            ? "bg-[var(--bg)] text-[var(--text)] border border-[var(--border)]"
                            : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-surface-2)]",
                        )}
                      >
                        <Icon size={15} />
                        {label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="p-4 border-t border-[var(--border)] relative">
            <button
              type="button"
              onClick={() => setProfileMenuOpen((v) => !v)}
              aria-expanded={profileMenuOpen}
              aria-label="Open profile menu"
              className="w-full flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2.5 hover:border-[var(--text-subtle)] transition-colors"
            >
              <div className="w-8 h-8 rounded-full border border-[var(--border)] bg-[var(--bg-surface-2)] flex items-center justify-center font-display font-black text-sm text-[var(--text)]">
                K
              </div>
              <div className="min-w-0 flex-1 text-left">
                <p className="text-sm text-[var(--text)] truncate">Kienhee</p>
                <p className="text-xs text-[var(--text-subtle)] truncate">Administrator</p>
              </div>
              <ChevronUp
                size={14}
                className={cn("text-[var(--text-subtle)] transition-transform", profileMenuOpen ? "rotate-0" : "rotate-180")}
              />
            </button>

            {profileMenuOpen ? (
              <div className="absolute bottom-[calc(100%+8px)] left-4 right-4 rounded-lg border border-[var(--border)] bg-[var(--bg)] p-1.5 shadow-2xl z-20">
                <Link
                  href="/dashboard/profile"
                  onClick={() => setProfileMenuOpen(false)}
                  className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-surface-2)] transition-colors"
                >
                  <UserCircle2 size={14} />
                  Profile
                </Link>
                <Link
                  href="/dashboard/profile?tab=password"
                  onClick={() => setProfileMenuOpen(false)}
                  className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-surface-2)] transition-colors"
                >
                  <KeyRound size={14} />
                  Change Password
                </Link>
                <Link
                  href="/auth/login"
                  onClick={() => setProfileMenuOpen(false)}
                  className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-400 hover:bg-[var(--bg-surface-2)] transition-colors"
                >
                  <LogOut size={14} />
                  Logout
                </Link>
              </div>
            ) : null}
          </div>
        </aside>

        {/* Sidebar mobile drawer */}
        {menuOpen ? (
          <div className="lg:hidden fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black/40"
              aria-hidden="true"
              onClick={() => setMenuOpen(false)}
            />
            <aside className="absolute left-0 top-0 h-full w-[82vw] max-w-[320px] border-r border-[var(--border)] bg-[var(--bg-surface)] flex flex-col">
              <div className="px-5 py-5 border-b border-[var(--border)]">
                <p className="font-display text-2xl font-black tracking-tight text-[var(--text)]">Kienhee CMS</p>
              </div>
              <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
                {DASHBOARD_LINK_GROUPS.map((group) => (
                  <div key={group.title}>
                    <p className="px-2 mb-1.5 font-mono text-[10px] tracking-widest uppercase text-[var(--text-subtle)]">{group.title}</p>
                    <div className="space-y-1.5">
                      {group.links.map(({ href, label, icon: Icon }) => {
                        const active = href === "/dashboard" ? pathname === href : pathname.startsWith(href);
                        return (
                          <Link
                            key={href}
                            href={href}
                            onClick={() => setMenuOpen(false)}
                            className={cn(
                              "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-colors",
                              active
                                ? "bg-[var(--bg)] text-[var(--text)] border border-[var(--border)]"
                                : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-surface-2)]",
                            )}
                          >
                            <Icon size={15} />
                            {label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </nav>
              <div className="p-4 border-t border-[var(--border)]">
                <div className="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2.5">
                  <div className="w-8 h-8 rounded-full border border-[var(--border)] bg-[var(--bg-surface-2)] flex items-center justify-center font-display font-black text-sm text-[var(--text)]">
                    K
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-[var(--text)] truncate">Kienhee</p>
                    <p className="text-xs text-[var(--text-subtle)] truncate">Administrator</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        ) : null}

        {/* Main */}
        <section className="min-w-0 px-4 sm:px-6 md:px-10 py-6 sm:py-8">
          <header className="mb-6 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-[var(--text)]">{title}</h1>
              {description ? <p className="mt-2 text-sm sm:text-base text-[var(--text-muted)]">{description}</p> : null}
            </div>
            {actions ? <div className="shrink-0">{actions}</div> : null}
          </header>
          {children}
        </section>
      </div>
    </div>
  );
}

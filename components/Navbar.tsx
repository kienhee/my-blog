"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { SunIcon, MoonIcon } from "@animateicons/react/lucide";
import type { SunIconHandle, MoonIconHandle } from "@animateicons/react/lucide";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const { setTheme, resolvedTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const sunRef = useRef<SunIconHandle>(null);
  const moonRef = useRef<MoonIconHandle>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isDark = resolvedTheme === "dark";

  function handleThemeToggle() {
    if (isDark) sunRef.current?.startAnimation();
    else moonRef.current?.startAnimation();
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="px-6 md:px-12 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Kienhee — Home"
          className="font-display font-black tracking-tighter text-[var(--text)] flex items-baseline overflow-hidden"
          style={{ fontSize: "1.5rem", lineHeight: 1 }}
        >
          <span>K</span>
          <span
            style={{
              maxWidth: scrolled ? "0" : "6.5rem",
              opacity: scrolled ? 0 : 1,
              overflow: "hidden",
              display: "inline-block",
              transition: "max-width 400ms cubic-bezier(0.4,0,0.2,1), opacity 250ms ease",
              whiteSpace: "nowrap",
            }}
          >
            ienhee.
          </span>
          <span
            style={{
              opacity: scrolled ? 1 : 0,
              transform: scrolled ? "translateX(0)" : "translateX(-6px)",
              transition: "opacity 250ms ease 100ms, transform 300ms ease",
              display: "inline-block",
            }}
          >
            .
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-0">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`px-4 py-1.5 text-xs font-mono tracking-widest uppercase transition-colors duration-150 ${
                  isActive
                    ? "text-[var(--text)]"
                    : "text-[var(--text-subtle)] hover:text-[var(--text-muted)]"
                }`}
              >
                {label}
              </Link>
            );
          })}

          {mounted && (
            <button
              onClick={handleThemeToggle}
              onMouseEnter={() => isDark ? sunRef.current?.startAnimation() : moonRef.current?.startAnimation()}
              aria-label="Toggle theme"
              className="ml-4 p-2 text-[var(--text-subtle)] hover:text-[var(--text)] transition-colors"
            >
              {isDark
                ? <SunIcon ref={sunRef} size={15} color="currentColor" />
                : <MoonIcon ref={moonRef} size={15} color="currentColor" />
              }
            </button>
          )}
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          {mounted && (
            <button
              onClick={handleThemeToggle}
              onMouseEnter={() => isDark ? sunRef.current?.startAnimation() : moonRef.current?.startAnimation()}
              aria-label="Toggle theme"
              className="p-2 text-[var(--text-subtle)] hover:text-[var(--text)] transition-colors"
            >
              {isDark
                ? <SunIcon ref={sunRef} size={15} color="currentColor" />
                : <MoonIcon ref={moonRef} size={15} color="currentColor" />
              }
            </button>
          )}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="p-2 text-[var(--text-subtle)] hover:text-[var(--text)] transition-colors"
          >
            <span className="flex flex-col gap-[5px] w-5">
              <span className={`block h-px bg-current origin-center transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block h-px bg-current origin-center transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-56" : "max-h-0"
        } border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-xl`}
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`font-mono text-xs tracking-widest uppercase transition-colors ${
                  isActive ? "text-[var(--text)]" : "text-[var(--text-subtle)] hover:text-[var(--text-muted)]"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}

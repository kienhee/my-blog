import Link from "next/link";
import { Rss, Mail, ArrowUpRight } from "lucide-react";
import { GitHubIcon, XIcon } from "@/components/icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)]">
      <div className="px-6 md:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="font-display font-black tracking-tighter text-[var(--text)] text-2xl block mb-3"
            >
              Kienhee
            </Link>
            <p className="text-sm text-[var(--text-subtle)] leading-relaxed max-w-[14rem]">
              Software engineer &amp; writer based in Vietnam. Building things on the web.
            </p>
          </div>

          {/* Pages */}
          <div>
            <span className="font-mono text-[9px] tracking-widest uppercase text-[var(--text-subtle)] mb-4 block">
              Pages
            </span>
            <div className="flex flex-col gap-2.5">
              {[
                { href: "/blog", label: "Blog" },
                { href: "/projects", label: "Projects" },
                { href: "/about", label: "About" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <span className="font-mono text-[9px] tracking-widest uppercase text-[var(--text-subtle)] mb-4 block">
              Connect
            </span>
            <div className="flex flex-col gap-2.5">
              {[
                { href: "https://github.com/kienhee", label: "GitHub", Icon: GitHubIcon },
                { href: "https://twitter.com/kienhee", label: "Twitter / X", Icon: XIcon },
                { href: "mailto:hi@kienhee.com", label: "Email", Icon: Mail },
                { href: "/rss.xml", label: "RSS Feed", Icon: Rss },
              ].map(({ href, label, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                >
                  <Icon size={11} />
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <span className="font-mono text-[9px] tracking-widest uppercase text-[var(--text-subtle)] mb-4 block">
              Hire me
            </span>
            <p className="text-sm text-[var(--text-subtle)] leading-relaxed mb-4">
              Available for consulting on Next.js, full-stack architecture &amp; technical writing.
            </p>
            <a
              href="mailto:hi@kienhee.com"
              className="group flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            >
              Get in touch
              <ArrowUpRight size={10} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-subtle)]">
            © {year} Kienhee. All rights reserved.
          </p>
          <p className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-subtle)]">
            Built with{" "}
            <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-muted)] transition-colors">
              Next.js
            </a>
            {" "}+{" "}
            <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-muted)] transition-colors">
              Tailwind
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Component,
  Database,
  CheckSquare,
  Wrench,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { SHOWCASE_CATALOG } from "../data/showcase-catalog";

interface ShowcaseSidebarProps {
  onCloseMobile?: () => void;
}

export const SHOWCASE_NAV_ITEMS = [
  {
    title: "Overview",
    href: "/showcase",
    icon: LayoutDashboard,
    badge: "Hub",
  },
  {
    title: "UI Components",
    href: "/showcase/components",
    icon: Component,
    count: SHOWCASE_CATALOG.filter((i) => i.category === "components").length,
  },
  {
    title: "Data & API",
    href: "/showcase/api",
    icon: Database,
    count: SHOWCASE_CATALOG.filter((i) => i.category === "api").length,
  },
  {
    title: "Forms & Validation",
    href: "/showcase/forms",
    icon: CheckSquare,
    count: SHOWCASE_CATALOG.filter((i) => i.category === "forms").length,
  },
  {
    title: "Developer Tools",
    href: "/showcase/developer-tools",
    icon: Wrench,
    count: SHOWCASE_CATALOG.filter((i) => i.category === "developer-tools")
      .length,
  },
];

export function ShowcaseSidebar({ onCloseMobile }: ShowcaseSidebarProps) {
  const pathname = usePathname();

  const handleNavClick = () => {
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <aside className="flex h-full w-full flex-col justify-between border-r border-zinc-200/80 bg-white/70 p-4 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/70">
      <div className="space-y-6">
        {/* Brand / Title Header */}
        <div className="flex items-center justify-between px-2">
          <Link
            href="/showcase"
            onClick={handleNavClick}
            className="flex items-center gap-2.5 transition hover:opacity-80"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-tr from-indigo-600 to-cyan-500 shadow-xs">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Starter Playground
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                Developer Portal v1.0
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Categories */}
        <nav className="space-y-1.5" aria-label="Showcase Navigation">
          <div className="px-2.5 pb-1 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Kategori Dokumentasi
          </div>
          {SHOWCASE_NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/showcase"
                ? pathname === "/showcase"
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-xs shadow-indigo-500/25 dark:bg-indigo-600"
                    : "text-zinc-600 hover:bg-zinc-100/80 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`h-4 w-4 ${
                      isActive
                        ? "text-white"
                        : "text-zinc-400 group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-300"
                    }`}
                  />
                  <span>{item.title}</span>
                </div>
                {item.count !== undefined ? (
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                    }`}
                  >
                    {item.count}
                  </span>
                ) : item.badge ? (
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    }`}
                  >
                    {item.badge}
                  </span>
                ) : (
                  <ChevronRight
                    className={`h-4 w-4 opacity-0 transition group-hover:opacity-100 ${
                      isActive ? "text-white opacity-100" : "text-zinc-400"
                    }`}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Info Box */}
      <div className="space-y-3 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60 px-2">
        <div className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/50">
          <div className="flex items-center justify-between text-xs font-medium text-zinc-700 dark:text-zinc-300">
            <span>Target Backend</span>
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              NestJS / Go
            </span>
          </div>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Frontend-only starter dengan arsitektur modular bebas circular
            imports.
          </p>
        </div>

        <a
          href="https://github.com/moonrill/nextjs-template"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition"
        >
          <span className="flex items-center gap-1.5">GitHub Repository</span>
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </aside>
  );
}

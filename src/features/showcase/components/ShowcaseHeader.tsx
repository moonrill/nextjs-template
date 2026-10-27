"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, Home, CheckCircle } from "lucide-react";
import { GithubIcon } from "@/components/shared/icons";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { GlobalSearchModal } from "./GlobalSearchModal";

interface ShowcaseHeaderProps {
  onToggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

export function ShowcaseHeader({
  onToggleMobileMenu,
  isMobileMenuOpen,
}: ShowcaseHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  // Listen for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getBreadcrumbTitle = () => {
    if (pathname === "/showcase") return "Overview";
    if (pathname.includes("/components")) return "UI Components";
    if (pathname.includes("/api")) return "Data & API";
    if (pathname.includes("/forms")) return "Forms & Validation";
    if (pathname.includes("/developer-tools")) return "Developer Tools";
    return "Showcase";
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-zinc-200/80 bg-white/80 px-4 sm:px-6 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80">
        <div className="flex items-center gap-3">
          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 transition hover:bg-zinc-100 lg:hidden dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800"
            aria-label="Toggle Navigation Drawer"
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>

          {/* Breadcrumb Info */}
          <div className="hidden sm:flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <span className="text-zinc-400">/</span>
            <Link
              href="/showcase"
              className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition"
            >
              Showcase
            </Link>
            <span className="text-zinc-400">/</span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              {getBreadcrumbTitle()}
            </span>
          </div>
        </div>

        {/* Center / Search bar trigger */}
        <div className="flex-1 max-w-md mx-3">
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="flex w-full items-center justify-between rounded-xl border border-zinc-200/90 bg-zinc-50/80 px-3.5 py-2 text-sm text-zinc-500 transition hover:border-zinc-300 hover:bg-zinc-100/80 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:border-zinc-700 cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Search className="h-4 w-4 text-zinc-400" />
              <span>Cari komponen atau API...</span>
            </span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-zinc-200 bg-white px-2 py-0.5 text-xs font-medium text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          <Badge
            variant="outline"
            className="hidden md:inline-flex gap-1.5 border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs py-1 px-2.5"
          >
            <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
            Strict TypeScript
          </Badge>

          <a
            href="https://github.com/moonrill/nextjs-template"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800 cursor-pointer"
            aria-label="GitHub Repository"
          >
            <GithubIcon className="h-4 w-4" />
          </a>

          <div className="pl-1 border-l border-zinc-200 dark:border-zinc-800">
            <ThemeToggle variant="button" />
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}

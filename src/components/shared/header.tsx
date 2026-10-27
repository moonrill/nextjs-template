"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Sparkles, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";

export function Header() {
  const pathname = usePathname();

  // On showcase dashboard pages, hide the global landing header so the dashboard has full height
  if (pathname.startsWith("/showcase")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-tr from-indigo-600 to-cyan-500 font-bold text-white shadow-xs">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-zinc-900 dark:text-zinc-100 text-sm">
              Next.js Starter
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Frontend Production Base
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <Link
            href="/showcase"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            Overview
          </Link>
          <Link
            href="/showcase/components"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            Components
          </Link>
          <Link
            href="/showcase/api"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            Data & API
          </Link>
          <Link
            href="/showcase/forms"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            Forms
          </Link>
          <Link
            href="/showcase/developer-tools"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            Dev Tools
          </Link>
        </nav>

        {/* Right CTA & Controls */}
        <div className="flex items-center gap-2.5">
          <a
            href="https://github.com/moonrill/nextjs-template"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800"
            aria-label="GitHub Repository"
          >
            <GithubIcon className="h-4 w-4" />
          </a>

          <div className="border-l border-zinc-200 dark:border-zinc-800 pl-2">
            <ThemeToggle variant="button" />
          </div>

          <Link href="/showcase">
            <Button
              size="sm"
              className="gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer text-sm"
            >
              <span>Playground</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/shared/icons";

export function Footer() {
  const pathname = usePathname();

  // Hide global footer on showcase dashboard to allow full-height viewport
  if (pathname.startsWith("/showcase")) {
    return null;
  }

  return (
    <footer className="mt-auto border-t border-zinc-200 bg-white py-12 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <div>
              <span className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">
                Next.js Frontend Starter
              </span>
              <span className="block text-xs text-zinc-500 dark:text-zinc-400">
                Production-Ready Base • Minimal Dependencies
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-600 dark:text-zinc-400">
            <Link
              href="/showcase"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              Showcase Playground
            </Link>
            <Link
              href="/showcase/components"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              Komponen UI
            </Link>
            <Link
              href="/showcase/api"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              API Client
            </Link>
            <Link
              href="/showcase/developer-tools#standards"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              AGENTS.md
            </Link>
            <a
              href="https://github.com/moonrill/nextjs-template"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-zinc-900 dark:hover:text-zinc-100 transition"
            >
              <GithubIcon className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-zinc-100 pt-6 text-center text-xs text-zinc-400 dark:border-zinc-800">
          Didesain untuk integrasi backend NestJS & Go • Strict TypeScript Mode
          • Tailwind CSS v4
        </div>
      </div>
    </footer>
  );
}

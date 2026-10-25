import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
            N
          </div>
          <span className="font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Next.js Starter
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/api/health"
            target="_blank"
            className="flex items-center gap-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200">
              API Health
            </span>
          </Link>
          <Badge variant="success">v1.0.0</Badge>
        </div>
      </div>
    </header>
  );
}

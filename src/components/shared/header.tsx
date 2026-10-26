import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
            N
          </div>
          <span className="font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Next.js Frontend Starter
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs hidden sm:inline-flex">
            Frontend Only
          </Badge>
          <Badge variant="success">v1.0.0</Badge>
          <div className="ml-1 pl-2 border-l border-zinc-200 dark:border-zinc-800">
            <ThemeToggle variant="button" />
          </div>
        </div>
      </div>
    </header>
  );
}

"use client";

import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

export interface ThemeToggleProps {
  /**
   * Style variant:
   * - "switch": sliding pill switch with sun and moon icons
   * - "button": compact icon button for navbars and toolbars
   */
  variant?: "switch" | "button";
  /** Optional extra CSS classes */
  className?: string;
}

export function ThemeToggle({
  variant = "switch",
  className,
}: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme, isMounted } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Prevent hydration mismatch during initial SSR
  if (!isMounted) {
    if (variant === "button") {
      return (
        <div
          data-testid="theme-toggle-skeleton"
          className={cn(
            "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white opacity-80 dark:border-zinc-800 dark:bg-zinc-900",
            className
          )}
        >
          <span className="size-4 rounded-full bg-zinc-200 dark:bg-zinc-700" />
        </div>
      );
    }

    return (
      <div
        data-testid="theme-toggle-skeleton"
        className={cn(
          "relative inline-flex h-8 w-16 shrink-0 items-center rounded-full border border-zinc-300 bg-zinc-200/90 p-1 opacity-80 dark:border-zinc-700 dark:bg-zinc-800",
          className
        )}
      >
        <span className="h-6 w-6 rounded-full bg-white shadow-xs dark:bg-zinc-950" />
      </div>
    );
  }

  if (variant === "button") {
    return (
      <button
        type="button"
        data-testid="theme-toggle-button"
        onClick={toggleTheme}
        aria-label={isDark ? "Beralih ke mode terang" : "Beralih ke mode gelap"}
        title={isDark ? "Beralih ke mode terang" : "Beralih ke mode gelap"}
        className={cn(
          "relative inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 shadow-xs transition hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white dark:focus-visible:ring-zinc-600",
          className
        )}
      >
        <Sun className="size-4 text-amber-500 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute size-4 text-indigo-400 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      role="switch"
      data-testid="theme-toggle-switch"
      aria-checked={isDark}
      aria-label={isDark ? "Beralih ke mode terang" : "Beralih ke mode gelap"}
      title={isDark ? "Beralih ke mode terang" : "Beralih ke mode gelap"}
      onClick={toggleTheme}
      className={cn(
        "relative inline-flex h-8 w-16 shrink-0 cursor-pointer items-center rounded-full border p-1 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600",
        isDark
          ? "border-zinc-700 bg-zinc-800/90 shadow-inner"
          : "border-zinc-300 bg-zinc-200/90 shadow-inner",
        className
      )}
    >
      {/* Sun icon in left slot */}
      <span className="pointer-events-none absolute left-1 top-1 flex h-6 w-6 items-center justify-center">
        <Sun
          className={cn(
            "size-3.5 transition-all duration-300",
            !isDark
              ? "text-amber-500 scale-100 opacity-100"
              : "text-zinc-500 scale-75 opacity-50"
          )}
        />
      </span>

      {/* Moon icon in right slot */}
      <span className="pointer-events-none absolute right-1 top-1 flex h-6 w-6 items-center justify-center">
        <Moon
          className={cn(
            "size-3.5 transition-all duration-300",
            isDark
              ? "text-indigo-400 scale-100 opacity-100"
              : "text-zinc-400 scale-75 opacity-50"
          )}
        />
      </span>

      {/* Sliding thumb */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute left-1 top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-black/5 transition-transform duration-300 ease-out dark:bg-zinc-950 dark:ring-white/10",
          isDark ? "translate-x-8" : "translate-x-0"
        )}
      >
        {isDark ? (
          <Moon className="size-3.5 text-indigo-400 transition-transform duration-200" />
        ) : (
          <Sun className="size-3.5 text-amber-500 transition-transform duration-200" />
        )}
      </span>
    </button>
  );
}

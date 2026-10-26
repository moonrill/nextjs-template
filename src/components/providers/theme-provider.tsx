"use client";

import * as React from "react";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isMounted: boolean;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined
);

const THEME_STORAGE_KEY = "theme";

const emptySubscribe = () => () => {};

function useIsMounted(): boolean {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined" || !window.matchMedia) {
    return "light";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getInitialTheme(storageKey: string, defaultTheme: Theme): Theme {
  if (typeof window === "undefined") return defaultTheme;
  try {
    const stored = localStorage.getItem(storageKey) as Theme | null;
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
    if (document.documentElement.classList.contains("dark")) {
      return "dark";
    }
  } catch {
    // Ignore localStorage access restrictions
  }
  return defaultTheme;
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = THEME_STORAGE_KEY,
}: {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}) {
  const [theme, setThemeState] = React.useState<Theme>(() =>
    getInitialTheme(storageKey, defaultTheme)
  );
  const isMounted = useIsMounted();

  // Listen for storage changes across tabs and system color scheme changes
  React.useEffect(() => {
    const mediaQuery =
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(prefers-color-scheme: dark)")
        : null;

    const handleMediaChange = () => {
      setThemeState((current) => (current === "system" ? "system" : current));
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue) {
        const nextTheme = e.newValue as Theme;
        if (
          nextTheme === "light" ||
          nextTheme === "dark" ||
          nextTheme === "system"
        ) {
          setThemeState(nextTheme);
        }
      }
    };

    mediaQuery?.addEventListener("change", handleMediaChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      mediaQuery?.removeEventListener("change", handleMediaChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [storageKey]);

  // Compute resolved theme derived directly from state
  const isDark =
    theme === "dark" || (theme === "system" && getSystemTheme() === "dark");
  const resolvedTheme: ResolvedTheme = isDark ? "dark" : "light";

  // Synchronize the root HTML element with the active theme class
  React.useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  const setTheme = React.useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      try {
        localStorage.setItem(storageKey, newTheme);
      } catch {
        // Ignore localStorage write error
      }
    },
    [storageKey]
  );

  const toggleTheme = React.useCallback(() => {
    setThemeState((current) => {
      const currentlyDark =
        current === "dark" ||
        (current === "system" && getSystemTheme() === "dark");
      const next: Theme = currentlyDark ? "light" : "dark";
      try {
        localStorage.setItem(storageKey, next);
      } catch {
        // Ignore localStorage write error
      }
      return next;
    });
  }, [storageKey]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        setTheme,
        toggleTheme,
        isMounted,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

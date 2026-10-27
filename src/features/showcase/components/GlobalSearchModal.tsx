"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, CornerDownLeft } from "lucide-react";
import { SHOWCASE_CATALOG } from "../data/showcase-catalog";
import { FeatureStatusBadge } from "./FeatureStatusBadge";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleDismiss = useCallback(() => {
    setQuery("");
    setSelectedIndex(0);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Keyboard shortcut listener for Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        handleDismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleDismiss]);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SHOWCASE_CATALOG.slice(0, 8);
    return SHOWCASE_CATALOG.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        item.library?.toLowerCase().includes(q) ||
        item.highlights.some((h) => h.toLowerCase().includes(q))
    ).slice(0, 10);
  }, [query]);

  const handleSelect = (routePath?: string) => {
    if (routePath) {
      router.push(routePath);
      handleDismiss();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-black/60 backdrop-blur-xs"
      onClick={handleDismiss}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl transition-all dark:border-zinc-800 dark:bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-zinc-200 px-4 py-3.5 dark:border-zinc-800">
          <Search className="h-5 w-5 shrink-0 text-zinc-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Cari fitur, komponen UI, API demo, form, atau developer tools..."
            className="w-full bg-transparent text-sm text-zinc-900 placeholder-zinc-400 focus:outline-hidden dark:text-zinc-100 dark:placeholder-zinc-500"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="rounded p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block rounded border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 text-xs font-medium text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-sm text-zinc-500 dark:text-zinc-400">
              Tidak ada fitur atau komponen yang cocok dengan kata kunci &quot;
              {query}&quot;.
            </div>
          ) : (
            <div className="space-y-1">
              <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                {query ? "Hasil Pencarian" : "Rekomendasi Cepat"}
              </div>
              {filteredItems.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item.routePath)}
                  className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left transition ${
                    selectedIndex === index
                      ? "bg-indigo-50 text-indigo-900 dark:bg-indigo-950/50 dark:text-indigo-200"
                      : "hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                  }`}
                >
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {item.title}
                      </span>
                      <span className="rounded bg-zinc-200/60 px-1.5 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                        {item.categoryLabel}
                      </span>
                    </div>
                    <span className="text-xs text-zinc-500 line-clamp-1 dark:text-zinc-400">
                      {item.description}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 pl-3">
                    <FeatureStatusBadge status={item.status} showDot={false} />
                    <ArrowRight className="h-4 w-4 text-zinc-400" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between border-t border-zinc-200 bg-zinc-50 px-4 py-2.5 text-xs text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <CornerDownLeft className="h-3 w-3" /> Pilih
            </span>
          </div>
          <span>Total {SHOWCASE_CATALOG.length} modul terdaftar</span>
        </div>
      </div>
    </div>
  );
}

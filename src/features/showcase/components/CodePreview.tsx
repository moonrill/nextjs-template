"use client";

import { useState } from "react";
import { Check, Copy, Code2 } from "lucide-react";

interface CodePreviewProps {
  code: string;
  language?: string;
  title?: string;
  filePath?: string;
  collapsible?: boolean;
}

export function CodePreview({
  code,
  language = "tsx",
  title,
  filePath,
  collapsible = false,
}: CodePreviewProps) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(!collapsible);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-950 text-zinc-100 shadow-sm dark:border-zinc-800">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/90 px-4 py-2.5 text-sm text-zinc-400">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4 text-indigo-400" />
          {title && <span className="font-medium text-zinc-200">{title}</span>}
          {filePath && (
            <span className="font-mono text-xs text-zinc-500">
              {title ? `• ${filePath}` : filePath}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded bg-zinc-800 px-2 py-0.5 font-mono text-xs uppercase text-zinc-400">
            {language}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-md bg-zinc-800/80 px-3 py-1 text-sm text-zinc-300 transition hover:bg-zinc-700 hover:text-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
            aria-label="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-400">Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Salin</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Block */}
      <div
        className={`relative overflow-x-auto p-4 font-mono text-sm leading-relaxed text-zinc-200 transition-all ${
          !isExpanded && collapsible ? "max-h-48 overflow-hidden" : ""
        }`}
      >
        <pre className="tab-4">
          <code>{code}</code>
        </pre>
        {!isExpanded && collapsible && (
          <div className="absolute inset-x-0 bottom-0 flex h-20 items-end justify-center bg-linear-to-t from-zinc-950 to-transparent pb-3">
            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              className="cursor-pointer rounded-md bg-zinc-800 px-3.5 py-1.5 text-sm font-medium text-zinc-200 hover:bg-zinc-700"
            >
              Lihat Selengkapnya
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

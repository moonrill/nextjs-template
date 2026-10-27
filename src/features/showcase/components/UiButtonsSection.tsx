"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CodePreview } from "./CodePreview";
import { Loader2, Plus, Trash2, Send, ArrowRight } from "lucide-react";

type ButtonVariant =
  "default" | "secondary" | "outline" | "ghost" | "destructive" | "link";

type ButtonSize = "xs" | "sm" | "default" | "lg";

export function UiButtonsSection() {
  const [selectedVariant, setSelectedVariant] =
    useState<ButtonVariant>("default");
  const [selectedSize, setSelectedSize] = useState<ButtonSize>("default");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sampleCode = `<Button
  variant="${selectedVariant}"
  size="${selectedSize}"${isDisabled ? "\n  disabled" : ""}${
    isLoading ? "\n  disabled" : ""
  }
>
  ${
    isLoading
      ? '<Loader2 className="animate-spin" /> Sedang Memuat...'
      : "Klik Saya"
  }
</Button>`;

  const handleSimulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <section id="buttons" className="space-y-6 pt-4">
      <div className="border-b border-zinc-200/80 pb-3 dark:border-zinc-800/80">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Buttons & Actions
        </h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Komponen tombol serbaguna berbasis <code>@base-ui/react</code> dan{" "}
          <code>class-variance-authority</code>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Controls Column */}
        <div className="glass-card rounded-2xl p-5 lg:col-span-5 space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Pengaturan Tombol
          </h3>

          {/* Variant Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Varian
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(
                [
                  "default",
                  "secondary",
                  "outline",
                  "ghost",
                  "destructive",
                  "link",
                ] as ButtonVariant[]
              ).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setSelectedVariant(v)}
                  className={`rounded-lg px-2.5 py-1.5 text-sm font-medium capitalize transition cursor-pointer ${
                    selectedVariant === v
                      ? "bg-indigo-600 text-white"
                      : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Ukuran
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {(["xs", "sm", "default", "lg"] as ButtonSize[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedSize(s)}
                  className={`rounded-lg px-2.5 py-1.5 text-sm font-medium capitalize transition cursor-pointer ${
                    selectedSize === s
                      ? "bg-indigo-600 text-white"
                      : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* States Toggles */}
          <div className="space-y-2 pt-2 border-t border-zinc-200/80 dark:border-zinc-800/80">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Status Interaktif
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setIsDisabled(!isDisabled)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition cursor-pointer ${
                  isDisabled
                    ? "bg-amber-600 text-white"
                    : "border border-zinc-300 text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
                }`}
              >
                Disabled: {isDisabled ? "ON" : "OFF"}
              </button>

              <button
                type="button"
                onClick={handleSimulateLoading}
                className="rounded-lg bg-indigo-50 border border-indigo-200 px-3 py-1.5 text-sm font-medium text-indigo-700 dark:bg-indigo-950/40 dark:border-indigo-800 dark:text-indigo-300 hover:bg-indigo-100 transition cursor-pointer"
              >
                {isLoading ? "Sedang Loading..." : "Simulasi Loading (2s)"}
              </button>
            </div>
          </div>
        </div>

        {/* Live Preview Column */}
        <div className="space-y-4 lg:col-span-7">
          <div className="glass-card flex min-h-40 flex-col items-center justify-center gap-4 rounded-2xl p-6 text-center">
            <span className="text-sm font-medium text-zinc-400">
              Pratinjau Langsung:
            </span>
            <Button
              variant={selectedVariant}
              size={selectedSize}
              disabled={isDisabled || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" />
                  <span>Sedang Memproses...</span>
                </>
              ) : (
                <>
                  <Send />
                  <span>Kirim Data</span>
                </>
              )}
            </Button>
            <span className="text-xs text-zinc-400">
              Varian: <code>{selectedVariant}</code> • Ukuran:{" "}
              <code>{selectedSize}</code>
            </span>
          </div>

          {/* Static Gallery for Quick Comparison */}
          <div className="glass-card rounded-2xl p-4">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Galeri Semua Varian:
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <Button variant="default">
                <Plus /> Default
              </Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">
                <Trash2 /> Destructive
              </Button>
              <Button variant="link">
                Link Style <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Code Preview */}
          <CodePreview
            code={sampleCode}
            title="Contoh Penggunaan Button"
            filePath="src/components/ui/button.tsx"
          />
        </div>
      </div>
    </section>
  );
}

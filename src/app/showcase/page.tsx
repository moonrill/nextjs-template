"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Layers,
  ArrowRight,
  ExternalLink,
  Code2,
  Database,
  CheckCircle,
  Check,
} from "lucide-react";
import {
  SHOWCASE_CATALOG,
  getShowcaseStats,
} from "@/features/showcase/data/showcase-catalog";
import { FeatureStatusBadge } from "@/features/showcase/components/FeatureStatusBadge";
import { MetricCard } from "@/features/showcase/components/MetricCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ShowcaseOverviewPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const stats = getShowcaseStats();

  const filteredCatalog =
    statusFilter === "all"
      ? SHOWCASE_CATALOG
      : SHOWCASE_CATALOG.filter((item) => item.status === statusFilter);

  return (
    <div className="space-y-10">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-linear-to-b from-white via-zinc-50/60 to-white p-6 sm:p-10 shadow-xs dark:border-zinc-800/80 dark:from-zinc-900/90 dark:via-zinc-900/50 dark:to-zinc-950">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                <span className="relative flex h-2 w-2">
                  <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500" />
                </span>
                Interactive Template Showcase
              </span>
              <Badge variant="outline" className="text-xs">
                Next.js 16.4 • React 19
              </Badge>
              <Badge variant="success" className="text-xs">
                Strict Mode Ready
              </Badge>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              Next.js Starter <span className="gradient-text">Playground</span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Katalog interaktif dan dokumentasi hidup untuk mengeksplorasi,
              menguji, dan memvalidasi komponen, pola integrasi API, validasi
              form, dan arsitektur siap produksi yang telah disediakan template
              ini.
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <Link href="/showcase/components">
                <Button className="gap-2 bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs cursor-pointer">
                  <Layers className="h-4 w-4" />
                  Jelajahi Komponen
                </Button>
              </Link>
              <Link href="/showcase/api">
                <Button variant="outline" className="gap-2 cursor-pointer">
                  <Database className="h-4 w-4 text-indigo-500" />
                  Coba API Playground
                </Button>
              </Link>
              <Link href="/showcase/developer-tools#standards">
                <Button variant="ghost" className="gap-2 cursor-pointer">
                  <Code2 className="h-4 w-4" />
                  Standar Kode
                </Button>
              </Link>
              <a
                href="https://github.com/moonrill/nextjs-template"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition py-2 px-2"
              >
                GitHub Repo <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right Status Indicator Card */}
          <div className="glass-card flex flex-col justify-between rounded-2xl p-6 lg:w-72">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200/60 dark:border-zinc-800/60">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Kesiapan Template
              </span>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                {stats.readinessPercent}% Siap
              </span>
            </div>

            <div className="my-4 space-y-2.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">Modul Terverifikasi</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                  {stats.ready} dari {stats.total}
                </span>
              </div>
              {/* Progress bar */}
              <div className="h-2 w-full rounded-full bg-zinc-100 overflow-hidden dark:bg-zinc-800">
                <div
                  className="h-full bg-linear-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-700"
                  style={{ width: `${stats.readinessPercent}%` }}
                />
              </div>
            </div>

            <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Zero Unchecked Indexed Access</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Tanpa dependency backend internal</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ringkasan Kemampuan (Metrics Grid) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Ringkasan Kemampuan & Fondasi
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Metrik nyata dihitung langsung dari katalog fitur dan dependensi
              aktif repository.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            title="UI Components"
            value={`${SHOWCASE_CATALOG.filter((i) => i.category === "components").length} Modul`}
            change="+6 Varian"
            description="Button, Input, Form fields, Dialogs, Toasts, TanStack Data Table."
            iconName="layers"
            sparklineVariant="primary"
          />
          <MetricCard
            title="Data & API Client"
            value="Native Fetch"
            change="10s Timeout"
            description="AbortController, fail-safe error wrapping, dan validasi Zod."
            iconName="zap"
            sparklineVariant="secondary"
          />
          <MetricCard
            title="Forms & Validation"
            value="RHF + Zod"
            change="Fail-Fast"
            description="Pengelolaan state form deklaratif dengan validasi tipe schema ketat."
            iconName="check"
            sparklineVariant="cta"
          />
          <MetricCard
            title="Security & Resilience"
            value="HSTS + CSP"
            change="Hardened"
            description="Security headers, safe single-read body streaming, dan ApiError contract."
            iconName="trending"
            sparklineVariant="primary"
          />
          <MetricCard
            title="Developer Experience"
            value="Strict TS"
            change="ESLint 9"
            description="Prettier formatting, noUncheckedIndexedAccess, dan CI check."
            iconName="cpu"
            sparklineVariant="secondary"
          />
          <MetricCard
            title="Container & Docker"
            value="Node:26"
            change="Alpine"
            description="Multi-stage Dockerfile dengan standalone Next.js server dan non-root user."
            iconName="layers"
            sparklineVariant="cta"
          />
        </div>
      </section>

      {/* Feature Readiness Matrix */}
      <section className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Feature Readiness Matrix
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Evaluasi transparansi status kesiapan fitur: Ready, Available,
              Optional, atau Planned.
            </p>
          </div>

          {/* Filter Status Pills */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-zinc-200/80 bg-zinc-100/60 p-1 dark:border-zinc-800/80 dark:bg-zinc-900/60">
            <button
              type="button"
              onClick={() => setStatusFilter("all")}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition cursor-pointer ${
                statusFilter === "all"
                  ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-100"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              Semua ({stats.total})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("ready")}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition cursor-pointer ${
                statusFilter === "ready"
                  ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-100"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              Ready ({stats.ready})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("available")}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition cursor-pointer ${
                statusFilter === "available"
                  ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-100"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              Available ({stats.available})
            </button>
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCatalog.map((item) => (
            <div
              key={item.id}
              className="glass-card glass-card-hover flex flex-col justify-between rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800/80"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    {item.categoryLabel}
                  </span>
                  <FeatureStatusBadge status={item.status} />
                </div>

                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500 line-clamp-2 dark:text-zinc-400">
                    {item.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-1">
                  {item.highlights.slice(0, 2).map((h, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-400"
                    >
                      <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500" />
                      <span className="line-clamp-1">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 text-sm dark:border-zinc-800/60">
                <code className="font-mono text-xs text-zinc-400">
                  {item.library || "Built-in"}
                </code>
                {item.routePath ? (
                  <Link
                    href={item.routePath}
                    className="flex items-center gap-1 font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 transition"
                  >
                    <span>Coba Demo</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <span className="text-zinc-400">Tersedia di file</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Principles & Standards Reminder */}
      <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-6 dark:border-indigo-950/60 dark:bg-indigo-950/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-indigo-950 dark:text-indigo-200">
              Prinsip Integritas Template
            </h3>
            <p className="text-sm text-indigo-800/80 dark:text-indigo-300/80">
              Showcase dibangun terisolasi di dalam{" "}
              <code>src/features/showcase</code>. Dapat dihapus dengan aman saat
              proyek dimulai tanpa mengganggu core lib atau konfigurasi bisnis
              aplikasi.
            </p>
          </div>
          <Link href="/showcase/developer-tools#standards">
            <Button
              variant="outline"
              className="border-indigo-300 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 cursor-pointer"
            >
              Baca Pedoman AGENTS.md
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Layers,
  Database,
  CheckSquare,
  FlaskConical,
  Wrench,
  Zap,
  Cpu,
  Terminal,
} from "lucide-react";
import { GithubIcon } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Next.js Frontend Starter — Production-Ready & Structured",
  description:
    "Template frontend Next.js App Router dengan TypeScript strict mode, Base UI, Tailwind CSS v4, arsitektur modular berbasis fitur, dan API Client siap integrasi NestJS/Go.",
});

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 overflow-hidden">
      {/* Background Decorative Glow (Hero Gradient) */}
      <div className="hero-gradient pointer-events-none absolute inset-x-0 top-0 h-150 w-full" />

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left Column: Copy & Actions */}
            <div className="text-center lg:text-left space-y-6">
              {/* Status Ticker Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-50/80 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 backdrop-blur-md dark:border-indigo-500/30 dark:bg-indigo-950/50 dark:text-indigo-300">
                <span className="relative flex h-2 w-2">
                  <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Production-Ready Frontend Architecture
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.15]">
                Fondasi Frontend Modern untuk{" "}
                <span className="gradient-text">Skala Produksi</span>
              </h1>

              {/* Subheading */}
              <p className="mx-auto max-w-xl text-base sm:text-lg text-zinc-600 dark:text-zinc-400 lg:mx-0 leading-relaxed">
                Template khusus <strong>frontend</strong> menggunakan Next.js
                App Router, TypeScript strict mode, Base UI, Tailwind CSS v4,
                dan modular feature architecture. Siap terhubung langsung dengan
                backend NestJS atau Go.
              </p>

              {/* Call-to-actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <Link href="/showcase">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto gap-2 bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 text-sm cursor-pointer"
                  >
                    <Sparkles className="h-4 w-4" />
                    Buka Interactive Showcase
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>

                <Link href="/showcase/developer-tools#standards">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto gap-2 border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800 text-sm cursor-pointer"
                  >
                    <Terminal className="h-4 w-4 text-indigo-500" />
                    Standar AGENTS.md
                  </Button>
                </Link>
              </div>

              {/* Stats Counters */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80">
                <div>
                  <div className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
                    100%
                  </div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">
                    Type Strictness
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                    22 Passed
                  </div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">
                    Vitest Unit Tests
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                    Node 26
                  </div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">
                    Docker Alpine Standalone
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Live Interactive Mock Dashboard Card (uupm.cc style) */}
            <div className="relative">
              {/* Main Floating Glass Card */}
              <div className="glass-card animate-float relative overflow-hidden rounded-3xl p-6 shadow-2xl border border-zinc-200/80 dark:border-zinc-800/80">
                {/* Header inside mock widget */}
                <div className="flex items-center justify-between pb-4 border-b border-zinc-200/60 dark:border-zinc-800/60">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white">
                      <Zap className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                        Frontend Runtime Metrics
                      </span>
                      <span className="block text-xs text-zinc-400">
                        TanStack Cache & Native Fetch
                      </span>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    +24.5% Speed
                  </span>
                </div>

                {/* SVG Area Chart (Inspired by uupm.cc demo) */}
                <div className="relative mt-4 h-36 w-full">
                  <svg
                    className="h-full w-full"
                    viewBox="0 0 300 120"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient
                        id="areaGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#6366f1"
                          stopOpacity="0.3"
                        />
                        <stop
                          offset="100%"
                          stopColor="#6366f1"
                          stopOpacity="0.02"
                        />
                      </linearGradient>
                      <linearGradient
                        id="secondaryArea"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#06b6d4"
                          stopOpacity="0.2"
                        />
                        <stop
                          offset="100%"
                          stopColor="#06b6d4"
                          stopOpacity="0.0"
                        />
                      </linearGradient>
                    </defs>

                    {/* Grid lines */}
                    <line
                      x1="0"
                      y1="30"
                      x2="300"
                      y2="30"
                      stroke="currentColor"
                      strokeOpacity="0.08"
                      strokeDasharray="3,3"
                    />
                    <line
                      x1="0"
                      y1="60"
                      x2="300"
                      y2="60"
                      stroke="currentColor"
                      strokeOpacity="0.08"
                      strokeDasharray="3,3"
                    />
                    <line
                      x1="0"
                      y1="90"
                      x2="300"
                      y2="90"
                      stroke="currentColor"
                      strokeOpacity="0.08"
                      strokeDasharray="3,3"
                    />

                    {/* Area fills */}
                    <path
                      d="M0,90 C50,80 80,50 130,45 C180,40 220,20 300,10 L300,120 L0,120 Z"
                      fill="url(#areaGradient)"
                    />
                    <path
                      d="M0,105 C60,95 100,75 160,65 C220,55 260,35 300,25 L300,120 L0,120 Z"
                      fill="url(#secondaryArea)"
                    />

                    {/* Curves */}
                    <path
                      d="M0,90 C50,80 80,50 130,45 C180,40 220,20 300,10"
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M0,105 C60,95 100,75 160,65 C220,55 260,35 300,25"
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="2"
                      strokeDasharray="4,3"
                      strokeLinecap="round"
                    />

                    {/* Points */}
                    <circle
                      cx="130"
                      cy="45"
                      r="3.5"
                      fill="#ffffff"
                      stroke="#6366f1"
                      strokeWidth="2"
                    />
                    <circle
                      cx="300"
                      cy="10"
                      r="3.5"
                      fill="#ffffff"
                      stroke="#6366f1"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                {/* 3 Micro KPI Cards */}
                <div className="mt-4 grid grid-cols-3 gap-2.5">
                  <div className="rounded-xl border border-zinc-200/80 bg-white/60 p-2.5 dark:border-zinc-800 dark:bg-zinc-900/60">
                    <span className="text-xs text-zinc-500">Latency</span>
                    <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      42ms
                    </div>
                    <span className="text-xs text-emerald-500 font-medium">
                      Native Fetch
                    </span>
                  </div>

                  <div className="rounded-xl border border-zinc-200/80 bg-white/60 p-2.5 dark:border-zinc-800 dark:bg-zinc-900/60">
                    <span className="text-xs text-zinc-500">Cache Hit</span>
                    <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      98.4%
                    </div>
                    <span className="text-xs text-cyan-500 font-medium">
                      TanStack Query
                    </span>
                  </div>

                  <div className="rounded-xl border border-zinc-200/80 bg-white/60 p-2.5 dark:border-zinc-800 dark:bg-zinc-900/60">
                    <span className="text-xs text-zinc-500">Validations</span>
                    <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      100%
                    </div>
                    <span className="text-xs text-emerald-500 font-medium">
                      Zod Schemas
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Chip 1 (Top-Right) */}
              <div
                className="glass-card animate-float absolute -top-4 -right-2 hidden sm:flex items-center gap-2 rounded-2xl px-3.5 py-2 shadow-lg"
                style={{ animationDelay: "1s" }}
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <div className="text-left">
                  <span className="block text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    Zero Unsafe Any
                  </span>
                  <span className="block text-xs text-zinc-400">
                    Strict TypeScript
                  </span>
                </div>
              </div>

              {/* Floating Chip 2 (Bottom-Left) */}
              <div
                className="glass-card animate-float absolute -bottom-3 -left-3 hidden sm:flex items-center gap-2 rounded-2xl px-3.5 py-2 shadow-lg"
                style={{ animationDelay: "2s" }}
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-600">
                  <Cpu className="h-3.5 w-3.5" />
                </div>
                <div className="text-left">
                  <span className="block text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    NestJS / Go Compatible
                  </span>
                  <span className="block text-xs text-zinc-400">
                    Decoupled Architecture
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars & Features Grid */}
      <section className="py-16 sm:py-24 bg-zinc-50/60 dark:bg-zinc-900/40 border-y border-zinc-200/80 dark:border-zinc-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              Pilar Arsitektur
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              Semua yang Dibutuhkan untuk{" "}
              <span className="gradient-text">Frontend Tangguh</span>
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Tidak ada asumsi atau dependency tersembunyi. Semua keputusan
              teknis terekam jelas di dalam dokumen AGENTS.md dan diuji
              otomatis.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 */}
            <div className="glass-card glass-card-hover rounded-2xl p-6 space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100">
                App Router & Strict TypeScript
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Konfigurasi <code>noUncheckedIndexedAccess: true</code> dan
                larangan mutlak tipe <code>any</code>. Server Components
                digunakan sebagai default dengan komposisi routing tipis.
              </p>
            </div>

            {/* Card 2 */}
            <div className="glass-card glass-card-hover rounded-2xl p-6 space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                <Database className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100">
                API Client & AbortController
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Native fetch wrapper dengan timeout otomatis 10 detik, error
                wrapping <code>ApiError</code>, dan sanitasi data sensitif pada
                file log.
              </p>
            </div>

            {/* Card 3 */}
            <div className="glass-card glass-card-hover rounded-2xl p-6 space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <CheckSquare className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100">
                React Hook Form & Zod
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Validasi fail-fast di batas sistem dengan schema Zod. Pesan
                kesalahan inline informatif dan submit state yang responsif.
              </p>
            </div>

            {/* Card 4 */}
            <div className="glass-card glass-card-hover rounded-2xl p-6 space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100">
                TanStack Query & TanStack Table
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Caching data di sisi client, refetch latar belakang otomatis,
                dan tabel headless performa tinggi dengan search, sort, filter,
                dan pagination.
              </p>
            </div>

            {/* Card 5 */}
            <div className="glass-card glass-card-hover rounded-2xl p-6 space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
                <FlaskConical className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100">
                Automated Vitest Suite
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                22 skenario pengujian unit dan komponen lulus otomatis. Menjaga
                fungsi utilitas, logger, dan pemanggilan API tidak rusak saat
                pengembangan.
              </p>
            </div>

            {/* Card 6 */}
            <div className="glass-card glass-card-hover rounded-2xl p-6 space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Wrench className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100">
                Docker Standalone & CI Ready
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Multi-stage build berbasis <code>node:26-alpine</code> dengan
                output standalone, user non-root aman, dan alur audit{" "}
                <code>pnpm check</code> siap CI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Matrix: Generic Starter vs This Template */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">
              Mengapa Memilih Template Ini?
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Perbedaan nyata antara starter generic dan template siap produksi
              yang terstandarisasi.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-zinc-200 glass-card dark:border-zinc-800">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-zinc-200 bg-zinc-50/80 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400">
                <tr>
                  <th className="px-5 py-3.5 font-semibold">
                    Aspek Arsitektur
                  </th>
                  <th className="px-5 py-3.5 font-semibold text-zinc-400">
                    Generic Starter
                  </th>
                  <th className="px-5 py-3.5 font-semibold text-indigo-600 dark:text-indigo-400">
                    Next.js Production Starter
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60">
                <tr className="hover:bg-zinc-50/40 dark:hover:bg-zinc-900/30">
                  <td className="px-5 py-3.5 font-medium text-zinc-800 dark:text-zinc-200">
                    Peran Aplikasi
                  </td>
                  <td className="px-5 py-3.5 text-zinc-500">
                    Bercampur fullstack & route handlers
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-emerald-600 dark:text-emerald-400">
                    Pure Frontend terisolasi (siap NestJS/Go)
                  </td>
                </tr>
                <tr className="hover:bg-zinc-50/40 dark:hover:bg-zinc-900/30">
                  <td className="px-5 py-3.5 font-medium text-zinc-800 dark:text-zinc-200">
                    TypeScript Strictness
                  </td>
                  <td className="px-5 py-3.5 text-zinc-500">
                    Sering menggunakan <code>any</code> longgar
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-emerald-600 dark:text-emerald-400">
                    Strict mode + noUncheckedIndexedAccess
                  </td>
                </tr>
                <tr className="hover:bg-zinc-50/40 dark:hover:bg-zinc-900/30">
                  <td className="px-5 py-3.5 font-medium text-zinc-800 dark:text-zinc-200">
                    Validasi Environment
                  </td>
                  <td className="px-5 py-3.5 text-zinc-500">
                    process.env mentah tanpa validasi
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-emerald-600 dark:text-emerald-400">
                    Fail-fast startup crash via Zod
                  </td>
                </tr>
                <tr className="hover:bg-zinc-50/40 dark:hover:bg-zinc-900/30">
                  <td className="px-5 py-3.5 font-medium text-zinc-800 dark:text-zinc-200">
                    Showcase & Dokumentasi Hidup
                  </td>
                  <td className="px-5 py-3.5 text-zinc-500">
                    Hanya README teks statis
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-emerald-600 dark:text-emerald-400">
                    Interactive Playground (/showcase)
                  </td>
                </tr>
                <tr className="hover:bg-zinc-50/40 dark:hover:bg-zinc-900/30">
                  <td className="px-5 py-3.5 font-medium text-zinc-800 dark:text-zinc-200">
                    Automated Tests
                  </td>
                  <td className="px-5 py-3.5 text-zinc-500">
                    Tidak ada test sama sekali
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-emerald-600 dark:text-emerald-400">
                    22 Vitest & RTL suites terverifikasi
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Bottom Card */}
      <section className="pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-indigo-200/80 bg-linear-to-r from-indigo-600 via-indigo-700 to-cyan-600 p-8 sm:p-12 text-white shadow-xl dark:border-indigo-800">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Mulai Eksplorasi di Interactive Playground
              </h2>
              <p className="text-sm text-indigo-100 leading-relaxed">
                Coba langsung varian tombol, input form, simulasi respon API
                client, data table, dan lihat contoh kode nyata yang siap
                disalin ke proyek Anda.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <Link href="/showcase">
                  <Button
                    size="lg"
                    className="gap-2 bg-white hover:bg-zinc-100 text-zinc-900 shadow-md font-semibold cursor-pointer"
                  >
                    Buka Starter Playground
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <a
                  href="https://github.com/moonrill/nextjs-template"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  <GithubIcon className="h-4 w-4" />
                  Clone di GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

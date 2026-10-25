import { getStarterFeatures } from "@/features/example";
import { ExampleCard } from "@/features/example";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function HomePage() {
  const features = await getStarterFeatures();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      {/* Hero Section */}
      <div className="flex flex-col items-start gap-4 text-left">
        <Badge
          variant="outline"
          className="border-zinc-300 dark:border-zinc-700"
        >
          Production-Ready Template v1.0
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
          Fondasi Next.js yang Tangguh, Bersih, dan Teruji
        </h1>
        <p className="max-w-2xl text-base text-zinc-600 sm:text-lg dark:text-zinc-400">
          Template starter Next.js dengan App Router, TypeScript strict mode,
          arsitektur berbasis fitur, validasi schema Zod, pengujian otomatis,
          dan multi-stage Docker build.
        </p>
        <div className="mt-2 flex flex-wrap gap-3">
          <Link
            href="/api/health"
            className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Cek Health Endpoint
          </Link>
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Dokumentasi Next.js
          </a>
        </div>
      </div>

      {/* Feature Showcase (Server Component) */}
      <section className="mt-16">
        <div className="mb-6 flex flex-col gap-1">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Arsitektur & Pilar Utama
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Contoh implementasi modul terisolasi di{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              src/features/example
            </code>
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <ExampleCard key={feature.id} feature={feature} />
          ))}
        </div>
      </section>

      {/* Quality Standards & Guidelines */}
      <section className="mt-16 rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900/50">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Standar Kualitas & Tooling
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="font-medium text-zinc-900 dark:text-zinc-200">
              Code Quality
            </h3>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              ESLint 9, Prettier formatting, dan TypeScript strict mode dengan
              noUncheckedIndexedAccess.
            </p>
          </div>
          <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="font-medium text-zinc-900 dark:text-zinc-200">
              Automated Testing
            </h3>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              Vitest untuk unit tests, React Testing Library untuk komponen, dan
              Playwright untuk E2E smoke tests.
            </p>
          </div>
          <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="font-medium text-zinc-900 dark:text-zinc-200">
              Production Container
            </h3>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              Multi-stage Dockerfile dengan standalone output dan runtime
              non-root user.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

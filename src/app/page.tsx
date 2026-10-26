import { getStarterFeatures } from "@/features/example";
import { ExampleCard } from "@/features/example";
import { Badge } from "@/components/ui/badge";

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
          Frontend Starter v1.0
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
          Next.js Frontend Starter yang Tangguh & Terstruktur
        </h1>
        <p className="max-w-2xl text-base text-zinc-600 sm:text-lg dark:text-zinc-400">
          Template khusus <strong>frontend</strong> menggunakan Next.js App
          Router, TypeScript strict mode, Tailwind CSS v4, arsitektur berbasis
          fitur, dan multi-stage Docker build. Siap diintegrasikan dengan
          backend eksternal seperti NestJS atau Go.
        </p>
        <div className="mt-2 flex flex-wrap gap-3">
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Dokumentasi Next.js
          </a>
          <a
            href="https://tailwindcss.com/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Dokumentasi Tailwind CSS
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
            Contoh implementasi modul fitur terisolasi di{" "}
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
              Frontend Clean Code
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
              Vitest untuk unit tests dan React Testing Library untuk pengujian
              komponen antarmuka pengguna.
            </p>
          </div>
          <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="font-medium text-zinc-900 dark:text-zinc-200">
              Standalone Container
            </h3>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              Multi-stage Dockerfile dengan standalone output dan runtime
              non-root user yang efisien.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

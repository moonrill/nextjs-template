import { Check, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CodePreview } from "@/features/showcase/components/CodePreview";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Developer Tools & Architecture Guide — Next.js Starter",
  description:
    "Referensi lengkap konfigurasi lingkungan, struktur direktori, standar coding AGENTS.md, pipeline CI/CD, dan Docker container.",
});

export default function ShowcaseDevToolsPage() {
  const envVariables = [
    {
      name: "NODE_ENV",
      type: "'development' | 'test' | 'production'",
      required: true,
      scope: "Server",
      description: "Menentukan lingkungan runtime aplikasi Next.js.",
      example: "development",
    },
    {
      name: "NEXT_PUBLIC_APP_URL",
      type: "string (url)",
      required: true,
      scope: "Browser & Server",
      description:
        "Domain utama frontend untuk canonical URL SEO dan OpenGraph.",
      example: "http://localhost:3000",
    },
    {
      name: "NEXT_PUBLIC_API_URL",
      type: "string (url)",
      required: true,
      scope: "Browser & Server",
      description:
        "URL backend API tunggal untuk seluruh pemanggilan request, baik di sisi server maupun browser.",
      example: "http://localhost:4000",
    },
  ];

  const dockerfileSnippet = `# Multi-stage Dockerfile (Node 26 Alpine)
FROM node:26-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM node:26-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && \\
    adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]`;

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          Developer Tools & <span className="gradient-text">Architecture</span>
        </h1>
        <p className="max-w-3xl text-sm text-zinc-600 dark:text-zinc-400">
          Panduan operasional, variabel lingkungan, standar arsitektur
          AGENTS.md, serta pipeline otomasi pengujian dan kontainerisasi.
        </p>
      </div>

      {/* Part 1: Environment Variables */}
      <section id="env" className="space-y-4">
        <div className="border-b border-zinc-200/80 pb-2 dark:border-zinc-800/80">
          <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            1. Environment Variables Reference
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Divalidasi secara fail-fast saat inisialisasi server di{" "}
            <code>src/lib/env.ts</code>. Tidak menampilkan kredensial rahasia
            apa pun.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-zinc-200 glass-card p-1 dark:border-zinc-800">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-50/80 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400">
              <tr>
                <th className="px-4 py-3 font-semibold uppercase tracking-wider text-xs">
                  Variabel
                </th>
                <th className="px-4 py-3 font-semibold uppercase tracking-wider text-xs">
                  Scope
                </th>
                <th className="px-4 py-3 font-semibold uppercase tracking-wider text-xs">
                  Wajib
                </th>
                <th className="px-4 py-3 font-semibold uppercase tracking-wider text-xs">
                  Deskripsi
                </th>
                <th className="px-4 py-3 font-semibold uppercase tracking-wider text-xs">
                  Contoh Nilai
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60">
              {envVariables.map((item) => (
                <tr
                  key={item.name}
                  className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/40"
                >
                  <td className="px-4 py-3 font-mono font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.name}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={
                        item.scope === "Server" ? "outline" : "secondary"
                      }
                    >
                      {item.scope}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      Wajib
                    </span>
                  </td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                    {item.description}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-zinc-500">
                    {item.example}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Part 2: Project Architecture */}
      <section id="structure" className="space-y-4">
        <div className="border-b border-zinc-200/80 pb-2 dark:border-zinc-800/80">
          <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            2. Arsitektur Berbasis Fitur (Feature-Driven)
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Struktur modular di mana domain bisnis diisolasi dalam{" "}
            <code>src/features/</code>.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="glass-card rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800/80 space-y-2">
            <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
              src/app/
            </span>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Thin Routing & Layout Shell
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Khusus Next.js routing, metadata SEO, layout, dan error
              boundaries. Tidak menampung business logic.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800/80 space-y-2">
            <span className="font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400">
              src/features/[feature]/
            </span>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Modul Domain Mandiri
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Berisi <code>components/</code>, <code>schemas/</code>,{" "}
              <code>services/</code>, dan barrel <code>index.ts</code>.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800/80 space-y-2">
            <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
              src/lib/
            </span>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Infrastruktur Global
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              API client, fail-fast env validation, structured logger, dan
              sanitasi data sensitif.
            </p>
          </div>
        </div>
      </section>

      {/* Part 3: Coding Standards (AGENTS.md) */}
      <section id="standards" className="space-y-4">
        <div className="border-b border-zinc-200/80 pb-2 dark:border-zinc-800/80">
          <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            3. Standar Coding Utama (AGENTS.md)
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Aturan wajib bagi AI assistant dan software engineer dalam proyek
            ini.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-zinc-200/80 dark:border-zinc-800/80 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2 text-sm">
            <div className="flex items-start gap-2.5 rounded-xl border border-zinc-200/60 p-3.5 dark:border-zinc-800/60">
              <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  Dilarang Keras Menggunakan `any`
                </span>
                <p className="text-zinc-500 dark:text-zinc-400 mt-1">
                  Gunakan <code>unknown</code> lalu validasi dengan schema Zod
                  sebelum nilai diproses.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl border border-zinc-200/60 p-3.5 dark:border-zinc-800/60">
              <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  Server Components sebagai Default
                </span>
                <p className="text-zinc-500 dark:text-zinc-400 mt-1">
                  Batasi direktif <code>&quot;use client&quot;</code> hanya pada
                  komponen daun yang membutuhkan event listener atau state.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl border border-zinc-200/60 p-3.5 dark:border-zinc-800/60">
              <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  Frontend-Only (No Internal Route Handlers)
                </span>
                <p className="text-zinc-500 dark:text-zinc-400 mt-1">
                  Tidak ada API handler internal di <code>src/app/api</code>.
                  Semua komunikasi langsung ke backend NestJS/Go.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl border border-zinc-200/60 p-3.5 dark:border-zinc-800/60">
              <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  Sanitasi Logging Sensitif
                </span>
                <p className="text-zinc-500 dark:text-zinc-400 mt-1">
                  Dilarang console.log mentah. Gunakan <code>logger</code>{" "}
                  dengan sanitasi otomatis token/password.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Part 4: CI Pipeline & Quality Checks */}
      <section id="ci" className="space-y-4">
        <div className="border-b border-zinc-200/80 pb-2 dark:border-zinc-800/80">
          <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            4. CI Pipeline & Quality Checks Flow
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Urutan tahapan verifikasi otomatis sebelum kode dinyatakan siap
            digabung (merge).
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-zinc-200/80 dark:border-zinc-800/80 space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <div className="rounded-xl bg-zinc-100 px-3.5 py-2 font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              1. Install Deps (Frozen)
            </div>
            <ArrowRight className="h-4 w-4 text-zinc-400" />
            <div className="rounded-xl bg-zinc-100 px-3.5 py-2 font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              2. Prettier Format Check
            </div>
            <ArrowRight className="h-4 w-4 text-zinc-400" />
            <div className="rounded-xl bg-zinc-100 px-3.5 py-2 font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              3. ESLint 9 Flat Config
            </div>
            <ArrowRight className="h-4 w-4 text-zinc-400" />
            <div className="rounded-xl bg-zinc-100 px-3.5 py-2 font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              4. Strict Typecheck
            </div>
            <ArrowRight className="h-4 w-4 text-zinc-400" />
            <div className="rounded-xl bg-emerald-50 px-3.5 py-2 font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
              5. Standalone Build
            </div>
          </div>
        </div>
      </section>

      {/* Part 5: Docker Container */}
      <section id="docker" className="space-y-4">
        <div className="border-b border-zinc-200/80 pb-2 dark:border-zinc-800/80">
          <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            5. Multi-Stage Dockerfile & Standalone Deployment
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Image produksi minimalis berbasis Node.js 26 Alpine dengan user
            non-root aman.
          </p>
        </div>

        <CodePreview
          code={dockerfileSnippet}
          language="dockerfile"
          title="Dockerfile Produksi Multi-Stage"
          filePath="Dockerfile"
        />
      </section>
    </div>
  );
}

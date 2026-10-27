import type { ShowcaseItem } from "../types/showcase.types";

export const SHOWCASE_CATALOG: ShowcaseItem[] = [
  // UI Components
  {
    id: "ui-buttons",
    title: "Buttons & Actions",
    slug: "buttons",
    category: "components",
    categoryLabel: "UI Components",
    description:
      "Komponen tombol interaktif berbasis @base-ui/react dengan 6 varian visual, 4 ukuran, status loading, dan disabled state yang stabil tanpa layout shift.",
    status: "ready",
    badgeLabel: "@base-ui/react",
    library: "@base-ui/react + CVA",
    sourceFile: "src/components/ui/button.tsx",
    routePath: "/showcase/components#buttons",
    verified: true,
    highlights: [
      "Varian: default, secondary, outline, ghost, destructive, link",
      "Ukuran presisi: xs, sm, default, lg, icon",
      "Keyboard focus ring & ARIA disabled handling",
      "Integrasi loading spinner tanpa jitter",
    ],
  },
  {
    id: "ui-inputs",
    title: "Forms & Inputs",
    slug: "forms-inputs",
    category: "components",
    categoryLabel: "UI Components",
    description:
      "Koleksi elemen input terstruktur: Text, Email, Password dengan toggle visibilitas, Textarea, Select, Checkbox, dan Switch toggle.",
    status: "ready",
    badgeLabel: "Accessible",
    library: "Tailwind CSS v4 + Base UI",
    sourceFile: "src/features/showcase/components/UiInputsSection.tsx",
    routePath: "/showcase/components#inputs",
    verified: true,
    highlights: [
      "Simulasi pesan error validasi real-time",
      "Helper text dan disabled state",
      "Input password dengan reveal switch",
      "Accessible label association (htmlFor)",
    ],
  },
  {
    id: "ui-dialogs",
    title: "Dialogs & Overlays",
    slug: "dialogs",
    category: "components",
    categoryLabel: "UI Components",
    description:
      "Modal konfirmasi, alert dialog, popover, dan tooltip dengan trap fokus keyboard, portal rendering, dan backdrop scrim adaptif.",
    status: "ready",
    badgeLabel: "Focus Trap",
    library: "@base-ui/react",
    sourceFile: "src/features/showcase/components/UiDialogsSection.tsx",
    routePath: "/showcase/components#dialogs",
    verified: true,
    highlights: [
      "Konfirmasi aksi destruktif dengan preview simulasi",
      "ESC key dismiss dan klik backdrop",
      "Accessible ARIA dialog & role alertdialog",
      "Smooth enter/exit CSS animations",
    ],
  },
  {
    id: "ui-notifications",
    title: "Feedback & Notifications",
    slug: "notifications",
    category: "components",
    categoryLabel: "UI Components",
    description:
      "Sistem toast notifikasi modern menggunakan Sonner yang mendukung status success, error, warning, info, dan async promise tracking.",
    status: "ready",
    badgeLabel: "Sonner",
    library: "sonner",
    sourceFile: "src/components/providers/index.tsx",
    routePath: "/showcase/components#notifications",
    verified: true,
    highlights: [
      "Auto dismiss dengan durasi terukur",
      "Action button dan close button bawaan",
      "Promise loading -> success / error state",
      "Stacking animation multi-toast",
    ],
  },
  {
    id: "ui-data-table",
    title: "Data Table (TanStack Table)",
    slug: "data-table",
    category: "components",
    categoryLabel: "UI Components",
    description:
      "Tabel data performa tinggi berbasis TanStack Table v9 dengan sorting dinamis, pencarian real-time, filter status, pagination, dan seleksi baris.",
    status: "ready",
    badgeLabel: "TanStack Table v9",
    library: "@tanstack/react-table",
    sourceFile: "src/features/showcase/components/DataTableSection.tsx",
    routePath: "/showcase/components#data-table",
    verified: true,
    highlights: [
      "Pencarian instan pada nama dan email",
      "Sorting kolom asc/desc dengan indikator",
      "Filter status pengguna (Active, Inactive, Suspended)",
      "Seleksi baris dengan checkbox & hitung total terpilih",
    ],
  },

  // Data & API
  {
    id: "api-client",
    title: "API Client & Native Fetch",
    slug: "api-client",
    category: "api",
    categoryLabel: "Data & API",
    description:
      "Wrapper native fetch terpusat untuk komunikasi ke backend NestJS/Go dengan AbortController timeout otomatis, error wrapping, dan sanitasi.",
    status: "ready",
    badgeLabel: "Built-in",
    library: "Native Fetch + AbortController",
    sourceFile: "src/lib/api-client.ts",
    routePath: "/showcase/api",
    verified: true,
    highlights: [
      "Timeout default 10s dengan 408 AbortError",
      "Base URL otomatis (server vs client browser)",
      "Zod schema validation untuk type safety response",
      "Clean ApiError class dengan status dan data payload",
    ],
  },
  {
    id: "api-request-states",
    title: "Request States UI Pattern",
    slug: "request-states",
    category: "api",
    categoryLabel: "Data & API",
    description:
      "Demonstrasi 4 kondisi lifecycle pengambilan data: Loading skeleton, Success state, Empty data state, dan Error recovery state.",
    status: "ready",
    badgeLabel: "UX Pattern",
    library: "Tailwind CSS + Lucide",
    sourceFile: "src/features/showcase/components/ApiRequestStatesSection.tsx",
    routePath: "/showcase/api#states",
    verified: true,
    highlights: [
      "Loading skeleton berdenyut tanpa layout shift",
      "Empty state informatif dengan aksi panggilan ulang",
      "Error state ramah pengguna dengan tombol Retry",
      "Transisi halus antar state",
    ],
  },
  {
    id: "api-error-handling",
    title: "HTTP Error Handling Matrix",
    slug: "error-handling",
    category: "api",
    categoryLabel: "Data & API",
    description:
      "Katalog penanganan status HTTP (400, 401, 403, 404, 500, Timeout, Network Error) yang aman tanpa mengekspos internal stack trace ke user.",
    status: "ready",
    badgeLabel: "Resilience",
    library: "ApiError + Structured Logging",
    sourceFile: "src/lib/api-client.ts",
    routePath: "/showcase/api#errors",
    verified: true,
    highlights: [
      "401 Unauthorized redirect ke auth login",
      "403 Forbidden permission gate",
      "500 Internal server error fallback aman",
      "Pencegahan SSRF dengan URL endpoint terbatas",
    ],
  },

  // Forms
  {
    id: "forms-validation",
    title: "Form Validation (React Hook Form & Zod)",
    slug: "form-validation",
    category: "forms",
    categoryLabel: "Forms",
    description:
      "Pola validasi form deklaratif menggunakan React Hook Form dan Zod resolver dengan validasi fail-fast dan pesan error interaktif.",
    status: "ready",
    badgeLabel: "RHF + Zod",
    library: "react-hook-form + @hookform/resolvers/zod",
    sourceFile: "src/features/showcase/components/FormsPlaygroundSection.tsx",
    routePath: "/showcase/forms",
    verified: true,
    highlights: [
      "Validasi email regex dan panjang password",
      "Refinement password confirmation matching",
      "Disabled state saat form belum valid atau sedang submit",
      "Integrasi feedback Sonner toast pada submit",
    ],
  },
  {
    id: "forms-advanced",
    title: "Advanced Multi-Input Form",
    slug: "advanced-form",
    category: "forms",
    categoryLabel: "Forms",
    description:
      "Formulir pembuatan entitas dengan bermacam tipe data (text, email, select role, switch preference, checkbox terms) dan submit status handling.",
    status: "ready",
    badgeLabel: "Production Pattern",
    library: "React Hook Form",
    sourceFile: "src/features/showcase/components/FormsPlaygroundSection.tsx",
    routePath: "/showcase/forms#advanced",
    verified: true,
    highlights: [
      "Komposisi field kompleks dengan Zod schema",
      "Simulasi delay async submit 1 detik",
      "Tombol reset form ke default values",
      "Display payload JSON yang divalidasi",
    ],
  },

  // Developer Tools
  {
    id: "dev-env",
    title: "Environment Variables Validation",
    slug: "env-variables",
    category: "developer-tools",
    categoryLabel: "Developer Tools",
    description:
      "Validasi fail-fast environment variables saat server startup menggunakan Zod. Menolak running jika variabel wajib tidak terdefinisi.",
    status: "ready",
    badgeLabel: "Fail-Fast",
    library: "zod",
    sourceFile: "src/lib/env.ts",
    routePath: "/showcase/developer-tools#env",
    verified: true,
    highlights: [
      "Pemisahan serverSchema vs clientSchema",
      "NEXT_PUBLIC_ untuk nilai yang aman dikonsumsi browser",
      "Penyembunyian kredensial sensitif",
      "Pesan error startup yang jelas dan presisi",
    ],
  },
  {
    id: "dev-structure",
    title: "Project Architecture & Structure",
    slug: "project-structure",
    category: "developer-tools",
    categoryLabel: "Developer Tools",
    description:
      "Arsitektur modular berbasis fitur (feature-driven) yang mengisolasi domain bisnis di src/features/ dan menjaga routing tetap tipis.",
    status: "ready",
    badgeLabel: "Architecture",
    library: "Next.js App Router",
    sourceFile: "AGENTS.md",
    routePath: "/showcase/developer-tools#structure",
    verified: true,
    highlights: [
      "src/app tipis khusus routing dan layout",
      "src/features modular dengan barrel export index.ts",
      "Dilarang impor melingkar (circular dependency)",
      "Strict separation of concerns",
    ],
  },
  {
    id: "dev-docker",
    title: "Standalone Docker Container",
    slug: "docker",
    category: "developer-tools",
    categoryLabel: "Developer Tools",
    description:
      "Multi-stage Dockerfile berbasis node:26-alpine dengan output standalone dan runtime user non-root untuk deployment produksi yang efisien.",
    status: "ready",
    badgeLabel: "Production Ready",
    library: "Docker + Alpine Linux",
    sourceFile: "Dockerfile",
    routePath: "/showcase/developer-tools#docker",
    verified: true,
    highlights: [
      "Multi-stage build: deps, builder, runner",
      "Ukuran container minimal tanpa devDependencies",
      "User non-root: nextjs (UID 1001)",
      "Healthcheck endpoint & dummy env fallbacks",
    ],
  },
  {
    id: "dev-ci",
    title: "CI Pipeline & Quality Checks",
    slug: "ci-pipeline",
    category: "developer-tools",
    categoryLabel: "Developer Tools",
    description:
      "Rangkaian otomatisasi pemeriksaan kualitas: Prettier format check, ESLint 9, TypeScript typecheck, dan Vitest suite.",
    status: "ready",
    badgeLabel: "Automated",
    library: "GitHub Actions + pnpm",
    sourceFile: "package.json",
    routePath: "/showcase/developer-tools#ci",
    verified: true,
    highlights: [
      "pnpm check: format + lint + typecheck + test",
      "Strict TypeScript noUncheckedIndexedAccess",
      "ESLint 9 Flat Config",
      "Zero-tolerance terhadap error build",
    ],
  },
];

export function getShowcaseByCategory(category: string): ShowcaseItem[] {
  if (category === "all") return SHOWCASE_CATALOG;
  return SHOWCASE_CATALOG.filter((item) => item.category === category);
}

export function getShowcaseByStatus(status: string): ShowcaseItem[] {
  if (status === "all") return SHOWCASE_CATALOG;
  return SHOWCASE_CATALOG.filter((item) => item.status === status);
}

export function getShowcaseStats() {
  const total = SHOWCASE_CATALOG.length;
  const ready = SHOWCASE_CATALOG.filter((i) => i.status === "ready").length;
  const available = SHOWCASE_CATALOG.filter(
    (i) => i.status === "available"
  ).length;
  const optional = SHOWCASE_CATALOG.filter(
    (i) => i.status === "optional"
  ).length;
  const planned = SHOWCASE_CATALOG.filter((i) => i.status === "planned").length;

  return {
    total,
    ready,
    available,
    optional,
    planned,
    readinessPercent: Math.round((ready / total) * 100),
  };
}

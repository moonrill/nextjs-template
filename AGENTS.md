<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — Standar Coding & Pedoman Arsitektur Next.js

Dokumen ini adalah **sumber acuan utama (single source of truth)** untuk standar penulisan kode, arsitektur sistem, dan praktik rekayasa pada template starter Next.js ini. Berlaku bagi software engineer dan AI coding assistant.

---

## 1. Arsitektur & Struktur Folder (Frontend-Only)

Template ini dirancang **khusus sebagai Frontend (Frontend-Only)**, bukan fullstack. Seluruh kebutuhan backend, database, dan business logic tingkat server dilayani oleh service backend eksternal (misalnya NestJS atau Go).

Next.js pada template ini **tidak menyediakan Route Handlers atau API services internal** (`src/app/api`). Pengambilan data dilakukan langsung dari Server Components atau client services ke API backend eksternal menggunakan `API_BASE_URL` atau `NEXT_PUBLIC_APP_URL`.

```text
src/
├── app/                  # Routing, Layouts, Server Pages, Error Boundaries (UI Only)
│   ├── error.tsx         # Boundary penanganan error tingkat route segment
│   ├── global-error.tsx  # Fallback penanganan error fatal pada root layout
│   ├── not-found.tsx     # Tampilan halaman 404
│   ├── loading.tsx       # State pemuatan visual (Suspense fallback)
│   ├── layout.tsx        # Shell layout utama aplikasi
│   ├── globals.css       # Tailwind CSS v4 styling dasar
│   └── page.tsx          # Server Component halaman beranda
├── components/           # Komponen lintas fitur yang dapat digunakan bersama
│   ├── ui/               # Komponen UI generik (Button, Badge, Card, dll.)
│   └── shared/           # Komponen layout bersama (Header, Footer, Navigation)
├── features/             # Modul domain independen berbasis fitur
│   └── [feature-name]/   # Contoh: `example/`
│       ├── components/   # Komponen visual yang spesifik untuk fitur ini
│       ├── schemas/      # Schema validasi Zod untuk entitas/input fitur
│       ├── services/     # Logika pemanggilan data dari API backend eksternal
│       ├── types/        # TypeScript types & interfaces khusus fitur
│       └── index.ts      # Barrel export antarmuka publik modul
├── lib/                  # Utilitas global dan konfigurasi infrastruktur
│   ├── env.ts            # Validasi fail-fast environment variables (Zod)
│   ├── logger.ts         # Structured JSON logger dengan sanitasi data sensitif
│   └── utils.ts          # Helper murni (e.g. cn)
└── test/                 # Konfigurasi pengujian bersama dan helper
    ├── setup.ts          # Setup file Vitest & Testing Library matchers
    └── helpers/          # Custom renderers dan mock fixtures
```

### Aturan Aliran Dependensi:

- `app/` mengimpor dari `features/`, `components/`, dan `lib/`. Halaman (`page.tsx`) hanya bertindak sebagai komposisi tipis; tidak boleh menumpuk ratusan baris business logic.
- `features/[feature-name]/` dapat mengimpor dari `components/` dan `lib/`, tetapi **dilarang saling impor melingkar (circular dependency)** antar fitur. Gunakan shared services jika diperlukan lintas fitur.
- Komponen yang hanya digunakan oleh satu fitur **wajib** diletakkan di dalam `src/features/[feature-name]/components/`, bukan di `src/components/ui/`.

---

## 2. Standar TypeScript

- Proyek berjalan pada **Strict Mode** (`strict: true`, `noUncheckedIndexedAccess: true`, `exactOptionalPropertyTypes: true`).
- **Dilarang keras menggunakan `any`**. Jika tipe data belum diketahui saat menerima data dari sumber eksternal, gunakan `unknown` dan validasi menggunakan schema Zod sebelum diakses.
- Selalu tentukan return type secara eksplisit pada fungsi publik, service methods, dan API handlers.
- Manfaatkan alias path `@/*` yang merujuk ke `./src/*`.

---

## 3. Praktik React & Next.js App Router

- **Server Components sebagai default**: Semua komponen dalam `src/app/` dan `src/features/` adalah Server Components secara bawaan.
- **Batasi `"use client"`**: Hanya gunakan direktif `"use client"` pada komponen tingkat daun (leaf components) yang benar-benar memerlukan interaktivitas browser (e.g. `onClick`, event listeners, browser APIs) atau state lokal React (`useState`, `useEffect`).
- Dilarang menandai seluruh layout atau halaman dengan `"use client"` hanya karena satu tombol anak memerlukan interaksi.
- Manfaatkan optimasi bawaan Next.js: `next/image` untuk gambar, `next/font` untuk tipografi web, dan Metadata API untuk kebutuhan SEO.

---

## 4. Konvensi Penamaan (Naming Conventions)

| Elemen            | Format                        | Contoh                                         |
| ----------------- | ----------------------------- | ---------------------------------------------- |
| File & Direktori  | `kebab-case`                  | `example-card.tsx`, `health-check.ts`          |
| Komponen React    | `PascalCase`                  | `ExampleCard`, `Header`, `Button`              |
| Fungsi & Variabel | `camelCase`                   | `getStarterFeatures`, `formatDate`, `isServer` |
| Tipe & Interfaces | `PascalCase`                  | `FeatureItem`, `ButtonProps`                   |
| Zod Schemas       | `camelCase` + suffix `Schema` | `featureItemSchema`, `serverEnvSchema`         |
| Konstanta Global  | `UPPER_SNAKE_CASE`            | `SENSITIVE_KEYS`, `DEFAULT_PAGE_SIZE`          |

---

## 5. Validasi Data & Penanganan Error

- **Validasi di Batas Sistem**: Semua input eksternal (Environment Variables, URL parameters, query search, request bodies) **wajib divalidasi dengan Zod** sebelum diproses oleh domain logic.
- **Fail-Fast Environment**: Aplikasi harus menolak booting jika environment variable wajib tidak valid atau hilang (`src/lib/env.ts`).
- **Penyembunyian Detail Internal**: Pesan error yang diekspos ke client/user harus bersifat umum dan aman. Dilarang menampilkan stack trace, kredensial, atau detail query database ke antarmuka pengguna production.
- **Structured Logging**: Gunakan `logger` dari `src/lib/logger.ts` untuk mencatat error dan aktivitas penting. Sanitasi otomatis aktif untuk mencegah token, password, atau authorization header bocor ke file log. Dilarang mengandalkan `console.log()` ad-hoc di kode production.

---

## 6. Keamanan Baseline (Security Baseline)

- **Pemilahan Environment**: Nilai sensitif (DB password, private API keys) dilarang menggunakan prefiks `NEXT_PUBLIC_`.
- **Security Headers**: Header keamanan (`X-Frame-Options`, `Strict-Transport-Security`, `X-Content-Type-Options`, `Permissions-Policy`) dikonfigurasi secara deklaratif di `next.config.ts`.
- **Sanitasi Output**: Hindari penggunaan `dangerouslySetInnerHTML` kecuali telah dibersihkan secara eksplisit melalui parser sanitizer yang teruji.

---

## 7. Strategi Pengujian (Testing Strategy)

- **Unit Testing (Vitest)**: Uji logika murni, utilitas (`src/lib/`), schema Zod, dan method services secara terisolasi.
- **Component Testing (React Testing Library)**: Uji perilaku UI berdasarkan apa yang dialami pengguna (accessible role, text content), hindari menguji implementasi internal (state internals).
- **E2E Smoke Testing (Playwright)**: Verifikasi bahwa aplikasi dapat berjalan, halaman utama merespons tanpa error runtime fatal, dan elemen visual antarmuka ter-render dengan sempurna.

---

## 8. Kebijakan Dependensi & Container

- **Minimal Dependencies**: Jangan memasang library baru jika fungsionalitas tersebut dapat diselesaikan secara efisien menggunakan fitur bawaan Next.js, Node.js, atau pustaka inti yang sudah ada.
- **Integritas Lockfile**: Jangan mengubah `pnpm-lock.yaml` secara manual. Selalu gunakan `pnpm install --frozen-lockfile` di lingkungan CI/CD.
- **Docker Production**: Image container harus dibangun menggunakan multi-stage build dengan output `standalone` dan dieksekusi menggunakan user non-root (`nextjs`).

---

## 9. Konvensi Git & Versioning

- Gunakan format **Conventional Commits**:
  - `feat:` penambahan fitur baru
  - `fix:` perbaikan bug
  - `docs:` pembaruan dokumentasi
  - `test:` penambahan atau penyesuaian automated test
  - `refactor:` perubahan kode tanpa mengubah perilaku eksternal
  - `chore:` pemeliharaan konfigurasi, dependensi, atau tooling
- Versioning mengikuti pedoman **Semantic Versioning** (`MAJOR.MINOR.PATCH`).

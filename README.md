# Next.js Frontend Starter Template (Production-Ready)

Starter template Next.js yang dirancang khusus sebagai **fondasi aplikasi frontend modern yang bersih, konsisten, mudah dipelihara, dan siap diintegrasikan dengan backend eksternal (seperti NestJS atau Go)**. Proyek ini tidak memuat service API internal di Next.js, melainkan murni fokus pada arsitektur antarmuka pengguna (UI/UX), rendering, dan performa client-side/server-side.

---

## Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Tech Stack](#tech-stack)
- [Kebutuhan Sistem](#kebutuhan-sistem)
- [Panduan Memulai](#panduan-memulai)
- [Variabel Lingkungan](#variabel-lingkungan)
- [Perintah yang Tersedia](#perintah-yang-tersedia)
- [Struktur Proyek](#struktur-proyek)
- [Standar Koding & Pedoman AI](#standar-koding--pedoman-ai)
- [Pengujian](#pengujian)
- [Production Build & Docker](#production-build--docker)
- [Checklist Kesiapan Produksi](#checklist-kesiapan-produksi)
- [Troubleshooting](#troubleshooting)
- [Lisensi](#lisensi)

---

## Fitur Utama

- **Next.js App Router & Server Components**: Arsitektur rendering modern dengan pemisahan tegas antara Server Components dan Client Components.
- **Strict Type Safety**: TypeScript dengan mode ketat (`strict: true`, `noUncheckedIndexedAccess: true`, `exactOptionalPropertyTypes: true`).
- **Feature-Based Architecture**: Pengelompokan kode berdasarkan domain fitur (`schemas`, `services`, `components`, `types`) untuk skalabilitas jangka panjang.
- **Fail-Fast Environment Validation**: Validasi runtime variabel lingkungan menggunakan **Zod** sebelum aplikasi berjalan.
- **Structured JSON Logging**: Logger terstruktur dengan sanitasi otomatis untuk mencegah kebocoran kredensial atau token sensitif.
- **Security Baseline**: Konfigurasi header keamanan HTTP bawaan (`X-Frame-Options`, `HSTS`, `CSP`, `nosniff`, `Permissions-Policy`).
- **3-Layer Automated Testing**: Pengujian terintegrasi dengan Vitest (unit), React Testing Library (komponen), dan Playwright (E2E smoke test).
- **Multi-Stage Dockerfile**: Image container minimal dan aman dengan output `standalone` serta eksekusi di bawah user non-root (`nextjs`).
- **Automated CI Workflow**: GitHub Actions untuk verifikasi format, linting, typecheck, test, dan build secara otomatis.

---

## Tech Stack

| Kategori                     | Teknologi                      | Deskripsi                                        |
| ---------------------------- | ------------------------------ | ------------------------------------------------ |
| **Framework**                | Next.js 16+ (App Router)       | Framework inti frontend dan rendering            |
| **UI Library**               | React 19                       | Fondasi UI komponen berbasis Server Components   |
| **Bahasa**                   | TypeScript 5+                  | Static typing dengan strict mode                 |
| **Package Manager**          | pnpm 12+                       | Manajemen dependensi efisien dan terkunci        |
| **Styling**                  | Tailwind CSS v4                | Utilitas styling modern tanpa runtime CSS        |
| **Schema Validation**        | Zod                            | Validasi data runtime pada batas sistem          |
| **Unit & Component Testing** | Vitest & React Testing Library | Pengujian fungsi, logika bisnis, dan komponen UI |
| **E2E Testing**              | Playwright                     | Smoke test browser dan verifikasi endpoint       |
| **Linting & Formatting**     | ESLint 9 & Prettier            | Deteksi isu kode dan penyeragaman format         |
| **Container**                | Docker                         | Multi-stage build standalone runtime             |
| **CI/CD**                    | GitHub Actions                 | Pipeline otomasi pengujian kualitas kode         |

---

## Kebutuhan Sistem

- **Node.js**: Versi `^20.x` atau `^22.x` / `^24.x` (LTS disarankan)
- **pnpm**: Versi `12.x` (atau aktifkan via Corepack: `corepack enable`)
- **Docker**: Opsional (hanya jika menjalankan container lokal)

---

## Panduan Memulai

### 1. Kloning atau Gunakan Template

```bash
git clone <repository-url> my-app
cd my-app
```

### 2. Salin Konfigurasi Environment

```bash
cp .env.example .env.local
```

### 3. Pasang Dependensi

```bash
pnpm install
```

### 4. Jalankan Development Server

```bash
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000) pada browser Anda.

---

## Variabel Lingkungan

Konfigurasi disimpan di `.env.local` dan didefinisikan pada `.env.example`:

| Variabel              | Tipe | Akses           | Deskripsi                           | Default Contoh          |
| --------------------- | ---- | --------------- | ----------------------------------- | ----------------------- |
| `NODE_ENV`            | Enum | Server          | Mode eksekusi aplikasi              | `development`           |
| `NEXT_PUBLIC_APP_URL` | URL  | Client & Server | URL dasar aplikasi frontend         | `http://localhost:3000` |
| `API_BASE_URL`        | URL  | Server-only     | URL endpoint backend / upstream API | `http://localhost:4000` |

> [!IMPORTANT]
> Jangan pernah menambahkan kredensial atau rahasia ke variabel dengan prefiks `NEXT_PUBLIC_`, karena nilai tersebut akan dibundel ke kode JavaScript yang dikirim ke browser.

---

## Perintah yang Tersedia

| Perintah             | Deskripsi                                                          |
| -------------------- | ------------------------------------------------------------------ |
| `pnpm dev`           | Menjalankan server pengembangan Next.js                            |
| `pnpm build`         | Membuat production build aplikasi (standalone)                     |
| `pnpm start`         | Menjalankan server production hasil build                          |
| `pnpm lint`          | Memeriksa kepatuhan kode menggunakan ESLint                        |
| `pnpm lint:fix`      | Memperbaiki pelanggaran linting yang dapat diotomatisasi           |
| `pnpm format`        | Memformat kode menggunakan Prettier                                |
| `pnpm format:check`  | Memeriksa apakah semua file sesuai dengan format Prettier          |
| `pnpm typecheck`     | Memvalidasi tipe data TypeScript tanpa kompilasi                   |
| `pnpm test`          | Menjalankan unit dan component tests via Vitest                    |
| `pnpm test:watch`    | Menjalankan Vitest dalam mode interaktif watch                     |
| `pnpm test:coverage` | Menghasilkan laporan cakupan kode pengujian                        |
| `pnpm test:e2e`      | Menjalankan pengujian browser via Playwright                       |
| `pnpm check`         | Menjalankan format check, lint, typecheck, dan unit test sekaligus |

---

## Struktur Proyek

```text
├── .github/
│   └── workflows/
│       └── ci.yml               # Pipeline CI GitHub Actions
├── public/                      # Aset statis publik
│   └── images/
├── src/
│   ├── app/                     # Next.js App Router (UI Only)
│   │   ├── error.tsx            # Error boundary halaman
│   │   ├── global-error.tsx     # Error boundary root layout
│   │   ├── not-found.tsx        # Halaman 404
│   │   ├── loading.tsx          # UI loading fallback
│   │   ├── layout.tsx           # Root layout
│   │   ├── globals.css          # Styling global
│   │   └── page.tsx             # Server Component beranda
│   ├── components/              # Komponen bersama
│   │   ├── ui/                  # Komponen UI generik (Button, Badge)
│   │   └── shared/              # Komponen layout bersama (Header, Footer)
│   ├── features/                # Modul domain berbasis fitur
│   │   └── example/             # Contoh modul arsitektur fitur
│   │       ├── components/
│   │       ├── schemas/
│   │       ├── services/
│   │       ├── types/
│   │       └── index.ts
│   ├── lib/                     # Infrastruktur & utilitas global
│   │   ├── env.ts               # Validasi Zod environment
│   │   ├── logger.ts            # Structured JSON logger
│   │   └── utils.ts             # Helper utilitas murni
│   └── test/                    # Pengujian helper & setup
│       ├── setup.ts             # Setup Vitest matchers
│       └── helpers/             # Test render helpers
├── e2e/
│   └── smoke.spec.ts            # Playwright smoke test
├── .dockerignore
├── .env.example
├── .gitignore
├── .prettierignore
├── .prettierrc.json
├── AGENTS.md                    # Single source of truth standar koding
├── Dockerfile                   # Multi-stage non-root container file
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── tsconfig.json
└── vitest.config.mts
```

---

## Standar Koding & Pedoman AI

Seluruh standar pengembangan, konvensi penamaan, dan kebijakan dependensi dirangkum secara mendalam di dokumen [AGENTS.md](file:///c:/Users/itsrill/Projects/code-templates/nextjs-template/AGENTS.md).

Dokumen tersebut menjadi acuan tunggal bagi software engineer maupun AI agent saat melakukan refactoring atau menambahkan fitur baru.

---

## Pengujian

### Unit & Component Testing (Vitest)

```bash
# Menjalankan seluruh unit & component tests
pnpm test

# Menjalankan test dalam mode watch saat pengembangan
pnpm test:watch
```

### End-to-End Testing (Playwright)

```bash
# Pasang browser Playwright (hanya dijalankan pertama kali)
pnpm exec playwright install --with-deps chromium

# Jalankan smoke test
pnpm test:e2e
```

---

## Production Build & Docker

### Build Lokal

```bash
pnpm build
pnpm start
```

### Build & Jalankan Docker Container

```bash
# Membangun image container
docker build -t nextjs-starter:latest .

# Menjalankan container di port 3000
docker run -p 3000:3000 --env-file .env.local nextjs-starter:latest
```

---

## Checklist Kesiapan Produksi

Sebelum merilis aplikasi berbasis template ini ke lingkungan produksi, pastikan:

- [ ] Seluruh environment variables telah dikonfigurasi pada hosting/server dan lolos validasi `src/lib/env.ts`.
- [ ] Pemeriksaan menyeluruh `pnpm check` berhasil 100% tanpa error atau warning kritis.
- [ ] Production build `pnpm build` menghasilkan artefak standalone yang valid.
- [ ] Halaman utama, layout navigasi, dan error boundaries berfungsi dengan baik.
- [ ] Header keamanan pada `next.config.ts` telah diverifikasi sesuai kebutuhan aplikasi.
- [ ] Tidak ada kunci rahasia atau file kredensial yang masuk ke riwayat Git.

---

## Troubleshooting

- **Error validasi env saat startup**: Periksa apakah nilai `API_BASE_URL` dan `NEXT_PUBLIC_APP_URL` merupakan format URL yang valid (e.g. `http://...`).
- **Module not found `@/...`**: Pastikan `tsconfig.json` memiliki pemetaan path `"@/*": ["./src/*"]`.
- **Playwright gagal menjalankan browser**: Jalankan `pnpm exec playwright install chromium`.

---

## Lisensi

Didistribusikan di bawah lisensi MIT. Silakan gunakan template ini untuk kebutuhan komersial maupun personal.

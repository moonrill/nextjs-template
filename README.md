# Next.js Production-Ready Starter Template — Business Profile

Starter template Next.js khusus frontend dengan **Profil Business** yang dirancang untuk **aplikasi bisnis, dashboard, CRUD, dan interaksi API intensif**. Mengutamakan performa, arsitektur bersih, validasi ketat, pengelolaan state server, dan integrasi backend tanpa dependensi yang berlebihan.

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
- [Integrasi API Backend](#integrasi-api-backend)
- [Keamanan & Security Headers](#keamanan--security-headers)
- [Kualitas Kode & CI Pipeline](#kualitas-kode--ci-pipeline)
- [Production Build & Docker](#production-build--docker)
- [Checklist Kesiapan Produksi](#checklist-kesiapan-produksi)
- [Troubleshooting](#troubleshooting)
- [Lisensi](#lisensi)

---

## Fitur Utama

- **Next.js App Router & Server Components**: Arsitektur rendering modern dengan pemisahan tegas antara Server Components dan Client Components.
- **Strict Type Safety**: TypeScript dengan mode ketat (`strict: true`, `noUncheckedIndexedAccess: true`, `exactOptionalPropertyTypes: true`).
- **Feature-Based Architecture**: Pengelompokan kode berdasarkan domain fitur (`schemas`, `services`, `components`, `types`) untuk skalabilitas jangka panjang.
- **Form Management & Schema Validation**: **React Hook Form** terintegrasi dengan **Zod** melalui `@hookform/resolvers`.
- **Server State & Caching**: **TanStack Query** (React Query) untuk fetching, caching, revalidation, dan background sync.
- **High-Performance Data Tables**: **TanStack Table** siap pakai untuk sorting, filtering, dan pagination tabel data kompleks.
- **Modern Toast Notifications**: **Sonner** untuk notifikasi toast yang mulus dan elegan.
- **Resilient Native Fetch Client**: Wrapper `apiClient` dengan single-read body stream, lifecycle timeout terpadu, dan kontrak `ApiError` komprehensif.
- **Fail-Fast Environment Validation**: Validasi runtime variabel lingkungan tunggal menggunakan **Zod** sebelum aplikasi berjalan.
- **Structured JSON Logging**: Logger terstruktur dengan sanitasi otomatis untuk mencegah kebocoran kredensial atau token sensitif.
- **Security Baseline**: Konfigurasi header keamanan HTTP bawaan (`X-Frame-Options`, `HSTS preload`, `CSP`, `nosniff`, `Permissions-Policy`, `poweredByHeader: false`).
- **Multi-Stage Dockerfile**: Image container minimal dan aman dengan output `standalone` serta eksekusi di bawah user non-root (`nextjs`).
- **Automated CI Workflow**: GitHub Actions untuk verifikasi format, linting, typecheck, dan standalone build otomatis.

---

## Tech Stack (Profil Business)

| Kategori                   | Teknologi                    | Deskripsi                                        |
| -------------------------- | ---------------------------- | ------------------------------------------------ |
| **Framework**              | Next.js 16+ (App Router)     | Framework inti frontend dan rendering            |
| **UI Library**             | React 19                     | Fondasi UI komponen berbasis Server Components   |
| **Bahasa**                 | TypeScript 5+                | Static typing dengan strict mode                 |
| **Package Manager**        | pnpm 12+                     | Manajemen dependensi efisien dan terkunci        |
| **Styling**                | Tailwind CSS v4              | Utilitas styling modern tanpa runtime CSS        |
| **UI Components**          | shadcn/ui                    | Komponen UI headless & accessible terintegrasi   |
| **Form Management**        | React Hook Form              | Pengelolaan state form berkinerja tinggi         |
| **Schema Validation**      | Zod + `@hookform/resolvers`  | Validasi form dan data runtime pada batas sistem |
| **Server State & Caching** | TanStack Query (React Query) | Manajemen fetching, cache, dan sinkronisasi data |
| **Data Table**             | TanStack Table               | Pengaturan headless data table & pagination      |
| **Toast Notifications**    | Sonner                       | Notifikasi toast modern & ringan                 |
| **Icons**                  | Lucide React                 | Icon library modern dan ringan                   |
| **Linting & Formatting**   | ESLint 9 & Prettier          | Deteksi isu kode dan penyeragaman format         |
| **Container**              | Docker                       | Multi-stage build standalone runtime             |
| **CI/CD**                  | GitHub Actions               | Pipeline otomasi verifikasi kualitas kode        |

---

## Kebutuhan Sistem

- **Node.js**: Versi `26.x` (Default yang digunakan di Docker & CI workflow, minimum `^20.x`)
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

Konfigurasi disimpan di `.env.local` dan didefinisikan pada `.env.example`. Cukup gunakan satu variabel untuk URL endpoint backend API:

| Variabel              | Tipe | Akses           | Deskripsi                                                                   | Default Contoh          |
| --------------------- | ---- | --------------- | --------------------------------------------------------------------------- | ----------------------- |
| `NODE_ENV`            | Enum | Server          | Mode eksekusi aplikasi (`development`, `test`, `production`)                | `development`           |
| `NEXT_PUBLIC_APP_URL` | URL  | Client & Server | URL dasar aplikasi frontend (untuk canonical SEO & OpenGraph)               | `http://localhost:3000` |
| `NEXT_PUBLIC_API_URL` | URL  | Client & Server | URL backend API tunggal untuk seluruh request (Server Components & Browser) | `http://localhost:4000` |

> [!IMPORTANT]
> Jangan pernah menambahkan kredensial atau rahasia ke variabel dengan prefiks `NEXT_PUBLIC_`, karena nilai tersebut akan dibundel ke kode JavaScript yang dikirim ke browser.

---

## Perintah yang Tersedia

| Perintah            | Deskripsi                                                  |
| ------------------- | ---------------------------------------------------------- |
| `pnpm dev`          | Menjalankan server pengembangan Next.js                    |
| `pnpm build`        | Membuat production build aplikasi (standalone)             |
| `pnpm start`        | Menjalankan server production hasil build                  |
| `pnpm lint`         | Memeriksa kepatuhan kode menggunakan ESLint                |
| `pnpm lint:fix`     | Memperbaiki pelanggaran linting yang dapat diotomatisasi   |
| `pnpm format`       | Memformat kode menggunakan Prettier                        |
| `pnpm format:check` | Memeriksa apakah semua file sesuai dengan format Prettier  |
| `pnpm typecheck`    | Memvalidasi tipe data TypeScript tanpa kompilasi           |
| `pnpm check`        | Menjalankan format check, linting, dan typecheck sekaligus |

---

## Struktur Proyek

```text
├── .github/
│   └── workflows/
│       └── ci.yml               # Pipeline CI GitHub Actions
├── public/                      # Aset statis publik
│   └── images/
├── src/
│   ├── app/                     # Next.js App Router (UI & Routing Only)
│   │   ├── error.tsx            # Error boundary halaman
│   │   ├── global-error.tsx     # Error boundary root layout
│   │   ├── not-found.tsx        # Halaman 404
│   │   ├── loading.tsx          # UI loading fallback
│   │   ├── layout.tsx           # Root layout
│   │   ├── globals.css          # Styling global Tailwind CSS v4
│   │   └── page.tsx             # Server Component beranda
│   ├── components/              # Komponen bersama
│   │   ├── ui/                  # Komponen UI generik (Button, Badge, Select)
│   │   └── shared/              # Komponen layout bersama (Header, Footer)
│   ├── features/                # Modul domain berbasis fitur
│   │   └── example/             # Contoh modul arsitektur fitur
│   │       ├── components/
│   │       ├── schemas/
│   │       ├── services/
│   │       ├── types/
│   │       └── index.ts
│   └── lib/                     # Infrastruktur & utilitas global
│       ├── api-client.ts        # Resilient fetch wrapper & ApiError contract
│       ├── env.ts               # Validasi Zod environment fail-fast
│       ├── logger.ts            # Structured JSON logger tersanitasi
│       ├── seo.ts               # Generator metadata SEO & OpenGraph
│       └── utils.ts             # Helper utilitas murni
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
└── tsconfig.json
```

---

## Standar Koding & Pedoman AI

Seluruh standar pengembangan, konvensi penamaan, dan kebijakan dependensi dirangkum secara mendalam di dokumen [AGENTS.md](file:///c:/Users/itsrill/Projects/code-templates/nextjs-template/AGENTS.md).

Dokumen tersebut menjadi acuan tunggal bagi software engineer maupun AI agent saat melakukan refactoring atau menambahkan fitur baru.

---

## Integrasi API Backend

Aplikasi menggunakan wrapper native `fetch` terpusat melalui `apiClient` (`src/lib/api-client.ts`):

- **Tunggal & Selaras**: Menggunakan `NEXT_PUBLIC_API_URL` secara konsisten baik di Server Components, Server Actions, maupun Client Components.
- **Single-Read Body Parsing**: Body response dibaca tepat satu kali sebagai teks (`await response.text()`) lalu di-parse sebagai JSON aman, mencegah error `body stream already consumed` dan mendukung respons teks biasa maupun HTTP 204 No Content.
- **Full Lifecycle Timeout**: Timeout terpadu (default 10 detik via `AbortController`) yang melingkupi koneksi jaringan hingga pemrosesan stream body dan validasi schema selesai, dengan pembersihan timer otomatis di blok `finally`.
- **Kontrak Error Jelas (`ApiError`)**:
  - `kind`: Membedakan secara eksplisit `HTTP_ERROR`, `TIMEOUT`, `NETWORK_ERROR`, `ABORTED`, dan `SCHEMA_VALIDATION`.
  - Properti: `status`, `statusText`, `data`, `rawBody`, dan `originalError`.
  - Helper getters: `error.isHttpError`, `error.isTimeout`, `error.isNetworkError`, `error.isClientError`, `error.isServerError`, `error.isValidationError`.

---

## Keamanan & Security Headers

Header keamanan dikonfigurasi secara deklaratif di `next.config.ts`:

- **Content-Security-Policy (CSP)**: Mengatur whitelist sumber script, style, image, font, WebSocket, dan koneksi API.
- **Strict-Transport-Security (HSTS)**: `max-age=31536000; includeSubDomains; preload` (1 tahun).
- **X-Frame-Options**: `DENY` untuk mencegah clickjacking.
- **X-Content-Type-Options**: `nosniff` untuk mencegah MIME type sniffing.
- **Referrer-Policy**: `origin-when-cross-origin`.
- **Permissions-Policy**: Menonaktifkan camera, microphone, dan geolocation secara default.
- **Info Leak Hardening**: `poweredByHeader: false` untuk menyembunyikan signature server.

---

## Kualitas Kode & CI Pipeline

Workflow GitHub Actions (`.github/workflows/ci.yml`) menjalankan job pemeriksaan kualitas kode secara otomatis di runtime **Node.js 26**:

1. **Format Check**: Memeriksa kerapian kode (`pnpm format:check`).
2. **Lint**: Analisis kode statis (`pnpm lint`).
3. **Typecheck**: Validasi kompilasi TypeScript (`pnpm typecheck`).
4. **Production Build**: Memastikan aplikasi dapat dikompilasi ke standalone bundle (`pnpm build`).

---

## Production Build & Docker

### Build Lokal

```bash
pnpm build
pnpm start
```

### Build & Jalankan Docker Container

```bash
# Membangun image container dengan Node 26 Alpine
docker build -t nextjs-starter:latest .

# Menjalankan container di port 3000
docker run -p 3000:3000 --env-file .env.local nextjs-starter:latest
```

---

## Checklist Kesiapan Produksi

Sebelum merilis aplikasi berbasis template ini ke lingkungan produksi, pastikan:

- [ ] Seluruh environment variables (`NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_APP_URL`) telah dikonfigurasi pada server hosting dan lolos validasi `src/lib/env.ts`.
- [ ] Pemeriksaan menyeluruh `pnpm check` berhasil 100% tanpa error atau warning.
- [ ] Production build `pnpm build` menghasilkan artefak standalone yang valid.
- [ ] Halaman utama, layout navigasi, dan error boundaries berfungsi dengan baik.
- [ ] Header keamanan pada `next.config.ts` telah diverifikasi sesuai kebutuhan aplikasi.
- [ ] Tidak ada kunci rahasia atau file kredensial yang masuk ke riwayat Git.

---

## Troubleshooting

- **Error validasi env saat startup**: Periksa apakah nilai `NEXT_PUBLIC_API_URL` dan `NEXT_PUBLIC_APP_URL` merupakan format URL yang valid (e.g. `http://...` atau `https://...`).
- **Module not found `@/...`**: Pastikan `tsconfig.json` memiliki pemetaan path `"@/*": ["./src/*"]`.

---

## Lisensi

Didistribusikan di bawah lisensi MIT. Silakan gunakan template ini untuk kebutuhan komersial maupun personal.

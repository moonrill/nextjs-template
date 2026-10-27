import { CheckCircle2, Terminal, ShieldCheck, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CodePreview } from "@/features/showcase/components/CodePreview";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Testing Playground & Guide — Next.js Starter",
  description:
    "Dokumentasi dan pola pengujian otomatis: Unit Testing dengan Vitest, Component Testing dengan React Testing Library, dan alur E2E Playwright.",
});

export default function ShowcaseTestingPage() {
  const unitTestCode = `import { describe, it, expect, vi } from "vitest";
import { apiClient, ApiError } from "@/lib/api-client";

describe("apiClient() Unit Test", () => {
  it("melemparkan ApiError(408) jika request mengalami timeout", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation(
        () => new Promise((_, reject) => {
          const err = new Error("The operation was aborted");
          err.name = "AbortError";
          setTimeout(() => reject(err), 50);
        })
      )
    );

    await expect(
      apiClient("/test-timeout", { timeoutMs: 20 })
    ).rejects.toThrow(ApiError);
  });
});`;

  const componentTestCode = `import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ThemeProvider } from "@/components/providers";

describe("<ThemeToggle /> Component Test", () => {
  it("mengubah tema antarmuka saat tombol diklik", () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeToggle variant="button" />
      </ThemeProvider>
    );

    const toggleBtn = screen.getByRole("button", { name: /ganti tema/i });
    expect(toggleBtn).toBeInTheDocument();

    fireEvent.click(toggleBtn);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});`;

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          Testing Suites &{" "}
          <span className="gradient-text">Quality Assurance</span>
        </h1>
        <p className="max-w-3xl text-sm text-zinc-600 dark:text-zinc-400">
          Dokumentasi bagaimana template ini menjaga integritas kode melalui
          pengujian unit, pengujian komponen yang ramah aksesibilitas, dan
          spesifikasi E2E.
        </p>
      </div>

      {/* CLI Quick Reference Box */}
      <div className="glass-card rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800/80">
        <div className="flex items-center gap-2 mb-3">
          <Terminal className="h-4 w-4 text-indigo-500" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
            Perintah Pengujian di Terminal (CLI)
          </h3>
        </div>
        <div className="grid gap-2.5 sm:grid-cols-3 font-mono text-sm">
          <div className="rounded-xl bg-zinc-950 p-3.5 text-zinc-300">
            <span className="text-xs text-zinc-500 block mb-1">
              # Jalankan seluruh test sekali
            </span>
            <div className="text-emerald-400 font-semibold">pnpm test</div>
          </div>
          <div className="rounded-xl bg-zinc-950 p-3.5 text-zinc-300">
            <span className="text-xs text-zinc-500 block mb-1">
              # Mode watch saat koding
            </span>
            <div className="text-indigo-400 font-semibold">pnpm test:watch</div>
          </div>
          <div className="rounded-xl bg-zinc-950 p-3.5 text-zinc-300">
            <span className="text-xs text-zinc-500 block mb-1">
              # Audit format + lint + test
            </span>
            <div className="text-cyan-400 font-semibold">pnpm check</div>
          </div>
        </div>
      </div>

      {/* Section A: Unit Testing */}
      <section id="unit" className="space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-200/80 pb-2 dark:border-zinc-800/80">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              A. Unit Testing (Vitest v5)
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Pengujian fungsi murni, error mapping, sanitasi logger, dan schema
              Zod secara terisolasi.
            </p>
          </div>
          <Badge variant="success" className="gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" />
            22 Tests Passed
          </Badge>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="glass-card rounded-2xl p-4 border border-zinc-200/80 dark:border-zinc-800/80 space-y-1">
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              api-client.test.ts
            </span>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              8 tests • Verifikasi 200, 404, 500, timeout 408, parsing JSON, dan
              schema parsing.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-4 border border-zinc-200/80 dark:border-zinc-800/80 space-y-1">
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              logger.test.ts
            </span>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              2 tests • Sanitasi otomatis token, password, dan authorization
              header di file log.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-4 border border-zinc-200/80 dark:border-zinc-800/80 space-y-1">
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              seo.test.ts & utils.test.ts
            </span>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              6 tests • Konstruksi OpenGraph metadata dan helper tanggal
              formatDate.
            </p>
          </div>
        </div>

        <CodePreview
          code={unitTestCode}
          title="Unit Test Contoh: ApiError Timeout Handling"
          filePath="src/lib/api-client.test.ts"
        />
      </section>

      {/* Section B: Component Testing */}
      <section id="component" className="space-y-4">
        <div className="border-b border-zinc-200/80 pb-2 dark:border-zinc-800/80">
          <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            B. Component Testing (React Testing Library)
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Pengujian interaksi komponen dari sudut pandang pengguna nyata
            menggunakan Accessible Roles.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800/80 space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Prinsip React Testing Library yang Diterapkan:
          </h3>
          <ul className="space-y-2.5 text-sm text-zinc-600 dark:text-zinc-300">
            <li className="flex items-start gap-2.5">
              <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                <strong>Gunakan queries accessible:</strong> Utamakan{" "}
                <code>getByRole(&apos;button&apos;)</code>,{" "}
                <code>getByLabelText</code> daripada class CSS atau id internal
                yang rapuh.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                <strong>Uji perilaku bukan implementasi:</strong> Jangan menguji
                variabel state internal (misal <code>state.isOpen</code>),
                melainkan periksa apakah modal muncul di layar setelah tombol
                ditekan.
              </span>
            </li>
          </ul>
        </div>

        <CodePreview
          code={componentTestCode}
          title="Component Test Contoh: Theme Toggle Switcher"
          filePath="src/components/ui/theme-toggle.test.tsx"
        />
      </section>

      {/* Section C: E2E Testing */}
      <section id="e2e" className="space-y-4">
        <div className="border-b border-zinc-200/80 pb-2 dark:border-zinc-800/80">
          <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            C. End-to-End Testing (Playwright Blueprint)
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Spesifikasi alur pengujian lengkap dari halaman beranda hingga
            pengiriman formulir.
          </p>
        </div>

        {/* Visual Workflow Flow */}
        <div className="glass-card rounded-2xl p-6 border border-zinc-200/80 dark:border-zinc-800/80 space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Alur Otomatisasi Playwright:
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <div className="rounded-xl bg-zinc-100 px-3.5 py-2 font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              1. Buka Homepage (/)
            </div>
            <ArrowRight className="h-4 w-4 text-zinc-400" />
            <div className="rounded-xl bg-zinc-100 px-3.5 py-2 font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              2. Klik &quot;Jelajahi Showcase&quot;
            </div>
            <ArrowRight className="h-4 w-4 text-zinc-400" />
            <div className="rounded-xl bg-zinc-100 px-3.5 py-2 font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              3. Isi Form Invalid
            </div>
            <ArrowRight className="h-4 w-4 text-zinc-400" />
            <div className="rounded-xl bg-rose-50 px-3.5 py-2 font-medium text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">
              4. Cek Pesan Error Zod
            </div>
            <ArrowRight className="h-4 w-4 text-zinc-400" />
            <div className="rounded-xl bg-emerald-50 px-3.5 py-2 font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
              5. Submit Valid & Cek Toast
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

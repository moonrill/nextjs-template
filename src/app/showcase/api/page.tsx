"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CodePreview } from "@/features/showcase/components/CodePreview";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  FolderX,
  Loader2,
  RefreshCw,
  Send,
  ServerOff,
} from "lucide-react";
import { useState } from "react";

export default function ShowcaseApiPage() {
  const [method, setMethod] = useState<"GET" | "POST">("GET");
  const [selectedEndpoint, setSelectedEndpoint] =
    useState<string>("/api/demo/users");
  const [isLoading, setIsLoading] = useState(false);
  const [responseStatus, setResponseStatus] = useState<number | null>(200);
  const [responseDuration, setResponseDuration] = useState<number | null>(42);
  const [responsePayload, setResponsePayload] = useState<unknown>({
    status: "success",
    timestamp: "2026-10-26T12:00:00Z",
    data: [
      { id: 1, name: "Andi Pratama", role: "Admin", email: "andi@example.com" },
      { id: 2, name: "Budi Santoso", role: "User", email: "budi@example.com" },
    ],
  });
  const [copied, setCopied] = useState(false);

  // Request States preview control
  const [previewState, setPreviewState] = useState<
    "success" | "loading" | "empty" | "error"
  >("success");

  const handleSendSimulatedRequest = () => {
    setIsLoading(true);
    const startTime = performance.now();

    setTimeout(() => {
      const duration = Math.round(performance.now() - startTime + 35);
      setResponseDuration(duration);
      setIsLoading(false);

      switch (selectedEndpoint) {
        case "/api/demo/users/1":
          setResponseStatus(200);
          setResponsePayload({
            status: "success",
            data: {
              id: 1,
              name: "Andi Pratama",
              email: "andi@example.com",
              role: "Admin",
            },
          });
          break;
        case "/api/demo/not-found":
          setResponseStatus(404);
          setResponsePayload({
            error: "NotFound",
            message: "User dengan ID tersebut tidak ditemukan pada database.",
            statusCode: 404,
          });
          break;
        case "/api/demo/server-error":
          setResponseStatus(500);
          setResponsePayload({
            error: "InternalServerError",
            message:
              "Terjadi kesalahan yang tidak terduga pada upstream backend.",
            statusCode: 500,
          });
          break;
        case "/api/demo/invalid-json":
          setResponseStatus(422);
          setResponsePayload({
            error: "ZodValidationError",
            message: "Response data tidak memenuhi schema kontrak Zod.",
            issues: [{ path: ["email"], message: "Invalid email format" }],
          });
          break;
        case "/api/demo/timeout":
          setResponseStatus(408);
          setResponsePayload({
            error: "RequestTimeout",
            message:
              "Request timed out after 10000ms via AbortController signal.",
            statusCode: 408,
          });
          break;
        case "/api/demo/users":
        default:
          setResponseStatus(200);
          setResponsePayload({
            status: "success",
            total: 2,
            data: [
              {
                id: 1,
                name: "Andi Pratama",
                role: "Admin",
                email: "andi@example.com",
              },
              {
                id: 2,
                name: "Budi Santoso",
                role: "User",
                email: "budi@example.com",
              },
            ],
          });
          break;
      }
    }, 450);
  };

  const handleCopyResponse = async () => {
    try {
      await navigator.clipboard.writeText(
        JSON.stringify(responsePayload, null, 2)
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const apiClientCode = `import { apiClient, ApiError } from "@/lib/api-client";
import { userListSchema } from "@/features/example/schemas";

// Contoh pemanggilan API Client dengan Schema Validation & Error Contract
export async function fetchUsers() {
  try {
    const data = await apiClient("/users", {
      method: "GET",
      timeoutMs: 10000,
      schema: userListSchema, // Otomatis validasi Zod
    });
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.isHttpError) {
        console.error(\`HTTP \${error.status}: \${error.message}\`, error.data);
      } else if (error.isTimeout) {
        console.error("Permintaan timeout setelah 10 detik");
      } else if (error.isValidationError) {
        console.error("Data backend tidak memenuhi schema:", error.originalError);
      } else if (error.isNetworkError) {
        console.error("Gagal terhubung ke gateway backend:", error.message);
      }
    }
    throw error;
  }
}`;

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          Data & API <span className="gradient-text">Playground</span>
        </h1>
        <p className="max-w-3xl text-sm text-zinc-600 dark:text-zinc-400">
          Uji coba cara kerja <code>apiClient</code> berbasis native fetch,
          simulasi respons HTTP, penanganan timeout melalui{" "}
          <code>AbortController</code>, dan pola 4 kondisi data.
        </p>
      </div>

      {/* Part A: API Client Playground */}
      <section id="playground" className="space-y-6">
        <div className="border-b border-zinc-200/80 pb-3 dark:border-zinc-800/80">
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            A. API Client Playground
          </h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Simulasi lokal aman dengan daftar endpoint terbatas (terproteksi
            dari SSRF).
          </p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800/80 space-y-5">
          {/* Controls Bar */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Method Picker */}
            <div className="flex items-center rounded-xl border border-zinc-300 bg-zinc-100 p-1 dark:border-zinc-700 dark:bg-zinc-800">
              <button
                type="button"
                onClick={() => setMethod("GET")}
                className={`rounded-lg px-3.5 py-1.5 text-sm font-semibold transition cursor-pointer ${
                  method === "GET"
                    ? "bg-emerald-600 text-white"
                    : "text-zinc-600 dark:text-zinc-400"
                }`}
              >
                GET
              </button>
              <button
                type="button"
                onClick={() => setMethod("POST")}
                className={`rounded-lg px-3.5 py-1.5 text-sm font-semibold transition cursor-pointer ${
                  method === "POST"
                    ? "bg-indigo-600 text-white"
                    : "text-zinc-600 dark:text-zinc-400"
                }`}
              >
                POST
              </button>
            </div>

            {/* Endpoint Selector */}
            <div className="flex-1">
              <Select
                value={selectedEndpoint}
                onValueChange={(val) =>
                  setSelectedEndpoint(val ?? "/api/demo/users")
                }
              >
                <SelectTrigger className="w-full h-10 rounded-xl border border-zinc-300 bg-white px-3.5 py-2 text-sm font-mono text-zinc-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">
                  <SelectValue placeholder="Pilih endpoint" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="/api/demo/users">
                    GET /api/demo/users (200 OK - Daftar Pengguna)
                  </SelectItem>
                  <SelectItem value="/api/demo/users/1">
                    GET /api/demo/users/1 (200 OK - Detail Pengguna)
                  </SelectItem>
                  <SelectItem value="/api/demo/not-found">
                    GET /api/demo/not-found (404 Not Found)
                  </SelectItem>
                  <SelectItem value="/api/demo/server-error">
                    GET /api/demo/server-error (500 Server Error)
                  </SelectItem>
                  <SelectItem value="/api/demo/invalid-json">
                    GET /api/demo/invalid-json (422 Schema Invalid)
                  </SelectItem>
                  <SelectItem value="/api/demo/timeout">
                    GET /api/demo/timeout (408 Request Timeout)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Send Request Button */}
            <Button
              onClick={handleSendSimulatedRequest}
              disabled={isLoading}
              className="gap-2 bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Mengirim...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Request
                </>
              )}
            </Button>
          </div>

          {/* Response Inspector Box */}
          <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-950 text-zinc-100 shadow-inner dark:border-zinc-800">
            {/* Status bar */}
            <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/80 px-4 py-2.5 text-sm">
              <div className="flex items-center gap-3">
                <span className="font-mono text-zinc-400">
                  {method} {selectedEndpoint}
                </span>
                {responseStatus && (
                  <Badge
                    variant={responseStatus === 200 ? "success" : "destructive"}
                    className="text-xs font-mono"
                  >
                    Status: {responseStatus}{" "}
                    {responseStatus === 200
                      ? "OK"
                      : responseStatus === 404
                        ? "Not Found"
                        : responseStatus === 408
                          ? "Timeout"
                          : "Error"}
                  </Badge>
                )}
                {responseDuration !== null && (
                  <span className="flex items-center gap-1 text-xs text-zinc-400">
                    <Clock className="h-3.5 w-3.5" /> {responseDuration} ms
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={handleCopyResponse}
                className="flex items-center gap-1.5 rounded-lg bg-zinc-800 px-3 py-1.5 text-sm text-zinc-300 hover:bg-zinc-700 transition cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy JSON</span>
                  </>
                )}
              </button>
            </div>

            {/* Response Body */}
            <div className="max-h-64 overflow-y-auto p-4 font-mono text-sm leading-relaxed text-emerald-400">
              <pre>{JSON.stringify(responsePayload, null, 2)}</pre>
            </div>
          </div>
        </div>

        <CodePreview
          code={apiClientCode}
          title="Contoh Penggunaan apiClient Terpusat"
          filePath="src/lib/api-client.ts"
        />
      </section>

      {/* Part B: Request States Pattern */}
      <section id="states" className="space-y-6">
        <div className="border-b border-zinc-200/80 pb-3 dark:border-zinc-800/80">
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            B. Request States UI Pattern
          </h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Pastikan seluruh modul memiliki UI representatif untuk 4 kondisi
            data lifecycle.
          </p>
        </div>

        {/* State Toggle Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {(
            [
              { id: "success", label: "Success State", icon: CheckCircle2 },
              { id: "loading", label: "Loading State", icon: Loader2 },
              { id: "empty", label: "Empty State", icon: FolderX },
              { id: "error", label: "Error State", icon: AlertTriangle },
            ] as const
          ).map((st) => {
            const Icon = st.icon;
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => setPreviewState(st.id)}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium capitalize transition cursor-pointer ${
                  previewState === st.id
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "glass-card text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${st.id === "loading" && previewState === "loading" ? "animate-spin" : ""}`}
                />
                <span>{st.label}</span>
              </button>
            );
          })}
        </div>

        {/* State Preview Box */}
        <div className="glass-card flex min-h-55 flex-col items-center justify-center rounded-2xl p-8 border border-zinc-200/80 dark:border-zinc-800/80 text-center">
          {previewState === "loading" && (
            <div className="w-full max-w-md space-y-3">
              <div className="flex items-center justify-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Memuat data dari backend...</span>
              </div>
              <div className="h-4 w-3/4 mx-auto rounded-full bg-zinc-200/80 animate-pulse dark:bg-zinc-800" />
              <div className="h-4 w-full rounded-full bg-zinc-200/80 animate-pulse dark:bg-zinc-800" />
              <div className="h-4 w-1/2 mx-auto rounded-full bg-zinc-200/80 animate-pulse dark:bg-zinc-800" />
            </div>
          )}

          {previewState === "success" && (
            <div className="space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100">
                Data Berhasil Dimuat
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm">
                Payload response telah tervalidasi dengan Zod schema dan
                di-cache otomatis oleh TanStack Query.
              </p>
            </div>
          )}

          {previewState === "empty" && (
            <div className="space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                <FolderX className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100">
                Belum Ada Data Tersedia
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm">
                Tidak ada entitas yang sesuai dengan kriteria filter saat ini.
              </p>
              <Button variant="outline" className="gap-2 cursor-pointer">
                <RefreshCw className="h-4 w-4" />
                Refresh Data
              </Button>
            </div>
          )}

          {previewState === "error" && (
            <div className="space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
                <ServerOff className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100">
                Gagal Mengambil Data
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm">
                Koneksi ke service backend terputus atau mengembalikan status
                500.
              </p>
              <Button variant="destructive" className="gap-2 cursor-pointer">
                <RefreshCw className="h-4 w-4" />
                Coba Lagi (Retry)
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Part C: Error Handling Matrix */}
      <section id="errors" className="space-y-6">
        <div className="border-b border-zinc-200/80 pb-3 dark:border-zinc-800/80">
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            C. HTTP Error Handling Matrix
          </h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Pedoman penanganan error yang aman dan transparan bagi pengguna.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="glass-card rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800/80 space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant="destructive">HTTP 400</Badge>
              <span className="text-xs text-zinc-400 font-mono">
                Bad Request
              </span>
            </div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Validasi Parameter Gagal
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Tampilkan pesan error spesifik per field dari response payload
              backend langsung di samping form input.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800/80 space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant="destructive">HTTP 401</Badge>
              <span className="text-xs text-zinc-400 font-mono">
                Unauthorized
              </span>
            </div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Token Kedaluwarsa
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Hapus token sesi dari client storage dan arahkan pengguna ke
              halaman login dengan query returnUrl.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800/80 space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant="destructive">HTTP 403</Badge>
              <span className="text-xs text-zinc-400 font-mono">Forbidden</span>
            </div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Akses Ditolak
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Tampilkan fallback UI hak akses tanpa mengekspos struktur resource
              backend yang dilindungi.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800/80 space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant="destructive">HTTP 404</Badge>
              <span className="text-xs text-zinc-400 font-mono">Not Found</span>
            </div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Resource Tidak Ada
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Tampilkan custom not-found state dengan tombol kembali ke
              dashboard atau halaman daftar.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800/80 space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant="destructive">HTTP 500</Badge>
              <span className="text-xs text-zinc-400 font-mono">
                Server Error
              </span>
            </div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Internal Server Error
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Tangkap di <code>error.tsx</code> boundary, sembunyikan stack
              trace di production, dan log via structured logger.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800/80 space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant="outline">HTTP 408 / Timeout</Badge>
              <span className="text-xs text-zinc-400 font-mono">
                AbortController
              </span>
            </div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Network Timeout (10s)
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Otomatis dibatalkan setelah 10 detik oleh{" "}
              <code>AbortController.abort()</code> untuk mencegah memory leak.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

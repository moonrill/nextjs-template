"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  Loader2,
} from "lucide-react";
import { CodePreview } from "./CodePreview";

export function UiFeedbackSection() {
  const sampleCode = `import { toast } from "sonner";

// Pemicu toast notifikasi
toast.success("Profil berhasil diperbarui!");
toast.error("Gagal terhubung ke backend server.");
toast.warning("Sesi login Anda akan berakhir dalam 5 menit.");
toast.info("Versi baru v1.1.0 tersedia.");

// Async promise loading toast
toast.promise(saveUserData(), {
  loading: "Menyimpan data...",
  success: (data) => "Data berhasil disimpan!",
  error: "Gagal menyimpan data.",
});`;

  const handlePromiseToast = () => {
    const promise = new Promise((resolve) => {
      setTimeout(() => resolve({ name: "Demo User" }), 2000);
    });

    toast.promise(promise, {
      loading: "Menghubungi service backend NestJS...",
      success: () => "Data berhasil disinkronkan ke server!",
      error: "Terjadi kesalahan pada backend.",
    });
  };

  return (
    <section id="notifications" className="space-y-6 pt-4">
      <div className="border-b border-zinc-200/80 pb-3 dark:border-zinc-800/80">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Feedback & Notifications (Sonner)
        </h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Umpan balik toast notifikasi modern yang non-intrusif, halus, dan
          mendukung multi-stacking.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {/* Success */}
        <div className="glass-card flex flex-col justify-between rounded-2xl p-4">
          <div className="space-y-1.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Success Toast
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Konfirmasi berhasil operasi create, update, atau delete.
            </p>
          </div>
          <div className="mt-4">
            <Button
              variant="outline"
              className="w-full text-sm text-emerald-600 border-emerald-500/30 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 cursor-pointer"
              onClick={() =>
                toast.success("Berhasil!", {
                  description: "Data pengguna berhasil diperbarui di database.",
                })
              }
            >
              Trigger Success
            </Button>
          </div>
        </div>

        {/* Error */}
        <div className="glass-card flex flex-col justify-between rounded-2xl p-4">
          <div className="space-y-1.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <AlertCircle className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Error Toast
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Pemberitahuan kegagalan request atau validasi sistem.
            </p>
          </div>
          <div className="mt-4">
            <Button
              variant="outline"
              className="w-full text-sm text-rose-600 border-rose-500/30 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
              onClick={() =>
                toast.error("Gagal Request!", {
                  description:
                    "HTTP 500: Terjadi gangguan pada internal server.",
                })
              }
            >
              Trigger Error
            </Button>
          </div>
        </div>

        {/* Warning */}
        <div className="glass-card flex flex-col justify-between rounded-2xl p-4">
          <div className="space-y-1.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Warning Toast
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Peringatan batas kuota atau masa kedaluwarsa sesi.
            </p>
          </div>
          <div className="mt-4">
            <Button
              variant="outline"
              className="w-full text-sm text-amber-600 border-amber-500/30 hover:bg-amber-50 dark:hover:bg-amber-950/40 cursor-pointer"
              onClick={() =>
                toast.warning("Peringatan Sesi", {
                  description:
                    "Token otentikasi akan kedaluwarsa dalam 5 menit.",
                })
              }
            >
              Trigger Warning
            </Button>
          </div>
        </div>

        {/* Info */}
        <div className="glass-card flex flex-col justify-between rounded-2xl p-4">
          <div className="space-y-1.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Info className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Info Toast
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Informasi pembaruan latar belakang atau tips fitur.
            </p>
          </div>
          <div className="mt-4">
            <Button
              variant="outline"
              className="w-full text-sm text-blue-600 border-blue-500/30 hover:bg-blue-50 dark:hover:bg-blue-950/40 cursor-pointer"
              onClick={() =>
                toast.info("Pembaruan Sistem", {
                  description:
                    "Starter template v1.0 telah menggunakan strict TypeScript.",
                })
              }
            >
              Trigger Info
            </Button>
          </div>
        </div>

        {/* Async Promise */}
        <div className="glass-card flex flex-col justify-between rounded-2xl p-4">
          <div className="space-y-1.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Loader2 className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Promise State
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Melacak proses asinkron dari loading hingga selesai.
            </p>
          </div>
          <div className="mt-4">
            <Button
              variant="default"
              className="w-full text-sm bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
              onClick={handlePromiseToast}
            >
              Coba Async Promise
            </Button>
          </div>
        </div>
      </div>

      <CodePreview
        code={sampleCode}
        title="Penggunaan Sonner Toast"
        filePath="src/components/providers/index.tsx"
      />
    </section>
  );
}

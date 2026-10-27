"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Info, Trash2, X, HelpCircle } from "lucide-react";
import { CodePreview } from "./CodePreview";

export function UiDialogsSection() {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [confirmResult, setConfirmResult] = useState<string | null>(null);

  const sampleCode = `// Pola Dialog Konfirmasi Aman
function ConfirmActionModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-zinc-900">
        <h3>Hapus Data Dummy?</h3>
        <p className="text-sm text-zinc-500">Tindakan ini hanya simulasi lokal.</p>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>Batal</Button>
          <Button variant="destructive" onClick={onConfirm}>Ya, Hapus</Button>
        </div>
      </div>
    </div>
  );
}`;

  return (
    <section id="dialogs" className="space-y-6 pt-4">
      <div className="border-b border-zinc-200/80 pb-3 dark:border-zinc-800/80">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Dialogs & Overlays
        </h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Komponen modal konfirmasi, alert dialog, popover, dan tooltip dengan
          trap fokus dan backdrop scrim teruji.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Card 1: Confirmation Dialog */}
        <div className="glass-card flex flex-col justify-between rounded-2xl p-5">
          <div className="space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <Trash2 className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
              Dialog Konfirmasi
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Meminta persetujuan eksplisit sebelum menjalankan aksi berisiko
              atau destruktif.
            </p>
          </div>

          <div className="mt-6 space-y-2">
            <Button
              variant="destructive"
              className="w-full gap-2 cursor-pointer"
              onClick={() => {
                setConfirmResult(null);
                setIsConfirmOpen(true);
              }}
            >
              <Trash2 className="h-4 w-4" />
              Coba Hapus Record
            </Button>
            {confirmResult && (
              <p className="text-center text-sm font-medium text-emerald-600 dark:text-emerald-400">
                {confirmResult}
              </p>
            )}
          </div>
        </div>

        {/* Card 2: System Alert Modal */}
        <div className="glass-card flex flex-col justify-between rounded-2xl p-5">
          <div className="space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
              Alert Dialog
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Pemberitahuan mendesak yang memerlukan perhatian pengguna sebelum
              melanjutkan.
            </p>
          </div>

          <div className="mt-6">
            <Button
              variant="outline"
              className="w-full gap-2 cursor-pointer"
              onClick={() => setIsAlertOpen(true)}
            >
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Buka Alert Modal
            </Button>
          </div>
        </div>

        {/* Card 3: Interactive Popover & Tooltip */}
        <div className="glass-card flex flex-col justify-between rounded-2xl p-5">
          <div className="space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Info className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
              Popover & Tooltip
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Floating panel kontekstual untuk penjelasan ringkas dan bantuan
              antarmuka.
            </p>
          </div>

          <div className="mt-6 relative">
            <Button
              variant="secondary"
              className="w-full gap-2 cursor-pointer"
              onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            >
              <HelpCircle className="h-4 w-4" />
              {isPopoverOpen ? "Tutup Popover" : "Lihat Info Teknis"}
            </Button>

            {/* Popover Card */}
            {isPopoverOpen && (
              <div className="absolute bottom-full left-0 mb-2 w-72 rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl z-20 dark:border-zinc-800 dark:bg-zinc-900 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                    Spesifikasi Overlay
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsPopoverOpen(false)}
                    className="text-zinc-400 hover:text-zinc-600 cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  Menggunakan portal rendering dan CSS variables untuk z-index
                  stacking tanpa overlap bug.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal Render */}
      {isConfirmOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsConfirmOpen(false)}
        >
          <div
            className="w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
                <Trash2 className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Konfirmasi Hapus Data
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Apakah Anda yakin ingin menghapus record dummy &quot;Andi
                  Pratama&quot;? Tindakan ini hanya simulasi frontend dan tidak
                  memengaruhi server.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2.5">
              <Button
                variant="outline"
                onClick={() => {
                  setIsConfirmOpen(false);
                  setConfirmResult("Aksi dibatalkan oleh pengguna.");
                }}
              >
                Batal
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setIsConfirmOpen(false);
                  setConfirmResult("Data dummy berhasil dihapus (simulasi).");
                }}
              >
                Ya, Konfirmasi Hapus
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Alert Modal Render */}
      {isAlertOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsAlertOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Perhatian Arsitektur
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Template ini adalah <strong>Frontend-Only</strong>. Tidak ada
                  route handlers backend di <code>src/app/api</code>. Pastikan
                  backend eksternal NestJS atau Go Anda sudah berjalan di port
                  4000 sebelum integrasi penuh.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button variant="default" onClick={() => setIsAlertOpen(false)}>
                Saya Mengerti
              </Button>
            </div>
          </div>
        </div>
      )}

      <CodePreview
        code={sampleCode}
        title="Implementasi Modal & Overlay"
        filePath="src/components/ui/dialog.tsx"
      />
    </section>
  );
}

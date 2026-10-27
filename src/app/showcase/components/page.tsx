import { UiButtonsSection } from "@/features/showcase/components/UiButtonsSection";
import { UiInputsSection } from "@/features/showcase/components/UiInputsSection";
import { UiDialogsSection } from "@/features/showcase/components/UiDialogsSection";
import { UiFeedbackSection } from "@/features/showcase/components/UiFeedbackSection";
import { DataTableSection } from "@/features/showcase/components/DataTableSection";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "UI Components Playground — Next.js Starter",
  description:
    "Eksplorasi dan coba langsung komponen antarmuka pengguna: Tombol, Form inputs, Dialogs, Notifikasi Sonner, dan TanStack Table.",
});

export default function ShowcaseComponentsPage() {
  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          UI Components <span className="gradient-text">Playground</span>
        </h1>
        <p className="max-w-3xl text-sm text-zinc-600 dark:text-zinc-400">
          Uji perilaku interaktif, visualisasi state, dan salin contoh kode
          implementasi untuk komponen-komponen antarmuka yang siap digunakan
          dalam proyek Anda.
        </p>

        {/* Quick Section Anchor Pills */}
        <div className="flex flex-wrap gap-2 pt-3">
          <a
            href="#buttons"
            className="cursor-pointer rounded-full bg-zinc-100 px-3.5 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 transition"
          >
            # Buttons & Actions
          </a>
          <a
            href="#inputs"
            className="cursor-pointer rounded-full bg-zinc-100 px-3.5 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 transition"
          >
            # Forms & Inputs
          </a>
          <a
            href="#dialogs"
            className="cursor-pointer rounded-full bg-zinc-100 px-3.5 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 transition"
          >
            # Dialogs & Overlays
          </a>
          <a
            href="#notifications"
            className="cursor-pointer rounded-full bg-zinc-100 px-3.5 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 transition"
          >
            # Notifications
          </a>
          <a
            href="#data-table"
            className="cursor-pointer rounded-full bg-zinc-100 px-3.5 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 transition"
          >
            # TanStack Table
          </a>
        </div>
      </div>

      {/* Sections */}
      <UiButtonsSection />
      <UiInputsSection />
      <UiDialogsSection />
      <UiFeedbackSection />
      <DataTableSection />
    </div>
  );
}

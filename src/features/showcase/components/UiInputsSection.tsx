"use client";

import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { CodePreview } from "./CodePreview";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function UiInputsSection() {
  const [showPassword, setShowPassword] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [showHelper, setShowHelper] = useState(true);

  // Values
  const [textVal, setTextVal] = useState("John Doe");
  const [emailVal, setEmailVal] = useState("developer@example.com");
  const [passwordVal, setPasswordVal] = useState("Secr3tP@ssw0rd");
  const [selectVal, setSelectVal] = useState("frontend");
  const [isChecked, setIsChecked] = useState(true);
  const [isSwitched, setIsSwitched] = useState(true);

  const sampleCode = `// Input dengan penanganan error dan helper
<div className="space-y-1.5">
  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
    Email Perusahaan
  </label>
  <input
    type="email"
    placeholder="you@company.com"
    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-900"
  />
  <p className="text-xs text-zinc-500">Kami tidak akan membagikan email Anda.</p>
</div>`;

  return (
    <section id="inputs" className="space-y-6 pt-4">
      <div className="border-b border-zinc-200/80 pb-3 dark:border-zinc-800/80">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Forms & Inputs
        </h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Elemen input antarmuka yang bersih, accessible, dan konsisten dengan
          sistem token Tailwind CSS v4.
        </p>
      </div>

      {/* Simulator Action Bar */}
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-zinc-200/80 bg-zinc-50/80 p-3 dark:border-zinc-800/80 dark:bg-zinc-900/60">
        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mr-2">
          Uji Kondisi Input:
        </span>

        <button
          type="button"
          onClick={() => setHasError(!hasError)}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition cursor-pointer ${
            hasError
              ? "bg-rose-600 text-white"
              : "border border-zinc-300 bg-white text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
          }`}
        >
          {hasError ? "Nonaktifkan Error" : "Simulasikan Validasi Error"}
        </button>

        <button
          type="button"
          onClick={() => setIsDisabled(!isDisabled)}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition cursor-pointer ${
            isDisabled
              ? "bg-zinc-700 text-white"
              : "border border-zinc-300 bg-white text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
          }`}
        >
          Disabled: {isDisabled ? "ON" : "OFF"}
        </button>

        <button
          type="button"
          onClick={() => setShowHelper(!showHelper)}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 cursor-pointer"
        >
          Helper Text: {showHelper ? "Tampil" : "Sembunyi"}
        </button>
      </div>

      {/* Inputs Showcase Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Text Input */}
        <div className="glass-card rounded-2xl p-5 space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Nama Lengkap
          </label>
          <input
            type="text"
            value={textVal}
            onChange={(e) => setTextVal(e.target.value)}
            disabled={isDisabled}
            className={`w-full rounded-xl border px-3.5 py-2 text-sm transition focus:outline-hidden ${
              hasError
                ? "border-rose-500 bg-rose-50/20 text-rose-900 focus:ring-2 focus:ring-rose-500/20 dark:text-rose-100"
                : "border-zinc-300 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-900"
            } disabled:cursor-not-allowed disabled:opacity-50`}
            placeholder="Ketik nama Anda"
          />
          {hasError ? (
            <p className="flex items-center gap-1.5 text-xs text-rose-500 font-medium">
              <AlertCircle className="h-4 w-4" />
              Nama wajib diisi minimal 3 karakter.
            </p>
          ) : showHelper ? (
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Sesuai dengan nama pada identitas resmi.
            </p>
          ) : null}
        </div>

        {/* Email Input */}
        <div className="glass-card rounded-2xl p-5 space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Alamat Email
          </label>
          <input
            type="email"
            value={emailVal}
            onChange={(e) => setEmailVal(e.target.value)}
            disabled={isDisabled}
            className={`w-full rounded-xl border px-3.5 py-2 text-sm transition focus:outline-hidden ${
              hasError
                ? "border-rose-500 bg-rose-50/20 text-rose-900 focus:ring-2 focus:ring-rose-500/20 dark:text-rose-100"
                : "border-zinc-300 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-900"
            } disabled:cursor-not-allowed disabled:opacity-50`}
            placeholder="developer@company.com"
          />
          {hasError ? (
            <p className="flex items-center gap-1.5 text-xs text-rose-500 font-medium">
              <AlertCircle className="h-4 w-4" />
              Format email tidak valid.
            </p>
          ) : showHelper ? (
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Digunakan untuk notifikasi status sistem.
            </p>
          ) : null}
        </div>

        {/* Password Input with Visibility Toggle */}
        <div className="glass-card rounded-2xl p-5 space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Kata Sandi
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={passwordVal}
              onChange={(e) => setPasswordVal(e.target.value)}
              disabled={isDisabled}
              className={`w-full rounded-xl border pr-10 pl-3.5 py-2 text-sm transition focus:outline-hidden ${
                hasError
                  ? "border-rose-500 bg-rose-50/20 text-rose-900 focus:ring-2 focus:ring-rose-500/20 dark:text-rose-100"
                  : "border-zinc-300 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-900"
              } disabled:cursor-not-allowed disabled:opacity-50`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {hasError && (
            <p className="text-xs text-rose-500 font-medium">
              Kata sandi harus mengandung minimal 8 karakter.
            </p>
          )}
        </div>

        {/* Select Dropdown */}
        <div className="glass-card rounded-2xl p-5 space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Peran Pengembang
          </label>
          <Select
            value={selectVal}
            onValueChange={(val) => setSelectVal(val ?? "frontend")}
            disabled={isDisabled}
          >
            <SelectTrigger className="w-full h-10 rounded-xl border border-zinc-300 bg-white px-3.5 py-2 text-sm transition dark:border-zinc-700 dark:bg-zinc-900">
              <SelectValue placeholder="Pilih peran" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="frontend">
                Frontend Architect (Next.js)
              </SelectItem>
              <SelectItem value="backend">
                Backend Engineer (NestJS / Go)
              </SelectItem>
              <SelectItem value="fullstack">Fullstack Lead</SelectItem>
              <SelectItem value="qa">QA Automation Engineer</SelectItem>
            </SelectContent>
          </Select>
          {showHelper && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Hak akses sistem ditentukan dari peran ini.
            </p>
          )}
        </div>

        {/* Checkbox & Switch Toggles */}
        <div className="glass-card rounded-2xl p-5 space-y-4 md:col-span-2">
          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            Selection Controls
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Checkbox */}
            <label className="flex items-start gap-3 rounded-xl border border-zinc-200/80 p-3.5 transition hover:bg-zinc-50/50 cursor-pointer dark:border-zinc-800 dark:hover:bg-zinc-900/40">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                disabled={isDisabled}
                className="mt-0.5 h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500 dark:border-zinc-700"
              />
              <div className="text-sm">
                <span className="font-medium text-zinc-800 dark:text-zinc-200">
                  Aktifkan Auto-Sync TanStack Query
                </span>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Refetch query di latar belakang saat jendela kembali fokus.
                </p>
              </div>
            </label>

            {/* Switch */}
            <div className="flex items-center justify-between rounded-xl border border-zinc-200/80 p-3.5 dark:border-zinc-800">
              <div className="text-sm">
                <span className="font-medium text-zinc-800 dark:text-zinc-200">
                  Logging Sanitasi Sensitif
                </span>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Saring password & authorization token dari output log.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={isSwitched}
                disabled={isDisabled}
                onClick={() => setIsSwitched(!isSwitched)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  isSwitched ? "bg-indigo-600" : "bg-zinc-300 dark:bg-zinc-700"
                } disabled:cursor-not-allowed disabled:opacity-50`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out mt-0.5 ml-0.5 ${
                    isSwitched ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <CodePreview
        code={sampleCode}
        title="Pola Input & Form Semantik"
        filePath="src/components/ui/input.tsx"
      />
    </section>
  );
}

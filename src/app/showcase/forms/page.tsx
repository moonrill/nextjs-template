"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CodePreview } from "@/features/showcase/components/CodePreview";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Check, Loader2, RotateCcw, UserPlus } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// --- Form B Schema (Zod Validation) ---
const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(3, "Nama lengkap harus berisi minimal 3 karakter.")
      .max(50, "Nama terlalu panjang (maks 50 karakter)."),
    email: z
      .string()
      .min(1, "Alamat email wajib diisi.")
      .email("Format alamat email tidak valid."),
    password: z
      .string()
      .min(8, "Kata sandi minimal 8 karakter.")
      .regex(/[A-Z]/, "Harus mengandung minimal satu huruf kapital.")
      .regex(/[0-9]/, "Harus mengandung minimal satu angka."),
    confirmPassword: z.string().min(1, "Konfirmasi kata sandi wajib diisi."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi kata sandi tidak cocok dengan kata sandi.",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

// --- Form C Schema (Advanced Multi-Field Form) ---
const advancedUserSchema = z.object({
  name: z.string().min(2, "Nama wajib diisi minimal 2 karakter."),
  email: z.string().email("Email tidak valid."),
  role: z.enum(["admin", "editor", "viewer"]),
  notifications: z.boolean(),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "Anda wajib menyetujui syarat & ketentuan.",
  }),
});

type AdvancedUserFormData = z.infer<typeof advancedUserSchema>;

export default function ShowcaseFormsPage() {
  // Form A State (Basic Form)
  const [basicName, setBasicName] = useState("");
  const [basicEmail, setBasicEmail] = useState("");
  const [basicSubmitted, setBasicSubmitted] = useState<string | null>(null);

  // Form B (React Hook Form + Zod)
  const {
    register: registerB,
    handleSubmit: handleSubmitB,
    reset: resetB,
    formState: { errors: errorsB, isSubmitting: isSubmittingB },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  // Form C (Advanced Form)
  const {
    register: registerC,
    control: controlC,
    handleSubmit: handleSubmitC,
    reset: resetC,
    formState: { errors: errorsC, isSubmitting: isSubmittingC },
  } = useForm<AdvancedUserFormData>({
    resolver: zodResolver(advancedUserSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "editor",
      notifications: true,
      agreeTerms: false,
    },
  });

  const [submittedDataB, setSubmittedDataB] = useState<RegisterFormData | null>(
    null
  );
  const [submittedDataC, setSubmittedDataC] =
    useState<AdvancedUserFormData | null>(null);

  // Handler Form A
  const handleBasicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!basicName || !basicEmail) {
      toast.error("Mohon isi nama dan email.");
      return;
    }
    setBasicSubmitted(`Data tersimpan: ${basicName} (${basicEmail})`);
    toast.success("Form Dasar Berhasil Disubmit!");
  };

  // Handler Form B
  const onRegisterSubmit = async (data: RegisterFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmittedDataB(data);
    toast.success("Validasi Zod Berhasil!", {
      description: `Akun untuk ${data.fullName} berhasil divalidasi.`,
    });
  };

  // Handler Form C
  const onAdvancedSubmit = async (data: AdvancedUserFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmittedDataC(data);
    toast.success("User Baru Berhasil Dibuat!", {
      description: `Peran: ${data.role.toUpperCase()} • Email: ${data.email}`,
    });
  };

  const zodCodeExample = `import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  fullName: z.string().min(3, "Minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(8, "Minimal 8 karakter"),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
});

export function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
  });

  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <input {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}
    </form>
  );
}`;

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          Forms & Validation <span className="gradient-text">Playground</span>
        </h1>
        <p className="max-w-3xl text-sm text-zinc-600 dark:text-zinc-400">
          Pola implementasi formulir terstruktur menggunakan{" "}
          <code>react-hook-form</code> dan <code>zod</code>. Validasi dilakukan
          sepenuhnya di client secara deklaratif dan type-safe.
        </p>
      </div>

      {/* Form A: Basic Form */}
      <section id="basic-form" className="space-y-4">
        <div className="border-b border-zinc-200/80 pb-2 dark:border-zinc-800/80">
          <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            A. Basic Form
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Formulir sederhana dengan validasi lokal instan dan umpan balik
            submit.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 max-w-xl border border-zinc-200/80 dark:border-zinc-800/80">
          <form onSubmit={handleBasicSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={basicName}
                onChange={(e) => setBasicName(e.target.value)}
                placeholder="Misal: Andi Pratama"
                className="w-full h-10 rounded-xl border border-zinc-300 bg-white px-3.5 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Alamat Email
              </label>
              <input
                type="email"
                value={basicEmail}
                onChange={(e) => setBasicEmail(e.target.value)}
                placeholder="andi@example.com"
                className="w-full h-10 rounded-xl border border-zinc-300 bg-white px-3.5 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-900"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
            >
              Submit Form Dasar
            </Button>

            {basicSubmitted && (
              <div className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300">
                {basicSubmitted}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Form B: Zod Schema Validation */}
      <section id="zod-form" className="space-y-4">
        <div className="border-b border-zinc-200/80 pb-2 dark:border-zinc-800/80">
          <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            B. Form dengan Zod Schema Validation
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Validasi ketat dengan Zod: Email valid, password minimal 8 karakter
            dengan huruf kapital & angka, serta konfirmasi password cocok.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="glass-card rounded-2xl p-6 lg:col-span-7 border border-zinc-200/80 dark:border-zinc-800/80">
            <form
              onSubmit={handleSubmitB(onRegisterSubmit)}
              className="space-y-4"
            >
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Nama Lengkap (min 3 huruf)
                </label>
                <input
                  {...registerB("fullName")}
                  placeholder="Budi Santoso"
                  className={`w-full h-10 rounded-xl border px-3.5 py-2 text-sm outline-none transition ${
                    errorsB.fullName
                      ? "border-rose-500 bg-rose-50/20 text-rose-900 dark:text-rose-200"
                      : "border-zinc-300 bg-white focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
                  }`}
                />
                {errorsB.fullName && (
                  <p className="flex items-center gap-1.5 text-xs text-rose-500 font-medium">
                    <AlertCircle className="h-4 w-4" />
                    {errorsB.fullName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Email
                </label>
                <input
                  {...registerB("email")}
                  placeholder="budi@example.com"
                  className={`w-full h-10 rounded-xl border px-3.5 py-2 text-sm outline-none transition ${
                    errorsB.email
                      ? "border-rose-500 bg-rose-50/20 text-rose-900 dark:text-rose-200"
                      : "border-zinc-300 bg-white focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
                  }`}
                />
                {errorsB.email && (
                  <p className="flex items-center gap-1.5 text-xs text-rose-500 font-medium">
                    <AlertCircle className="h-4 w-4" />
                    {errorsB.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Kata Sandi (Min 8 karakter, 1 Huruf Besar, 1 Angka)
                </label>
                <input
                  type="password"
                  {...registerB("password")}
                  placeholder="••••••••"
                  className={`w-full h-10 rounded-xl border px-3.5 py-2 text-sm outline-none transition ${
                    errorsB.password
                      ? "border-rose-500 bg-rose-50/20 text-rose-900 dark:text-rose-200"
                      : "border-zinc-300 bg-white focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
                  }`}
                />
                {errorsB.password && (
                  <p className="flex items-center gap-1.5 text-xs text-rose-500 font-medium">
                    <AlertCircle className="h-4 w-4" />
                    {errorsB.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Konfirmasi Kata Sandi
                </label>
                <input
                  type="password"
                  {...registerB("confirmPassword")}
                  placeholder="••••••••"
                  className={`w-full h-10 rounded-xl border px-3.5 py-2 text-sm outline-none transition ${
                    errorsB.confirmPassword
                      ? "border-rose-500 bg-rose-50/20 text-rose-900 dark:text-rose-200"
                      : "border-zinc-300 bg-white focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
                  }`}
                />
                {errorsB.confirmPassword && (
                  <p className="flex items-center gap-1.5 text-xs text-rose-500 font-medium">
                    <AlertCircle className="h-4 w-4" />
                    {errorsB.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-2 pt-2">
                <Button
                  type="submit"
                  disabled={isSubmittingB}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
                >
                  {isSubmittingB ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Memvalidasi...
                    </>
                  ) : (
                    "Daftar & Validasi Zod"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    resetB();
                    setSubmittedDataB(null);
                  }}
                  className="gap-1 cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              </div>
            </form>
          </div>

          {/* Validated Output */}
          <div className="glass-card rounded-2xl p-6 lg:col-span-5 border border-zinc-200/80 dark:border-zinc-800/80 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
                Hasil Payload Valid
              </h3>
              {submittedDataB ? (
                <div className="rounded-xl bg-zinc-950 p-4 font-mono text-sm text-emerald-400">
                  <pre>{JSON.stringify(submittedDataB, null, 2)}</pre>
                </div>
              ) : (
                <div className="py-12 text-center text-sm text-zinc-400">
                  Isi form di samping untuk melihat JSON payload yang lolos
                  validasi Zod.
                </div>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 mt-4 border-t border-zinc-100 pt-3 dark:border-zinc-800">
              <Check className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>
                Schema otomatis menghasilkan TypeScript type:{" "}
                <code>RegisterFormData</code>.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Form C: Advanced Form */}
      <section id="advanced-form" className="space-y-4">
        <div className="border-b border-zinc-200/80 pb-2 dark:border-zinc-800/80">
          <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            C. Advanced Form (Pembuatan User Sistem)
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Formulir multi-field realistis: input teks, select role, switch
            preferensi, dan validasi checkbox terms.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-zinc-200/80 dark:border-zinc-800/80 max-w-2xl">
          <form
            onSubmit={handleSubmitC(onAdvancedSubmit)}
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Nama User
                </label>
                <input
                  {...registerC("name")}
                  placeholder="Citra Dewi"
                  className="w-full h-10 rounded-xl border border-zinc-300 bg-white px-3.5 py-2 text-sm outline-none focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
                />
                {errorsC.name && (
                  <p className="text-xs text-rose-500 font-medium">
                    {errorsC.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Email Korporat
                </label>
                <input
                  {...registerC("email")}
                  placeholder="citra@company.com"
                  className="w-full h-10 rounded-xl border border-zinc-300 bg-white px-3.5 py-2 text-sm outline-none focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
                />
                {errorsC.email && (
                  <p className="text-xs text-rose-500 font-medium">
                    {errorsC.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Hak Akses / Role
              </label>
              <Controller
                control={controlC}
                name="role"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full h-10 rounded-xl border border-zinc-300 bg-white px-3.5 py-2 text-sm outline-none focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-900">
                      <SelectValue placeholder="Pilih hak akses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="viewer">
                        Viewer (Hanya Baca)
                      </SelectItem>
                      <SelectItem value="editor">
                        Editor (Dapat Mengubah Konten)
                      </SelectItem>
                      <SelectItem value="admin">
                        Admin (Hak Akses Penuh)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <label className="flex items-center gap-3 rounded-xl border border-zinc-200/80 p-3.5 cursor-pointer dark:border-zinc-800">
              <input
                type="checkbox"
                {...registerC("notifications")}
                className="h-4 w-4 rounded text-indigo-600"
              />
              <span className="text-sm text-zinc-700 dark:text-zinc-300">
                Kirim notifikasi email otomatis saat ada deployment baru
              </span>
            </label>

            <div className="space-y-1.5">
              <label className="flex items-start gap-3 rounded-xl border border-zinc-200/80 p-3.5 cursor-pointer dark:border-zinc-800">
                <input
                  type="checkbox"
                  {...registerC("agreeTerms")}
                  className="mt-0.5 h-4 w-4 rounded text-indigo-600"
                />
                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                  Saya menyetujui kebijakan standar penulisan kode dan keamanan
                  baseline yang berlaku.
                </span>
              </label>
              {errorsC.agreeTerms && (
                <p className="text-xs text-rose-500 font-medium pl-1">
                  {errorsC.agreeTerms.message}
                </p>
              )}
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                type="submit"
                disabled={isSubmittingC}
                className="gap-2 bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
              >
                {isSubmittingC ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" />
                    Buat User Baru
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  resetC();
                  setSubmittedDataC(null);
                }}
                className="gap-1 cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            </div>

            {submittedDataC && (
              <div className="mt-4 rounded-xl bg-zinc-950 p-4 font-mono text-sm text-emerald-400">
                <span className="text-xs text-zinc-400 block mb-1">
                  Payload Terkirim:
                </span>
                <pre>{JSON.stringify(submittedDataC, null, 2)}</pre>
              </div>
            )}
          </form>
        </div>
      </section>

      <CodePreview
        code={zodCodeExample}
        title="Pola Form Schema Validation RHF + Zod"
        filePath="src/features/showcase/forms/page.tsx"
      />
    </div>
  );
}

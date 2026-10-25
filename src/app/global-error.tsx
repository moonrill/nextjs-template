"use client";

import { useEffect } from "react";
import { logger } from "@/lib/logger";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    logger.error("Root layout error caught by GlobalError", error, {
      digest: error.digest,
    });
  }, [error]);

  return (
    <html lang="id">
      <body className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-4 font-sans text-zinc-900">
        <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-8 text-center shadow-md">
          <h1 className="text-2xl font-bold text-red-600">
            Aplikasi Mengalami Kendala Fatal
          </h1>
          <p className="mt-2 text-sm text-zinc-600">
            Terjadi masalah pada aplikasi. Silakan muat ulang halaman.
          </p>
          <button
            onClick={() => reset()}
            className="mt-6 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            Muat Ulang
          </button>
        </div>
      </body>
    </html>
  );
}

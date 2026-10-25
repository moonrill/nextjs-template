import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "Next.js Business Starter — Production-Ready",
  description:
    "Production-ready Next.js frontend template with React Hook Form, TanStack Query, TanStack Table, Sonner, and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="flex min-h-full flex-col antialiased">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

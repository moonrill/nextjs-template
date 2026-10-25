import { featureItemSchema, type FeatureItem } from "../schemas/example.schema";
import type { FeatureFilterOptions } from "../types/example.types";

const STARTER_FEATURES: FeatureItem[] = [
  {
    id: "feat-1",
    title: "App Router & Strict TypeScript",
    description:
      "Struktur modular Next.js App Router dengan type safety penuh dan noUncheckedIndexedAccess.",
    category: "architecture",
    status: "ready",
  },
  {
    id: "feat-2",
    title: "React Hook Form & Zod",
    description:
      "Pengelolaan form terstruktur dengan validasi schema Zod dan fail-fast validation.",
    category: "security",
    status: "ready",
  },
  {
    id: "feat-3",
    title: "TanStack Query & TanStack Table",
    description:
      "Server state management, caching otomatis, dan tabel data performa tinggi.",
    category: "performance",
    status: "ready",
  },
  {
    id: "feat-4",
    title: "API Client & Sonner Toasts",
    description:
      "Wrapper native fetch terpusat untuk integrasi backend dan notifikasi toast modern.",
    category: "testing",
    status: "ready",
  },
];

export async function getStarterFeatures(
  options?: FeatureFilterOptions
): Promise<FeatureItem[]> {
  const items = options?.category
    ? STARTER_FEATURES.filter((item) => item.category === options.category)
    : STARTER_FEATURES;

  return items.map((item) => featureItemSchema.parse(item));
}

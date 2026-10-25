import { featureItemSchema, type FeatureItem } from "../schemas/example.schema";
import type { FeatureFilterOptions } from "../types/example.types";

const STARTER_FEATURES: FeatureItem[] = [
  {
    id: "feat-1",
    title: "App Router & TypeScript Strict",
    description:
      "Struktur modular Next.js App Router dengan type safety penuh dan strict checking.",
    category: "architecture",
    status: "ready",
  },
  {
    id: "feat-2",
    title: "Zod Schema & Env Validation",
    description:
      "Validasi fail-fast untuk konfigurasi runtime dan data pada batas sistem.",
    category: "security",
    status: "ready",
  },
  {
    id: "feat-3",
    title: "Vitest, Testing Library & Playwright",
    description:
      "Pengujian unit, komponen, dan E2E smoke tests yang cepat serta terisolasi.",
    category: "testing",
    status: "ready",
  },
  {
    id: "feat-4",
    title: "Structured JSON Logger",
    description:
      "Pencatatan log terstruktur dengan sanitasi otomatis untuk kunci sensitif.",
    category: "performance",
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

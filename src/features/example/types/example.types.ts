import type { FeatureItem } from "../schemas/example.schema";

export type { FeatureItem };

export interface FeatureFilterOptions {
  category?: "architecture" | "integration" | "security" | "performance";
}

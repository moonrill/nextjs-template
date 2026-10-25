import type { FeatureItem } from "../schemas/example.schema";

export type { FeatureItem };

export interface FeatureFilterOptions {
  category?: "architecture" | "testing" | "security" | "performance";
}

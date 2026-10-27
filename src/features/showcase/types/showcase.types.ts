export type FeatureStatus = "ready" | "available" | "optional" | "planned";

export type ShowcaseCategory =
  | "overview"
  | "components"
  | "api"
  | "forms"
  | "developer-tools"
  | "architecture";

export interface ShowcaseItem {
  id: string;
  title: string;
  slug: string;
  category: ShowcaseCategory;
  categoryLabel: string;
  description: string;
  status: FeatureStatus;
  statusDetail?: string;
  badgeLabel?: string;
  library?: string;
  sourceFile: string;
  routePath?: string;
  verified: boolean;
  highlights: string[];
}

export interface MetricCardData {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  description: string;
  iconName: string;
}

export interface ApiEndpointItem {
  method: "GET" | "POST" | "PUT" | "DELETE";
  endpoint: string;
  title: string;
  description: string;
  expectedStatus: number;
  simulatedDelayMs: number;
  sampleResponse: Record<string, unknown> | Array<unknown>;
  curlExample: string;
}

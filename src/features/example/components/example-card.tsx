import type { FeatureItem } from "../types/example.types";
import { Badge } from "@/components/ui/badge";

interface ExampleCardProps {
  feature: FeatureItem;
}

export function ExampleCard({ feature }: ExampleCardProps) {
  return (
    <div
      data-testid="example-card"
      className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant="info">{feature.category}</Badge>
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 capitalize">
            {feature.status}
          </span>
        </div>
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
          {feature.title}
        </h3>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {feature.description}
        </p>
      </div>
    </div>
  );
}

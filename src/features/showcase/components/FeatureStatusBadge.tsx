import type { FeatureStatus } from "../types/showcase.types";
import { Badge } from "@/components/ui/badge";

interface FeatureStatusBadgeProps {
  status: FeatureStatus;
  showDot?: boolean;
  className?: string;
}

export function FeatureStatusBadge({
  status,
  showDot = true,
  className = "",
}: FeatureStatusBadgeProps) {
  switch (status) {
    case "ready":
      return (
        <Badge variant="success" className={`gap-1.5 font-medium ${className}`}>
          {showDot && (
            <span className="relative flex h-2 w-2">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
          )}
          Ready & Verified
        </Badge>
      );
    case "available":
      return (
        <Badge variant="info" className={`gap-1.5 font-medium ${className}`}>
          {showDot && <span className="h-2 w-2 rounded-full bg-blue-500" />}
          Available
        </Badge>
      );
    case "optional":
      return (
        <Badge
          variant="secondary"
          className={`gap-1.5 border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400 font-medium ${className}`}
        >
          {showDot && <span className="h-2 w-2 rounded-full bg-amber-500" />}
          Optional
        </Badge>
      );
    case "planned":
    default:
      return (
        <Badge
          variant="outline"
          className={`gap-1.5 text-zinc-500 dark:text-zinc-400 font-medium ${className}`}
        >
          {showDot && <span className="h-2 w-2 rounded-full bg-zinc-400" />}
          Planned
        </Badge>
      );
  }
}

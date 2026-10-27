import * as React from "react";
import {
  Layers,
  Zap,
  CheckCircle2,
  Cpu,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  description: string;
  iconName?: string;
  sparklineVariant?: "primary" | "secondary" | "cta";
}

export function MetricCard({
  title,
  value,
  change,
  description,
  iconName = "layers",
  sparklineVariant = "primary",
}: MetricCardProps) {
  const renderIcon = () => {
    switch (iconName) {
      case "zap":
        return <Zap className="h-5 w-5 text-indigo-500" />;
      case "check":
        return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
      case "cpu":
        return <Cpu className="h-5 w-5 text-cyan-500" />;
      case "trending":
        return <TrendingUp className="h-5 w-5 text-violet-500" />;
      default:
        return <Layers className="h-5 w-5 text-indigo-500" />;
    }
  };

  const getStrokeColor = () => {
    switch (sparklineVariant) {
      case "secondary":
        return "#06b6d4";
      case "cta":
        return "#10b981";
      default:
        return "#6366f1";
    }
  };

  return (
    <div className="glass-card glass-card-hover relative flex flex-col justify-between overflow-hidden rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800/80">
          {renderIcon()}
        </div>
        {change && (
          <span className="flex items-center gap-0.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <ArrowUpRight className="h-3 w-3" />
            {change}
          </span>
        )}
      </div>

      <div className="mt-4">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {title}
        </p>
        <div className="mt-1 flex items-baseline justify-between">
          <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {value}
          </span>
          {/* Subtle sparkline */}
          <svg
            className="h-7 w-20 opacity-80"
            viewBox="0 0 80 28"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M0 24C15 22 25 10 40 14C55 18 65 4 80 2"
              stroke={getStrokeColor()}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <p className="mt-2 text-xs text-zinc-500 line-clamp-1 dark:text-zinc-400">
          {description}
        </p>
      </div>
    </div>
  );
}

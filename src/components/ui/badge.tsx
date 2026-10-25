import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "info" | "outline";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors";

  const variantStyles = {
    default: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200",
    success:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
    warning:
      "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
    outline:
      "border border-zinc-300 text-zinc-700 dark:border-zinc-700 dark:text-zinc-300",
  };

  return (
    <span
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    />
  );
}

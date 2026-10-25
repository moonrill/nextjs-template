export { cn } from "cn";

/**
 * Format date into ISO string safely.
 */
export function formatDate(date: Date | string | number): string {
  return new Date(date).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

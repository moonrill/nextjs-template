import { describe, it, expect } from "vitest";
import { cn, formatDate } from "./utils";

describe("utils", () => {
  describe("cn", () => {
    it("should combine class names properly", () => {
      const result = cn(
        "class-a",
        false && "class-b",
        "class-c",
        undefined,
        null
      );
      expect(result).toBe("class-a class-c");
    });
  });

  describe("formatDate", () => {
    it("should format valid date string", () => {
      const result = formatDate("2026-10-25T00:00:00.000Z");
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    });
  });
});

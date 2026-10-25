import { describe, it, expect } from "vitest";
import { getStarterFeatures } from "./example.service";

describe("example.service", () => {
  it("should return all starter features when no filter applied", async () => {
    const features = await getStarterFeatures();
    expect(features.length).toBeGreaterThan(0);
    expect(features[0]).toHaveProperty("id");
    expect(features[0]).toHaveProperty("title");
    expect(features[0]).toHaveProperty("category");
  });

  it("should filter features by category", async () => {
    const filtered = await getStarterFeatures({ category: "testing" });
    expect(filtered.every((f) => f.category === "testing")).toBe(true);
  });
});

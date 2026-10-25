import { describe, it, expect } from "vitest";
import { GET } from "./route";

describe("/api/health route handler", () => {
  it("should return HTTP 200 with status ok and valid json", async () => {
    const response = await GET();
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.status).toBe("ok");
    expect(data).toHaveProperty("timestamp");
    expect(data).toHaveProperty("uptime");
    expect(data).toHaveProperty("environment");
  });
});

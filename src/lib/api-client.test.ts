import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { apiClient, ApiError } from "./api-client";
import { z } from "zod";

describe("apiClient", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should fetch data successfully and return parsed JSON", async () => {
    const mockData = { id: 1, name: "Sample Item" };
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockData,
    });

    const result = await apiClient<{ id: number; name: string }>("/items");
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should validate response data against Zod schema", async () => {
    const itemSchema = z.object({
      id: z.number(),
      name: z.string(),
    });

    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ id: 42, name: "Validated Item" }),
    });

    const result = await apiClient("/items/42", { schema: itemSchema });
    expect(result).toEqual({ id: 42, name: "Validated Item" });
  });

  it("should throw ApiError when response is not ok", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
      json: async () => ({ message: "Item not found" }),
    });

    await expect(apiClient("/not-found")).rejects.toThrow(ApiError);
  });
});

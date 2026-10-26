import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { apiClient, ApiError, getApiBaseUrl } from "./api-client";
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
      text: async () => JSON.stringify(mockData),
    });

    const result = await apiClient<{ id: number; name: string }>("/items");
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should return undefined for HTTP 204 No Content", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      status: 204,
      text: async () => "",
    });

    const result = await apiClient("/delete-action");
    expect(result).toBeUndefined();
  });

  it("should return plain text if response is non-JSON text", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      status: 200,
      text: async () => "Plain text response",
    });

    const result = await apiClient<string>("/text-endpoint");
    expect(result).toBe("Plain text response");
  });

  it("should validate response data against Zod schema", async () => {
    const itemSchema = z.object({
      id: z.number(),
      name: z.string(),
    });

    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      status: 200,
      text: async () => JSON.stringify({ id: 42, name: "Validated Item" }),
    });

    const result = await apiClient("/items/42", { schema: itemSchema });
    expect(result).toEqual({ id: 42, name: "Validated Item" });
  });

  it("should throw ApiError with parsed JSON when response is not ok", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
      text: async () => JSON.stringify({ message: "Item not found" }),
    });

    await expect(apiClient("/not-found")).rejects.toThrow(ApiError);
  });

  it("should throw ApiError with raw text fallback when error body is not JSON", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
      text: async () => "Internal server error occurred",
    });

    try {
      await apiClient("/server-error");
      expect.fail("Should have thrown ApiError");
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError);
      const apiErr = err as ApiError;
      expect(apiErr.status).toBe(500);
      expect(apiErr.data).toBe("Internal server error occurred");
    }
  });

  it("should map AbortError to ApiError 408 on timeout", async () => {
    const abortError = new Error("The operation was aborted");
    abortError.name = "AbortError";
    (fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(abortError);

    try {
      await apiClient("/timeout-endpoint", { timeoutMs: 100 });
      expect.fail("Should have thrown ApiError");
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError);
      const apiErr = err as ApiError;
      expect(apiErr.status).toBe(408);
      expect(apiErr.message).toContain("Request timed out");
    }
  });

  it("should resolve API base URL correctly", () => {
    const url = getApiBaseUrl();
    expect(typeof url).toBe("string");
    expect(url.length).toBeGreaterThan(0);
  });
});

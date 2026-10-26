import { env } from "@/lib/env";
import { type z } from "zod";

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data?: unknown
  ) {
    super(`API Error ${status}: ${statusText}`);
    this.name = "ApiError";
  }
}

export interface RequestOptions extends RequestInit {
  timeoutMs?: number;
  schema?: z.ZodTypeAny;
}

export function getApiBaseUrl(): string {
  if (typeof window === "undefined") {
    return (
      env.API_BASE_URL || env.NEXT_PUBLIC_API_URL || "http://localhost:4000"
    );
  }
  return env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
}

export async function apiClient<T = unknown>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { timeoutMs = 10000, schema, headers, ...customConfig } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const baseUrl = getApiBaseUrl();
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${baseUrl.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;

  try {
    const response = await fetch(url, {
      ...customConfig,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...headers,
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      const rawText = await response.text();
      let errorData: unknown = rawText;
      if (rawText) {
        try {
          errorData = JSON.parse(rawText);
        } catch {
          // Keep rawText if response is plain text or HTML error
        }
      }
      throw new ApiError(response.status, response.statusText, errorData);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    const rawText = await response.text();
    if (!rawText) {
      return undefined as T;
    }

    let data: unknown;
    try {
      data = JSON.parse(rawText);
    } catch {
      data = rawText;
    }

    if (schema) {
      return schema.parse(data) as T;
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    if (
      (error instanceof Error && error.name === "AbortError") ||
      controller.signal.aborted
    ) {
      throw new ApiError(408, `Request timed out after ${timeoutMs}ms`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

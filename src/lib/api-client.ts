import { env } from "@/lib/env";
import { type z } from "zod";

export type ApiErrorKind =
  | "HTTP_ERROR"
  | "TIMEOUT"
  | "NETWORK_ERROR"
  | "ABORTED"
  | "SCHEMA_VALIDATION"
  | "PARSE_ERROR";

export interface ApiErrorParams {
  message: string;
  kind: ApiErrorKind;
  status?: number | undefined;
  statusText?: string | undefined;
  data?: unknown;
  rawBody?: string | undefined;
  originalError?: unknown;
}

export class ApiError extends Error {
  public readonly kind: ApiErrorKind;
  public readonly status: number;
  public readonly statusText: string;
  public readonly data?: unknown;
  public readonly rawBody?: string | undefined;
  public readonly originalError?: unknown;

  constructor(params: ApiErrorParams) {
    super(params.message);
    this.name = "ApiError";
    this.kind = params.kind;
    this.status = params.status ?? 0;
    this.statusText = params.statusText ?? "";
    this.data = params.data;
    this.rawBody = params.rawBody;
    this.originalError = params.originalError;

    // Mempertahankan rantai prototype untuk pengecekan instanceof
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  get isHttpError(): boolean {
    return this.kind === "HTTP_ERROR";
  }

  get isTimeout(): boolean {
    return this.kind === "TIMEOUT";
  }

  get isNetworkError(): boolean {
    return this.kind === "NETWORK_ERROR";
  }

  get isAborted(): boolean {
    return this.kind === "ABORTED";
  }

  get isValidationError(): boolean {
    return this.kind === "SCHEMA_VALIDATION";
  }

  get isClientError(): boolean {
    return this.status >= 400 && this.status < 500;
  }

  get isServerError(): boolean {
    return this.status >= 500 && this.status < 600;
  }
}

export interface RequestOptions extends Omit<RequestInit, "signal"> {
  timeoutMs?: number | undefined;
  schema?: z.ZodTypeAny | undefined;
  signal?: AbortSignal | undefined;
}

export function getApiBaseUrl(): string {
  return env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
}

/**
 * Native fetch wrapper terpusat dengan:
 * 1. Single-read body parsing aman (menghindari error stream consumed).
 * 2. Timeout terpadu yang melingkupi koneksi jaringan hingga pemrosesan body selesai.
 * 3. Kontrak error komprehensif (HTTP 4xx/5xx, timeout, network failure, 204 no content, schema validation).
 */
export async function apiClient<T = unknown>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const {
    timeoutMs = 10000,
    schema,
    headers,
    signal: externalSignal,
    ...customConfig
  } = options;

  const controller = new AbortController();
  let isTimeoutTriggered = false;

  const timeoutId = setTimeout(() => {
    isTimeoutTriggered = true;
    controller.abort();
  }, timeoutMs);

  // Hubungkan pembatalan manual dari externalSignal jika disediakan
  const handleExternalAbort = () => {
    controller.abort();
  };

  if (externalSignal) {
    if (externalSignal.aborted) {
      clearTimeout(timeoutId);
      throw new ApiError({
        message: "Request was aborted by the caller before starting",
        kind: "ABORTED",
        status: 499,
        statusText: "Client Closed Request",
      });
    }
    externalSignal.addEventListener("abort", handleExternalAbort, {
      once: true,
    });
  }

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

    // Penanganan response tanpa body (HTTP 204 No Content, 205 Reset Content)
    if (response.status === 204 || response.status === 205) {
      if (!response.ok) {
        throw new ApiError({
          message: `HTTP ${response.status}: ${response.statusText}`,
          kind: "HTTP_ERROR",
          status: response.status,
          statusText: response.statusText,
        });
      }
      return undefined as T;
    }

    // Baca body SATU KALI sebagai teks untuk mencegah error "body stream already consumed"
    const rawText = await response.text();

    let parsedData: unknown = undefined;
    if (rawText && rawText.trim().length > 0) {
      try {
        parsedData = JSON.parse(rawText);
      } catch {
        // Jika response bukan JSON valid, pertahankan teks mentah
        parsedData = rawText;
      }
    }

    // Penanganan HTTP Error (4xx, 5xx)
    if (!response.ok) {
      let errorMessage = `HTTP ${response.status} (${response.statusText})`;
      if (typeof parsedData === "string" && parsedData.length > 0) {
        errorMessage = `${errorMessage}: ${parsedData.slice(0, 150)}`;
      } else if (
        parsedData &&
        typeof parsedData === "object" &&
        "message" in parsedData &&
        typeof (parsedData as { message: unknown }).message === "string"
      ) {
        errorMessage = `${errorMessage}: ${(parsedData as { message: string }).message}`;
      }

      throw new ApiError({
        message: errorMessage,
        kind: "HTTP_ERROR",
        status: response.status,
        statusText: response.statusText,
        data: parsedData,
        rawBody: rawText,
      });
    }

    // Validasi Schema Zod jika opsi schema disertakan
    if (schema) {
      try {
        return schema.parse(parsedData) as T;
      } catch (schemaError) {
        throw new ApiError({
          message: "Response data failed Zod schema validation",
          kind: "SCHEMA_VALIDATION",
          status: response.status,
          statusText: response.statusText,
          data: parsedData,
          rawBody: rawText,
          originalError: schemaError,
        });
      }
    }

    return (parsedData ?? undefined) as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (isTimeoutTriggered) {
      throw new ApiError({
        message: `Request timed out after ${timeoutMs}ms`,
        kind: "TIMEOUT",
        status: 408,
        statusText: "Request Timeout",
        originalError: error,
      });
    }

    if (externalSignal?.aborted) {
      throw new ApiError({
        message: "Request was aborted by the caller",
        kind: "ABORTED",
        status: 499,
        statusText: "Client Closed Request",
        originalError: error,
      });
    }

    // Tangani kegagalan koneksi jaringan (DNS, offline, CORS, connection refused)
    if (error instanceof TypeError) {
      throw new ApiError({
        message: `Network error: failed to connect to ${url}`,
        kind: "NETWORK_ERROR",
        status: 0,
        statusText: "Network Error",
        originalError: error,
      });
    }

    throw new ApiError({
      message:
        error instanceof Error
          ? error.message
          : "An unexpected API request error occurred",
      kind: "NETWORK_ERROR",
      status: 0,
      statusText: "Unknown Fetch Error",
      originalError: error,
    });
  } finally {
    clearTimeout(timeoutId);
    if (externalSignal) {
      externalSignal.removeEventListener("abort", handleExternalAbort);
    }
  }
}

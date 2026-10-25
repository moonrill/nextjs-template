type LogLevel = "debug" | "info" | "warn" | "error";

interface LogPayload {
  level: LogLevel;
  timestamp: string;
  message: string;
  context?: Record<string, unknown> | undefined;
  error?:
    | {
        name: string;
        message: string;
        stack?: string | undefined;
      }
    | undefined;
}

const SENSITIVE_KEYS = new Set([
  "password",
  "token",
  "secret",
  "authorization",
  "apikey",
  "api_key",
  "cookie",
  "creditcard",
]);

function sanitizeContext(
  context?: Record<string, unknown>
): Record<string, unknown> | undefined {
  if (!context) return undefined;

  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(context)) {
    if (SENSITIVE_KEYS.has(key.toLowerCase())) {
      sanitized[key] = "[REDACTED]";
    } else if (
      value !== null &&
      typeof value === "object" &&
      !Array.isArray(value)
    ) {
      sanitized[key] = sanitizeContext(value as Record<string, unknown>);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

function outputLog(payload: LogPayload): void {
  const json = JSON.stringify(payload);
  switch (payload.level) {
    case "error":
      console.error(json);
      break;
    case "warn":
      console.warn(json);
      break;
    case "info":
      console.info(json);
      break;
    case "debug":
      console.debug(json);
      break;
  }
}

export const logger = {
  debug(message: string, context?: Record<string, unknown>): void {
    if (process.env.NODE_ENV === "production") return;
    outputLog({
      level: "debug",
      timestamp: new Date().toISOString(),
      message,
      ...(context ? { context: sanitizeContext(context) } : {}),
    });
  },

  info(message: string, context?: Record<string, unknown>): void {
    outputLog({
      level: "info",
      timestamp: new Date().toISOString(),
      message,
      ...(context ? { context: sanitizeContext(context) } : {}),
    });
  },

  warn(message: string, context?: Record<string, unknown>): void {
    outputLog({
      level: "warn",
      timestamp: new Date().toISOString(),
      message,
      ...(context ? { context: sanitizeContext(context) } : {}),
    });
  },

  error(
    message: string,
    error?: unknown,
    context?: Record<string, unknown>
  ): void {
    const errorDetails =
      error instanceof Error
        ? {
            name: error.name,
            message: error.message,
            stack:
              process.env.NODE_ENV !== "production" ? error.stack : undefined,
          }
        : undefined;

    outputLog({
      level: "error",
      timestamp: new Date().toISOString(),
      message,
      ...(context ? { context: sanitizeContext(context) } : {}),
      ...(errorDetails ? { error: errorDetails } : {}),
    });
  },
};

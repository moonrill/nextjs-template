import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { logger } from "./logger";

describe("logger", () => {
  beforeEach(() => {
    vi.spyOn(console, "info").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should output structured JSON with level and message", () => {
    logger.info("Test info message", { user: "john" });
    expect(console.info).toHaveBeenCalledTimes(1);

    const callArg = (console.info as ReturnType<typeof vi.fn>).mock
      .calls[0]?.[0];
    const parsed = JSON.parse(callArg);
    expect(parsed.level).toBe("info");
    expect(parsed.message).toBe("Test info message");
    expect(parsed.context.user).toBe("john");
  });

  it("should redact sensitive fields in context", () => {
    logger.info("Login attempt", {
      username: "admin",
      password: "supersecretpassword",
      token: "secret-token",
    });

    const callArg = (console.info as ReturnType<typeof vi.fn>).mock
      .calls[0]?.[0];
    const parsed = JSON.parse(callArg);
    expect(parsed.context.password).toBe("[REDACTED]");
    expect(parsed.context.token).toBe("[REDACTED]");
    expect(parsed.context.username).toBe("admin");
  });
});

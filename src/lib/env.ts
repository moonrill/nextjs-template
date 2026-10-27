import { z } from "zod";

const serverSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  API_BASE_URL: z.string().url().default("http://localhost:4000"),
});

const clientSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_API_URL: z.string().url().default("http://localhost:4000"),
});

const isServer = typeof window === "undefined";

function validateEnv() {
  const clientParsed = clientSchema.safeParse({
    NEXT_PUBLIC_APP_URL:
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
  });

  if (!clientParsed.success) {
    console.error(
      "[ENV ERROR] Invalid client environment variables:",
      clientParsed.error.flatten().fieldErrors
    );
    throw new Error("Invalid client environment variables");
  }

  if (isServer) {
    const serverParsed = serverSchema.safeParse({
      NODE_ENV: process.env.NODE_ENV || "development",
      API_BASE_URL:
        process.env.API_BASE_URL ||
        process.env.NEXT_PUBLIC_API_URL ||
        "http://localhost:4000",
    });

    if (!serverParsed.success) {
      console.error(
        "[ENV ERROR] Invalid server environment variables:",
        serverParsed.error.flatten().fieldErrors
      );
      throw new Error("Invalid server environment variables");
    }

    return {
      ...serverParsed.data,
      ...clientParsed.data,
    };
  }

  return {
    NODE_ENV:
      (process.env.NODE_ENV as "development" | "test" | "production") ||
      "development",
    API_BASE_URL: "",
    ...clientParsed.data,
  };
}

export const env = validateEnv();

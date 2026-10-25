import { test, expect } from "@playwright/test";

test.describe("Smoke Tests", () => {
  test("homepage should load with valid title and heading", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Next\.js Production Starter/);
    await expect(
      page.getByRole("heading", { name: /Fondasi Next\.js yang Tangguh/i })
    ).toBeVisible();
  });

  test("health check api should return status ok", async ({ request }) => {
    const response = await request.get("/api/health");
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.status).toBe("ok");
    expect(body).toHaveProperty("timestamp");
    expect(body).toHaveProperty("uptime");
  });
});

import { test, expect } from "@playwright/test";

test.describe("Frontend Smoke Tests", () => {
  test("homepage should load with valid title and heading", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Next\.js/);
    await expect(
      page.getByRole("heading", {
        name: /Next\.js Frontend Starter yang Tangguh/i,
      })
    ).toBeVisible();
  });

  test("navigation header and branding should render", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Next.js Frontend Starter")).toBeVisible();
    await expect(page.getByText("Frontend Only")).toBeVisible();
  });
});

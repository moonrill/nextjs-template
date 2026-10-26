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
    const header = page.getByRole("banner");
    await expect(header).toBeVisible();
    await expect(
      header.getByText("Next.js Frontend Starter", { exact: true })
    ).toBeVisible();
    await expect(header.getByText("Frontend Only")).toBeVisible();
  });
});

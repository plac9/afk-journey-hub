import { test, expect } from "@playwright/test";
import { visit } from "./utils";

test.describe("Landing page", () => {
  test("shows hero spotlight and nav routes", async ({ page }) => {
    await visit(page, "/");
    await expect(page.getByText("AFK Journey Hub · Live Preview")).toBeVisible();
    await expect(page.getByRole("heading", { level: 3, name: "Event Countdown" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 3, name: "Latest Intel" })).toBeVisible();
    await expect(page.getByRole("link", { name: /View hero guide/i })).toBeVisible();
  });
});

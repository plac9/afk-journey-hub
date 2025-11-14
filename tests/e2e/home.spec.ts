import { test, expect } from "@playwright/test";
import { visit } from "./utils";

test.describe("Landing page", () => {
  test("shows hero spotlight and nav routes", async ({ page }) => {
    await visit(page, "/");
    await expect(page.getByText("AFK Journey Heroes")).toBeVisible();
    await expect(page.getByRole("link", { name: "Events" })).toBeVisible();
    await expect(page.getByRole("link", { name: /tools/i })).toBeVisible();
  });
});

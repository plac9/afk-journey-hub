import { test, expect } from "@playwright/test";
import { visit } from "./utils";

test.describe("Content data wiring", () => {
  test("renders hero tiers from YAML", async ({ page }) => {
    await visit(page, "/heroes");
    await expect(page.getByRole("heading", { level: 1, name: "AFK Journey Heroes" })).toBeVisible();
    await expect(page.getByText("Tier Snapshot")).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Trusted Hero Rankings" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Edit YAML" })).toBeVisible();
  });

  test("renders event rotation cheat sheet", async ({ page }) => {
    await visit(page, "/events");
    await expect(page.getByText("Event Cheat Sheet")).toBeVisible();
    await expect(page.getByText("Dream Realm")).toBeVisible();
  });
});

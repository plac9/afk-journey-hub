import type { Page } from "@playwright/test";

export async function visit(page: Page, path = "/") {
  if (!process.env.PLAYWRIGHT_BASE_URL) {
    throw new Error(
      "Set PLAYWRIGHT_BASE_URL to the running dev server before executing e2e tests.",
    );
  }

  await page.goto(path);
}

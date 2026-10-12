import { test, expect, type Browser } from "@playwright/test";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

async function verifyIslands(browser: Browser) {
  // A fresh context catches runtime files that an existing tab may have cached.
  const context = await browser.newContext();
  const page = await context.newPage();
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  try {
    await page.goto("http://127.0.0.1:4324/assets");
    await expect(page.locator("astro-island[ssr]")).toHaveCount(0);
    await expect(page.locator(".library-card")).toHaveCount(9);
    await page.getByLabel("Search opportunities").fill("CYP11B2");
    await expect(page.locator(".library-card")).toHaveCount(1);
    await page.goto("http://127.0.0.1:4324/tools/deal-value");
    await expect(page.locator("astro-island[ssr]")).toHaveCount(0);
    await expect(page.locator(".result-value")).toHaveText("$500M");
    await page.getByLabel("Upfront payment ($M)").fill("50");
    await expect(page.locator(".result-value")).toHaveText("$525M");
    await page.goto("http://127.0.0.1:4324/contact");
    await expect(page.locator("astro-island[ssr]")).toHaveCount(0);
    await expect(page.getByLabel("Full name *", { exact: true })).toBeVisible();
    expect(errors).toEqual([]);
  } finally {
    await context.close();
  }
}

test("React sections survive a production build while preview is running", async ({
  browser,
}) => {
  await verifyIslands(browser);
  const { stdout } = await promisify(execFile)("bun", ["run", "build"], {
    timeout: 90000,
    env: { ...process.env, NODE_ENV: "production" },
  });
  console.log(stdout);
  await verifyIslands(browser);
});

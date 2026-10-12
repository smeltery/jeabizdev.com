import { test, expect } from "@playwright/test";

for (const reduced of [false, true]) {
  test(`contact celebration only follows success (reduced motion: ${reduced})`, async ({
    page,
  }) => {
    await page.emulateMedia({
      reducedMotion: reduced ? "reduce" : "no-preference",
    });
    let attempts = 0;
    await page.route("**/api/send-email", (route) =>
      route.fulfill({
        status: ++attempts === 1 ? 503 : 200,
        json: {
          message: attempts === 1 ? "Please try again." : "Inquiry received.",
        },
      }),
    );
    await page.goto("/contact");
    await expect(page.locator("astro-island[ssr]")).toHaveCount(0);
    await page.getByLabel("Full name").fill("Test Person");
    await page.getByLabel("Work email").fill("test@example.com");
    await page.getByLabel("Company").fill("Example Biotech");
    await page
      .getByLabel("Tell us about your priorities")
      .fill("Exploring a partnership.");
    await page.getByRole("checkbox").check();
    await expect(page.locator(".celebration")).toHaveCount(0);
    await page.getByRole("button", { name: "Send inquiry" }).click();
    await expect(page.getByText("Please try again.")).toBeVisible();
    await expect(page.locator(".celebration")).toHaveCount(0);
    await page.getByRole("button", { name: "Try again" }).click();
    await expect(
      page.getByRole("button", { name: "Send inquiry" }),
    ).toBeDisabled();
    if (!reduced) {
      await expect(page.locator(".celebration")).toBeVisible();
      await expect(page.locator(".celebration > span")).toHaveCount(180);
      await expect(page.locator(".celebration > span").nth(0)).toHaveCSS(
        "left",
        "0px",
      );
      await expect(page.locator(".celebration > span").nth(1)).toHaveCSS(
        "left",
        `${page.viewportSize()!.width}px`,
      );
      await expect(page.locator(".celebration")).toHaveCSS(
        "pointer-events",
        "none",
      );
    }
    await expect(page.locator(".celebration")).toHaveCount(0, {
      timeout: 4000,
    });
  });
}

test("dialog motion preserves dismissal, focus, navigation, and back-to-top", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Search site", exact: true }).click();
  await expect(page.locator("#site-search")).toBeVisible();
  expect(
    await page.evaluate(() => {
      document.querySelector<HTMLButtonElement>("[data-search-close]")!.click();
      return document
        .querySelector("#site-search")!
        .classList.contains("is-closing");
    }),
  ).toBe(true);
  await expect(page.locator("#site-search")).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Search site", exact: true }),
  ).toBeFocused();
  if (isMobile) {
    await page.getByRole("button", { name: "Menu", exact: true }).click();
    await page
      .locator("#mobile-menu")
      .getByRole("button", { name: /Search pages/ })
      .click();
    await expect(page.locator("#mobile-menu")).not.toBeVisible();
    await expect(page.locator("#site-search input")).toBeFocused();
    await page.keyboard.press("Escape");
  }
  await page
    .locator("footer")
    .getByRole("link", { name: "Services", exact: true })
    .click();
  await expect(page).toHaveURL(/\/services\/?$/);
  await page.goBack();
  await expect(page.locator("main")).toHaveCSS("opacity", "1");
  await page.locator("[data-top]").click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await expect(page.locator(".site-header .brand")).toBeFocused();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.locator("[data-top]").click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

import { test, expect, type Page } from "@playwright/test";
async function open(page: Page, path: string) {
  await page.goto(path);
  await expect(page.locator('astro-island[client="load"][ssr]')).toHaveCount(0);
}

test("pages render with no horizontal overflow or runtime errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const path of [
    "/",
    "/services",
    "/about",
    "/approach",
    "/assets",
    "/transactions",
    "/contact",
    "/brand",
    "/privacy",
    "/disclaimer",
  ]) {
    await open(page, path);
    await expect(page.locator("h1")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
      path,
    ).toBe(true);
  }
  expect(errors).toEqual([]);
});
test("keyboard search filters and opens an asset", async ({ page }) => {
  await open(page, "/");
  await page.keyboard.press("Control+k");
  const search = page.getByRole("dialog", {
    name: "Find your next opportunity.",
  });
  await expect(search).toBeVisible();
  await search.getByRole("searchbox").fill("KAT6");
  await expect(search.locator("[data-search-entry]:visible")).toHaveCount(1);
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/assets\/kat6-inhibitor/);
});
test("search escape restores focus and no-results state is clear", async ({
  page,
}) => {
  await open(page, "/");
  const trigger = page.getByRole("button", {
    name: "Search site",
    exact: true,
  });
  await trigger.click();
  const dialog = page.locator("#site-search");
  await dialog.getByRole("searchbox").fill("zzzznonexistent");
  await expect(dialog.locator("[data-search-empty]")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});
test("asset filters combine and empty state resets", async ({ page }) => {
  await open(page, "/assets");
  await page
    .getByRole("button", { name: "Cardiovascular", exact: true })
    .click();
  await expect(page.locator(".library-card")).toHaveCount(2);
  await page.getByLabel("Search opportunities").fill("none");
  await expect(page.getByText("No matching opportunities.")).toBeVisible();
  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(page.locator(".library-card")).toHaveCount(9);
  await page.getByRole("combobox", { name: /^Development stage/ }).click();
  await page.getByRole("option", { name: "Phase 3", exact: true }).click();
  await expect(page.locator(".library-card")).toHaveCount(2);
});

test("inquiry preserves context, validates, reviews, and sends through a mocked provider", async ({
  page,
}) => {
  await page.route("**/api/send-email", async (route) => {
    expect(route.request().postDataJSON().asset).toBe("KAT6 Inhibitor");
    await route.fulfill({
      json: { message: "Thank you. Your inquiry has been sent to JEA." },
    });
  });
  await open(page, "/contact?asset=KAT6%20Inhibitor");
  await expect(
    page.getByRole("combobox", { name: /^Asset of interest/ }),
  ).toContainText("KAT6 Inhibitor");
  await expect(
    page.getByRole("button", { name: "Review my introduction" }),
  ).toBeDisabled();
  await expect(page.locator(".review")).toHaveCount(0);
  await page.getByLabel("Full name").fill("Test Person");
  await page.getByLabel("Work email").fill("test@example.com");
  await page.getByLabel("Company", { exact: false }).fill("Example Biotech");
  await page
    .getByLabel("Tell us about your priorities")
    .fill("Exploring a partnership.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Review my introduction" }).click();
  await expect(page.locator(".review")).toContainText("KAT6 Inhibitor");
  await page.getByRole("button", { name: "Send to JEA" }).click();
  await expect(
    page.getByRole("button", { name: "Inquiry sent" }),
  ).toBeDisabled();
});
test("failed inquiry delivery retains the draft and retry", async ({
  page,
}) => {
  await page.route("**/api/send-email", (route) =>
    route.fulfill({
      status: 503,
      json: { message: "Online delivery is unavailable." },
    }),
  );
  await open(page, "/contact");
  await page.getByLabel("Full name").fill("Test Person");
  await page.getByLabel("Work email").fill("test@example.com");
  await page.getByLabel("Company").fill("Example Biotech");
  await page
    .getByLabel("Tell us about your priorities")
    .fill("Exploring a partnership.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Review my introduction" }).click();
  await page.getByRole("button", { name: "Send to JEA" }).click();
  await expect(page.getByText("Online delivery is unavailable.")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Open email draft" }),
  ).toHaveAttribute("href", /^mailto:/);
  await expect(page.getByRole("button", { name: "Send to JEA" })).toBeEnabled();
});
test("mobile menu contains navigation and restores focus", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile);
  await open(page, "/");
  const button = page.getByRole("button", { name: "Menu", exact: true });
  await button.click();
  await expect(page.getByRole("dialog", { name: "Main menu" })).toBeVisible();
  await expect(button).toHaveAttribute("aria-expanded", "true");
  await page.getByRole("button", { name: "Close menu" }).click();
  await expect(button).toBeFocused();
  await expect(button).toHaveAttribute("aria-expanded", "false");
});
test("transaction filters and PDF links are available", async ({
  page,
  request,
}) => {
  await open(page, "/transactions");
  await page.getByRole("combobox", { name: /^Year/ }).click();
  await page.getByRole("option", { name: "2026", exact: true }).click();
  await expect(page.locator(".transaction-item:visible")).toHaveCount(2);
  const href = await page
    .locator(".transaction-item:visible a")
    .first()
    .getAttribute("href");
  expect((await request.get(href!)).status()).toBe(200);
});

test("custom selects support keyboard and outside dismissal", async ({
  page,
}) => {
  await open(page, "/contact");
  const territory = page.getByRole("combobox", { name: /^Territories/ });
  await territory.focus();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(territory).toContainText("Global");
  await expect(territory).toHaveAttribute("aria-expanded", "false");
  await territory.click();
  await page.keyboard.press("Escape");
  await expect(territory).toHaveAttribute("aria-expanded", "false");
  await expect(territory).toBeFocused();
  await territory.click();
  await page.locator("h1").click();
  await expect(territory).toHaveAttribute("aria-expanded", "false");
});
test("review stays disabled for invalid email and missing consent", async ({
  page,
}) => {
  await open(page, "/contact");
  const button = page.getByRole("button", { name: "Review my introduction" });
  await expect(button).toBeDisabled();
  await page.getByLabel("Full name").fill("Test");
  await page.getByLabel("Work email").fill("not-an-email");
  await page.getByLabel("Company").fill("Example");
  await page.getByLabel("Tell us about your priorities").fill("Partnering");
  await page.getByRole("checkbox").check();
  await expect(button).toBeDisabled();
  await page.getByLabel("Work email").fill("test@example.com");
  await expect(button).toBeEnabled();
  await page.getByRole("checkbox").uncheck();
  await expect(button).toBeDisabled();
  await page.getByRole("checkbox").check();
  await page.getByLabel("Full name").fill("   ");
  await expect(button).toBeDisabled();
});
test("resources dropdown and mobile menu dimensions", async ({
  page,
  isMobile,
}) => {
  await open(page, "/");
  if (isMobile) {
    await page.getByRole("button", { name: "Menu", exact: true }).click();
    await expect(page.locator("#mobile-menu")).toHaveCSS("transform", "none");
    const box = await page.locator("#mobile-menu").boundingBox();
    const viewport = page.viewportSize()!;
    expect(box!.height).toBe(viewport.height);
    expect(box!.width).toBe(viewport.width);
    await expect(page.locator(".menu-contact")).toBeInViewport();
  } else {
    const summary = page.locator(".resource-menu summary");
    await summary.click();
    await expect(page.locator(".resource-panel")).toBeVisible();
    await expect(page.locator(".resource-panel").getByRole("link")).toHaveCount(
      4,
    );
    await page.keyboard.press("Escape");
    await expect(page.locator(".resource-panel")).not.toBeVisible();
    await expect(summary).toBeFocused();
  }
});

test("FAQ accordion, contained search, and navigation alignment", async ({
  page,
  isMobile,
}) => {
  await open(page, "/approach");
  await expect(page.locator(".page-intro")).toHaveCSS(
    "border-bottom-width",
    "0px",
  );
  const questions = page.locator(".faq-list summary");
  await questions.nth(0).click();
  await expect(page.locator(".faq-list details").nth(0)).toHaveAttribute(
    "open",
    "",
  );
  await questions.nth(1).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".faq-list details").nth(1)).toHaveAttribute(
    "open",
    "",
  );
  await expect(page.locator(".faq-list details").nth(0)).not.toHaveAttribute(
    "open",
    "",
  );
  if (!isMobile) {
    const link = await page
      .locator(".site-header nav > a")
      .last()
      .boundingBox();
    const resources = await page
      .locator(".resource-menu > summary")
      .boundingBox();
    expect(
      Math.abs(
        link!.y + link!.height / 2 - (resources!.y + resources!.height / 2),
      ),
    ).toBeLessThan(1);
  }
  await page.getByRole("button", { name: "Search site", exact: true }).click();
  await expect(page.locator("#site-search")).toBeVisible();
  await expect(page.locator("#site-search")).toHaveCSS("transform", "none");
  const search = await page.locator("#site-search").boundingBox();
  expect(search!.width).toBe(isMobile ? page.viewportSize()!.width : 960);
  const results = await page.locator(".search-results").boundingBox();
  expect(Math.abs(results!.width - search!.width)).toBeLessThanOrEqual(2);
  await expect(page.locator(".search-footer")).toBeInViewport();
});

test("retired toolkit routes and links are absent", async ({
  page,
  request,
}) => {
  await open(page, "/");
  await expect(page.locator('a[href^="/tools"]')).toHaveCount(0);
  await page.getByRole("button", { name: "Search site", exact: true }).click();
  await expect(page.locator('[data-search-group="Tools"]')).toHaveCount(0);
  expect(await (await request.get("/sitemap.xml")).text()).not.toContain(
    "/tools",
  );
  for (const route of ["/tools", "/tools/deal-value", "/tools/cash-runway"])
    expect((await request.get(route)).status()).toBe(404);
});

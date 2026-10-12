import { test, expect, type Page } from "@playwright/test";
async function open(page: Page, path: string) {
  await page.goto(path);
  await expect(page.locator('astro-island[client="load"][ssr]')).toHaveCount(0);
}

test("inquiry preserves context, validates, and sends through a mocked provider", async ({
  page,
}) => {
  let submissions = 0;
  await page.route("**/api/send-email", async (route) => {
    submissions += 1;
    expect(route.request().postDataJSON().asset).toBe(
      submissions === 1 ? "KAT6 Inhibitor" : "",
    );
    await route.fulfill({
      json: { message: "Thank you. Your inquiry has been sent to JEA." },
    });
  });
  await open(page, "/contact?asset=KAT6%20Inhibitor");
  await page.clock.install();
  await expect(
    page.getByRole("combobox", { name: /^Asset of interest/ }),
  ).toContainText("KAT6 Inhibitor");
  await expect(
    page.getByRole("button", { name: "Send inquiry" }),
  ).toBeDisabled();
  await expect(page.locator(".review")).toHaveCount(0);
  await page.getByLabel("Full name").fill("Test Person");
  await page.getByLabel("Work email").fill("test@example.com");
  await page.getByLabel("Company", { exact: false }).fill("Example Biotech");
  await page
    .getByLabel("Tell us about your priorities")
    .fill("Exploring a partnership.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Send inquiry" }).click();
  await expect(
    page.getByRole("button", { name: "Send inquiry" }),
  ).toBeDisabled();
  await expect(page.getByLabel("Full name")).toHaveValue("");
  await expect(page.getByLabel("Work email")).toHaveValue("");
  await expect(page.getByLabel("Company", { exact: false })).toHaveValue("");
  await expect(page.getByLabel("Tell us about your priorities")).toHaveValue(
    "",
  );
  await expect(page.getByRole("checkbox")).not.toBeChecked();
  await expect(
    page.getByRole("combobox", { name: /^Asset of interest/ }),
  ).toContainText("Not asset-specific");
  await expect(page.locator('select[name="asset"]')).toHaveValue("");
  await expect(page.locator(".form-status")).toContainText(
    "JEA BizDev Consulting, LLC®",
  );
  await expect(page.getByText("Thank you for getting in touch.")).toHaveCount(
    0,
  );
  await page.clock.fastForward(10000);
  await expect(page.locator(".form-status")).toBeEmpty();
  await page.getByLabel("Full name").fill("Next Person");
  await expect(
    page.getByRole("button", { name: "Send inquiry" }),
  ).toBeDisabled();
  await page.getByLabel("Work email").fill("next@example.com");
  await page.getByLabel("Company", { exact: false }).fill("Next Biotech");
  await page.getByLabel("Tell us about your priorities").fill("A new inquiry.");
  await expect(
    page.getByRole("button", { name: "Send inquiry" }),
  ).toBeDisabled();
  await page.getByRole("checkbox").check();
  await expect(
    page.getByRole("button", { name: "Send inquiry" }),
  ).toBeEnabled();
  await page.getByRole("button", { name: "Send inquiry" }).click();
  await expect(page.getByLabel("Full name")).toHaveValue("");
  expect(submissions).toBe(2);
});
test("failed inquiry delivery retains the draft and retry", async ({
  page,
}) => {
  let attempts = 0;
  await page.route("**/api/send-email", (route) => {
    attempts += 1;
    expect(route.request().postDataJSON().message).toBe(
      "Exploring a partnership.",
    );
    return route.fulfill({
      status: attempts === 1 ? 503 : 200,
      json: {
        message:
          attempts === 1
            ? "Online delivery is unavailable."
            : "Thank you. Your inquiry has been sent to JEA.",
      },
    });
  });
  await open(page, "/contact");
  await page.getByLabel("Full name").fill("Test Person");
  await page.getByLabel("Work email").fill("test@example.com");
  await page.getByLabel("Company").fill("Example Biotech");
  await page
    .getByLabel("Tell us about your priorities")
    .fill("Exploring a partnership.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Send inquiry" }).click();
  await expect(page.getByText("Online delivery is unavailable.")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Open email draft" }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Download introduction" }),
  ).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Try again" })).toBeEnabled();
  await page.getByRole("button", { name: "Try again" }).click();
  await expect(
    page.getByRole("button", { name: "Send inquiry" }),
  ).toBeDisabled();
  expect(attempts).toBe(2);
});
test("send stays disabled for invalid email and missing consent", async ({
  page,
}) => {
  await open(page, "/contact");
  const button = page.getByRole("button", { name: "Send inquiry" });
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

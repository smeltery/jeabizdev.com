import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/dev",
  workers: 1,
  timeout: 120000,
  forbidOnly: !!process.env.CI,
  webServer: {
    command: "bunx astro dev --ignore-lock --host 127.0.0.1 --port 4324",
    url: "http://127.0.0.1:4324",
    reuseExistingServer: false,
    env: { NODE_ENV: "development" },
  },
  use: {
    ...devices["Desktop Chrome"],
    baseURL: "http://127.0.0.1:4324",
    trace: "retain-on-failure",
  },
});

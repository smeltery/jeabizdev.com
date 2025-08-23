import { defineConfig } from "vitest/config"
import { fileURLToPath } from "node:url"

const rootDir = fileURLToPath(new URL("./", import.meta.url))

export default defineConfig({
  resolve: {
    alias: [
      { find: /^@\//, replacement: `${rootDir}/` },
      { find: "@", replacement: rootDir },
    ],
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    css: false,
  },
})

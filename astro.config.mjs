import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
export default defineConfig({
  site: "https://jeabizdev.com",
  integrations: [react()],
  devToolbar: { enabled: false },
  adapter: vercel(),
  vite: {
    plugins: [
      {
        name: "separate-development-cache",
        config: (_, { command, mode }) => ({
          // A build must not replace the JSX runtime used by an open preview.
          cacheDir: `node_modules/.vite/${command}-${mode}`,
        }),
      },
    ],
    server: { watch: { ignored: ["**/.vercel/**", "**/dist/**"] } },
  },
});

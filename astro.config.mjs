import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
export default defineConfig({
  site: "https://jeabizdev.com",
  integrations: [react()],
  devToolbar: { enabled: false },
  adapter: vercel(),
});

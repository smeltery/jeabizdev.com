import { resolve, sep } from "node:path";
import { stat } from "node:fs/promises";
const root = resolve(".vercel/output/static");
if (!(await Bun.file(`${root}/index.html`).exists()))
  throw new Error("Run bun run build before browser tests.");
const server = Bun.serve({
  hostname: "127.0.0.1",
  port: 4323,
  async fetch(request) {
    let pathname: string;
    try {
      pathname = decodeURIComponent(new URL(request.url).pathname);
    } catch {
      return new Response("Invalid path", { status: 400 });
    }
    const path = resolve(root, `.${pathname}`);
    if (path !== root && !path.startsWith(root + sep))
      return new Response("Not found", { status: 404 });
    for (const candidate of [path, `${path}/index.html`]) {
      const file = Bun.file(candidate);
      const info = await stat(candidate).catch((error) => {
        if (error.code === "ENOENT" || error.code === "ENOTDIR") return null;
        throw error;
      });
      if (info?.isFile()) return new Response(file);
    }
    return new Response(Bun.file(`${root}/404.html`), { status: 404 });
  },
});
console.log(`Built-site preview: ${server.url}`);

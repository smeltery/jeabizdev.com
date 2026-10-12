import { readdir, readFile, access } from "node:fs/promises";
import { join } from "node:path";
const root = ".vercel/output/static";
async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory()
          ? files(join(directory, entry.name))
          : [join(directory, entry.name)],
      ),
    )
  ).flat();
}
const pages = (await files(root)).filter((file) => file.endsWith(".html"));
const failures = [];
let checked = 0;
for (const page of pages) {
  const html = await readFile(page, "utf8");
  for (const [, raw] of html.matchAll(/(?:href|src)="([^"\s]+)"/g)) {
    if (!raw.startsWith("/") || raw.startsWith("//")) continue;
    const path = decodeURIComponent(raw.split(/[?#]/)[0]);
    if (path === "/api/send-email") continue;
    const candidates = [
      join(root, path),
      join(root, path, "index.html"),
      join(root, `${path}.html`),
    ];
    let found = false;
    for (const candidate of candidates) {
      try {
        await access(candidate);
        found = true;
        break;
      } catch {}
    }
    checked++;
    if (!found) failures.push(`${page}: ${raw}`);
  }
}
if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else
  console.log(
    `Checked ${checked} local links and assets across ${pages.length} built pages. No missing targets.`,
  );

const social = await readFile(join(root, "brand/social.png"));
if (
  social.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a" ||
  social.readUInt32BE(16) !== 1200 ||
  social.readUInt32BE(20) !== 630
) {
  throw new Error("Social preview must be a 1200 × 630 PNG.");
}

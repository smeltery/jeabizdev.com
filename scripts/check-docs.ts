import { dirname, resolve } from "node:path";
import { existsSync } from "node:fs";
import { Window } from "happy-dom";
import { repositoryFiles } from "./repository";
const window = new Window();
Object.assign(globalThis, { window, document: window.document });
const { default: mermaid } = await import("mermaid");
mermaid.initialize({ startOnLoad: false, securityLevel: "strict" });
const errors: string[] = [];
let diagrams = 0;
const files = repositoryFiles().filter((path) => path.endsWith(".md"));
for (const file of files) {
  const source = await Bun.file(file).text();
  for (const match of source.matchAll(/^```mermaid\s*\n([\s\S]*?)^```/gm)) {
    try {
      await mermaid.parse(match[1]);
      diagrams++;
    } catch (error) {
      errors.push(`${file}: invalid Mermaid: ${error}`);
    }
  }
  const text = source.replace(/^```[^\n]*\n[\s\S]*?^```/gm, "");
  const targets = [...text.matchAll(/\]\(([^)]+)\)/g)].map((match) => match[1]);
  targets.push(
    ...[...text.matchAll(/<img[^>]+src="([^"]+)"/g)].map((match) => match[1]),
  );
  for (const raw of targets) {
    const link = raw.replace(/^<|>$/g, "");
    if (/^(https?:|mailto:)/.test(link)) continue;
    const [path, anchor] = link.split("#");
    const target = path
      ? resolve(dirname(file), decodeURIComponent(path))
      : resolve(file);
    if (!existsSync(target)) {
      errors.push(`${file}: missing link target ${link}`);
      continue;
    }
    if (anchor && target.endsWith(".md")) {
      const content = await Bun.file(target).text();
      const slugs = [...content.matchAll(/^#{1,6}\s+(.+)$/gm)].map((match) =>
        match[1]
          .toLowerCase()
          .replace(/[^\p{L}\p{N}_\- ]/gu, "")
          .replace(/ /g, "-"),
      );
      if (!slugs.includes(anchor))
        errors.push(`${file}: missing heading ${link}`);
    }
  }
}
if (errors.length) throw new Error(errors.join("\n"));
console.log(
  `Validated ${files.length} Markdown files and ${diagrams} Mermaid diagrams.`,
);

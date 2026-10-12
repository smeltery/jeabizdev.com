import { dirname } from "node:path";
import { repositoryFiles } from "./repository";
import budgets from "./budgets.json";
const errors: string[] = [];
const directories = new Map<string, number>();
let total = 0;
for (const file of repositoryFiles()) {
  if (/^(public\/|\.flox\/)/.test(file) || file === "bun.lock") continue;
  if (
    !/\.(astro|tsx?|mjs|css|sh|md|jsonc?|ya?ml)$/.test(file) &&
    !file.startsWith(".githooks/")
  )
    continue;
  const lines = (await Bun.file(file).text()).trimEnd().split("\n").length;
  const limit =
    (budgets.files as Record<string, number>)[file] ?? budgets.maxFileLines;
  if (lines > limit) errors.push(`${file}: ${lines} lines exceeds ${limit}`);
  total += lines;
  directories.set(dirname(file), (directories.get(dirname(file)) ?? 0) + 1);
}
for (const [directory, count] of directories)
  if (count > budgets.maxDirectoryFiles)
    errors.push(
      `${directory}: ${count} files exceeds ${budgets.maxDirectoryFiles}`,
    );
if (total > budgets.maxTotalLines)
  errors.push(`Total ${total} lines exceeds ${budgets.maxTotalLines}`);
if (errors.length) throw new Error(errors.join("\n"));
console.log(
  `LOC budget: ${total}/${budgets.maxTotalLines}; per file ≤ ${budgets.maxFileLines}; per directory ≤ ${budgets.maxDirectoryFiles}.`,
);

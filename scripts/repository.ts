import { existsSync } from "node:fs";
export function repositoryFiles(): string[] {
  const result = Bun.spawnSync([
    "git",
    "ls-files",
    "--cached",
    "--others",
    "--exclude-standard",
    "-z",
  ]);
  if (result.exitCode) throw new Error("Could not list repository files.");
  return [
    ...new Set(result.stdout.toString().split("\0").filter(Boolean)),
  ].filter(existsSync);
}

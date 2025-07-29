import { spawnSync } from "node:child_process";
import path from "node:path";

export function getGitLastUpdatedTimeStamp(filePath: string) {
  let lastUpdated;
  try {
    const buffer = spawnSync(
      "git",
      ["log", "-1", "--format=%at", path.basename(filePath)],
      { cwd: path.dirname(filePath) }
    );

    const timestamp = buffer.stdout?.toString("utf-8");

    lastUpdated = timestamp ? new Date(parseInt(timestamp) * 1000) : new Date();
  } catch (e) {
    console.error("Fail to lastUpdated", e);
    /* do not handle for now */
  }
  return lastUpdated;
}

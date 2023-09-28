import { spawnSync } from "child_process";
import path from "path";

export function getGitLastUpdatedTimeStamp(filePath: string) {
  let lastUpdated;
  try {
    lastUpdated =
      parseInt(
        spawnSync(
          "git",
          ["log", "-1", "--format=%at", path.basename(filePath)],
          { cwd: path.dirname(filePath) }
        ).stdout.toString("utf-8")
      ) * 1000;
  } catch (e) {
    /* do not handle for now */
  }
  return lastUpdated;
}

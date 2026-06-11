const { spawnSync } = require("child_process");
const path = require("path");

const nextBin = path.join(process.cwd(), "node_modules", "next", "dist", "bin", "next");
const existingNodeOptions = process.env.NODE_OPTIONS || "";
const memoryOption = "--max_old_space_size=4096";

const result = spawnSync(process.execPath, [nextBin, "build"], {
  stdio: "inherit",
  env: {
    ...process.env,
    NODE_OPTIONS: existingNodeOptions.includes(memoryOption)
      ? existingNodeOptions
      : `${existingNodeOptions} ${memoryOption}`.trim(),
    NEXT_PRIVATE_BUILD_WORKER: process.env.NEXT_PRIVATE_BUILD_WORKER || "1"
  }
});

process.exit(result.status ?? 1);

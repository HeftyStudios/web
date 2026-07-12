import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const packageEntryPath = require.resolve("@hefty-studios/arena-game-data");
const packageRoot = path.dirname(packageEntryPath);
const sourceDir = path.join(packageRoot, "icons", "by-guid");
const targetDir = path.resolve("public", "arena-icons", "by-guid");

if (!fs.existsSync(sourceDir)) {
  console.log("No packaged Arena Game icons found.");
  process.exit(0);
}

fs.rmSync(targetDir, { recursive: true, force: true });
fs.mkdirSync(targetDir, { recursive: true });
fs.cpSync(sourceDir, targetDir, { recursive: true });

console.log(`Synced Arena Game icons to ${targetDir}`);

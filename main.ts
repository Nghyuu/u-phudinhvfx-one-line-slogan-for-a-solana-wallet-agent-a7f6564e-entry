import fs from "node:fs";
import path from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

const slogan = "Your Solana wallet, doing the errands while you get on with your day.";

// Spec guard: single line, at most 20 words, 1-140 UTF-8 characters.
const words = slogan.trim().split(/\s+/).length;
const chars = Buffer.byteLength(slogan, "utf8");
if (words > 20 || chars < 1 || chars > 140 || /\n/.test(slogan)) {
  throw new Error(`Slogan out of spec: ${words} words, ${chars} chars`);
}

const entryPath = path.join(outDir, "entry.txt");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(entryPath, slogan + "\n", "utf8");
fs.chmodSync(entryPath, 0o644);

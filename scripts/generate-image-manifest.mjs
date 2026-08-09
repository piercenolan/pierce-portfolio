/**
 * Generates src/data/imageDimensions.ts from the real files in public/images.
 *
 * Why this exists: next/image needs intrinsic width and height to reserve
 * layout space before an image loads. Our image paths come from the data
 * files as plain strings, so static import (which would infer dimensions
 * automatically) is not available. Hardcoding a single guessed size for
 * every image reserves the wrong aspect ratio and shifts the page on load.
 *
 * Run via the `prebuild` script so the manifest can never drift from the
 * assets on disk.
 */
import sharp from "sharp";
import { readdirSync, statSync, writeFileSync } from "fs";
import { join, relative, sep } from "path";

const ROOT = "public";
const IMAGE_DIR = join(ROOT, "images");
const OUT = join("src", "data", "imageDimensions.ts");
const EXT = /\.(png|jpe?g|avif|webp|gif)$/i;

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, acc);
    else if (EXT.test(entry)) acc.push(full);
  }
  return acc;
}

const files = walk(IMAGE_DIR).sort();
const entries = [];

for (const file of files) {
  const { width, height } = await sharp(file).metadata();
  if (!width || !height) throw new Error(`Could not read dimensions for ${file}`);
  const urlPath = "/" + relative(ROOT, file).split(sep).join("/");
  entries.push([urlPath, width, height]);
}

const body = entries
  .map(([p, w, h]) => `  ${JSON.stringify(p)}: { width: ${w}, height: ${h} },`)
  .join("\n");

writeFileSync(
  OUT,
  `// GENERATED FILE — do not edit by hand.
// Regenerate with: node scripts/generate-image-manifest.mjs
// Source of truth is the actual files in public/images.

export type ImageDimensions = { width: number; height: number };

export const imageDimensions: Record<string, ImageDimensions> = {
${body}
};

/** Falls back to a 16:10 box for any path missing from the manifest. */
export function getImageDimensions(src: string): ImageDimensions {
  return imageDimensions[src] ?? { width: 1600, height: 1000 };
}
`
);

console.log(`Wrote ${OUT} with ${entries.length} entries.`);

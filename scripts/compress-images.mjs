/**
 * Resizes, recompresses, and strips all metadata (EXIF/GPS) from images in
 * public/images, in place. Idempotent: files that would not get smaller are
 * left untouched. Run after adding new assets.
 */
import sharp from "sharp";
import { readdirSync, statSync, renameSync, rmSync, existsSync } from "fs";
import { join, extname } from "path";

const MAX_EDGE = 2000;
const SOURCE_DIR = "public/images";
const RECOMPRESSIBLE = new Set([".jpg", ".jpeg", ".png"]);

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const files = walk(SOURCE_DIR);
let before = 0;
let after = 0;

for (const file of files) {
  const ext = extname(file).toLowerCase();
  const originalSize = statSync(file).size;
  before += originalSize;

  if (!RECOMPRESSIBLE.has(ext)) {
    after += originalSize;
    continue;
  }

  // Written beside the original, then swapped in only if it is actually
  // smaller. Cleaned up in `finally` so a failure never leaves a stray
  // .tmp file to be picked up by the manifest or shipped to production.
  const tmp = `${file}.tmp`;

  try {
    const { width, height } = await sharp(file).metadata();

    // Constrain the longest edge, not just width, so a portrait photo does
    // not stay oversized in the dimension that actually dominates its weight.
    const longest = Math.max(width, height);
    const scale = longest > MAX_EDGE ? MAX_EDGE / longest : 1;

    let pipeline = sharp(file)
      // Bakes in EXIF orientation before the metadata is dropped, so a
      // rotated phone photo does not come out sideways.
      .rotate()
      .resize({
        width: Math.round(width * scale),
        withoutEnlargement: true,
      });

    pipeline =
      ext === ".png"
        ? pipeline.png({ compressionLevel: 9, palette: true, effort: 8 })
        : pipeline.jpeg({ quality: 82, mozjpeg: true, progressive: true });

    await pipeline.toFile(tmp);

    const newSize = statSync(tmp).size;
    if (newSize < originalSize) {
      renameSync(tmp, file);
      after += newSize;
      const pct = (100 * (1 - newSize / originalSize)).toFixed(0);
      console.log(
        `${file}  ${(originalSize / 1024).toFixed(0)}K -> ${(newSize / 1024).toFixed(0)}K  (-${pct}%)`
      );
    } else {
      after += originalSize;
      console.log(`${file}  kept (${(originalSize / 1024).toFixed(0)}K)`);
    }
  } catch (error) {
    after += originalSize;
    console.error(`${file}  FAILED: ${error.message}`);
    process.exitCode = 1;
  } finally {
    if (existsSync(tmp)) rmSync(tmp, { force: true });
  }
}

console.log(
  `\nTOTAL ${(before / 1048576).toFixed(2)}MB -> ${(after / 1048576).toFixed(2)}MB` +
    `  (saved ${(100 * (1 - after / before)).toFixed(1)}%)`
);

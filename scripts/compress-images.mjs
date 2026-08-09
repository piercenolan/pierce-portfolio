/**
 * Resizes, recompresses, and strips all metadata (EXIF/GPS) from images in
 * public/images, in place. Idempotent: files that would not get smaller are
 * left untouched. Run after adding new assets.
 */
import sharp from 'sharp';
import { readdirSync, statSync, renameSync } from 'fs';
import { join, extname } from 'path';

const MAX_W = 2000;
function walk(d, out=[]) {
  for (const f of readdirSync(d)) {
    const p = join(d,f);
    if (statSync(p).isDirectory()) walk(p,out); else out.push(p);
  }
  return out;
}
const files = walk('public/images');
let before=0, after=0;
for (const f of files) {
  const ext = extname(f).toLowerCase();
  if (!['.jpg','.jpeg','.png'].includes(ext)) { const s=statSync(f).size; before+=s; after+=s; continue; }
  const b4 = statSync(f).size; before += b4;
  const img = sharp(f, { limitInputPixels: 268402689 });
  const meta = await img.metadata();
  const w = Math.min(meta.width, MAX_W);
  const tmp = f + '.tmp';
  // rotate() applies EXIF orientation then metadata is dropped by default
  let pipe = sharp(f).rotate().resize({ width: w, withoutEnlargement: true });
  if (ext === '.png') pipe = pipe.png({ compressionLevel: 9, palette: true, quality: 90, effort: 8 });
  else pipe = pipe.jpeg({ quality: 82, mozjpeg: true, progressive: true });
  await pipe.toFile(tmp);
  const a4 = statSync(tmp).size;
  if (a4 < b4) { renameSync(tmp, f); after += a4; console.log(`${f}  ${(b4/1024).toFixed(0)}K -> ${(a4/1024).toFixed(0)}K  (${meta.width}x${meta.height} -> ${w}px)`); }
  else { await import('fs').then(m=>m.unlinkSync(tmp)); after += b4; console.log(`${f}  kept (${(b4/1024).toFixed(0)}K)`); }
}
console.log(`\nTOTAL ${(before/1048576).toFixed(2)}MB -> ${(after/1048576).toFixed(2)}MB  (saved ${(100*(1-after/before)).toFixed(1)}%)`);

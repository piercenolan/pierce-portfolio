/**
 * Fails the build if any foreground/background pair the site actually uses
 * drops below its WCAG 2.1 AA contrast threshold.
 *
 * Colours are read from tailwind.config.ts rather than restated here, so this
 * checks the real palette and cannot drift from it.
 *
 * Run via `npm run check:contrast`, and as part of `npm test`.
 */
import { readFileSync } from "fs";

const config = readFileSync("tailwind.config.ts", "utf8");

/** Pulls `name: "#RRGGBB"` pairs out of the colors block. */
function readPalette() {
  const block = config.slice(
    config.indexOf("colors: {"),
    config.indexOf("fontFamily:")
  );
  const palette = {};
  for (const [, name, hex] of block.matchAll(
    /(\w+):\s*"(#[0-9A-Fa-f]{6})"/g
  )) {
    palette[name] = hex;
  }
  return palette;
}

const c = readPalette();

function luminance(hex) {
  const n = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255);
  const f = (v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const AA_NORMAL = 4.5;
const AA_LARGE = 3.0; // >=24px, or >=18.66px bold

/**
 * Every foreground/background pair the site renders, with the threshold that
 * applies to the size it is rendered at.
 */
const pairs = [
  ["body copy", c.graphite, c.bench, AA_NORMAL],
  ["body copy on panel", c.graphite, c.panel, AA_NORMAL],
  ["headings", c.ink, c.bench, AA_NORMAL],
  ["headings on panel", c.ink, c.panel, AA_NORMAL],
  ["inline link", c.signal, c.panel, AA_NORMAL],
  ["inline link on bench", c.signal, c.bench, AA_NORMAL],
  ["hero accent word (large)", c.signal, c.bench, AA_LARGE],
  ["good callout", c.pass, c.panel, AA_NORMAL],
  ["bad callout", c.fault, c.panel, AA_NORMAL],
  ["button label", c.bench, c.ink, AA_NORMAL],
];

/**
 * Known, deliberate exceptions.
 *
 * tab:orange is the site's signature "measured value" colour and its use in
 * figure numbers and [LABEL] blocks is an explicit design decision by the
 * owner. It does not meet AA as small text. Recorded here rather than silently
 * passing, so the trade-off stays visible and can be revisited.
 */
const exceptions = [
  ["measured-value orange", c.measure, c.panel, AA_NORMAL],
  ["measured-value orange on bench", c.measure, c.bench, AA_NORMAL],
];

let failed = 0;
console.log("Contrast check (WCAG 2.1 AA)\n");

for (const [name, fg, bg, threshold] of pairs) {
  if (!fg || !bg) {
    console.error(`  ERROR ${name}: colour missing from palette`);
    failed++;
    continue;
  }
  const value = ratio(fg, bg);
  const ok = value >= threshold;
  if (!ok) failed++;
  console.log(
    `  ${ok ? "pass" : "FAIL"}  ${name.padEnd(28)} ${value.toFixed(2)}:1  (needs ${threshold})`
  );
}

console.log("\nAccepted exceptions (reported, not enforced):");
for (const [name, fg, bg, threshold] of exceptions) {
  console.log(
    `  note  ${name.padEnd(28)} ${ratio(fg, bg).toFixed(2)}:1  (AA would need ${threshold})`
  );
}

if (failed > 0) {
  console.error(`\n${failed} contrast check(s) failed.`);
  process.exit(1);
}
console.log("\nAll enforced pairs pass.");

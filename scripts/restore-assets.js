// Restores binary image assets from their base64 text copies.
// GitHub file pushes only support UTF-8 text, so the real PNGs live here as
// .b64 text files; this script recreates the PNGs before `next build` runs.
const fs = require("fs");
const path = require("path");

const pairs = [
  ["public/logo.png.b64", "public/logo.png"],
  ["app/icon.png.b64", "app/icon.png"],
];

for (const [src, dest] of pairs) {
  const srcPath = path.join(__dirname, "..", src);
  const destPath = path.join(__dirname, "..", dest);
  if (!fs.existsSync(srcPath)) {
    console.log(`restore-assets: skip ${src} (not found)`);
    continue;
  }
  const b64 = fs.readFileSync(srcPath, "utf8").replace(/\s+/g, "");
  fs.writeFileSync(destPath, Buffer.from(b64, "base64"));
  console.log(`restore-assets: wrote ${dest}`);
}

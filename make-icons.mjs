// Generates Android launcher icons from icon.png into the Capacitor android project.
// Runs in CI after `npx cap add android`.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const RES = process.env.RES_DIR || "android/app/src/main/res";
const SRC = "icon.png";
const BG = "#071029"; // the icon's own background colour
const dens = { mdpi: 1, hdpi: 1.5, xhdpi: 2, xxhdpi: 3, xxxhdpi: 4 };
const { width: W } = await sharp(SRC).metadata();

const roundedMask = (n, r) =>
  Buffer.from(`<svg width="${n}" height="${n}"><rect width="${n}" height="${n}" rx="${r}" ry="${r}"/></svg>`);
const circleMask = (n) =>
  Buffer.from(`<svg width="${n}" height="${n}"><circle cx="${n / 2}" cy="${n / 2}" r="${n / 2}"/></svg>`);

for (const [d, s] of Object.entries(dens)) {
  const dir = path.join(RES, `mipmap-${d}`);
  fs.mkdirSync(dir, { recursive: true });

  // Legacy launcher icons (Android < 8)
  const px = Math.round(48 * s);
  const trim = Math.round(W * 0.02); // trims the source image's thin dark rim
  const base = await sharp(SRC)
    .extract({ left: trim, top: trim, width: W - 2 * trim, height: W - 2 * trim })
    .resize(px, px).ensureAlpha().png().toBuffer();
  await sharp(base)
    .composite([{ input: roundedMask(px, px * 0.23), blend: "dest-in" }])
    .png().toFile(path.join(dir, "ic_launcher.png"));
  await sharp(base)
    .composite([{ input: circleMask(px), blend: "dest-in" }])
    .png().toFile(path.join(dir, "ic_launcher_round.png"));

  // Adaptive icon foreground (Android 8+): artwork kept inside the safe zone
  const fg = Math.round(108 * s);
  const inner = Math.round(fg * 0.62);
  const inset = Math.round(W * 0.1);
  const crop = await sharp(SRC)
    .extract({ left: inset, top: inset, width: W - 2 * inset, height: W - 2 * inset })
    .resize(inner, inner).png().toBuffer();
  await sharp({ create: { width: fg, height: fg, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: crop, gravity: "center" }])
    .png().toFile(path.join(dir, "ic_launcher_foreground.png"));
}

const write = (rel, text) => {
  const f = path.join(RES, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, text);
};
write("values/ic_launcher_background.xml",
`<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="ic_launcher_background">${BG}</color>
</resources>
`);
const adaptive =
`<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>
`;
write("mipmap-anydpi-v26/ic_launcher.xml", adaptive);
write("mipmap-anydpi-v26/ic_launcher_round.xml", adaptive);
console.log("Icons written to", RES);

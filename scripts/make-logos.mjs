// Generates the PACS, Hospio and Meridian logos.
//
//   npm run logos
//
// Writes pure-vector SVGs (lettering converted to outlines) to public/brand/, then exports
// high-resolution PNGs of the stacked logos and app icons to logos/ using the installed Chrome.
// Edit the `products` table below (marks, taglines, colours) and re-run.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import opentype from "opentype.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public/brand");
const PNG_OUT = path.join(ROOT, "logos");
const require = createRequire(import.meta.url);
const fontDir = path.join(path.dirname(require.resolve("@fontsource/sora/package.json")), "files");
const bold = opentype.loadSync(path.join(fontDir, "sora-latin-700-normal.woff"));
const semi = opentype.loadSync(path.join(fontDir, "sora-latin-600-normal.woff"));

const NAVY = "#0E1B2E";

/** Lay out text glyph by glyph (with tracking) and return outline path data + width. */
function outline(font, text, size, tracking = 0) {
  let x = 0;
  const parts = [];
  for (const ch of text) {
    const g = font.charToGlyph(ch);
    parts.push({ ch, x });
    x += (g.advanceWidth / font.unitsPerEm) * size + tracking;
  }
  const width = x - tracking;
  return {
    width,
    at(ox, oy) {
      return parts.map(({ ch, x }) => font.getPath(ch, ox + x, oy, size).toPathData(2)).join("");
    },
  };
}

/** Wordmark: segments of { text, fill }. */
function wordmark(segments, size) {
  const laid = segments.map((s) => ({ ...s, o: outline(bold, s.text, size, -size * 0.02) }));
  const width = laid.reduce((w, s) => w + s.o.width, 0) + (laid.length - 1) * (-size * 0.02);
  return {
    width,
    render(x, y) {
      let cx = x;
      return laid
        .map((s) => {
          const d = s.o.at(cx, y);
          cx += s.o.width - size * 0.02;
          return `<path d="${d}" fill="${s.fill}"/>`;
        })
        .join("");
    },
  };
}

/** Tagline in the RestoQR style: navy words, accent full stops, accent rules either side. */
function tagline(words, size, accent) {
  const tracking = size * 0.22;
  const items = [];
  words.forEach((w, i) => {
    items.push({ o: outline(semi, w, size, tracking), fill: NAVY });
    items.push({ o: outline(semi, ".", size, tracking), fill: accent });
    if (i < words.length - 1) items.push({ o: outline(semi, " ", size, tracking), fill: NAVY });
  });
  const width = items.reduce((w, it) => w + it.o.width + tracking, 0) - tracking;
  return {
    width,
    render(x, y, rule) {
      let cx = x;
      const text = items
        .map((it) => {
          const d = it.o.at(cx, y);
          cx += it.o.width + tracking;
          return `<path d="${d}" fill="${it.fill}"/>`;
        })
        .join("");
      const ry = y - size * 0.36;
      const rules = rule
        ? `<rect x="${x - rule - size * 0.8}" y="${ry - 2.5}" width="${rule}" height="5" rx="2.5" fill="${accent}"/>` +
          `<rect x="${x + width + size * 0.8}" y="${ry - 2.5}" width="${rule}" height="5" rx="2.5" fill="${accent}"/>`
        : "";
      return rules + text;
    },
  };
}

// ---------------------------------------------------------------------------
// Marks, each drawn in a 200×200 box. `id` keeps gradient ids unique per file.

const products = {
  pacs: {
    name: [{ text: "PACS", fill: NAVY }],
    tagline: ["CAPTURE", "STORE", "VIEW", "REPORT"],
    accent: "#F2361C",
    grad: ["#FF8A1F", "#E01422"],
    mark: (id) => `
      <g fill="none" stroke="${NAVY}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 66 V30 a8 8 0 0 1 8-8 H66"/>
        <path d="M134 22 H170 a8 8 0 0 1 8 8 V66"/>
        <path d="M178 134 V170 a8 8 0 0 1-8 8 H134"/>
        <path d="M66 178 H30 a8 8 0 0 1-8-8 V134"/>
      </g>
      <circle cx="100" cy="100" r="50" fill="none" stroke="url(#${id})" stroke-width="15"/>
      <path d="M100 74 A26 26 0 1 0 126 100" fill="none" stroke="${NAVY}" stroke-width="11" stroke-linecap="round"/>
      <circle cx="100" cy="100" r="9" fill="url(#${id})"/>
      <circle cx="138" cy="62" r="7" fill="${NAVY}"/>`,
  },
  hospio: {
    name: [
      { text: "Hosp", fill: NAVY },
      { text: "io", fill: "url(#wm)" },
    ],
    tagline: ["ADMIT", "CARE", "HEAL"],
    accent: "#E01422",
    grad: ["#FF5A5F", "#B3001B"],
    mark: (id) => `
      <rect x="34" y="26" width="34" height="148" rx="17" fill="${NAVY}"/>
      <rect x="132" y="26" width="34" height="148" rx="17" fill="${NAVY}"/>
      <path d="M12 106 H66 L82 70 L102 146 L120 84 L134 106 H188" fill="none" stroke="#fff" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 106 H66 L82 70 L102 146 L120 84 L134 106 H188" fill="none" stroke="url(#${id})" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>`,
  },
  meridian: {
    name: [{ text: "Meridian", fill: NAVY }],
    tagline: ["ASK", "VERIFY", "TRUST"],
    accent: "#F2361C",
    grad: ["#FFA41B", "#E01422"],
    mark: (id) => `
      <circle cx="100" cy="100" r="78" fill="none" stroke="${NAVY}" stroke-width="13"/>
      <ellipse cx="100" cy="100" rx="32" ry="78" fill="none" stroke="${NAVY}" stroke-width="6" opacity="0.28"/>
      <path d="M22 100 H178" stroke="${NAVY}" stroke-width="6" opacity="0.28"/>
      <path d="M152 48 L113 113 L87 87 Z" fill="url(#${id})"/>
      <path d="M48 152 L87 87 L113 113 Z" fill="${NAVY}"/>
      <circle cx="100" cy="100" r="9" fill="#fff" stroke="${NAVY}" stroke-width="4"/>`,
  },
};

function gradientDefs(id, [a, b], x1 = 0, y1 = 0, x2 = 1, y2 = 1) {
  return `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
}

const svg = (w, h, body, title) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${title}"><title>${title}</title>${body}</svg>\n`;

fs.mkdirSync(OUT, { recursive: true });

for (const [slug, p] of Object.entries(products)) {
  const title = p.name.map((s) => s.text).join("");
  const defs = `<defs>${gradientDefs("g", p.grad)}${gradientDefs("wm", p.grad, 0, 0, 1, 0)}</defs>`;

  // 1. Mark only
  fs.writeFileSync(path.join(OUT, `${slug}-mark.svg`), svg(200, 200, defs + p.mark("g"), title));

  // 2. App icon: mark on a white rounded tile
  fs.writeFileSync(
    path.join(OUT, `${slug}-icon.svg`),
    svg(512, 512, `${defs}<rect width="512" height="512" rx="112" fill="#fff"/><g transform="translate(86 86) scale(1.7)">${p.mark("g")}</g>`, title),
  );

  // 3. Stacked logo (mark over wordmark over tagline), like the RestoQR logo
  const W = 960;
  const wm = wordmark(p.name, 190);
  const tg = tagline(p.tagline, 34, p.accent);
  const markSize = 380;
  const stacked =
    defs +
    `<g transform="translate(${(W - markSize) / 2} 20) scale(${markSize / 200})">${p.mark("g")}</g>` +
    wm.render((W - wm.width) / 2, 600) +
    tg.render((W - tg.width) / 2, 700, Math.max(0, Math.min(110, (W - tg.width) / 2 - 60)));
  fs.writeFileSync(path.join(OUT, `${slug}-logo.svg`), svg(W, 740, stacked, title));

  // 4. Horizontal lockup (mark left, wordmark right) for headers
  const hm = wordmark(p.name, 120);
  const ht = tagline(p.tagline, 22, p.accent);
  const HW = 200 + 40 + Math.max(hm.width, ht.width) + 20;
  const horizontal =
    defs +
    `<g transform="translate(10 10) scale(0.9)">${p.mark("g")}</g>` +
    hm.render(230, 125) +
    ht.render(234, 180, 0);
  fs.writeFileSync(path.join(OUT, `${slug}-logo-horizontal.svg`), svg(Math.ceil(HW), 200, horizontal, title));

  console.log(`${slug}: SVGs written`);
}

// ---------------------------------------------------------------------------
// PNG export for use outside the website (decks, documents, social).

const pngNames = { pacs: "PACS", hospio: "Hospio", meridian: "Meridian" };
try {
  const { chromium } = await import("playwright-core");
  const browser = await chromium.launch({ channel: "chrome" });
  fs.mkdirSync(PNG_OUT, { recursive: true });
  for (const [slug, name] of Object.entries(pngNames)) {
    for (const kind of ["logo", "icon"]) {
      const svgText = fs.readFileSync(path.join(OUT, `${slug}-${kind}.svg`), "utf8");
      const [, w, h] = svgText.match(/viewBox="0 0 (\d+) (\d+)"/);
      const page = await browser.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 2 });
      await page.setContent(`<html><body style="margin:0;background:transparent">${svgText}</body></html>`);
      await page.screenshot({ path: path.join(PNG_OUT, `${name}-${kind}.png`), omitBackground: true, clip: { x: 0, y: 0, width: +w, height: +h } });
      await page.close();
    }
    console.log(`${slug}: PNGs written`);
  }
  await browser.close();
} catch (err) {
  console.warn("PNG export skipped (needs Google Chrome installed):", err.message);
}

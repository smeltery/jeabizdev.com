import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Icon from "../src/components/Icon.tsx";
import { Resvg } from "@resvg/resvg-js";

const mark = await readFile(
  new URL("../public/brand/mark.svg", import.meta.url),
  "utf8",
);
const photo = await sharp(
  await readFile(new URL("../public/images/partnership.webp", import.meta.url)),
)
  .jpeg({ quality: 90 })
  .toBuffer();
const markPaths = mark.match(/<svg[^>]*>([\s\S]*?)<\/svg>/)?.[1];
if (!markPaths) throw new Error("The JEA mark must contain valid SVG artwork.");

const icon = (name, x, y) =>
  `<g transform="translate(${x} ${y})" color="#2563eb">${renderToStaticMarkup(createElement(Icon, { name, size: 24 }))}</g>`;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#ffffff"/>
  <image x="750" width="450" height="526" href="data:image/jpeg;base64,${photo.toString("base64")}" preserveAspectRatio="xMidYMid slice"/>
  <rect x="750" width="4" height="526" fill="#2563eb"/>
  <g transform="translate(54 45) scale(1.7)" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${markPaths}</g>
  <text x="109" y="75" font-family="Arial,sans-serif" font-size="25" font-weight="700" fill="#1f2937">JEA BizDev Consulting</text>
  <text x="56" y="172" font-family="Arial,sans-serif" font-size="12" font-weight="700" letter-spacing="2.5" fill="#2563eb">BIOTECH &amp; BIOPHARMA ADVISORY</text>
  <g font-family="Georgia,serif" font-size="68" letter-spacing="-2.5">
    <text x="52" y="266" fill="#172b50">Cross-border deals.</text>
    <text x="52" y="348" fill="#2563eb" font-style="italic">Lasting value.</text>
  </g>
  ${icon("briefcase", 56, 388)}${icon("globe", 56, 430)}
  <g font-family="Arial,sans-serif" font-size="17" fill="#4b5563">
    <text x="92" y="407">From partnering strategy to signed agreements.</text>
    <text x="92" y="449">Connecting biotech across North America, Europe &amp; Asia.</text>
  </g>
  <rect y="526" width="1200" height="104" fill="#eff6ff"/>
  <path d="M0 526h1200M405 553v48M803 553v48" stroke="#d2e1f7"/>
  ${icon("user", 24, 566)}${icon("briefcase", 413, 566)}${icon("chart", 811, 566)}
  <g font-family="Georgia,serif" font-size="37" fill="#2563eb">
    <text x="56" y="590">25+</text><text x="445" y="590">85</text><text x="843" y="590">$25B+</text>
  </g>
  <g font-family="Arial,sans-serif" font-size="13" fill="#172b50">
    <text x="145" y="575">Years in healthcare</text><text x="145" y="595">leadership</text>
    <text x="515" y="575">Partnerships</text><text x="515" y="595">executed</text>
    <text x="982" y="575">Total partnership</text><text x="982" y="595">value</text>
  </g>
</svg>`;
await writeFile(new URL("../public/brand/social.svg", import.meta.url), svg);
await writeFile(
  new URL("../public/brand/social.png", import.meta.url),
  new Resvg(svg).render().asPng(),
);
console.log("Generated JEA social preview: 1200 × 630 (SVG and PNG).");

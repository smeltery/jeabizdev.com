import { readFile, writeFile } from "node:fs/promises";
import { Resvg } from "@resvg/resvg-js";

const mark = await readFile(
  new URL("../public/brand/mark.svg", import.meta.url),
  "utf8",
);
const world = await readFile(
  new URL("../src/components/World.astro", import.meta.url),
  "utf8",
);
const markPaths = mark.match(/<svg[^>]*>([\s\S]*?)<\/svg>/)?.[1];
const worldPaths = world.match(/<svg[^>]*>([\s\S]*?)<\/svg>/)?.[1];
if (!markPaths || !worldPaths)
  throw new Error("The JEA mark and globe must contain valid SVG artwork.");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs><clipPath id="panel"><rect x="750" width="450" height="526"/></clipPath></defs>
  <rect width="1200" height="630" fill="#ffffff"/>
  <rect x="750" width="450" height="526" fill="#172b50"/>
  <rect x="750" width="4" height="526" fill="#2563eb"/>
  <g transform="translate(54 45) scale(1.7)" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${markPaths}</g>
  <text x="109" y="75" font-family="Arial,sans-serif" font-size="25" font-weight="700" fill="#1f2937">JEA BizDev Consulting</text>
  <text x="56" y="172" font-family="Arial,sans-serif" font-size="12" font-weight="700" letter-spacing="2.5" fill="#2563eb">BIOTECH &amp; BIOPHARMA ADVISORY</text>
  <g font-family="Georgia,serif" font-size="68" letter-spacing="-2.5">
    <text x="52" y="266" fill="#172b50">Connecting science.</text>
    <text x="52" y="348" fill="#2563eb" font-style="italic">Creating value.</text>
  </g>
  <g font-family="Arial,sans-serif" font-size="19" fill="#4b5563">
    <text x="56" y="405">Strategic perspective. Global relationships.</text>
    <text x="56" y="435">The right partner for your next chapter.</text>
  </g>
  <text x="56" y="484" font-family="Arial,sans-serif" font-size="13" fill="#2563eb">jeabizdev.com</text>
  <g clip-path="url(#panel)"><svg x="728" y="50" width="490" height="400" viewBox="0 0 600 490" fill="none">${worldPaths}</svg></g>
  <text x="790" y="61" font-family="Arial,sans-serif" font-size="10" letter-spacing="1.7" fill="#bfdbfe">CONNECTED ACROSS CONTINENTS</text>
  <text x="790" y="470" font-family="Georgia,serif" font-size="23" fill="#ffffff">Opportunity knows no borders.</text>
  <rect y="526" width="1200" height="104" fill="#eff6ff"/>
  <path d="M0 526h1200M405 553v48M803 553v48" stroke="#d2e1f7"/>
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

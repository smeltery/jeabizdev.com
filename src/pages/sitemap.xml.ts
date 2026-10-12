import type { APIRoute } from "astro";
import { assets } from "../../data/assets";
export const GET: APIRoute = () => {
  const paths = [
    "",
    "/about",
    "/services",
    "/approach",
    "/assets",
    "/transactions",
    "/contact",
    "/privacy",
    "/disclaimer",
    "/brand",
    ...assets.map((asset) => `/assets/${asset.id}`),
  ];
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `<url><loc>https://jeabizdev.com${path}</loc></url>`).join("")}</urlset>`,
    { headers: { "Content-Type": "application/xml" } },
  );
};

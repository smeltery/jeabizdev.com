import type { APIRoute } from "astro";
import { deliverInquiry } from "../../server/inquiry";
export const prerender = false;
export const POST: APIRoute = ({ request }) =>
  deliverInquiry(
    request,
    process.env.FORMCARRY_URL || import.meta.env.FORMCARRY_URL,
  );

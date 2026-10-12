export interface Inquiry {
  name: string;
  email: string;
  company: string;
  role: string;
  subject: string;
  asset: string;
  territory: string;
  timeline: string;
  engagement: string;
  message: string;
  consent: boolean;
  website: string;
}
const limits: Record<Exclude<keyof Inquiry, "consent">, number> = {
  name: 100,
  email: 200,
  company: 200,
  role: 150,
  subject: 200,
  asset: 150,
  territory: 150,
  timeline: 100,
  engagement: 100,
  message: 5000,
  website: 200,
};
export function validateInquiry(input: unknown): Inquiry {
  if (!input || typeof input !== "object" || Array.isArray(input))
    throw new Error("Please provide your inquiry details.");
  const source = input as Record<string, unknown>;
  const fields: Record<string, string> = {};
  for (const [key, max] of Object.entries(limits)) {
    const value = source[key] ?? "";
    if (typeof value !== "string" || value.length > max)
      throw new Error(
        `Please check the ${key} field (maximum ${max} characters).`,
      );
    fields[key] = value.trim();
  }
  if (!fields.name || !fields.company || !fields.message)
    throw new Error("Name, company, and a short introduction are required.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    throw new Error("Please enter a valid email address.");
  if (source.consent !== true)
    throw new Error(
      "Please agree to the use of your details to respond to this inquiry.",
    );
  return { ...fields, consent: true } as Inquiry;
}
export function inquiryText(data: Inquiry): string {
  return [
    ["Name", data.name],
    ["Email", data.email],
    ["Company", data.company],
    ["Role", data.role],
    ["Support needed", data.subject],
    ["Asset of interest", data.asset],
    ["Territories", data.territory],
    ["Timeline", data.timeline],
    ["Engagement model", data.engagement],
    ["Introduction", data.message],
  ]
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n\n");
}
export async function deliverInquiry(
  request: Request,
  endpoint: string | undefined,
  fetcher: typeof fetch = fetch,
): Promise<Response> {
  const reply = (status: number, message: string) =>
    Response.json({ message }, { status });
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return reply(403, "This request must come from the JEA website.");
  if (!request.headers.get("content-type")?.includes("application/json"))
    return reply(415, "Please submit the form as JSON.");
  let input: unknown;
  try {
    const body = await request.text();
    if (body.length > 15000)
      return reply(
        413,
        "Your inquiry is too long. Please shorten the message.",
      );
    input = JSON.parse(body);
  } catch {
    return reply(400, "The inquiry could not be read. Please try again.");
  }
  let data: Inquiry;
  try {
    data = validateInquiry(input);
  } catch (error) {
    return reply(
      400,
      error instanceof Error ? error.message : "Please check your details.",
    );
  }
  if (data.website) return reply(400, "The inquiry could not be submitted.");
  if (!endpoint)
    return reply(
      503,
      "Online delivery is unavailable. Download your introduction or email jeabizdev@gmail.com.",
    );
  try {
    const target = new URL(endpoint);
    if (target.protocol !== "https:")
      return reply(
        503,
        "Online delivery is unavailable. Please email jeabizdev@gmail.com.",
      );
    const response = await fetcher(target, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        company: data.company,
        subject: data.subject || "JEA website inquiry",
        message: inquiryText(data),
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok)
      return reply(
        502,
        "Delivery failed. Your details are still here; retry or use the email draft.",
      );
    return reply(200, "Thank you. Your inquiry has been sent to JEA.");
  } catch {
    return reply(
      502,
      "Delivery could not be confirmed. Please try again or use the email draft.",
    );
  }
}

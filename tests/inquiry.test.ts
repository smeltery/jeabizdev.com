import { describe, expect, it, vi } from "vitest";
import {
  deliverInquiry,
  inquiryText,
  validateInquiry,
} from "../src/server/inquiry";
const valid = {
  name: "Test Person",
  email: "test@example.com",
  company: "Example Biotech",
  message: "Non-confidential partnering inquiry.",
  consent: true,
  subject: "Partnership",
  asset: "KAT6 Inhibitor",
};
const request = (body: unknown = valid, origin = "https://jeabizdev.com") =>
  new Request("https://jeabizdev.com/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: origin },
    body: JSON.stringify(body),
  });
describe("inquiry validation and delivery", () => {
  it("keeps relevant context in the delivered introduction", () => {
    const text = inquiryText(validateInquiry(valid));
    expect(text).toContain("KAT6 Inhibitor");
    expect(text).toContain("Example Biotech");
    expect(text).not.toContain("undefined");
  });
  it.each([
    { ...valid, email: "invalid" },
    { ...valid, consent: false },
    { ...valid, name: " " },
    { ...valid, message: "a".repeat(5001) },
    { ...valid, company: [] },
  ])("rejects invalid inquiry %#", (body) =>
    expect(() => validateInquiry(body)).toThrow(),
  );
  it("reports success only after the provider accepts the request", async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValue(new Response("{}", { status: 200 }));
    const response = await deliverInquiry(
      request(),
      "https://formcarry.com/s/test",
      fetcher,
    );
    expect(response.status).toBe(200);
    expect(fetcher).toHaveBeenCalledOnce();
    expect(JSON.parse(fetcher.mock.calls[0][1].body).message).toContain(
      "Asset of interest: KAT6 Inhibitor",
    );
  });
  it("does not contact the provider for cross-origin, spam, or invalid requests", async () => {
    const fetcher = vi.fn();
    expect(
      (
        await deliverInquiry(
          request(valid, "https://other.example"),
          "https://formcarry.com/s/test",
          fetcher,
        )
      ).status,
    ).toBe(403);
    expect(
      (
        await deliverInquiry(
          request({ ...valid, website: "spam" }),
          "https://formcarry.com/s/test",
          fetcher,
        )
      ).status,
    ).toBe(400);
    expect(
      (
        await deliverInquiry(
          request({ ...valid, consent: false }),
          "https://formcarry.com/s/test",
          fetcher,
        )
      ).status,
    ).toBe(400);
    expect(fetcher).not.toHaveBeenCalled();
  });
  it("handles missing configuration and provider failures honestly", async () => {
    expect((await deliverInquiry(request(), undefined)).status).toBe(503);
    expect(
      (
        await deliverInquiry(
          request(),
          "https://formcarry.com/s/test",
          vi.fn().mockResolvedValue(new Response("{}", { status: 500 })),
        )
      ).status,
    ).toBe(502);
    expect(
      (
        await deliverInquiry(
          request(),
          "https://formcarry.com/s/test",
          vi.fn().mockRejectedValue(new Error("network")),
        )
      ).status,
    ).toBe(502);
  });
  it("rejects malformed JSON", async () => {
    const req = new Request("https://jeabizdev.com/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{",
    });
    expect((await deliverInquiry(req, undefined)).status).toBe(400);
  });
});

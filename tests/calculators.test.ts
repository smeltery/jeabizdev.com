import { describe, expect, it } from "vitest";
import { calculate } from "../src/tools/calculate";
import { tools } from "../src/tools/catalog";
const defaults = (slug: string) =>
  Object.fromEntries(
    tools
      .find((tool) => tool.slug === slug)!
      .fields.map((field) => [field.key, field.value]),
  );
describe("business development scenarios", () => {
  it.each([
    ["deal-value", 500],
    ["royalty-revenue", 40],
    ["tiered-royalties", 70],
    ["milestone-present-value", 62.0921323059],
    ["risk-adjusted-milestone", 18.6276396918],
    ["deal-comparison", 12.5],
    ["upfront-share", 5],
    ["royalty-break-even", 625],
    ["cash-runway", 15],
    ["runway-extension", 10],
    ["funding-gap", 16],
    ["development-budget", 30],
    ["cost-sharing", 32],
    ["partnering-funnel", 12],
    ["diligence-capacity", 60],
    ["engagement-budget", 30000],
  ])("%s matches its independently worked example", (slug, expected) => {
    expect(
      calculate(slug as string, defaults(slug as string)).value,
    ).toBeCloseTo(expected as number, 5);
  });
  it("applies marginal royalty rates only above the threshold", () => {
    expect(
      calculate("tiered-royalties", {
        sales: 300,
        threshold: 500,
        low: 8,
        high: 12,
      }).value,
    ).toBe(24);
    expect(
      calculate("tiered-royalties", {
        sales: 500,
        threshold: 500,
        low: 8,
        high: 12,
      }).value,
    ).toBe(40);
  });
  it("does not report negative funding needs", () =>
    expect(
      calculate("funding-gap", { cash: 100, burn: 2, months: 18 }).value,
    ).toBe(0));
  it("handles zero discount and zero probability", () => {
    expect(
      calculate("milestone-present-value", {
        payment: 100,
        years: 5,
        discount: 0,
      }).value,
    ).toBe(100);
    expect(
      calculate("risk-adjusted-milestone", {
        payment: 100,
        years: 5,
        discount: 10,
        probability: 0,
      }).value,
    ).toBe(0);
  });
  it("rejects division by zero and inconsistent headline values", () => {
    expect(() => calculate("cash-runway", { cash: 30, burn: 0 })).toThrow(
      "greater than zero",
    );
    expect(() =>
      calculate("royalty-break-even", { target: 50, rate: 0 }),
    ).toThrow("greater than zero");
    expect(() =>
      calculate("upfront-share", { upfront: 100, total: 50 }),
    ).toThrow("cannot exceed");
  });
  it("rejects empty, non-finite, out-of-range and fractional count inputs", () => {
    for (const rate of [NaN, Infinity, -1, 101])
      expect(() =>
        calculate("royalty-revenue", { sales: 500, rate }),
      ).toThrow();
    expect(() =>
      calculate("partnering-funnel", {
        partners: 1.5,
        response: 40,
        qualified: 50,
      }),
    ).toThrow();
  });
});

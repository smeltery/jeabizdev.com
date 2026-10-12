import { tools } from "./catalog";
export interface Result {
  value: number;
  unit: "moneyM" | "money" | "percent" | "months" | "number" | "hours";
  label: string;
  rows: { label: string; value: number; unit: Result["unit"] }[];
}
export function calculate(
  slug: string,
  values: Record<string, number>,
): Result {
  const tool = tools.find((item) => item.slug === slug);
  if (!tool) throw new Error("Unknown tool.");
  for (const field of tool.fields) {
    const value = values[field.key];
    if (
      !Number.isFinite(value) ||
      value < field.min ||
      value > field.max ||
      (field.step === 1 && !Number.isInteger(value))
    )
      throw new Error(
        `Enter a valid ${field.label.toLowerCase()} between ${field.min} and ${field.max}.`,
      );
  }
  const v = values;
  const result = (
    value: number,
    label: string,
    unit: Result["unit"] = "moneyM",
    rows: Result["rows"] = [],
  ): Result => ({ value, label, unit, rows });
  const row = (
    label: string,
    value: number,
    unit: Result["unit"] = "moneyM",
  ) => ({ label, value, unit });
  const positive = (value: number, label: string) => {
    if (value <= 0) throw new Error(`${label} must be greater than zero.`);
  };
  switch (slug) {
    case "deal-value":
      return result(
        v.upfront + v.development + v.commercial,
        "Headline deal value",
        "moneyM",
        [
          row("Upfront", v.upfront),
          row("Contingent milestones", v.development + v.commercial),
        ],
      );
    case "royalty-revenue":
      return result((v.sales * v.rate) / 100, "Estimated annual royalties");
    case "tiered-royalties": {
      const first = (Math.min(v.sales, v.threshold) * v.low) / 100,
        second = (Math.max(0, v.sales - v.threshold) * v.high) / 100;
      return result(first + second, "Estimated annual royalties", "moneyM", [
        row("First tier", first),
        row("Second tier", second),
      ]);
    }
    case "milestone-present-value":
      return result(
        v.payment / (1 + v.discount / 100) ** v.years,
        "Present value of milestone",
      );
    case "risk-adjusted-milestone":
      return result(
        (v.payment * v.probability) / 100 / (1 + v.discount / 100) ** v.years,
        "Risk-adjusted present value",
      );
    case "deal-comparison": {
      const a = v.upfrontA + (v.milestoneA * v.probabilityA) / 100,
        b = v.upfrontB + (v.milestoneB * v.probabilityB) / 100;
      return result(
        b - a,
        "Offer B minus Offer A · scenario difference",
        "moneyM",
        [row("Offer A scenario value", a), row("Offer B scenario value", b)],
      );
    }
    case "upfront-share":
      positive(v.total, "Headline value");
      if (v.upfront > v.total)
        throw new Error("Upfront payment cannot exceed headline value.");
      return result(
        (v.upfront / v.total) * 100,
        "Upfront share of headline value",
        "percent",
      );
    case "royalty-break-even":
      positive(v.rate, "Royalty rate");
      return result(v.target / (v.rate / 100), "Required cumulative net sales");
    case "cash-runway":
      positive(v.burn, "Monthly net burn");
      return result(v.cash / v.burn, "Estimated cash runway", "months");
    case "runway-extension":
      positive(v.burn, "Monthly net burn");
      return result(v.upfront / v.burn, "Additional runway", "months", [
        row("Current runway", v.cash / v.burn, "months"),
        row("Total runway", (v.cash + v.upfront) / v.burn, "months"),
      ]);
    case "funding-gap":
      return result(
        Math.max(0, v.burn * v.months - v.cash),
        "Funding gap",
        "moneyM",
        [
          row("Required cash", v.burn * v.months),
          row("Available cash", v.cash),
        ],
      );
    case "development-budget":
      return result(
        v.base * (1 + v.contingency / 100),
        "Total planning budget",
        "moneyM",
        [
          row("Base budget", v.base),
          row("Contingency reserve", (v.base * v.contingency) / 100),
        ],
      );
    case "cost-sharing":
      return result((v.budget * v.share) / 100, "Your contribution", "moneyM", [
        row("Partner contribution", v.budget * (1 - v.share / 100)),
      ]);
    case "partnering-funnel":
      return result(
        (((v.partners * v.response) / 100) * v.qualified) / 100,
        "Expected qualified conversations",
        "number",
        [row("Expected responses", (v.partners * v.response) / 100, "number")],
      );
    case "diligence-capacity":
      return result(
        (v.reviews * v.hours) / v.weeks,
        "Average hours per week",
        "hours",
        [row("Total review hours", v.reviews * v.hours, "hours")],
      );
    case "engagement-budget":
      return result(
        v.hours * v.rate * v.months,
        "Illustrative engagement budget",
        "money",
        [row("Monthly budget", v.hours * v.rate, "money")],
      );
    default:
      throw new Error("This tool is not available.");
  }
}
export function formatValue(value: number, unit: Result["unit"]): string {
  const formatted = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value);
  if (unit === "moneyM") return `$${formatted}M`;
  if (unit === "money") return `$${formatted}`;
  if (unit === "percent") return `${formatted}%`;
  if (unit === "months") return `${formatted} months`;
  if (unit === "hours") return `${formatted} hours`;
  return formatted;
}

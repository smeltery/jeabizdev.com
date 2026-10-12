import { money, percent, duration, type Tool } from "./fields";
export type { Field, Tool } from "./fields";
export const tools: Tool[] = [
  {
    slug: "deal-value",
    title: "Deal value breakdown",
    category: "Deal economics",
    description: "Separate upfront consideration from contingent milestones.",
    fields: [
      money("upfront", "Upfront payment ($M)", 25),
      money("development", "Development milestones ($M)", 125),
      money("commercial", "Commercial milestones ($M)", 350),
    ],
    formula:
      "Headline value = upfront + development milestones + commercial milestones.",
    assumptions:
      "Milestones are contingent, not guaranteed. Royalties, equity, and other payments are excluded.",
    example:
      "$25M upfront plus $125M development and $350M commercial milestones gives a $500M headline value.",
  },
  {
    slug: "royalty-revenue",
    title: "Royalty revenue",
    category: "Deal economics",
    description: "Estimate royalties from annual net sales and a flat rate.",
    fields: [
      money("sales", "Annual net sales ($M)", 500),
      percent("rate", "Royalty rate (%)", 8),
    ],
    formula: "Annual royalty = annual net sales × royalty rate.",
    assumptions:
      "Uses one flat rate. Excludes tiering, deductions, offsets, taxes, and territory-specific terms.",
    example:
      "$500M in annual net sales at an 8% royalty yields $40M in annual royalties.",
  },
  {
    slug: "tiered-royalties",
    title: "Tiered royalties",
    category: "Deal economics",
    description:
      "Apply marginal royalty rates above and below a sales threshold.",
    fields: [
      money("sales", "Annual net sales ($M)", 750),
      money("threshold", "First-tier sales ceiling ($M)", 500),
      percent("low", "Rate below ceiling (%)", 8),
      percent("high", "Rate above ceiling (%)", 12),
    ],
    formula:
      "Royalty = min(sales, ceiling) × first rate + max(0, sales − ceiling) × second rate.",
    assumptions:
      "Rates apply marginally to each tier, not retroactively to all sales. No deductions or offsets.",
    example:
      "$750M sales, an 8% rate on the first $500M, and 12% above that gives $70M.",
  },
  {
    slug: "milestone-present-value",
    title: "Milestone present value",
    category: "Deal economics",
    description: "Explore how timing changes the present value of a payment.",
    fields: [
      money("payment", "Future milestone ($M)", 100),
      duration("years", "Years until payment", 5),
      percent("discount", "Annual discount rate (%)", 10),
    ],
    formula: "Present value = future payment ÷ (1 + discount rate)^years.",
    assumptions:
      "Assumes the payment occurs at the end of the period. Does not adjust for probability of success.",
    example:
      "$100M in five years at a 10% discount rate has a present value of about $62.09M.",
  },
  {
    slug: "risk-adjusted-milestone",
    title: "Risk-adjusted milestone",
    category: "Deal economics",
    description:
      "Combine payment size, timing, and your probability assumption.",
    fields: [
      money("payment", "Future milestone ($M)", 100),
      percent("probability", "Payment probability (%)", 30),
      duration("years", "Years until payment", 5),
      percent("discount", "Annual discount rate (%)", 10),
    ],
    formula:
      "Risk-adjusted present value = payment × probability ÷ (1 + discount rate)^years.",
    assumptions:
      "The probability is your scenario assumption, not a clinical forecast. This is a single-payment estimate, not a full asset valuation.",
    example:
      "A $100M payment with 30% probability in five years at 10% gives approximately $18.63M.",
  },
  {
    slug: "deal-comparison",
    title: "Compare two offers",
    category: "Deal economics",
    description:
      "Compare upfront plus probability-weighted milestone consideration.",
    fields: [
      money("upfrontA", "Offer A upfront ($M)", 30),
      money("milestoneA", "Offer A milestones ($M)", 200),
      percent("probabilityA", "Offer A milestone probability (%)", 30),
      money("upfrontB", "Offer B upfront ($M)", 15),
      money("milestoneB", "Offer B milestones ($M)", 350),
      percent("probabilityB", "Offer B milestone probability (%)", 25),
    ],
    formula:
      "Scenario value for each offer = upfront + milestones × probability.",
    assumptions:
      "Undiscounted, probability-weighted totals. Excludes timing, royalties, rights, obligations, and execution risks; it does not identify a preferred offer.",
    example:
      "Offer A: $30M + $200M × 30% = $90M. Offer B: $15M + $350M × 25% = $102.5M.",
  },
  {
    slug: "upfront-share",
    title: "Upfront share",
    category: "Deal economics",
    description: "See how much of headline deal value is paid upfront.",
    fields: [
      money("upfront", "Upfront payment ($M)", 25),
      money("total", "Headline value including upfront ($M)", 500),
    ],
    formula: "Upfront share = upfront ÷ headline value × 100%.",
    assumptions:
      "Headline value must be positive and at least the upfront payment. A lower share says nothing by itself about deal quality.",
    example: "A $25M upfront payment in a $500M headline deal represents 5%.",
  },
  {
    slug: "royalty-break-even",
    title: "Royalty sales threshold",
    category: "Deal economics",
    description:
      "Estimate cumulative sales needed to equal a target royalty amount.",
    fields: [
      money("target", "Target royalty receipts ($M)", 50),
      percent("rate", "Flat royalty rate (%)", 8),
    ],
    formula: "Required cumulative net sales = target royalties ÷ royalty rate.",
    assumptions:
      "Requires a positive rate. Excludes time value, sales growth, offsets, and tiered rates.",
    example:
      "At an 8% rate, $625M in cumulative net sales generates $50M in royalties.",
  },
  {
    slug: "cash-runway",
    title: "Cash runway",
    category: "Capital planning",
    description: "Estimate months of runway at a constant monthly net burn.",
    fields: [
      money("cash", "Available cash ($M)", 30),
      money("burn", "Monthly net burn ($M)", 2),
    ],
    formula: "Runway in months = available cash ÷ monthly net burn.",
    assumptions:
      "Burn must be positive. Assumes constant burn and no new financing, milestone receipts, or other cash movements.",
    example: "$30M cash and $2M monthly net burn gives 15 months of runway.",
  },
  {
    slug: "runway-extension",
    title: "Runway extension",
    category: "Capital planning",
    description: "Explore the incremental runway from an upfront payment.",
    fields: [
      money("cash", "Current cash ($M)", 30),
      money("upfront", "Net upfront proceeds ($M)", 20),
      money("burn", "Monthly net burn ($M)", 2),
    ],
    formula:
      "Additional months = net upfront proceeds ÷ monthly burn. Total runway = (cash + proceeds) ÷ burn.",
    assumptions:
      "Burn must be positive. Enter net proceeds after fees and taxes; the model does not calculate these.",
    example:
      "$20M in net proceeds at $2M monthly burn adds 10 months to the existing runway.",
  },
  {
    slug: "funding-gap",
    title: "Funding gap",
    category: "Capital planning",
    description:
      "Compare cash with the budget needed for a chosen planning horizon.",
    fields: [
      money("cash", "Available cash ($M)", 20),
      money("burn", "Monthly net burn ($M)", 2),
      duration("months", "Planning horizon (months)", 18),
    ],
    formula: "Funding gap = max(0, monthly burn × months − available cash).",
    assumptions:
      "Assumes a constant net burn and excludes financing costs or a contingency reserve.",
    example:
      "An 18-month plan at $2M per month requires $36M. With $20M cash, the gap is $16M.",
  },
  {
    slug: "development-budget",
    title: "Development budget",
    category: "Capital planning",
    description: "Add a contingency reserve to a base project budget.",
    fields: [
      money("base", "Base project budget ($M)", 25),
      percent("contingency", "Contingency reserve (%)", 20),
    ],
    formula: "Total budget = base budget × (1 + contingency percentage).",
    assumptions:
      "A simple reserve calculation. The base budget and reserve are user assumptions, not cost benchmarks.",
    example:
      "A $25M base budget with a 20% reserve gives a $30M total planning budget.",
  },
  {
    slug: "cost-sharing",
    title: "Development cost sharing",
    category: "Capital planning",
    description: "Split a shared development budget between two partners.",
    fields: [
      money("budget", "Total shared budget ($M)", 80),
      percent("share", "Your share of costs (%)", 40),
    ],
    formula:
      "Your contribution = total budget × your share. Partner contribution = the remainder.",
    assumptions:
      "Assumes two parties and one agreed cost allocation. Excludes caps, territory adjustments, and reimbursement timing.",
    example:
      "A 40% share of an $80M budget means $32M for you and $48M for your partner.",
  },
  {
    slug: "partnering-funnel",
    title: "Partnering funnel",
    category: "Process planning",
    description:
      "Model how outreach could convert into qualified conversations.",
    fields: [
      {
        key: "partners",
        label: "Partners contacted",
        value: 60,
        min: 0,
        max: 100000,
        step: 1,
      },
      percent("response", "Response rate (%)", 40),
      percent("qualified", "Qualification rate of responses (%)", 50),
    ],
    formula:
      "Responses = contacts × response rate. Qualified conversations = responses × qualification rate.",
    assumptions:
      "Rates are hypothetical assumptions. Expected counts can be fractional; actual outcomes will be whole numbers.",
    example:
      "60 contacts at 40% response and 50% qualification yields 12 expected qualified conversations.",
  },
  {
    slug: "diligence-capacity",
    title: "Diligence capacity",
    category: "Process planning",
    description: "Estimate weekly workload across parallel diligence reviews.",
    fields: [
      {
        key: "reviews",
        label: "Concurrent reviews",
        value: 4,
        min: 1,
        max: 1000,
        step: 1,
      },
      duration("weeks", "Review period (weeks)", 8),
      {
        key: "hours",
        label: "Hours needed per review",
        value: 120,
        min: 0,
        max: 100000,
        step: 1,
      },
    ],
    formula: "Hours per week = reviews × hours per review ÷ review period.",
    assumptions:
      "Assumes evenly distributed work. Does not account for peaks, dependencies, or availability of specialist reviewers.",
    example:
      "Four 120-hour reviews over eight weeks require an average of 60 hours per week.",
  },
  {
    slug: "engagement-budget",
    title: "Engagement budget",
    category: "Process planning",
    description: "Estimate a consulting budget from hours, rate, and duration.",
    fields: [
      {
        key: "hours",
        label: "Hours per month",
        value: 40,
        min: 0,
        max: 744,
        step: 1,
      },
      {
        key: "rate",
        label: "Hourly rate ($)",
        value: 250,
        min: 0,
        max: 100000,
        step: 1,
      },
      duration("months", "Engagement duration (months)", 3),
    ],
    formula: "Estimated budget = hours per month × hourly rate × months.",
    assumptions:
      "Illustrative inputs only, not JEA pricing or a quote. Excludes expenses, tax, and performance-based fees.",
    example:
      "40 hours per month at an illustrative $250 per hour for three months totals $30,000.",
  },
];

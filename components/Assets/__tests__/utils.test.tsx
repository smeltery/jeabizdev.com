import React from "react"
import { render, screen } from "@testing-library/react"
import { filterAssets, formatDescription, getStageColor } from "@/components/Assets/utils"
import type { Asset } from "@/data/assets"

const items: Asset[] = [
  { id: "1", name: "DLL3 ADC", focus: "Oncology", stage: "IND Filing", type: "Antibody-Drug Conjugate", description: "A" },
  { id: "2", name: "PD-1 Agonist mAb", focus: "Immunology", stage: "Phase 1", type: "Antibody", description: "B" },
  { id: "3", name: "ENPP1 Inhibitor", focus: "Cardiovascular", stage: "IND Approved", type: "Small Molecule", description: "C" },
]

describe("Assets utils", () => {
  describe("filterAssets", () => {
    it("returns all items when query is empty or whitespace", () => {
      expect(filterAssets(items, "")).toHaveLength(3)
      expect(filterAssets(items, "   ")).toHaveLength(3)
    })

    it("filters by name, focus, type, or stage (case-insensitive)", () => {
      expect(filterAssets(items, "dll3")).toHaveLength(1)
      expect(filterAssets(items, "oncology")).toHaveLength(1)
      expect(filterAssets(items, "SMALL molecule")).toHaveLength(1)
      expect(filterAssets(items, "ind filing")).toHaveLength(1)
    })

    it("returns empty list when no matches", () => {
      expect(filterAssets(items, "nonexistent")).toHaveLength(0)
    })
  })

  describe("formatDescription", () => {
    it("renders title/content blocks when colon present and paragraphs otherwise", () => {
      const desc = "Title One: Value one\nJust a paragraph\nAnother: Value two"
      render(<div data-testid="desc">{formatDescription(desc)}</div>)

      // Headings appear for titled sections
      expect(screen.getByText("Title One:")).toBeInTheDocument()
      expect(screen.getByText("Another:")).toBeInTheDocument()

      // Values rendered as text
      expect(screen.getByText(/Value one/)).toBeInTheDocument()
      expect(screen.getByText(/Value two/)).toBeInTheDocument()

      // Paragraph without colon rendered as <p>
      expect(screen.getByText("Just a paragraph")).toBeInTheDocument()
    })
  })

  describe("getStageColor", () => {
    it("maps known stages to tailwind classes and defaults for others", () => {
      expect(getStageColor("Phase 3")).toContain("sky-100")
      expect(getStageColor("Phase 1")).toContain("blue-100")
      expect(getStageColor("IND Approved")).toContain("green-100")
      expect(getStageColor("IND Filing")).toContain("indigo-100")
      // @ts-expect-error testing fallback for stage not in union at runtime
      expect(getStageColor("Unknown stage")).toContain("slate-100")
    })
  })
})

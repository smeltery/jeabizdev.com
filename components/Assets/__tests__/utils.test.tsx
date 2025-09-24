import React from "react"
import { render, screen } from "@testing-library/react"
import { filterAssets, formatDescription, getStageColor, sortAssets } from "@/components/Assets/utils"
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

  describe("sortAssets", () => {
    const testAssets: Asset[] = [
      { id: "1", name: "Cardio Asset 1", focus: "Cardiovascular", stage: "IND Filing", type: "Small Molecule", description: "A" },
      { id: "2", name: "Onco Asset 1", focus: "Oncology", stage: "Phase 1", type: "Antibody-Drug Conjugate", description: "B" },
      { id: "3", name: "Immuno Asset 1", focus: "Immunology", stage: "Phase 1", type: "Antibody", description: "C" },
      { id: "4", name: "Onco Asset 2", focus: "Oncology", stage: "Phase 3", type: "Antibody-Drug Conjugate", description: "D" },
      { id: "5", name: "Cardio Asset 2", focus: "Cardiovascular", stage: "IND Approved", type: "Small Molecule", description: "E" },
    ]

    it("sorts assets with Oncology first, then by stage (Phase 3 first)", () => {
      const sorted = sortAssets(testAssets)
      
      // Should be: Onco Phase 3, Onco Phase 1, Immuno Phase 1, Cardio IND Approved, Cardio IND Filing
      expect(sorted[0].focus).toBe("Oncology")
      expect(sorted[0].stage).toBe("Phase 3")
      expect(sorted[1].focus).toBe("Oncology")
      expect(sorted[1].stage).toBe("Phase 1")
      expect(sorted[2].focus).toBe("Immunology")
      expect(sorted[3].focus).toBe("Cardiovascular")
      expect(sorted[3].stage).toBe("IND Approved")
      expect(sorted[4].focus).toBe("Cardiovascular")
      expect(sorted[4].stage).toBe("IND Filing")
    })

    it("does not mutate the original array", () => {
      const original = [...testAssets]
      sortAssets(testAssets)
      expect(testAssets).toEqual(original)
    })
  })
})

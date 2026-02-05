import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { AssetCard } from "../AssetCard"
import type { Asset } from "@/data/assets"

const sampleAsset: Asset = {
  id: "test-1",
  name: "Sample ADC",
  target: "Sample",
  focus: "Oncology",
  stage: "Phase 1",
  type: "Antibody-Drug Conjugate",
  description: "Best-in-Class Potential: Something great\nMore details: Even greater",
}

describe("AssetCard", () => {
  it("renders asset name, focus, and stage", () => {
    const onClick = vi.fn()
    render(<AssetCard asset={sampleAsset} onClick={onClick} />)

    expect(screen.getByText("Sample ADC")).toBeInTheDocument()
    expect(screen.getByText("Oncology")).toBeInTheDocument()
    expect(screen.getByText("Phase 1")).toBeInTheDocument()
  })

  it("calls onClick when View Details is clicked", () => {
    const onClick = vi.fn()
    render(<AssetCard asset={sampleAsset} onClick={onClick} />)

    const button = screen.getByRole("button", { name: /view details/i })
    fireEvent.click(button)

    expect(onClick).toHaveBeenCalledTimes(1)
  })
})

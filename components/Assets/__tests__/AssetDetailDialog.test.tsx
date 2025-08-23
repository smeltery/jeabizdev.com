import React from "react"
import { render, screen } from "@testing-library/react"
import { AssetDetailDialog } from "@/components/Assets/AssetDetailDialog"
import type { Asset } from "@/data/assets"

const asset: Asset = {
  id: "dll3-adc",
  name: "DLL3 ADC",
  focus: "Oncology",
  stage: "IND Filing",
  type: "Antibody-Drug Conjugate",
  description:
    "Best-in-Class Potential: Something great\nStrong Preclinical Data: Very strong\nJust a paragraph without a colon",
}

describe("AssetDetailDialog", () => {
  it("renders asset details with formatted description when open", () => {
    render(<AssetDetailDialog asset={asset} open={true} onOpenChange={() => {}} />)

    // Header elements
    expect(screen.getByText("DLL3 ADC")).toBeInTheDocument()
    expect(screen.getByText("Oncology")).toBeInTheDocument()
    // Stage badge uses stage text
    expect(screen.getByText("IND Filing")).toBeInTheDocument()

    // Quick info tiles
    expect(screen.getByText("Target")).toBeInTheDocument()
    expect(screen.getByText("Modality")).toBeInTheDocument()
    expect(screen.getByText("Antibody-Drug Conjugate")).toBeInTheDocument()

    // Formatted description: headings with trailing colon
    expect(screen.getByText("Best-in-Class Potential:")).toBeInTheDocument()
    expect(screen.getByText("Strong Preclinical Data:")).toBeInTheDocument()
    // Paragraph without colon rendered directly
    expect(screen.getByText("Just a paragraph without a colon")).toBeInTheDocument()
  })

  it("renders nothing when no asset is provided", () => {
    const { container } = render(
      <AssetDetailDialog asset={null} open={false} onOpenChange={() => {}} />
    )
    // Dialog returns null when no asset
    expect(container.firstChild).toBeNull()
  })
})

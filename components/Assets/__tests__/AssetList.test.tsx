import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { AssetList } from "@/components/Assets/AssetList"
import type { Asset } from "@/data/assets"

const makeAssets = (): Asset[] => [
  {
    id: "a1",
    name: "DLL3 ADC",
    focus: "Oncology",
    stage: "IND Filing",
    type: "Antibody-Drug Conjugate",
    description: "First line: Summary\nMore: Details",
  },
  {
    id: "a2",
    name: "PD-1 Agonist mAb",
    focus: "Immunology",
    stage: "Phase 1",
    type: "Antibody",
    description: "Some desc",
  },
]

describe("AssetList", () => {
  it("shows assets and filters by search query", async () => {
    const user = userEvent.setup()
    render(<AssetList assets={makeAssets()} />)

    // Both assets initially visible by their names
    expect(screen.getByText(/DLL3 ADC/i)).toBeInTheDocument()
    expect(screen.getByText(/PD-1 Agonist mAb/i)).toBeInTheDocument()

    const input = screen.getByPlaceholderText(/search assets/i)
    await user.clear(input)
    await user.type(input, "dll3")

    // Only DLL3 ADC remains
    expect(screen.getByText(/DLL3 ADC/i)).toBeInTheDocument()
    expect(screen.queryByText(/PD-1 Agonist mAb/i)).not.toBeInTheDocument()
  })

  it("shows empty state message when no assets match", async () => {
    const user = userEvent.setup()
    render(<AssetList assets={makeAssets()} />)

    const input = screen.getByPlaceholderText(/search assets/i)
    await user.type(input, "no-match-query")

    expect(
      screen.getByText(/No assets found matching your search criteria/i)
    ).toBeInTheDocument()
  })
})

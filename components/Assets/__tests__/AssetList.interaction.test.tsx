import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { AssetList } from "@/components/Assets/AssetList"
import type { Asset } from "@/data/assets"

// Keep the dataset minimal for interaction
const assets: Asset[] = [
  {
    id: "a1",
    name: "DLL3 ADC",
    focus: "Oncology",
    stage: "IND Filing",
    type: "Antibody-Drug Conjugate",
    description: "First line: Summary\nMore: Details",
  },
]

describe("AssetList interactions", () => {
  it("opens detail dialog when clicking View Details", async () => {
    const user = userEvent.setup()
    render(<AssetList assets={assets} />)

    // Click the View Details button
    const button = await screen.findByRole("button", { name: /view details/i })
    await user.click(button)

    // The dialog should show the asset name and fields (multiple headings may include the name)
    expect(await screen.findAllByText(/DLL3 ADC/i)).toHaveLength(2)
    expect((await screen.findAllByText(/Oncology/i)).length).toBeGreaterThanOrEqual(1)
    expect((await screen.findAllByText(/IND Filing/i)).length).toBeGreaterThanOrEqual(1)
  })
})

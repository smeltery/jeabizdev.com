import React from "react"
import { render, screen } from "@testing-library/react"
import { Assets } from "@/components/Assets/Assets"

vi.mock("framer-motion", () => ({
  motion: {
    div: (props: any) => <div {...props} />,
  },
}))

vi.mock("react-scroll", () => ({
  Element: ({ children }: any) => <div>{children}</div>,
}))

vi.mock("@/components/Assets/AssetList", () => ({
  AssetList: () => <div>ASSET_LIST</div>,
}))

describe("Assets wrapper", () => {
  it("renders the header and the list placeholder", () => {
    render(<Assets />)

    expect(
      screen.getByText(/Available Assets for Partnering/i)
    ).toBeInTheDocument()

    expect(screen.getByText("ASSET_LIST")).toBeInTheDocument()
  })
})

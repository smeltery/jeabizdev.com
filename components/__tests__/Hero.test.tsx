import React from "react"
import { render, screen } from "@testing-library/react"
import { Hero } from "@/components/Hero"

vi.mock("next/image", () => ({
  __esModule: true,
  default: () => null,
}))

vi.mock("framer-motion", () => ({
  motion: {
    div: (props: any) => <div {...props} />,
  },
}))

vi.mock("react-scroll", () => ({
  Link: ({ children, className }: any) => <a className={className}>{children}</a>,
}))

vi.mock("@/components/ui/ScrollSuggestion", () => ({
  ScrollSuggestion: () => <div data-testid="scroll-suggestion" />,
}))

describe("Hero", () => {
  it("renders headline and primary actions", () => {
    render(<Hero />)

    expect(
      screen.getByText(/We optimize business development success/i)
    ).toBeInTheDocument()

    expect(screen.getByText(/Get in Touch/i)).toBeInTheDocument()
    expect(screen.getByText(/Our Services/i)).toBeInTheDocument()

    // Scroll suggestion mocked
    expect(screen.getByTestId("scroll-suggestion")).toBeInTheDocument()
  })
})

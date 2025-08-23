import React from "react"
import { render, screen } from "@testing-library/react"
import Navigation from "@/components/Navigation"

vi.mock("react-scroll", () => ({
  Link: ({ children, className, onClick }: any) => (
    <span className={className} onClick={onClick}>
      {children}
    </span>
  ),
}))

describe("Navigation", () => {
  it("renders brand and main nav items", () => {
    render(<Navigation />)

    // Brand text
    expect(screen.getByText(/JEA BizDev Consulting/i)).toBeInTheDocument()

    // A couple of main navigation items
    expect(screen.getByText(/Services/i)).toBeInTheDocument()
    expect(screen.getByText(/Client Showcase/i)).toBeInTheDocument()
  })
})

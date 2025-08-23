import React from "react"
import { render, screen } from "@testing-library/react"

// Mock next/image to a simple img element for JSDOM (defensive; but we will also mock data)
vi.mock("next/image", () => ({
  __esModule: true,
  default: () => null,
}))

// Mock the deals data to avoid Image and unrelated complexity
vi.mock("@/data/deals", () => ({
  __esModule: true,
  deals: [
    {
      company: "JEA BizDev Consulting, LLC",
      subtitle: "Served as Lead Business Development and Transaction Advisor",
      description: "Deal A",
      year: 2025,
      pdfUrl: "/client-showcase/jea-bizdev-consulting-advices-cspc-on-partnership-with-radiance-biopharma.pdf",
    },
    {
      company: "JEA BizDev Consulting, LLC",
      subtitle: "Served as Lead Business Development and Transaction Advisor",
      description: "Deal B",
      year: 2025,
      pdfUrl: "/client-showcase/jea-bizdev-consulting-advices-cspc-on-partnership-with-cipla.pdf",
    },
  ],
}))

// Mock framer-motion to passthrough div for our usage pattern
vi.mock("framer-motion", () => ({
  motion: {
    div: (props: any) => props?.children ?? null,
  },
}))

// Mock react-scroll Element to a simple wrapper div
vi.mock("react-scroll", () => ({
  Element: ({ children }: any) => children ?? null,
}))

import { ClientShowcase } from "@/components/ClientShowcase"

describe("ClientShowcase", () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })
  })

  it("renders header and deals with links to PDFs", () => {
    render(<ClientShowcase />)

    // Header text
    expect(screen.getByText(/Client Showcase/i)).toBeInTheDocument()

    // Deal cards are links to PDFs
    const links = screen.getAllByRole("link")
    expect(links.length).toBeGreaterThanOrEqual(2)

    // Verify at least the two known pdf URLs exist among links
    const hrefs = links.map((a) => (a as HTMLAnchorElement).getAttribute("href"))
    expect(hrefs).toEqual(expect.arrayContaining([
      "/client-showcase/jea-bizdev-consulting-advices-cspc-on-partnership-with-radiance-biopharma.pdf",
      "/client-showcase/jea-bizdev-consulting-advices-cspc-on-partnership-with-cipla.pdf",
    ]))

    // Company titles visible on cards (text present inside the cards)
    expect(screen.getAllByText(/JEA BizDev Consulting, LLC/i).length).toBeGreaterThanOrEqual(2)
  })
})

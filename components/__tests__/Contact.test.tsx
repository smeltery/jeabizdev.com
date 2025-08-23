import React from "react"
import { render, screen, waitFor, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Contact } from "@/components/Contact"

// Mock Confetti to avoid canvas dependency in jsdom
vi.mock('react-confetti', () => ({ default: () => null }))
// Mock framer-motion to avoid matchMedia and layout effect issues in jsdom
vi.mock('framer-motion', () => ({
  motion: {
    div: (props: any) => <div {...props} />,
  },
}))

// Helper to fill and submit the form
async function fillAndSubmit() {
  const user = userEvent.setup()
  await user.type(screen.getByLabelText(/name/i), "Jane Doe")
  await user.type(screen.getByLabelText(/email/i), "jane@example.com")
  await user.type(screen.getByLabelText(/company/i), "ACME Corp")
  await user.type(screen.getByLabelText(/message/i), "Hello there")
  const submit = screen.getByRole("button", { name: /send message/i })
  await user.click(submit)
}

describe("Contact", () => {
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

  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it("does not submit when form is invalid (empty)", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true })
    // @ts-expect-error - override global fetch for test
    global.fetch = fetchMock

    const { container } = render(<Contact />)

    // Submit the form programmatically to bypass any native constraints behavior
    const form = container.querySelector('form') as HTMLFormElement
    fireEvent.submit(form)

    // Ensure fetch is not called due to validation errors
    await waitFor(() => expect(fetchMock).not.toHaveBeenCalled(), { timeout: 1000 })
  })

  it("submits successfully and calls fetch with form data", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true })
    // @ts-expect-error - override global fetch for test
    global.fetch = fetchMock

    render(<Contact />)

    await fillAndSubmit()

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1))

    const [url, options] = fetchMock.mock.calls[0]
    expect(url).toBe("/api/send-email")
    expect(options.method).toBe("POST")
    expect(options.headers["Content-Type"]).toBe("application/json")

    const payload = JSON.parse(options.body as string)
    expect(payload).toMatchObject({
      name: "Jane Doe",
      email: "jane@example.com",
      company: "ACME Corp",
      message: "Hello there",
    })
  })
})

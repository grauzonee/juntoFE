import assert from "node:assert/strict"
import test from "node:test"
import { fireEvent, render } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import LandingHeader from "@/components/landing/LandingHeader"

test("LandingHeader opens a mobile menu inside the full-width header container", () => {
    window.localStorage.removeItem("token")

    const { container, getAllByRole, getByRole } = render(
        <MemoryRouter>
            <LandingHeader />
        </MemoryRouter>,
    )

    assert.equal(getAllByRole("link", { name: "Log in" }).length, 1)

    fireEvent.click(getByRole("button", { name: /toggle menu/i }))

    assert.equal(getAllByRole("link", { name: "Log in" }).length, 2)
    assert.equal(getAllByRole("link", { name: "Sign up" }).length, 2)

    const menuContent = container.querySelector('[data-state="open"][id^="radix-"]')

    assert.ok(menuContent instanceof HTMLElement)
    assert.match(menuContent.className, /border-t-\[3px\]/)
    assert.match(menuContent.className, /md:hidden/)

    const widthContainer = menuContent.querySelector("div")

    assert.ok(widthContainer instanceof HTMLElement)
    assert.match(widthContainer.className, /mx-auto w-full max-w-7xl px-4 py-4 md:px-6/)
})

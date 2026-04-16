import assert from "node:assert/strict"
import test from "node:test"
import { fireEvent, render } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import LandingHeader from "@/components/landing/LandingHeader"
import { testIds } from "@/testIds"

test("LandingHeader opens a mobile menu inside the full-width header container", () => {
    globalThis.localStorage.removeItem("token")

    const { container, getByTestId } = render(
        <MemoryRouter>
            <LandingHeader />
        </MemoryRouter>,
    )

    assert.equal(container.querySelectorAll('a[href="/login"]').length, 1)

    fireEvent.click(getByTestId(testIds.landing.mobileMenuTrigger))

    assert.equal(container.querySelectorAll('a[href="/login"]').length, 2)
    assert.equal(container.querySelectorAll('a[href="/register"]').length, 2)

    const menuContent = getByTestId(testIds.landing.mobileMenu)

    assert.ok(menuContent instanceof HTMLElement)
    assert.equal(menuContent.dataset.state, "open")

    const widthContainer = getByTestId(testIds.landing.mobileMenuInner)

    assert.ok(widthContainer instanceof HTMLElement)
    assert.ok(menuContent.contains(widthContainer))
})

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

    assertLinkCount(container, "/login", 1)

    fireEvent.click(getByTestId(testIds.landing.mobileMenuTrigger))

    for (const [href, expectedCount] of [
        ["/login", 2],
        ["/register", 2],
    ] as const) {
        assertLinkCount(container, href, expectedCount)
    }

    const menuContent = getByTestId(testIds.landing.mobileMenu)

    assert.ok(menuContent instanceof HTMLElement)
    assert.equal(menuContent.dataset.state, "open")

    const widthContainer = getByTestId(testIds.landing.mobileMenuInner)

    assert.ok(widthContainer instanceof HTMLElement)
    assert.ok(menuContent.contains(widthContainer))
})

function assertLinkCount(container: HTMLElement, href: string, expectedCount: number) {
    assert.equal(container.querySelectorAll(`a[href="${href}"]`).length, expectedCount)
}

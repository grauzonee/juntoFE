import assert from "node:assert/strict"
import test, { type TestContext } from "node:test"
import { act } from "react"
import { render, waitFor } from "@testing-library/react"
import { createMemoryRouter, RouterProvider } from "react-router"
import RouteErrorPage from "@/components/errors/RouteErrorPage"
import { routes } from "@/routes"
import MovedPermanentlyPage from "@/pages/errors/MovedPermanently"

const statusPageCases = [
    {
        route: "/400",
        title: "Bad request",
        code: "400",
        actionLabel: "Go home",
    },
    {
        route: "/500",
        title: "Internal server error",
        code: "500",
        actionLabel: "Try again from home",
    },
    {
        route: "/missing-route",
        title: "Page not found",
        code: "404",
        actionLabel: "Go home",
    },
]

for (const statusPageCase of statusPageCases) {
    test(`${statusPageCase.code} status page renders through the router`, () => {
        const router = createMemoryRouter(routes, {
            initialEntries: [statusPageCase.route],
        })

        const view = render(<RouterProvider router={router} />)

        assert.ok(view.getByRole("heading", { name: statusPageCase.title }))
        assert.ok(view.getByText(statusPageCase.code))
        assert.ok(view.getByRole("link", { name: statusPageCase.actionLabel }))
    })
}

test("301 status page redirects to the home route", (t: TestContext) => {
    const router = createMemoryRouter([
        {
            path: "/",
            element: <div data-testid="home-page" />,
        },
        {
            path: "/301",
            element: <MovedPermanentlyPage />,
        },
    ], {
        initialEntries: ["/301"],
    })

    t.mock.timers.enable({ apis: ["setTimeout"] })
    t.after(() => t.mock.timers.reset())

    const view = render(<RouterProvider router={router} />)

    assert.ok(view.getByRole("heading", { name: "Moved permanently" }))
    assert.equal(router.state.location.pathname, "/301")

    act(() => {
        t.mock.timers.tick(1800)
    })

    assert.equal(router.state.location.pathname, "/")
    assert.ok(view.getByTestId("home-page"))
})

test("route loader errors render the shared error boundary", async () => {
    const router = createMemoryRouter([
        {
            path: "/",
            element: <div data-testid="error-route" />,
            errorElement: <RouteErrorPage />,
            loader: () => {
                throw new Error("Article not found")
            },
        },
    ], {
        initialEntries: ["/"],
    })

    const view = render(<RouterProvider router={router} />)

    await waitFor(() => {
        assert.ok(view.getByRole("heading", { name: "Page not found" }))
    })

    assert.ok(view.getByText("Article not found"))
})

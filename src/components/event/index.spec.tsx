import assert from "node:assert/strict"
import test from "node:test"
import { render, waitFor } from "@testing-library/react"
import { createMemoryRouter, RouterProvider } from "react-router"
import EventLayout from "@/layouts/EventLayout"
import { api } from "@/lib/axios"
import { EventPageContent } from "@/components/event/EventPage"
import { createTestEvent } from "@/test/fixtures"
import { renderWithRouter } from "@/test/render"

test("EventPageContent renders the main event sections", () => {
    const event = createTestEvent()
    const view = renderWithRouter(<EventPageContent event={event} />, { route: `/event/${event._id}` })

    assert.ok(view.getByRole("heading", { name: event.title }))
    assert.ok(view.getByText("About"))
    assert.ok(view.getByText("Meeting point"))
    assert.ok(view.getAllByText(event.fullAddress).length >= 2)
    assert.ok(view.getByText("Discussion"))
    assert.ok(view.getByText("Hosted by"))
    assert.ok(view.getByRole("link", { name: "Log in to join" }))
})

test("EventLayout wraps event routes with the event shell", async (t) => {
    t.mock.method(api, "get", async (url: string) => {
        if (url === "/user") {
            return {
                status: 200,
                data: { data: null },
            }
        }

        throw new Error(`Unexpected GET request for ${url}`)
    })

    const router = createMemoryRouter([
        {
            path: "/",
            element: <EventLayout />,
            children: [
                { path: "event/:id", element: <div>Event route body</div> },
            ],
        },
    ], {
        initialEntries: ["/event/event-1"],
    })

    const view = render(<RouterProvider router={router} />)

    await waitFor(() => {
        assert.ok(view.getByText("Event route body"))
    })

    assert.ok(view.getByText("JUNTO"))
    assert.ok(view.getByText("Junto event club"))
})

import assert from "node:assert/strict"
import test from "node:test"
import { render, waitFor } from "@testing-library/react"
import { createMemoryRouter, RouterProvider } from "react-router"
import EventLayout from "@/layouts/EventLayout"
import { api } from "@/lib/axios"
import { EventPageContent } from "@/components/event/EventPage"
import { createTestEvent } from "@/test/fixtures"
import { renderWithRouter } from "@/test/render"
import { testIds } from "@/testIds"

test("EventPageContent renders the main event sections", () => {
    const event = createTestEvent()
    const view = renderWithRouter(<EventPageContent event={event} />, { route: `/event/${event._id}` })

    assert.ok(view.getByTestId(testIds.event.page))
    assert.ok(view.getByTestId(testIds.event.hero))
    assert.ok(view.getByTestId(testIds.event.aboutSection))
    assert.ok(view.getByTestId(testIds.event.meetingPointSection))
    assert.ok(view.getByTestId(testIds.event.discussionSection))
    assert.ok(view.getByTestId(testIds.event.rsvpCard))
    assert.ok(view.getByTestId(testIds.event.hostCard))
    assert.equal(view.getByTestId(testIds.event.rsvpLoginLink).getAttribute("href"), "/login")
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
                { path: "event/:id", element: <div data-testid="event-route-body" /> },
            ],
        },
    ], {
        initialEntries: ["/event/event-1"],
    })

    const view = render(<RouterProvider router={router} />)

    await waitFor(() => {
        assert.ok(view.getByTestId("event-route-body"))
    })

    assert.ok(view.getByTestId(testIds.event.shellHeader))
    assert.ok(view.getByTestId(testIds.event.shellFooter))
})

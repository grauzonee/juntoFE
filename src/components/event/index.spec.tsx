import assert from "node:assert/strict"
import test from "node:test"
import { fireEvent, render, waitFor, within } from "@testing-library/react"
import { AxiosError } from "axios"
import { createMemoryRouter, RouterProvider } from "react-router"
import EventLayout from "@/layouts/EventLayout"
import { api } from "@/lib/axios"
import { EventPageContent } from "@/components/event/EventPage"
import SingleEvent from "@/components/event"
import { createTestEvent } from "@/test/fixtures"
import { renderWithRouter } from "@/test/render"
import { testIds } from "@/testIds"

type RsvpRequestPayload = {
    eventId: string
    status: string
    additionalGuests?: number
}

function makeToken(exp: number) {
    return [
        Buffer.from(JSON.stringify({ alg: "none", typ: "JWT" })).toString("base64url"),
        Buffer.from(JSON.stringify({ exp })).toString("base64url"),
        "",
    ].join(".")
}

test("EventPageContent renders the main event sections", () => {
    const event = createTestEvent()
    const view = renderWithRouter(<EventPageContent event={event} />, { route: `/event/${event._id}` })

    for (const sectionTestId of [
        testIds.event.page,
        testIds.event.hero,
        testIds.event.aboutSection,
        testIds.event.meetingPointSection,
        testIds.event.discussionSection,
        testIds.event.rsvpCard,
        testIds.event.mobileRsvpPanel,
        testIds.event.hostCard,
    ]) {
        assert.ok(view.getByTestId(sectionTestId), `Missing event section: ${sectionTestId}`)
    }

    assert.equal(view.getByTestId(testIds.event.rsvpLoginLink).getAttribute("href"), "/login")

    const mobilePanel = view.getByTestId(testIds.event.mobileRsvpPanel)

    assert.ok(mobilePanel.querySelector('a[href="/login"]'))
    assert.ok(mobilePanel.querySelector('a[href="/register"]'))
})

test("EventPageContent confirms mobile Attend RSVP after selecting guests", async (t) => {
    const event = createTestEvent({
        capacity: {
            maxAttendees: 30,
            confirmedAttendanceTotal: 0,
            remainingSeats: 30,
        },
    })
    const requests: RsvpRequestPayload[] = []

    globalThis.localStorage.setItem("token", makeToken(Math.floor(Date.now() / 1000) + 3600))
    t.after(() => {
        globalThis.localStorage.removeItem("token")
    })

    t.mock.method(api, "get", async (url: string) => {
        if (url === `/event/${event._id}/rsvps/me`) {
            return {
                status: 200,
                data: {
                    success: true,
                    data: null,
                },
            }
        }

        throw new Error(`Unexpected GET request for ${url}`)
    })

    t.mock.method(api, "post", async (url: string, payload: RsvpRequestPayload) => {
        assert.equal(url, "/event/attend")
        requests.push(payload)

        return {
            status: 200,
            data: {
                success: true,
                data: {
                    id: "rsvp-1",
                    status: payload.status,
                    additionalGuests: payload.additionalGuests,
                    eventDate: event.date,
                },
            },
        }
    })

    const view = renderWithRouter(<EventPageContent event={event} />, { route: `/event/${event._id}` })
    const mobilePanel = view.getByTestId(testIds.event.mobileRsvpPanel)

    await waitFor(() => {
        assert.ok(within(mobilePanel).getByRole("button", { name: /attend/i }))
    })

    fireEvent.click(within(mobilePanel).getByRole("button", { name: /attend/i }))

    const guestDialog = view.getByRole("dialog", { name: /additional guests/i })

    assert.equal(requests.length, 0)

    fireEvent.click(within(guestDialog).getByRole("button", { name: /add additional guest/i }))
    fireEvent.click(within(guestDialog).getByRole("button", { name: /confirm/i }))

    await waitFor(() => {
        assert.equal(requests.length, 1)
    })

    await waitFor(() => {
        assert.ok(within(mobilePanel).getByText(/28 \/ 30 spots left/i))
    })

    assert.deepEqual(requests[0], {
        eventId: event._id,
        status: "confirmed",
        additionalGuests: 1,
    })
})

test("EventPageContent reflects an already-attending mobile RSVP from the backend", async (t) => {
    const event = createTestEvent()

    globalThis.localStorage.setItem("token", makeToken(Math.floor(Date.now() / 1000) + 3600))
    t.after(() => {
        globalThis.localStorage.removeItem("token")
    })

    t.mock.method(api, "get", async (url: string) => {
        if (url === `/event/${event._id}/rsvps/me`) {
            return {
                status: 200,
                data: {
                    success: true,
                    data: {
                        id: "rsvp-1",
                        status: "confirmed",
                        additionalGuests: 2,
                    },
                },
            }
        }

        throw new Error(`Unexpected GET request for ${url}`)
    })

    const view = renderWithRouter(<EventPageContent event={event} />, { route: `/event/${event._id}` })
    const mobilePanel = view.getByTestId(testIds.event.mobileRsvpPanel)

    await waitFor(() => {
        assert.ok(within(mobilePanel).getByRole("button", { name: /can't go/i }))
    })

    assert.equal(within(mobilePanel).queryByRole("button", { name: /attend/i }), null)
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

test("SingleEvent renders the shared 404 page when the backend returns not found", async (t) => {
    const eventId = "missing-event"

    t.mock.method(api, "get", async (url: string) => {
        if (url === "/user") {
            return {
                status: 200,
                data: { data: null },
            }
        }

        if (url === `event/${eventId}`) {
            throw new AxiosError("boom", undefined, undefined, undefined, {
                status: 404,
                statusText: "Not found",
                headers: {},
                config: { headers: {} as never },
                data: {},
            })
        }

        throw new Error(`Unexpected GET request for ${url}`)
    })

    const router = createMemoryRouter([
        {
            path: "/",
            element: <EventLayout />,
            children: [
                { path: "event/:id", element: <SingleEvent /> },
            ],
        },
    ], {
        initialEntries: [`/event/${eventId}`],
    })

    const view = render(<RouterProvider router={router} />)

    await waitFor(() => {
        assert.ok(view.getByRole("heading", { name: "Page not found" }))
    })

    assert.ok(view.getByText("The page you asked for does not exist or has moved."))
    assert.ok(view.getByRole("link", { name: "Go home" }))
})

import assert from "node:assert/strict"
import test, { type TestContext } from "node:test"
import { fireEvent, render, waitFor, within } from "@testing-library/react"
import { createMemoryRouter, RouterProvider } from "react-router"
import DiscoverFilterBar from "@/components/discover/DiscoverFilterBar"
import NearMeModal from "@/components/discover/NearMeModal"
import Events from "@/pages/Events"
import { api } from "@/lib/axios"
import { routes as eventRoutes } from "@/routes/events"
import {
    createDiscoverEvent,
    discoverCategories,
    discoverEventTypes,
} from "@/test/fixtures"
import { renderWithRouter } from "@/test/render"
import { testIds } from "@/testIds"

function mockDiscoverApi(
    t: TestContext,
    {
        events = [createDiscoverEvent()],
        nearbyEvents = [createDiscoverEvent({ _id: "nearby-1", title: "Sunset Picnic" })],
    }: {
        events?: ReturnType<typeof createDiscoverEvent>[]
        nearbyEvents?: ReturnType<typeof createDiscoverEvent>[]
    } = {},
) {
    t.mock.method(api, "get", async (url: string) => {
        if (url === "/eventtypes") {
            return {
                status: 200,
                data: { success: true, data: discoverEventTypes.map(({ id, title }) => ({ _id: id, title })) },
            }
        }

        if (url === "/categories") {
            return {
                status: 200,
                data: { success: true, data: discoverCategories.map(({ id, title }) => ({ _id: id, title })) },
            }
        }

        if (url === "/event") {
            return {
                status: 200,
                data: { success: true, data: events },
            }
        }

        if (url === "/event/geosearch") {
            return {
                status: 200,
                data: { success: true, data: nearbyEvents },
            }
        }

        throw new Error(`Unexpected GET request for ${url}`)
    })
}

function StubMap() {
    return <div>Stub map</div>
}

test("Events page renders discover controls and fetched results", async (t) => {
    const event = createDiscoverEvent()

    mockDiscoverApi(t, { events: [event] })

    const view = renderWithRouter(<Events />, { route: "/events" })

    await view.findByTestId(testIds.discover.eventCard(event._id))

    assert.ok(view.getByTestId(testIds.discover.filterBar))
    assert.ok(view.getByTestId(testIds.discover.mobileSearchTrigger))
    assert.ok(view.getByTestId(testIds.discover.resultsHeader))
    assert.equal(view.getByTestId(testIds.discover.resultsList).children.length, 1)
    assert.equal(
        view.getByTestId(testIds.discover.eventDetailsLink(event._id)).getAttribute("href"),
        `/event/${event._id}`,
    )
})

test("DiscoverFilterBar uses a dialog-based mobile search flow", async () => {
    let nearMeClicks = 0

    const view = render(
        <DiscoverFilterBar
            count={1}
            filters={{
                search: "",
                selectedTypeId: "all",
                selectedDateFilter: "all",
                selectedCategoryId: "all",
                sort: "soonest",
                view: "grid",
            }}
            activeFilters={[]}
            categories={discoverCategories}
            eventTypes={discoverEventTypes}
            onSearchChange={() => {}}
            onTypeChange={() => {}}
            onDateFilterChange={() => {}}
            onCategoryChange={() => {}}
            onSortChange={() => {}}
            onViewChange={() => {}}
            onClearFilter={() => {}}
            onClearAll={() => {}}
            onNearMeClick={() => {
                nearMeClicks += 1
            }}
        />,
    )

    fireEvent.click(view.getByTestId(testIds.discover.mobileSearchTrigger))

    const body = within(document.body)

    assert.ok(body.getByTestId(testIds.discover.mobileSearchDialog))
    assert.ok(body.getByTestId(testIds.discover.mobileNearbyButton))

    fireEvent.click(body.getByTestId(testIds.discover.mobileNearbyButton))

    await waitFor(() => {
        assert.equal(nearMeClicks, 1)
    })
})

test("events map route redirects back to discover page", async (t) => {
    mockDiscoverApi(t)

    const mapRedirect = eventRoutes.find((route) => route.path === "events/map")?.element

    assert.ok(mapRedirect)

    const router = createMemoryRouter([
        {
            path: "/",
            children: [
                { path: "events", element: <Events /> },
                { path: "events/map", element: mapRedirect },
            ],
        },
    ], {
        initialEntries: ["/events/map"],
    })

    const view = render(<RouterProvider router={router} />)

    await view.findByTestId(testIds.discover.eventCard("discover-1"))

    assert.equal(router.state.location.pathname, "/events")
})

test("NearMeModal routes found events to the single-event page", async (t) => {
    mockDiscoverApi(t)

    Object.defineProperty(globalThis.navigator, "geolocation", {
        configurable: true,
        value: {
            getCurrentPosition(success: (position: { coords: { latitude: number; longitude: number } }) => void) {
                success({
                    coords: {
                        latitude: 48.2082,
                        longitude: 16.3738,
                    },
                })
            },
        },
    })

    const router = createMemoryRouter([
        {
            path: "/",
            element: <NearMeModal open onOpenChange={() => {}} MapComponent={StubMap} />,
        },
        {
            path: "/event/:id",
            element: <div data-testid="event-details-route" />,
        },
    ], {
        initialEntries: ["/"],
    })

    render(<RouterProvider router={router} />)

    const body = within(document.body)

    fireEvent.click(body.getByTestId(testIds.discover.nearMeUseLocationButton))

    const eventButton = await body.findByTestId(testIds.discover.nearMeResultButton("nearby-1"))

    fireEvent.click(eventButton)

    await waitFor(() => {
        assert.equal(router.state.location.pathname, "/event/nearby-1")
    })

    assert.ok(body.getByTestId("event-details-route"))
})

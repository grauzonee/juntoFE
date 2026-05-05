import assert from "node:assert/strict"
import test, { type TestContext } from "node:test"
import { renderWithRouter } from "@/test/render"
import Index from "@/pages/Index"
import { api } from "@/lib/axios"
import { createDiscoverEvent } from "@/test/fixtures"
import { testIds } from "@/testIds"

function mockLandingApi(t: TestContext) {
    const event = createDiscoverEvent({
        _id: "landing-event-1",
        title: "Tech Startup Networking Night",
        fullAddress: "123 Market St, San Francisco, CA 94103, USA",
    })
    const featuredEvent = {
        ...event,
        date: 1778522400,
    }

    let eventRequestParams: unknown

    t.mock.method(api, "get", async (url: string, config?: { params?: unknown }) => {
        if (url === "/event/featured") {
            eventRequestParams = config?.params
            return {
                status: 200,
                data: { success: true, data: [featuredEvent] },
            }
        }

        throw new Error(`Unexpected GET request for ${url}`)
    })

    return {
        event,
        getEventRequestParams: () => eventRequestParams,
    }
}

test("landing page renders featured events from backend data", async (t) => {
    const { event, getEventRequestParams } = mockLandingApi(t)

    const view = renderWithRouter(<Index />)

    await view.findByTestId(testIds.landing.featuredEventCard(event._id))

    assert.ok(view.getByText("Tech Startup Networking Night"))
    assert.ok(view.getByText("123 Market St, San Francisco, CA 94103, USA"))
    assert.ok(view.getByText("Featured events"))
    assert.equal(view.queryByText("Creative Mornings Sketch Club"), null)
    assert.equal(getEventRequestParams(), undefined)
})

test("landing page handles empty featured events", async (t) => {
    t.mock.method(api, "get", async (url: string) => {
        assert.equal(url, "/event/featured")
        return {
            status: 200,
            data: { success: true, data: [] },
        }
    })

    const view = renderWithRouter(<Index />)

    await view.findByText("No featured events are available right now.")
})

test("landing page handles featured events loading errors", async (t) => {
    t.mock.method(api, "get", async (url: string) => {
        assert.equal(url, "/event/featured")
        throw new Error("Request failed")
    })

    const view = renderWithRouter(<Index />)

    await view.findByText("Network error")
})

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
        title: "Backend Pottery Session",
        fullAddress: "Backend Studio, Vienna",
    })

    let eventRequestParams: unknown

    t.mock.method(api, "get", async (url: string, config?: { params?: unknown }) => {
        if (url === "/event") {
            eventRequestParams = config?.params
            return {
                status: 200,
                data: { success: true, data: [event] },
            }
        }

        throw new Error(`Unexpected GET request for ${url}`)
    })

    return {
        event,
        getEventRequestParams: () => eventRequestParams,
    }
}

test("landing page renders upcoming events from backend data", async (t) => {
    const { event, getEventRequestParams } = mockLandingApi(t)

    const view = renderWithRouter(<Index />)

    await view.findByTestId(testIds.landing.upcomingEventCard(event._id))

    assert.ok(view.getByText("Backend Pottery Session"))
    assert.ok(view.getByText("Backend Studio, Vienna"))
    assert.equal(view.queryByText("Creative Mornings Sketch Club"), null)
    assert.deepEqual(getEventRequestParams(), {
        limit: 3,
        page: 1,
        sortByAsc: "date",
    })
})

test("landing page does not render fake categories or community stats", async (t) => {
    mockLandingApi(t)

    const view = renderWithRouter(<Index />)

    await view.findByText("Backend Pottery Session")

    assert.equal(view.queryByText("Art & Design"), null)
    assert.equal(view.queryByText("12K+"), null)
    assert.ok(view.getByText(/Popular categories need a public backend endpoint/))
    assert.equal(view.queryByText(/Community stats are waiting on backend data/), null)
})

import assert from "node:assert/strict"
import test, { type TestContext } from "node:test"
import { renderHook, waitFor } from "@testing-library/react"
import { api } from "@/lib/axios"
import { useDiscoverEvents } from "@/hooks/event/useDiscoverEvents"
import { useLandingFeaturedEvents } from "@/hooks/event/useLandingFeaturedEvents"
import { useNearbyDiscoverEvents } from "@/hooks/event/useNearbyDiscoverEvents"
import { createDiscoverEvent } from "@/test/fixtures"

type Deferred<T> = {
    promise: Promise<T>
    reject: (reason?: unknown) => void
    resolve: (value: T) => void
}

function createDeferred<T>(): Deferred<T> {
    let resolve!: (value: T) => void
    let reject!: (reason?: unknown) => void
    const promise = new Promise<T>((promiseResolve, promiseReject) => {
        resolve = promiseResolve
        reject = promiseReject
    })

    return { promise, reject, resolve }
}

function createApiResponse(events: unknown[] = [createDiscoverEvent()]) {
    return {
        status: 200,
        data: {
            success: true,
            data: events,
        },
    }
}

test("useDiscoverEvents loads event data for the provided query", async (t: TestContext) => {
    const event = createDiscoverEvent({ _id: "query-event" })
    let capturedParams: unknown

    t.mock.method(api, "get", async (url: string, config?: { params?: unknown }) => {
        assert.equal(url, "/event")
        capturedParams = config?.params
        return createApiResponse([event])
    })

    const { result } = renderHook(() => useDiscoverEvents({
        limit: 24,
        page: 1,
        search: "picnic",
        typeId: "meetup",
        categoryId: "community",
        dateFilter: "week",
        sort: "latest",
    }))

    assert.equal(result.current.loading, true)

    await waitFor(() => {
        assert.equal(result.current.loading, false)
    })

    assert.deepEqual(result.current.data, [event])
    assert.equal(result.current.error, null)
    assert.deepEqual(capturedParams, {
        limit: 24,
        page: 1,
        search: "picnic",
        type_eq: "meetup",
        categories_in: "[community]",
        date_eq: "this_week",
        sortByDesc: "date",
    })
})

test("useDiscoverEvents returns an empty list and error when loading fails", async (t: TestContext) => {
    t.mock.method(api, "get", async () => {
        throw new Error("Request failed")
    })

    const { result } = renderHook(() => useDiscoverEvents({
        limit: 24,
        page: 1,
        sort: "soonest",
    }))

    await waitFor(() => {
        assert.equal(result.current.loading, false)
    })

    assert.deepEqual(result.current.data, [])
    assert.equal(result.current.error, "Network error")
})

test("useDiscoverEvents ignores stale responses after the query changes", async (t: TestContext) => {
    const firstRequest = createDeferred<ReturnType<typeof createApiResponse>>()
    const secondRequest = createDeferred<ReturnType<typeof createApiResponse>>()
    const firstEvent = createDiscoverEvent({ _id: "first-event", title: "First event" })
    const secondEvent = createDiscoverEvent({ _id: "second-event", title: "Second event" })

    t.mock.method(api, "get", (_url: string, config?: { params?: { search?: string } }) => {
        if (config?.params?.search === "first") {
            return firstRequest.promise
        }

        return secondRequest.promise
    })

    const { result, rerender } = renderHook(
        ({ search }) => useDiscoverEvents({
            limit: 24,
            page: 1,
            search,
            sort: "soonest",
        }),
        { initialProps: { search: "first" } },
    )

    rerender({ search: "second" })
    secondRequest.resolve(createApiResponse([secondEvent]))

    await waitFor(() => {
        assert.deepEqual(result.current.data, [secondEvent])
    })

    firstRequest.resolve(createApiResponse([firstEvent]))

    await waitFor(() => {
        assert.equal(result.current.loading, false)
    })

    assert.deepEqual(result.current.data, [secondEvent])
})

test("useDiscoverEvents ignores responses after unmount", async (t: TestContext) => {
    const request = createDeferred<ReturnType<typeof createApiResponse>>()

    t.mock.method(api, "get", () => request.promise)

    const { unmount } = renderHook(() => useDiscoverEvents({
        limit: 24,
        page: 1,
        sort: "soonest",
    }))

    unmount()
    request.resolve(createApiResponse([createDiscoverEvent({ _id: "after-unmount" })]))

    await request.promise
})

test("useNearbyDiscoverEvents stays idle without an enabled location query", () => {
    const { result } = renderHook(() => useNearbyDiscoverEvents({
        enabled: false,
        query: undefined,
    }))

    assert.equal(result.current.loading, false)
    assert.equal(result.current.error, null)
    assert.deepEqual(result.current.data, [])
})

test("useLandingFeaturedEvents loads featured events", async (t: TestContext) => {
    let capturedParams: unknown

    t.mock.method(api, "get", async (url: string, config?: { params?: unknown }) => {
        assert.equal(url, "/event/featured")
        capturedParams = config?.params
        return createApiResponse([{
            ...createDiscoverEvent({
                _id: "featured-event",
            }),
            date: 1778522400,
        }])
    })

    const { result } = renderHook(() => useLandingFeaturedEvents())

    await waitFor(() => {
        assert.equal(result.current.loading, false)
    })

    assert.equal(result.current.data[0]?._id, "featured-event")
    assert.equal(result.current.data[0]?.date, "2026-05-11T18:00:00.000Z")
    assert.equal(capturedParams, undefined)
})

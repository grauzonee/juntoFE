import assert from "node:assert/strict"
import test from "node:test"
import {
    filterDiscoverEvents,
    getDiscoverCategoryTitles,
    getDiscoverEventPosition,
    getDiscoverCategoryTitleById,
    getDiscoverTypeTitle,
    sortDiscoverEvents,
} from "@/components/discover/discover-utils"
import {
    buildDiscoverEventsParams,
    buildDiscoverGeoSearchParams,
} from "@/requests/discover"
import type { DiscoverEvent } from "@/types/discover"

const baseEvent: DiscoverEvent = {
    _id: "1",
    title: "Sunset Photography Walk",
    description: "Golden-hour photo walk through the city.",
    fullAddress: "Stadtpark, Vienna",
    location: {
        type: "Point",
        coordinates: [16.3738, 48.2082],
    },
    date: "2026-03-28T16:00:00.000Z",
    imageUrl: "/event.jpg",
    categories: [{ _id: "c1", title: "Photography" }],
    author: { _id: "u1", username: "Mira" },
    type: { _id: "t1", title: "Workshop" },
    fee: {
        amount: 0,
        currency: "EUR",
    },
}

test("buildDiscoverEventsParams includes server-backed filters", () => {
    assert.deepEqual(
        buildDiscoverEventsParams({
            limit: 24,
            page: 2,
            search: "  community meetup  ",
            typeId: "type-1",
            categoryId: "cat-1",
            dateFilter: "weekend",
            sort: "latest",
        }),
        {
            limit: 24,
            page: 2,
            search: "community meetup",
            type_eq: "type-1",
            categories_in: "[cat-1]",
            date_eq: "this_weekend",
            sortByDesc: "date",
        },
    )
})

test("buildDiscoverGeoSearchParams returns backend query shape", () => {
    assert.deepEqual(
        buildDiscoverGeoSearchParams({ lat: 48.2, lng: 16.37, radius: 3 }),
        { lat: 48.2, lng: 16.37, radius: 3 },
    )
})

test("filterDiscoverEvents matches client-side search and category titles", () => {
    const result = filterDiscoverEvents(
        [baseEvent],
        { search: "photo", selectedDateFilter: "all", selectedCategoryId: "c1" },
    )

    assert.equal(result.length, 1)
})

test("sortDiscoverEvents orders events by latest when requested", () => {
    const olderEvent = {
        ...baseEvent,
        _id: "2",
        date: "2026-03-20T12:00:00.000Z",
    }

    const result = sortDiscoverEvents([olderEvent, baseEvent], "latest")

    assert.equal(result[0]._id, "1")
    assert.equal(getDiscoverTypeTitle(baseEvent), "Workshop")
    assert.equal(getDiscoverCategoryTitleById("c1", [{ id: "c1", title: "Photography" }]), "Photography")
    assert.deepEqual(getDiscoverEventPosition(baseEvent), { lat: 48.2082, lng: 16.3738 })
})

test("getDiscoverTypeTitle logs and returns empty string when title is missing from response body", (t) => {
    const eventWithoutTypeTitle: DiscoverEvent = {
        ...baseEvent,
        type: { _id: "t1" },
    }
    const consoleErrorMock = t.mock.method(console, "error")

    assert.equal(getDiscoverTypeTitle(eventWithoutTypeTitle), "")
    assert.equal(consoleErrorMock.mock.callCount(), 1)
    assert.match(String(consoleErrorMock.mock.calls[0].arguments[0]), /missing title/i)
})

test("getDiscoverCategoryTitles logs and omits categories when title is missing from response body", (t) => {
    const eventWithoutCategoryTitle: DiscoverEvent = {
        ...baseEvent,
        categories: [{ _id: "c1" }, "c2"],
    }
    const consoleErrorMock = t.mock.method(console, "error")

    assert.deepEqual(getDiscoverCategoryTitles(eventWithoutCategoryTitle), [])
    assert.equal(consoleErrorMock.mock.callCount(), 2)
    assert.match(String(consoleErrorMock.mock.calls[0].arguments[0]), /missing title/i)
    assert.match(String(consoleErrorMock.mock.calls[1].arguments[0]), /missing title/i)
})

test("getDiscoverEventPosition converts backend lng-lat points to leaflet lat-lng", () => {
    const sanFranciscoEvent = {
        ...baseEvent,
        location: {
            type: "Point",
            coordinates: [-122.4194, 37.7749],
        },
    }

    assert.deepEqual(getDiscoverEventPosition(sanFranciscoEvent), {
        lat: 37.7749,
        lng: -122.4194,
    })
})

import type { DiscoverCategoryOption, DiscoverEvent, DiscoverEventTypeOption } from "@/types/discover"
import type { Event } from "@/types/Event"

export function createTestEvent(overrides: Partial<Event> = {}): Event {
    return {
        _id: "event-1",
        title: "Community Run Club",
        description: "Start the morning with a social run.\n\nCoffee is on us after the final lap.",
        fullAddress: "Prater Hauptallee, Vienna",
        location: {
            type: "Point",
            coordinates: [16.403, 48.216],
        },
        date: "2026-04-12T08:00:00.000Z",
        imageUrl: "/run-club.jpg",
        categories: [
            { id: "fitness", title: "Fitness" },
            { id: "community", title: "Community" },
        ],
        author: {
            id: "host-1",
            username: "Mira",
            avatarUrl: "/mira.jpg",
        },
        type: {
            id: "workshop",
            title: "Workshop",
        },
        maxAttendees: 30,
        fee: {
            amount: 0,
            currency: "EUR",
        },
        active: true,
        ...overrides,
    }
}

export function createDiscoverEvent(overrides: Partial<DiscoverEvent> = {}): DiscoverEvent {
    return {
        _id: "discover-1",
        title: "Community Run Club",
        description: "Start the morning with a social run through the park.",
        fullAddress: "Prater Hauptallee, Vienna",
        location: {
            type: "Point",
            coordinates: [16.403, 48.216],
        },
        date: "2026-04-12T08:00:00.000Z",
        imageUrl: "/run-club.jpg",
        categories: [{ _id: "fitness", title: "Fitness" }],
        author: { _id: "host-1", username: "Mira" },
        type: { _id: "workshop", title: "Workshop" },
        fee: {
            amount: 0,
            currency: "EUR",
        },
        active: true,
        ...overrides,
    }
}

export const discoverCategories: DiscoverCategoryOption[] = [
    { id: "fitness", title: "Fitness" },
    { id: "community", title: "Community" },
]

export const discoverEventTypes: DiscoverEventTypeOption[] = [
    { id: "workshop", title: "Workshop" },
    { id: "meetup", title: "Meetup" },
]

import { api as axios } from '@/lib/axios'
import { type Event } from '@/types/Event';
import { makeRequest, normalizeApiDateValue } from '@/requests/utils';

const eventCache = new Map<string, Promise<Event | null>>();

export type EventRsvpStatus = "confirmed" | "maybe" | "canceled";

type EventRsvpPayload = {
    eventId: string
    status: EventRsvpStatus
    additionalGuests?: number
}

export type EventRsvp = {
    id?: string
    _id?: string
    status: string
    additionalGuests?: number
    eventDate: string
}

export type CurrentUserEventRsvp = {
    id?: string
    _id?: string
    status: EventRsvpStatus
    additionalGuests?: number
}

type RawEvent = Omit<Event, "date"> & {
    date: string | number
}

function normalizeEvent(event: RawEvent): Event {
    return {
        ...event,
        date: normalizeApiDateValue(event.date),
    }
}

export function createEventResource(id: string) {
    if (!eventCache.has(id)) {
        eventCache.set(id, fetchEvent(id));
    }
    return eventCache.get(id)!;
}

export async function fetchIncomingEvents(): Promise<Event[]> {
    return []
}

export async function fetchPastEvents(): Promise<Event[]> {
    return []
}

export async function fetchOrganizedEvents(): Promise<Event[]> {
    return []
}

export async function fetchEvent(id: string): Promise<Event | null> {
    const response = await makeRequest<{ success: boolean; data: RawEvent }>(() =>
        axios.get(`event/${id}`)
    );

    if (!response) return null;

    return normalizeEvent(response.data);

}

export async function createEventRsvp(payload: EventRsvpPayload): Promise<EventRsvp> {
    const response = await makeRequest<{ success: boolean; data: EventRsvp }>(() =>
        axios.post("/event/attend", payload),
        "rsvp",
    )

    return response.data
}

export async function fetchCurrentUserEventRsvp(eventId: string): Promise<CurrentUserEventRsvp | null> {
    const response = await makeRequest<{ success: boolean; data: CurrentUserEventRsvp | null }>(() =>
        axios.get(`/event/${eventId}/rsvps/me`),
        "rsvp",
    )

    return response.data
}

export async function updateEventRsvp(rsvpId: string, payload: Omit<EventRsvpPayload, "eventId">): Promise<EventRsvp> {
    const response = await makeRequest<{ success: boolean; data: EventRsvp }>(() =>
        axios.put(`/rsvp/${rsvpId}`, payload),
        "rsvp",
    )

    return response.data
}

import { api as axios } from '@/lib/axios'
import { type Event } from '@/types/Event';
import { makeRequest } from '@/requests/utils';

const eventCache = new Map<string, Promise<Event | null>>();

export function createEventResource(id: string) {
    if (!eventCache.has(id)) {
        eventCache.set(id, fetchEvent(id));
    }
    return eventCache.get(id)!;
}

export async function fetchEvent(id: string): Promise<Event | null> {
    const response = await makeRequest<{ success: boolean; data: Event }>(() =>
        axios.get(`event/${id}`)
    );

    if (!response) return null;

    return response.data;

}
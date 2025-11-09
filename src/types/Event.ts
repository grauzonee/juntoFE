import { type User } from "@/types/User"

export type Event = {
    id: string;
    title: string;
    description: string;
    locationValue: string;
    location: {
        longitude: number;
        latitude: number;
    },
    date: string;
    imageUrl: string;
    topics: string[];
    author: User;
}

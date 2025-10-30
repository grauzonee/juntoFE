export type Event = {
    id: string;
    title: string;
    description: string;
    locationValue: string;
    location: {
        longitude: number;
        latitude: number;
    },
    date: number;
    imageUrl: string;
    topics: string[];
}

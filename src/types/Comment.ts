import { type User } from "@/types/User"
import { type Event } from "@/types/Event"

export type Comment = {
    id: string;
    author: User;
    content: string;
    event: Event;
    createdAt: string;
}

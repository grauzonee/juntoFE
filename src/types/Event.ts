import { type User } from "@/types/User"
import { type Category } from "@/types/Category";
import { type Eventtype } from "@/types/Eventtype";

type Location = {
    type: string;
    coordinates: number[]
}

export type Event = {
    _id: string;
    title: string;
    description: string;
    fullAddress: string;
    location: Location;
    date: string;
    imageUrl: string;
    categories: Category[];
    author: Pick<User, "id" | "username" | "avatarUrl">;
    type: Eventtype;
    maxAttendees?: number;
    fee?: {
        amount: number;
        currency: string;
    };
    active?: boolean;
}

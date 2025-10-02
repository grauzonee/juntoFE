import { createContext } from "react";
import type { User } from "@/types/User";


type UserContextType = {
    user: User | null;
    refreshUser: () => void;
};

export const UserContext = createContext<UserContextType>({ user: null, refreshUser: () => { } })



import { useEffect, useMemo, useState, type ReactNode } from "react"
import { getUser } from "@/helpers/user"
import type { User } from "@/types/User"
import { UserContext } from "@/contexts/UserContext"

type UserProviderProps = Readonly<{
    children: ReactNode
}>

export function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<User | null>(null)

    function refreshUser() {
        getUser().then((response) => {
            setUser(response)
        });
    }

    useEffect(() => {
        refreshUser()
    }, [])

    const value = useMemo(() => ({ user, refreshUser }), [user])

    return (
        <UserContext value={value}>
            {children}
        </UserContext>
    )
}

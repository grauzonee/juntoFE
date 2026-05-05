import { Outlet } from "react-router"
import { Toaster } from "@/components/ui/sonner"
import { UserProvider } from "@/providers/UserProvider"

export default function LandingLayout() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Toaster />
            <UserProvider>
                <Outlet />
            </UserProvider>
        </div>
    )
}

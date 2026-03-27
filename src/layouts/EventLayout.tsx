import { Outlet } from "react-router"
import { Toaster } from "@/components/ui/sonner"
import { UserProvider } from "@/providers/UserProvider"
import EventFooter from "@/components/event/EventFooter"
import EventHeader from "@/components/event/EventHeader"

export default function EventLayout() {
    return (
        <div className="min-h-screen bg-cream text-foreground">
            <Toaster />
            <UserProvider>
                <EventHeader />
                <Outlet />
                <EventFooter />
            </UserProvider>
        </div>
    )
}

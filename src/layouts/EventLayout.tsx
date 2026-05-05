import { Outlet } from "react-router"
import { Toaster } from "@/components/ui/sonner"
import { UserProvider } from "@/providers/UserProvider"
import Footer from "@/components/Footer"
import EventHeader from "@/components/event/EventHeader"
import { testIds } from "@/testIds"

export default function EventLayout() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Toaster />
            <UserProvider>
                <EventHeader />
                <Outlet />
                <Footer dataTestId={testIds.event.shellFooter} />
            </UserProvider>
        </div>
    )
}

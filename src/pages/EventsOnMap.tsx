import { lazy } from "react"
import EventsLayout from "@/layouts/EventsLayout"
const Map = lazy(() => import("@/components/Map"))

function Events() {
    const button = {
        to: "/events",
        label: "Show list"
    }
    return (
        <EventsLayout button={button}>
            <Map coordinates={[{ lat: 48.2123, lng: 16.3798 },
            { lat: 48.2053, lng: 16.3788 },
            { lat: 48.2108, lng: 16.3698 },
            { lat: 48.2038, lng: 16.3708 },
            { lat: 48.2138, lng: 16.3748 }]} height={500} zoom={15} />
        </EventsLayout>
    )
}

export default Events

import EventsLayout from "@/layouts/EventsLayout"
import Event from "@/components/Event"
import { Card } from "@/components/ui/card"

function Events() {
    const button = {
        to: "/events/map",
        label: "Show on map"
    }
    return (
        <EventsLayout button={button}>
            <Card className="p-3  flex flex-col md:flex-row gap-3 justify-between items-center cursor-pointer">
                <Event />
            </Card>
        </EventsLayout>
    )
}

export default Events

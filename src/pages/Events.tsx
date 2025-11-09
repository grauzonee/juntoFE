import EventsLayout from "@/layouts/EventsLayout"
import EventCard from "@/components/event/EventCard"
import { event } from "@/data"

function Events() {
    const button = {
        to: "/events/map",
        label: "Show on map"
    }
    const events = [event, event, event]
    return (
        <EventsLayout button={button}>
            {events.map((event) => (
                <EventCard event={event} className="flex flex-row p-5">
                    <EventCard.Image />
                    <div className="flex flex-col w-100 justify-between items-start">
                        <EventCard.Title />
                        <EventCard.Description />
                        <EventCard.Date />
                    </div>
                </EventCard>

            ))}

        </EventsLayout>
    )
}

export default Events

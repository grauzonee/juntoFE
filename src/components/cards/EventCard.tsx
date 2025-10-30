import { type Event } from "@/types/Event"
import { Card, CardTitle, CardDescription } from "@/components/ui/card"
import React, { createContext, useContext, type PropsWithChildren } from "react"
import { Link } from "react-router"
import { Badge } from "@/components/ui/badge"
import { Button } from "../ui/button"

type EventCardProps = PropsWithChildren & React.ComponentProps<'div'> & {
    event: Event
}
type EventCardContext = {
    event: Event
}

const EventCardContext = createContext<EventCardContext | undefined>(undefined)

function useEventCardContext() {
    const context = useContext(EventCardContext);
    if (!context) {
        throw new Error('useEventCardContext must be within an EventCard')
    }
    return context;
}

function EventCard({ children, event, className }: EventCardProps) {
    return (
        <EventCardContext.Provider value={{ event }}>
            <Card className={className} >
                {children}
            </Card >
        </EventCardContext.Provider>
    )
}

EventCard.Image = function EventCardImage() {
    const { event } = useEventCardContext()
    return (
        <div className="rounded-lg w-full overflow-hidden">
            <div className="absolute top-0 right-0 h-5 w-5 bg-gray-700 rounded-md"></div>
            <img src={event.imageUrl} alt="Event" className="object-cover" />
        </div>

    )
}
EventCard.Title = function EventCardTitle() {
    const { event } = useEventCardContext()
    return (
        <Link to="/event">
            <CardTitle>{event.title}</CardTitle>
        </Link>

    )
}
EventCard.Description = function EventCardDescription() {
    const { event } = useEventCardContext()
    return (
        <CardDescription>{event.description}</CardDescription>
    )
}
EventCard.Tags = function EventCardTags() {
    const { event } = useEventCardContext()
    return (
        <div className="w-full">
            {event.topics.map((topic) => (
                <Badge>{topic}</Badge>
            ))}
        </div>
    )
}
EventCard.Buttons = function EventCardButtons() {
    return (
        <div className="w-full">
            <Button className="bg-accent">Attend</Button>
        </div>
    )
}
export default EventCard

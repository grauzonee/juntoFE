import { type Event } from "@/types/Event"
import { Card } from "@/components/ui/card"
import React, { createContext, useContext, type PropsWithChildren } from "react"
import { Link } from "react-router"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import AvatarsGroup from "@/components/AvatarsGroup"
import ReadMore from "@/components/ReadMore"
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Clock, MapPin } from 'lucide-react';

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
            <Card className={cn("p-2 md:p-5", className)} >
                {children}
            </Card >
        </EventCardContext.Provider>
    )
}

EventCard.Image = function EventCardImage({ className }: React.ComponentProps<'div'>) {
    const { event } = useEventCardContext()
    return (
        <div className={cn("rounded-lg w-full overflow-hidden border-2 border-border", className)}>
            <div className="absolute top-0 right-0 h-5 w-5 bg-gray-700 rounded-md"></div>
            <img src={event.imageUrl} alt="Event" className="object-cover" />
        </div>

    )
}

type EventCardTitleProps = React.ComponentProps<'div'> & {
    isLink?: boolean,
}

EventCard.Title = function EventCardTitle({ isLink = true, className }: EventCardTitleProps) {
    const { event } = useEventCardContext()

    if (isLink) {
        return (
            <Link to={`/event/${event._id}`}>
                <p className={className}>{event.title}</p>
            </Link>
        )
    }
    return (
        <p className={className}>{event.title}</p>
    )
}
EventCard.Description = function EventCardDescription({ className }: React.ComponentProps<'div'>) {
    const { event } = useEventCardContext()
    return (
        <ReadMore text={event.description} className={className} />
    )
}
EventCard.Address = function EventCardAddress({ className }: React.ComponentProps<'div'>) {
    const { event } = useEventCardContext()
    return (
        <div className="flex flex-row gap-1">
            <MapPin />
            <p className={className}>{event.fullAddress}</p>
        </div>
    )
}

EventCard.Time = function EventCardAddress({ className }: React.ComponentProps<'div'>) {
    const { event } = useEventCardContext()
    const date = new Date(event.date);

    const datePart = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
    }).format(date).replace(" ", ".");
    const timePart = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).format(date);
    return (
        <div className="flex flex-row gap-1">
            <Clock />
            <p className={className}>{datePart}, {timePart}</p>
        </div>
    )
}
EventCard.Categories = function EventCardCategories({ className }: React.ComponentProps<'div'>) {
    const { event } = useEventCardContext()
    return (
        <div className={cn("w-full flex flex-row gap-2", className)}>
            {event.categories.map((category) => (
                <Badge key={category.id}>{category.title}</Badge>
            ))}
        </div>
    )
}

EventCard.Type = function EventCardType({ className }: React.ComponentProps<'div'>) {
    const { event } = useEventCardContext()
    return (
        <div className={cn("w-full flex flex-row gap-2", className)}>
            <Badge>{event.type.title}</Badge>
        </div>
    )
}

EventCard.Buttons = function EventCardButtons({ className }: React.ComponentProps<'div'>) {
    return (
        <div className={cn("w-full", className)}>
            <Button className="bg-accent aspect-[4/1]">Attend</Button>
        </div>
    )
}
EventCard.OrganizerName = function EventCardOrganizerName({ className }: React.ComponentProps<'div'>) {
    const { event } = useEventCardContext()
    return (
        <div className={cn("w-full", className)}>
            <p>{event.author.username}</p>
        </div>
    )
}

EventCard.OrganizerAvatar = function EventCardOrganizerAvatar({ className }: React.ComponentProps<'div'>) {
    const { event } = useEventCardContext()
    return (
        <Avatar className={className}>
            <AvatarImage src={event.author.avatarUrl} />
        </Avatar>
    )
}

EventCard.Participants = function EventCardParticipants({ className }: React.ComponentProps<'div'>) {
    return (<AvatarsGroup className={className} />)
}
export default EventCard

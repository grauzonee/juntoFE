import { type Event } from "@/types/Event"
import { Card } from "@/components/ui/card"
import React, { createContext, useContext, type PropsWithChildren } from "react"
import { Link } from "react-router"
import { Badge } from "@/components/ui/badge"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import AvatarsGroup from "@/components/AvatarsGroup"
import ReadMore from "@/components/ReadMore"
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const eventDateVariants = cva(
    "bg-accent text-accent-foreground",
    {
        variants: {
            variant: {
                inline: "",
                box: "aspect-square rounded-md shadow-shadow border-1 border-border"
            }
        },
        defaultVariants: {
            variant: "inline"
        }
    }
)
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
        <div className={cn("rounded-lg w-full overflow-hidden", className)}>
            <div className="absolute top-0 right-0 h-5 w-5 bg-gray-700 rounded-md"></div>
            <img src={event.imageUrl} alt="Event" className="object-cover" />
        </div>

    )
}
EventCard.Title = function EventCardTitle({ className }: React.ComponentProps<'div'>) {
    const { event } = useEventCardContext()
    return (
        <Link to="/event" className={className}>
            <h2>{event.title}</h2>
        </Link>

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
        <p className={className}>{event.locationValue}</p>
    )
}
EventCard.Tags = function EventCardTags({ className }: React.ComponentProps<'div'>) {
    const { event } = useEventCardContext()
    return (
        <div className={cn("w-full flex flex-row gap-2", className)}>
            {event.topics.map((topic) => (
                <Badge>{topic}</Badge>
            ))}
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
EventCard.Date = function EventCardDate({ variant, className }: VariantProps<typeof eventDateVariants> & React.ComponentProps<'div'>) {
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
        <div className={cn(
            eventDateVariants({ variant, className })
        )}>
            <div className="bg-accent text-accent-foreground px-2 border-2 border-border h-full flex flex-col justify-center">
                <p className="text-3xl text-center w-full font-bold">{datePart}</p>
                <p className="text-xl font-bold w-full text-center">{timePart}</p>
            </div>
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

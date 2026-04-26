import type { Event } from "@/types/Event"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import WindowCard from "@/components/landing/WindowCard"
import BrutalButton from "@/components/landing/BrutalButton"
import EventSectionHeading from "@/components/event/EventSectionHeading"
import { getUserInitials } from "@/components/event/event-utils"
import { Link } from "react-router"
import { testIds } from "@/testIds"

type EventHostCardProps = {
    event: Event
}

export default function EventHostCard({ event }: EventHostCardProps) {
    return (
        <WindowCard
            data-testid={testIds.event.hostCard}
            className="overflow-hidden bg-violet-light motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-4 motion-safe:duration-500"
        >
            <div className="p-5 md:p-6">
                <EventSectionHeading label="Hosted by" />
                <Avatar className="h-20 w-20 border-brutal border-border bg-card">
                    <AvatarImage src={event.author.avatarUrl} alt={event.author.username} className="object-cover" />
                    <AvatarFallback className="bg-card font-display text-2xl font-extrabold">
                        {getUserInitials(event.author.username)}
                    </AvatarFallback>
                </Avatar>
                <p className="mt-4 text-xl font-bold">{event.author.username}</p>
                <p className="mt-1 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/65">
                    Event organizer
                </p>
                <BrutalButton asChild tone="mint" className="mt-5 w-full">
                    <Link to="/events">Explore more events</Link>
                </BrutalButton>
            </div>
        </WindowCard>
    )
}

import type { Event } from "@/types/Event"
import WindowCard from "@/components/landing/WindowCard"
import EventSectionHeading from "@/components/event/EventSectionHeading"
import { splitEventDescription } from "@/components/event/event-utils"

type EventAboutSectionProps = {
    event: Event
}

export default function EventAboutSection({ event }: EventAboutSectionProps) {
    const paragraphs = splitEventDescription(event.description)

    return (
        <WindowCard className="motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-4 motion-safe:duration-500">
            <div className="p-5 md:p-7">
                <EventSectionHeading label="About" />
                <div className="space-y-4 text-base leading-8 text-foreground/80">
                    {paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </div>
            </div>
        </WindowCard>
    )
}

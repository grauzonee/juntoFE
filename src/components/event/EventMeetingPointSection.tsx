import type { Event } from "@/types/Event"
import WindowCard from "@/components/landing/WindowCard"
import EventSectionHeading from "@/components/event/EventSectionHeading"
import EventLocationMap from "@/components/event/EventLocationMap"
import {
    formatCoordinateLabel,
    getEventCoordinates,
} from "@/components/event/event-utils"
import { testIds } from "@/testIds"

type EventMeetingPointSectionProps = {
    event: Event
}

export default function EventMeetingPointSection({ event }: EventMeetingPointSectionProps) {
    const coordinates = getEventCoordinates(event)

    return (
        <WindowCard
            data-testid={testIds.event.meetingPointSection}
            className="motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-4 motion-safe:duration-500"
        >
            <div className="p-5 md:p-7">
                <EventSectionHeading label="Meeting point" />
                <EventLocationMap
                    lat={coordinates.lat}
                    lng={coordinates.lng}
                    label={event.fullAddress}
                />
                <p className="mt-5 text-base font-semibold">{event.fullAddress}</p>
                <p className="mt-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/55">
                    {formatCoordinateLabel(coordinates.lat, "N", "S")}, {formatCoordinateLabel(coordinates.lng, "E", "W")}
                </p>
            </div>
        </WindowCard>
    )
}

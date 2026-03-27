import { use } from "react"
import type { Event } from "@/types/Event"
import { createEventResource } from "@/requests/event"
import EventHero from "@/components/event/EventHero"
import EventAboutSection from "@/components/event/EventAboutSection"
import EventMeetingPointSection from "@/components/event/EventMeetingPointSection"
import EventDiscussionSection from "@/components/event/EventDiscussionSection"
import EventHostCard from "@/components/event/EventHostCard"
import EventRsvpCard from "@/components/event/EventRsvpCard"

type EventPageProps = {
    id: string
}

function EventPageContent({ event }: { event: Event }) {
    return (
        <main className="pb-16">
            <EventHero event={event} />
            <div className="mx-auto grid max-w-7xl gap-8 px-4 md:px-6 lg:grid-cols-[minmax(0,1.3fr)_22rem] lg:items-start">
                <div className="space-y-8">
                    <EventAboutSection event={event} />
                    <EventMeetingPointSection event={event} />
                    <EventDiscussionSection />
                </div>
                <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
                    <EventRsvpCard event={event} />
                    <EventHostCard event={event} />
                </aside>
            </div>
        </main>
    )
}

export default function EventPage({ id }: EventPageProps) {
    const event = use(createEventResource(id))

    if (!event) {
        throw new Error("NOT_FOUND")
    }

    return <EventPageContent event={event} />
}

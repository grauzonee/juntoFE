import { event } from "@/data"
import { Link } from "react-router"
import type { Event } from "@/types/Event"
import PillBadge from "@/components/ui/pill-badge"
import { cn } from "@/lib/utils"

const featuredEvents: Event[] = [
    {
        ...event,
        _id: "profile-host-1",
        title: "Sunset Photography Walk",
        description: "Golden-hour walk with photo prompts and a relaxed group route through the park.",
        fullAddress: "Stadtpark, Vienna",
        date: "2026-03-22T18:00:00.000Z",
        fee: {
            amount: 0,
            currency: "EUR",
        },
        categories: [{ id: "photography", title: "Photography" }],
        type: { id: "hosting", title: "Hosting" },
    },
    {
        ...event,
        _id: "profile-host-2",
        title: "Board Game Night",
        description: "Casual midweek games, open tables, and a mix of light strategy and party picks.",
        fullAddress: "Cafe Central, Vienna",
        date: "2026-03-25T18:30:00.000Z",
        fee: {
            amount: 5,
            currency: "EUR",
        },
        categories: [{ id: "social", title: "Social" }],
        type: { id: "hosting", title: "Hosting" },
    },
    {
        ...event,
        _id: "profile-host-3",
        title: "Morning Yoga in the Park",
        description: "Soft-flow yoga for all levels with mats, music, and tea after the session.",
        fullAddress: "Prater, Vienna",
        date: "2026-03-28T08:00:00.000Z",
        fee: {
            amount: 0,
            currency: "EUR",
        },
        categories: [{ id: "wellness", title: "Wellness" }],
        type: { id: "hosting", title: "Hosting" },
    },
]

const attendingEvents: Event[] = [
    {
        ...event,
        _id: "profile-attending-1",
        title: "Live Jazz Evening",
        description: "Small club set with a relaxed crowd and optional drinks after the show.",
        fullAddress: "Thu, Mar 19 · 8 PM · Jazz Club Vienna",
        date: "2026-03-19T20:00:00.000Z",
        fee: {
            amount: 12,
            currency: "EUR",
        },
        categories: [{ id: "culture", title: "Culture" }],
        type: { id: "attending", title: "Attending" },
    },
    {
        ...event,
        _id: "profile-attending-2",
        title: "Weekend Hiking Trip",
        description: "Easy group trail, carpool planning, and a longer lunch break at the top.",
        fullAddress: "Sat, Mar 22 · 7 AM · Kahlenberg Trailhead",
        date: "2026-03-22T07:00:00.000Z",
        fee: {
            amount: 0,
            currency: "EUR",
        },
        categories: [{ id: "hiking", title: "Hiking" }],
        type: { id: "attending", title: "Attending" },
    },
]

const featuredSurfaceTones = [
    "bg-violet-light",
    "bg-mint-light",
    "bg-yellow",
] as const

function EventsTabs() {
    return (
        <div className="space-y-8">
            <AttendingEventsSection />
            <MyEventsSection />
        </div>
    )
}

export default EventsTabs
export function AttendingEventsSection() {
    return (
        <ProfileEventSection title="Attending">
            <div className="grid gap-4 xl:grid-cols-2">
                {attendingEvents.map((listedEvent) => (
                    <CompactProfileEventCard key={listedEvent._id} event={listedEvent} />
                ))}
            </div>
        </ProfileEventSection>
    )
}

export function MyEventsSection() {
    return (
        <ProfileEventSection title="My events">
            <div className="grid gap-5 xl:grid-cols-3">
                {featuredEvents.map((listedEvent, index) => (
                    <FeaturedProfileEventCard
                        key={listedEvent._id}
                        event={listedEvent}
                        surfaceTone={featuredSurfaceTones[index % featuredSurfaceTones.length]}
                    />
                ))}
            </div>
        </ProfileEventSection>
    )
}

type ProfileEventSectionProps = Readonly<{
    title: string
    children: React.ReactNode
}>

function ProfileEventSection({ title, children }: ProfileEventSectionProps) {
    return (
        <section className="space-y-4">
            <div className="space-y-1">
                <p className="font-heading text-xs font-bold uppercase tracking-[0.18em] text-foreground/55">
                    Profile events
                </p>
                <h2 className="font-heading text-2xl font-bold md:text-3xl">{title}</h2>
            </div>
            {children}
        </section>
    )
}

type FeaturedProfileEventCardProps = Readonly<{
    event: Event
    surfaceTone: string
}>

function FeaturedProfileEventCard({ event, surfaceTone }: FeaturedProfileEventCardProps) {
    return (
        <article className="overflow-hidden border-2 border-border bg-card shadow-brutal transition duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-lg">
            <div className="flex items-center justify-between border-b-2 border-border bg-card px-3 py-2">
                <div className="flex items-center gap-1.5">
                    <span className="size-3 rounded-full border border-border bg-coral" />
                    <span className="size-3 rounded-full border border-border bg-yellow" />
                    <span className="size-3 rounded-full border border-border bg-mint" />
                </div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/65">
                    {formatFeatureDate(event.date)}
                </p>
            </div>

            <div className={cn("border-b-2 border-border p-4", surfaceTone)}>
                <div className="overflow-hidden border-2 border-border bg-card">
                    <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="h-44 w-full object-cover"
                    />
                </div>
            </div>

            <div className="space-y-4 px-4 py-4">
                <div className="space-y-2">
                    <Link to={`/event/${event._id}`} className="block">
                        <h3 className="font-heading text-2xl font-bold leading-tight">{event.title}</h3>
                    </Link>
                    <p className="text-sm leading-6 text-foreground/72">{event.fullAddress}</p>
                    <p className="text-sm leading-6 text-foreground/72">
                        {getAttendanceLabel(event)}
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <PillBadge tone="white">{event.type.title}</PillBadge>
                    <PillBadge tone={event.fee?.amount ? "yellow" : "mint"}>
                        {formatFeeLabel(event)}
                    </PillBadge>
                    {event.categories[0] ? (
                        <PillBadge tone="white">{event.categories[0].title}</PillBadge>
                    ) : null}
                </div>
            </div>
        </article>
    )
}

function CompactProfileEventCard({ event }: Readonly<{ event: Event }>) {
    return (
        <article className="border-2 border-border bg-card px-4 py-4 shadow-brutal-sm transition duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal">
            <div className="grid gap-3 sm:grid-cols-[4.75rem_minmax(0,1fr)] sm:items-start">
                <div className="flex h-[4.75rem] flex-col items-center justify-center border-2 border-border bg-cream text-center shadow-brutal-sm">
                    <span className="font-display text-3xl font-extrabold leading-none tracking-[-0.06em]">
                        {formatCalendarDay(event.date)}
                    </span>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/65">
                        {formatCalendarMonth(event.date)}
                    </span>
                </div>
                <div className="space-y-2">
                    <Link to={`/event/${event._id}`} className="block">
                        <h3 className="font-heading text-xl font-bold leading-tight">{event.title}</h3>
                    </Link>
                    <p className="text-sm leading-6 text-foreground/72">{event.fullAddress}</p>
                    <div className="flex flex-wrap gap-2">
                        <PillBadge tone={event.fee?.amount ? "yellow" : "mint"}>{formatFeeLabel(event)}</PillBadge>
                        {event.categories[0] ? <PillBadge tone="white">{event.categories[0].title}</PillBadge> : null}
                    </div>
                </div>
            </div>
        </article>
    )
}

function formatFeatureDate(eventDate: string) {
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    }).format(new Date(eventDate))
}

function formatCalendarDay(eventDate: string) {
    return new Intl.DateTimeFormat("en-US", {
        day: "2-digit",
    }).format(new Date(eventDate))
}

function formatCalendarMonth(eventDate: string) {
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
    }).format(new Date(eventDate))
}

function formatFeeLabel(event: Event) {
    if (!event.fee || event.fee.amount === 0) {
        return "Free"
    }

    return `€${event.fee.amount}`
}

function getAttendanceLabel(event: Event) {
    const totalAttendees = event.capacity?.confirmedAttendanceTotal

    if (typeof totalAttendees === "number" && totalAttendees > 0) {
        return `${totalAttendees} attending`
    }

    return "Open for attendees"
}

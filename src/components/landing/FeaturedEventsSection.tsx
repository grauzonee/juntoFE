import { useEffect, useState } from "react"
import { Link } from "react-router"
import SectionHeading from "@/components/landing/SectionHeading"
import PillBadge from "@/components/ui/pill-badge"
import WindowCard from "@/components/ui/window-card"
import {
    formatDiscoverDate,
    formatDiscoverFee,
    getDiscoverCategoryTitles,
    getDiscoverTypeTitle,
} from "@/components/discover/discover-utils"
import { fetchLandingUpcomingEvents } from "@/requests/landing"
import type { DiscoverEvent } from "@/types/discover"
import { testIds } from "@/testIds"

export default function FeaturedEventsSection() {
    const [events, setEvents] = useState<DiscoverEvent[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let ignore = false

        async function loadUpcomingEvents() {
            setLoading(true)
            setError(null)

            try {
                const response = await fetchLandingUpcomingEvents()
                if (!ignore) {
                    setEvents(response)
                }
            } catch (nextError) {
                if (!ignore) {
                    setError(nextError instanceof Error ? nextError.message : "Failed to load upcoming events")
                    setEvents([])
                }
            } finally {
                if (!ignore) {
                    setLoading(false)
                }
            }
        }

        loadUpcomingEvents()

        return () => {
            ignore = true
        }
    }, [])

    return (
        <section id="discover" className="px-4 py-14 md:px-6">
            <div className="mx-auto max-w-7xl">
                <SectionHeading eyebrow="Upcoming events" actionLabel="See all events" actionHref="/events" />
                {renderContent({ events, loading, error })}
                <div className="mt-8 text-center">
                    <Link to="/events" className="font-heading text-lg font-bold text-violet transition-colors hover:text-mint">
                        Browse all upcoming events
                    </Link>
                </div>
            </div>
        </section>
    )
}

function renderContent({
    events,
    loading,
    error,
}: {
    events: DiscoverEvent[]
    loading: boolean
    error: string | null
}) {
    if (loading) {
        return (
            <div className="grid gap-6 lg:grid-cols-3">
                {[0, 1, 2].map((item) => (
                    <WindowCard key={item} className="overflow-hidden rounded-none">
                        <div className="h-48 animate-pulse border-b-2 border-border bg-violet-light" />
                        <div className="space-y-3 px-5 py-5">
                            <div className="h-3 w-32 animate-pulse bg-foreground/15" />
                            <div className="h-6 w-4/5 animate-pulse bg-foreground/15" />
                            <div className="h-4 w-3/5 animate-pulse bg-foreground/15" />
                        </div>
                    </WindowCard>
                ))}
            </div>
        )
    }

    if (error) {
        return (
            <div className="border-2 border-border bg-coral px-5 py-4 font-semibold text-white shadow-brutal">
                {error}
            </div>
        )
    }

    if (events.length === 0) {
        return (
            <div className="border-2 border-dashed border-border bg-card px-5 py-6 text-foreground/70">
                No upcoming events are available right now.
            </div>
        )
    }

    return (
        <div className="grid gap-6 lg:grid-cols-3">
            {events.map((event) => {
                const categoryTitles = getDiscoverCategoryTitles(event)
                const feeLabel = formatDiscoverFee(event)

                return (
                    <WindowCard
                        key={event._id}
                        data-testid={testIds.landing.upcomingEventCard(event._id)}
                        className="overflow-hidden rounded-none"
                    >
                        <div className="relative h-48 overflow-hidden border-b-2 border-border bg-violet-light">
                            <img
                                src={event.imageUrl}
                                alt={event.title}
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute right-3 top-3">
                                <PillBadge tone="yellow">{getDiscoverTypeTitle(event)}</PillBadge>
                            </div>
                        </div>
                        <div className="space-y-4 px-5 py-5">
                            <div>
                                <p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/60">
                                    {formatDiscoverDate(event.date)}
                                </p>
                                <Link to={`/event/${event._id}`} className="block">
                                    <h3 className="font-heading text-xl font-bold">{event.title}</h3>
                                </Link>
                                <p className="mt-2 text-sm text-foreground/70">{event.fullAddress}</p>
                            </div>
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div className="flex flex-wrap gap-2">
                                    <PillBadge tone={feeLabel === "Free" ? "mint" : "yellow"}>
                                        {feeLabel}
                                    </PillBadge>
                                    {categoryTitles.slice(0, 1).map((category) => (
                                        <PillBadge key={category}>{category}</PillBadge>
                                    ))}
                                </div>
                                <Link
                                    to={`/event/${event._id}`}
                                    className="font-heading text-sm font-bold text-violet transition-colors hover:text-mint"
                                >
                                    View details
                                </Link>
                            </div>
                        </div>
                    </WindowCard>
                )
            })}
        </div>
    )
}

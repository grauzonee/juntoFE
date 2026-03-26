import { Link } from "react-router"
import SectionHeading from "@/components/landing/SectionHeading"
import PillBadge from "@/components/landing/PillBadge"
import WindowCard from "@/components/landing/WindowCard"
import { featuredEvents } from "@/components/landing/landing-data"

export default function FeaturedEventsSection() {
    return (
        <section id="discover" className="px-4 py-14 md:px-6">
            <div className="mx-auto max-w-7xl">
                <SectionHeading eyebrow="Featured events" actionLabel="See all events" actionHref="/events" />
                <div className="grid gap-6 lg:grid-cols-3">
                    {featuredEvents.map((event) => (
                        <WindowCard key={event.title} className="overflow-hidden rounded-none">
                            <div className={`flex h-48 items-center justify-center border-b-2 border-border text-6xl ${event.imageClassName}`}>
                                <span aria-hidden="true">{event.emoji}</span>
                            </div>
                            <div className="space-y-4 px-5 py-5">
                                <div>
                                    <p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/60">{event.date}</p>
                                    <h3 className="font-heading text-xl font-bold">{event.title}</h3>
                                    <p className="mt-2 text-sm text-foreground/70">{event.location}</p>
                                </div>
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div className="flex flex-wrap gap-2">
                                        <PillBadge tone={event.priceLabel === "Free" ? "mint" : "yellow"}>
                                            {event.priceLabel}
                                        </PillBadge>
                                        <PillBadge>{event.category}</PillBadge>
                                    </div>
                                    <span className="text-sm text-foreground/70">{event.attendees}</span>
                                </div>
                            </div>
                        </WindowCard>
                    ))}
                </div>
                <div className="mt-8 text-center">
                    <Link to="/events" className="font-heading text-lg font-bold text-violet transition-colors hover:text-mint">
                        Browse all upcoming events
                    </Link>
                </div>
            </div>
        </section>
    )
}

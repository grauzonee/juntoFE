import { Link } from "react-router"
import PillBadge from "@/components/landing/PillBadge"
import { cn } from "@/lib/utils"
import type { DiscoverEvent, DiscoverViewMode } from "@/types/discover"
import { formatDiscoverDate, formatDiscoverFee } from "@/components/discover/discover-utils"
import { Clock3, MapPin } from "lucide-react"

type DiscoverEventCardProps = {
    event: DiscoverEvent
    view: DiscoverViewMode
    typeTitle: string
    categoryTitles: string[]
}

export default function DiscoverEventCard({
    event,
    view,
    typeTitle,
    categoryTitles,
}: DiscoverEventCardProps) {
    const isList = view === "list"

    return (
        <article
            className={cn(
                "overflow-hidden border-[3px] border-border bg-card shadow-[6px_6px_0_0_hsl(var(--border))] transition duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_0_hsl(var(--border))]",
                isList ? "grid gap-0 md:grid-cols-[15rem_minmax(0,1fr)]" : "flex flex-col",
            )}
        >
            <div className={cn("relative overflow-hidden border-b-2 border-border md:border-b-0", isList && "md:border-b-0 md:border-r-2")}>
                <img
                    src={event.imageUrl}
                    alt={event.title}
                    className={cn(
                        "h-full w-full object-cover",
                        isList ? "min-h-52" : "h-56",
                    )}
                />
                <div className="absolute right-3 top-3">
                    <PillBadge tone="yellow">{typeTitle}</PillBadge>
                </div>
            </div>

            <div className="flex flex-1 flex-col justify-between gap-4 p-5">
                <div className="space-y-3">
                    <Link to={`/event/${event._id}`} className="block">
                        <h3 className="font-heading text-2xl font-bold leading-tight">{event.title}</h3>
                    </Link>
                    <div className="flex flex-col gap-2 text-sm text-foreground/75">
                        <div className="flex items-start gap-2">
                            <Clock3 className="mt-0.5 size-4 shrink-0" />
                            <span>{formatDiscoverDate(event.date)}</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <MapPin className="mt-0.5 size-4 shrink-0" />
                            <span>{event.fullAddress}</span>
                        </div>
                    </div>
                    <p className="line-clamp-3 text-base leading-7 text-foreground/75">{event.description}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <PillBadge tone={formatDiscoverFee(event) === "Free" ? "mint" : "yellow"}>
                        {formatDiscoverFee(event)}
                    </PillBadge>
                    {categoryTitles.slice(0, 2).map((category) => (
                        <PillBadge key={category}>{category}</PillBadge>
                    ))}
                    <Link
                        to={`/event/${event._id}`}
                        className="ml-auto font-heading text-sm font-bold text-violet transition-colors hover:text-mint"
                    >
                        View details
                    </Link>
                </div>
            </div>
        </article>
    )
}

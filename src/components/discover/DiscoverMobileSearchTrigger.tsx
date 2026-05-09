import { testIds } from "@/testIds"
import { Search, SlidersHorizontal } from "lucide-react"

type DiscoverMobileSearchTriggerProps = {
    search: string
    activeFilterCount: number
    onClick: () => void
}

export default function DiscoverMobileSearchTrigger({
    search,
    activeFilterCount,
    onClick,
}: Readonly<DiscoverMobileSearchTriggerProps>) {
    const hasFilters = activeFilterCount > 0
    const displayValue = search.trim().length > 0 ? search.trim() : "Search events"

    return (
        <button
            type="button"
            data-testid={testIds.discover.mobileSearchTrigger}
            onClick={onClick}
            className="flex w-full items-center gap-3 rounded-[1.25rem] border-2 border-border bg-event-surface px-5 py-3 text-left shadow-brutal-sm transition active:translate-y-0.5 active:shadow-none"
            aria-label="Open discover search"
        >
            <Search className="size-4 shrink-0 text-foreground/60" />
            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{displayValue}</p>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/50">
                    {hasFilters ? `${activeFilterCount} filters active` : "Tap to refine"}
                </p>
            </div>
            <div className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-border bg-cream">
                <SlidersHorizontal className="size-4" />
            </div>
        </button>
    )
}

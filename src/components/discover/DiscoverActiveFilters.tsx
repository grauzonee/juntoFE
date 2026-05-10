import { cn } from "@/lib/utils"
import {
    defaultResponsiveVariant,
    isMobile,
    type ResponsiveVariant,
} from "@/helpers/responsive"
import type { DiscoverActiveFilter } from "@/types/discover"
import { X } from "lucide-react"

type DiscoverActiveFiltersProps = {
    activeFilters: DiscoverActiveFilter[]
    onClearFilter: (id: string) => void
    onClearAll: () => void
    variant?: ResponsiveVariant
}

export default function DiscoverActiveFilters({
    activeFilters,
    onClearFilter,
    onClearAll,
    variant = defaultResponsiveVariant,
}: Readonly<DiscoverActiveFiltersProps>) {
    if (activeFilters.length === 0) {
        return null
    }

    const mobile = isMobile(variant)

    return (
        <div
            className={cn(
                "flex flex-col gap-3 bg-cream px-4 py-4 md:flex-row md:items-center md:justify-between",
                mobile ? "border-t border-border/15 px-5" : "border-t-[3px] border-border",
            )}
        >
            <div className="flex flex-wrap gap-2">
                {activeFilters.map((filter) => (
                    <button
                        key={filter.id}
                        type="button"
                        onClick={() => onClearFilter(filter.id)}
                        className="inline-flex items-center gap-2 border-2 border-border bg-card px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] transition hover:bg-coral hover:text-white"
                    >
                        {filter.label}
                        <X className="size-3.5" />
                    </button>
                ))}
            </div>
            <button
                type="button"
                onClick={onClearAll}
                className="inline-flex items-center justify-center border-2 border-border bg-card px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] transition hover:bg-coral hover:text-white"
            >
                Clear all
            </button>
        </div>
    )
}

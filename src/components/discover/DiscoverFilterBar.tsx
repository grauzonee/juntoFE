import { useState } from "react"
import DiscoverActiveFilters from "@/components/discover/DiscoverActiveFilters"
import DiscoverMobileSearchDialog from "@/components/discover/DiscoverMobileSearchDialog"
import DiscoverMobileSearchTrigger from "@/components/discover/DiscoverMobileSearchTrigger"
import DiscoverNearMeButton from "@/components/discover/DiscoverNearMeButton"
import DiscoverRefinementControls, {
    type DiscoverRefinementControlGroups,
} from "@/components/discover/DiscoverRefinementControls"
import DiscoverSearchBar from "@/components/discover/DiscoverSearchBar"
import type { DiscoverSelectOption } from "@/components/discover/DiscoverSelect"
import type {
    DiscoverActiveFilter,
    DiscoverCategoryOption,
    DiscoverDateFilter,
    DiscoverEventTypeOption,
    DiscoverFilters,
    DiscoverSortOption,
} from "@/types/discover"
import { testIds } from "@/testIds"

type DiscoverFilterBarProps = {
    count: number
    filters: DiscoverFilters
    activeFilters: DiscoverActiveFilter[]
    categories: DiscoverCategoryOption[]
    eventTypes: DiscoverEventTypeOption[]
    onSearchChange: (value: string) => void
    onTypeChange: (value: string) => void
    onDateFilterChange: (value: DiscoverDateFilter) => void
    onCategoryChange: (value: string) => void
    onSortChange: (value: DiscoverSortOption) => void
    onClearFilter: (id: string) => void
    onClearAll: () => void
    onNearMeClick: () => void
}

const dateFilters: { value: DiscoverDateFilter; label: string }[] = [
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "weekend", label: "This Weekend" },
    { value: "month", label: "This Month" },
]

export default function DiscoverFilterBar({
    count,
    filters,
    activeFilters,
    categories,
    eventTypes,
    onSearchChange,
    onTypeChange,
    onDateFilterChange,
    onCategoryChange,
    onSortChange,
    onClearFilter,
    onClearAll,
    onNearMeClick,
}: Readonly<DiscoverFilterBarProps>) {
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
    const categoryOptions = [
        { value: "all", label: "Category: All" },
        ...categories.map((category) => ({ value: category.id, label: `Category: ${category.title}` })),
    ]
    const dateFilterOptions: DiscoverSelectOption<DiscoverDateFilter>[] = [
        { value: "all", label: "When: Anytime" },
        ...dateFilters.map((filter) => ({ value: filter.value, label: `When: ${filter.label}` })),
    ]
    const eventTypeOptions = [
        { value: "all", label: "Type: All Types" },
        ...eventTypes.map((type) => ({ value: type.id, label: `Type: ${type.title}` })),
    ]
    const refinementControls: DiscoverRefinementControlGroups = {
        category: {
            value: filters.selectedCategoryId,
            options: categoryOptions,
            onChange: onCategoryChange,
        },
        dateFilter: {
            value: filters.selectedDateFilter,
            options: dateFilterOptions,
            onChange: onDateFilterChange,
        },
        eventType: {
            value: filters.selectedTypeId,
            options: eventTypeOptions,
            onChange: onTypeChange,
        },
    }

    return (
        <section
            data-discover-filter-bar
            data-testid={testIds.discover.filterBar}
            className="sticky top-0 z-20 bg-transparent py-3 md:border-b-brutal md:border-border md:bg-cream/95 md:px-6 md:py-5 md:backdrop-blur"
        >
            <div className="md:hidden">
                <DiscoverMobileSearchTrigger
                    search={filters.search}
                    activeFilterCount={activeFilters.length}
                    onClick={() => setIsMobileSearchOpen(true)}
                />
                <DiscoverMobileSearchDialog
                    activeFilters={activeFilters}
                    refinementControls={refinementControls}
                    open={isMobileSearchOpen}
                    search={filters.search}
                    sort={filters.sort}
                    onClearAll={onClearAll}
                    onClearFilter={onClearFilter}
                    onNearMeClick={onNearMeClick}
                    onOpenChange={setIsMobileSearchOpen}
                    onSearchChange={onSearchChange}
                    onSortChange={onSortChange}
                />
            </div>

            <div className="hidden border-2 border-border bg-card shadow-brutal-lg md:block">
                <DiscoverSearchBar
                    variant="desktop"
                    search={filters.search}
                    onSearchChange={onSearchChange}
                    nearMeButton={(
                        <DiscoverNearMeButton
                            variant="desktop"
                            onClick={onNearMeClick}
                        />
                    )}
                />

                <DiscoverRefinementControls
                    controls={refinementControls}
                />

                <DiscoverActiveFilters
                    activeFilters={activeFilters}
                    onClearFilter={onClearFilter}
                    onClearAll={onClearAll}
                />

                <div className="border-t-brutal border-border bg-violet-light px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-foreground">
                    {count} {count === 1 ? "event" : "events"} in play
                </div>
            </div>
        </section>
    )
}

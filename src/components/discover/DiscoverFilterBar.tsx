import { useState } from "react"
import DiscoverActiveFilters from "@/components/discover/DiscoverActiveFilters"
import DiscoverDesktopSearchBar from "@/components/discover/DiscoverDesktopSearchBar"
import DiscoverMobileSearchDialog from "@/components/discover/DiscoverMobileSearchDialog"
import DiscoverMobileSearchTrigger from "@/components/discover/DiscoverMobileSearchTrigger"
import DiscoverRefinementControls from "@/components/discover/DiscoverRefinementControls"
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
                    categoryOptions={categoryOptions}
                    dateFilterOptions={dateFilterOptions}
                    eventTypeOptions={eventTypeOptions}
                    open={isMobileSearchOpen}
                    search={filters.search}
                    selectedCategoryId={filters.selectedCategoryId}
                    selectedDateFilter={filters.selectedDateFilter}
                    selectedTypeId={filters.selectedTypeId}
                    sort={filters.sort}
                    onCategoryChange={onCategoryChange}
                    onClearAll={onClearAll}
                    onClearFilter={onClearFilter}
                    onDateFilterChange={onDateFilterChange}
                    onNearMeClick={onNearMeClick}
                    onOpenChange={setIsMobileSearchOpen}
                    onSearchChange={onSearchChange}
                    onSortChange={onSortChange}
                    onTypeChange={onTypeChange}
                />
            </div>

            <div className="hidden border-2 border-border bg-card shadow-brutal-lg md:block">
                <DiscoverDesktopSearchBar
                    search={filters.search}
                    onSearchChange={onSearchChange}
                    onNearMeClick={onNearMeClick}
                />

                <DiscoverRefinementControls
                    categoryOptions={categoryOptions}
                    dateFilterOptions={dateFilterOptions}
                    eventTypeOptions={eventTypeOptions}
                    selectedCategoryId={filters.selectedCategoryId}
                    selectedDateFilter={filters.selectedDateFilter}
                    selectedTypeId={filters.selectedTypeId}
                    onCategoryChange={onCategoryChange}
                    onDateFilterChange={onDateFilterChange}
                    onTypeChange={onTypeChange}
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

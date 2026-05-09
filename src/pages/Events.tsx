import { useDeferredValue, useState } from "react"
import DiscoverEventList from "@/components/discover/DiscoverEventList"
import DiscoverFilterBar from "@/components/discover/DiscoverFilterBar"
import DiscoverResultsHeader from "@/components/discover/DiscoverResultsHeader"
import NearMeModal from "@/components/discover/nearMeModal/NearMeModal"
import { useDiscoverCategories, useDiscoverEventTypes } from "@/hooks/event/useDiscoverEventMetadata"
import { useDiscoverEvents } from "@/hooks/event/useDiscoverEvents"
import { useDiscoverFilters } from "@/hooks/event/useDiscoverFilters"

function Events() {
    const [isNearMeOpen, setIsNearMeOpen] = useState(false)
    const { data: categories } = useDiscoverCategories()
    const { data: eventTypes } = useDiscoverEventTypes()
    const {
        activeFilters,
        clearAllFilters,
        clearFilter,
        filters,
        updateCategory,
        updateDateFilter,
        updateSearch,
        updateSort,
        updateType,
    } = useDiscoverFilters({ categories, eventTypes })

    const deferredSearch = useDeferredValue(filters.search)
    const {
        data: events,
        loading,
        error,
    } = useDiscoverEvents({
        limit: 24,
        page: 1,
        search: deferredSearch,
        typeId: filters.selectedTypeId,
        categoryId: filters.selectedCategoryId,
        dateFilter: filters.selectedDateFilter,
        sort: filters.sort,
    })

    const visibleEvents = events

    return (
        <div className="w-full bg-transparent md:overflow-hidden md:border-2 md:border-border md:bg-cream md:shadow-brutal-lg">
            <DiscoverFilterBar
                count={visibleEvents.length}
                filters={filters}
                activeFilters={activeFilters}
                categories={categories}
                eventTypes={eventTypes}
                onSearchChange={updateSearch}
                onTypeChange={updateType}
                onDateFilterChange={updateDateFilter}
                onCategoryChange={updateCategory}
                onSortChange={updateSort}
                onClearFilter={clearFilter}
                onClearAll={clearAllFilters}
                onNearMeClick={() => setIsNearMeOpen(true)}
            />

            <DiscoverResultsHeader
                count={visibleEvents.length}
                sort={filters.sort}
                onSortChange={updateSort}
            />

            <section className="px-2 py-5 md:px-6 md:py-8">
                {loading ? (
                    <div className="grid gap-6 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="h-80 animate-pulse border-2 border-border bg-violet-light/60" />
                        ))}
                    </div>
                ) : null}

                {!loading && error ? (
                    <div className="border-2 border-border bg-coral px-5 py-4 font-semibold text-white">
                        {error}
                    </div>
                ) : null}

                {!loading && !error && visibleEvents.length === 0 ? (
                    <div className="border-2 border-dashed border-border bg-card px-6 py-10 text-center">
                        <h2 className="font-display text-4xl font-extrabold tracking-[-0.04em]">
                            Nothing matches those filters yet.
                        </h2>
                        <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-foreground/70">
                            Try a broader search, reset the date pills, or open the near-me map to explore another location.
                        </p>
                    </div>
                ) : null}

                {!loading && !error ? (
                    <DiscoverEventList
                        events={visibleEvents}
                        snapScrollEnabled={!loading && !error}
                    />
                ) : null}
            </section>

            <NearMeModal
                open={isNearMeOpen}
                onOpenChange={setIsNearMeOpen}
            />
        </div>
    )
}

export default Events

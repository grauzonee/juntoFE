import { startTransition, useDeferredValue, useEffect, useState } from "react"
import DiscoverEventCard from "@/components/discover/DiscoverEventCard"
import DiscoverFilterBar from "@/components/discover/DiscoverFilterBar"
import DiscoverResultsHeader from "@/components/discover/DiscoverResultsHeader"
import NearMeModal from "@/components/discover/NearMeModal"
import {
    getDiscoverCategoryTitles,
    getDiscoverCategoryTitleById,
    getDiscoverTypeTitle,
} from "@/components/discover/discover-utils"
import { fetchDiscoverCategories, fetchDiscoverEvents, fetchDiscoverEventTypes } from "@/requests/discover"
import type {
    DiscoverActiveFilter,
    DiscoverCategoryOption,
    DiscoverDateFilter,
    DiscoverEvent,
    DiscoverEventTypeOption,
    DiscoverFilters,
} from "@/types/discover"

const defaultFilters: DiscoverFilters = {
    search: "",
    selectedTypeId: "all",
    selectedDateFilter: "all",
    selectedCategoryId: "all",
    sort: "soonest",
    view: "grid",
}

const activeDateFilterLabels: Record<Exclude<DiscoverDateFilter, "all">, string> = {
    today: "Today",
    week: "This Week",
    weekend: "This Weekend",
    month: "This Month",
}

function Events() {
    const [filters, setFilters] = useState<DiscoverFilters>(defaultFilters)
    const [events, setEvents] = useState<DiscoverEvent[]>([])
    const [categories, setCategories] = useState<DiscoverCategoryOption[]>([])
    const [eventTypes, setEventTypes] = useState<DiscoverEventTypeOption[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isNearMeOpen, setIsNearMeOpen] = useState(false)

    const deferredSearch = useDeferredValue(filters.search)

    useEffect(() => {
        let ignore = false

        async function loadEventTypes() {
            try {
                const response = await fetchDiscoverEventTypes()
                if (!ignore) {
                    setEventTypes(response)
                }
            } catch {
                if (!ignore) {
                    setEventTypes([])
                }
            }
        }

        loadEventTypes()

        return () => {
            ignore = true
        }
    }, [])

    useEffect(() => {
        let ignore = false

        async function loadCategories() {
            try {
                const response = await fetchDiscoverCategories()
                if (!ignore) {
                    setCategories(response)
                }
            } catch {
                if (!ignore) {
                    setCategories([])
                }
            }
        }

        loadCategories()

        return () => {
            ignore = true
        }
    }, [])

    useEffect(() => {
        let ignore = false

        async function loadEvents() {
            setLoading(true)
            setError(null)

            try {
                const response = await fetchDiscoverEvents({
                    limit: 24,
                    page: 1,
                    search: deferredSearch,
                    typeId: filters.selectedTypeId,
                    categoryId: filters.selectedCategoryId,
                    dateFilter: filters.selectedDateFilter,
                    sort: filters.sort,
                })

                if (!ignore) {
                    startTransition(() => {
                        setEvents(response)
                    })
                }
            } catch (nextError) {
                if (!ignore) {
                    setError(nextError instanceof Error ? nextError.message : "Failed to load events")
                    setEvents([])
                }
            } finally {
                if (!ignore) {
                    setLoading(false)
                }
            }
        }

        loadEvents()

        return () => {
            ignore = true
        }
    }, [deferredSearch, filters.selectedCategoryId, filters.selectedDateFilter, filters.selectedTypeId, filters.sort])

    const visibleEvents = events

    const trimmedSearch = filters.search.trim()
    const hasSelectedCategory = filters.selectedCategoryId !== "all"
    const hasSelectedType = filters.selectedTypeId !== "all"
    const selectedDateFilterLabel = filters.selectedDateFilter === "all"
        ? null
        : activeDateFilterLabels[filters.selectedDateFilter]

    const activeFilters = [
        trimmedSearch
            ? {
                id: "search",
                label: `Search: ${trimmedSearch}`,
            }
            : null,
        hasSelectedCategory
            ? {
                id: "category",
                label: getDiscoverCategoryTitleById(filters.selectedCategoryId, categories),
            }
            : null,
        selectedDateFilterLabel
            ? {
                id: "date",
                label: selectedDateFilterLabel,
            }
            : null,
        hasSelectedType
            ? {
                id: "type",
                label: eventTypes.find((item) => item.id === filters.selectedTypeId)?.title ?? "Type",
            }
            : null,
    ].filter(Boolean) as DiscoverActiveFilter[]

    function updateFilters(nextValue: Partial<DiscoverFilters>) {
        setFilters((currentFilters) => ({ ...currentFilters, ...nextValue }))
    }

    function clearFilter(id: string) {
        if (id === "search") {
            updateFilters({ search: "" })
            return
        }

        if (id === "category") {
            updateFilters({ selectedCategoryId: "all" })
            return
        }

        if (id === "date") {
            updateFilters({ selectedDateFilter: "all" })
            return
        }

        if (id === "type") {
            updateFilters({ selectedTypeId: "all" })
        }
    }

    function clearAllFilters() {
        updateFilters({
            search: "",
            selectedTypeId: "all",
            selectedDateFilter: "all",
            selectedCategoryId: "all",
        })
    }

    return (
        <div className="w-full overflow-hidden border-[3px] border-border bg-cream shadow-[8px_8px_0_0_hsl(var(--border))]">
            <DiscoverFilterBar
                count={visibleEvents.length}
                filters={filters}
                activeFilters={activeFilters}
                categories={categories}
                eventTypes={eventTypes}
                onSearchChange={(value) => updateFilters({ search: value })}
                onTypeChange={(value) => updateFilters({ selectedTypeId: value })}
                onDateFilterChange={(value) => updateFilters({ selectedDateFilter: value })}
                onCategoryChange={(value) => updateFilters({ selectedCategoryId: value })}
                onSortChange={(value) => updateFilters({ sort: value })}
                onViewChange={(value) => updateFilters({ view: value })}
                onClearFilter={clearFilter}
                onClearAll={clearAllFilters}
                onNearMeClick={() => setIsNearMeOpen(true)}
            />

            <DiscoverResultsHeader
                count={visibleEvents.length}
                activeFilterCount={activeFilters.length}
            />

            <section className="px-4 py-6 md:px-6 md:py-8">
                {loading ? (
                    <div className="grid gap-6 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="h-80 animate-pulse border-[3px] border-border bg-violet-light/60" />
                        ))}
                    </div>
                ) : null}

                {!loading && error ? (
                    <div className="border-[3px] border-border bg-coral px-5 py-4 font-semibold text-white">
                        {error}
                    </div>
                ) : null}

                {!loading && !error && visibleEvents.length === 0 ? (
                    <div className="border-[3px] border-dashed border-border bg-card px-6 py-10 text-center">
                        <h2 className="font-display text-4xl font-extrabold tracking-[-0.04em]">
                            Nothing matches those filters yet.
                        </h2>
                        <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-foreground/70">
                            Try a broader search, reset the date pills, or open the near-me map to explore another location.
                        </p>
                    </div>
                ) : null}

                {!loading && !error ? (
                    <div className={filters.view === "grid" ? "grid gap-6 xl:grid-cols-3" : "flex flex-col gap-4"}>
                        {visibleEvents.map((event) => (
                            <DiscoverEventCard
                                key={event._id}
                                event={event}
                                view={filters.view}
                                typeTitle={getDiscoverTypeTitle(event, eventTypes)}
                                categoryTitles={getDiscoverCategoryTitles(event)}
                            />
                        ))}
                    </div>
                ) : null}
            </section>

            <NearMeModal
                open={isNearMeOpen}
                onOpenChange={setIsNearMeOpen}
                eventTypes={eventTypes}
            />
        </div>
    )
}

export default Events

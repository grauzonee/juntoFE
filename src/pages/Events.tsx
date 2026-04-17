import { startTransition, useDeferredValue, useEffect, useRef, useState } from "react"
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
import { testIds } from "@/testIds"

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

const mobileSnapVisibilityThreshold = 0.15

function Events() {
    const [filters, setFilters] = useState<DiscoverFilters>(defaultFilters)
    const [events, setEvents] = useState<DiscoverEvent[]>([])
    const [categories, setCategories] = useState<DiscoverCategoryOption[]>([])
    const [eventTypes, setEventTypes] = useState<DiscoverEventTypeOption[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isNearMeOpen, setIsNearMeOpen] = useState(false)
    const eventCardRefs = useRef<Map<string, HTMLDivElement>>(new Map())
    const lastScrollYRef = useRef(0)
    const scrollDirectionRef = useRef<"up" | "down">("down")

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

    useEffect(() => {
        if (typeof window === "undefined") {
            return
        }

        const mobileMediaQuery = window.matchMedia("(max-width: 767px)")

        if (!mobileMediaQuery.matches || loading || error || visibleEvents.length === 0) {
            return
        }

        let scrollTimeout: number | undefined
        let isSnapping = false
        let hasUserScrollIntent = false

        function getStickyOffset() {
            const filterBar = document.querySelector<HTMLElement>("[data-discover-filter-bar]")
            return filterBar ? filterBar.getBoundingClientRect().height + 8 : 0
        }

        function snapToVisibleCard() {
            if (isSnapping) {
                return
            }

            const scrollTop = window.scrollY
            const stickyOffset = getStickyOffset()
            const cardElements = visibleEvents
                .map((event) => eventCardRefs.current.get(event._id))
                .filter((element): element is HTMLDivElement => Boolean(element))

            if (cardElements.length === 0) {
                return
            }

            const visibleCards = cardElements
                .map((card, index) => {
                    const rect = card.getBoundingClientRect()
                    const absoluteTop = rect.top + scrollTop
                    const visibleTop = Math.max(rect.top, stickyOffset)
                    const visibleBottom = Math.min(rect.bottom, window.innerHeight)
                    const visibleHeight = Math.max(0, visibleBottom - visibleTop)
                    const visibleRatio = rect.height > 0 ? visibleHeight / rect.height : 0
                    const titleElement = card.querySelector<HTMLElement>("[data-discover-event-title]")
                    const titleRect = titleElement?.getBoundingClientRect()
                    const titleVisible = titleRect
                        ? titleRect.bottom > stickyOffset && titleRect.top < window.innerHeight
                        : false

                    return {
                        absoluteTop,
                        index,
                        visibleRatio,
                        titleVisible,
                    }
                })
                .filter((card) => card.visibleRatio >= mobileSnapVisibilityThreshold)

            if (visibleCards.length === 0) {
                return
            }

            const downwardCandidates = visibleCards.filter(
                (card) => card.titleVisible && card.absoluteTop > scrollTop + 8,
            )
            const targetCard = scrollDirectionRef.current === "up"
                ? visibleCards[0]
                : downwardCandidates[downwardCandidates.length - 1]

            if (!targetCard) {
                return
            }

            if (scrollDirectionRef.current === "up" && targetCard.index === 0) {
                return
            }

            const targetTop = Math.max(0, targetCard.absoluteTop - stickyOffset)

            if (Math.abs(targetTop - scrollTop) < 12) {
                return
            }

            isSnapping = true
            window.scrollTo({
                top: targetTop,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
            })

            window.setTimeout(() => {
                isSnapping = false
            }, 220)
        }

        function handleScroll() {
            if (isSnapping) {
                return
            }

            const nextScrollY = window.scrollY

            if (nextScrollY > lastScrollYRef.current) {
                scrollDirectionRef.current = "down"
            } else if (nextScrollY < lastScrollYRef.current) {
                scrollDirectionRef.current = "up"
            }

            lastScrollYRef.current = nextScrollY

            if (!hasUserScrollIntent) {
                return
            }

            if (scrollTimeout) {
                window.clearTimeout(scrollTimeout)
            }

            // Wait until user-driven scrolling settles, then snap once.
            scrollTimeout = window.setTimeout(() => {
                hasUserScrollIntent = false
                snapToVisibleCard()
            }, 120)
        }

        function markUserScrollIntent() {
            hasUserScrollIntent = true
        }

        lastScrollYRef.current = window.scrollY
        window.addEventListener("touchstart", markUserScrollIntent, { passive: true })
        window.addEventListener("wheel", markUserScrollIntent, { passive: true })
        window.addEventListener("scroll", handleScroll, { passive: true })

        return () => {
            if (scrollTimeout) {
                window.clearTimeout(scrollTimeout)
            }

            window.removeEventListener("touchstart", markUserScrollIntent)
            window.removeEventListener("wheel", markUserScrollIntent)
            window.removeEventListener("scroll", handleScroll)
        }
    }, [error, loading, visibleEvents])

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
        <div className="w-full overflow-hidden bg-transparent md:border-brutal md:border-border md:bg-cream md:shadow-brutal-lg">
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

            <section className="px-2 py-5 md:px-6 md:py-8">
                {loading ? (
                    <div className="grid gap-6 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="h-80 animate-pulse border-brutal border-border bg-violet-light/60" />
                        ))}
                    </div>
                ) : null}

                {!loading && error ? (
                    <div className="border-brutal border-border bg-coral px-5 py-4 font-semibold text-white">
                        {error}
                    </div>
                ) : null}

                {!loading && !error && visibleEvents.length === 0 ? (
                    <div className="border-brutal border-dashed border-border bg-card px-6 py-10 text-center">
                        <h2 className="font-display text-4xl font-extrabold tracking-[-0.04em]">
                            Nothing matches those filters yet.
                        </h2>
                        <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-foreground/70">
                            Try a broader search, reset the date pills, or open the near-me map to explore another location.
                        </p>
                    </div>
                ) : null}

                {!loading && !error ? (
                    <div
                        data-testid={testIds.discover.resultsList}
                        className={filters.view === "grid" ? "grid gap-6 xl:grid-cols-3" : "flex flex-col gap-4"}
                    >
                        {visibleEvents.map((event) => (
                            <div
                                key={event._id}
                                ref={(element) => {
                                    if (element) {
                                        eventCardRefs.current.set(event._id, element)
                                        return
                                    }

                                    eventCardRefs.current.delete(event._id)
                                }}
                            >
                                <DiscoverEventCard
                                    event={event}
                                    view={filters.view}
                                    typeTitle={getDiscoverTypeTitle(event)}
                                    categoryTitles={getDiscoverCategoryTitles(event)}
                                />
                            </div>
                        ))}
                    </div>
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

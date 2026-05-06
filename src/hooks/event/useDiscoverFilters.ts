import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import { getDiscoverCategoryTitleById } from "@/components/discover/discover-utils"
import type {
    DiscoverActiveFilter,
    DiscoverCategoryOption,
    DiscoverDateFilter,
    DiscoverEventTypeOption,
    DiscoverFilters,
    DiscoverSortOption,
} from "@/types/discover"

type UseDiscoverFiltersParams = {
    categories: DiscoverCategoryOption[]
    eventTypes: DiscoverEventTypeOption[]
}

const defaultDiscoverFilters: DiscoverFilters = {
    search: "",
    selectedTypeId: "all",
    selectedDateFilter: "all",
    selectedCategoryId: "all",
    sort: "soonest",
}

const activeDateFilterLabels: Record<Exclude<DiscoverDateFilter, "all">, string> = {
    today: "Today",
    week: "This Week",
    weekend: "This Weekend",
    month: "This Month",
}

export function useDiscoverFilters({
    categories,
    eventTypes,
}: Readonly<UseDiscoverFiltersParams>) {
    const [searchParams, setSearchParams] = useSearchParams()
    const [filters, setFilters] = useState<DiscoverFilters>({
        ...defaultDiscoverFilters,
        search: searchParams.get("search") ?? defaultDiscoverFilters.search,
    })

    useEffect(() => {
        const nextSearch = searchParams.get("search") ?? ""

        setFilters((currentFilters) => {
            if (currentFilters.search === nextSearch) {
                return currentFilters
            }

            return { ...currentFilters, search: nextSearch }
        })
    }, [searchParams])

    function updateFilters(nextValue: Partial<DiscoverFilters>) {
        setFilters((currentFilters) => ({ ...currentFilters, ...nextValue }))
    }

    function updateSearch(value: string) {
        updateFilters({ search: value })

        const nextParams = new URLSearchParams(searchParams)

        if (value.trim()) {
            nextParams.set("search", value)
        } else {
            nextParams.delete("search")
        }

        setSearchParams(nextParams, { replace: true })
    }

    function clearFilter(id: string) {
        if (id === "search") {
            updateSearch("")
            return
        }

        if (id === "category") {
            updateCategory("all")
            return
        }

        if (id === "date") {
            updateDateFilter("all")
            return
        }

        if (id === "type") {
            updateType("all")
        }
    }

    function clearAllFilters() {
        const nextParams = new URLSearchParams(searchParams)
        nextParams.delete("search")
        setSearchParams(nextParams, { replace: true })

        updateFilters({
            search: "",
            selectedTypeId: "all",
            selectedDateFilter: "all",
            selectedCategoryId: "all",
        })
    }

    function updateCategory(value: string) {
        updateFilters({ selectedCategoryId: value })
    }

    function updateDateFilter(value: DiscoverDateFilter) {
        updateFilters({ selectedDateFilter: value })
    }

    function updateSort(value: DiscoverSortOption) {
        updateFilters({ sort: value })
    }

    function updateType(value: string) {
        updateFilters({ selectedTypeId: value })
    }

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

    return {
        activeFilters,
        clearAllFilters,
        clearFilter,
        filters,
        updateCategory,
        updateDateFilter,
        updateSearch,
        updateSort,
        updateType,
    }
}

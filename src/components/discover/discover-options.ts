import type { DiscoverSelectOption } from "@/components/discover/DiscoverSelect"
import type { DiscoverSortOption } from "@/types/discover"

export const discoverSortOptions = [
    { value: "soonest", label: "Sort: Soonest" },
    { value: "latest", label: "Sort: Latest" },
] satisfies ReadonlyArray<DiscoverSelectOption<DiscoverSortOption>>

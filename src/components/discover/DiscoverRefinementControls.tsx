import DiscoverSelect, { type DiscoverSelectOption } from "@/components/discover/DiscoverSelect"
import { cn } from "@/lib/utils"
import type { DiscoverDateFilter } from "@/types/discover"

type DiscoverRefinementControlsProps = {
    categoryOptions: DiscoverSelectOption[]
    dateFilterOptions: DiscoverSelectOption<DiscoverDateFilter>[]
    eventTypeOptions: DiscoverSelectOption[]
    selectedCategoryId: string
    selectedDateFilter: DiscoverDateFilter
    selectedTypeId: string
    onCategoryChange: (value: string) => void
    onDateFilterChange: (value: DiscoverDateFilter) => void
    onTypeChange: (value: string) => void
    mobile?: boolean
}

export default function DiscoverRefinementControls({
    categoryOptions,
    dateFilterOptions,
    eventTypeOptions,
    selectedCategoryId,
    selectedDateFilter,
    selectedTypeId,
    onCategoryChange,
    onDateFilterChange,
    onTypeChange,
    mobile = false,
}: Readonly<DiscoverRefinementControlsProps>) {
    return (
        <div
            className={cn(
                "grid gap-4 px-4 py-4 md:grid-cols-3 md:py-5",
                mobile ? "border-t border-border/15 px-5 py-5 md:border-t-0" : "border-t-[3px] border-border",
            )}
        >
            <div>
                <DiscoverSelect
                    label="Category"
                    value={selectedCategoryId}
                    options={categoryOptions}
                    size="compact"
                    tone="violet"
                    onValueChange={onCategoryChange}
                />
            </div>

            <div>
                <DiscoverSelect
                    label="When"
                    value={selectedDateFilter}
                    options={dateFilterOptions}
                    size="compact"
                    tone="yellow"
                    onValueChange={onDateFilterChange}
                />
            </div>

            <div>
                <DiscoverSelect
                    label="Type"
                    value={selectedTypeId}
                    options={eventTypeOptions}
                    size="compact"
                    onValueChange={onTypeChange}
                />
            </div>
        </div>
    )
}

import { useState, type ReactNode } from "react"
import BrutalButton from "@/components/landing/BrutalButton"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import type {
    DiscoverActiveFilter,
    DiscoverCategoryOption,
    DiscoverDateFilter,
    DiscoverEventTypeOption,
    DiscoverFilters,
    DiscoverSortOption,
    DiscoverViewMode,
} from "@/types/discover"
import { ChevronDown, ChevronUp, Crosshair, LayoutGrid, List, Search, X } from "lucide-react"

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
    onViewChange: (value: DiscoverViewMode) => void
    onClearFilter: (id: string) => void
    onClearAll: () => void
    onNearMeClick: () => void
}

type FilterGroupProps = {
    label: string
    tone?: "cream" | "yellow" | "violet" | "mint"
    children: ReactNode
}

const dateFilters: { value: DiscoverDateFilter; label: string }[] = [
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "weekend", label: "This Weekend" },
    { value: "month", label: "This Month" },
]

const controlChipClassName =
    "border-2 border-border px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] transition duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5"

const filterGroupToneClassNames: Record<NonNullable<FilterGroupProps["tone"]>, string> = {
    cream: "bg-cream",
    yellow: "bg-yellow",
    violet: "bg-violet-light",
    mint: "bg-mint-light",
}

function FilterGroup({ label, tone = "cream", children }: FilterGroupProps) {
    return (
        <section className="space-y-3">
            <span
                className={cn(
                    "inline-flex border-2 border-border px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em]",
                    filterGroupToneClassNames[tone],
                )}
            >
                {label}
            </span>
            <div className="flex flex-wrap gap-2">{children}</div>
        </section>
    )
}

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
    onViewChange,
    onClearFilter,
    onClearAll,
    onNearMeClick,
}: DiscoverFilterBarProps) {
    const [isRefineOpen, setIsRefineOpen] = useState(false)

    function renderSortSelect(className?: string) {
        return (
            <Select value={filters.sort} onValueChange={(value) => onSortChange(value as DiscoverSortOption)}>
                <SelectTrigger
                    className={cn(
                        "h-11 rounded-none border-[3px] border-border bg-card px-4 text-sm font-semibold text-foreground shadow-none",
                        className,
                    )}
                >
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="rounded-none border-[3px] border-border bg-card text-foreground">
                    <SelectItem value="soonest">Sort: Date (soonest)</SelectItem>
                    <SelectItem value="latest">Sort: Date (latest)</SelectItem>
                </SelectContent>
            </Select>
        )
    }

    function renderViewToggle(className?: string) {
        return (
            <div className={cn("inline-flex border-[3px] border-border", className)}>
                <button
                    type="button"
                    onClick={() => onViewChange("grid")}
                    className={cn(
                        "flex flex-1 items-center justify-center gap-2 border-r-[3px] border-border px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] transition lg:flex-none",
                        filters.view === "grid" ? "bg-mint-light" : "bg-card hover:bg-cream",
                    )}
                >
                    <LayoutGrid className="size-4" />
                    Grid
                </button>
                <button
                    type="button"
                    onClick={() => onViewChange("list")}
                    className={cn(
                        "flex flex-1 items-center justify-center gap-2 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] transition lg:flex-none",
                        filters.view === "list" ? "bg-mint-light" : "bg-card hover:bg-cream",
                    )}
                >
                    <List className="size-4" />
                    List
                </button>
            </div>
        )
    }

    function renderRefinementBody() {
        return (
            <>
                <div className="grid gap-5 px-4 py-4 md:hidden">
                    <FilterGroup label="Sort" tone="mint">
                        <div className="w-full">{renderSortSelect()}</div>
                    </FilterGroup>
                    <FilterGroup label="View" tone="mint">
                        {renderViewToggle("w-full")}
                    </FilterGroup>
                </div>

                <div className="grid gap-5 border-t-[3px] border-border px-4 py-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1.45fr)_minmax(0,1fr)] md:gap-6 md:py-5">
                    <FilterGroup label="Category" tone="violet">
                        {[{ id: "all", title: "All" }, ...categories].map((category) => (
                            <button
                                key={category.id}
                                type="button"
                                onClick={() => onCategoryChange(category.id)}
                                className={cn(
                                    controlChipClassName,
                                    filters.selectedCategoryId === category.id
                                        ? "bg-violet text-card"
                                        : "bg-card hover:bg-violet-light",
                                )}
                            >
                                {category.title}
                            </button>
                        ))}
                    </FilterGroup>

                    <FilterGroup label="When" tone="yellow">
                        <button
                            type="button"
                            onClick={() => onDateFilterChange("all")}
                            className={cn(
                                controlChipClassName,
                                filters.selectedDateFilter === "all" ? "bg-yellow" : "bg-card hover:bg-yellow",
                            )}
                        >
                            Anytime
                        </button>
                        {dateFilters.map((filter) => (
                            <button
                                key={filter.value}
                                type="button"
                                onClick={() => onDateFilterChange(filter.value)}
                                className={cn(
                                    controlChipClassName,
                                    filters.selectedDateFilter === filter.value
                                        ? "bg-yellow"
                                        : "bg-card hover:bg-yellow",
                                )}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </FilterGroup>

                    <FilterGroup label="Type" tone="cream">
                        <div className="w-full">
                            <Select value={filters.selectedTypeId} onValueChange={onTypeChange}>
                                <SelectTrigger className="h-11 rounded-none border-[3px] border-border bg-card px-4 text-sm font-semibold text-foreground shadow-none">
                                    <SelectValue placeholder="All Types" />
                                </SelectTrigger>
                                <SelectContent className="rounded-none border-[3px] border-border bg-card text-foreground">
                                    <SelectItem value="all">All Types</SelectItem>
                                    {eventTypes.map((type) => (
                                        <SelectItem key={type.id} value={type.id}>
                                            {type.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </FilterGroup>
                </div>

                {activeFilters.length > 0 ? (
                    <div className="flex flex-col gap-3 border-t-[3px] border-border bg-cream px-4 py-4 md:flex-row md:items-center md:justify-between">
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
                ) : null}
            </>
        )
    }

    return (
        <section className="sticky top-0 z-20 border-b-[3px] border-border bg-cream/95 px-4 py-5 backdrop-blur md:px-6">
            <Collapsible
                open={isRefineOpen}
                onOpenChange={setIsRefineOpen}
                className="border-[3px] border-border bg-card shadow-[8px_8px_0_0_hsl(var(--border))]"
            >
                <div className="flex flex-col gap-3 bg-cream px-4 py-4 xl:flex-row xl:items-center">
                    <div className="relative flex-1">
                        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-foreground/55" />
                        <Input
                            value={filters.search}
                            onChange={(event) => onSearchChange(event.target.value)}
                            placeholder="Search by title, place, or vibe"
                            className="h-12 rounded-none border-[3px] border-border bg-card pl-11 pr-4 text-base shadow-none"
                        />
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row xl:flex-none">
                        <BrutalButton tone="mint" className="gap-2 px-6 sm:flex-1 xl:flex-none" onClick={onNearMeClick}>
                            <Crosshair className="size-4" />
                            Near me
                        </BrutalButton>
                        <div className="hidden md:block md:w-56">{renderSortSelect()}</div>
                        <div className="hidden md:block">{renderViewToggle()}</div>
                        <CollapsibleTrigger asChild>
                            <button
                                type="button"
                                className="inline-flex items-center justify-center gap-2 border-[3px] border-border bg-card px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] transition hover:bg-violet-light md:hidden"
                            >
                                <span>Refine{activeFilters.length > 0 ? ` (${activeFilters.length})` : ""}</span>
                                {isRefineOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                            </button>
                        </CollapsibleTrigger>
                    </div>
                </div>

                <div className="hidden md:block">
                    {renderRefinementBody()}
                </div>

                <CollapsibleContent className="border-t-[3px] border-border md:hidden data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=open]:slide-in-from-top-2">
                    {renderRefinementBody()}
                </CollapsibleContent>

                <div className="border-t-[3px] border-border bg-violet-light px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-foreground">
                    {count} {count === 1 ? "event" : "events"} in play
                </div>
            </Collapsible>
        </section>
    )
}

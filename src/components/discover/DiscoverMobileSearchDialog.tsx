import DiscoverActiveFilters from "@/components/discover/DiscoverActiveFilters"
import DiscoverRefinementControls from "@/components/discover/DiscoverRefinementControls"
import DiscoverSelect, { type DiscoverSelectOption } from "@/components/discover/DiscoverSelect"
import { discoverSortOptions } from "@/components/discover/discover-options"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import BrutalButton from "@/components/ui/brutal-button"
import { Input } from "@/components/ui/input"
import { testIds } from "@/testIds"
import type {
    DiscoverActiveFilter,
    DiscoverDateFilter,
    DiscoverSortOption,
} from "@/types/discover"
import { Crosshair, MapPin, Search } from "lucide-react"

type DiscoverMobileSearchDialogProps = {
    activeFilters: DiscoverActiveFilter[]
    categoryOptions: DiscoverSelectOption[]
    dateFilterOptions: DiscoverSelectOption<DiscoverDateFilter>[]
    eventTypeOptions: DiscoverSelectOption[]
    open: boolean
    search: string
    selectedCategoryId: string
    selectedDateFilter: DiscoverDateFilter
    selectedTypeId: string
    sort: DiscoverSortOption
    onCategoryChange: (value: string) => void
    onClearAll: () => void
    onClearFilter: (id: string) => void
    onDateFilterChange: (value: DiscoverDateFilter) => void
    onNearMeClick: () => void
    onOpenChange: (open: boolean) => void
    onSearchChange: (value: string) => void
    onSortChange: (value: DiscoverSortOption) => void
    onTypeChange: (value: string) => void
}

export default function DiscoverMobileSearchDialog({
    activeFilters,
    categoryOptions,
    dateFilterOptions,
    eventTypeOptions,
    open,
    search,
    selectedCategoryId,
    selectedDateFilter,
    selectedTypeId,
    sort,
    onCategoryChange,
    onClearAll,
    onClearFilter,
    onDateFilterChange,
    onNearMeClick,
    onOpenChange,
    onSearchChange,
    onSortChange,
    onTypeChange,
}: Readonly<DiscoverMobileSearchDialogProps>) {
    function handleNearMeClick() {
        onOpenChange(false)
        globalThis.setTimeout(() => {
            onNearMeClick()
        }, 0)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                data-testid={testIds.discover.mobileSearchDialog}
                className="left-0 top-0 h-[100svh] w-screen max-h-[100svh] max-w-none translate-x-0 translate-y-0 gap-0 overflow-hidden rounded-none border-0 bg-card p-0 shadow-none [&>button]:right-4 [&>button]:top-4"
            >
                <DialogHeader className="border-b-2 border-border bg-card px-5 pb-4 pt-6 text-left">
                    <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-foreground/20" />
                    <DialogTitle className="font-heading text-xl font-bold">Search</DialogTitle>
                    <DialogDescription className="text-sm text-foreground/60">
                        Search events first, then refine the list without leaving mobile view.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto bg-card">
                    <div className="space-y-4 px-5 py-5">
                        <div className="relative">
                            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-foreground/55" />
                            <Input
                                value={search}
                                onChange={(event) => onSearchChange(event.target.value)}
                                placeholder="Search events..."
                                className="h-12 rounded-[1rem] border-brutal border-border bg-card pl-11 pr-4 text-base shadow-none"
                                autoFocus
                            />
                        </div>

                        <button
                            type="button"
                            data-testid={testIds.discover.mobileNearbyButton}
                            onClick={handleNearMeClick}
                            className="flex w-full items-center gap-3 rounded-[1rem] border border-border/15 bg-card px-4 py-3 text-left transition hover:bg-cream"
                        >
                            <div className="inline-flex size-9 items-center justify-center rounded-full border-2 border-border bg-cream">
                                <MapPin className="size-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-base font-semibold text-foreground">Search nearby</p>
                                <p className="text-sm text-foreground/60">Open map and geosearch options</p>
                            </div>
                            <Crosshair className="size-4 shrink-0 text-foreground/60" />
                        </button>
                    </div>

                    <div className="grid gap-5 px-5 py-5">
                        <section className="space-y-3">
                            <span className="inline-flex border-2 border-border bg-mint-light px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em]">
                                Sort
                            </span>
                            <div className="w-full">
                                <DiscoverSelect
                                    label="Sort results"
                                    value={sort}
                                    options={discoverSortOptions}
                                    size="compact"
                                    variant="plain"
                                    onValueChange={onSortChange}
                                />
                            </div>
                        </section>
                    </div>

                    <DiscoverRefinementControls
                        categoryOptions={categoryOptions}
                        dateFilterOptions={dateFilterOptions}
                        eventTypeOptions={eventTypeOptions}
                        selectedCategoryId={selectedCategoryId}
                        selectedDateFilter={selectedDateFilter}
                        selectedTypeId={selectedTypeId}
                        mobile
                        onCategoryChange={onCategoryChange}
                        onDateFilterChange={onDateFilterChange}
                        onTypeChange={onTypeChange}
                    />

                    <DiscoverActiveFilters
                        activeFilters={activeFilters}
                        mobile
                        onClearFilter={onClearFilter}
                        onClearAll={onClearAll}
                    />
                </div>

                <div className="border-t-2 border-border bg-card px-5 py-4">
                    <BrutalButton
                        tone="cream"
                        className="w-full justify-center"
                        onClick={() => onOpenChange(false)}
                    >
                        Done
                    </BrutalButton>
                </div>
            </DialogContent>
        </Dialog>
    )
}

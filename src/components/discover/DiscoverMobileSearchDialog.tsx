import DiscoverActiveFilters from "@/components/discover/DiscoverActiveFilters"
import DiscoverNearMeButton from "@/components/discover/DiscoverNearMeButton"
import DiscoverRefinementControls, {
    type DiscoverRefinementControlGroups,
} from "@/components/discover/DiscoverRefinementControls"
import DiscoverSearchBar from "@/components/discover/DiscoverSearchBar"
import DiscoverSelect from "@/components/discover/DiscoverSelect"
import { discoverSortOptions } from "@/components/discover/discover-options"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import BrutalButton from "@/components/ui/brutal-button"
import { responsiveVariants } from "@/helpers/responsive"
import { testIds } from "@/testIds"
import type {
    DiscoverActiveFilter,
    DiscoverSortOption,
} from "@/types/discover"

type DiscoverMobileSearchDialogProps = {
    activeFilters: DiscoverActiveFilter[]
    refinementControls: DiscoverRefinementControlGroups
    open: boolean
    search: string
    sort: DiscoverSortOption
    onClearAll: () => void
    onClearFilter: (id: string) => void
    onNearMeClick: () => void
    onOpenChange: (open: boolean) => void
    onSearchChange: (value: string) => void
    onSortChange: (value: DiscoverSortOption) => void
}

export default function DiscoverMobileSearchDialog({
    activeFilters,
    refinementControls,
    open,
    search,
    sort,
    onClearAll,
    onClearFilter,
    onNearMeClick,
    onOpenChange,
    onSearchChange,
    onSortChange,
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
                aria-describedby={undefined}
                className="left-0 top-0 h-[100svh] w-screen max-h-[100svh] max-w-none translate-x-0 translate-y-0 gap-0 overflow-hidden rounded-none border-0 bg-cream p-0 shadow-none [&>button]:right-4 [&>button]:top-4"
            >
                <DialogHeader className="border-b-2 border-border bg-cream px-5 pb-4 pt-6 text-left">
                    <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-foreground/20" />
                    <DialogTitle className="font-heading text-xl font-bold">Search</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto bg-cream">
                    <DiscoverSearchBar
                        variant={responsiveVariants.mobile}
                        search={search}
                        onSearchChange={onSearchChange}
                        nearMeButton={(
                            <DiscoverNearMeButton
                                variant={responsiveVariants.mobile}
                                onClick={handleNearMeClick}
                            />
                        )}
                        autoFocus
                    />

                    <div className="grid gap-5 px-5 py-5">
                        <DiscoverSelect
                            label="Sort results"
                            value={sort}
                            options={discoverSortOptions}
                            size="compact"
                            variant="plain"
                            onValueChange={onSortChange}
                        />
                    </div>

                    <DiscoverRefinementControls
                        controls={refinementControls}
                        variant={responsiveVariants.mobile}
                    />

                    <DiscoverActiveFilters
                        activeFilters={activeFilters}
                        variant={responsiveVariants.mobile}
                        onClearFilter={onClearFilter}
                        onClearAll={onClearAll}
                    />
                </div>

                <div className="border-t-2 border-border bg-cream px-5 py-4">
                    <BrutalButton
                        tone="mint"
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

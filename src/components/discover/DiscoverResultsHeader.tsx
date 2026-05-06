import DiscoverSelect from "@/components/discover/DiscoverSelect"
import { discoverSortOptions } from "@/components/discover/discover-options"
import { testIds } from "@/testIds"
import type { DiscoverSortOption } from "@/types/discover"

type DiscoverResultsHeaderProps = {
    count: number
    sort: DiscoverSortOption
    onSortChange: (value: DiscoverSortOption) => void
}

export default function DiscoverResultsHeader({
    count,
    sort,
    onSortChange,
}: Readonly<DiscoverResultsHeaderProps>) {
    return (
        <div
            data-testid={testIds.discover.resultsHeader}
            className="hidden border-b-[3px] border-border bg-card px-4 py-4 md:flex md:items-start md:justify-between md:gap-6 md:px-6 md:py-5"
        >
            <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/55">
                    Discover results
                </p>
                <h2
                    data-testid={testIds.discover.resultsCount}
                    className="mt-1 font-display text-[2rem] font-extrabold leading-none tracking-[-0.05em] md:text-[2.3rem]"
                >
                    {count} {count === 1 ? "event" : "events"}
                </h2>
            </div>

            <div className="flex shrink-0 justify-end">
                <DiscoverSelect
                    label="Sort results"
                    value={sort}
                    options={discoverSortOptions}
                    size="compact"
                    variant="plain"
                    className="w-48"
                    onValueChange={onSortChange}
                />
            </div>
        </div>
    )
}

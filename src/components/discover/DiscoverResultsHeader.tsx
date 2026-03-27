type DiscoverResultsHeaderProps = {
    count: number
    activeFilterCount: number
}

export default function DiscoverResultsHeader({
    count,
    activeFilterCount,
}: DiscoverResultsHeaderProps) {
    return (
        <div className="flex flex-col gap-2 border-b-[3px] border-border bg-card px-4 py-4 md:px-6 md:py-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/55">
                    Discover results
                </p>
                <h2 className="mt-1 font-display text-[2rem] font-extrabold leading-none tracking-[-0.05em] md:text-[2.3rem]">
                    {count} {count === 1 ? "event" : "events"}
                </h2>
            </div>

            <p className="max-w-md text-sm font-semibold leading-6 text-foreground/70">
                {activeFilterCount > 0
                    ? `${activeFilterCount} ${activeFilterCount === 1 ? "filter is" : "filters are"} shaping this list right now.`
                    : "Use the workbench above to narrow the list by vibe, timing, or event type."}
            </p>
        </div>
    )
}

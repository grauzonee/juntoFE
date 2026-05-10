import DiscoverSelect, { type DiscoverSelectOption } from "@/components/discover/DiscoverSelect"
import {
    defaultResponsiveVariant,
    isMobile,
    type ResponsiveVariant,
} from "@/helpers/responsive"
import { cn } from "@/lib/utils"
import type { DiscoverDateFilter } from "@/types/discover"

export type DiscoverRefinementControl<Value extends string = string> = {
    value: Value
    options: ReadonlyArray<DiscoverSelectOption<Value>>
    onChange: (value: Value) => void
}

export type DiscoverRefinementControlGroups = {
    category: DiscoverRefinementControl
    dateFilter: DiscoverRefinementControl<DiscoverDateFilter>
    eventType: DiscoverRefinementControl
}

type DiscoverRefinementControlsProps = {
    controls: DiscoverRefinementControlGroups
    variant?: ResponsiveVariant
}

export default function DiscoverRefinementControls({
    controls,
    variant = defaultResponsiveVariant,
}: Readonly<DiscoverRefinementControlsProps>) {
    const mobile = isMobile(variant)

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
                    value={controls.category.value}
                    options={controls.category.options}
                    size="compact"
                    tone="violet"
                    onValueChange={controls.category.onChange}
                />
            </div>

            <div>
                <DiscoverSelect
                    label="When"
                    value={controls.dateFilter.value}
                    options={controls.dateFilter.options}
                    size="compact"
                    tone="yellow"
                    onValueChange={controls.dateFilter.onChange}
                />
            </div>

            <div>
                <DiscoverSelect
                    label="Type"
                    value={controls.eventType.value}
                    options={controls.eventType.options}
                    size="compact"
                    onValueChange={controls.eventType.onChange}
                />
            </div>
        </div>
    )
}

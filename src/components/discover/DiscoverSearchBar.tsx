import type { ReactNode } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

type DiscoverSearchBarVariant = "desktop" | "mobile"

type DiscoverSearchBarProps = {
    search: string
    onSearchChange: (value: string) => void
    autoFocus?: boolean
    nearMeButton?: ReactNode
    variant?: DiscoverSearchBarVariant
}

const searchBarClassNames: Record<DiscoverSearchBarVariant, string> = {
    desktop: "flex items-center gap-3 bg-cream px-4 py-4",
    mobile: "space-y-4 px-5 py-5",
}

const searchInputClassNames: Record<DiscoverSearchBarVariant, string> = {
    desktop: "h-12 rounded-none border-brutal border-border bg-card pl-11 pr-4 text-base font-semibold shadow-brutal-sm",
    mobile: "h-12 rounded-[1rem] border-brutal border-border bg-card pl-11 pr-4 text-base shadow-none",
}

const searchPlaceholder: Record<DiscoverSearchBarVariant, string> = {
    desktop: "Search by title, place, or vibe",
    mobile: "Search events...",
}

export default function DiscoverSearchBar({
    search,
    onSearchChange,
    autoFocus = false,
    nearMeButton,
    variant = "desktop",
}: Readonly<DiscoverSearchBarProps>) {
    return (
        <div className={searchBarClassNames[variant]}>
            <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-foreground/55" />
                <Input
                    value={search}
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder={searchPlaceholder[variant]}
                    className={searchInputClassNames[variant]}
                    autoFocus={autoFocus}
                />
            </div>

            {nearMeButton}
        </div>
    )
}

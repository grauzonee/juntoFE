import BrutalButton from "@/components/ui/brutal-button"
import { Input } from "@/components/ui/input"
import { Crosshair, Search } from "lucide-react"

type DiscoverDesktopSearchBarProps = {
    search: string
    onNearMeClick: () => void
    onSearchChange: (value: string) => void
}

export default function DiscoverDesktopSearchBar({
    search,
    onNearMeClick,
    onSearchChange,
}: Readonly<DiscoverDesktopSearchBarProps>) {
    return (
        <div className="flex items-center gap-3 bg-cream px-4 py-4">
            <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-foreground/55" />
                <Input
                    value={search}
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder="Search by title, place, or vibe"
                    className="h-12 rounded-none border-brutal border-border bg-card pl-11 pr-4 text-base font-semibold shadow-brutal-sm"
                />
            </div>

            <BrutalButton
                tone="mint"
                className="h-12 min-h-12 shrink-0 gap-2 px-4 py-2 shadow-brutal-sm hover:shadow-brutal"
                onClick={onNearMeClick}
            >
                <Crosshair className="size-4" />
                Near me
            </BrutalButton>
        </div>
    )
}

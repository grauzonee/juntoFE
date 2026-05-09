import BrutalButton from "@/components/ui/brutal-button"
import { testIds } from "@/testIds"
import { Crosshair, MapPin } from "lucide-react"

type DiscoverNearMeButtonProps = {
    variant: "desktop" | "mobile"
    onClick: () => void
}

export default function DiscoverNearMeButton({
    variant,
    onClick,
}: Readonly<DiscoverNearMeButtonProps>) {
    if (variant === "desktop") {
        return (
            <BrutalButton
                tone="mint"
                className="h-12 min-h-12 shrink-0 gap-2 px-4 py-2 shadow-brutal-sm hover:shadow-brutal"
                onClick={onClick}
            >
                <Crosshair className="size-4" />
                Near me
            </BrutalButton>
        )
    }

    return (
        <button
            type="button"
            data-testid={testIds.discover.mobileNearbyButton}
            onClick={onClick}
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
    )
}

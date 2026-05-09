import BrutalButton from "@/components/ui/brutal-button"
import { Input } from "@/components/ui/input"
import NearMeLocationSearch from "@/components/discover/nearMeModal/NearMeLocationSearch"
import { testIds } from "@/testIds"
import type { DiscoverLocation } from "@/types/discover"
import { Crosshair, LoaderCircle } from "lucide-react"
import { useId } from "react"

type NearMeModalFormProps = {
    geoLoading: boolean
    radius: number
    selectedLocation?: DiscoverLocation
    onLocationChange: (value: DiscoverLocation) => void
    onRadiusChange: (value: number) => void
    onUseMyLocation: () => void
}

export default function NearMeModalForm({
    geoLoading,
    radius,
    selectedLocation,
    onLocationChange,
    onRadiusChange,
    onUseMyLocation,
}: Readonly<NearMeModalFormProps>) {
    const radiusInputId = useId()

    function handleRadiusChange(value: string) {
        onRadiusChange(Math.min(15, Math.max(1, Number(value) || 1)))
    }

    return (
        <>
            <div>
                <p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-violet">
                    Nearby events
                </p>
                <h3 className="font-display text-[2.2rem] font-extrabold leading-[0.95] tracking-[-0.06em] lg:text-4xl">
                    Find what is happening around you.
                </h3>
                <p className="mt-3 text-sm leading-6 text-foreground/70">
                    Use your current location or search for another place to preview events on the map.
                </p>
            </div>

            <NearMeLocationSearch
                value={selectedLocation}
                onChange={onLocationChange}
            />

            <BrutalButton
                tone="mint"
                data-testid={testIds.discover.nearMeUseLocationButton}
                className="w-full gap-2"
                onClick={onUseMyLocation}
                disabled={geoLoading}
            >
                {geoLoading ? <LoaderCircle className="size-4 animate-spin" /> : <Crosshair className="size-4" />}
                Use my location
            </BrutalButton>

            <div className="space-y-2">
                <label
                    htmlFor={radiusInputId}
                    className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/65"
                >
                    Radius (1-15)
                </label>
                <Input
                    id={radiusInputId}
                    type="number"
                    min={1}
                    max={15}
                    value={radius}
                    onChange={(event) => handleRadiusChange(event.target.value)}
                    className="h-11 rounded-none border-brutal border-border bg-card"
                />
            </div>
        </>
    )
}

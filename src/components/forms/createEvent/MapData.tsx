import { lazy } from "react";
const MapWithGeocoder = lazy(() => import("@/components/MapWithGeocoder"))
import { type UseFormReturn } from "react-hook-form"
import { FormField, FormControl, FormMessage, FormItem } from "@/components/ui/form";
import { type CreateEventSchema } from "@/schemas/EventSchemas"

function MapData({ form }: { form: UseFormReturn<CreateEventSchema> }) {
    return (
        <div>
            <FormField control={form.control} name="location" render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <MapWithGeocoder {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>

            )} />
        </div>
    )
}

export default MapData

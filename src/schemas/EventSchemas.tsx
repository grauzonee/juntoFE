import { z } from "zod"
import type { LatLngLiteral } from "leaflet"

export type EventAddress = {
    coordinates: LatLngLiteral,
    value: string
}
export const createEventSchema = z.object({
    title: z.string().min(5).max(50),
    description: z.string().min(20).max(500),
    date: z.date(),
    topics: z.array(z.string()).nonempty(),
    image: z.any()
        .refine((file) => file && file instanceof File, "File is required")
        .refine((file) => file?.size <= 5 * 1024 * 1024, "Max file size is 5MB")
        .refine((file) => ["image/jpeg", "image/png"].includes(file?.type), "Only JPG and PNG files are allowed"),
    location: z.object({
        value: z.string(),
        coordinates: z.object({
            lat: z.number(),
            lng: z.number()
        })
    })
})

export type CreateEventSchema = z.infer<typeof createEventSchema>

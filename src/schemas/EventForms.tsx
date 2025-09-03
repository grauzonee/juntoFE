import { z } from "zod"
export const createEventSchema = z.object({
    title: z.string().min(5).max(50),
    description: z.string().min(20).max(500),
    date: z.date(),
    topics: z.array(z.string()).nonempty(),
    image: z.string(),
    address: z.object({
        value: z.string(),
        coordinates: z.array(z.string())
    })
})

export type CreateEventSchema = z.infer<typeof createEventSchema>

import { api as axios } from "@/lib/axios"
import { type CreateEventSchema } from "@/schemas/EventSchemas"
import { isAxiosError } from "axios"

export async function createEvent(formData: CreateEventSchema) {
    try {
        const response = await axios.post("/event", formData)

        const responseData = response.data
        if (response.status === 200 && responseData.data) {
            return responseData.data
        }
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.message)
        }
        throw new Error(error instanceof Error ? error.message : "Network error")
    }
}

import { api as axios } from "@/lib/axios"
import { type EditProfileSchema } from "@/schemas/ProfileSchemas"
import { isAxiosError } from "axios"

export async function getUser() {
    try {
        const response = await axios.get("/user")

        const responseData = response.data
        if (response.status === 200 && responseData.data) {
            return responseData.data
        }
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Network error")
    }
}

export async function updateUser(formData: EditProfileSchema | { avatarUrl: string }) {
    try {
        const response = await axios.put('/user', formData)

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


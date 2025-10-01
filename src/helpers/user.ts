import { api as axios } from "@/lib/axios"
import { type ChangePasswordSchema, type EditProfileSchema } from "@/schemas/ProfileSchemas"
import { isAxiosError } from "axios"
import { FormError } from "@/types/FormError"

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
            throw new FormError(error.response?.data.data.field, error.response?.data.data.message)
        }
        throw new FormError("root", error instanceof Error ? error.message : "Network error")
    }
}

export async function updatePassword(formData: ChangePasswordSchema) {
    try {
        const response = await axios.put('/user/password', formData)

        const responseData = response.data
        if (response.status === 200 && responseData.data) {
            return responseData.data
        }

    } catch (error) {
        if (isAxiosError(error)) {
            throw new FormError("root", error.response?.data.message)
        }
        throw new FormError("root", error instanceof Error ? error.message : "Network error")
    }
}

import { api as axios } from "@/lib/axios"

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

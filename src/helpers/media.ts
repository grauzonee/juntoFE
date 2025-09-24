import { api as axios } from "@/lib/axios"
import { isAxiosError } from "axios";

export async function uploadMedia(file: File) {
    try {
        const formData = new FormData();
        formData.append("media", file)
        const response = await axios.put('/media', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        const responseData = response.data;
        if (response.status === 201) {
            return responseData.data?.path;
        }
        return null;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.message)
        }
        throw new Error(error instanceof Error ? error.message : "Network error")
    }
}

import type { RegisterSchema, LoginSchema } from "@/schemas/AuthSchemas"
import type { User } from "@/types/User"
import { api as axios, setToken } from '@/lib/axios'
import { isAxiosError } from "axios"

export async function logIn(formData: LoginSchema): Promise<User | null> {
    try {
        const response = await axios.put("/auth/login", formData)

        const responseData = response.data
        if (response.status === 200 && responseData.data?.token) {
            const { token, id: userId, ...user } = responseData.data
            setToken(token)
            localStorage.setItem("userId", userId)
            return user as User
        }

        return null
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data?.message || "Login failed")
        }
        throw new Error("Network error")
    }
}

export async function signUp(formData: RegisterSchema): Promise<User | null> {
    const response = await axios.post('/auth/register', formData);
    const responseData = response.data;
    if (response.status === 201 && responseData.data?.token) {
        const token = responseData.data.token;
        const userId = responseData.data.userId;
        setToken(token);
        localStorage.setItem('userId', userId);
        return responseData.data;
    }
    return null;
}

export function getCurrentUserId() {
    return localStorage.getItem('userId');
}

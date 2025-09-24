import { z } from "zod"

export const loginSchema = z.object({
    email: z.email(),
    password: z.string(),
})

export const registerSchema = z.object({
    username: z.string(),
    email: z.email(),
    password: z.string().min(5).max(25),
    repeatPassword: z.string().min(5).max(25),
}).refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"]
});

export type LoginSchema = z.infer<typeof loginSchema>
export type RegisterSchema = z.infer<typeof registerSchema>

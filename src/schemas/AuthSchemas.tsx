import { z } from "zod"

export const loginSchema = z.object({
    email: z.email().transform((val) => val.toLowerCase()),
    password: z.string()
})

export const registerSchema = z.object({
    username: z.string(),
    email: z.email().transform((val) => val.toLowerCase()),
    password: z.string().min(5).max(25),
    passwordRepeat: z.string().min(5).max(25),
}).refine((data) => data.password === data.passwordRepeat, {
    message: "Passwords do not match",
    path: ["passwordRepeat"]
});

export type LoginSchema = z.infer<typeof loginSchema>
export type RegisterSchema = z.infer<typeof registerSchema>

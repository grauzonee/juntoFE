import { z } from "zod"

export const editProfileSchema = z.object({
    username: z.string().min(2).max(15),
    email: z.email(),
    interests: z.array(z.string()),
    avatarUrl: z.string()
})

export const changePasswordSchema = z.object({
    oldPassword: z.string().min(5).max(25),
    newPassword: z.string().min(5).max(25)
})

export type EditProfileSchema = z.infer<typeof editProfileSchema>
export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>

import { lazy } from "react"
const User = lazy(() => import("@/pages/user/User"))
const Edit = lazy(() => import("@/pages/user/Edit"))
import { authLoader } from "@/middlewares/AuthMiddleware"

export const routes = [
    { path: 'profile', element: <User />, loader: authLoader },
    { path: 'profile/edit', element: <Edit />, loadeer: authLoader },
]

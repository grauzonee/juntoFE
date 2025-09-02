import { lazy } from "react"
const User = lazy(() => import("@/pages/user/User"))
const Edit = lazy(() => import("@/pages/user/Edit"))

export const routes = [
    { path: 'profile', element: <User /> },
    { path: 'profile/edit', element: <Edit /> },
]

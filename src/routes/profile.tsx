import User from "@/pages/user/User"
import Edit from "@/pages/user/Edit"

export const routes = [
    { path: 'profile', element: <User /> },
    { path: 'profile/edit', element: <Edit /> },
]

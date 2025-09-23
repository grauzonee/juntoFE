import { guestLoader } from "@/middlewares/AuthMiddleware"
import { lazy } from "react"
import { type RouteObject } from "react-router"

const Login = lazy(() => import("@/pages/Login"))
const Register = lazy(() => import("@/pages/Register"))


export const authRoutes: RouteObject[] = [
    { path: 'login', element: <Login />, loader: guestLoader },
    { path: 'register', element: <Register />, loader: guestLoader },
]

import { lazy } from "react"
import { Navigate } from "react-router"
const Events = lazy(() => import('@/pages/Events'))
import type { RouteObject } from "react-router"

export const routes: RouteObject[] = [
    { path: 'events', element: <Events /> },
    { path: 'events/map', element: <Navigate to="/events" replace /> },
]

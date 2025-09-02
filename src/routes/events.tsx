import { lazy } from "react"
const Events = lazy(() => import('@/pages/Events'))
const SingleEvent = lazy(() => import('@/pages/SingleEvent'))
import type { RouteObject } from "react-router"

export const routes: RouteObject[] = [
    { path: 'events', element: <Events /> },
    { path: 'event', element: <SingleEvent /> },
]

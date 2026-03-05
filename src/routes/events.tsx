import { lazy } from "react"
const Events = lazy(() => import('@/pages/Events'))
const EventsOnMap = lazy(() => import('@/pages/EventsOnMap'))
const SingleEvent = lazy(() => import('@/components/event'))
import type { RouteObject } from "react-router"

export const routes: RouteObject[] = [
    { path: 'events', element: <Events /> },
    { path: 'events/map', element: <EventsOnMap /> },
    { path: 'event/:id', element: <SingleEvent /> },
]

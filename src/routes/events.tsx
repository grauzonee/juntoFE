import Events from "@/pages/Events"
import SingleEvent from "@/pages/SingleEvent"
import type { RouteObject } from "react-router"

export const routes: RouteObject[] = [
    { path: 'events', element: <Events /> },
    { path: 'event', element: <SingleEvent /> },
]

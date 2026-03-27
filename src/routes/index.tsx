import { type RouteObject } from 'react-router'
import DefaultLayout from '@/layouts/DefaultLayout.tsx'
import AuthLayout from '@/layouts/AuthLayout.tsx'
import LandingLayout from '@/layouts/LandingLayout.tsx'
import EventLayout from '@/layouts/EventLayout.tsx'
import Index from '@/pages/Index'
import { lazy } from "react"

import { authRoutes } from '@/routes/auth'
import { routes as profileViews } from '@/routes/profile'
import { routes as eventsRoutes } from '@/routes/events'
const SingleEvent = lazy(() => import('@/components/event'))

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <LandingLayout />,
        children: [
            { index: true, element: <Index /> },
        ]
    },
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            ...profileViews,
            ...eventsRoutes
        ]
    },
    {
        path: '/',
        element: <EventLayout />,
        children: [
            { path: 'event/:id', element: <SingleEvent /> },
        ]
    },

    {
        path: '/',
        element: <AuthLayout />,
        children: [
            ...authRoutes,
        ]
    }
]

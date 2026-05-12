import { type RouteObject } from 'react-router'
import DefaultLayout from '@/layouts/DefaultLayout.tsx'
import AuthLayout from '@/layouts/AuthLayout.tsx'
import LandingLayout from '@/layouts/LandingLayout.tsx'
import EventLayout from '@/layouts/EventLayout.tsx'
import Index from '@/pages/Index'
import { lazy } from "react"
import RouteErrorPage from '@/components/errors/RouteErrorPage'
import BadRequestPage from '@/pages/errors/BadRequest'
import MovedPermanentlyPage from '@/pages/errors/MovedPermanently'
import InternalServerErrorPage from '@/pages/errors/InternalServerError'
import NotFoundPage from '@/pages/errors/NotFound'

import { authRoutes } from '@/routes/auth'
import { routes as profileViews } from '@/routes/profile'
import { routes as eventsRoutes } from '@/routes/events'
const SingleEvent = lazy(() => import('@/components/event'))

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <LandingLayout />,
        errorElement: <RouteErrorPage />,
        children: [
            { index: true, element: <Index /> },
        ]
    },
    {
        path: '/',
        element: <DefaultLayout />,
        errorElement: <RouteErrorPage />,
        children: [
            ...profileViews,
            ...eventsRoutes
        ]
    },
    {
        path: '/',
        element: <EventLayout />,
        errorElement: <RouteErrorPage />,
        children: [
            { path: 'event/:id', element: <SingleEvent /> },
        ]
    },

    {
        path: '/',
        element: <AuthLayout />,
        errorElement: <RouteErrorPage />,
        children: [
            ...authRoutes,
        ]
    },
    { path: '400', element: <BadRequestPage /> },
    { path: '301', element: <MovedPermanentlyPage /> },
    { path: '500', element: <InternalServerErrorPage /> },
    { path: '*', element: <NotFoundPage /> },
]

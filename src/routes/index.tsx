import { type RouteObject } from 'react-router'
import DefaultLayout from '@/layouts/DefaultLayout.tsx'
import AuthLayout from '@/layouts/AuthLayout.tsx'
import LandingLayout from '@/layouts/LandingLayout.tsx'
import Index from '@/pages/Index'

import { authRoutes } from '@/routes/auth'
import { routes as profileViews } from '@/routes/profile'
import { routes as eventsRoutes } from '@/routes/events'

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
        element: <AuthLayout />,
        children: [
            ...authRoutes,
        ]
    }
]

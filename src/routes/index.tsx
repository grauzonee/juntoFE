import { type RouteObject } from 'react-router'
import DefaultLayout from '@/layouts/DefaultLayout.tsx'
import AuthLayout from '@/layouts/AuthLayout.tsx'
import Hero from '@/pages/Hero'

import { authRoutes } from '@/routes/auth'
import { routes as profileViews } from '@/routes/profile'
import { routes as eventsRoutes } from '@/routes/events'

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            { path: '/', element: <Hero /> },
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

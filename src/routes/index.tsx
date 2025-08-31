import { type RouteObject } from 'react-router'
import DefaultLayout from '@/layouts/DefaultLayout.tsx'
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
            ...authRoutes,
            ...profileViews,
            ...eventsRoutes
        ]
    }

]

import { type RouteObject } from 'react-router'
import DefaultLayout from '@/layouts/DefaultLayout.tsx'

import App from '@/App.tsx'
import { authRoutes } from '@/routes/auth'

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            { path: '/', element: <App /> },
            ...authRoutes
        ]
    }

]

import { type RouteObject } from 'react-router'
import App from '../App.tsx'
import { authRoutes } from './auth'

export const routes: RouteObject[] = [
    { path: '/', element: <App /> },
    ...authRoutes
]

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { createReactRootErrorHandlers, initSentry } from "@/lib/sentry"
import { routes } from "./routes/index"
import './styles/tokens.css'
import './styles/globals.css'
import './index.css'

initSentry()
const router = createBrowserRouter(routes)
const root = createRoot(document.getElementById('root')!, createReactRootErrorHandlers())

root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)

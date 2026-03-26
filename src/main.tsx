import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { routes } from "./routes/index"
import './styles/tokens.css'
import './styles/globals.css'
import './index.css'

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)

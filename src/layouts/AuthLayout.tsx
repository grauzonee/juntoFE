import { Outlet } from "react-router"
import { Link } from "react-router"
import AuthShowcase from "@/components/auth/AuthShowcase"

function AuthLayout() {
    return (
        <div className="min-h-screen bg-cream">
            <header className="border-b-[3px] border-border bg-cream">
                <div className="mx-auto flex h-16 max-w-7xl items-center px-4 md:px-6">
                    <Link to="/" className="font-display text-3xl font-extrabold tracking-[-0.05em]">
                        JUNTO
                    </Link>
                </div>
            </header>
            <div className="flex min-h-[calc(100vh-4rem)] w-full flex-col lg:flex-row">
                <AuthShowcase />
                <div className="flex w-full items-center justify-center px-5 py-10 md:px-8 lg:w-1/2 lg:px-12 lg:py-16">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AuthLayout

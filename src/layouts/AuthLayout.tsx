import { Outlet } from "react-router"
import { Link } from "react-router"
import AuthShowcase from "@/components/auth/AuthShowcase"
import mainLogo from "@/assets/logo.png"

function AuthLayout() {
    return (
        <div className="min-h-screen bg-cream">
            <header className="border-b-[3px] border-border bg-cream">
                <div className="flex h-20 items-center px-5 md:px-8">
                    <Link to="/" className="flex items-center" aria-label="Junto home">
                        <span className="flex size-20 overflow-hidden rounded-full">
                            <img src={mainLogo} className="size-full object-cover" alt="" />
                        </span>
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

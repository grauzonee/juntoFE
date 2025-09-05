import { Outlet } from "react-router"
import GuestTopbar from "@/components/topbar/GuestTopbar"
import AuthTopbar from "@/components/topbar/AuthTopbar"
import Footer from "@/components/Footer"
import { Toaster } from "@/components/ui/sonner"
import { isLoggedIn } from "@/helpers/auth"

function DefaultLayout() {
    return (
        <>
            <div className="w-full flex flex-col min-h-[120vh] bg-gradient-to-b from-gradient-from to-gradient-to">
                {!isLoggedIn() && <GuestTopbar />}
                {isLoggedIn() && <AuthTopbar />}

                <div
                    className="flex-1 flex flex-col items-center w-5/6 md:w-3/4 mx-auto max-w-5xl mb-[4rem] pt-5"
                >
                    <Toaster />
                    <Outlet />
                </div>

                <Footer />
            </div>
        </>
    )
}

export default DefaultLayout

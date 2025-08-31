import { Outlet } from "react-router"
import GuestTopbar from "@/components/topbar/GuestTopbar"
import Footer from "@/components/Footer"

function DefaultLayout() {
    return (
        <div className="w-full h-screen bg-gray-800 overflow-hidden flex flex-col" >
            <GuestTopbar />
            <div className="w-5/6 md:w-3/4 mx-auto flex-1 overflow-scroll flex flex-col items-center">
                <Outlet />
            </div>
            <Footer />
        </div >
    )
}

export default DefaultLayout

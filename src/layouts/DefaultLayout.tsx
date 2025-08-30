import { Outlet } from "react-router"

function DefaultLayout() {
    return (
        <div className="w-full h-screen bg-gray-800 px-[2rem]" >
            <div className="w-full md:w-3/4 h-full mx-auto">
                <Outlet />
            </div>
        </div >
    )
}

export default DefaultLayout

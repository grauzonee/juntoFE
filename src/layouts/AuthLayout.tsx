import { Outlet } from "react-router"
import { Toaster } from "@/components/ui/sonner"

function AuthLayout() {
    return (
        <>
            <div className="w-full flex flex-col md:h-screen bg-gradient-to-b from-gradient-from to-gradient-to">
                <div
                    className="flex-1 flex flex-col items-center justify-center w-5/6 md:w-3/4 mx-auto max-w-5xl mb-[4rem]"
                >
                    <Toaster />
                    <div className="w-full flex flex-col py-5 md:flex-row justify-between gapx-12 items-center">
                        <div className="relative flex items-center justify-center md:w-1/2">

                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-400 via-yellow-300 to-blue-400 opacity-40 blur-2xl z-0 animate-pulse"></div>

                            <img src="/logo.png" alt="Logo" className="w-full h-auto relative z-10 blur-[3px] animate-spin [animation-duration:20s]" />

                            <div className="absolute text-background/80 z-30 flex flex-col items-center text-center">
                                <p className="block text-[2rem] font-bold">
                                    Making events easier
                                </p>
                                <p className="block text-md ">
                                    Plan, organize, and enjoy your events with ease.
                                </p>
                            </div>
                        </div>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AuthLayout

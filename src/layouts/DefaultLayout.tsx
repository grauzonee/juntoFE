import { Outlet, useLocation, useSearchParams } from "react-router"
import SiteHeader from "@/components/shell/SiteHeader"
import Footer from "@/components/Footer"
import { Toaster } from "@/components/ui/sonner"
import { UserProvider } from "@/providers/UserProvider"

function DefaultLayout() {
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()
    const isDiscoverPage = location.pathname === "/events"
    const discoverSearch = searchParams.get("search") ?? ""

    function handleDiscoverSearchChange(value: string) {
        const nextParams = new URLSearchParams(searchParams)

        if (value.trim()) {
            nextParams.set("search", value)
        } else {
            nextParams.delete("search")
        }

        setSearchParams(nextParams, { replace: true })
    }

    return (
        <>
            <div className="w-full flex flex-col min-h-[120v] bg-main md:bg-background">
                <SiteHeader
                    search={isDiscoverPage ? {
                        value: discoverSearch,
                        onChange: handleDiscoverSearchChange,
                        placeholder: "Search by title, place, or vibe",
                    } : undefined}
                />

                <div
                    className="flex-1 flex flex-col items-center w-5/6 md:w-3/4 mx-auto max-w-5xl mb-[4rem] pt-5"
                >
                    <Toaster />
                    <UserProvider>
                        <Outlet />
                    </UserProvider>
                </div>

                <Footer />
            </div>
        </>
    )
}

export default DefaultLayout

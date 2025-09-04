import { Link } from "react-router"
import logo from '/logo.png'
import SearchForm from '@/components/SearchForm'
import ResponsiveComponent from '@/components/helpers/ResponsiveComponent'
import type React from "react"

function BaseTopbar({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-20 bg-transparent backdrop-blur-lg text-white w-full flex flex-row items-center justify-between p-[4rem] gap-5">
            <Link to="/">
                <div className='w-24 h-24 overflow-hidden rounded-full'>
                    <img src={logo} className="logo drop-shadow-lg" alt="Logo" />
                </div>
            </Link>
            <ResponsiveComponent isDesktop={true} isTablet={true}>
                <SearchForm />
            </ResponsiveComponent>
            {children}
        </div>
    )
}
export default BaseTopbar

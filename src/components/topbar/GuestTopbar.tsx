import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu-style'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import BaseTopbar from '@/components/topbar/BaseTopbar'
import { Link } from 'react-router'

function GuestTopbar() {
    const menuItems = [
        {
            title: "Login",
            url: "/login"
        },
        {
            title: "Sign up",
            url: "/signup"
        }
    ]
    return (
        <BaseTopbar>
            <NavigationMenu className="w-full lg:w-1/4">
                <NavigationMenuList className='gap-4 md:gap-0'>
                    {menuItems.map((item, key) => (
                        <NavigationMenuItem key={key} className='md:bg-transparent md:text-white bg-background text-foreground rounded-md md:border-none border border-border shadow-shadow md:shadow-none lg:p-0 px-3'>
                            <Link to={item.url} >
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    {item.title}
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>

            </NavigationMenu>


        </BaseTopbar >
    )
}
export default GuestTopbar

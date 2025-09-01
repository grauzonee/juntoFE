import logo from '/logo.png'
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu-style'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Input } from '@/components/ui/input'
import ResponsiveComponent from '../helpers/ResponsiveComponent'
function Topbar() {
    return (
        <div className="h-20 bg-transparent backdrop-blur-lg text-white w-full flex flex-row items-center justify-between p-[3rem]">
            <div className='w-16 h-16 overflow-hidden rounded-full'>
                <img src={logo} className="logo drop-shadow-lg" alt="Logo" />

            </div>
            <ResponsiveComponent isDesktop={true}>
                <Input className="w-1/5" />
            </ResponsiveComponent>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            About
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Login</NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}
export default Topbar

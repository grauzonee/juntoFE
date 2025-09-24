import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu-style'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import BaseTopbar from '@/components/topbar/BaseTopbar'

function AuthTopbar() {
    function logout() {
        localStorage.removeItem('token')
        window.location.reload()
    }

    return (
        <BaseTopbar>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            My profile
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()} onClick={logout}>
                            Logout
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </BaseTopbar>
    )
}
export default AuthTopbar

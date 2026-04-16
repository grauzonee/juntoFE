import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu-style'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import BaseTopbar from '@/components/topbar/BaseTopbar'
import { Link } from 'react-router'
import { logout } from "@/helpers/auth"

function AuthTopbar() {
    return (
        <BaseTopbar>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link to="/profile" >
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                My profile
                            </NavigationMenuLink>
                        </Link>
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

import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu-style'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import BaseTopbar from '@/components/topbar/BaseTopbar'
import { Link } from 'react-router'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
    SheetTitle
} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button'
import { Menu } from "lucide-react";
import SearchForm from '@/components/SearchForm'
import UserCard from '@/components/profile/UserCard'
import { user } from '@/data'
import ResponsiveComponent from '@/components/helpers/ResponsiveComponent'
import { Label } from '@/components/ui/label'

function AuthTopbar() {

    const menuItems = [
        { title: "Create event", url: "/profile", desktop: false },
        { title: "My profile", url: "/profile", desktop: true },
        { title: "Logout", url: "/logout", desktop: true },
    ]

    function onSearch(searchStr: string) {
        console.log(searchStr)
        window.location.href = '/events'
    }


    return (
        <BaseTopbar>
            {/* Desktop */}
            <SearchForm onChange={onSearch} />
            <ResponsiveComponent isTablet={true} isDesktop={true}>
                <NavigationMenu>
                    <NavigationMenuList>
                        {menuItems.filter(item => item.desktop).map((item, key) => (
                            <NavigationMenuItem key={key}>
                                <Link to={item.url} >
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        {item.title}
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </ResponsiveComponent>
            <ResponsiveComponent isMobile={true}>
                <Sheet>
                    <SheetTrigger><Menu /></SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>
                                Menu
                            </SheetTitle>
                        </SheetHeader>
                        <UserCard user={user} className='w-full p-5 gap-4 flex flex-row'>
                            <UserCard.Avatar />
                            <div className='flex flex-col'>
                                <Label>Logged in as:</Label>
                                <UserCard.Name />
                            </div>
                        </UserCard>
                        <div className='flex flex-col gap-3 mt-4'>
                            {menuItems.map((item, key) => (
                                <Link to={item.url} key={key} >
                                    <Button className='w-full'>{item.title}</Button>
                                </Link>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </ResponsiveComponent>
        </BaseTopbar >
    )
}
export default AuthTopbar

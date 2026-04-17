import { useState } from "react"
import { Link } from "react-router"
import { Menu, X } from "lucide-react"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import BrutalButton from "@/components/landing/BrutalButton"
import { isLoggedIn, logout } from "@/helpers/auth"
import { cn } from "@/lib/utils"

type HeaderNavItem =
    | { label: string; href: string; to?: never }
    | { label: string; to: string; href?: never }

type SiteHeaderProps = {
    navItems: HeaderNavItem[]
    dataTestId?: string
    mobileMenuTriggerTestId?: string
    mobileMenuTestId?: string
    mobileMenuInnerTestId?: string
    mobileMenuVariant?: "full" | "dropdown"
    className?: string
}

const navLinkClassName =
    "border-2 border-transparent px-4 py-2 font-heading text-sm font-bold transition hover:border-border hover:bg-violet-light"

const mobileNavLinkClassName =
    "border-2 border-transparent px-4 py-3 font-heading font-bold transition hover:border-border hover:bg-violet-light"

export default function SiteHeader({
    navItems,
    dataTestId,
    mobileMenuTriggerTestId,
    mobileMenuTestId,
    mobileMenuInnerTestId,
    mobileMenuVariant = "full",
    className,
}: SiteHeaderProps) {
    const [isOpen, setIsOpen] = useState(false)
    const loggedIn = isLoggedIn()
    const isDropdown = mobileMenuVariant === "dropdown"

    function handleLogout() {
        setIsOpen(false)
        logout()
    }

    return (
        <header
            data-testid={dataTestId}
            className={cn("sticky top-0 z-50 border-b-brutal border-border bg-cream", className)}
        >
            <Collapsible open={isOpen} onOpenChange={setIsOpen} className={cn(isDropdown && "relative")}>
                <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
                    <Link to="/" className="font-display text-3xl font-extrabold tracking-[-0.05em]">
                        JUNTO
                    </Link>

                    <nav className="hidden items-center gap-1 md:flex">
                        {navItems.map((item) => renderNavItem(item, navLinkClassName))}
                    </nav>

                    <div className="hidden items-center gap-3 md:flex">
                        {loggedIn ? (
                            <>
                                <BrutalButton asChild tone="cream" className="px-5">
                                    <Link to="/profile">My profile</Link>
                                </BrutalButton>
                                <BrutalButton tone="violet" className="px-5" onClick={handleLogout}>
                                    Logout
                                </BrutalButton>
                            </>
                        ) : (
                            <>
                                <BrutalButton asChild tone="cream" className="px-5">
                                    <Link to="/login">Log in</Link>
                                </BrutalButton>
                                <BrutalButton asChild tone="violet" className="px-5">
                                    <Link to="/register">Sign up</Link>
                                </BrutalButton>
                            </>
                        )}
                    </div>

                    <BrutalButton
                        type="button"
                        tone="cream"
                        size="icon"
                        data-testid={mobileMenuTriggerTestId}
                        aria-label="Toggle menu"
                        className="h-11 w-11 px-0 md:hidden"
                        onClick={() => setIsOpen((open) => !open)}
                    >
                        {isOpen ? <X /> : <Menu />}
                    </BrutalButton>
                </div>

                <CollapsibleContent
                    data-testid={mobileMenuTestId}
                    className={cn(
                        "md:hidden data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=open]:slide-in-from-top-2",
                        isDropdown
                            ? "absolute right-4 top-full mt-2 w-[16rem] border-brutal border-border bg-cream p-4 shadow-brutal-lg"
                            : "border-t-brutal border-border bg-cream",
                    )}
                >
                    <div
                        data-testid={mobileMenuInnerTestId}
                        className={cn(!isDropdown && "mx-auto w-full max-w-7xl px-4 py-4 md:px-6")}
                    >
                        <nav className="flex flex-col gap-2">
                            {navItems.map((item) => renderNavItem(
                                item,
                                mobileNavLinkClassName,
                                () => setIsOpen(false),
                            ))}
                            <div className="mt-2 grid grid-cols-1 gap-3 border-t-2 border-border pt-3">
                                {loggedIn ? (
                                    <>
                                        <BrutalButton asChild tone="cream" className="w-full">
                                            <Link to="/profile" onClick={() => setIsOpen(false)}>My profile</Link>
                                        </BrutalButton>
                                        <BrutalButton tone="violet" className="w-full" onClick={handleLogout}>
                                            Logout
                                        </BrutalButton>
                                    </>
                                ) : (
                                    <>
                                        <BrutalButton asChild tone="cream" className="w-full">
                                            <Link to="/login" onClick={() => setIsOpen(false)}>Log in</Link>
                                        </BrutalButton>
                                        <BrutalButton asChild tone="violet" className="w-full">
                                            <Link to="/register" onClick={() => setIsOpen(false)}>Sign up</Link>
                                        </BrutalButton>
                                    </>
                                )}
                            </div>
                        </nav>
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </header>
    )
}

function renderNavItem(item: HeaderNavItem, className: string, onClick?: () => void) {
    if ("href" in item) {
        return (
            <a key={item.href} href={item.href} className={className} onClick={onClick}>
                {item.label}
            </a>
        )
    }

    return (
        <Link key={item.to} to={item.to} className={className} onClick={onClick}>
            {item.label}
        </Link>
    )
}

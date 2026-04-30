import { useState } from "react"
import { Link } from "react-router"
import { Menu, Search, X } from "lucide-react"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import BrutalButton from "@/components/ui/brutal-button"
import { isLoggedIn, logout } from "@/helpers/auth"
import { cn } from "@/lib/utils"
import mainLogo from "@/assets/logo.png"

type HeaderNavItem =
    | { label: string; href: string; to?: never }
    | { label: string; to: string; href?: never }

type SiteHeaderProps = {
    navItems?: HeaderNavItem[]
    dataTestId?: string
    mobileMenuTriggerTestId?: string
    mobileMenuTestId?: string
    mobileMenuInnerTestId?: string
    mobileMenuVariant?: "full" | "dropdown"
    sticky?: boolean
    search?: {
        value: string
        onChange: (value: string) => void
        placeholder?: string
    }
    className?: string
}

type HeaderSearchProps = NonNullable<SiteHeaderProps["search"]> & {
    inputClassName?: string
}

const navLinkClassName =
    "border-2 border-transparent px-4 py-2 font-heading text-sm font-bold transition hover:border-border hover:bg-violet-light"

const mobileNavLinkClassName =
    "border-2 border-transparent px-4 py-3 font-heading font-bold transition hover:border-border hover:bg-violet-light"

export default function SiteHeader({
    navItems = [],
    dataTestId,
    mobileMenuTriggerTestId,
    mobileMenuTestId,
    mobileMenuInnerTestId,
    mobileMenuVariant = "full",
    sticky = true,
    search,
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
            className={cn(
                "z-50 border-b-brutal border-border bg-background/95 backdrop-blur",
                sticky && "sticky top-0",
                className,
            )}
        >
            <Collapsible open={isOpen} onOpenChange={setIsOpen} className={cn(isDropdown && "relative")}>
                <div className="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-6">
                    <Link to="/" className="flex shrink-0 items-center" aria-label="Junto home">
                        <span className="flex size-16 overflow-hidden rounded-full">
                            <img src={mainLogo} className="size-full object-cover" alt="" />
                        </span>
                    </Link>

                    {navItems.length > 0 ? (
                        <nav className="hidden items-center gap-1 md:flex">
                            {navItems.map((item) => renderNavItem(item, navLinkClassName))}
                        </nav>
                    ) : null}

                    {search ? (
                        <div className="hidden min-w-0 flex-1 md:block">
                            <HeaderSearch {...search} inputClassName="shadow-brutal-sm" />
                        </div>
                    ) : null}

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
                            ? "absolute right-4 top-full mt-2 w-[16rem] border-brutal border-border bg-background p-4 shadow-brutal-lg"
                            : "border-t-brutal border-border bg-background",
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
                            {search ? (
                                <HeaderSearch {...search} />
                            ) : null}
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

function HeaderSearch({
    value,
    onChange,
    placeholder = "Search events",
    inputClassName,
}: HeaderSearchProps) {
    return (
        <label className="relative block">
            <span className="sr-only">{placeholder}</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-foreground/55" />
            <Input
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                className={cn(
                    "h-12 rounded-none border-brutal border-border bg-cream pl-11 pr-4 text-base font-semibold shadow-none",
                    inputClassName,
                )}
            />
        </label>
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

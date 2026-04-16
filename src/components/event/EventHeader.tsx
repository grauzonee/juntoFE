import { useState } from "react"
import { Link } from "react-router"
import { Menu, X } from "lucide-react"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import BrutalButton from "@/components/landing/BrutalButton"
import { isLoggedIn, logout } from "@/helpers/auth"
import { testIds } from "@/testIds"

const navItems = [
    { label: "Home", to: "/" },
    { label: "Discover", to: "/events" },
]

export default function EventHeader() {
    const [isOpen, setIsOpen] = useState(false)
    const loggedIn = isLoggedIn()

    return (
        <header
            data-testid={testIds.event.shellHeader}
            className="sticky top-0 z-50 border-b-[3px] border-border bg-cream/95 backdrop-blur"
        >
            <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
                <Link to="/" className="font-display text-3xl font-extrabold tracking-[-0.05em]">
                    JUNTO
                </Link>

                <nav className="hidden items-center gap-1 md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className="border-2 border-transparent px-4 py-2 font-heading text-sm font-bold transition hover:border-border hover:bg-violet-light"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden items-center gap-3 md:flex">
                    {loggedIn ? (
                        <>
                            <BrutalButton asChild tone="cream" className="px-5">
                                <Link to="/profile">My profile</Link>
                            </BrutalButton>
                            <BrutalButton tone="violet" className="px-5" onClick={logout}>
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

                <Collapsible open={isOpen} onOpenChange={setIsOpen} className="relative md:hidden">
                    <BrutalButton
                        type="button"
                        tone="cream"
                        size="icon"
                        aria-label="Toggle menu"
                        className="h-11 w-11 px-0"
                        onClick={() => setIsOpen((open) => !open)}
                    >
                        {isOpen ? <X /> : <Menu />}
                    </BrutalButton>
                    <CollapsibleContent className="absolute right-0 top-full mt-2 w-[16rem] border-[3px] border-border bg-cream p-4 shadow-[8px_8px_0_0_hsl(var(--border))] data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=open]:slide-in-from-top-2">
                        <nav className="flex flex-col gap-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    className="border-2 border-transparent px-4 py-3 font-heading font-bold transition hover:border-border hover:bg-violet-light"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <div className="mt-2 grid grid-cols-1 gap-3 border-t-2 border-border pt-3">
                                {loggedIn ? (
                                    <>
                                        <BrutalButton asChild tone="cream" className="w-full">
                                            <Link to="/profile" onClick={() => setIsOpen(false)}>My profile</Link>
                                        </BrutalButton>
                                        <BrutalButton tone="violet" className="w-full" onClick={logout}>
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
                    </CollapsibleContent>
                </Collapsible>
            </div>
        </header>
    )
}

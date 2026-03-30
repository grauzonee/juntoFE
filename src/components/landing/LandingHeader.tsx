import { useState } from "react"
import { Link } from "react-router"
import { Menu, X } from "lucide-react"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import BrutalButton from "@/components/landing/BrutalButton"
import { landingNavItems } from "@/components/landing/landing-data"
import { isLoggedIn } from "@/helpers/auth"

export default function LandingHeader() {
    const [isOpen, setIsOpen] = useState(false)
    const loggedIn = isLoggedIn()

    function logout() {
        localStorage.removeItem("token")
        window.location.reload()
    }

    return (
        <header className="sticky top-0 z-50 border-b-[3px] border-border bg-cream">
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
                    <Link to="/" className="font-display text-3xl font-extrabold tracking-[-0.05em]">
                        JUNTO
                    </Link>

                    <nav className="hidden items-center gap-1 md:flex">
                        {landingNavItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="border-2 border-transparent px-4 py-2 font-heading text-sm font-bold transition hover:border-border hover:bg-violet-light"
                            >
                                {item.label}
                            </a>
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

                    <BrutalButton
                        type="button"
                        tone="cream"
                        size="icon"
                        aria-label="Toggle menu"
                        className="h-11 w-11 px-0 md:hidden"
                        onClick={() => setIsOpen((open) => !open)}
                    >
                        {isOpen ? <X /> : <Menu />}
                    </BrutalButton>
                </div>
                <CollapsibleContent className="border-t-[3px] border-border bg-cream md:hidden data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=open]:slide-in-from-top-2">
                    <div className="mx-auto w-full max-w-7xl px-4 py-4 md:px-6">
                        <nav className="flex flex-col gap-2">
                            {landingNavItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="border-2 border-transparent px-4 py-3 font-heading font-bold transition hover:border-border hover:bg-violet-light"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </a>
                            ))}
                            <div className="mt-2 grid grid-cols-1 gap-3 border-t-2 border-border pt-3">
                                {loggedIn ? (
                                    <>
                                        <BrutalButton asChild tone="cream" className="w-full">
                                            <Link to="/profile" onClick={() => setIsOpen(false)}>My profile</Link>
                                        </BrutalButton>
                                        <BrutalButton
                                            tone="violet"
                                            className="w-full"
                                            onClick={() => {
                                                setIsOpen(false)
                                                logout()
                                            }}
                                        >
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

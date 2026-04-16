import type { ReactNode } from "react"
import { Link, useLocation } from "react-router"
import { cn } from "@/lib/utils"
import { testIds } from "@/testIds"

type AuthCardLayoutProps = Readonly<{
    eyebrow: string
    title: string
    description: string
    children: ReactNode
}>

const tabs = [
    { label: "Log in", href: "/login" },
    { label: "Sign up", href: "/register" },
]

export default function AuthCardLayout({ eyebrow, title, description, children }: AuthCardLayoutProps) {
    const location = useLocation()

    return (
        <section className="w-full max-w-[28rem]">
            <div className="mb-6 flex border-b-2 border-border">
                {tabs.map((tab) => {
                    const isActive = location.pathname === tab.href

                    return (
                        <Link
                            key={tab.href}
                            to={tab.href}
                            className={cn(
                                "relative -mb-0.5 flex-1 border-b-[3px] px-4 py-3 text-center font-heading text-base font-bold transition",
                                isActive
                                    ? "border-violet bg-cream text-foreground"
                                    : "border-transparent text-foreground/45 hover:text-foreground",
                            )}
                        >
                            {tab.label}
                        </Link>
                    )
                })}
            </div>

            <div
                data-testid={testIds.auth.card}
                className="border-[3px] border-border bg-card px-6 py-7 shadow-[8px_8px_0_0_hsl(var(--border))] md:px-8"
            >
                <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.22em] text-violet">
                    {eyebrow}
                </p>
                <h2
                    data-testid={testIds.auth.title}
                    className="mb-3 max-w-[11ch] font-display text-[clamp(2.1rem,5vw,3.25rem)] font-extrabold leading-[0.92] tracking-[-0.06em]"
                >
                    {title}
                </h2>
                <p
                    data-testid={testIds.auth.description}
                    className="mb-8 max-w-md text-base leading-7 text-foreground/70"
                >
                    {description}
                </p>
                {children}
            </div>
        </section>
    )
}

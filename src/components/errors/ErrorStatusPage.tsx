import type { ReactNode } from "react"
import { Link } from "react-router"
import BrutalButton from "@/components/ui/brutal-button"
import WindowCard from "@/components/ui/window-card"

type ErrorStatusPageProps = {
    code: string
    title: string
    description: string
    actionLabel: string
    actionTo: string
    statusTone?: "coral" | "mint" | "violet" | "yellow"
    children?: ReactNode
}

const toneClasses: Record<NonNullable<ErrorStatusPageProps["statusTone"]>, string> = {
    coral: "bg-coral text-white",
    mint: "bg-mint text-foreground",
    violet: "bg-violet text-card",
    yellow: "bg-yellow text-foreground",
}

export default function ErrorStatusPage({
    code,
    title,
    description,
    actionLabel,
    actionTo,
    statusTone = "violet",
    children,
}: Readonly<ErrorStatusPageProps>) {
    return (
        <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-main px-4 py-10 md:px-6">
            <div className="w-full max-w-3xl">
                <WindowCard titlebarLabel="Error" className="overflow-hidden">
                    <div className="p-6 text-right md:p-8">
                        <p className={`inline-flex border-2 border-border px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] shadow-brutal-sm ${toneClasses[statusTone]}`}>
                            {code}
                        </p>
                        <h1 className="mt-4 font-display text-4xl font-extrabold tracking-[-0.06em] md:text-5xl">
                            {title}
                        </h1>
                        <p className="mt-4 ml-auto max-w-xl text-base leading-7 text-foreground/70">
                            {description}
                        </p>

                        <div className="mt-8 flex flex-wrap justify-end gap-3">
                            <BrutalButton asChild tone={statusTone === "coral" ? "destructive" : "violet"}>
                                <Link to={actionTo}>{actionLabel}</Link>
                            </BrutalButton>
                        </div>
                        {children ? <div className="mt-6">{children}</div> : null}
                    </div>
                </WindowCard>
            </div>
        </main>
    )
}

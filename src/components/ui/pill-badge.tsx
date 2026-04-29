import type { ComponentProps } from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface PillBadgeProps extends ComponentProps<typeof Badge> {
    tone?: "mint" | "yellow" | "white"
}

const toneClasses: Record<NonNullable<PillBadgeProps["tone"]>, string> = {
    mint: "bg-mint-light",
    yellow: "bg-yellow",
    white: "bg-card",
}

export default function PillBadge({ className, tone = "white", ...props }: PillBadgeProps) {
    return (
        <Badge
            className={cn(
                "rounded-none border-2 border-border px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-foreground shadow-none",
                toneClasses[tone],
                className,
            )}
            {...props}
        />
    )
}

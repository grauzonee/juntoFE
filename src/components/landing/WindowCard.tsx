import type { ComponentProps } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface WindowCardProps extends ComponentProps<typeof Card> {
    titlebarLabel?: string
    bodyClassName?: string
}

export default function WindowCard({
    children,
    className,
    titlebarLabel,
    bodyClassName,
    ...props
}: WindowCardProps) {
    return (
        <Card
            variant="default"
            className={cn("gap-0 overflow-hidden rounded-none bg-card py-0", className)}
            {...props}
        >
            {titlebarLabel ? (
                <div className="flex items-center gap-2 border-b-2 border-border px-4 py-3">
                    <span className="h-3 w-3 rounded-full border border-border bg-[#FF6B6B]" />
                    <span className="h-3 w-3 rounded-full border border-border bg-yellow" />
                    <span className="h-3 w-3 rounded-full border border-border bg-mint" />
                    <span className="ml-auto font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-foreground">
                        {titlebarLabel}
                    </span>
                </div>
            ) : null}
            <CardContent className={cn("px-0", bodyClassName)}>{children}</CardContent>
        </Card>
    )
}

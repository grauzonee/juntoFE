import type { ComponentProps } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface BrutalButtonProps extends ComponentProps<typeof Button> {
    tone?: "mint" | "violet" | "cream"
}

const toneClasses: Record<NonNullable<BrutalButtonProps["tone"]>, string> = {
    mint: "bg-mint text-foreground hover:bg-mint/90",
    violet: "bg-violet text-card hover:bg-violet/90",
    cream: "bg-card text-foreground hover:bg-card/90",
}

export default function BrutalButton({
    className,
    tone = "cream",
    variant = "noShadow",
    ...props
}: BrutalButtonProps) {
    return (
        <Button
            variant={variant}
            className={cn(
                "min-h-11 rounded-none border-brutal border-border px-6 py-3 font-heading text-sm font-bold shadow-brutal transition duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-lg active:translate-x-1 active:translate-y-1 active:shadow-none",
                toneClasses[tone],
                className,
            )}
            {...props}
        />
    )
}

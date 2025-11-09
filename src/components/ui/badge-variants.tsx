import { cva } from "class-variance-authority"

export const badgeVariants = cva(
    "inline-flex items-center justify-center rounded-base border-2 border-border px-2.5 py-0.5 lg:text-xs font-base w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] overflow-hidden",
    {
        variants: {
            variant: {
                default: "bg-main text-main-foreground",
                neutral: "bg-secondary-background text-foreground",
                secondary:
                    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
                destructive:
                    "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
                outline: "text-foreground",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
)

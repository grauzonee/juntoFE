import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
    "flex w-full border-border selection:bg-main selection:text-main-foreground text-foreground file:border-0 file:bg-transparent file:text-sm file:font-heading focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "h-10 rounded-base border-2 bg-secondary-background px-3 py-2 text-sm font-base placeholder:text-foreground/50",
                auth:
                    "h-12 rounded-none border-brutal bg-cream px-4 py-2 text-base font-base placeholder:text-foreground/40 focus-visible:ring-0 focus-visible:ring-offset-0",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
)

type InputProps = React.ComponentProps<"input"> & VariantProps<typeof inputVariants>

function Input({ className, type, variant, ...props }: InputProps) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(inputVariants({ variant, className }))}
            {...props}
        />
    )
}

export { Input }
